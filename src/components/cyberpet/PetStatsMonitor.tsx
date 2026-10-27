import React from "react";
import { Zap, Heart, Shield, Terminal } from "lucide-react";
import { PetState } from "./types";

interface PetStatsMonitorProps {
  pet: PetState;
  language?: string;
}

export default function PetStatsMonitor({ pet, language = "de" }: PetStatsMonitorProps) {
  return (
    <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4" id="pet-stats-monitor">
      <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-[#1D1B18] border-b-2 border-[#1D1B18] pb-2 flex items-center gap-1.5">
        <Terminal className="w-4 h-4 text-[#00A3A6]" />
        {language === "en" ? "SPECIFICATION // SYSTEM DIAGNOSTICS" : "SPEZIFIKATION // DIAGNOSE_WERTE"}
      </h4>

      <div className="grid grid-cols-1 gap-4">
        {/* Stat 1: Energy */}
        <div className="space-y-1" id="stat-energy">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#1D1B18] flex items-center gap-1 font-mono font-bold uppercase text-[10px]">
              <Zap className="w-3.5 h-3.5 text-[#FF5500] shrink-0" id="icon-energy" /> {language === "en" ? "DATA BATTERY (ENERGY)" : "DATEN-AKKU (ENERGY)"}
            </span>
            <span className="font-mono font-black text-[#FF5500]">{pet.energy}%</span>
          </div>
          <div className="bg-[#ECE8DF] border border-[#1D1B18] h-2.5">
            <div className="bg-[#FF5500] h-full" style={{ width: `${pet.energy}%` }}></div>
          </div>
        </div>

        {/* Stat 2: Happiness */}
        <div className="space-y-1" id="stat-happiness">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#1D1B18] flex items-center gap-1 font-mono font-bold uppercase text-[10px]">
              <Heart className="w-3.5 h-3.5 text-[#FF5500] shrink-0" id="icon-happiness" /> {language === "en" ? "ZUFRIEDENHEIT (CORE)" : "ZUFRIEDENHEIT (CORE)"}
            </span>
            <span className="font-mono font-black text-[#1D1B18]">{pet.happiness}%</span>
          </div>
          <div className="bg-[#ECE8DF] border border-[#1D1B18] h-2.5">
            <div className="bg-[#1D1B18] h-full" style={{ width: `${pet.happiness}%` }}></div>
          </div>
        </div>

        {/* Stat 3: Password Defense Level */}
        <div className="space-y-1" id="stat-defense">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#1D1B18] flex items-center gap-1 font-mono font-bold uppercase text-[10px]">
              <Shield className="w-3.5 h-3.5 text-[#00A3A6] shrink-0" id="icon-defense" /> {language === "en" ? "DEFENSE strength (SECURE)" : "ABWEHR-STÄRKE (SECURE)"}
            </span>
            <span className="font-mono font-black text-[#00A3A6]">{pet.passwordDefense}%</span>
          </div>
          <div className="bg-[#ECE8DF] border border-[#1D1B18] h-2.5">
            <div className="bg-[#00A3A6] h-full" style={{ width: `${pet.passwordDefense}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
