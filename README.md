# 🕵️‍♂️ Phish Detective - Gamifiziertes Cyber-Security & Aquarium-Training

<div align="center">

[![CI Build & Verification](https://img.shields.io/badge/CI__Pipeline-Passing-00A3A6?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/hennekeholst/phish-detective/actions)
[![TypeScript Linter](https://img.shields.io/badge/TypeScript-Strict_Typecheck-00E5FF?style=flat-square&logo=typescript&logoColor=black)](https://github.com/hennekeholst/phish-detective)
[![Unit Tests](https://img.shields.io/badge/Tests-Vitest_Passing-FF5500?style=flat-square&logo=vitest&logoColor=white)](https://github.com/hennekeholst/phish-detective)
[![Node Engine Support](https://img.shields.io/badge/Node.js-v20_%2F_v22-2ea44f?style=flat-square&logo=node.js&logoColor=white)](https://github.com/hennekeholst/phish-detective)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](./LICENSE)
[![Framework](https://img.shields.io/badge/Frontend-React_19_&_Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://github.com/hennekeholst/phish-detective)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://github.com/hennekeholst/phish-detective)

</div>

Herzlich willkommen bei **Phish Detective**, dem interaktiven, liebevoll per Hand gestalteten Hub für Cybersicherheits-Aufklärung! 

Dieses Web-Applet verwandelt trockenes IT-Sicherheitswissen in eine lebendige, spielerische Lernerfahrung (Gamification). Anstatt stumpfer Multiple-Choice-Fragen trainieren die Nutzer die Abwehrkräfte ihres eigenen digitalen Hausfisches im simulierten Aquarium, decken Phishing-Domänen im Hochgeschwindigkeits-Reaktionstest auf, analysieren Live-Szenarien und steuern interaktive Ermittlungs-Comics.

---

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
- **Live-Entropie-Rechner**: Erlebe visuell in Echtzeit, warum extreme Länge und Phrasen-Kompilation über reine Zeichenketten-Komplexität siegen.
- **Brute-Force-Takedown**: Ein interaktiver Simulator knackt schwache Passwörter live und demonstriert die Fragilität unzureichender Verschlüsselungen.

### 3. 📧 Der E-Mail-Simulator
- **Scharfer Posteingang**: Untersuche realistische Phishing-, Spearphishing- und CEO-Fraud-Mails im Detail.
- **Interaktivität**: Markiere verdächtige Header, betrügerische Links oder falsche Absenderadressen direkt im Editor.

### 4. 🎬 Die Interactive Noir-Comics
- **Entscheidung-Sagas**: Steuere die Schicksale von "Phish", dem tollpatschigen Anti-Held. Falsche Cyber-Entscheidungen führen zu katastrophalem Server-Chaos (sichtbar durch schmelzende Server-Racks und rot glühende Warnlichter); richtige Antworten führen zum sicheren Hafen.

### 5. 🤖 Der AI Phish-Scanner (Powered by Gemini)
- **Automatische Forensik**: Kopiere beliebigen Quellcode von E-Mails, SMS-Vorlagen oder unbekannten Links in das Terminal.
- **Intelligente Analyse**: Das integrierte Gemini-Modell zerlegt den Text in Echtzeit und warnt vor versteckten Social-Engineering-Mustern.

---

## 💻 Tech-Stack

- **Frontend**: React 19, TypeScript, **Motion** (für extrem geschmeidige Animationen und Übergänge)
- **Styling**: **Tailwind CSS v4** (hochmoderne Utility-First Styles)
- **Backend**: Express-Proxy-Server zur Absicherung vertraulicher System-APIs
- **KI-Integration**: `@google/genai` (Modernstes und sicheres Google Gemini SDK)
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

Die lokale Vorschau verwendet den Projektpfad `/Phish-Detective/`. Der Build
enthält ausschließlich die Browseranwendung; `server.ts`, das Serverbundle
und dessen Quellkarte werden nicht veröffentlicht. Es werden keine
Gemini-Schlüssel benötigt oder in die Pages-Version eingebaut.
`check:pages` prüft die erzeugten Dateipfade und verhindert, dass Serverdateien,
Umgebungsdateien oder die beiden Live-KI-Endpunkte im Pages-Paket landen.

In dieser Version sind die Live-KI-Analyse eigener Nachrichten und die
KI-Fallgenerierung deaktiviert. Der Scanner zeigt deutlich gekennzeichnete,
feste Beispielberichte, der Simulator verwendet die vorbereiteten Fälle.
Es erfolgen keine Aufrufe an die KI-Endpunkte. Lernfortschritt bleibt lokal
im Browser. Schriften und App-Icons werden weiterhin von Google Fonts bzw.
Unsplash geladen; die Trainingsversion ist daher keine vollständig offline
bereitgestellte Anwendung.

Die vorbereitete Veröffentlichung liegt in `.github/workflows/pages.yml`.
Sie startet ausschließlich manuell und nur vom Branch `main`; ein Merge
löst keine Veröffentlichung aus. Nach gesonderter Freigabe in den
Repository-Einstellungen unter **Pages → Source** die Option **GitHub Actions**
wählen und den Workflow **Publish training version to GitHub Pages** starten.
Die vorgesehene Adresse ist
`https://Hhhhhhhhhhhh12.github.io/Phish-Detective/`. Vor einem Workflow-Start
müssen technische Prüfung und Veröffentlichung freigegeben sein. An
believeinme.de werden dafür keine Änderungen vorgenommen.

Die folgenden Schritte betreffen die separate Serverversion mit Live-KI.

Folge diesen einfachen Schritten, um Phish-Detective auf deinem System zu starten:

1. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

2. **Umgebungsvariablen konfigurieren**:
   Erstelle eine `.env` Datei im Stammverzeichnis (analog zu `.env.example`):
   ```env
   GEMINI_API_KEY=dein_gemini_api_key
   ```

3. **Entwicklungs-Server starten**:
   ```bash
   npm run dev
   ```

4. **Kompilieren (Production Build)**:
   ```bash
   npm run build
   ```

5. **Produktions-Modus ausführen**:
   ```bash
   npm run start
   ```

---

## ⚙️ CI/CD Prüfpipelines & Repository-Qualität (GitHub Actions)

Das Projekt verfügt über eine professionelle, einheitliche **GitHub Actions CI-Prüfpipeline** (`.github/workflows/ci.yml`), um Codestabilität und fehlerfreie Deployment-Builds sicherzustellen. Bei jedem Push oder Pull-Request werden automatisch folgende Kontrollen auf virtuellen Ubuntu-Runnern ausgeführt:

1. **Linting & Check**: Führt statische TypeScript-Typenprüfungen durch (`npm run lint` bzw. `tsc --noEmit`), um logische Programmierfehler vorzubeugen.
2. **Automatisierte Unit Tests**: Validiert Kernalgorithmen (wie die Passwort-Entropie-Modelle im Labor) mit der integrierten Vitest Suite (`npm run test` bzw. `vitest run`).
3. **Kompilierungs-Validierung**: Prüft das vollständige Bündeln des React-Clients und des Express-Backend-Proxys für den produktiven Betrieb (`npm run build`), um fehlerhafte Bundles frühzeitig zu verhindern.

---

*Erstellt mit Hingabe und handgefertigter Präzision im AI Studio Workspace.*
