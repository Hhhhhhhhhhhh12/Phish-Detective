import { EmailScanResult } from "../../types";

export const mockForensicResults: { [key: string]: EmailScanResult } = {
  paypal: {
    phishScore: 92,
    verdict: "dangerous",
    summary: "Dieser Text weist akute, hochgradige Warnsignale auf, die typisch für illegitimes PayPal-Phishing sind.",
    markers: [
      { id: "m-1", category: "sender", title: "Verdächtige Absenderdomain", description: "Der Absender nutzt einen gefälschten Provider oder Zusatzbegriffe, statt der offiziellen PayPal.com Domain.", severity: "high" },
      { id: "m-2", category: "urgency", title: "Künstlicher Handlungsdruck", description: "Es wird mit einer sofortigen Kontosperrung gedroht, um den Nutzer zu panisch schnellem Handeln zu drängen.", severity: "high" },
      { id: "m-3", category: "links", title: "Verschleierung von Ziel-Links", description: "Der im Text angeforderte Verifizierungslink führt auf eine CN- oder andere externe Spam-Domain statt auf die echte Banken-Anmeldung.", severity: "high" },
      { id: "m-4", category: "content", title: "Unpersönliche Grußformel", description: "Die Anrede lautet allgemein 'Sehr geehrter Kunde'. PayPal spricht Kunden stets mit vollem Vor- und Zunamen an.", severity: "medium" }
    ],
    technicalDetails: "IT-Forensik Bericht: Der Angreifer nutzt Credential-Harvesting Taktiken. Die im Text enthaltenen Webadressen nutzen unübliche Ports oder verschleierte Subdomains (z.b. paypal.com.sicherheitszone-check.de). Bei Eingabe der Anmeldedaten werden Passwörter und Zwei-Faktor-Codes direkt an den Server der Angreifer gesendet.",
    detectiveTips: [
      "Klicken Sie unter keinen Umständen auf Links in dieser Nachricht.",
      "Suchen Sie die PayPal-Website manuell über Ihren Browser auf (geben Sie www.paypal.com von Hand ein).",
      "Leiten Sie verdächtige Nachrichten direkt an spoof@paypal.com weiter und löschen Sie diese anschließend."
    ]
  },
  general: {
    phishScore: 78,
    verdict: "suspicious",
    summary: "Aufgrund von aggressivem Drängen, unüblichem Absenderverhalten und unklaren Verlinkungen stufen wir diesen Inhalt als VERDÄCHTIG ein.",
    markers: [
      { id: "g-1", category: "urgency", title: "Bedrohungs-Rhetorik", description: "Der Absender droht mit finanziellen Einbußen oder rechtlichen Konsequenzen, um rationales Denken zu blockieren.", severity: "high" },
      { id: "g-2", category: "content", title: "Ungewöhnlicher Schreibstil", description: "Teilweise grammatikalisch ungenaue Ausdrücke oder veraltete Formulierungen deuten auf maschinelle Übersetzung hin.", severity: "medium" },
      { id: "g-3", category: "technical", title: "Fehlender Kontext", description: "Es wird auf ein Abonnement oder eine Sendung verwiesen, die Sie höchstwahrscheinlich nie bestellt oder angefordert haben.", severity: "medium" }
    ],
    technicalDetails: "Der vorliegende Text vereint psychologische Triggermethoden (Angst) mit dem Fehlen von personalisierten Informationen. Eine verlässliche Identifikation des Absenders ist ohne Quelltext nicht möglich, die vorlegende Semantik zielt jedoch stark auf Social-Engineering ab.",
    detectiveTips: [
      "Fragen Sie sich: Erwarte ich diese E-Mail/SMS wirklich? Wenn nein, ist die Wahrscheinlichkeit für Betrug extrem hoch.",
      "Kontaktieren Sie den angeblichen Absender über eine Ihnen bekannte, offizielle Telefonnummer, niemals über die in der Nachricht angebotenen Kontakte.",
      "Geben Sie keinesfalls Passwörter, PINs, TANs oder Kontodetails auf Seiten ein, die Sie über Links geöffnet haben."
    ]
  }
};
