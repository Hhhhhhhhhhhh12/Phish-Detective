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
    urlScan: "URL Scan",
    handbook: "Handbuch",
    cheatsOn: "🔓 DEMO-MODUS: AN",
    cheatsOff: "🔒 DEMO-MODUS: AUS",
    mobileMode: "[ → MOBIL-SIMULATOR ]",
    desktopMode: "[ → VOLLE BREITE ]",
    lockMessage: "Gesperrt",
    cheatCta: "[ Demo-Modus aktivieren ]",

    // Dashboard
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
    gameWrong: "Falsche Antwort im Übungsfall.",
    gameOver: "Training beendet!",
    gameRewardText: "Du hast {score} Punkte erzielt und {xp} XP generiert!",
    gameBackBtn: "[ Laborsteuerung aktivieren ]",

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
    urlScan: "URL Scan",
    handbook: "Handbook",
    cheatsOn: "🔓 DEMO MODE: ON",
    cheatsOff: "🔒 DEMO MODE: OFF",
    mobileMode: "[ → MOBILE MODE ]",
    desktopMode: "[ → DESKTOP MODE ]",
    lockMessage: "Locked",
    cheatCta: "[ Enable demo mode ]",

    // Dashboard
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
    urlScan: "URL Scan",
    handbook: "Handbuch",
    cheatsOn: "🔓 DEMO-MODUS: AN",
    cheatsOff: "🔒 DEMO-MODUS: AUS",
    mobileMode: "[ → MOBIL-SIMULATOR ]",
    desktopMode: "[ → VOLLE BREITE ]",
    lockMessage: "Gesperrt",
    cheatCta: "[ Demo-Modus aktivieren ]",

    // Dashboard
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
    gameWrong: "Falsche Antwort im Übungsfall.",
    gameOver: "Training beendet!",
    gameRewardText: "Du hast {score} Punkte erzielt und {xp} XP generiert!",
    gameBackBtn: "[ Laborsteuerung aktivieren ]",

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
            text: "In this prepared case, the sender address differs from the independently known provider address. The case uses the name as a look-alike; no domain registration or ownership lookup was performed.",
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
            text: "A generic greeting can be a clue, but a personalised greeting does not prove authenticity. Consider the other signs in this prepared example.",
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
            target: "Look-alike sender domain",
            text: "The sender domain in this prepared example differs from the independently known provider address. The word 'dhl' inside a domain does not establish ownership; no ownership lookup was performed.",
            status: "suspicious"
          },
          {
            target: "Different link destination",
            text: "The target in this example differs from the independently known provider address. Its country suffix alone proves neither the server location nor fraud.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Classic Parcel Phishing. Victims readily register credit cards to release a physical package, leading to credit card harvesting. Verify unexpected charges through the provider’s app or tracking page opened independently."
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
            target: "Displayed sender domain",
            text: "In this prepared case, the displayed sender uses the provider’s domain. A visible From address alone is not an authentication check.",
            status: "safe"
          },
          {
            target: "No Coercive Urgency",
            text: "This example has no threat or deadline. That is consistent with the prepared legitimate case, but a calm tone alone does not authenticate a real message.",
            status: "safe"
          },
          {
            target: "Link target in this example",
            text: "The prepared link target is 'account.microsoft.com'. A matching displayed target or HTTPS does not by itself authenticate a real message; open the account independently when unsure.",
            status: "safe"
          }
        ],
        detailedExplanation: "This prepared case represents a legitimate security notice. A visible sender and lack of urgency do not verify a real message. Never share an unexpected code; check account activity through the official app opened independently."
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
            text: "The prepared invoice uses the fictional recipient name 'John Doe'. A personal greeting can also appear in phishing and does not authenticate the sender.",
            status: "safe"
          },
          {
            target: "Displayed card digits",
            text: "The example includes fictional card-ending digits (**4821). Such partial details may also be known to an attacker and are not proof of authenticity.",
            status: "safe"
          },
          {
            target: "In-Portal Redirection",
            text: "The prepared link target is 'www.amazon.com/gp/primecentral'. A familiar target or HTTPS alone does not verify a message. Check the invoice through an independently opened customer account.",
            status: "safe"
          }
        ],
        detailedExplanation: "This prepared case represents a legitimate invoice with fictional customer details. A name, card-ending digits and familiar link text do not authenticate a real message. Verify an unexpected charge in the independently opened customer account."
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
            text: "This prepared spear-phishing case uses an alleged HR colleague's name to build trust. A displayed personal name does not authenticate the sender.",
            status: "suspicious"
          },
          {
            target: "Manipulative corporate domain",
            text: "The displayed sender domain is 'company-internal-oauth.com', while the expected portal in this case uses 'company.com'. Added terms such as '-oauth' do not establish a corporate connection; no mail headers or ownership records were checked.",
            status: "suspicious"
          },
          {
            target: "Credential Harvesting",
            text: "The prepared case describes an imitation sign-in page. Entering credentials could expose them; access to further systems would depend on account permissions and additional protections. The target website is not opened here.",
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
            text: "The displayed sender 'admin@global-mfa-verify.com' differs from the expected company portal in this prepared case. IT can also use external service providers; confirm the request through a known IT contact. Domain ownership and age were not checked.",
            status: "suspicious"
          },
          {
            target: "Coerced mobile approval",
            text: "Never approve an authentication request you did not initiate. Reject unexpected requests and contact IT through a known channel, even if a message claims that approval is required.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "This prepared case combines MFA fatigue with spear-phishing: repeated sign-in requests and a false IT instruction aim to obtain your approval. Reject unexpected requests and report them through the established IT channel."
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
            target: "Claimed voice-message approval",
            text: "The message claims approval through a voice note. No recording is provided or verified in this exercise. A voice message can be imitated or manipulated; verify the payment through the established approval process and a known independent contact.",
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
            target: "Generic .info domain suffix",
            text: "The target in this example differs from the independently known tax service address. A suffix alone does not establish ownership or trust.",
            status: "suspicious"
          },
          {
            target: "iCal calendar vector",
            text: "Calendar invitations can carry misleading links. Depending on the calendar settings, an unsolicited invitation may appear as an event or notification; it does not prove that the organiser is trustworthy.",
            status: "suspicious"
          },
          {
            target: "Unsolicited government cash",
            text: "An unexpected refund promise in a calendar invitation should be checked through an independently known government contact or portal. Do not rely on the supplied link when entering banking details.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "This prepared calendar-phishing case uses an invitation to promote a false refund. Depending on the calendar settings, such invitations may appear automatically. A calendar entry does not authenticate the organiser or its links."
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
            text: "Die Absenderadresse im Übungsfall weicht von der unabhängig bekannten Anbieteradresse ab. Der enthaltene Markenname und die Endung '.info' belegen weder Zugehörigkeit noch Betrug. Eine sichtbare Absenderadresse allein bestätigt keine Echtheit.",
            status: "suspicious"
          },
          {
            target: "Druck & Sperrung",
            text: "Es wird künstlicher Zeitdruck erzeugt ('nächste 24 Stunden'). Phisher nutzen die Angst vor einer Kontosperre, um schnelles, unüberlegtes Handeln zu erzwingen.",
            status: "suspicious"
          },
          {
            target: "Verschleierter Link",
            text: "Das Linkziel des Übungsfalls lautet 'postfinance-secure-verify.ch.info' und weicht vom angezeigten Anbieterziel ab. Aus dem Domainnamen lässt sich kein Serverstandort ableiten.",
            status: "suspicious"
          },
          {
            target: "Anredeformel",
            text: "Eine unpersönliche Anrede kann auffallen. Eine persönliche Anrede beweist umgekehrt keine Echtheit; entscheidend ist der Gesamtzusammenhang.",
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
            text: "Ein kleiner Betrag wie CHF 2.45 kann die Hemmschwelle senken. Der vorbereitete Fall soll zeigen, wie eine Zahlungsaufforderung zur Preisgabe von Kreditkartendaten verleiten kann.",
            status: "suspicious"
          },
          {
            target: "Absenderbereich",
            text: "Die im Beispiel genannte Adresse weicht von der bekannten Anbieteradresse ab. Prüfe den Auftrag unabhängig in der offiziellen App; eine .info-Endung allein entscheidet nichts.",
            status: "suspicious"
          },
          {
            target: "Fehlendes E-Finance Login",
            text: "Prüfe die Sendung und eine mögliche Gebühr in der selbst geöffneten offiziellen App oder über einen bekannten Kontakt. Der unerwartete Zahlungslink im Beispiel wird nicht verifiziert.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Dieser vorbereitete Fall zeigt Paket-Phishing: Eine kleine angebliche Gebühr soll zur Preisgabe von Kreditkartendaten verleiten. Prüfe eine unerwartete Gebühr über die unabhängig geöffnete Anbieter-App oder einen bekannten Kontakt."
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
            target: "Angezeigte Absenderdomain",
            text: "Im vorbereiteten Fall wird die Absenderdomain 'accountprotection.microsoft.com' angezeigt. Die sichtbare Adresse allein ist kein Echtheitsnachweis; Header oder Absenderauthentifizierung werden hier nicht geprüft.",
            status: "safe"
          },
          {
            target: "Kein Handlungsdruck",
            text: "Dieser Fall enthält weder eine Drohung noch eine Frist. Das passt zur vorbereiteten legitimen Nachricht, beweist für sich allein aber keine Echtheit. Auch Phishing kann ohne Zeitdruck formuliert sein.",
            status: "safe"
          },
          {
            target: "Linkziel im Beispiel",
            text: "Das vorbereitete Linkziel lautet 'account.microsoft.com'. Ein passender sichtbarer Link oder HTTPS allein bestätigt keine Echtheit einer realen Nachricht; öffne das Konto bei Zweifeln unabhängig.",
            status: "safe"
          }
        ],
        detailedExplanation: "Dieser vorbereitete Fall stellt eine legitime Sicherheitsbenachrichtigung dar. Sichtbare Adresse und fehlender Zeitdruck allein verifizieren keine echte Nachricht. Teile unerwartete Codes nicht und prüfe Aktivitäten unabhängig."
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
            target: "Persönliche Anrede",
            text: "Die vorbereitete Rechnung nennt den fiktiven Empfänger 'Beat Tobler'. Auch Phishing kann eine persönliche Anrede enthalten; der Name bestätigt keinen echten Absender.",
            status: "safe"
          },
          {
            target: "Kartenziffern",
            text: "Das Beispiel enthält fiktive Endziffern eines Zahlungsmittels (**4821). Solche Teilinformationen können auch Angreifern bekannt sein und beweisen keine Echtheit.",
            status: "safe"
          },
          {
            target: "Linkziel im Beispiel",
            text: "Das Linkziel des vorbereiteten Falls lautet amazon.de. Das bestätigt keine Echtheit einer realen Nachricht; öffne das Kundenkonto bei Zweifeln unabhängig.",
            status: "safe"
          }
        ],
        detailedExplanation: "Dieser vorbereitete Fall stellt eine legitime Rechnung mit fiktiven Kundendaten dar. Name, Endziffern und vertrauter Linktext beweisen keine Echtheit einer realen Nachricht. Prüfe unerwartete Abbuchungen im unabhängig geöffneten Kundenkonto."
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
            text: "Der vorbereitete Fall verwendet den Namen einer angeblichen Personalverantwortlichen, um Vertrauen aufzubauen. Ein angezeigter Personenname bestätigt weder eine echte Person noch ihre Zugehörigkeit zum Betrieb.",
            status: "suspicious"
          },
          {
            target: "Mitarbeiterumfrage-Fake",
            text: "Die Absenderdomain im Übungsfall lautet 'sbb-mitarbeiter-login.ch.info' und unterscheidet sich vom erwarteten Portal 'sbb.ch'. Der Markenname und die Endung allein bestätigen weder Zugehörigkeit noch Betrug; prüfe den Auftrag über einen bekannten internen Kontakt.",
            status: "suspicious"
          },
          {
            target: "Credential Harvesting",
            text: "Der vorbereitete Fall beschreibt eine nachgeahmte Anmeldeseite. Die Eingabe könnte Zugangsdaten preisgeben; welche Systeme betroffen wären, hängt von Kontorechten und zusätzlichen Schutzmassnahmen ab. Die Zielseite wird hier nicht geöffnet.",
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
            text: "Das Portal 'mitarbeiter-mfa-portal.ch' weicht vom erwarteten Firmenportal des Übungsfalls ab. IT kann auch externe Dienstleister nutzen; bestätige die Anfrage über einen bekannten IT-Kontakt. Eigentum und Alter der Domain wurden nicht geprüft.",
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
            target: "Behauptete Freigabe per Sprachnotiz",
            text: "Die Nachricht behauptet eine Freigabe per Sprachnotiz. Im Übungsfall liegt keine geprüfte Aufnahme vor. Sprache kann nachgeahmt oder manipuliert sein; prüfe den Zahlungsauftrag über den vorgesehenen Freigabeprozess und einen unabhängig bekannten Kontakt.",
            status: "suspicious"
          },
          {
            target: "Fremde Mailadresse",
            text: "Der Absender nutzt '@executive-corp-office.com' statt der echten Konzernadresse für diesen kritischen Abwicklungsfall.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Dieser vorbereitete Fall zeigt einen angeblichen Zahlungsauftrag der Geschäftsführung. Verifiziere ungewöhnliche Zahlungen über den vorgesehenen Freigabeprozess und einen unabhängig bekannten Kontakt; eine behauptete Sprachnotiz ist keine geprüfte Freigabe."
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
            target: "Generische Domain-Endung .info",
            text: "Das Linkziel des Übungsfalls weicht von der unabhängig bekannten Behördenadresse ab. '.info' ist eine generische Domain-Endung; sie belegt weder Eigentum noch Echtheit oder Betrug.",
            status: "suspicious"
          },
          {
            target: "Kalender-Spam (iCal)",
            text: "Kalendereinladungen können irreführende Links enthalten. Je nach Kalendereinstellungen können unerwünschte Einladungen als Termin oder Benachrichtigung erscheinen; das bestätigt keinen vertrauenswürdigen Organisator.",
            status: "suspicious"
          },
          {
            target: "Unerwartete Gelder von Behörden",
            text: "Prüfe die unerwartete Erstattungszusage über einen unabhängig bekannten Behördenkontakt oder ein selbst geöffnetes Portal. Der zugesandte TWINT-Link und die Kalendereinladung bestätigen keine echte Auszahlung.",
            status: "suspicious"
          }
        ],
        detailedExplanation: "Dieser vorbereitete Fall zeigt Kalender-Phishing: Eine Einladung im Namen der Steuerverwaltung wirbt mit einer falschen Erstattungszusage. Der Eintrag bestätigt weder einen echten Behördenkontakt noch ein vertrauenswürdiges Linkziel."
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
          text: "Im Übungsfall weicht die Absenderadresse von der unabhängig bekannten Anbieteradresse ab. Der Name wurde für diesen Fall als Täuschung gewählt; es wurde keine Registrierung oder Eigentümerschaft untersucht.",
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
          text: "Eine allgemeine Anrede kann auffallen. Auch Nachrichten mit dem richtigen Namen können gefälscht sein; die Anrede ist kein Echtheitsnachweis.",
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
          text: "Die Absenderdomain im Übungsfall lautet 'dhl-bestellung-storno.de' und weicht von der unabhängig bekannten Anbieteradresse ab. Das Wort 'dhl' darin belegt keine Zugehörigkeit; Eigentum oder Registrierung wurden nicht geprüft.",
          status: "suspicious"
        },
        {
          target: "Top-Level-Domain (.cn)",
          text: "Das Linkziel weicht im Übungsfall von der bekannten Anbieteradresse ab. Die Domain-Endung allein beweist weder einen Standort noch einen Betrug.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dies ist das berüchtigte 'Zoll-Phishing' (Parcel Phishing). Opfer geben bereitwillig ihre Kreditkartendaten ein, um ein vermeintliches Paket freizuschalten. Prüfe unerwartete Gebühren über die selbst geöffnete Anbieter-App oder Sendungsverfolgung."
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
          text: "Im vorbereiteten Fall wird die Absenderdomain 'accountprotection.microsoft.com' angezeigt. Die sichtbare Adresse allein ist kein Echtheitsnachweis; Header oder Absenderauthentifizierung werden hier nicht geprüft.",
          status: "safe"
        },
        {
          target: "Kein Handlungszwang",
          text: "Dieser Fall enthält weder eine Drohung noch eine Frist. Das passt zur vorbereiteten legitimen Nachricht, beweist für sich allein aber keine Echtheit. Auch Phishing kann ohne Zeitdruck formuliert sein.",
          status: "safe"
        },
        {
          target: "Linkziel im Beispiel",
          text: "Im Übungsfall verweisen Linktext und Ziel auf account.microsoft.com. Das ist kein allgemeines Sicherheitszertifikat für Nachrichten mit diesem sichtbaren Text.",
          status: "safe"
        }
      ],
      detailedExplanation: "Dieser vorbereitete Fall stellt eine legitime Sicherheitsbenachrichtigung dar. Bei echten Nachrichten reichen eine sichtbare Absenderadresse und fehlender Zeitdruck nicht als Nachweis. Teile einen unerwarteten Code nicht und prüfe Aktivitäten über die selbst geöffnete offizielle App."
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
          text: "Die vorbereitete Rechnung nennt den fiktiven Empfänger 'Max Mustermann'. Auch Phishing kann eine persönliche Anrede enthalten; der Name bestätigt keinen echten Absender.",
          status: "safe"
        },
        {
          target: "Sensible Teil-Informationen",
          text: "Das Beispiel enthält fiktive Endziffern eines Zahlungsmittels (**4821). Solche Teilinformationen können auch Angreifern bekannt sein und beweisen keine Echtheit.",
          status: "safe"
        },
        {
          target: "Standard-Verweis",
          text: "Das vorbereitete Linkziel lautet 'www.amazon.de/gp/primecentral'. Ein vertrautes Ziel oder HTTPS allein verifiziert keine Nachricht. Prüfe die Rechnung im unabhängig geöffneten Kundenkonto.",
          status: "safe"
        }
      ],
      detailedExplanation: "Dieser vorbereitete Fall stellt eine legitime Rechnung mit fiktiven Kundendaten dar. Name, Endziffern und vertrauter Linktext beweisen keine Echtheit einer realen Nachricht. Prüfe unerwartete Abbuchungen im unabhängig geöffneten Kundenkonto."
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
          text: "Der vorbereitete Fall verwendet den Namen einer angeblichen HR-Kollegin ('Anna Weber'), um Vertrauen aufzubauen. Ein angezeigter Personenname bestätigt keinen echten Absender. Solche gezielten Täuschungen heissen Spear-Phishing.",
          status: "suspicious"
        },
        {
          target: "Gefälschte HR-Domain",
          text: "Die Absenderadresse lautet '@firmenname-cloud-login.de', während das eigentliche Unternehmen '@firmenname.de' verwendet. Betrüger registrieren oft Domains mit Zusatzwörtern wie '-cloud-login' oder '-portal'.",
          status: "suspicious"
        },
        {
          target: "Login-Abfrage (Credential Harvesting)",
          text: "Der Ziel-Link führt scheinbar zu einem 'Office365 Signature-Portal' unter einer fremden Domain. Die Eingabe könnte Zugangsdaten preisgeben; welche Systeme dadurch gefährdet wären, hängt von den Kontorechten und zusätzlichen Schutzmassnahmen ab.",
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
          text: "Die angezeigte Adresse 'it-operations@company-mfa-portal.com' weicht vom erwarteten Firmenportal des Übungsfalls ab. IT kann auch externe Dienstleister nutzen; bestätige die Anfrage über einen bekannten IT-Kontakt. Eigentum und Alter der Domain wurden nicht geprüft.",
          status: "suspicious"
        },
        {
          target: "Fremdsitzung-Bestätigung",
          text: "Bestätigen Sie NIEMALS einen MFA-Push, den Sie nicht selbst ausgelöst haben. Lehnen Sie unerwartete Anfragen ab und kontaktieren Sie die IT über einen bekannten Weg, auch wenn eine Nachricht zur Freigabe auffordert.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dieser Fall verbindet MFA-Fatigue mit Spear-Phishing: wiederholte Anmeldeanfragen und eine gefälschte IT-Anweisung sollen zur Freigabe verleiten. Bestätige keine unerwartete Anmeldung und melde den Vorfall über den vorgesehenen IT-Weg."
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
          target: "Behauptete Freigabe per Sprachnotiz",
          text: "Die Nachricht behauptet eine Freigabe per Sprachnotiz. Im Übungsfall liegt keine geprüfte Aufnahme vor. Sprache kann nachgeahmt oder manipuliert sein; prüfe den Zahlungsauftrag über den vorgesehenen Freigabeprozess und einen unabhängig bekannten Kontakt.",
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
          target: "Generische Domain-Endung .info",
          text: "Die Zieladresse des Übungsfalls ist nicht die unabhängig bekannte Behördenadresse. Die Endung allein ist kein Nachweis für Echtheit oder Betrug.",
          status: "suspicious"
        },
        {
          target: "iCal Phishing-Vektor",
          text: "Kalendereinladungen können irreführende Links enthalten. Je nach Kalendereinstellungen können unerwünschte Einladungen als Termin oder Benachrichtigung erscheinen; das bestätigt keinen vertrauenswürdigen Organisator.",
          status: "suspicious"
        },
        {
          target: "Unerwartete Geldauszahlungen",
          text: "Prüfe eine unerwartete Erstattungszusage in einer Kalendereinladung über einen unabhängig bekannten Behördenkontakt oder ein selbst geöffnetes Portal. Verlasse dich bei der Eingabe von Bankdaten nicht allein auf den zugesandten Link.",
          status: "suspicious"
        }
      ],
      detailedExplanation: "Dieser vorbereitete Fall zeigt Kalender-Phishing: Eine Einladung wirbt mit einer falschen Erstattungszusage. Je nach Kalendereinstellungen können solche Einladungen automatisch erscheinen. Ein Kalendereintrag verifiziert weder den Organisator noch seine Links."
    }
  ];
};

export const getLocalizedLearningModules = (lang: Language): LearningModule[] => {
  return lang === "en"
    ? [
  {
    "id": "module-sender",
    "title": "1. Check the sender",
    "shortDescription": "Names and addresses are clues, not proof of identity.",
    "icon": "Mail",
    "clues": [
      "A display name can be chosen freely. Read the complete sender address.",
      "Compare the domain after @ with an address obtained independently from the organisation. A familiar brand name somewhere in the address is not sufficient.",
      "A correct-looking address, a personal greeting or flawless language does not prove that a message is genuine."
    ],
    "content": "Spoofing means imitating a sender. Look-alike domains use similar spelling. Check the request through a known app, bookmark or contact when unsure. Sender authentication in message headers can provide more evidence, but it does not guarantee that the content is trustworthy."
  },
  {
    "id": "module-links",
    "title": "2. Read a URL",
    "shortDescription": "Separate the host, domain and path without opening the target.",
    "icon": "Link",
    "clues": [
      "In this app, focus or tap the link preview to see the target without opening it. In a real mail app, use its link inspection feature; behaviour varies by app and device.",
      "In login.bank.example.other-site.example, the known-looking name is only a subdomain. Domain boundaries depend on public suffixes: co.uk contains two labels, and services such as github.io also separate sites.",
      "HTTPS protects the connection to the named host. It does not prove that the site or the message is trustworthy."
    ],
    "content": "Link text can differ from the target. The URL Inspector parses the address locally using a public suffix list, including private hosting suffixes. It does not check ownership, redirects or page contents. A country suffix is neither a location check nor evidence of fraud. When unsure, open the service through a known app or an independently verified address."
  },
  {
    "id": "module-engineering",
    "title": "3. Recognise pressure",
    "shortDescription": "Pause when a message uses fear, rewards or authority.",
    "icon": "AlertTriangle",
    "clues": [
      "A short deadline or threatened account closure is a reason to verify the request independently.",
      "Requests to disclose a password, approve an unexpected sign-in or share a security code deserve particular care.",
      "An unexpected reward or delivery is a clue to investigate, not proof of fraud by itself."
    ],
    "content": "Social engineering uses human reactions to influence decisions. Read the complete context, avoid hurried actions and verify unusual requests with a known contact. Do not use the contact details in a suspicious message as your only source. These training examples illustrate patterns; they do not classify real messages automatically."
  }
]
    : [
  {
    "id": "module-sender",
    "title": "1. Den Absender prüfen",
    "shortDescription": "Name und Adresse sind Hinweise, kein Identitätsnachweis.",
    "icon": "Mail",
    "clues": [
      "Der Anzeigename ist frei wählbar. Lies die vollständige Absenderadresse.",
      "Vergleiche die Domain nach @ mit einer unabhängig bekannten Adresse der Organisation. Ein Markenname irgendwo in der Adresse reicht nicht.",
      "Eine vertraute Adresse, persönliche Anrede oder fehlerfreie Sprache beweist nicht, dass eine Nachricht echt ist."
    ],
    "content": "Spoofing bedeutet, einen Absender nachzuahmen. Look-alike-Domains verwenden ähnlich aussehende Namen. Prüfe unklare Anfragen über eine bekannte App, ein Lesezeichen oder einen vertrauten Kontakt. Prüfungen in den Nachrichtenkopfzeilen können weitere Hinweise liefern, garantieren aber keine vertrauenswürdigen Inhalte."
  },
  {
    "id": "module-links",
    "title": "2. Eine URL lesen",
    "shortDescription": "Host, Domain und Pfad unterscheiden, ohne das Ziel zu öffnen.",
    "icon": "Link",
    "clues": [
      "In dieser App zeigt Fokus oder Antippen der Linkvorschau das Ziel, ohne es zu öffnen. Nutze in echten Mailprogrammen deren Linkvorschau; die Bedienung unterscheidet sich je nach Gerät und App.",
      "In login.bank.example.anderes-ziel.example ist der vertraute Name nur eine Subdomain. Domain-Grenzen hängen von öffentlichen Suffixen ab: co.uk hat zwei Bestandteile, und auch Hostingdienste wie github.io trennen einzelne Websites.",
      "HTTPS schützt die Verbindung zum genannten Host. Es bestätigt nicht, dass die Website oder die Nachricht vertrauenswürdig ist."
    ],
    "content": "Linktext und tatsächliches Ziel können voneinander abweichen. Der URL-Inspector zerlegt die Adresse lokal mit einer Liste öffentlicher und privater Domain-Suffixe. Er prüft keine Eigentümer, Weiterleitungen oder Seiteninhalte. Eine Länderendung beweist weder den Serverstandort noch einen Betrug. Öffne den Dienst bei Zweifeln über eine bekannte App oder eine unabhängig geprüfte Adresse."
  },
  {
    "id": "module-engineering",
    "title": "3. Handlungsdruck erkennen",
    "shortDescription": "Bei Angst, Gewinnversprechen oder Autoritätsdruck innehalten.",
    "icon": "AlertTriangle",
    "clues": [
      "Kurze Fristen oder eine angedrohte Kontosperrung sind ein Anlass, die Anfrage unabhängig zu prüfen.",
      "Aufforderungen, Kennwörter oder Sicherheitscodes preiszugeben oder unerwartete Anmeldungen zu bestätigen, verlangen besondere Aufmerksamkeit.",
      "Unerwartete Gewinne oder Lieferungen sind ein Grund zum Nachfragen, für sich allein aber kein Betrugsbeweis."
    ],
    "content": "Social Engineering nutzt menschliche Reaktionen, um Entscheidungen zu beeinflussen. Lies den Zusammenhang, vermeide übereilte Schritte und prüfe ungewöhnliche Anfragen bei einem bekannten Kontakt. Nutze dafür nicht ausschliesslich Kontaktdaten aus der verdächtigen Nachricht. Die vorbereiteten Fälle illustrieren Muster und klassifizieren keine echten Nachrichten automatisch."
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
