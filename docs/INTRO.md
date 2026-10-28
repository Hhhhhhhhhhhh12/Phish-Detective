# Detective-Intro: Außenansicht vor START, POV nach START

## Bestätigte Gestaltung und Reihenfolge

Am 28.10.2026 bestätigt: rauer 80er-Zeichentrickstil, souveräner Detective,
kontrollierter Positionswechsel und Augenbewegung. Der POV wird ausdrücklich
für den Klick auf **START** aufgehoben. Die App-Einbindung wurde danach beauftragt.

- Auf dem Startbildschirm läuft die sechssekündige, stumme Außenansicht einmal.
  Danach bleibt das Wartebild mit dem hängenden Brief stehen. START funktioniert
  auch während des Intros; „Intro anhalten“ pausiert die Außenansicht.
- Erst START lädt und startet den separaten dreisekündigen POV-Clip: Papier,
  Briefkante, Haken und Schnur. Der vorhandene Einstieg ins Dashboard folgt
  nach dem Clip, beim Überspringen oder bei einem Medien-/Wiedergabefehler.
- „Intro überspringen“ erhält während des POV den Tastaturfokus. Escape innerhalb
  des Intro-Bereichs überspringt ebenfalls. Anschließend erhält der App-Titel
  im Dashboard den Fokus. Ein Lade-Watchdog gibt den Einstieg nach acht Sekunden
  frei, wenn die Wiedergabe festhängt.
- Ton ist standardmäßig aus und kann bewusst eingeschaltet werden. Das Intro
  vor START bleibt immer stumm. Es gibt keine gesprochenen Inhalte; eine
  Textbeschreibung benennt die Szene und den entdeckten Haken.
- Bei `prefers-reduced-motion: reduce` bleibt das Standbild sichtbar und START
  führt direkt ins Dashboard. Ein Wechsel zu dieser Einstellung während des
  POV beendet die Sequenz. Die Einstellung wird nicht zusätzlich gespeichert.

## Dateien und Herkunft

| Datei unter `public/media/detective/` | Quelle der bestätigten lokalen Schnittfassung |
| --- | --- |
| `intro.mp4` | `start-sequence-v7/Intro-vor-START.mp4` |
| `pov.mp4` | `start-sequence-v7/POV-nach-START.mp4` |
| `poster.jpg` | `start-sequence-v7/Wartebild-vor-START.jpg` |

H.264 / MP4, 1280 × 720, 30 fps. Die Videos entstanden aus erzeugten,
handgemalt wirkenden Einzelassets und lokaler Ebenenanimation. Klänge wurden
eigens aus Rauschen und Sinustönen synthetisiert; keine Musik-/Sprachsamples.
Es werden keine Schriftdateien, realen Nachrichten, Schlüssel oder Nutzerdaten
mitgeliefert. Schriftzüge in den Bildmedien sind eingebrannt und deutsch;
neue Bedienelemente und Szenenbeschreibungen sind deutsch/Schweiz und englisch.

Die Dateien werden vom selben Ursprung wie die App geladen. `BASE_URL`
berücksichtigt sowohl `/` im Serverbetrieb als auch `/Phish-Detective/` auf
GitHub Pages. Vor START ist kein POV-Videoelement mit einer Quelle vorhanden.
Der Pages-Artefaktprüfer kontrolliert auch die drei Mediendateien und Dateiköpfe.
Zusätzliche Bibliotheken, Tracking oder API-Aufrufe werden nicht benötigt.

## Stand und Freigabegrenzen

Diese Umsetzung baut auf dem noch offenen Pages-PR #2 auf. Sie ist separat
versioniert und nicht gemergt oder veröffentlicht. Die lokale technische Prüfung
wurde am 28.10.2026 separat freigegeben und durchgeführt. Die visuelle Abnahme
der Einbindung bleibt offen. believeinme.de bleibt unverändert.

## Lokale Prüfung am 28.10.2026

Node 22.22.2, vorhandene Installation aus der Lockdatei, keine neuen Abhängigkeiten:

- `npm run lint` (TypeScript), vier vorhandene Passwort-Unit-Tests, Server-Build,
  Pages-Build und `check:pages` erfolgreich. Die vier Unit-Tests prüfen nicht
  den neuen Videoablauf; dafür wurden die folgenden Browserchecks durchgeführt.
- Gebauter Pages-Stand unter `http://127.0.0.1:4181/Phish-Detective/`:
  Außenintro, Pause/Fortsetzen, Standbild am Ende, START, echte dreisekündige
  POV-Wiedergabe und automatischer Dashboard-Einstieg mit korrektem Fokus.
- Vor START kein POV-Videoelement; nach START korrekter Repository-Unterpfad,
  Video vollständig geladen. Ton ist zunächst aus, bewusste Tonwahl setzt
  die POV-Wiedergabe auf ungestummt. Escape und Überspringen funktionieren.
- Sprache Deutsch, Schweiz und Englisch stichprobenartig geprüft.
- Reduzierte Bewegung über einen temporären lokalen Testserver simuliert:
  kein Video beim Aufruf, direkter START-Einstieg; Wechsel während des POV
  beendet ihn ebenfalls. Die Betriebssystemeinstellungen wurden nicht geändert.
- Fehlendes Intro führt zum Poster. Fehlender POV führt ins Dashboard.
  Bei einer testweise 60 Sekunden ausbleibenden Videoantwort wird das Dashboard
  nach 8,009 Sekunden erreicht (lokale DOM-Messung im Testserver).
- Schmale Ansicht bei 390 Pixeln Browser-Viewport mit vorhandener Browser-Skalierung
  (312 CSS-Pixel): Tastatur-START und Überspringen erfolgreich. Seitlicher Überlauf
  der vorhandenen Dekoration wurde im Startbereich behoben; danach Dokumentbreite
  306 CSS-Pixel bei 312 CSS-Pixeln Fensterbreite. CSS-Dekorationen des Startbereichs
  sind bei reduzierter Bewegung abgeschaltet.
- Keine Konsolenfehler im normalen Ablauf. Die absichtlich fehlenden Dateien
  erzeugen erwartete 404-Meldungen nur in den lokalen Fehlersimulationen.
  Keine Live-KI-Anfrage während der Browserchecks.

Bekannter, nicht blockierender Vite-Hinweis: Das minimierte JavaScript bleibt
über 500 kB (Pages rund 578 kB, gzip rund 174 kB). Die drei Mediendateien umfassen
zusammen rund 1,31 MB. Keine neue GitHub-CI-Prüfung beauftragt oder gestartet;
dies ist eine lokale technische Stichprobe, keine vollständige Geräte- oder
Barrierefreiheitsabnahme und keine Freigabe für Merge oder Veröffentlichung.
