import React, { useState } from "react";
import { Shield, Sparkles, AlertTriangle, CheckCircle, Search, HelpCircle, FileText, ArrowRight, BookOpen } from "lucide-react";
import { EmailScanResult } from "../types";

// Local realistic forensic results to show as custom mockups if API key is missing
const mockForensicResults: { [key: string]: EmailScanResult } = {
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

export default function Scanner() {
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<EmailScanResult | null>(null);
  const [errorMode, setErrorMode] = useState<{ active: boolean; message: string; code?: string } | null>(null);

  const handleScan = async (useDemoText?: string) => {
    const textToAnalyze = useDemoText || inputText;
    if (!textToAnalyze.trim()) return;

    if (useDemoText) {
      setInputText(useDemoText);
    }

    setIsScanning(true);
    setScanResult(null);
    setErrorMode(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageText: textToAnalyze }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "API_KEY_MISSING") {
          setErrorMode({
            active: true,
            code: "API_KEY_MISSING",
            message: data.message || "Es wurde kein Gemini-API-Schlüssel konfiguriert."
          });
        } else {
          throw new Error(data.message || "Unerwarteter Fehler bei der Analyse.");
        }
      } else {
        setScanResult(data);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMode({
        active: true,
        message: "Verbindung zum Server fehlgeschlagen. Sie können die Analyse im lokalen Simulationsmodus ausprobieren!"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleApplyDemoText = (type: "paypal" | "dhl" | "good") => {
    let demoStr = "";
    if (type === "paypal") {
      demoStr = `Subject: ⚠️ DRINGEND: Ihr PayPal-Konto wurde vorübergehend eingeschränkt\n\nSehr geehrte Kundin, sehr geehrter Kunde,\n\nwir haben verdächtige Zugriffsversuche auf Ihr Konto festgestellt. Bitte klicken Sie innerhalb von 24 Stunden auf den untenstehenden Button, um Ihre Identität und Ihr Konto zu verifizieren, andernfalls wird Ihr Guthaben eingefroren.\n\nLink: https://pay-secure-verify.com/login`;
    } else if (type === "dhl") {
      demoStr = `Ankündigung der DHL Paketstation.\nLieber Kunde, Ihr Paket Nr. 83921 konnte wegen einer fälligen Zollgebühr von 1.49 EUR nicht geliefert werden.\nZahlen Sie die Gebühr hier: http://dhl-zollgebuehren-sicherung.cn\nIhr Paket wird ansonsten retourniert.`;
    } else {
      demoStr = `Hallo Sarah,\n\nich wollte dir nur kurz Bescheid geben, dass unser Treffen heute Abend um 19:30 Uhr wie geplant stattfindet. Soll ich noch etwas zu essen mitbringen?\n\nLiebe Grüße,\nChristian`;
    }
    setInputText(demoStr);
  };

  const triggerMockAnalysis = (type: "paypal" | "general") => {
    setIsScanning(true);
    setErrorMode(null);

    setTimeout(() => {
      setIsScanning(false);
      const mock = mockForensicResults[type] || mockForensicResults.general;
      setScanResult(mock);
    }, 1000);
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "safe":
        return {
          bg: "bg-[#00A3A6]/10 border-[#00A3A6] text-[#00A3A6]",
          text: "LEGITIM / SICHER",
          color: "text-[#00A3A6]",
          icon: <CheckCircle className="w-5 h-5 text-[#00A3A6]" />
        };
      case "suspicious":
        return {
          bg: "bg-[#1D1B18]/10 border-[#1D1B18] text-[#1D1B18]",
          text: "VERDÄCHTIG / SUSPECT",
          color: "text-[#1D1B18]",
          icon: <AlertTriangle className="w-5 h-5 text-[#1D1B18]" />
        };
      case "dangerous":
        return {
          bg: "bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500]",
          text: "GEFÄHRLICH (PHISHING)",
          color: "text-[#FF5500]",
          icon: <Shield className="w-5 h-5 text-[#FF5500]" />
        };
      default:
        return {
          bg: "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18]",
          text: "UNBEKANNT",
          color: "text-[#1D1B18]",
          icon: <HelpCircle className="w-5 h-5 text-[#1D1B18]" />
        };
    }
  };

  return (
    <div className="space-y-6" id="detector-scanner-root">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1D1B18] pb-5">
        <div>
          <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase font-mono">
            <Search className="w-5 h-5 text-[#FF5500]" />
            PROBE-MESSSTAND // KI-SPEKTRO-ANALYSATOR
          </h2>
          <p className="text-xs text-[#615C54] font-mono mt-1">
            FÜGEN SIE VERDÄCHTIGE INHALTE EIN. DER KI-DETEKTOR DURCHSOUVIERT TEXT-STRUKTUREN AUF MANIPULATION UND MALWARE-PROPAGANDA.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => handleApplyDemoText("paypal")}
            className="text-[9px] bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-1.5 px-3 uppercase tracking-tight shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5"
          >
            📋 PAYPAL DEMO
          </button>
          <button
            onClick={() => handleApplyDemoText("dhl")}
            className="text-[9px] bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-1.5 px-3 uppercase tracking-tight shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5"
          >
            📦 DHL DEMO
          </button>
          <button
            onClick={() => handleApplyDemoText("good")}
            className="text-[9px] bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-1.5 px-3 uppercase tracking-tight shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5"
          >
            💬 SICHER DEMO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Terminal */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-4 relative">
            <div className="flex items-center justify-between border-b-2 border-[#1D1B18] pb-3 mb-3">
              <span className="text-[10px] font-mono text-[#1D1B18] font-black uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FF5500] animate-pulse"></span>
                TEXT-SPEICHERUNG (INPUT)
              </span>
              <span className="text-[10px] font-mono font-bold text-[#615C54]">{inputText.length} BYTES</span>
            </div>

            <textarea
              className="w-full h-80 bg-white border-2 border-[#1D1B18] p-3 text-[#1D1B18] placeholder-[#615C54]/45 font-mono text-xs resize-none outline-none focus:bg-[#FAF8F5] shadow-inner rounded-none"
              placeholder="Fügen Sie hier den Text ein (z.B. verdächtige E-Mails, SMS, Phishing-Botschaften)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isScanning}
              id="analysis-textarea"
            />

            <div className="flex gap-2 mt-4 pt-3 border-t-2 border-[#1D1B18]">
              <button
                onClick={() => handleScan()}
                disabled={isScanning || !inputText.trim()}
                className="w-full bg-[#1D1B18] hover:bg-[#FF5500] disabled:bg-[#1D1B18]/30 disabled:opacity-55 text-white py-3.5 px-4 rounded-none text-xs font-mono font-bold uppercase transition flex items-center justify-center gap-2 shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5"
                id="start-scan-btn"
              >
                {isScanning ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    EINGANGSSTEUERUNG LÄUFT...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#FF5500]" />
                    MESSUNG STARTEN
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          {isScanning ? (
            <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-8 flex flex-col items-center justify-center text-center h-[460px] shadow-[4px_4px_0px_#1D1B18] relative">
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-[#1D1B18] flex items-center justify-center bg-white shadow-[3px_3px_0px_#1D1B18] animate-ping">
                  <Search className="w-8 h-8 text-[#FF5500]" />
                </div>
              </div>
              <h3 className="text-sm font-black text-[#1D1B18] uppercase font-mono">DURCHSUCHE MESSUNG AUF EMOTIONALE VEKTOREN...</h3>
              <p className="text-xs text-[#615C54] mt-2 max-w-sm uppercase font-mono">
                DAS HARDWARE-GATEWAY EXAMINIERT DEN TEXT NACH LINGUISTISCHEM DRUCK, URL-SCHEINBILDERN UND BANKEN-HARVESTING.
              </p>
              <div className="w-48 bg-white border-2 border-[#1D1B18] h-4 mt-6">
                <div className="h-full bg-[#1D1B18] animate-pulse w-3/4" />
              </div>
            </div>
          ) : errorMode ? (
            <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-6 h-[460px] flex flex-col justify-between shadow-[4px_4px_0px_#1D1B18]">
              <div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 bg-[#FF5500]/10 border-2 border-[#FF5500]">
                    <AlertTriangle className="w-6 h-6 text-[#FF5500]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#FF5500] uppercase font-mono">INTEGRATIONS-BERICHT STATUS: DEMO</h3>
                    <p className="text-xs text-[#1D1B18] mt-1 font-mono uppercase">
                      ES WURDE KEIN VERIFIZIERTER GEMINI API-SCHLÜSSEL KONFIGURIERT. DER LIVE-KI CO-PROZESSOR GIBT DIREKTEN FORENSIK-DRAFT FREI.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#1D1B18] p-4 font-mono text-xs text-[#1D1B18] space-y-3">
                  <p className="text-[10px] font-black text-[#FF5500] uppercase">💡 FORENSISCHER TESTMODUS BEITRETEN:</p>
                  <p className="uppercase leading-normal text-[11px]">
                    WÄHLEN SIE EINE DER LOKAL DEKODIERTEN DUMMY-CHASSIS-DATENSÄTZE, UM DAS DETEKTIV-INTERVENTIONALPORTAL ZU PRÜFEN:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => triggerMockAnalysis("paypal")}
                      className="bg-white border-2 border-[#1D1B18] hover:bg-[#FAF8F5] text-[#1D1B18] font-black py-2.5 px-3 rounded-none text-left flex items-center justify-between transition text-[10px] uppercase shadow-[2px_2px_0px_#1D1B18]"
                    >
                      💳 PAYPAL BERICHT
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
                    </button>
                    <button
                      onClick={() => triggerMockAnalysis("general")}
                      className="bg-white border-2 border-[#1D1B18] hover:bg-[#FAF8F5] text-[#1D1B18] font-black py-2.5 px-3 rounded-none text-left flex items-center justify-between transition text-[10px] uppercase shadow-[2px_2px_0px_#1D1B18]"
                    >
                      ⚠️ PHISH SPAM DRAFT
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-[#1D1B18] pt-4 flex justify-between items-center text-[10px] text-[#615C54] font-mono">
                <span className="flex items-center gap-1 uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-[#1D1B18]" />
                  Tipp: Nutzen Sie das Retro-Game links am Schirm!
                </span>
              </div>
            </div>
          ) : scanResult ? (
            <div className="space-y-6">
              {/* Verdict Card */}
              <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 shadow-[4px_4px_0px_#1D1B18]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-[#1D1B18]">
                      {getVerdictBadge(scanResult.verdict).icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase font-mono text-[#DCD8CF]">INDEX:</span>
                        <span className={`text-[10px] font-black uppercase font-mono border-2 py-0.5 px-2.5 rounded-none ${getVerdictBadge(scanResult.verdict).bg}`}>
                          {getVerdictBadge(scanResult.verdict).text}
                        </span>
                      </div>
                      <h4 className="text-[9px] text-[#615C54] mt-0.5 font-mono uppercase font-black">Echte Forensische Auswertung</h4>
                    </div>
                  </div>

                  {/* Threat Score Circle Gauge */}
                  <div className="flex items-center gap-3 bg-white py-2 px-4 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18]">
                    <div className="relative w-12 h-12 flex items-center justify-center font-mono">
                      <div className="text-xs font-black text-[#1D1B18]">{scanResult.phishScore}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black font-mono text-[#1D1B18] uppercase">GEFAHR-STUFE</div>
                      <div className="text-[8px] font-mono text-[#615C54] uppercase block font-bold">PROBABILITY INDEX</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#1D1B18] mt-4 bg-white p-3 border border-[#1D1B18] leading-relaxed font-mono uppercase">
                  {scanResult.summary}
                </p>
              </div>

              {/* Evidence Indicators */}
              <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 shadow-[4px_4px_0px_#1D1B18] space-y-4">
                <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF5500]" />
                  CHASSIS MESSFUNKTION / DETEKTIERTE SPOREN
                </h3>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {scanResult.markers.map((marker, idx) => (
                    <div 
                      key={marker.id || idx}
                      className="bg-white p-3 border border-[#1D1B18] flex items-start gap-3 hover:bg-[#FAF8F5] transition shadow-[1.5px_1.5px_0px_#1D1B18]"
                    >
                      <span className="text-lg mt-0.5 select-none shrink-0">
                        {marker.category === "sender" ? "📧" : 
                         marker.category === "urgency" ? "⏳" : 
                         marker.category === "links" ? "🔗" : 
                         marker.category === "content" ? "📝" : "🛡️"}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-[#1D1B18] uppercase font-mono">{marker.title}</h4>
                          <span className={`text-[8px] font-mono font-black py-0.5 px-1.5 rounded-none border ${
                            marker.severity === "high" ? "bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500]" :
                            marker.severity === "medium" ? "bg-[#1D1B18]/10 border-[#1D1B18] text-[#1D1B18]" :
                            marker.severity === "safe" ? "bg-[#00A3A6]/10 border-[#00A3A6] text-[#00A3A6]" :
                            "bg-[#1D1B18]/10 border-[#1D1B18] text-[#1D1B18]"
                          }`}>
                            {marker.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-[#615C54] leading-relaxed font-sans">{marker.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical report and detective guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Detailed forensic */}
                <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] p-4 space-y-2">
                  <h4 className="text-[10px] font-mono font-black text-[#1D1B18] uppercase tracking-wider">🕵️‍♂️ INTERNER LAB-PROZESS</h4>
                  <p className="text-[11px] text-[#615C54] leading-relaxed font-mono uppercase">
                    {scanResult.technicalDetails}
                  </p>
                </div>

                {/* Recommendations */}
                <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] p-4 space-y-2">
                  <h4 className="text-[10px] font-mono font-black text-[#1D1B18] uppercase tracking-wider">📋 CO-REAGIERENDE MASSNAHMEN</h4>
                  <ul className="space-y-1.5 pt-1 uppercase font-mono text-[10px]">
                    {scanResult.detectiveTips?.map((tip, idx) => (
                      <li key={idx} className="text-[#1D1B18] flex items-start gap-1.5 leading-relaxed">
                        <span className="text-[#FF5500] select-none mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#F4F1EA] border-2 border-dashed border-[#1D1B18] p-12 flex flex-col items-center justify-center text-center h-[460px] shadow-xs">
              <div className="w-16 h-16 bg-white border-2 border-[#1D1B18] flex items-center justify-center text-[#1D1B18] mb-4 shadow-[2px_2px_0px_#1D1B18]">
                <Shield className="w-8 h-8 text-[#FF5500]" />
              </div>
              <h3 className="text-xs font-black uppercase font-mono text-[#1D1B18]">Warten auf forensische Messung...</h3>
              <p className="text-xs text-[#615C54] mt-2 max-w-sm font-mono uppercase">
                GEBEN SIE LINKS EINEN ZU EXAMINIERENDEN SPEICHERBEREICH EIN ODER DRÜCKEN SIE EIN CHASSIS-DEMO LINKS OBEN FÜR DEN AUTOMATED REPORT.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
