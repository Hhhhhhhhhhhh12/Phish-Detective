import React from "react";
import { BookOpen } from "lucide-react";
import { getLocalizedGamePacketsPool, Language } from "../../utils/i18n";

interface LeitnerConsoleProps {
  getLeitnerMap: () => Record<string, number>;
  onReset: () => void;
  language?: Language;
}

export default function LeitnerConsole({ getLeitnerMap, onReset, language = "de" }: LeitnerConsoleProps) {
  const leitnerMap = getLeitnerMap();
  const packets = getLocalizedGamePacketsPool(language);

  return (
    <div className="bg-[#FAF8F5] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4 text-left" id="leitner-console-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-[#1D1B18] pb-2">
        <div>
          <h4 className="text-xs font-black uppercase text-[#1D1B18] font-mono flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#FF5500]" id="icon-bookopen" />
            {language === "en" ? "📂 PRACTICE CARD BOX" : "📂 ÜBUNGSKARTEN-KASTEN"}
          </h4>
          <p className="text-[10px] text-[#615C54] font-mono mt-0.5 uppercase font-medium">
            {language === "en"
              ? "Correct answers move cards right; incorrect answers move them back to Box 1. This counts practice answers, without a timed review schedule or a skills assessment."
              : "Richtige Antworten verschieben Karten nach rechts, falsche zurück in Box 1. Dies zählt Übungsantworten, ohne zeitgesteuerten Wiederholungsplan oder Kompetenzmessung."}
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-[9px] font-mono uppercase bg-white border border-[#1D1B18] text-red-600 hover:bg-red-50 px-2 py-0.5 font-bold transition"
        >
          {language === "en" ? "[ Clear Deck ]" : "[ Kasten leeren ]"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
        {/* Box 1 */}
        <div className="border border-[#1D1B18] p-3 bg-red-50/20" id="leitner-box-1">
          <div className="flex justify-between text-[10px] font-mono font-extrabold text-red-600 border-b border-[#1D1B18]/15 pb-1 uppercase">
            <span>{language === "en" ? "Box 1: New / retry" : "Box 1: Neu / wiederholen"}</span>
            <span>{packets.filter(p => (leitnerMap[p.text] || 0) === 0).length} {language === "en" ? "Cards" : "Karten"}</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto">
            {packets.filter(p => (leitnerMap[p.text] || 0) === 0).map(p => (
              <div key={p.text} className="text-[10px] bg-white border border-[#1D1B18]/40 px-2 py-1 font-mono truncate text-[#1D1B18]">
                {p.text}
              </div>
            ))}
            {packets.filter(p => (leitnerMap[p.text] || 0) === 0).length === 0 && (
              <div className="text-[9px] text-[#615C54] font-mono italic text-center py-4">
                {language === "en" ? "Box 1 is empty!" : "Box 1 ist leer!"}
              </div>
            )}
          </div>
        </div>

        {/* Box 2 */}
        <div className="border border-[#1D1B18] p-3 bg-amber-50/20" id="leitner-box-2">
          <div className="flex justify-between text-[10px] font-mono font-extrabold text-amber-600 border-b border-[#1D1B18]/15 pb-1 uppercase">
            <span>{language === "en" ? "Box 2: Correct once" : "Box 2: Einmal richtig"}</span>
            <span>{packets.filter(p => leitnerMap[p.text] === 1).length} {language === "en" ? "Cards" : "Karten"}</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto">
            {packets.filter(p => leitnerMap[p.text] === 1).map(p => (
              <div key={p.text} className="text-[10px] bg-white border border-[#1D1B18]/40 px-2 py-1 font-mono truncate text-[#1D1B18]">
                {p.text}
              </div>
            ))}
            {packets.filter(p => leitnerMap[p.text] === 1).length === 0 && (
              <div className="text-[9px] text-[#615C54] font-mono italic text-center py-4">
                {language === "en" ? "No cards here" : "Keine Karten in diesem Fach"}
              </div>
            )}
          </div>
        </div>

        {/* Box 3 */}
        <div className="border border-[#1D1B18] p-3 bg-emerald-50/20" id="leitner-box-3">
          <div className="flex justify-between text-[10px] font-mono font-extrabold text-emerald-600 border-b border-[#1D1B18]/15 pb-1 uppercase">
            <span>{language === "en" ? "Box 3: Correct twice 🎉" : "Box 3: Zweimal richtig 🎉"}</span>
            <span>{packets.filter(p => (leitnerMap[p.text] || 0) >= 2).length} {language === "en" ? "Cards" : "Karten"}</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto">
            {packets.filter(p => (leitnerMap[p.text] || 0) >= 2).map(p => (
              <div key={p.text} className="text-[10px] bg-white border border-[#1D1B18]/40 px-2 py-1 font-mono truncate text-emerald-700 font-extrabold flex items-center justify-between">
                <span>{p.text}</span>
                <span className="text-[8px] bg-emerald-100 px-1 font-extrabold uppercase text-emerald-600 tracking-wider">
                  {language === "en" ? "Archived" : "Archiviert"}
                </span>
              </div>
            ))}
            {packets.filter(p => (leitnerMap[p.text] || 0) >= 2).length === 0 && (
              <div className="text-[9px] text-[#2E2C29] font-mono italic text-center py-4">
                {language === "en" ? "No card answered correctly twice yet" : "Noch keine Karte zweimal richtig beantwortet"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
