import React, { useState, useEffect } from "react";
import Scanner from "./components/Scanner";
import Simulator from "./components/Simulator";
import Inspector from "./components/Inspector";
import Handbook from "./components/Handbook";
import NoirComics from "./components/NoirComics";
import CyberPet from "./components/CyberPet";
import PasswordLab from "./components/PasswordLab";
import { Shield, Search, Link2, BookOpen, Clock, Activity, Cpu, CheckCircle, Flame, KeyRound } from "lucide-react";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type ActiveTab = "simulator" | "scanner" | "inspector" | "comics" | "pet" | "password" | "handbook";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("simulator");
  const [currentTime, setCurrentTime] = useState("");

  // Clock state matching elegant style guidelines
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("de-DE", { timeZone: "UTC", hour12: false }) + " UTC");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1B18] font-sans selection:bg-[#FF5500]/10 selection:text-[#FF5500] relative pb-12">
      
      {/* Visual background subtle grid accent */}
      <div className="absolute inset-0 bg-[#1D1B18]/[0.02] bg-[linear-gradient(to_right,#1D1B18_1px,transparent_1px),linear-gradient(to_bottom,#1D1B18_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 space-y-6">
        
        {/* Top Navbar Header: Styled like an OP-1 / EP-133 Control Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1D1B18] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5500] flex items-center justify-center border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] shrink-0">
              <Shield className="w-5.5 h-5.5 text-[#FAF8F5] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black font-sans tracking-tight text-[#1D1B18] uppercase">PHISH DETECTIVE</h1>
                <span className="text-[9px] bg-[#1D1B18] text-[#FAF8F5] font-mono font-bold px-1.5 py-0.5 tracking-wider uppercase">
                  TE-2.0 SYSTEM
                </span>
              </div>
              <p className="text-[10px] text-[#615C54] font-mono leading-none mt-1">INDUSTRIAL SECURITY & ENTRANCE CONTROL MODULE</p>
            </div>
          </div>

          {/* Real-time hardware diagnostics status indicators */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] text-[#1D1B18]">
            <div className="flex items-center gap-1.5 bg-[#ECE8DF] border border-[#1D1B18] px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D1B18]"></span>
              <span className="font-bold">{currentTime || "TIME: LOADING"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#ECE8DF] border border-[#1D1B18] px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3A6] animate-pulse"></span>
              <span className="font-bold">CORE: READY_OFFLINE</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#ECE8DF] border border-[#1D1B18] px-2.5 py-1" title="Gemini 3.5-flash">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
              <span className="font-bold">ENGINE: FLASH_3.5</span>
            </div>
          </div>
        </header>

        {/* Navigation Tabs bar - Pocket Operator Switch Grid */}
        <nav className="border-b border-[#1D1B18]/60 pb-3">
          <div className="flex flex-wrap gap-2" id="applet-navigation-tabs">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "simulator"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              🥋 [SIMULATOR]
            </button>

            <button
              onClick={() => setActiveTab("scanner")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "scanner"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              🔍 [AI SCAN]
            </button>

            <button
              onClick={() => setActiveTab("inspector")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "inspector"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              🔗 [URL SCAN]
            </button>

            <button
              onClick={() => setActiveTab("pet")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "pet"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              🐡 [PHISH-O-MAT]
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "password"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              🔐 [PASSWORT-LAB]
            </button>

            <button
              onClick={() => setActiveTab("comics")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "comics"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              🎬 [NOIR-COMICS]
            </button>

            <button
              onClick={() => setActiveTab("handbook")}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition border-2 ${
                activeTab === "handbook"
                  ? "bg-[#1D1B18] border-[#1D1B18] text-[#FAF8F5] shadow-[2px_2px_0px_#FF5500]"
                  : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
              }`}
            >
              📖 [HANDBUCH]
            </button>
          </div>
        </nav>

        {/* Active tab content area */}
        <main className="min-h-[480px]">
          {activeTab === "simulator" && <Simulator />}
          {activeTab === "scanner" && <Scanner />}
          {activeTab === "inspector" && <Inspector />}
          {activeTab === "pet" && <CyberPet />}
          {activeTab === "password" && <PasswordLab />}
          {activeTab === "comics" && <NoirComics />}
          {activeTab === "handbook" && <Handbook />}
        </main>

        {/* Teenage Engineering Style bottom layout details */}
        <footer className="border-t-2 border-[#1D1B18] pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-[#615C54] font-mono uppercase tracking-widest">
          <div>
            © 2026 PHISH DETECTIVE. DESIGNED AND PRODUCED FOR HIGH-SENSITIVITY FORENSIC USAGE.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-[#1D1B18] transition select-none cursor-pointer border-r border-[#1D1B18]/30 pr-4">MODEL: TE-SYS-8</span>
            <span className="hover:text-[#1D1B18] transition select-none cursor-pointer border-r border-[#1D1B18]/30 pr-4">BATCH: 025-DE</span>
            <span className="hover:text-[#1D1B18] transition select-none cursor-pointer">BUILD: PASS_01</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
