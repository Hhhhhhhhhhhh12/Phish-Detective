import { EmailScanResult } from "../../types";

export const mockForensicResults: { [key: string]: EmailScanResult } = {
  paypal: {
    verdict: "dangerous",
    summary: "Dieser vorbereitete Fall kombiniert eine nachgeahmte PayPal-Nachricht mit Zeitdruck und einem abweichenden Linkziel.",
    markers: [
      { id: "m-1", category: "sender", title: "Verdächtige Absenderdomain", description: "Die im Übungsfall angegebene Absenderdomain weicht von der unabhängig bekannten Anbieteradresse ab. Auch eine vertraut aussehende Adresse allein bestätigt keinen echten Absender.", severity: "high" },
      { id: "m-2", category: "urgency", title: "Künstlicher Handlungsdruck", description: "Es wird mit einer sofortigen Kontosperrung gedroht, um den Nutzer zu panisch schnellem Handeln zu drängen.", severity: "high" },
      { id: "m-3", category: "links", title: "Verschleierung von Ziel-Links", description: "Im Übungsfall führt die angebliche Kontoprüfung zu paypal.com.sicherheitszone.example. Der Markenname ist nur eine Subdomain; die Domain-Endung allein ist kein Betrugsbeweis.", severity: "high" },
      { id: "m-4", category: "content", title: "Unpersönliche Grußformel", description: "Eine allgemeine Anrede kann zum Gesamtbild beitragen. Auch eine Nachricht mit deinem richtigen Namen kann gefälscht sein; die Anrede allein entscheidet nichts.", severity: "medium" }
    ],
    technicalDetails: "Der fiktive Fall erklärt Credential-Harvesting: eine nachgeahmte Anmeldung soll Zugangsdaten und gegebenenfalls Bestätigungscodes abfangen. Es wurden keine Header, Server oder Nachrichten untersucht.",
    detectiveTips: [
      "Klicken Sie unter keinen Umständen auf Links in dieser Nachricht.",
      "Suchen Sie die PayPal-Website manuell über Ihren Browser auf (geben Sie www.paypal.com von Hand ein).",
      "Nutzen Sie den Meldeweg in der offiziellen App oder auf der selbst geöffneten Hilfe-Seite des Anbieters."
    ]
  },
  general: {
    verdict: "suspicious",
    summary: "Dieser vorbereitete Fall zeigt, wie Zeitdruck, eine unklare Anfrage und ein ungewohnter Kontaktweg zusammen Anlass zum Nachfragen geben.",
    markers: [
      { id: "g-1", category: "urgency", title: "Bedrohungs-Rhetorik", description: "Der Absender droht mit finanziellen Einbußen oder rechtlichen Konsequenzen, um rationales Denken zu blockieren.", severity: "high" },
      { id: "g-2", category: "content", title: "Ungewöhnlicher Schreibstil", description: "Ungewöhnliche Formulierungen können auffallen, beweisen aber keinen Betrug. Umgekehrt können betrügerische Nachrichten sprachlich fehlerfrei sein.", severity: "medium" },
      { id: "g-3", category: "technical", title: "Fehlender Kontext", description: "Prüfen Sie, ob die genannte Sendung oder das Abonnement zu Ihrer Situation passt. Fehlender Kontext ist ein Grund zur unabhängigen Rückfrage.", severity: "medium" }
    ],
    technicalDetails: "Der fiktive Fall veranschaulicht psychologische Manipulation. Sprache und Anrede allein können die Echtheit einer Nachricht nicht bestätigen; selbst vollständige Header liefern keine pauschale Sicherheitsgarantie.",
    detectiveTips: [
      "Fragen Sie sich: Erwarte ich diese E-Mail oder SMS? Wenn nicht, klären Sie den Anlass über einen unabhängig bekannten Kontaktweg.",
      "Kontaktieren Sie den angeblichen Absender über eine Ihnen bekannte, offizielle Telefonnummer, niemals über die in der Nachricht angebotenen Kontakte.",
      "Öffnen Sie bei einer unerwarteten Anmeldeaufforderung selbst die bekannte App oder Adresse. Geben Sie Zugangsdaten und Bestätigungscodes nicht in ungeprüfte Formulare ein."
    ]
  }
};
