import React, { useState } from "react";
import { learningModules } from "../cases";
import { BookOpen, Sparkles, Check } from "lucide-react";

export default function Handbook() {
  const [activeModuleId, setActiveModuleId] = useState(learningModules[0].id);

  const activeModule = learningModules.find(m => m.id === activeModuleId) || learningModules[0];

  return (
    <div className="space-y-6" id="handbook-tab-root">
      {/* Header Info */}
      <div className="border-b border-[#1D1B18] pb-5">
        <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase font-mono">
          <BookOpen className="w-5 h-5 text-[#FF5500]" />
          ERMITTLER-HANDBUCH // WISSENSDATENBANK
        </h2>
        <p className="text-xs text-[#615C54] font-mono mt-1">
          ANOMALIE-REGISTRIERUNG: TECHNISCHE UND PSYCHOLOGISCHE ANALYSEN ZUR ABWEHR GEZIELTER MANIPULATIONEN.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Module Sidebar list - 4 cols */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#615C54] block mb-1 px-1">MANUAL_THEMEN CHASSIS:</span>
          {learningModules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModuleId(module.id)}
              className={`w-full text-left p-3.5 rounded-none border-2 flex items-center gap-3 transition ${
                activeModuleId === module.id
                  ? "bg-[#1D1B18] border-[#1D1B18] text-white shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#F4F1EA] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#1D1B18]"
              }`}
            >
              <div className={`p-2 border-2 text-xs shrink-0 ${
                activeModuleId === module.id ? "bg-white border-white text-[#1D1B18]" : "bg-white border-[#1D1B18] text-[#1D1B18]"
              }`}>
                {module.icon === "Mail" ? "📧" : module.icon === "Link" ? "🔗" : "⚠️"}
              </div>
              <div className="space-y-0.5 truncate font-mono uppercase">
                <h4 className="text-xs font-black truncate">{module.title}</h4>
                <p className={`text-[9px] truncate tracking-tight font-bold ${activeModuleId === module.id ? "text-slate-350" : "text-[#615C54]"}`}>{module.shortDescription}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Module View - 8 cols */}
        <div className="lg:col-span-8">
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-6 space-y-5">
            <div>
              <span className="text-[9px] font-mono uppercase text-[#00A3A6] font-black tracking-wider block">LEITFADEN-SPEKTRO</span>
              <h3 className="text-base font-black text-[#1D1B18] uppercase font-mono mt-0.5">{activeModule.title}</h3>
              <p className="text-xs text-[#615C54] mt-1 font-mono uppercase">{activeModule.shortDescription}</p>
            </div>

            {/* Core informational text */}
            <div className="bg-white p-4 border border-[#1D1B18]">
              <p className="text-xs text-[#1D1B18] leading-relaxed font-mono uppercase whitespace-pre-line">{activeModule.content}</p>
            </div>

            {/* Concrete indicators / clues Checklist */}
            <div className="space-y-3 font-mono">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#615C54] block">SICHERHEITS-CHECKLISTE (INDIZIEN):</span>
              <div className="space-y-2">
                {activeModule.clues.map((clue, idx) => (
                  <div 
                    key={idx}
                    className="bg-white p-3 border border-[#1D1B18] flex items-start gap-2.5 shadow-[1.5px_1.5px_0px_#1D1B18]"
                  >
                    <div className="p-0.5 bg-[#00A3A6]/10 border border-[#00A3A6] text-[#00A3A6] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs text-[#1D1B18] leading-relaxed font-sans">{clue}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical rule of thumb */}
            <div className="border-t-2 border-[#1D1B18]/20 pt-4 flex items-center justify-between gap-4 text-xs text-[#615C54] font-mono uppercase">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                Regel: Im Zweifel gilt: Keine Daten über ungeplante SMS/Links eingeben.
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
