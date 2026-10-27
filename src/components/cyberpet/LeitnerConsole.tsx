import React from "react";
import { BookOpen } from "lucide-react";
import { GAME_PACKETS_POOL } from "./types";

interface LeitnerConsoleProps {
  getLeitnerMap: () => Record<string, number>;
  onReset: () => void;
  language?: string;
}

export default function LeitnerConsole({ getLeitnerMap, onReset, language = "de" }: LeitnerConsoleProps) {
  const leitnerMap = getLeitnerMap();

  return (
    <div className="bg-[#FAF8F5] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4 text-left" id="leitner-console-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-[#1D1B18] pb-2">
        <div>
          <h4 className="text-xs font-black uppercase text-[#1D1B18] font-mono flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#FF5500]" id="icon-bookopen" />
            {language === "en" ? "📂 ACTIVE MEMORY BOX (LEITNER REPETITION DECK)" : "📂 LAUFENDER VOKABELKASTEN (LEITNER repetitions-DECK)"}
          </h4>
          <p className="text-[10px] text-[#615C54] font-mono mt-0.5 uppercase font-medium">
            {language === "en"
              ? "True domain hardening: Correct responses shift patterns right. Failures reset them back to Box 1."
              : "Echte Domänen-Härtung: Korrekte Antworten rücken Muster nach rechts. Falsche werfen sie in Box 1 zurück!"}
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
            <span>{language === "en" ? "Box 1: Learning" : "Box 1: Lernend"}</span>
            <span>{GAME_PACKETS_POOL.filter(p => (leitnerMap[p.text] || 0) === 0).length} {language === "en" ? "Patterns" : "Muster"}</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto">
            {GAME_PACKETS_POOL.filter(p => (leitnerMap[p.text] || 0) === 0).map(p => (
              <div key={p.text} className="text-[10px] bg-white border border-[#1D1B18]/40 px-2 py-1 font-mono truncate text-[#1D1B18]">
                {p.text}
              </div>
            ))}
            {GAME_PACKETS_POOL.filter(p => (leitnerMap[p.text] || 0) === 0).length === 0 && (
              <div className="text-[9px] text-[#615C54] font-mono italic text-center py-4">
                {language === "en" ? "Box 1 is empty!" : "Box 1 ist leer!"}
              </div>
            )}
          </div>
        </div>

        {/* Box 2 */}
        <div className="border border-[#1D1B18] p-3 bg-amber-50/20" id="leitner-box-2">
          <div className="flex justify-between text-[10px] font-mono font-extrabold text-amber-600 border-b border-[#1D1B18]/15 pb-1 uppercase">
            <span>{language === "en" ? "Box 2: Retained (1x Correct)" : "Box 2: Behalten (1x Richtig)"}</span>
            <span>{GAME_PACKETS_POOL.filter(p => leitnerMap[p.text] === 1).length} {language === "en" ? "Patterns" : "Muster"}</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto">
            {GAME_PACKETS_POOL.filter(p => leitnerMap[p.text] === 1).map(p => (
              <div key={p.text} className="text-[10px] bg-white border border-[#1D1B18]/40 px-2 py-1 font-mono truncate text-[#1D1B18]">
                {p.text}
              </div>
            ))}
            {GAME_PACKETS_POOL.filter(p => leitnerMap[p.text] === 1).length === 0 && (
              <div className="text-[9px] text-[#615C54] font-mono italic text-center py-4">
                {language === "en" ? "No retained patterns" : "Keine unvollständigen Muster"}
              </div>
            )}
          </div>
        </div>

        {/* Box 3 */}
        <div className="border border-[#1D1B18] p-3 bg-emerald-50/20" id="leitner-box-3">
          <div className="flex justify-between text-[10px] font-mono font-extrabold text-emerald-600 border-b border-[#1D1B18]/15 pb-1 uppercase">
            <span>{language === "en" ? "Box 3: Mastered (2x Correct) 🎉" : "Box 3: Meisterhaft (2x Richtig) 🎉"}</span>
            <span>{GAME_PACKETS_POOL.filter(p => (leitnerMap[p.text] || 0) >= 2).length} {language === "en" ? "Patterns" : "Muster"}</span>
          </div>
          <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto">
            {GAME_PACKETS_POOL.filter(p => (leitnerMap[p.text] || 0) >= 2).map(p => (
              <div key={p.text} className="text-[10px] bg-white border border-[#1D1B18]/40 px-2 py-1 font-mono truncate text-emerald-700 font-extrabold flex items-center justify-between">
                <span>{p.text}</span>
                <span className="text-[8px] bg-emerald-100 px-1 font-extrabold uppercase text-emerald-600 tracking-wider">
                  {language === "en" ? "Archived" : "Archiviert"}
                </span>
              </div>
            ))}
            {GAME_PACKETS_POOL.filter(p => (leitnerMap[p.text] || 0) >= 2).length === 0 && (
              <div className="text-[9px] text-[#2E2C29] font-mono italic text-center py-4">
                {language === "en" ? "No mastered patterns yet" : "Noch kein Meistermuster"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
