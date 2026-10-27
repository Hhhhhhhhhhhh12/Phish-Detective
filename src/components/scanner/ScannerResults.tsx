import React from "react";
import { Shield, AlertTriangle, CheckCircle, HelpCircle, FileText, ArrowRight, BookOpen } from "lucide-react";
import { EmailScanResult } from "../../types";

interface ScannerResultsProps {
  isScanning: boolean;
  scanResult: EmailScanResult | null;
  errorMode: { active: boolean; message: string; code?: string } | null;
  onTriggerMockAnalysis: (type: "paypal" | "general") => void;
  exampleLabel?: string;
}

export default function ScannerResults({
  isScanning,
  scanResult,
  errorMode,
  onTriggerMockAnalysis,
  exampleLabel
}: ScannerResultsProps) {
  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "safe":
        return {
          bg: "bg-[#00A3A6]/10 border-[#00A3A6] text-[#00A3A6]",
          text: "LEGITIM / SICHER",
          color: "text-[#00A3A6]",
          icon: <CheckCircle className="w-5 h-5 text-[#00A3A6]" id="icon-verdict-safe" />
        };
      case "suspicious":
        return {
          bg: "bg-[#1D1B18]/10 border-[#1D1B18] text-[#1D1B18]",
          text: "VERDÄCHTIG / SUSPECT",
          color: "text-[#1D1B18]",
          icon: <AlertTriangle className="w-5 h-5 text-[#1D1B18]" id="icon-verdict-suspicious" />
        };
      case "dangerous":
        return {
          bg: "bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500]",
          text: "GEFÄHRLICH (PHISHING)",
          color: "text-[#FF5500]",
          icon: <Shield className="w-5 h-5 text-[#FF5500]" id="icon-verdict-dangerous" />
        };
      default:
        return {
          bg: "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18]",
          text: "UNBEKANNT",
          color: "text-[#1D1B18]",
          icon: <HelpCircle className="w-5 h-5 text-[#1D1B18]" id="icon-verdict-unknown" />
        };
    }
  };

  if (isScanning) {
    return (
      <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-8 flex flex-col items-center justify-center text-center h-[460px] shadow-[4px_4px_0px_#1D1B18] relative" id="scanning-progress">
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-[#1D1B18] flex items-center justify-center bg-white shadow-[3px_3px_0px_#1D1B18] animate-ping">
            <Shield className="w-8 h-8 text-[#FF5500]" id="icon-spin-scanning" />
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
    );
  }

  if (errorMode) {
    return (
      <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-6 h-[460px] flex flex-col justify-between shadow-[4px_4px_0px_#1D1B18]" id="scanner-error-panel">
        <div>
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 bg-[#FF5500]/10 border-2 border-[#FF5500]">
              <AlertTriangle className="w-6 h-6 text-[#FF5500]" id="icon-err-alert" />
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
                onClick={() => onTriggerMockAnalysis("paypal")}
                className="bg-white border-2 border-[#1D1B18] hover:bg-[#FAF8F5] text-[#1D1B18] font-black py-2.5 px-3 rounded-none text-left flex items-center justify-between transition text-[10px] uppercase shadow-[2px_2px_0px_#1D1B18]"
              >
                💳 PAYPAL BERICHT
                <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
              </button>
              <button
                onClick={() => onTriggerMockAnalysis("general")}
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
    );
  }

  if (scanResult) {
    const badge = getVerdictBadge(scanResult.verdict);
    return (
      <div className="space-y-6 animate-fade-in" id="scanner-scan-results">
        {/* Verdict Card */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 shadow-[4px_4px_0px_#1D1B18]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-[#1D1B18]">
                {badge.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase font-mono text-[#FAF8F5]/0 select-none">INDEX:</span>
                  <span className={`text-[10px] font-black uppercase font-mono border-2 py-0.5 px-2.5 rounded-none ${badge.bg}`}>
                    {badge.text}
                  </span>
                </div>
                <h4 className="text-[9px] text-[#615C54] mt-0.5 font-mono uppercase font-black">{exampleLabel || "Echte Forensische Auswertung"}</h4>
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
            <FileText className="w-4 h-4 text-[#FF5500]" id="icon-indicators-indicators" />
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
    );
  }

  return (
    <div className="bg-[#F4F1EA] border-2 border-dashed border-[#1D1B18] p-12 flex flex-col items-center justify-center text-center h-[460px] shadow-xs" id="scanner-default-empty">
      <div className="w-16 h-16 bg-white border-2 border-[#1D1B18] flex items-center justify-center text-[#1D1B18] mb-4 shadow-[2px_2px_0px_#1D1B18]">
        <Shield className="w-8 h-8 text-[#FF5500]" id="icon-shield-empty" />
      </div>
      <h3 className="text-xs font-black uppercase font-mono text-[#1D1B18]">Warten auf forensische Messung...</h3>
      <p className="text-xs text-[#615C54] mt-2 max-w-sm font-mono uppercase">
        GEBEN SIE LINKS EINEN ZU EXAMINIERENDEN SPEICHERBEREICH EIN ODER DRÜCKEN SIE EIN CHASSIS-DEMO LINKS OBEN FÜR DEN AUTOMATED REPORT.
      </p>
    </div>
  );
}
