import React from "react";
import { Shield, AlertTriangle, CheckCircle, HelpCircle, FileText } from "lucide-react";
import { EmailScanResult } from "../../types";

interface ScannerResultsProps {
  scanResult: EmailScanResult;
  exampleLabel: string;
}

export default function ScannerResults({ scanResult, exampleLabel }: ScannerResultsProps) {
  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "safe":
        return {
          bg: "bg-[#00A3A6]/10 border-[#00A3A6] text-[#00A3A6]",
          text: "UNAUFFÄLLIG IM BEISPIEL",
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
          text: "VORGEGEBENER PHISHING-FALL",
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

  const badge = getVerdictBadge(scanResult.verdict);
  return (
    <div className="space-y-6 animate-fade-in" id="scanner-scan-results" lang="de">
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
              <h4 className="text-[9px] text-[#615C54] mt-0.5 font-mono uppercase font-black">{exampleLabel}</h4>
            </div>
          </div>

          <p className="max-w-xs text-xs text-[#615C54] border border-[#1D1B18] bg-white p-3">
            Die Einordnung wurde für dieses Beispiel vorgegeben. Es wird keine Betrugswahrscheinlichkeit berechnet.
          </p>
        </div>

        <p className="text-xs text-[#1D1B18] mt-4 bg-white p-3 border border-[#1D1B18] leading-relaxed font-mono uppercase">
          {scanResult.summary}
        </p>
      </div>

      {/* Evidence Indicators */}
      <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 shadow-[4px_4px_0px_#1D1B18] space-y-4">
        <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#FF5500]" id="icon-indicators-indicators" />
          HINWEISE IM VORBEREITETEN BEISPIEL
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
          <h4 className="text-[10px] font-mono font-black text-[#1D1B18] uppercase tracking-wider">🕵️‍♂️ ERLÄUTERUNG DES BEISPIELS</h4>
          <p className="text-[11px] text-[#615C54] leading-relaxed font-mono uppercase">
            {scanResult.technicalDetails}
          </p>
        </div>

        {/* Recommendations */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] p-4 space-y-2">
          <h4 className="text-[10px] font-mono font-black text-[#1D1B18] uppercase tracking-wider">📋 MÖGLICHE NÄCHSTE SCHRITTE</h4>
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
