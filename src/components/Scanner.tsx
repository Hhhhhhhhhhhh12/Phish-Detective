import React, { useState } from "react";
import { Search, Sparkles, Shield } from "lucide-react";
import { EmailScanResult } from "../types";
import { mockForensicResults } from "./scanner/mockData";
import ScannerResults from "./scanner/ScannerResults";
import { isStaticHosting } from "../utils/hosting";
import { Language } from "../utils/i18n";

export default function Scanner({ language = "de" }: { language?: Language }) {
  return isStaticHosting ? <ExampleReports language={language} /> : <LiveScanner />;
}

function ExampleReports({ language }: { language: Language }) {
  const [selected, setSelected] = useState<"paypal" | "general" | null>(null);
  const english = language === "en";

  return (
    <section className="space-y-6" aria-labelledby="example-reports-title">
      <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 space-y-3">
        <h2 id="example-reports-title" className="text-xl font-black text-[#1D1B18]">
          {english ? "Example reports" : "Beispielberichte"}
        </h2>
        <p className="text-sm text-[#615C54]">
          {english
            ? "Live AI analysis is unavailable in this training version. These are fixed examples, not an analysis of your own messages. No message is sent to an AI service."
            : "Diese Trainingsversion bietet keine Live-KI-Analyse. Die Berichte sind feste Beispiele und keine Prüfung eigener Nachrichten. Es wird keine Nachricht an einen KI-Dienst gesendet."}
        </p>
        <div className="flex flex-wrap gap-3">
          {(["paypal", "general"] as const).map((example) => (
            <button key={example} type="button" aria-pressed={selected === example}
              onClick={() => setSelected(example)}
              className="bg-white border-2 border-[#1D1B18] px-4 py-2 font-bold text-[#1D1B18] hover:bg-[#FAF8F5]">
              {example === "paypal"
                ? (english ? "PayPal example" : "PayPal-Beispiel")
                : (english ? "Phishing example" : "Phishing-Beispiel")}
            </button>
          ))}
        </div>
      </div>
      {selected && <ScannerResults isScanning={false} scanResult={mockForensicResults[selected]}
        errorMode={null} onTriggerMockAnalysis={setSelected}
        exampleLabel={english ? "Fixed training example · not a live analysis" : "Festes Trainingsbeispiel · keine Live-Analyse"} />}
    </section>
  );
}

function LiveScanner() {
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
          <ScannerResults
            isScanning={isScanning}
            scanResult={scanResult}
            errorMode={errorMode}
            onTriggerMockAnalysis={triggerMockAnalysis}
          />
        </div>
      </div>
    </div>
  );
}
