/* Saitenzug – Offline-Speicher.
   Die App (Seite, Schriften, Symbole) wird beim ersten Öffnen auf dem Gerät gespeichert.
   Seite: zuerst aus dem Netz (damit Updates sofort ankommen), ohne Netz aus dem Speicher.
   Alles andere: aus dem Speicher, sonst aus dem Netz. */
const CACHE = 'saitenzug-v9';
const ASSETS = [
  './', 'manifest.webmanifest',
  'fonts/barlow-condensed-latin-500-normal.woff2', 'fonts/barlow-condensed-latin-600-normal.woff2',
  'fonts/barlow-condensed-latin-700-normal.woff2', 'fonts/yellowtail-latin-400-normal.woff2',
  'icons/si-192.png', 'icons/si-512.png', 'icons/si-touch-180.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const PAGE = new URL('./', self.registration.scope).href;
function isPage(req) {
  if (req.mode === 'navigate') return true;
  const u = new URL(req.url);
  return u.origin === location.origin && (u.href.split(/[?#]/)[0] === PAGE || u.pathname.endsWith('/index.html'));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (isPage(req)) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const net = await Promise.race([
          fetch(req, { cache: 'no-cache' }),
          new Promise((_, no) => setTimeout(() => no(new Error('timeout')), 6000)),
        ]);
        if (net && net.ok) { cache.put(PAGE, net.clone()); return net; }
        throw new Error('bad response');
      } catch (err) {
        return (await cache.match(PAGE)) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
