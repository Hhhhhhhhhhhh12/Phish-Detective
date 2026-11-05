# Phish Detective

[![CI-Status](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/ci.yml)
[![Lizenz: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](./LICENSE)

**[Öffentliche Trainingsdemo öffnen](https://hhhhhhhhhhhh12.github.io/Phish-Detective/)**

Phish Detective ist eine technische Arbeitsprobe für interaktives Security-Awareness-Training. Die React-/TypeScript-App zeigt anhand vorbereiteter Fälle, wie sich Absender, Linkziele und typische Phishing-Signale beurteilen lassen. Das Passwortlabor veranschaulicht Passwortstärke mit einer lokalen Heuristik. Im Dashboard lassen sich Module für eine kurze Vorführung über die XP-Freischaltung direkt öffnen.

Die Trainingsanwendung enthält vorbereitete Fälle und feste Beispielberichte. Der Lernfortschritt wird lokal im Browser gespeichert. Die GitHub-Actions-Pipeline prüft Typen, Tests und den Inhalt des Veröffentlichungsartefakts.

## 🎨 Designphilosophie & visuelle Identität

Das Interface folgt einer exklusiven **Tactile Brutalist Aesthetic** mit klaren, dicken Rahmen, starkem Schlagschatten und kontrastreichen Akzentfarben:
- **Echtes Digitales Aquarium**: Ein wunderschön animiertes, simuliertes Glastank-Aquarium mit anpassungsfähigen Vector-Fischen, aufsteigenden Luftblasen, sanften Meereswellen und CRT-Bildschirm-Zerstörungsfiltern.
- **Interaktiver Ermittler-Look**: Kombination aus klassischem Kreide-Karton, tiefem Anthrazit und leuchtenden Signal-Warnungen für echte Detektiv-Atmosphäre.
- **Evolutions-Feedback**: Der persönliche Cyber-Fisch wächst und verändert seine optische Erscheinung (vom einfachen Fisch über coole Sonnenbrillen-Upgrades bis zum majestätischen Königs-Hai mit Detektiv-Hut), wenn der Nutzer Meilensteine und XP-Punkte auf dem Lernpfad sammelt.

---

## 🧩 Die Ausbildungs-Module im Überblick

### 1. 🐠 Der Phish-O-Mat (Leitner-Cyber-Reflektor)
- **Domänen-Reaktionsspiel**: Nutzer müssen in Sekundenbruchteilen echte von gefälschten URLs trennen (z. B. `paypal-security.com` vs. `paypal.com`).
- **Karteikarten-Leitner-Engine**: Falsch beantwortete Sicherheitsbegriffe wandern zurück in vordere Fächer und werden systematisch wiederholt, bis sie perfekt verinnerlicht wurden.

### 2. 🔑 Das Passwort-Lab
- **Stärkeschätzung**: Bewertet Länge, Zeichenklassen und vorhersehbare Muster direkt im Browser.
- **Brute-Force-Simulation**: Veranschaulicht den möglichen Aufwand eines Angriffs anhand geschätzter Werte.

### 3. 📧 Der E-Mail-Simulator
- **Scharfer Posteingang**: Untersuche realistische Phishing-, Spearphishing- und CEO-Fraud-Mails im Detail.
- **Interaktivität**: Markiere verdächtige Header, betrügerische Links oder falsche Absenderadressen direkt im Editor.

### 4. 🎬 Die Interactive Noir-Comics
- **Entscheidung-Sagas**: Steuere die Schicksale von "Phish", dem tollpatschigen Anti-Held. Falsche Cyber-Entscheidungen führen zu katastrophalem Server-Chaos (sichtbar durch schmelzende Server-Racks und rot glühende Warnlichter); richtige Antworten führen zum sicheren Hafen.

### 5. Beispielberichte
- **Trainingsdemo**: Zwei gekennzeichnete Beispielberichte erläutern typische Warnsignale und mögliche nächste Schritte.

---

## 💻 Tech-Stack

- **Frontend**: React 19, TypeScript, **Motion** (für extrem geschmeidige Animationen und Übergänge)
- **Styling**: **Tailwind CSS v4** (hochmoderne Utility-First Styles)
- **Icons**: `lucide-react` (Präzise, einheitliche Vektorsymbole)

---

## 🚀 Lokale Installation & Betrieb

### Detective-Intro und START

Der Startbildschirm zeigt die bestätigte Außenansicht mit dem Fischdetektiv.
Erst **START** spielt den kurzen POV auf Brief, Haken und Schnur ab; danach
öffnet sich das Dashboard. Überspringen, ein direkter Einstieg bei reduzierter
Bewegung und ein Standbild bei nicht verfügbarem Intro sind vorgesehen.
Ton ist standardmäßig aus. Die Medien liegen lokal unter
`public/media/detective/` und verwenden den jeweiligen App-Unterpfad.
Gestaltung, Herkunft und der aktuelle Prüfstatus stehen in [docs/INTRO.md](docs/INTRO.md).

### GitHub Pages: Trainingsversion ohne Live-KI

Für GitHub Pages gibt es einen eigenen statischen Build:

```bash
npm ci
npm run build:pages
npm run check:pages
npm run preview:pages
```

Die lokale Vorschau verwendet den Projektpfad `/Phish-Detective/`.
`check:pages` erlaubt nur das gebaute Frontend, Manifest, Service Worker und
die Intro-Medien. Es prüft die Pfade, sucht in Textdateien nach bekannten
Schlüsselmustern und blockiert die beiden Live-KI-Endpunkte im Artefakt.

Die öffentliche Version zeigt vorbereitete Fälle und feste Beispielberichte.
Der Lernfortschritt bleibt lokal im Browser. Google Fonts und Unsplash
liefern weiterhin Schriften bzw. App-Icons. Die Demo setzt eine
Internetverbindung voraus.

Veröffentlichungen laufen über [Publish training version to GitHub Pages](https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/pages.yml).
Die Pages-Quelle ist GitHub Actions. Der Workflow startet nach Freigabe
manuell von `main` und lädt ausschliesslich das geprüfte Verzeichnis `dist` hoch.

### Lokal entwickeln

```bash
npm ci
npm run dev
```

Für eine Vorschau des lokalen Builds:

```bash
npm run build
npm start
```

---

## ⚙️ CI/CD Prüfpipelines & Repository-Qualität (GitHub Actions)

Die [CI-Pipeline](.github/workflows/ci.yml) prüft Pull Requests und Pushes auf
die dort konfigurierten Branches mit Node.js 22. Sie führt die TypeScript-Prüfung
und die Vitest-Tests zur Passwortbewertung aus, baut die lokale Fassung und die
Pages-Trainingsversion und prüft den Inhalt des Pages-Artefakts.
