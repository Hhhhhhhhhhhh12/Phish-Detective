import { SimulationCase, LearningModule } from "../types";

export type Language = "de" | "en" | "ch";

export const translations = {
  de: {
    // Start/Landing
    appTitle: "PHISH DETECTIVE",
    systemUnit: "SYSTEM-TRAININGS-EINHEIT // v2.0",
    mutStage: "MUT_STAGE",
    statusLive: "STATUS: LIVE-FEED",
    agentStatus: "AGENTS-STATUS_",
    lvl: "lvl",
    xpText: "SPEICHER-SÄTTIGUNG",
    startCta: "[ DETEKTIV-SCHULUNG STARTEN ]",
    systemCard: "SYSTEM CARD 1A",
    coreModule: "TE-2.0 KERN-MODUL",
    chModeBadge: "",

    // Layout
    hqPath: "HQ Pfad",
    phishomat: "Phish-O-Mat",
    passwordLab: "Passwort-Lab",
    simulator: "Simulator",
    comics: "Noir-Comics",
    aiScan: "AI Scan",
    urlScan: "URL Scan",
    handbook: "Handbuch",
    cheatsOn: "🔓 CHEATS: AN (ALLES OFFEN)",
    cheatsOff: "🔒 LEVELVERLAUF SPERREN",
    mobileMode: "[ → MOBIL-SIMULATOR ]",
    desktopMode: "[ → VOLLE BREITE ]",
    lockMessage: "Gesperrt",
    cheatCta: "[ Sofort freischalten ]",

    // Dashboard
    integrateTitle: "Repository-Prüfstand & CI/CD Pipelines",
    ciStatus: "CI Build & Verification",
    runPipelineBtn: "Test-Pipeline anstoßen",
    pipelineRunning: "Prüfung läuft...",
    resetPipeline: "Zurücksetzen",
    terminalReady: "Prüfstand Geladen // Bitte Diagnostik-Taste drücken",
    terminalSuccess: "Zertifikat Ausgestellt!",
    terminalDesc: "Verifikationslinie zu 100% einwandfrei. Bereit für GitHub-Checks.",
    localBuild: "Dieses Software-Repository sichert jede Code-Änderung über eine echte, vollautomatische Pipeline ab. Drücke auf den Prüfknopf, um die Pipeline-Diagnostik lokal im Simulator auszuführen.",
    dashboardMilestoneTitle: "DEINE CYBER-FORENSIK ROTATION",
    dashboardMilestoneDesc: "Folge der Ausbildungslinie und trainiere die Fähigkeiten deines Fisches, um neue Detektiv-Schnittstellen im System freizuschalten:",
    lockedXp: "Sperre: {xp} XP",
    availableTitle: "BEREIT ZUM START",
    lockedTitle: "GESPERRT",

    // Pet module
    petTitle: "PHISH-O-MAT // LAB",
    petIntro: "Ernähre deinen Fisch mit virenfreien Datenpaketen. Bösartige Angriffe musst du sperren (S-Taste oder Rot), sichere Pakete durchlassen (D-Taste oder Grün)!",
    energy: "Fisch-Energie",
    happiness: "Glücks-Niveau",
    defense: "Krypto-Schild",
    feedCookie: "Cookie verfüttern (+15 E / +5 H)",
    cleanPet: "Viren-Scan & Sauberlauf (+15 H / -5 E)",
    trainDefense: "Schild stärken (+10 S / -10 E)",
    playTitle: "[ REFLEX-TRAINING STARTEN (Kostet 15 Energie) ]",
    rename: "Umbenennen",
    renameSave: "Speichern",
    needEnergy: "ist zu müde für Spiele! Gib ihm erst Web-Cookies (+25 Energy).",
    gameRound: "Runde",
    score: "Punkte",
    time: "Zeit",
    pressKey: "Drücke [S] für Sperren (Spam) oder [D] für Durchlassen (Sicher)",
    gameBtnPhish: "Sperren / Spam [S]",
    gameBtnSafe: "Durchlassen [D]",
    gameTimeOut: "Zeit abgelaufen! Zu langsam!",
    gameCorrect: "Korrekt! Code-Muster erkannt.",
    gameWrong: "Falsch! System infiziert!",
    gameOver: "Training beendet!",
    gameRewardText: "Du hast {score} Punkte erzielt und {xp} XP generiert!",
    gameBackBtn: "[ Laborsteuerung aktivieren ]",

    // Password Lab
    pwdTitle: "KRYPTO_ENTROPIE_ASSESSOR",
    pwdSubtitle: "Berechnung realer Passwortstabilität / Angriffsresistenz",
    pwdLabel: "Muster-Passwort eingeben:",
    strengthLabel: "Sicherheit des Passworts:",
    entropy: "Informations-Entropie",
    bruteForceTime: "Zeit zum Brute-Force Knacken (10 Mrd. Versuche/Sek):",
    instant: "Sofort (Millisekunden)",
    minutes: "Minuten",
    seconds: "Sekunden",
    hours: "Stunden",
    days: "Tage",
    years: "Jahre",
    centuries: "Jahrhunderte",
    lengthPower: "Warum Länge mächtiger ist als Sonderzeichen:",
    lengthDesc: "Ein langes Passwort bildet durch Kombinatorik unknackbare Entropie-Barrieren, selbst wenn es nur aus einfachen Wörtern besteht.",
    pwdTips: "Tipps für perfekte Passwörter:",
    pwdTip1: "Nutze Passsätze mit 4 oder mehr zufälligen Wörtern (z.B. 'fisch-tastatur-kaffee-sicherheit').",
    pwdTip2: "Benutze niemals dasselbe Passwort für mehr als einen Dienst (Verwende einen Passwort-Manager).",
    pwdTip3: "Aktiviere Zwei-Faktor-Authentifizierung (2FA) wo immer möglich.",

    // AI Scanner
    scanTitle: "AI FORENSIC SCANNERS // GEMINI INTEGRATION",
    scanSubtitle: "Kopiere den Quellcode oder Text einer verdächtigen Mail:",
    scanningBtn: "Analysiere Code...",
    scanNowBtn: "AI Forensik starten",
    scanPlaceholder: "Füge hier den Mailtext, Betreff oder HTML Code ein (z.B. 'Sehr geehrte Bankkunde, verifizieren Sie Ihr Konto sofort...').",
    scanResultTitle: "DIAGNOSE-PROTOKOLL DER KÜNSTLICHEN INTELLIGENZ",
    phishScore: "Phishing-Wahrscheinlichkeit",
    verdict: "Urteil",
    verdictSafe: "ABSOLUT SICHER",
    verdictMedium: "VERDÄCHTIG / MANUELLE PRÜFUNG EMPFOHLEN",
    verdictDanger: "HOCHGRADIG GEFÄHRLICH / PHISHING",

    // URL Inspector
    inspectTitle: "URL SEZIERMESSER // ANATOMIE DER DOMAIN",
    inspectSubtitle: "Prüfe unbekannte Weblinks risikofrei in Einzelteilen",
    inspectLabel: "Verdächtigen Link eingeben:",
    inspectBtn: "Link dekonstruieren",
    inspectPlaceholder: "z.B. https://secure-login.paypal.de.verify-portal.cn/index.html",
    inspectResult: "DEKONSTRUIERTE DOMAIN-ARCHITEKTUR",
    inspectProt: "Übertragungprotokoll",
    inspectSub: "Subdomains (Zusatz)",
    inspectMain: "Registrierte Hauptdomain",
    inspectTld: "Top-Level-Domain (TLD)",
    inspectAnalysis: "SICHERHEITSANALYSE DES DOMAIN-NAME-SYSTEMS (DNS)",

    // Noir Comics
    comicTitle: "INTERAKTIVE FISCH-NOIR SAGA",
    comicSubtitle: "Führe den Detektiv Byte durch Cyber-Kriminalfälle:",
    act: "Akt",
    chapter: "Kapitel",
    decisions: "Deine Entscheidung bestimmt den Ausgang:",
    comicReward: "Ermittlungs-Bonus: +{xp} XP erhalten!",

    // Handbook
    handbookTitle: "HANDBUCH DER ABWEHRKUNST",
    handbookSubtitle: "Strategien gegen modernes Social Engineering"
  },
  en: {
    // Start/Landing
    appTitle: "PHISH DETECTIVE",
    systemUnit: "SYSTEM TRAINING UNIT // v2.0",
    mutStage: "MUT_STAGE",
    statusLive: "STATUS: LIVE-FEED",
    agentStatus: "AGENT STATUS_",
    lvl: "lvl",
    xpText: "STORAGE SATURATION",
    startCta: "[ LAUNCH DETECTIVE TRAINING ]",
    systemCard: "SYSTEM CARD 1A",
    coreModule: "TE-2.0 CORE MODULE",
    chModeBadge: "",

    // Layout
    hqPath: "HQ Path",
    phishomat: "Phish-O-Matic",
    passwordLab: "Password Lab",
    simulator: "Simulator",
    comics: "Noir Comics",
    aiScan: "AI Scan",
    urlScan: "URL Scan",
    handbook: "Handbook",
    cheatsOn: "🔓 CHEATS: ON (ALL UNLOCKED)",
    cheatsOff: "🔒 LOCK PROGRESSION",
    mobileMode: "[ → MOBILE MODE ]",
    desktopMode: "[ → DESKTOP MODE ]",
    lockMessage: "Locked",
    cheatCta: "[ Instant Unlock ]",

    // Dashboard
    integrateTitle: "Repository Health & CI/CD Pipelines",
    runPipelineBtn: "Run Verification Pipeline",
    pipelineRunning: "Running pipeline...",
    resetPipeline: "Reset",
    terminalReady: "Verification Rig Loaded // Press the diagnostic key",
    terminalSuccess: "Verification Successful!",
    terminalDesc: "Integration status 100% clean. Ready for GitHub checks.",
    localBuild: "This codebase secures every changes through a fully-automated verification pipeline. Push the trigger to local-run the diagnostics in our emulator.",
    dashboardMilestoneTitle: "YOUR CYBER-FORENSICS ROTATION",
    dashboardMilestoneDesc: "Complete the training regimen and build up your pet's cyber-defenses to unlock advanced system interfaces:",
    lockedXp: "Locked: {xp} XP",
    availableTitle: "READY FOR MISSIONS",
    lockedTitle: "OFFLINE",

    // Pet module
    petTitle: "PHISH-O-MATIC // CYBER LAB",
    petIntro: "Feed your pet with pure, threat-free data packets. Quarantine suspicious attacks (S key or Red button) and let safe traffic pass (D key or Green button)!",
    energy: "Pet Vitality",
    happiness: "Happiness Level",
    defense: "Krypto Shield",
    feedCookie: "Feed Cookie (+15 E / +5 H)",
    cleanPet: "Run Antivirus Scan (+15 H / -5 E)",
    trainDefense: "Boost Crypto Shield (+10 S / -10 E)",
    playTitle: "[ LAUNCH REFLEX REACTION TEST (Costs 15 Energy) ]",
    rename: "Rename Pet",
    renameSave: "Save",
    needEnergy: "is too fatigued to play! Give him some web cookies (+25 Energy) first.",
    gameRound: "Round",
    score: "Score",
    time: "Time Limit",
    pressKey: "Press [S] to Quarantine (Spam) or [D] to Feed/Approve (Safe)",
    gameBtnPhish: "Quarantine / Spam [S]",
    gameBtnSafe: "Approve / Pass [D]",
    gameTimeOut: "Time out! Critical delay!",
    gameCorrect: "Excellent! Safe signature parsed.",
    gameWrong: "Warning! Exploit detected in system!",
    gameOver: "Regimen Completed!",
    gameRewardText: "You scored {score} points and generated +{xp} XP!",
    gameBackBtn: "[ Back to Lab Controls ]",

    // Password Lab
    pwdTitle: "CRYPTO_ENTROPY_ASSESSOR",
    pwdSubtitle: "Real-time auditing of passphrase complexity & crack resilience",
    pwdLabel: "Enter Sample Password:",
    strengthLabel: "Assessed Resilience:",
    entropy: "Information Entropy",
    bruteForceTime: "Estimated time to crack (at 10bn attempts/sec):",
    instant: "Instant (milliseconds)",
    minutes: "Minutes",
    seconds: "Seconds",
    hours: "Hours",
    days: "Days",
    years: "Years",
    centuries: "Centuries",
    lengthPower: "Why length reigns supreme over character styling:",
    lengthDesc: "Using a passphrase with multiple common words constructs combinatorial blockades that brute-forcers cannot realistically touch.",
    pwdTips: "Key security recommendations:",
    pwdTip1: "Select phrases combining 4+ dictionary words (e.g., 'fish-keyboard-coffee-safety').",
    pwdTip2: "Do not recycle secrets across different services (Utilize a modern password vault).",
    pwdTip3: "Enable Multi-Factor Authentication (MFA) on all valuable accounts.",

    // AI Scanner
    scanTitle: "AI FORENSIC SCANNERS // GEMINI COPMILOT",
    scanSubtitle: "Examine a suspicious web or email source code:",
    scanningBtn: "Examining structures...",
    scanNowBtn: "Analyze with Gemini Co-Pilot",
    scanPlaceholder: "Inject raw email source, text block or HTML structures (e.g. 'Dear customers, billing failure, authorize immediate action...').",
    scanResultTitle: "INTELLIGENT COMPLIANCE REPORT",
    phishScore: "Phishing Assessment Index",
    verdict: "Verdict",
    verdictSafe: "ENHANCED SIGNATURE: SAFE",
    verdictMedium: "SUSPICIOUS / ELEVATE TO MANUAL REVIEW",
    verdictDanger: "CRITICAL ALERT / MALICIOUS PATTERNS DETECTED",

    // URL Inspector
    inspectTitle: "URL ANALYSER // LINK ANATOMY DECONSTRUCTOR",
    inspectSubtitle: "Dissect suspicious web domains without risking infections",
    inspectLabel: "Paste Suspicious Link:",
    inspectBtn: "Deconstruct Core Link",
    inspectPlaceholder: "e.g., https://secure-login.paypal.de.verify-portal.cn/index.html",
    inspectResult: "DISSECTED SECURE PORTAL ARCHITECTURE",
    inspectProt: "Payload Protocol",
    inspectSub: "Subdomains (Ancillary)",
    inspectMain: "Registered Root Origin",
    inspectTld: "Top-Level Domain (TLD)",
    inspectAnalysis: "DOMAIN NAME SERVER (DNS) INTEGRITY ASSESSOR",

    // Noir Comics
    comicTitle: "INTERACTIVE FISH NOIR CHRONICLES",
    comicSubtitle: "Steer Detective Byte through deep-sea cyber threats:",
    act: "Act",
    chapter: "Chapter",
    decisions: "Your tactical guidance determines the path:",
    comicReward: "Intelligence Reward: +{xp} XP accrued!",

    // Handbook
    handbookTitle: "HANDBOOK OF CYBER DEFENSE",
    handbookSubtitle: "Protecting systems against modern social engineering"
  },
  ch: {
    // Start/Landing
    appTitle: "PHISH DETECTIVE",
    systemUnit: "SYSTEM-TRAININGS-EINHEIT // v2.0",
    mutStage: "MUT_STAGE",
    statusLive: "STATUS: LIVE-FEED",
    agentStatus: "AGENTS-STATUS_",
    lvl: "lvl",
    xpText: "SPEICHER-SÄTTIGUNG",
    startCta: "[ DETEKTIV-SCHULUNG STARTEN ]",
    systemCard: "SYSTEM CARD 1A",
    coreModule: "TE-2.0 KERN-MODUL",
    chModeBadge: "SCHWEIZ-MODUS AKTIV 🇨🇭: Die Post & TWINT-Szenarien geladen",

    // Layout
    hqPath: "HQ Pfad 🇨🇭",
    phishomat: "Phish-O-Mat",
    passwordLab: "Passwort-Lab",
    simulator: "Simulator",
    comics: "Noir-Comics",
    aiScan: "AI Scan",
    urlScan: "URL Scan",
    handbook: "Handbuch",
    cheatsOn: "🔓 CHEATS: AN (ALLES OFFEN)",
    cheatsOff: "🔒 LEVELVERLAUF SPERREN",
    mobileMode: "[ → MOBIL-SIMULATOR ]",
    desktopMode: "[ → VOLLE BREITE ]",
    lockMessage: "Gesperrt",
    cheatCta: "[ Sofort freischalten ]",

    // Dashboard
    integrateTitle: "Repository-Prüfstand & CI/CD Pipelines",
    runPipelineBtn: "Test-Pipeline anstossen",
    pipelineRunning: "Prüfung läuft...",
    resetPipeline: "Zurücksetzen",
    terminalReady: "Prüfstand Geladen // Bitte Diagnostik-Taste drücken",
    terminalSuccess: "Zertifikat Ausgestellt!",
    terminalDesc: "Verifikationslinie zu 100% einwandfrei. Bereit für GitHub-Checks.",
    localBuild: "Dieses Software-Repository sichert jede Code-Änderung über eine echte, vollautomatische Pipeline ab. Drücke auf den Prüfknopf, um die Pipeline-Diagnostik lokal im Simulator auszuführen.",
    dashboardMilestoneTitle: "DEINE CYBER-FORENSIK ROTATION",
    dashboardMilestoneDesc: "Folge der Ausbildungslinie und trainiere die Fähigkeiten deines Fisches, um neue Detektiv-Schnittstellen im System freizuschalten:",
    lockedXp: "Sperre: {xp} XP",
    availableTitle: "BEREIT ZUM START",
    lockedTitle: "GESPERRT",

    // Pet module
    petTitle: "PHISH-O-MAT // SWISS LAB 🇨🇭",
    petIntro: "Ernähre deinen Fisch mit virenfreien Datenpaketen. Bösartige Angriffe musst du sperren (S-Taste oder Rot), sichere Pakete durchlassen (D-Taste oder Grün)!",
    energy: "Fisch-Energie",
    happiness: "Glücks-Niveau",
    defense: "Krypto-Schild",
    feedCookie: "Cookie verfüttern (+15 E / +5 H)",
    cleanPet: "Viren-Scan & Sauberlauf (+15 H / -5 E)",
    trainDefense: "Schild stärken (+10 S / -10 E)",
    playTitle: "[ REFLEX-TRAINING STARTEN (Kostet 15 Energie) ]",
    rename: "Umbenennen",
    renameSave: "Speichern",
    needEnergy: "ist zu müde für Spiele! Gib ihm erst Web-Cookies (+25 Energy).",
    gameRound: "Runde",
    score: "Punkte",
    time: "Zeit",
    pressKey: "Drücke [S] für Sperren (Spam) oder [D] für Durchlassen (Sicher)",
    gameBtnPhish: "Sperren / Spam [S]",
    gameBtnSafe: "Durchlassen [D]",
    gameTimeOut: "Zeit abgelaufen! Zu langsam!",
    gameCorrect: "Korrekt! Code-Muster erkannt.",
    gameWrong: "Falsch! System infiziert!",
    gameOver: "Training beendet!",
    gameRewardText: "Du hast {score} Punkte erzielt und {xp} XP generiert!",
    gameBackBtn: "[ Laborsteuerung aktivieren ]",

    // Password Lab
    pwdTitle: "KRYPTO_ENTROPIE_ASSESSOR",
    pwdSubtitle: "Berechnung realer Passwortstabilität / Angriffsresistenz",
    pwdLabel: "Muster-Passwort eingeben:",
    strengthLabel: "Sicherheit des Passworts:",
    entropy: "Informations-Entropie",
    bruteForceTime: "Zeit zum Brute-Force Knacken (10 Mrd. Versuche/Sek):",
    instant: "Sofort (Millisekunden)",
    minutes: "Minuten",
    seconds: "Sekunden",
    hours: "Stunden",
    days: "Tage",
    years: "Jahre",
    centuries: "Jahrhunderte",
    lengthPower: "Warum Länge mächtiger ist als Sonderzeichen:",
    lengthDesc: "Ein langes Passwort bildet durch Kombinatorik unknackbare Entropie-Barrieren, selbst wenn es nur aus einfachen Wörtern besteht.",
    pwdTips: "Tipps für perfekte Passwörter:",
    pwdTip1: "Nutze Passsätze mit 4 oder mehr zufälligen Wörtern (z.B. 'fisch-tastatur-kaffee-sicherheit').",
    pwdTip2: "Benutze niemals dasselbe Passwort für mehr als einen Dienst (Verwende einen Passwort-Manager).",
    pwdTip3: "Aktiviere Zwei-Faktor-Authentifizierung (2FA) wo immer möglich.",

    // AI Scanner
    scanTitle: "AI FORENSIC SCANNERS // GEMINI INTEGRATION",
    scanSubtitle: "Kopiere den Quellcode oder Text einer verdächtigen Mail:",
    scanningBtn: "Analysiere Code...",
    scanNowBtn: "AI Forensik starten",
    scanPlaceholder: "Füge hier den Mailtext, Betreff oder HTML Code ein (z.B. 'Sehr geehrte Bankkunden, verifizieren Sie Ihr Konto sofort...').",
    scanResultTitle: "DIAGNOSE-PROTOKOLL DER KÜNSTLICHEN INTELLIGENZ",
    phishScore: "Phishing-Wahrscheinlichkeit",
    verdict: "Urteil",
    verdictSafe: "ABSOLUT SICHER",
    verdictMedium: "VERDÄCHTIG / MANUELLE PRÜFUNG EMPFOHLEN",
    verdictDanger: "HOCHGRADIG GEFÄHRLICH / PHISHING",

    // URL Inspector
    inspectTitle: "URL SEZIERMESSER // ANATOMIE DER DOMAIN",
    inspectSubtitle: "Prüfe unbekannte Weblinks risikofrei in Einzelteilen",
    inspectLabel: "Verdächtigen Link eingeben:",
    inspectBtn: "Link dekonstruieren",
    inspectPlaceholder: "z.B. https://secure-login.postfinance.ch.verify-portal.cn/index.html",
    inspectResult: "DEKONSTRUIERTE DOMAIN-ARCHITEKTUR",
    inspectProt: "Übertragungprotokoll",
    inspectSub: "Subdomains (Zusatz)",
    inspectMain: "Registrierte Hauptdomain",
    inspectTld: "Top-Level-Domain (TLD)",
    inspectAnalysis: "SICHERHEITSANALYSE DES DOMAIN-NAME-SYSTEMS (DNS)",

    // Noir Comics
    comicTitle: "INTERAKTIVE FISCH-NOIR SAGA",
    comicSubtitle: "Führe den Detektiv Byte durch Cyber-Kriminalfälle:",
    act: "Akt",
    chapter: "Kapitel",
    decisions: "Deine Entscheidung bestimmt den Ausgang:",
    comicReward: "Ermittlungs-Bonus: +{xp} XP erhalten!",

    // Handbook
    handbookTitle: "HANDBUCH DER ABWEHRKUNST",
    handbookSubtitle: "Strategien gegen modernes Social Engineering"
  }
};

export const getLocalizedCases = (lang: Language): SimulationCase[] => {
  if (lang === "en") {
    return [
      {
        id: "case-paypal",
        brand: "PayPal",
        logo: "💳",
        senderName: "PayPal Security Center",
        senderEmail: "security@pay-secure-verify.com",
        date: "Today, 09:41 AM",
        recipient: "your.address@example.com",
        subject: "⚠️ URGENT: Your PayPal account has been temporarily restricted",
        body: `Dear customer,\n\nWe detected suspicious access attempts from abroad (location: Hamburg, IP: 198.112.5.90) on your PayPal account.\n\nTo guarantee the safety of your deposits, we have temporarily restricted your account. To lift this restriction and verify your identity, you must act within the next 24 hours.\n\nIf you do not reactivate your account in time, it will be permanently blocked and your funds frozen.\n\nPlease click on the button below to verify your identity and banking info:`,
        links: [
          {
            id: "paypal-link",
            text: "Unlock account now (Verification)",
            actualUrl: "https://pay-secure-verify.com/login/auth-token-checking",
            hoverUrl: "https://www.paypal.com/signin"
          }
        ],
        isPhishing: true,
        difficulty: "Anfänger", // Match union type
        explainingClues: [
          {
            target: "Sender Email Address",
            text: "The email is from 'security@pay-secure-verify.com'. A real PayPal system message would originate from the official domain '@paypal.com' or '@paypal.de'. 'pay-secure-verify.com' is a look-alike fake domain.",
            status: "suspicious"
          },
          {
            target: "Fear & Urgency",
            text: "Artificial urgency is created ('within the next 24 hours', 'permanently blocked'). Phishers utilize panic to bypass rational logic and force hasty operations.",
            status: "suspicious"
          },
          {
            target: "Masked URL Link",
            text: "The link text says 'Unlock account now', but hovering over the anchor reveals it guides to the external 'pay-secure-verify.com' rather than PayPal. This is high risk masking.",
            status: "suspicious"
          },
          {
            target: "Generic Salutation",
            text: "'Dear customer' is generic. PayPal knows your full name from onboarding and would address you by it personally.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "This is classic credential phishing. Scammer utilizes urgency and custom domain tricks to snatch your banking inputs. Remember to check generic salutations, extreme urgency, and the exact spelling behind the sender's origin!"
      },
      {
        id: "case-dhl",
        brand: "DHL Delivery Hub",
        logo: "📦",
        senderName: "DHL Parcel Service",
        senderEmail: "parceldesk@dhl-delivery-storno.com",
        date: "Yesterday, 02:15 PM",
        recipient: "your.address@example.com",
        subject: "📦 Final Notice: Your package could not be delivered (ID: 80491-1)",
        body: `Hello,\n\nYour shipping dispatch with ID DE-48201-92 could not be delivered to your registered address due to an unpaid customs processing fee of $1.49 / €1.49.\n\nTo re-schedule the home delivery slot for tomorrow morning (08:00 AM - 12:00 PM), please settle this micro-postage fee online.\n\nPress the button below to authorize credit card or Apple Pay processing, otherwise the item returns to origin in 3 days.`,
        links: [
          {
            id: "dhl-link",
            text: "Pay customs fee online ($1.49)",
            actualUrl: "https://dhl-zollgebuehren-sicherung.cn/payment-portal",
            hoverUrl: "https://www.dhl.com/global-tracking"
          }
        ],
        isPhishing: true,
        difficulty: "Fortgeschritten",
        explainingClues: [
          {
            target: "Micro-Charge Trap",
            text: "A very small requested charge (like $1.49) lowers psychological barriers. Kriminelle do not want the $1.49, they want your credit card metrics!",
            status: "suspicious"
          },
          {
            target: "Look-alike Subdomain",
            text: "The email domain '@dhl-delivery-storno.com' isn't DHL's property. The word 'dhl' is only added as a helper, but the root domain is different.",
            status: "suspicious"
          },
          {
            target: "Top Level Domain (.cn)",
            text: "The real link guides to a site using '.cn' (China) instead of official routing. Secure couriers never process postage fees on untrusted foreign servers.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Classic Parcel Phishing. Victims readily register credit cards to release a physical package, leading to credit card harvesting. Official couriers do not ask for online fees via sketchy domains."
      },
      {
        id: "case-microsoft",
        brand: "Microsoft Security",
        logo: "🛡️",
        senderName: "Microsoft Account Team",
        senderEmail: "account-security-noreply@accountprotection.microsoft.com",
        date: "2 hours ago",
        recipient: "your.address@example.com",
        subject: "Microsoft account: Single-use security code",
        body: `Hello your.address@example.com,\n\nWe received a request for a single-use code for your Microsoft account.\n\nYour single-use code is: 849202\n\nIf you did not request this code, you can safely ignore this email. Someone else might have entered your email address by mistake.\n\nWarm regards,\nThe Microsoft Account Team`,
        links: [
          {
            id: "ms-link",
            text: "Review recent activity",
            actualUrl: "https://account.microsoft.com/activity",
            hoverUrl: "https://account.microsoft.com/activity"
          }
        ],
        isPhishing: false,
        difficulty: "Experte",
        explainingClues: [
          {
            target: "Sender Domain Integrity",
            text: "The domain '@accountprotection.microsoft.com' is Microsoft's certified and official web domain for authorization codes and key indicators.",
            status: "safe"
          },
          {
            target: "No Coercive Urgency",
            text: "There is no threat or deadline. It explicitly reassuring: 'If you did not request this, you can safely ignore this email.'",
            status: "safe"
          },
          {
            target: "Validated Link Direction",
            text: "Both visible anchor and mouse-hover target direct directly to the official HTTPS Microsoft panel 'account.microsoft.com'.",
            status: "safe"
          }
        ],
        detailedExplanation: "This is a completely LEGITIMATE security message. This is part of standard multi-factor (2FA) verification. The domain is correct, no emergency is threatened, and links guide securely."
      },
      {
        id: "case-amazon",
        brand: "Amazon Prime Support",
        logo: "🎬",
        senderName: "Amazon billing desk",
        senderEmail: "prime-membership@amazon.com",
        date: "3 days ago",
        recipient: "your.address@example.com",
        subject: "Invoice for Amazon Prime monthly cycle",
        body: `Hello John Doe,\n\nThank you for choosing Prime membership. As agreed, your monthly cycle charge of $8.99 was successfully debited from your card ending in (**4821).\n\nYou can access your invoices, receipts, and order histories directly by visiting 'Your Membership Orders' under Amazon.\n\nIf you wish to change payment methods, please head directly to Amazon help pages.`,
        links: [
          {
            id: "amazon-link",
            text: "Manage Prime membership",
            actualUrl: "https://www.amazon.com/gp/primecentral",
            hoverUrl: "https://www.amazon.com/gp/primecentral"
          }
        ],
        isPhishing: false,
        difficulty: "Anfänger",
        explainingClues: [
          {
            target: "Personalized Salutation",
            text: "The invoice mentions your real name ('John Doe'). Amazon stores registration names and uses personalized greeting lines.",
            status: "safe"
          },
          {
            target: "Sanitized Asset Metrics",
            text: "It cites the exact last four digits of your active financial instrument (**4821). Phishing bots rarely hold this granular metadata.",
            status: "safe"
          },
          {
            target: "In-Portal Redirection",
            text: "The email redirects you to the main Amazon.com portal rather than pushing external bank interfaces, directing to secure HTTPS servers.",
            status: "safe"
          }
        ],
        detailedExplanation: "This email is completely LEGITIMATE. It includes personalized customer strings, lists account-linked bank card indicators, and guides cleanly to Amazon's center."
      },
      {
        id: "case-hr-spear",
        brand: "Internal HR Ops",
        logo: "🏢",
        senderName: "Sarah Miller (HR Lead)",
        senderEmail: "hr-desk@company-internal-oauth.com",
        date: "Today, 11:30 AM",
        recipient: "teammember@company.com",
        subject: "⚠️ URGENT: Obligatory Employee survey regarding Q3 Bonuses 2026",
        body: `Hello team,\n\nAs part of our annual salary and performance evaluation cycle for 2026, we are conducting a mandatory employee survey.\n\nPlease process this digital docket by 06:00 PM tonight to guarantee that your bonus multipliers and performance compensation are compiled on schedule. Delays risk compensation holds.\n\nThank you for your immediate service!\n\nSarah Miller\nHead of HR Operations`,
        links: [
          {
            id: "hr-link",
            text: "Launch Employee Assessment Survey",
            actualUrl: "https://company-internal-oauth.com/auth/microsoft-sign-in",
            hoverUrl: "https://company.com/hr-portal"
          }
        ],
        isPhishing: true,
        difficulty: "Experte",
        explainingClues: [
          {
            target: "Company spear target",
            text: "This is Spear-Phishing: attackers cloned an existing corporate colleague and HR executive name to gain confidence.",
            status: "suspicious"
          },
          {
            target: "Manipulative corporate domain",
            text: "The return path is '@company-internal-oauth.com', while your organization resides on '@company.com'. Fake sites merge company terms with tags like '-oauth' or '-secure'.",
            status: "suspicious"
          },
          {
            target: "Credential Harvesting",
            text: "The target link guides to a fake Microsoft sign-in page. Inputting corporate credentials logs them onto the hacker's servers directly.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "A textbook execution of high-risk corporate spear phishing. Attackers study company profiles on LinkedIn, mimic internal HR personnel, and use look-alike login domains to access employee corporate vaults."
      },
      {
        id: "case-mfa-fatigue",
        brand: "ID Identity Suite",
        logo: "🔐",
        senderName: "Global IT Security Portal",
        senderEmail: "admin@global-mfa-verify.com",
        date: "Today, 08:30 AM",
        recipient: "teammember@company.com",
        subject: "⚠️ CRITICAL: Incomplete Authenticator Push (Action Required)",
        body: `Dear employee,\n\nOur system detected 20 pending authenticator-push requests trying to validate entry into your company account.\n\nThis behavior matches server congestion or an ongoing attack from foreign IPs. To secure your credentials, you must Approve the next mobile authorization push manually while matching the token in our corporate validation panel below.\n\nFailing to match the verification sequence triggers automated active-directory freezes.`,
        links: [
          {
            id: "mfa-link",
            text: "Verify Authenticator Token in Security Portal",
            actualUrl: "https://global-mfa-verify.com/auth-validation",
            hoverUrl: "https://internal-portal.company.com"
          }
        ],
        isPhishing: true,
        difficulty: "Experte",
        explainingClues: [
          {
            target: "MFA Fatigue Attack",
            text: "In MFA Fatigue, attackers flood your mobile phone with pushes, hoping you get tired of vibrations and click approve. This fake security email is sent to coerce that.",
            status: "suspicious"
          },
          {
            target: "Sketchy IT Origin",
            text: "Sender is 'admin@global-mfa-verify.com' rather than internal IT. Genuine IT services use official subdomains on the corporate registry.",
            status: "suspicious"
          },
          {
            target: "Coerced mobile approval",
            text: "Never click approve on authorization pushes you didn't trigger himself. IT never demands validating unfamiliar payloads.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "MFA Fatigue (Push Spamming) mixed with custom spear-phishing. Scammers who bought your password spam security pushes, hoping you will blindly authorize access to bypass 2FA barriers."
      },
      {
        id: "case-ai-ceo-emergency",
        brand: "Executive Office",
        logo: "🗣️",
        senderName: "Dr. Thomas Meister (CEO)",
        senderEmail: "thomas.meister@executive-corp-office.com",
        date: "Today, 03:10 PM",
        recipient: "finance@company.com",
        subject: "Econ-Mandate wire transfer / Confidential authorization (Pre-boarding)",
        body: `Hello,\n\nI am seated in the VIP departures lounge at Munich Airport, pre-boarding my flight. I authorized an acquisition budget using AI voice-note on MS Teams earlier today.\n\nThe billing specifications and acquisition brief are hosted on our secure cloud share. Because local agencies require cleared funds before close of business, wire the €14,500 / $14,500 amount immediately to the listed banking digits.\n\nI will have no network accessibility for the next 4 hours. Confirm the status once wired.`,
        links: [
          {
            id: "ceo-link",
            text: "Open CEO Document Cloud (Project Firefly)",
            actualUrl: "https://executive-corp-office.com/share/project-firefly-pdf",
            hoverUrl: "https://cloud.company.com"
          }
        ],
        isPhishing: true,
        difficulty: "Fortgeschritten",
        explainingClues: [
          {
            target: "CEO Fraud & Isolation",
            text: "Scammers utilize executive physical absence ('pre-boarding', '4 hours offline') to prevent telephone reviews and enforce independent panic actions.",
            status: "suspicious"
          },
          {
            target: "Generative Audio Cloak",
            text: "Citing 'AI Voice-memo' tries to build trust. Modern deepfake platforms can replicate any voice from public videos with terrifying accuracy.",
            status: "suspicious"
          },
          {
            target: "Misleading external domain",
            text: "The CEO writes from '@executive-corp-office.com' rather than local systems. Scammers buy premium-sounding domains to confuse users.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "CEO Fraud enriched by AI vectors. Attackers mimic executives or clones of CEO voices to bypass financial rules. Verify unusual money movements over alternative out-of-band channels!"
      },
      {
        id: "case-cal-invite",
        brand: "Cloud Calendar Central",
        logo: "📅",
        senderName: "Cloud System Shares",
        senderEmail: "invite-notification@cloudsystem-shares.com",
        date: "Yesterday, 06:02 PM",
        recipient: "your.address@example.com",
        subject: "New Calendar Event: 📢 IRS Tax Refund Settlement Portal 2026",
        body: `You received an invitation to a shared calendar event:\n\n---\nSubject: Settle your Federal tax refund dispatch ($340.90)\nOrganizer: Federal Security Service\nFormat: Tomorrow, 09:00 - 09:30 AM\nHyperlink: https://irs-tax-refund.info/portal-id3921\n\nDetails:\nYour tax portfolio audit has cleared. Open the link on your mobile phone or computer to authorize funds transfer onto your bank account. Settle this within 5 days to avoid expiration.`,
        links: [
          {
            id: "cal-link",
            text: "Release tax settlement cash",
            actualUrl: "https://irs-tax-refund.info/secure-banking",
            hoverUrl: "https://www.irs.gov/tax-refunds"
          }
        ],
        isPhishing: true,
        difficulty: "Anfänger",
        explainingClues: [
          {
            target: "Risky TLD Ending",
            text: "The link maps to '.info' registration. Genuine tax ministries and governmental entities utilize official domains (.gov or .gov.uk).",
            status: "suspicious"
          },
          {
            target: "iCal calendar vector",
            text: "This is Calendar Spam. Attackers inject links directly into shared calendars to bypass email client spam filters.",
            status: "suspicious"
          },
          {
            target: "Unsolicited government cash",
            text: "Government bodies never deposit tax returns via random links in shared virtual calendar files.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Calendar Hijacking. Attackers send calendar invites that auto-populate into your electronic calendar, bypassing spam defenses and redirecting you to phishing banking portals."
      }
    ];
  }

  if (lang === "ch") {
    // Switzerland mode: Swiss Post, TWINT, Kantonalbank, Swiss spelling, CHF
    return [
      {
        id: "case-paypal",
        brand: "PostFinance & TWINT Support",
        logo: "💳",
        senderName: "PostFinance Sicherheitscenter",
        senderEmail: "sicherheit@postfinance-secure-verify.ch.info",
        date: "Heute, 09:41 Uhr",
        recipient: "ihre.adresse@beispiel.ch",
        subject: "⚠️ DRINGEND: Ihr TWINT-Sicherheitszugang wurde eingeschränkt",
        body: `Sehr geehrte Kundin, sehr geehrter Kunde,\n\nwir haben bei Ihrem PostFinance Postkonto verdächtige TWINT-Zugriffsversuche aus dem Ausland festgestellt.\n\nUm die Sicherheit Ihres Guthabens auf Ihrem Schweizer Bankkonto zu gewährleisten, haben wir den mobilen Zahlungsverkehr vorsorglich eingeschränkt. Um diese Einschränkung aufzuheben, müssen Sie eine manuelle Sicherheitsüberprüfung abschliessen.\n\nFalls Sie Ihr Postkonto nicht innerhalb der nächsten 24 Stunden reaktivieren, wird Ihr Zugang vorübergehend gesperrt.\n\nBitte klicken Sie auf den untenstehenden Button für den direkten Sicherheitsabgleich:`,
        links: [
          {
            id: "paypal-link",
            text: "PostFinance & TWINT-Check starten",
            actualUrl: "https://postfinance-secure-verify.ch.info/login/auth-token-checking",
            hoverUrl: "https://www.postfinance.ch/de/privat/e-finance"
          }
        ],
        isPhishing: true,
        difficulty: "Anfänger",
        explainingClues: [
          {
            target: "Absenderdomain",
            text: "Die E-Mail kommt von '@postfinance-secure-verify.ch.info'. Eine echte Nachricht kommt immer direkt von 'postfinance.ch'. Der Angreifer nutzt eine gefälschte Domain, die nur auf '.info' endet, um Sie zu täuschen.",
            status: "suspicious"
          },
          {
            target: "Druck & Sperrung",
            text: "Es wird künstlicher Zeitdruck erzeugt ('nächste 24 Stunden'). Phisher nutzen die Angst vor einer Kontosperre, um schnelles, unüberlegtes Handeln zu erzwingen.",
            status: "suspicious"
          },
          {
            target: "Verschleierter Link",
            text: "Das Link-Label tut vertrauenswürdig, aber der eigentliche Link im Hintergrund führt auf die gefälschte ausländische Domain 'postfinance-secure-verify.ch.info'.",
            status: "suspicious"
          },
          {
            target: "Anredeformel",
            text: "PostFinance spricht Sie im Online-Banking persönlich mit Namen an. Eine unpersönliche Anrede deutet immer auf Phishing hin.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Dies ist eine hochgradig gefährliche Phishing-Kampagne, die Schweizer Bankkunden im TWINT-Kontext angreift. Betrüger geben sich als PostFinance aus, um Ihre E-Finance Logins abzugreifen."
      },
      {
        id: "case-dhl",
        brand: "Die Schweizerische Post 🇨🇭",
        logo: "📦",
        senderName: "Die Post Kundenservice",
        senderEmail: "paketstation@post-ch-zollabwicklung.info",
        date: "Gestern, 14:15 Uhr",
        recipient: "ihre.adresse@beispiel.ch",
        subject: "📦 Letzte Benachrichtigung: Ihre Sendung kann nicht zugestellt werden (ID: CH-80491)",
        body: `Grüezi,\n\nihr Paket mit der Sendungsnummer CH-48201-92 konnte an Ihre Schweizer Hausadresse nicht übergeben werden, da eine geringe Zollbehandlungsgebühr in Höhe von CHF 2.45 ausstehend ist.\n\nUm die erneute Zustellung durch den Postboten für morgen freizugeben, müssen Sie diese Restgebühr online begleichen.\n\nBitte nutzen Sie das Onlineportal der Schweizerischen Post, um die Gebühr per Kreditkarte oder TWINT zu bezahlen. Andernfalls wird das Paket in 3 Tagen kostenpflichtig retourniert.`,
        links: [
          {
            id: "dhl-link",
            text: "Zollabgabe online bezahlen (CHF 2.45)",
            actualUrl: "https://post-ch-zollabwicklung.info/payment-portal",
            hoverUrl: "https://www.post.ch/de/post-empfangen/paket"
          }
        ],
        isPhishing: true,
        difficulty: "Fortgeschritten",
        explainingClues: [
          {
            target: "Niedrige Gebühr (CHF)",
            text: "Ein minimaler Betrag wie CHF 2.45 lässt niemanden Verdacht schöpfen. Aber Achtung: Es geht den Dieben nicht um zwei Franken, sondern um Ihre wertvollen Kreditkartendaten!",
            status: "suspicious"
          },
          {
            target: "Absenderbereich",
            text: "Die Adresse lautet '@post-ch-zollabwicklung.info'. Die Post nutzt ausschliesslich Adressen auf '.post.ch' oder '.ch' und niemals fremde '.info'-Domänen für Zahlungen.",
            status: "suspicious"
          },
          {
            target: "Fehlendes E-Finance Login",
            text: "Die Post fordert Sie für solche Abwicklungen im echten Post-Portal 'My Post' auf, sich gesichert anzumelden, anstatt Direktlinks für Kreditkarten-Inserts zu schicken.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Das berüchtigte Schweizer 'Post-Zoll-Phishing'. Kriminelle nutzen das hohe Vertrauen in 'Die Post' aus, um über kleine Scheinbeträge die gesamte Kreditkarte leerzuräumen."
      },
      {
        id: "case-microsoft",
        brand: "Microsoft Schweiz",
        logo: "🛡️",
        senderName: "Microsoft Account Team",
        senderEmail: "account-security-noreply@accountprotection.microsoft.com",
        date: "Vor 2 Stunden",
        recipient: "ihre.adresse@beispiel.ch",
        subject: "Microsoft-Konto: Einmaliger Sicherheitscode",
        body: `Hallo ihre.adresse@beispiel.ch,\n\nwir haben eine Anfrage für einen Einmalcode für Ihr Microsoft-Konto erhalten.\n\nIhr Einmalcode lautet: 849202\n\nWenn Sie diesen Code nicht angefordert haben, können Sie diese E-Mail bedenkenlos ignorieren. Ein anderer Benutzer hat möglicherweise versehentlich Ihre E-Mail-Adresse eingegeben.\n\nMit freundlichen Grüssen,\nIhr Microsoft-Konto-Team`,
        links: [
          {
            id: "ms-link",
            text: "Letzte Aktivitäten überprüfen",
            actualUrl: "https://account.microsoft.com/activity",
            hoverUrl: "https://account.microsoft.com/activity"
          }
        ],
        isPhishing: false,
        difficulty: "Experte",
        explainingClues: [
          {
            target: "Offizieller Absender",
            text: "Die Absenderadresse '@accountprotection.microsoft.com' ist die zertifizierte Domäne von Microsoft für Logins und Codes.",
            status: "safe"
          },
          {
            target: "Kein Handlungsdruck",
            text: "Die E-Mail droht nicht. Es heisst sogar explizit, dass man sie einfach ignorieren kann, falls man den Code nicht angefordert hat.",
            status: "safe"
          },
          {
            target: "Sichere URL",
            text: "Sowohl die angezeigte als auch die reale Ziel-URL zeigen auf die echte Microsoft Page under 'account.microsoft.com'.",
            status: "safe"
          }
        ],
        detailedExplanation: "Diese Nachricht ist absolut legitim und Teil der Zwei-Faktor-Sicherung von Microsoft. Keine gefälschte Domain, kein Druck."
      },
      {
        id: "case-amazon",
        brand: "Amazon Prime CH",
        logo: "🎬",
        senderName: "Amazon Prime Support",
        senderEmail: "prime-mitglieder@amazon.de",
        date: "Drei Tage zuvor",
        recipient: "ihre.adresse@beispiel.ch",
        subject: "Rechnung für Ihre Amazon Prime Mitgliedschaft (Schweiz-Abo)",
        body: `Hallo Beat Tobler,\n\nvielen Dank für Ihre Prime-Mitgliedschaft. Wie vereinbart wurde die monatliche Gebühr von CHF 9.90 über Ihr balanciertes Zahlungsmittel eingezogen (Konto mit Endung **4821).\n\nSie finden Ihre Rechnung sowie eine Übersicht Ihrer Bestellungen jederzeit in Ihrem Amazon-Konto. Falls Sie Fragen haben oder Zahlungsdaten anpassen möchten, nutzen Sie bitte das offizielle Hilfe-Center.`,
        links: [
          {
            id: "amazon-link",
            text: "Prime-Mitgliedschaft anpassen",
            actualUrl: "https://www.amazon.de/gp/primecentral",
            hoverUrl: "https://www.amazon.de/gp/primecentral"
          }
        ],
        isPhishing: false,
        difficulty: "Anfänger",
        explainingClues: [
          {
            target: "Echter Schweizer Name",
            text: "Die Mail spricht den Nutzer mit dem realem Namen an ('Beat Tobler'), was unüblich für Massen-Phishing ist.",
            status: "safe"
          },
          {
            target: "Kartenziffern",
            text: "Die Abrechnung nennt die korrekten letzten 4 Stellen der Karte (**4821), die nur Amazon bekannt sind.",
            status: "safe"
          },
          {
            target: "Echte Amazon Domain",
            text: "Der Ziel-Link führt sicher auf die offizielle Schweizer/Deutsche Prime-Infrastruktur unter amazon.de.",
            status: "safe"
          }
        ],
        detailedExplanation: "Eine echte Rechnung von Amazon Prime. Schweizer Kundendaten stimmen, Zahlungsmittel ist maskiert vorhanden und die Links weisen keinerlei Fehler auf."
      },
      {
        id: "case-hr-spear",
        brand: "Interne HR-Abteilung SBB 🇨🇭",
        logo: "🏢",
        senderName: "Anna Keller (Personalabteilung)",
        senderEmail: "hr-department@sbb-mitarbeiter-login.ch.info",
        date: "Heute, 11:30 Uhr",
        recipient: "kollege@sbb.ch",
        subject: "⚠️ DRINGEND: Pflicht-Mitarbeiterumfrage zum Schweizer Bonus-Akkord 2026",
        body: `Grüezi zusammen,\n\nim Rahmen unserer jährlichen Gehalts- und Bonusrunde für das Jahr 2026 führen wir eine kurze Zufriedenheitsumfrage bei allen Schweizer Angestellten durch.\n\nBitte füllt das Online-Formular bis spätestens heute Abend (18:00 Uhr) aus, damit die Leistungszulagen für das kommende Quartal korrekt erfasst und freigegeben werden können.\n\nWer die Teilnahme versäumt, riskiert Auszahlungsverzögerungen auf das Lohnkonto.\n\nVielen Dank für Eure Mitarbeit!\n\nFreundliche Grüsse,\nAnna Keller\nHead of HR Operations`,
        links: [
          {
            id: "hr-link",
            text: "Zur SBB Gehalts-Befragung (Mitarbeiterportal)",
            actualUrl: "https://sbb-mitarbeiter-login.ch.info/auth/office365-oauth-signin",
            hoverUrl: "https://sbb.ch/hr-portal"
          }
        ],
        isPhishing: true,
        difficulty: "Experte",
        explainingClues: [
          {
            target: "Spear-Phishing bei Bundesbetrieben",
            text: "Angreifer nutzen den Namen von SBB-Personalverantwortlichen und richten sich gezielt an Schweizer Angestellte, um hohes Vertrauen zu erzwingen.",
            status: "suspicious"
          },
          {
            target: "Mitarbeiterumfrage-Fake",
            text: "Die angebliche SBB-Domain lautet '@sbb-mitarbeiter-login.ch.info', was ein Betrugs-Portal auf '.info' ist, statt der echten sbb.ch Registratur.",
            status: "suspicious"
          },
          {
            target: "Credential Harvesting",
            text: "Wer auf den Link klickt, landet auf einer gefälschten Office365-Maske, um die SBB-Mitarbeiter-Logins direkt abzufangen. Damit dringen Angreifer ins Bundesnetz ein.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Dieses Spear-Phishing zielt gezielt auf Mitarbeiter Schweizer Betriebe ab. Es imitiert interne Mitteilungen, um Firmen-Dienstzugänge mit hoher krimineller Energie abzugreifen."
      },
      {
        id: "case-mfa-fatigue",
        brand: "IT Operations Center",
        logo: "🔐",
        senderName: "Schweizer Core-IT Security",
        senderEmail: "it-operations@mitarbeiter-mfa-portal.ch",
        date: "Heute, 08:30 Uhr",
        recipient: "kollege@firma.ch",
        subject: "⚠️ KRITISCH: Unvollständiger MFA-Sicherheitspush (Handlungsbedarf)",
        body: `Grüezi,\n\nunser IDS (Intrusion Detection System) hat 20 ausstehende Authenticator-Bestätigungen für Ihr Firmenkonto registriert.\n\nDies wurde vermutlich durch ein Serverproblem oder einen Angriff ausgelöst. Um Ihr Konto vor einer automatischen 48-Stunden-Sperre zu schützen, müssen Sie den nächsten eingehenden Authenticator-Push auf Ihrem Smartphone jetzt MANUELL BESTÄTIGEN und parallel im Portal abgleichen.\n\nAndernfalls sperrt Active Directory Ihren gesamten Systemzugang.`,
        links: [
          {
            id: "mfa-link",
            text: "MFA-Freigabe im Portal abgleichen",
            actualUrl: "https://mitarbeiter-mfa-portal.ch/auth-validation",
            hoverUrl: "https://internal-portal.company.ch"
          }
        ],
        isPhishing: true,
        difficulty: "Experte",
        explainingClues: [
          {
            target: "Schnittstellen-Fatigue",
            text: "Dies ist die berüchtigte MFA-Fatigue-Attacke. Kriminelle spamen Sie mit Handypushes. Diese gefälschte IT-Mail soll Sie drängen, endlich auf 'Ja' bzw. 'Bestätigen' zu klicken.",
            status: "suspicious"
          },
          {
            target: "Falsche IT-Adresse",
            text: "Das Portal 'mitarbeiter-mfa-portal.ch' gehört nicht zur IT eures Schweizer Betriebs. Echte IT-Abteilungen nutzen nur interne Firmen-Domains.",
            status: "suspicious"
          },
          {
            target: "Unberechtigte Freigabe",
            text: "Geben Sie NIEMALS einen MFA-Freigabepush frei, den Sie nicht selbst ausgelöst haben. Das ist das Einfallstor für Hacker.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Falsche Sicherheitsanweisungen im typischen Schweizer Gewand. Angreifer nutzen die genervten Reaktionen aus (MFA Fatigue), um die Zwei-Faktor-Sperre auszuhebeln."
      },
      {
        id: "case-ai-ceo-emergency",
        brand: "CH-Konzernleitung",
        logo: "🗣️",
        senderName: "Dr. Thomas Meister (Konzernchef)",
        senderEmail: "thomas.meister@executive-corp-office.com",
        date: "Heute, 15:10 Uhr",
        recipient: "finanzen@firma.ch",
        subject: "Dringende Auszahlung / Dringendes Mandat (Vor meinem Abflug)",
        body: `Grüezi,\n\nich sitze gerade in der VIP-Lounge am Flughafen Zürich und mein Boarding beginnt gleich. Ich habe soeben per KI-Sprachnotiz auf Teams ein dringendes Überweisungsmandat freigegeben.\n\nDie Unterlagen und die Zahlungsverbindungen sind auf unserem sicheren Cloud-Share hinterlegt. Da die Behörde auf sofortigen Geldeingang besteht, überweisen Sie bitte die fälligen CHF 14'500 sofort an das angegebene Schweizer Postkonto im Share.\n\nIch bin die nächsten 4 Stunden im Flieger ohne Empfang, also kümmern Sie sich bitte umgehend darum. Bestätigen Sie mir das direkt auf dem Share-Portal.`,
        links: [
          {
            id: "ceo-link",
            text: "Zum CEO-Dokumentenspeicher (Project Firefly)",
            actualUrl: "https://executive-corp-office.com/share/project-firefly-pdf",
            hoverUrl: "https://cloud.firma.ch"
          }
        ],
        isPhishing: true,
        difficulty: "Fortgeschritten",
        explainingClues: [
          {
            target: "CEO-Fraud & Abwesenheit",
            text: "Die angebliche Abreise ('Flughafen Zürich', '4 Stunden offline') soll Rückfragen verhindern, sodass Sie panisch die Transaktion alleine abschliessen.",
            status: "suspicious"
          },
          {
            target: "KI-Cloned Sprachnotiz",
            text: "Kriminelle klonen Chef-Stimmen täuschend echt mit künstlicher Intelligenz (Deepfakes), um Finanzabteilungen mit hoher Glaubwürdigkeit zu manipulieren.",
            status: "suspicious"
          },
          {
            target: "Fremde Mailadresse",
            text: "Der Absender nutzt '@executive-corp-office.com' statt der echten Konzernadresse für diesen kritischen Abwicklungsfall.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Der finanzielle Chef-Betrug (CEO Fraud) adaptiert mit Deepfakes. Verifizieren Sie bei solchen Zahlungen (hier CHF 14'500) immer über ein zweites, unbeteiligtes Schweizer Organ."
      },
      {
        id: "case-cal-invite",
        brand: "Eidgenössische Steuerverwaltung (ESTV) 🇨🇭",
        logo: "📅",
        senderName: "ESTV Auszahlungs-Dienst",
        senderEmail: "invite-notification@estv-direkt-twint.ch",
        date: "Gestern, 18:02 Uhr",
        recipient: "ihre.adresse@beispiel.ch",
        subject: "Neues Ereignis: 📢 Steuerrückerstattung Bundessteuer & TWINT-Auszahlung 2026",
        body: `Sie haben eine Einladung zu einem neuen Kalenderereignis erhalten:\n\n---\nBetreff: Auszahlung Ihrer Verrechnungssteuer / Rückerstattung (CHF 340.90)\nOrganisator: Eidgenössische Steuerverwaltung (ESTV)\nZeit: Morgen, 09:00 - 09:30 Uhr\nOrt/Link: https://estv-twint-rueckzahlung.info/secure-banking\n\nBeschreibung:\nIhr Steuerbescheid wurde erfolgreich freigegeben. Bitte rufen Sie den oben stehenden Link auf Ihrem Mobilgerät auf, um die Auszahlung direkt auf Ihre Handynummer per TWINT oder Ihre IBAN zu autorisieren. Wenn Sie die Frist von 5 Tagen verpassen, verfällt der Anspruch.`,
        links: [
          {
            id: "cal-link",
            text: "Zur TWINT-Steuerrückerstattung (CHF 340.90)",
            actualUrl: "https://estv-twint-rueckzahlung.info/secure-banking",
            hoverUrl: "https://www.estv.admin.ch"
          }
        ],
        isPhishing: true,
        difficulty: "Anfänger",
        explainingClues: [
          {
            target: "Webdomain auf '.info'",
            text: "Der angebliche offizielle Link verweist auf eine billige '.info' Domain. Schweizer Bundesbehörden nutzen ausschliesslich '.admin.ch'.",
            status: "suspicious"
          },
          {
            target: "Kalender-Spam (iCal)",
            text: "Die Angreifer umgehen herkömmliche E-Mail-Spamfilter, indem sie eine Kalendereinladung schicken, die sich automatisch in Ihr Handy einbucht.",
            status: "suspicious"
          },
          {
            target: "Unerwartete Gelder von Behörden",
            text: "Die ESTV zahlt Steuern niemals formlos über TWINT-Direktlinks aus, die in unbestellten Kalenderdateien verschickt werden.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Ein klassisches Schweizer Kalender-Phishing. Spamer tragen sich in Ihren Online-Kalender ein. Die angebliche Steuerverwaltung (ESTV) will Ihre e-Banking Daten stehlen."
      }
    ];
  }

  // default fallback: de
  return [
    {
      id: "case-paypal",
      brand: "PayPal",
      logo: "💳",
      senderName: "PayPal Sicherheitscenter",
      senderEmail: "sicherheit@pay-secure-verify.com",
      date: "Heute, 09:41 Uhr",
      recipient: "ihre.adresse@beispiel.de",
      subject: "⚠️ DRINGEND: Ihr PayPal-Konto wurde vorübergehend eingeschränkt",
      body: `Sehr geehrte Kundin, sehr geehrter Kunde,\n\nwir haben bei Ihrem PayPal-Konto verdächtige Zugriffsversuche aus dem Ausland (Standort: Hamburg, IP: 198.112.5.90) festgestellt.\n\nUm die Sicherheit Ihres Guthabens zu gewährleisten, haben wir Ihr Konto vorübergehend eingeschränkt. Um die Sperrung aufzuheben und Ihr Konto verifizieren zu lassen, müssen Sie innerhalb der nächsten 24 Stunden handeln.\n\nFalls Sie Ihr Konto nicht zeitnah reaktivieren, wird es dauerhaft gesperrt und verbleibendes Guthaben eingefroren.\n\nBitte klicken Sie auf den untenstehenden Button, um Ihre Identität und Ihr Bankkonto zu verifizieren:`,
      links: [
        {
          id: "paypal-link",
          text: "Konto jetzt entsperren (Verifizierung)",
          actualUrl: "https://pay-secure-verify.com/login/auth-token-checking",
          hoverUrl: "https://www.paypal.com/signin"
        }
      ],
      isPhishing: true,
      difficulty: "Anfänger",
      explainingClues: [
        {
          target: "Absender-E-Mail",
          text: "Die E-Mail kommt von 'sicherheit@pay-secure-verify.com'. Eine echte Nachricht von PayPal würde immer von der offiziellen Domain 'paypal.com' oder 'paypal.de' gesendet werden. 'pay-secure-verify.com' ist eine registrierte Fake-Domain.",
          status: "suspicious"
        },
        {
          target: "Drohung & Dringlichkeit",
          text: "Es wird künstlicher Zeitdruck erzeugt ('innerhalb der nächsten 24 Stunden', 'dauerhaft gesperrt'). Phisher nutzen Angst, um schnelles Handeln zu erzwingen, ohne nachzudenken.",
          status: "suspicious"
        },
        {
          target: "Versteckter Link",
          text: "Der angezeigte Link im Browser-Status beim Hovern zeigt eigentlich auf die bösartige Domain 'pay-secure-verify.com', während das Label vertrauenswürdig tut. Das ist ein klassischer Verschleierungsversuch.",
          status: "suspicious"
        },
        {
          target: "Unpersönliche Anrede",
          text: "'Sehr geehrte Kundin, sehr geehrter Kunde' ist unpersönlich. PayPal kennt Ihren vollen Namen und würde Sie stets persönlich ansprechen.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dies ist eine klassische Phishing-Mail. Die Täter versuchen durch Panikmache (Konto-Sperrung) und gefälschte Absender-Domains Ihre Anmelde- und Bankdaten abzugreifen. Achten Sie stets auf unpersönliche Anrede, extreme Eile und die exakte Schreibweise der Absenderdomain!"
    },
    {
      id: "case-dhl",
      brand: "DHL Paketstation",
      logo: "📦",
      senderName: "DHL Kundenservice",
      senderEmail: "paketstation@dhl-bestellung-storno.de",
      date: "Gestern, 14:15 Uhr",
      recipient: "ihre.adresse@beispiel.de",
      subject: "📦 Letzte Mitteilung: Ihr Paket konnte nicht zugestellt werden (ID: 80491-1)",
      body: `Hallo,\n\nihr Paket mit der Sendungsnummer DE-48201-92 konnte beim ersten Zustellversuch nicht an Ihre Hausadresse übergeben werden, da eine geringe Zollgebühr in Höhe von 1,49 EUR fällig ist.\n\nUm die erneute Zustellung für morgen früh (08:00 - 12:00 Uhr) freizugeben, müssen Sie diese geringe Restgebühr online begleichen.\n\nBitte nutzen Sie das DHL-Onlineportal, um die Gebühr per Kreditkarte oder Apple Pay zu bezahlen, andernfalls wird die Sendung innerhalb von 3 Tagen an den Absender zurückgesendet.`,
      links: [
        {
          id: "dhl-link",
          text: "Zollgebühr online bezahlen (1,49 EUR)",
          actualUrl: "https://dhl-zollgebuehren-sicherung.cn/payment-portal",
          hoverUrl: "https://www.dhl.de/packet-post"
        }
      ],
      isPhishing: true,
      difficulty: "Fortgeschritten",
      explainingClues: [
        {
          target: "Restbetrag-Falle",
          text: "Eine sehr kleine geforderte Gebühr (z.B. 1,49 EUR) lässt den Nutzer die Gefahr unterschätzen. Es geht den Betrügern jedoch nicht um die 1,49 EUR, sondern um Ihre wertvollen Kreditkartendaten!",
          status: "suspicious"
        },
        {
          target: "Absenderbereich",
          text: "Der Domainbereich der E-Mail lautet '@dhl-bestellung-storno.de'. Das Wort 'dhl' wurde nur als Sub-Wort davorgehängt. Die wirkliche Domain ist 'dhl-bestellung-storno.de', welche nicht zu DHL gehört.",
          status: "suspicious"
        },
        {
          target: "Top-Level-Domain (.cn)",
          text: "Der echte Ziel-Link führt zu einer Website mit der Endung '.cn' (China), nicht '.de' oder '.com'. DHL leitet Gebührenzahlungen niemals auf chinesische Server um.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dies ist das berüchtigte 'Zoll-Phishing' (Parcel Phishing). Opfer geben bereitwillig ihre Kreditkartendaten ein, um ein vermeintliches Paket freizuschalten. DHL fordert solche Gebühren niemals unerwartet via Mail von dubiosen Domains an."
    },
    {
      id: "case-microsoft",
      brand: "Microsoft",
      logo: "🛡️",
      senderName: "Microsoft Account Team",
      senderEmail: "account-security-noreply@accountprotection.microsoft.com",
      date: "Vor 2 Stunden",
      recipient: "ihre.adresse@beispiel.de",
      subject: "Microsoft-Konto: Einmaliger Sicherheitscode",
      body: `Hallo ihre.adresse@beispiel.de,\n\nwir haben eine Anfrage für einen Einmalcode für Ihr Microsoft-Konto erhalten.\n\nIhr Einmalcode lautet: 849202\n\nWenn Sie diesen Code nicht angefordert haben, können Sie diese E-Mail bedenkenlos ignorieren. Ein anderer Benutzer hat möglicherweise versehentlich Ihre E-Mail-Adresse eingegeben.\n\nMit freundlichen Grüßen,\nIhr Microsoft-Konto-Team`,
      links: [
        {
          id: "ms-link",
          text: "Letzte Aktivitäten überprüfen",
          actualUrl: "https://account.microsoft.com/activity",
          hoverUrl: "https://account.microsoft.com/activity"
        }
      ],
      isPhishing: false,
      difficulty: "Experte",
      explainingClues: [
        {
          target: "Absender-E-Mail",
          text: "Der Absender '@accountprotection.microsoft.com' ist die offizielle und zertifizierte Domain von Microsoft für Systemnachrichten und Sicherheitscodes.",
          status: "safe"
        },
        {
          target: "Kein Handlungszwang",
          text: "Es gibt keinen Zwang, auf einen Link zu klicken. Es heißt sogar explizit: 'Wenn Sie diesen Code nicht angefordert haben, ignorieren Sie diese E-Mail.' Phishing-Mails würden Sie drängen, das Passwort sofort zu ändern.",
          status: "safe"
        },
        {
          target: "Sicherer Link",
          text: "Der Link und die angezeigte Hover-URL stimmen exakt überein und verweisen auf die völlig sichere, offizielle Microsoft-Subdomain 'account.microsoft.com'.",
          status: "safe"
        }
      ],
      detailedExplanation: "Diese E-Mail ist völlig LEGITIM. Es handelt sich um ein normales Sicherheits-Feature der Zwei-Faktor-Authentifizierung (2FA). Da Microsoft nicht zur sofortigen Datenfreigabe droht, der Absender echt ist und der Link auf die echte Microsoft-Domain führt, besteht hier keine Gefahr."
    },
    {
      id: "case-amazon",
      brand: "Amazon Prime",
      logo: "🎬",
      senderName: "Amazon Prime Support",
      senderEmail: "prime-mitgliedschaft@amazon.de",
      date: "Drei Tage zuvor",
      recipient: "ihre.adresse@beispiel.de",
      subject: "Rechnung für Ihre Amazon Prime Mitgliedschaft (Monatsabo)",
      body: `Hallo Max Mustermann,\n\nvielen Dank für Ihre Prime-Mitgliedschaft. Wie vereinbart wurde die monatliche Gebühr von 8,99 EUR über Ihr angegebenes Bankkonto (abgebucht von Konto mit Endung **4821) eingezogen.\n\nSie finden Ihre Rechnung sowie eine Übersicht Ihrer Bestellungen jederzeit in Ihrem Amazon-Konto unter 'Meine Bestellungen'.\n\nFalls Sie Fragen zu Ihrer Mitgliedschaft haben oder Ihre bevorzugte Zahlungsart ändern möchten, besuchen Sie bitte direkt die Amazon-Hilfe-Seite.`,
      links: [
        {
          id: "amazon-link",
          text: "Prime-Mitgliedschaft verwalten",
          actualUrl: "https://www.amazon.de/gp/primecentral",
          hoverUrl: "https://www.amazon.de/gp/primecentral"
        }
      ],
      isPhishing: false,
      difficulty: "Anfänger",
      explainingClues: [
        {
          target: "Persönliche Anrede",
          text: "Die E-Mail spricht den Nutzer mit vollem Namen an ('Max Mustermann'). Amazon kennt Ihre Daten im System und personalisiert offizielle Rechnungsmails.",
          status: "safe"
        },
        {
          target: "Sensible Teil-Informationen",
          text: "Es werden die korrekten letzten 4 Ziffern Ihres Kontos/Zahlungsmittels genannt (**4821). Phisher wissen diese Zahlen in der Regel nicht.",
          status: "safe"
        },
        {
          target: "Standard-Verweis",
          text: "Die Mail leitet Sie nicht auf eine Zahlungsseite, sondern verweist auf den regulären Amazon-Kontobereich. Der Link führt direkt zu 'amazon.de' über eine sichere HTTPS-Verbindung.",
          status: "safe"
        }
      ],
      detailedExplanation: "Diese E-Mail ist LEGITIM. Sie enthält Ihren echten Namen, verweist auf existierende Bank-Sperrendungen zur Identifikation und lotst Sie ohne emotionalen Druck auf die echte Amazon-Webpräsenz."
    },
    {
      id: "case-hr-spear",
      brand: "Interne HR-Abteilung",
      logo: "🏢",
      senderName: "Anna Weber (Personalabteilung)",
      senderEmail: "hr-department@firmenname-cloud-login.de",
      date: "Heute, 11:30 Uhr",
      recipient: "kollege@firmenname.de",
      subject: "⚠️ DRINGEND: Pflicht-Mitarbeiterbefragung zum Gehalts-Bonus 2026",
      body: `Hallo zusammen,\n\nim Rahmen unserer jährlichen Gehalts- und Bonusrunde für das Jahr 2026 führen wir eine kurze Zufriedenheitsbefragung durch.\n\nBitte füllt das Online-Formular bis spätestens heute Abend (18:00 Uhr) aus, um sicherzustellen, dass Eure Leistungsbezüge für das kommende Quartal korrekt erfasst und freigegeben werden können. Wer teilzunehmen versäumt, riskiert Auszahlungsverzögerungen.\n\nVielen Dank für Eure Mitarbeit!\n\nMit freundlichen Grüßen,\nAnna Weber\nHead of HR Operations`,
      links: [
        {
          id: "hr-link",
          text: "Zum Mitarbeiterbefragungs-Portal (Mandel-Cloud)",
          actualUrl: "https://firmenname-cloud-login.de/auth/office365-oauth-signin",
          hoverUrl: "https://firmenname.de/hr-portal"
        }
      ],
      isPhishing: true,
      difficulty: "Experte",
      explainingClues: [
        {
          target: "Spear-Phishing (Gezielt)",
          text: "Die Angreifer haben den Namen eines echten Kollegen oder der HR-Leitung nachgeahmt ('Anna Weber') und richten sich an Mitarbeiter der Firma. Das nennt sich Spear-Phishing.",
          status: "suspicious"
        },
        {
          target: "Gefälschte HR-Domain",
          text: "Die Absenderadresse lautet '@firmenname-cloud-login.de', während das eigentliche Unternehmen '@firmenname.de' verwendet. Betrüger registrieren oft Domains mit Zusatzwörtern wie '-cloud-login' oder '-portal'.",
          status: "suspicious"
        },
        {
          target: "Login-Abfrage (Credential Harvesting)",
          text: "Der Ziel-Link führt scheinbar zu einem 'Office365 Signature-Portal' unter einer fremden Domain. Wenn Sie sich dort mit Ihren Microsoft-Anmeldedaten anmelden, haben die Angreifer Zugriff auf Ihr gesamtes Firmennetzwerk!",
          status: "suspicious"
        },
        {
          target: "Künstlicher Druck im Firmenkontext",
          text: "Aufforderungen, die mit Gehaltskürzungen oder Bonusverlust bis heute Abend drohen, sind auch intern unüblich und sollten immer telefonisch oder über einen sicheren Hauskanal verifiziert werden.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dies ist das gefährliche 'Spear Phishing'. Cyberkriminelle recherchieren die Namen von Führungskräften auf Xing/LinkedIn und senden gezielte E-Mails an Mitarbeiter. Sie tarnen sich als HR und nutzen Abzweigungen, um Zugangsdaten (Login Tokens) im Firmennetzwerk abzufischen."
    },
    {
      id: "case-mfa-fatigue",
      brand: "IT Identity Center",
      logo: "🔐",
      senderName: "Global Corporate IT Security",
      senderEmail: "it-operations@company-mfa-portal.com",
      date: "Heute, 08:30 Uhr",
      recipient: "kollege@firmenname.de",
      subject: "⚠️ KRITISCH: Unvollständiger MFA-Sicherheitspush (Aktion erforderlich)",
      body: `Hallo Kollege,\n\nunser IDS (Intrusion Detection System) hat 20 ausstehende Authenticator-Push-Anfragen für dein Firmenkonto registriert.\n\nDies ist ein bekanntes Anstauen im System oder ein böswilliger Angriff Dritter. Um dein Konto vor einer automatischen 48-Stunden-Sicherheitssperre zu schützen, musst du den nächsten eingehenden Authenticator-Push auf deinem Smartphone sofort MANUELL BESTÄTIGEN und parallel deinen Token über unser IT-Portal autorisieren.\n\nSolltest du das Portal nicht sofort nutzen, wird dein Active-Directory-Zugang für heute gesperrt.`,
      links: [
        {
          id: "mfa-link",
          text: "MFA-Zertifikat im IT-Portal abgleichen",
          actualUrl: "https://company-mfa-portal.com/auth-validation",
          hoverUrl: "https://internal-portal.company.com"
        }
      ],
      isPhishing: true,
      difficulty: "Experte",
      explainingClues: [
        {
          target: "MFA Fatigue (Push-Müdigkeit)",
          text: "Dies ist die berüchtigte MFA Fatigue Attacke. Angreifer senden absichtlich duzende Push-Meldungen, um das Opfer zu zermürben, und schicken dann diese gefälschte IT-Mail hinterher, damit man genervt auf 'Akzeptieren' klickt.",
          status: "suspicious"
        },
        {
          target: "Gefälschte IT-Domain",
          text: "Die Adresse 'it-operations@company-mfa-portal.com' imitiert die interne IT. Eine echte IT würde eine interne Subdomain (z.B. '@company.com') nutzen, nicht eine neu registrierte Domain wie 'company-mfa-portal.com'.",
          status: "suspicious"
        },
        {
          target: "Fremdsitzung-Bestätigung",
          text: "Bestätigen Sie NIEMALS einen MFA-Push auf Ihrem Handy, den Sie nicht selbst ausgelöst haben. Echte IT-Teams fordern Sie niemals auf, verdächtige Anfragen absichtlich durchzuwinken!",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dies ist eine hochaktuelle Bedrohung: 'MFA Fatigue' kombiniert mit Spear-Phishing. Hacker, die bereits das Passwort erbeutet haben, bombardieren Sie mit Push-Nachrichten und senden eine gefälschte IT-Mail. Sobald Sie aufgeben oder dem Link folgen und abgleichen, ist Ihr Account kompromittiert."
    },
    {
      id: "case-ai-ceo-emergency",
      brand: "GF-Management",
      logo: "🗣️",
      senderName: "Dr. Thomas Meister (CEO)",
      senderEmail: "thomas.meister@executive-corp-office.com",
      date: "Heute, 15:10 Uhr",
      recipient: "finanzen@firmenname.de",
      subject: "Eilige Überweisung / Schnelles Mandat (Vor meinem Abflug)",
      body: `Hallo,\n\nich sitze gerade in der VIP-Lounge am Flughafen München und mein Boarding beginnt gleich. Ich habe eben per KI-Sprachnotiz auf Teams ein dringendes Mandat für das Akquisitions-Projekt freigegeben.\n\nDie Unterlagen und die Zahlungsanweisung sind auf unserem sicheren Cloud-Share hinterlegt. Da die ausländische Behörde auf sofortigen Geldeingang besteht, überweise bitte die fälligen 14.500 EUR sofort an die angegebene Kontoverbindung im Share.\n\nIch bin die nächsten 4 Stunden im Flieger ohne Empfang, also kümmere dich bitte umgehend darum. Bestätige den Abruf direkt auf dem Share-Portal.`,
      links: [
        {
          id: "ceo-link",
          text: "Zum CEO-Dokumentenspeicher (Project Firefly)",
          actualUrl: "https://executive-corp-office.com/share/project-firefly-pdf",
          hoverUrl: "https://cloud.firmenname.de"
        }
      ],
      isPhishing: true,
      difficulty: "Fortgeschritten",
      explainingClues: [
        {
          target: "CEO-Fraud & Abwesenheit",
          text: "Angreifer nutzen gezielt den Reisestatus der Geschäftsführung ('Boarding gleich', 'im Flieger ohne Empfang'), damit Rückfragen unmöglich erscheinen und das Opfer unter Druck selbstständig handelt.",
          status: "suspicious"
        },
        {
          target: "AI-Erhöhte Glaubwürdigkeit",
          text: "Die Erwähnung einer 'KI-Sprachnotiz' soll Zweifel zerstreuen. Moderne deep-learning Systeme machen CEO-Stimmen täuschend echt nach!",
          status: "suspicious"
        },
        {
          target: "Fremde Führungskräfte-Domain",
          text: "Der CEO schreibt von '@executive-corp-office.com' statt von der offiziellen Firmenadresse. Betrüger investieren Geld für Domains, die hochprofessionell klingen.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Der 'CEO Fraud' (Chef-Betrug) wird heute durch KI revolutioniert. Täter fälschen E-Mails und nutzen KI-Stimmen-Cloning (Deepfakes), um Mitarbeiter zu Sofort-Transaktionen zu bewegen. Verifizieren Sie solche ungewöhnlichen Aufträge IMMER über einen zweiten, unabhängigen Kanal!"
    },
    {
      id: "case-cal-invite",
      brand: "Kalender-Zentrale",
      logo: "📅",
      senderName: "Cloud Kalender-Dienst",
      senderEmail: "invite-notification@cloudsystem-shares.com",
      date: "Gestern, 18:02 Uhr",
      recipient: "ihre.adresse@beispiel.de",
      subject: "Neues Ereignis: 📢 Steuer-Rückerstattung Bundesministerium der Finanzen 2026",
      body: `Sie haben eine Einladung zu einem neuen Kalenderereignis erhalten:\n\n---\nBetreff: Auszahlung Ihrer Überbrückungshilfe-Steuerrückerstattung (340,90 EUR)\nOrganisator: Finanzen-Bund-Sicherheit\nZeit: Morgen, 09:00 - 09:30 Uhr\nOrt/Link: https://finanzen-bund-rueckzahlung.info/portal-id3921\n\nBeschreibung:\nIhr Steuerbescheid für das vergangene Halbjahr wurde erfolgreich freigegeben. Bitte rufen Sie den oben stehenden Link auf Ihrem Mobilgerät oder Rechner auf, um die Auszahlung auf Ihre IBAN zu autorisieren. Wenn Sie die Frist von 5 Tagen verpassen, verfällt der Anspruch.`,
      links: [
        {
          id: "cal-link",
          text: "Zur Steuerrückerstattungs-Auszahlung",
          actualUrl: "https://finanzen-bund-rueckzahlung.info/secure-banking",
          hoverUrl: "https://www.bundesfinanzministerium.de"
        }
      ],
      isPhishing: true,
      difficulty: "Anfänger",
      explainingClues: [
        {
          target: "Länderendung .info",
          text: "Die Zieladresse führt zu '.info', nicht '.de' oder '.bund.de'. Offizielle Behörden nutzen niemals so günstige TLDs für kritischen Datenverkehr.",
          status: "suspicious"
        },
        {
          target: "iCal Phishing-Vektor",
          text: "Dies ist Kalender-Spam. Angreifer injecten Phishing-Links direkt in Ihren Terminkalender, um klassische E-Mail-Spam-Filter zu umgehen.",
          status: "suspicious"
        },
        {
          target: "Unerwartete Geldauszahlungen",
          text: "Behörden fordern niemals zur Bankdaten-Eingabe über formlose Links in Termineinladungen auf.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dies ist 'iCal/Calendar Phishing'. Angreifer senden Kalendereinladungen an E-Mail-Adressen. Die Kalender-Software trägt diese automatisch im Kalender ein und schickt eine Benachrichtigung. Der Link führt auf eine gefälschte Bank-Anmeldeseite."
    }
  ];
};

export const getLocalizedLearningModules = (lang: Language): LearningModule[] => {
  if (lang === "en") {
    return [
      {
        id: "module-sender",
        title: "1. Exposing the Sender",
        shortDescription: "How cybercriminals use fake names and display profiles to hijack your confidence.",
        icon: "Mail",
        clues: [
          "The Display Name (e.g. 'PayPal') can be configured freely and does not validate the underlying email.",
          "Inspect whatever succeeds the '@-symbol'. If you see '@paypal-verification-desk.com' instead of '@paypal.com', it is a scam.",
          "Watch out for typo-squatting variants: like netf1ix.com, paypaI.com (Capital 'I' instead of 'l') or microsoft-security-auth.net."
        ],
        content: "Validating the sender constitutes your primary shield. Scammers utilize spoofing vectors or register close look-alike domains. Carefully check full headers. When display titles sound authentic, but the digital address is randomized or points onto consumer accounts (like web.de, gmail.com), discard the payload straight into trash."
      },
      {
        id: "module-links",
        title: "2. Hover Protocol & Domain Anatomy",
        shortDescription: "Differentiate hazardous destination links from reliable company roots.",
        icon: "Link",
        clues: [
          "Always hover your mouse cursor over any hyperlinks without issuing a click. The actual landing URL will display in your browser status bar.",
          "Distinguish the registered parent (Second-Level-Domain): In 'login.paypal-verify.com.scam.ru', the parent is actually 'scam.ru'! The root sits right before the trailing country code (.ru), separated by a single period.",
          "HTTPS signals secure socket layers, but is no voucher of identity: Scammers acquire free SSL certificates routinely, so the lock logo does not prove legitimacy!"
        ],
        content: "A link text can claim to guide to 'https://your-bank.com', but direct onto foreign servers. Hovering with the mouse strips these layers instantly. Watch for complex nested structures designed to hide the final registered domain."
      },
      {
        id: "module-engineering",
        title: "3. Social Engineering Vectors",
        shortDescription: "How hackers exploit base human drivers: fear, greed, curiosity, and authority.",
        icon: "AlertTriangle",
        clues: [
          "Artificial urgency ('Action required within 2 hours', 'Tax refund expiring tonight') paralyzes rational checks.",
          "Direct threats of legal operations, fines, or frozen assets are standard phishing ammunition.",
          "Sudden rewards ('You won', 'Grant approved') aim directly at avarice and quick clicks."
        ],
        content: "Social Engineering represents the manipulation of cognitive behaviors. Attackers trigger emotional rushes (panic, joy) to trick you into bypassing daily defenses. No genuine portal or banking hub ever demands data overrides within hours under threat of permanent deletion."
      }
    ];
  }

  if (lang === "ch") {
    // Swiss German (no Eszett ß)
    return [
      {
        id: "module-sender",
        title: "1. Den Absender entlarven",
        shortDescription: "Wie Angreifer gefälschte E-Mail-Adressen und Display-Namen nutzen, um Vertrauen zu erschleichen.",
        icon: "Mail",
        clues: [
          "Der Anzeigename (z.B. 'Die Post') ist frei wählbar und sagt nichts über die tatsächliche Absenderadresse aus.",
          "Prüfe immer das, was nach dem @-Zeichen steht. Steht dort '@postfinance-service-sichern.com' statt '@postfinance.ch', ist es Betrug.",
          "Achte auf Buchstabendreher (Typosquatting): z.B. netf1ix.com, paypaI.com (mit grossem i statt l) oder post-sicherheit.ch."
        ],
        content: "Der Absender-Check ist Ihre erste Verteidigungslinie. Betrüger nutzen so genanntes 'Spoofing' oder registrieren 'Look-alike-Domains'. Schauen Sie sich die E-Mail-Header genau an. Wenn der Anzeigename unverdächtig klingt, die Adresse dahinter jedoch kryptisch ist oder von einem Gratis-Anbieter wie Gmail stammt (obwohl es eine Nachricht von PostFinance sein soll), verschieben Sie die Mail sofort in den Spam-Ordner."
      },
      {
        id: "module-links",
        title: "2. Hover-Pflicht & Link-Anatomie",
        shortDescription: "Gefährliche Ziel-Links von echten verlässlichen Webadressen unterscheiden.",
        icon: "Link",
        clues: [
          "Führe den Mauszeiger über einen Link, ohne zu klicken (Hovern). Im E-Mail-Client wird am unteren Rand das echte Ziel angezeigt.",
          "Prüfe die Hauptdomain (Second-Level-Domain): Bei 'login.post.ch.secure-webpage.cn' ist die echte Domain 'secure-webpage.cn'! Der echte Name steht direkt vor dem Länderkürzel (TLD), abgetrennt durch einen Punkt.",
          "Sichere Verbindungen (HTTPS) sind Pflicht, aber Vorsicht: Auch Kriminelle nutzen heutzutage kostenlose SSL-Zertifikate, sodass das grüne Schloss im Browser kein Garant für Seriosität mehr ist!"
        ],
        content: "Ein Link kann als 'www.postfinance.ch' beschriftet sein, aber im Hintergrund auf eine chinesische (.cn) Server-Struktur verlinken. Durch das Hovern (Darübergleiten mit der Maus) enttarnen Sie diese Abweichungen sofort. Halten Sie stets Ausschau nach Subdomain-Tricks, bei denen die bekannte Marke nur als Teil-Subdomain missbraucht wird."
      },
      {
        id: "module-engineering",
        title: "3. Social Engineering Tricks",
        shortDescription: "Wie Hacker Gefühle wie Angst, Neugier, Pflichtbewusstsein oder Gier manipulieren.",
        icon: "AlertTriangle",
        clues: [
          "Extremer Zeitdruck ('Handeln Sie in 2 Stunden', 'Auszahlung sonst verfallen') blockiert rationales Denken.",
          "Drohungen von Geldstrafen, Kontosperrungen oder rechtlichen Schritten sind typische Phishing-Waffen.",
          "Unerwartete Gewinne ('Sie haben gewonnen', 'Steuerrückerstattung beantragen') zielen auf Gier ab."
        ],
        content: "Social Engineering beschreibt die psychologische Manipulation von Menschen. Kriminelle versuchen Sie in einen emotionalen Zustand (Angst, Panik, Freude) zu versetzen, damit Sie Ihre Sicherheitsroutinen vergessen. Keine Schweizer Bank, kein Streamingdienst und kein Konzern verlangt von Ihnen die Eingabe geheimer Daten innerhalb weniger Stunden unter Androhung einer Kontolöschung."
      }
    ];
  }

  // default de
  return [
    {
      id: "module-sender",
      title: "1. Den Absender entlarven",
      shortDescription: "Wie Angreifer gefälschte E-Mail-Adressen und Display-Namen nutzen, um Vertrauen zu erschleichen.",
      icon: "Mail",
      clues: [
        "Der Anzeigename (z.B. 'PayPal') ist frei wählbar und sagt nichts über die tatsächliche Absenderadresse aus.",
        "Prüfe immer das, was nach dem @-Zeichen steht. Steht dort '@paypal-service-sichern.com' statt '@paypal.de', ist es Betrug.",
        "Achte auf Buchstabendreher (Typosquatting): z.B. netf1ix.com, paypaI.com (mit großem i statt l) oder dhl-sicherheit.de."
      ],
      content: "Der Absender-Check ist Ihre erste Verteidigungslinie. Betrüger nutzen so genanntes 'Spoofing' oder registrieren 'Look-alike-Domains'. Schauen Sie sich die E-Mail-Header genau an. Wenn der Anzeigename unverdächtig klingt, die Adresse dahinter jedoch kryptisch ist oder von einem Gratis-Anbieter wie Gmail, Web.de oder Gmx.net stammt (obwohl es eine Nachricht von der Postbank sein soll), verschieben Sie die Mail sofort in den Spam-Ordner."
    },
    {
      id: "module-links",
      title: "2. Hover-Pflicht & Link-Anatomie",
      shortDescription: "Gefährliche Ziel-Links von echten verlässlichen Webadressen unterscheiden.",
      icon: "Link",
      clues: [
        "Führe den Mauszeiger über einen Link, ohne zu klicken (Hovern). Im E-Mail-Client wird am unteren Rand das echte Ziel angezeigt.",
        "Prüfe die Hauptdomain (Second-Level-Domain): Bei 'login.paypal.de.secure-webpage.cn' ist die echte Domain 'secure-webpage.cn'! Der echte Name steht direkt vor dem Länderkürzel (TLD), abgetrennt durch einen Punkt.",
        "Sichere Verbindungen (HTTPS) sind Pflicht, aber Vorsicht: Auch Kriminelle nutzen heutzutage kostenlose SSL-Zertifikate, sodass das grüne Schloss im Browser kein Garant für Seriosität mehr ist!"
      ],
      content: "Ein Link kann als 'www.ihre-bank.de' beschriftet sein, aber im Hintergrund auf eine russische (.ru) oder chinesische (.cn) Server-Struktur verlinken. Durch das Hovern (Darübergleiten mit der Maus) enttarnen Sie diese Abweichungen sofort. Halten Sie stets Ausschau nach Subdomain-Tricks, bei denen die bekannte Marke nur als Teil-Subdomain missbraucht wird."
    },
    {
      id: "module-engineering",
      title: "3. Social Engineering Tricks",
      shortDescription: "Wie Hacker Gefühle wie Angst, Neugier, Pflichtbewusstsein oder Gier manipulieren.",
      icon: "AlertTriangle",
      clues: [
        "Extremer Zeitdruck ('Handeln Sie in 2 Stunden', 'Auszahlung sonst verfallen') blockiert rationales Denken.",
        "Drohungen von Geldstrafen, Kontosperrungen oder rechtlichen Schritten sind typische Phishing-Waffen.",
        "Unerwartete Gewinne ('Sie haben gewonnen', 'Steuerrückerstattung beantragen') zielen auf Gier ab."
      ],
      content: "Social Engineering beschreibt die psychologische Manipulation von Menschen. Kriminelle versuchen Sie in einen emotionalen Zustand (Angst, Panik, Freude) zu versetzen, damit Sie Ihre Sicherheitsroutinen vergessen. Keine seriöse Versicherung, kein Streamingdienst und keine Bank verlangt von Ihnen die Eingabe geheimer Daten innerhalb weniger Stunden unter Androhung einer Kontolöschung."
    }
  ];
};

export const getLocalizedGamePacketsPool = (lang: Language) => {
  if (lang === "en") {
    return [
      { text: "dhl-parcel-delivery.cn", isPhish: true, type: "LINK_DOMAIN" },
      { text: "paypal.com", isPhish: false, type: "LINK_DOMAIN" },
      { text: "security@company-verify-cloud.info", isPhish: true, type: "SENDER_ADDRESS" },
      { text: "support@amazon.com", isPhish: false, type: "SENDER_ADDRESS" },
      { text: "microsoft-activation-key.ru", isPhish: true, type: "LINK_DOMAIN" },
      { text: "accounts.google.com", isPhish: false, type: "LINK_DOMAIN" },
      { text: "netflix-billing-hold.click", isPhish: true, type: "LINK_DOMAIN" },
      { text: "apple-support@secure-icloud-check.com", isPhish: true, type: "SENDER_ADDRESS" },
      { text: "support@github.com", isPhish: false, type: "SENDER_ADDRESS" },
      { text: "mfa-token-auth.online-portal.info", isPhish: true, type: "LINK_DOMAIN" },
      { text: "irs-refunds-direct.gov.us", isPhish: true, type: "LINK_DOMAIN" },
      { text: "github.com", isPhish: false, type: "LINK_DOMAIN" }
    ];
  }

  if (lang === "ch") {
    return [
      { text: "post-paket-zoll.cn", isPhish: true, type: "LINK_DOMAIN" },
      { text: "postfinance.ch", isPhish: false, type: "LINK_DOMAIN" },
      { text: "sicherheit@estv-twint-direkt.info", isPhish: true, type: "SENDENDE_ADRESSE" },
      { text: "kontakt@sbb.ch", isPhish: false, type: "SENDENDE_ADRESSE" },
      { text: "swisscom-konto-sperrung.click", isPhish: true, type: "LINK_DOMAIN" },
      { text: "accounts.google.com", isPhish: false, type: "LINK_DOMAIN" },
      { text: "postfinance-login-abgleich.net", isPhish: true, type: "LINK_DOMAIN" },
      { text: "support@postfinance.ch", isPhish: false, type: "SENDENDE_ADRESSE" },
      { text: "mfa-token-auth.sbb-mitarbeiter.info", isPhish: true, type: "LINK_DOMAIN" },
      { text: "twint-direkt-guthaben.cf", isPhish: true, type: "LINK_DOMAIN" },
      { text: "github.com", isPhish: false, type: "LINK_DOMAIN" }
    ];
  }

  // de fallback
  return [
    { text: "dhl-sendung-zoll.cn", isPhish: true, type: "LINK_DOMAIN" },
    { text: "paypal.de", isPhish: false, type: "LINK_DOMAIN" },
    { text: "it-security@company-login.info", isPhish: true, type: "SENDENDE_ADRESSE" },
    { text: "service@amazon.de", isPhish: false, type: "SENDENDE_ADRESSE" },
    { text: "microsoft-activation-key.ru", isPhish: true, type: "LINK_DOMAIN" },
    { text: "accounts.google.com", isPhish: false, type: "LINK_DOMAIN" },
    { text: "netflix-abo-gesperrt.click", isPhish: true, type: "LINK_DOMAIN" },
    { text: "postbank-direkt-support.com", isPhish: true, type: "SENDENDE_ADRESSE" },
    { text: "support@postbank.de", isPhish: false, type: "SENDENDE_ADRESSE" },
    { text: "mfa-token-auth.company-login-portal.info", isPhish: true, type: "LINK_DOMAIN" },
    { text: "elster-steuer-rueckzahlung.de.com", isPhish: true, type: "LINK_DOMAIN" },
    { text: "github.com", isPhish: false, type: "LINK_DOMAIN" }
  ];
};
