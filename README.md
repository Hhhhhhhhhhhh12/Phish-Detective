# Phish Detective

[![CI für main](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/ci.yml)

**[Öffentliche Trainingsdemo](https://hhhhhhhhhhhh12.github.io/Phish-Detective/)** · [Automatisierte Prüfungen](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/ci.yml) · [Veröffentlichungsläufe](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/pages.yml)

Phish Detective ist ein KI-gestützt entwickelter Prototyp für interaktives
Security-Awareness-Training. Vorbereitete E-Mails, ein Fischdetektiv und kurze
Übungen erklären typische Phishing-Muster. Die Arbeitsprobe zeigt die Umsetzung
von Benutzerführung, lokaler Zustandsverwaltung und einem statischen Release-Prozess.
Sie belegt keine empirisch gemessene Lernwirksamkeit und keine Kundenprojekte.

Die App verwendet **keine Live-KI und keinen eigenen Server**. Fälle und Berichte
sind vorbereitet; der URL-Inspector zerlegt Adressen lokal und das Passwortlabor
bespricht erfundene Übungsbeispiele. Keines dieser Werkzeuge bestätigt die
Sicherheit einer echten Nachricht, Website oder eines echten Kennworts.

## Eine kurze Vorführung

1. **START** öffnet nach dem kurzen Intro das Dashboard. Das Intro lässt sich
   überspringen; bei reduzierter Bewegung führt START direkt weiter.
2. **Demo-Modus** in der Navigation aktivieren. Er öffnet alle Module, ohne
   Fortschritt zu vergeben oder zu löschen.
3. Im **Simulator** einen vorbereiteten Fall lesen, das Linkziel per Fokus,
   Maus oder Antippen ansehen und eine Entscheidung treffen. Danach das
   Feedback und die auf Antworten beruhenden Übungsstatistiken erklären.
4. Einen **URL-Aufbau** untersuchen oder im **Passwort-Lab** ausschliesslich
   erfundene Beispiele vergleichen. Die Grenzen stehen direkt am Ergebnis.
5. Die tatsächlichen Prüfergebnisse über den GitHub-Link ansehen. Ein Ergebnis
   gilt immer für den zugehörigen Commit, also einen bestimmten Code-Stand.

Das Dashboard zeigt keinen simulierten Testlauf und keine fest eingebauten
„Passing“- oder Sicherheitsplaketten. Ein grüner CI-Status für `main` beweist
auch nicht, dass genau dieser Stand öffentlich ausgeliefert wird; Pages wird
separat veröffentlicht.

## Module und Grenzen

| Modul | Implementiertes Verhalten | Grenze |
| --- | --- | --- |
| Phish-O-Mat und Byte | Reaktionsspiel, Spielwerte, Level und Karten mit null/einer/zwei richtigen Antworten | Keine Prüfung echter Absender, keine Kompetenzmessung und kein zeitgesteuerter Lernplan |
| E-Mail-Simulator | Vorbereitete Fälle, Entscheidungen, erklärtes Feedback, gespeicherter Fall und Antwortstand | Eine angezeigte Adresse oder persönliche Anrede authentifiziert keine echte Nachricht |
| Passwort-Lab | Länge und begrenzte Musterhinweise, feste Übungsbeispiele, als Illustration gekennzeichnete Animation | Keine Entropie- oder Knackzeitschätzung; kein Generator für Kontokennwörter; keine Speicherung der Eingabe |
| URL-Inspector | Lokale Browser-URL-Zerlegung und Public Suffix List, einschliesslich privater Hosting-Endungen, IP-Adressen und Punycode | Keine DNS-, Eigentümer-, Zertifikats-, Weiterleitungs-, Inhalts- oder Reputationsprüfung; keine Zielseite wird geöffnet |
| Noir-Comics | Zwei fiktive Geschichten, bewusstes Weiterblättern, Punkte pro Durchlauf | Folgen sind überzeichnet; Comicpunkte werden weder dauerhaft gespeichert noch für Freischaltungen verwendet |
| Beispielberichte | Zwei feste, als vorbereitet bezeichnete Berichte | Keine Live-Analyse und keine berechnete Betrugswahrscheinlichkeit |
| Handbuch | Kurze Hinweise zu Absendern, Links und Handlungsdruck | Einordnung für Training; keine vollständige Sicherheitsausbildung |

Die kräftigen Rahmen, Aquarium-Illustrationen und der Fischdetektiv bleiben
Teil der Gestaltung. Reduzierte Bewegung wird im Intro, bei Motion-Übergängen
und CSS-Animationen berücksichtigt. Dies ist keine vollständige
Barrierefreiheitszertifizierung.

### Sprache

Navigation, Dashboard, Simulator, Handbuch und Teile des Fischspiels haben
deutsche, englische und schweizerische Varianten. Passwortlabor, URL-Inspector,
Comics und Beispielberichtstexte sind derzeit deutsch. Die Sprachauswahl erklärt
diese Begrenzung; vollständige Lokalisierung wird nicht behauptet.

## Fortschritt und lokale Speicherung

| Daten | Verhalten |
| --- | --- |
| Byte-Gesamt-XP | Öffnen Module bei 80 / 180 / 280 / 380 XP; bleiben bei Levelaufstieg erhalten |
| Byte-Level-XP | Restfortschritt im aktuellen Level; getrennt von den Gesamt-XP |
| Simulator-Übungspunkte | Eigene Spielwertung; der aktuell beantwortete Fall wird nach Neuladen mit Feedback wiederhergestellt, ohne erneut Punkte zu vergeben |
| Themenstatistik | Letzte richtige/falsche Entscheidung je vorbereitetem Fall; unbeantwortete Themen haben keinen erfundenen Startwert |
| Comicpunkte | Nur aktueller Durchlauf; Neustart und Geschichtenwechsel setzen sie zurück |
| Demo-Modus | Umgeht nur Freischaltschwellen; erzeugt keine Lern- oder Spielpunkte |

Browserdaten werden beim Lesen auf Struktur geprüft. Bei beschädigten Daten
erscheinen sichere Startwerte mit einer Meldung; das Lesen allein überschreibt
den alten Wert nicht. Kann der Browser nichts speichern, bleiben Änderungen
während des geöffneten Tabs verfügbar. Die App weist darauf hin, dass sie beim
Neuladen oder Schliessen verloren gehen können.

Der Simulator-Reset setzt nur seinen eigenen Fortschritt zurück. Das Leeren
des Kartenkastens setzt nur dessen Antworten zurück. Byte, Modulfreischaltungen
und fremde Browserdaten bleiben dabei erhalten. Es wird kein
`localStorage.clear()` verwendet.

Bestehende Byte-Stände werden aus Level und Rest-XP migriert. Historische XP,
die die alte Version nach Level 5 bereits verworfen hatte, sind nicht
rekonstruierbar. Solche Stände behalten mindestens 1000 Gesamt-XP zuzüglich
vorhandener Rest-XP; damit bleiben alle Module frei.

## Entwicklung und Prüfungen

Die CI verwendet **Node.js 22**. Lokal eignet sich dieselbe Hauptversion.

```bash
npm ci --ignore-scripts
npm run dev
```

Entwicklungs- und Vorschauserver dienen der lokalen Arbeit. Für die regulären
Prüfschritte:

```bash
npm run typecheck
npm test
npm run build
npm run build:pages
npm run check:pages
npm run preview:pages
```

Die Pages-Vorschau ist unter `/Phish-Detective/` erreichbar. Das ältere Skript
`npm run lint` bleibt als Alias der TypeScript-Prüfung erhalten. Es gibt
**kein ESLint**, und der TypeScript-`strict`-Modus ist derzeit nicht aktiviert.

Vitest prüft gezielt die Fortschritts-/Speicherlogik, Antwortwiederherstellung,
Passwort-Lernhinweise und URL-Zerlegung. Playwright führt kritische Bedienabläufe
gegen den gebauten Pages-Stand aus: Chromium bei 1366 × 900 Pixeln und WebKit
mit einer Touch-Ansicht bei 390 × 844 Pixeln. Das ist keine Prüfung auf einem
echten iPhone oder Mac. Für einen lokalen Browserlauf nach `build:pages`:

```bash
npx --no-install playwright install --with-deps chromium webkit
npm run test:e2e
```

Die Browserinstallation lädt Testbrowser und kann unter Linux Systempakete
benötigen. Der Testlauf startet seine Vorschau selbst; Port 4173 muss frei
sein. Fremde Webadressen werden in den Tests blockiert. Fehler-Traces,
Screenshots und der HTML-Bericht werden in der CI sieben Tage als Artefakt
aufbewahrt. Ein Trace protokolliert den Testablauf zur Fehlersuche. Die Tests
verwenden ausschliesslich künstliche Daten.

Prüfumfang, konkrete Ergebnisse und verbleibende Grenzen stehen in
[Audit und Abnahme](docs/AUDIT-2026-11-24.md). Tests belegen die geprüften
Szenarien, nicht sämtliche möglichen Benutzerinteraktionen.

### Technik

React 19, TypeScript, Vite, Tailwind CSS 4, Motion und Lucide. Der URL-Inspector
verwendet die im festgelegten `tldts`-Paket enthaltene Public Suffix List. Die
Liste wird nicht zur Laufzeit aus dem Netz nachgeladen; Abhängigkeitsupdates
halten sie aktuell. Paketversionen werden mit `package-lock.json` reproduziert.

## Netzwerk und Veröffentlichung

Fortschritt bleibt im Browser. Eingaben des Passwortlabors und URL-Inspectors
werden vom Anwendungscode nicht übertragen oder dauerhaft gespeichert.
**Google Fonts und Unsplash liefern weiterhin Schriften beziehungsweise
App-Icons**; lokale Speicherung bedeutet deshalb nicht, dass die gesamte App
keine externen Verbindungen aufbaut. Der Service Worker bietet keinen
Offline-Cache. Es gibt keine Offline-Garantie.

Das [Artefakt-Prüfskript](scripts/check-pages-build.mjs) kontrolliert den
Repository-Unterpfad, erwartete Medien und erlaubte Dateien. Es sucht nach
bekannten Schlüsselformaten und blockiert frühere Live-KI-Endpunkte. Das ist
kein vollständiger Secret-, Schwachstellen- oder Datenschutzscan.

Die CI läuft bei Pull Requests und Pushes auf die konfigurierten Branches.
Workflow-Aktionen sind auf konkrete Commits festgelegt; der Prüfjob hat nur
Leserechte. Pages bleibt ein eigener manueller Workflow und veröffentlicht
ausschliesslich `dist`. Merges allein veröffentlichen nichts.

[Release-Checkliste und Rückfallplan](docs/RELEASE-CHECKLIST.md) ·
[Intro-Gestaltung und Herkunft](docs/INTRO.md) · [Repository-Lizenz](LICENSE)

## Fachliche Grundlagen

- [NIST SP 800-63B-4: Strength of Passwords](https://pages.nist.gov/800-63-4/sp800-63b/passwords/): Grenzen von Längen-/Komplexitätsheuristiken und unterschiedliche Angriffsbedingungen.
- [Public Suffix List](https://publicsuffix.org/learn/): Domain-Grenzen sind nicht generell die letzten zwei Bestandteile eines Namens; die Liste ist keine Eigentümer- oder Vertrauensprüfung.
- [WHATWG URL Standard](https://url.spec.whatwg.org/): Host-Normalisierung und Verarbeitung von URL-Bestandteilen.
