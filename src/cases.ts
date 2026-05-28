import { SimulationCase, LearningModule } from "./types";

export const defaultCases: SimulationCase[] = [
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
        text: "Dies ist die berüchtigte MFA Fatigue Attacke. Angreifer senden absichtlich dutzende Push-Meldungen, um das Opfer zu zermürben, und schicken dann diese gefälschte IT-Mail hinterher, damit man genervt auf 'Akzeptieren' klickt.",
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

export const learningModules: LearningModule[] = [
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
