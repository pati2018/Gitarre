# Smart Instruments (Gitarre & Smart-Klavier)

Eine Gitarre und ein Smart-Klavier im Browser: Griffbrett bzw. Tastatur und Akkordmodus, mehrere Instrumente, Autoplay mit Schlag-, Zupf- und Arpeggio-Mustern.

Smart-Klavier direkt öffnen: https://pati2018.github.io/Gitarre/?klavier

Live: https://pati2018.github.io/Gitarre/

Klänge: Fluid R3 GM SoundFont von Frank Wen, CC BY 3.0 (Gitarren und – mit FluidSynth gerendert – Klavier und E-Piano).

Offline: Beim ersten Öffnen speichert sich die App auf dem Gerät (Service Worker `sw.js`) und startet danach auch ohne Internet. Auf iPad/iPhone in Safari „Teilen“ → „Zum Home-Bildschirm“ für ein eigenes App-Symbol im Vollbild.

Schriften (im Ordner `fonts/`): Barlow Condensed (SIL Open Font License 1.1), Yellowtail (Apache License 2.0).

Kopfsteuerung (Modus „Akkorde“, Knopf „👃 Kopf“): Die Nase führt über die Kamera einen Zeiger über die Akkordfelder. Gesichtserkennung mit Google MediaPipe Tasks Vision 0.10.14 (`vendor/mediapipe/`) und dem Modell `models/face_landmarker.task` (float16/1), beide Apache-2.0 (`licenses/Apache-2.0.txt`). Alles läuft auf dem Gerät, kein Bild verlässt es.

Weitere Klänge des Smart-Klaviers (Ordner `banks/`: Schlagzeug, Flöte, Klarinette, Saxophon, Glockenspiel, Marimba, Violine, Cello, Streicher, Pizzicato): mit FluidSynth aus der SoundFont von MIGA gerendert – GeneralUser GS v2.0 von S. Christian Collins, Lizenz `licenses/GeneralUser-GS-LICENSE.txt`.
