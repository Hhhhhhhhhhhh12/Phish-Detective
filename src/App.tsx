import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Search, 
  Link2, 
  BookOpen, 
  Clock, 
  Activity, 
  Cpu, 
  CheckCircle, 
  Flame, 
  KeyRound, 
  Home, 
  Smartphone, 
  Laptop, 
  Lock, 
  Unlock, 
  Zap,
  AlertCircle,
  Globe
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import Scanner from "./components/Scanner";
import Simulator from "./components/Simulator";
import Inspector from "./components/Inspector";
import Handbook from "./components/Handbook";
import NoirComics from "./components/NoirComics";
import CyberPet from "./components/CyberPet";
import PasswordLab from "./components/PasswordLab";
import { translations, Language } from "./utils/i18n";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type ActiveTab = "landing" | "dashboard" | "simulator" | "scanner" | "inspector" | "comics" | "pet" | "password" | "handbook";

// Sequential unlock thresholds for Duolingo-style progression
const UNLOCK_XP_REQUIREMENTS: Record<Exclude<ActiveTab, "landing">, number> = {
  dashboard: 0,
  pet: 0,
  password: 0,
  simulator: 80,
  comics: 180,
  scanner: 280,
  inspector: 380,
  handbook: 0,
};

// Simple German display titles for the milestones
const TAB_LABEL_MAPPING: Record<Exclude<ActiveTab, "landing">, string> = {
  dashboard: "HQ Pfad",
  pet: "Phish-O-Mat",
  password: "Passwort-Lab",
  simulator: "Simulator",
  comics: "Noir-Comics",
  scanner: "AI Scan",
  inspector: "URL Scan",
  handbook: "Handbuch",
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("landing");
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("phish_detective_language");
    if (saved === "de" || saved === "en" || saved === "ch") return saved;
    return "de";
  });
  const [currentTime, setCurrentTime] = useState("");
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const [bypassLocks, setBypassLocks] = useState<boolean>(() => {
    return localStorage.getItem("phish_bypass_locks") === "true";
  });

  // Load and subscribe to pet state to track real-time level/XP
  const [currentXp, setCurrentXp] = useState(15);
  const [petName, setPetName] = useState("Byte");
  const [petLevel, setPetLevel] = useState(1);
  const [showLockAlert, setShowLockAlert] = useState<{ active: boolean; needed: number; module: string } | null>(null);

  const labels = translations[language];

  const getTabLabel = (tab: Exclude<ActiveTab, "landing">): string => {
    switch (tab) {
      case "dashboard": return labels.hqPath;
      case "pet": return labels.phishomat;
      case "password": return labels.passwordLab;
      case "simulator": return labels.simulator;
      case "comics": return labels.comics;
      case "scanner": return labels.aiScan;
      case "inspector": return labels.urlScan;
      case "handbook": return labels.handbook;
    }
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("phish_detective_language", lang);
  };

  // Sync pet XP from localStorage
  const refreshPetXp = () => {
    try {
      const saved = localStorage.getItem("phish_detective_pet");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCurrentXp(parsed.xp || 15);
        setPetLevel(parsed.level || 1);
        setPetName(parsed.name || "Byte");
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    refreshPetXp();
    // Poll to keep in perfect synchronization
    const timer = setInterval(refreshPetXp, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live Clock UTC
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString(language === "en" ? "en-US" : "de-DE", { timeZone: "UTC", hour12: false }) + " UTC");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const handleBypassToggle = () => {
    const newVal = !bypassLocks;
    setBypassLocks(newVal);
    localStorage.setItem("phish_bypass_locks", newVal ? "true" : "false");
  };

  const isModuleLocked = (tab: ActiveTab): boolean => {
    if (tab === "landing") return false;
    if (bypassLocks) return false;
    const req = UNLOCK_XP_REQUIREMENTS[tab];
    return currentXp < req;
  };

  const handleTabClick = (tab: ActiveTab) => {
    if (isModuleLocked(tab)) {
      const req = UNLOCK_XP_REQUIREMENTS[tab as Exclude<ActiveTab, "landing">];
      setShowLockAlert({
        active: true,
        needed: req,
        module: getTabLabel(tab as Exclude<ActiveTab, "landing">)
      });
      setTimeout(() => setShowLockAlert(null), 5000);
      return;
    }
    setActiveTab(tab);
    setShowLockAlert(null);
  };

  // Render Lucide icon for each tab (Pictogram strategy)
  const renderTabIcon = (tab: Exclude<ActiveTab, "landing">, isLocked: boolean) => {
    if (isLocked) {
      return <Lock className="w-4 h-4 text-slate-400" id={`icon-lock-${tab}`} />;
    }
    switch (tab) {
      case "dashboard": return <Home className="w-4 h-4" id="icon-tab-dashboard" />;
      case "pet": return <Flame className="w-4 h-4 text-amber-500 animate-pulse" id="icon-tab-pet" />;
      case "password": return <KeyRound className="w-4 h-4 text-emerald-500" id="icon-tab-password" />;
      case "simulator": return <Shield className="w-4 h-4 text-blue-500" id="icon-tab-simulator" />;
      case "comics": return <BookOpen className="w-4 h-4 text-violet-500" id="icon-tab-comics" />;
      case "scanner": return <Cpu className="w-4 h-4 text-[#00A3A6]" id="icon-tab-scanner" />;
      case "inspector": return <Search className="w-4 h-4 text-rose-500" id="icon-tab-inspector" />;
      case "handbook": return <BookOpen className="w-4 h-4 text-amber-600" id="icon-tab-handbook" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1B18] font-sans selection:bg-[#FF5500]/10 selection:text-[#FF5500] relative pb-12 transition-colors">
      
      {/* Visual background - Simplified, pure soft off-white without busy chaotic screen lines */}
      <div className="absolute inset-0 bg-neutral-100/10 pointer-events-none" />

      {activeTab === "landing" ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#04080a] via-[#091518] to-slate-950 text-[#FAF8F5] overflow-y-auto w-full">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes swim {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-7px) rotate(1.5deg); }
              66% { transform: translateY(5px) rotate(-1deg); }
            }
            @keyframes fin-wiggle {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(15deg) skewX(5deg); }
            }
            @keyframes bubble-rise {
              0% { transform: translateY(110%) translateX(0); opacity: 0; }
              10% { opacity: 0.6; }
              90% { opacity: 0.4; }
              100% { transform: translateY(-10%) translateX(12px); opacity: 0; }
            }
            @keyframes ambient-glow {
              0%, 100% { opacity: 0.15; transform: scale(1); }
              50% { opacity: 0.25; transform: scale(1.1); }
            }
            .aq-swim { animation: swim 6s ease-in-out infinite; }
            .aq-fin { animation: fin-wiggle 1.2s ease-in-out infinite; transform-origin: left center; }
            .aq-bubble-1 { animation: bubble-rise 7s ease-in infinite; }
            .aq-bubble-2 { animation: bubble-rise 9s ease-in infinite; animation-delay: 2.5s; }
          `}} />

          {/* Ambient decorative glowing backdrops */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00D2FF]/10 rounded-full blur-[120px] pointer-events-none" style={{ animation: "ambient-glow 8s ease-in-out infinite" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF5500]/10 rounded-full blur-[120px] pointer-events-none" style={{ animation: "ambient-glow 12s ease-in-out infinite", animationDelay: "2s" }} />

          {/* Title Area */}
          <div className="text-center mb-6 space-y-2 max-w-xl px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] uppercase font-mono tracking-wider text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              {labels.systemUnit}
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#FAF8F5] drop-shadow-[0_2px_10px_rgba(0,163,166,0.2)]">
              {labels.appTitle}
            </h1>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              {language === "en" 
                ? "Adopt a cyber-fish, identify targeted phishing templates, and learn how to secure corporate servers against engineered human threats."
                : language === "ch"
                ? "Adoptiere einen Cyber-Fisch, entlarve Schweizer Phishing-Angriffe (TWINT, Die Post) und lerne reale Bedrohungen abzuwehren."
                : "Adoptiere einen Cyber-Fisch, erkenne gefälschte E-Mails und trainiere deine Reflexe gegen modernste Cyber-Angriffe."}
            </p>
          </div>

          {/* Visual Beautiful Container Frame */}
          <div className="w-full max-w-lg bg-[#141210]/95 border border-zinc-800 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(1,1,1,0.5)] rounded-2xl space-y-6 relative z-10 backdrop-blur-xl">
            
            {/* Top Language Selectors (Interactive Entry Panel) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                  <Globe className="w-3 h-3 text-teal-400" />
                  REGION &amp; LANGUAGE_
                </span>
                <span className="text-[9px] font-mono text-teal-400 font-bold uppercase">
                  ACTIVE: {language.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
                  { code: "en" as Language, name: "English", flag: "🇬🇧" },
                  { code: "ch" as Language, name: "Schweiz", flag: "🇨🇭" }
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => changeLanguage(l.code)}
                    className={`flex items-center justify-center flex-col sm:flex-row gap-1.5 py-2.5 px-3 rounded-lg border text-xs font-mono font-black transition-all ${
                      language === l.code
                        ? "bg-[#FF5500] border-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.3)]"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800"
                    }`}
                  >
                    <span className="text-base leading-none select-none">{l.flag}</span>
                    <span className="tracking-wide uppercase text-[10px] sm:text-xs">{l.name}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Swiss Region Active Information Banner */}
              {language === "ch" && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2.5 rounded-lg text-[10px] font-mono text-center flex items-center justify-center gap-1.5 animate-fade-in uppercase font-bold">
                  <span>🇨🇭</span>
                  <span>{labels.chModeBadge}</span>
                </div>
              )}
              {language === "en" && (
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-2.5 rounded-lg text-[10px] font-mono text-center flex items-center justify-center gap-1.5 animate-fade-in uppercase font-bold">
                  <span>🇬🇧</span>
                  <span>INTERNATIONAL MODE: All simulators and guides localized with USD &amp; English</span>
                </div>
              )}
              {language === "de" && (
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 p-2.5 rounded-lg text-[10px] font-mono text-center flex items-center justify-center gap-1.5 animate-fade-in uppercase font-bold">
                  <span>🇩🇪</span>
                  <span>STANDARD-MODUS: DHL, PayPal, Gehaltsabrechnungen und Euro-Kurse geladen</span>
                </div>
              )}
            </div>

            {/* Highly Polished Animated Glass Aquarium tank (Zero explanatory text clutter) */}
            <div className="relative h-56 bg-gradient-to-b from-[#081214] via-[#04080a] to-[#010304] border border-[#00A3A6]/20 rounded-xl overflow-hidden flex items-center justify-center select-none shadow-inner group">
              
              {/* Scanline reflection overlay */}
              <div className="absolute inset-x-0 h-[100%] bg-gradient-to-b from-[#00A3A6]/[0.012] via-transparent to-transparent pointer-events-none z-10" />

              {/* Virtual Grid backdrop */}
              <div className="absolute inset-0 bg-[#00A3A6]/[0.015] bg-[linear-gradient(to_right,#00A3A6_1px,transparent_1px),linear-gradient(to_bottom,#00A3A6_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Soft Aqua light glow glow */}
              <div className="absolute inset-0 bg-[#00D2FF]/5 animate-pulse filter blur-xl" />

              {/* Vector bubble animations */}
              <div className="absolute bottom-0 left-1/3 w-4 h-full pointer-events-none">
                <div className="aq-bubble-1 absolute bottom-0 left-0 w-2.5 h-2.5 rounded-full border border-[#00A3A6]/30 bg-[#00A3A6]/5" />
              </div>
              <div className="absolute bottom-0 right-1/3 w-4 h-full pointer-events-none">
                <div className="aq-bubble-2 absolute bottom-0 left-0 w-2 h-2 rounded-full border border-[#00A3A6]/20 bg-[#00A3A6]/5" />
              </div>

              {/* High Polished Animated central vector pet */}
              <svg viewBox="0 0 320 180" className="w-52 h-full relative z-10 transform scale-110 group-hover:scale-115 transition-transform duration-700">
                <g className="aq-swim" transform="translate(45, 15)">
                  
                  {/* Underglowing backdrop shape */}
                  <ellipse cx="110" cy="70" rx="40" ry="14" fill="#00D2FF" fillOpacity="0.08" className="blur-md" />

                  {/* High level crown indicator */}
                  {petLevel >= 5 && (
                    <g transform="translate(50, 15)" stroke="#FBBF24" fill="none" strokeWidth="1.5" className="animate-pulse">
                      <circle cx="40" cy="12" r="16" strokeDasharray="3,3" />
                    </g>
                  )}

                  {/* Fish Body wire mesh outline */}
                  <path 
                    d={petLevel >= 5 
                      ? "M 50,70 Q 110,25 180,70 Q 110,115 50,70 Z" 
                      : "M 55,70 C 85,35 145,35 175,70 C 145,105 85,105 55,70 Z"
                    } 
                    fill={petLevel >= 5 ? "#061314" : petLevel >= 4 ? "#1C0D05" : "#0D1819"} 
                    stroke={petLevel >= 4 ? "#FF5500" : "#00A3A6"} 
                    strokeWidth="2.5" 
                  />

                  {/* High quality skin contours */}
                  <path d="M 85,50 Q 115,50 145,55" stroke={petLevel >= 4 ? "#FFaa66" : "#44e3e6"} strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="2,3" fill="none" />

                  {/* Tail with wiggle rotation keyframe */}
                  <g className="aq-fin" style={{ transformOrigin: "175px 70px" }}>
                    <path 
                      d="M 175,70 L 210,35 L 202,70 L 210,105 Z" 
                      fill={petLevel >= 4 ? "#501A02" : "#082526"} 
                      stroke={petLevel >= 4 ? "#FF5500" : "#00A3A6"} 
                      strokeWidth="2" 
                    />
                  </g>

                  {/* Pectoral Fin */}
                  <path d="M 95,78 Q 110,95 105,100 Q 98,90 95,78" fill="#113334" stroke={petLevel >= 4 ? "#FF5500" : "#00A3A6"} strokeWidth="1.5" />

                  {/* Responsive Eye glows */}
                  <circle cx="80" cy="60" r="3.5" fill={petLevel >= 4 ? "#FF5500" : "#00E5FF"} className="animate-pulse" />
                  <circle cx="79" cy="59" r="1" fill="#FAF8F5" />

                  {/* Sunglasses for level 3 */}
                  {petLevel >= 3 && (
                    <g fill="#111" stroke={petLevel >= 4 ? "#FF5500" : "#00E5FF"} strokeWidth="1">
                      <polygon points="68,54 84,54 81,64 69,64" />
                      <line x1="84" y1="56" x2="87" y2="56" strokeWidth="1.5" />
                      <line x1="68" y1="54" x2="60" y2="56" />
                    </g>
                  )}

                  {/* Crown hat for level 5 */}
                  {petLevel >= 5 && (
                    <g fill="#FBBF24" stroke="#D97706" strokeWidth="1" transform="translate(68, 26)">
                      <path d="M 0,15 L 24,11 L 22,8 L 1,12 Z" />
                      <polygon points="5,12 19,9 17,2 7,4" />
                    </g>
                  )}
                </g>
              </svg>

              {/* Status information */}
              <div className="absolute top-3 left-3 text-[8px] font-mono text-[#00A3A6]/80 tracking-widest uppercase">
                {labels.mutStage}_{petLevel} // {petName.toUpperCase()}
              </div>
              <div className="absolute bottom-3 right-3 text-[8px] font-mono text-emerald-400 tracking-widest uppercase animate-pulse flex items-center gap-1 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {labels.statusLive}
              </div>
            </div>

            {/* Live Pet Status & Progress Summary Card */}
            <div className="bg-[#1C1A18] border border-zinc-800 p-4 text-left space-y-3 text-zinc-100 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5500]/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#FF5500] uppercase font-black tracking-wider">
                  👾 {labels.agentStatus}
                </span>
                <span className="text-[9px] font-mono bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] px-1.5 font-bold uppercase rounded">
                  {labels.lvl} {petLevel}/5
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none">
                  {petLevel === 1 ? "🐟" : petLevel === 2 ? "🐠" : petLevel === 3 ? "🕶️🐟" : petLevel === 4 ? "🐠" : "🦈"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black font-sans tracking-wide text-white truncate uppercase">
                    {petName || "Byte"}
                  </div>
                  <div className="text-[9px] font-mono text-[#00A3A6] truncate uppercase mt-0.5">
                    {language === "en" ? (
                      petLevel === 1 ? "Innocent Guppy" : petLevel === 2 ? "Bait Phish" : petLevel === 3 ? "Cyber Phish with shades" : petLevel === 4 ? "Neon Fire Phish" : "Supreme Lord Phish"
                    ) : (
                      petLevel === 1 ? "Unschuldige Kaulquappe" : petLevel === 2 ? "Köder-Phish 🐟" : petLevel === 3 ? "Cyber-Phish mit Sonnenbrille 🕶️" : petLevel === 4 ? "Neon Fire-Phish 🔥" : "Supreme Lord-Phish 🔱"
                    )}
                  </div>
                </div>
              </div>
              
              {/* Micro-Progress meter with actual XP tracker */}
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase font-bold">
                  <span>{labels.xpText}</span>
                  <span className="text-[#00A3A6]">{currentXp} / {petLevel * 100} XP</span>
                </div>
                <div className="h-1 bg-zinc-900 w-full rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00A3A6] to-[#00E5FF] transition-all duration-500" 
                    style={{ width: `${Math.min(100, (currentXp / (petLevel * 100)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tactile start CTA button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className="w-full bg-[#FF5500] hover:bg-[#FAF8F5] hover:text-[#1D1B18] text-[#FAF8F5] border border-transparent hover:border-[#1D1B18] py-4 px-6 text-xs font-black font-mono uppercase tracking-widest shadow-[0_4px_25px_rgba(255,85,0,0.25)] hover:shadow-none active:translate-y-0.5 transition-all duration-150 rounded-xl"
              >
                {labels.startCta}
              </button>
              
              <div className="flex justify-between items-center text-[7.5px] font-mono text-zinc-500 uppercase tracking-wider">
                <span>{labels.systemCard}</span>
                <span>{labels.coreModule}</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 space-y-6">
        
        {/* Top Navbar Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1D1B18] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5500] flex items-center justify-center border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] shrink-0">
              <Shield className="w-5.5 h-5.5 text-[#FAF8F5] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black font-sans tracking-tight text-[#1D1B18] uppercase">PHISH DETECTIVE</h1>
                <span className="text-[9px] bg-[#1D1B18] text-[#FAF8F5] font-mono font-bold px-1.5 py-0.5 tracking-wider uppercase">
                  TE-2.0 {language.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-[#615C54] font-mono leading-none mt-1">
                {language === "en" ? "Interactive learning suite & secure cyber gamification" : "Spielführung &amp; interaktive Cyberaufklärung"}
              </p>
            </div>
          </div>

          {/* Interactive view toggles & diagnostics */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] text-[#1D1B18]">
            
            {/* Language dropdown switcher in active mode */}
            <div className="flex items-center gap-1 bg-[#ECE8DF] border border-[#1D1B18] px-2 py-1">
              <span className="font-bold select-none text-[8px] tracking-wider font-mono text-[#FF5500] uppercase">LANG:</span>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value as Language)}
                className="bg-transparent font-black tracking-wider uppercase outline-none cursor-pointer text-[#1D1B18] text-[9px]"
              >
                <option value="de">🇩🇪 DE</option>
                <option value="en">🇬🇧 EN</option>
                <option value="ch">🇨🇭 CH</option>
              </select>
            </div>

            {/* Real-time XP & Progress */}
            <div className="bg-[#1D1B18] text-[#FAF8F5] px-2 py-1 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-extrabold uppercase font-mono">{petName}: {currentXp} XP (Lvl {petLevel})</span>
            </div>

            {/* Simulated hardware state */}
            <div className="flex items-center gap-1 bg-[#ECE8DF] border border-[#1D1B18] px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3A6] animate-pulse"></span>
              <span className="font-bold text-[8px] tracking-wider uppercase">{currentTime || "UTC"}</span>
            </div>

            {/* Mobile View Emulator toggle */}
            <button
              onClick={() => setIsMobileSimulator(!isMobileSimulator)}
              className={`flex items-center gap-1 px-2.5 py-1 transition-all uppercase border font-bold font-mono text-[9px] ${
                isMobileSimulator 
                  ? "bg-amber-500 text-white border-amber-600 shadow-inner" 
                  : "bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-black"
              }`}
              title={language === "en" ? "Simulate phone viewport" : "Mobiltelefon simulieren"}
            >
              {isMobileSimulator ? (
                <>
                  <Laptop className="w-3.5 h-3.5 text-white" />
                  <span>{labels.desktopMode}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{labels.mobileMode}</span>
                </>
              )}
            </button>

            {/* Cheat Mode Toggle for immediate feature testing */}
            <button
              onClick={handleBypassToggle}
              className={`px-2.5 py-1 transition-all uppercase border font-bold font-mono text-[9px] ${
                bypassLocks 
                  ? "bg-emerald-600 text-white border-emerald-700" 
                  : "bg-white hover:bg-slate-50 border-slate-300 text-slate-500"
              }`}
            >
              {bypassLocks ? labels.cheatsOn : labels.cheatsOff}
            </button>

          </div>
        </header>

        {/* Lock alert helper warning toast */}
        {showLockAlert && (
          <div className="bg-amber-50 border-2 border-amber-500 p-3 text-left font-mono text-[11px] text-amber-800 uppercase flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>
                <strong>{labels.lockMessage} &quot;{showLockAlert.module}&quot;:</strong> {language === "en" ? `You require at least ${showLockAlert.needed} XP (Current: ${currentXp} XP). Train your pet fish in Phish-O-Matic to accrue XP!` : `Du benötigst mindestens ${showLockAlert.needed} XP (Aktuell: ${currentXp} XP). Trainiere deinen Fisch im Phish-O-Mat, um XP zu erhalten!`}
              </span>
            </div>
            <button 
              onClick={handleBypassToggle}
              className="bg-amber-600 hover:bg-amber-700 text-white px-2 py-0.5 text-[9px] font-bold"
            >
              [ {labels.cheatCta} ]
            </button>
          </div>
        )}

        {/* Pictogram-driven Navigation Tabs bar - streamlined and locked indicator */}
        <nav className="border-b border-[#1D1B18]/60 pb-3">
          <div className="flex flex-wrap gap-1.5" id="applet-navigation-tabs">
            
            {(["dashboard", "pet", "password", "simulator", "comics", "scanner", "inspector", "handbook"] as Exclude<ActiveTab, "landing">[]).map((tab) => {
              const locked = isModuleLocked(tab);
              const active = activeTab === tab;
              const req = UNLOCK_XP_REQUIREMENTS[tab];
              const tabLabel = getTabLabel(tab);

              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`flex items-center gap-2 px-3 py-2 text-[10px] font-mono font-black uppercase tracking-wide transition border-2 ${
                    active
                      ? "bg-[#FF5500] border-[#1D1B18] text-white shadow-[2px_2px_0px_#1D1B18]"
                      : locked
                      ? "bg-[#ECE8DF]/40 border-dashed border-slate-400 text-slate-400 cursor-not-allowed opacity-60"
                      : "bg-[#ECE8DF] border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5] shadow-[1.5px_1.5px_0px_#1D1B18]"
                  }`}
                  title={locked ? `${labels.lockMessage}: ${req} XP` : tabLabel}
                >
                  <span className="flex items-center justify-center shrink-0">
                    {renderTabIcon(tab, locked)}
                  </span>
                  <span>{tabLabel}</span>
                  {locked && (
                    <span className="text-[8px] bg-slate-300 text-slate-700 px-1 font-bold">
                      {req}XP
                    </span>
                  )}
                </button>
              );
            })}

          </div>
        </nav>

        {/* Dynamic Mobile Simulator Wrapper Frame */}
        {isMobileSimulator ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center mb-2 font-mono text-[10px] uppercase text-zinc-500 flex items-center gap-1.5 select-none">
              <Smartphone className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>📱 SIMULIERTER MOBIL-VIEWPORT (iPhone Layout)</span>
            </div>

            {/* Phone casing structure */}
            <div className="w-full max-w-[400px] h-[840px] border-[14px] border-zinc-900 rounded-[54px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] bg-[#FAF8F5] relative overflow-hidden flex flex-col pt-10 pb-6 border-b-[16px]">
              
              {/* Dynamic Island Screen Area */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-full z-50 flex items-center justify-between px-3 text-[10px] font-mono text-white/45 select-none pointer-events-none">
                <span className="text-[8px] tracking-tight">●</span>
                <span className="text-[8px] text-amber-500 font-extrabold font-sans">PHISH</span>
                <span className="text-[8px] tracking-tight text-emerald-500">📷</span>
              </div>

              {/* Statusbar */}
              <div className="absolute top-0 inset-x-0 h-10 px-8 flex justify-between items-center text-[9px] font-mono font-bold text-zinc-700 select-none pointer-events-none z-40 bg-[#FAF8F5]/90 border-b border-zinc-200/50">
                <span>09:41 Uhr</span>
                <div className="flex items-center gap-1">
                  <span>📶 5G</span>
                  <span>🔋 100%</span>
                </div>
              </div>

              {/* Simulated Phone Content Area */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                
                {activeTab === "dashboard" && <Dashboard onNavigate={handleTabClick} />}
                {activeTab === "simulator" && <Simulator />}
                {activeTab === "scanner" && <Scanner />}
                {activeTab === "inspector" && <Inspector />}
                {activeTab === "pet" && <CyberPet />}
                {activeTab === "password" && <PasswordLab />}
                {activeTab === "comics" && <NoirComics />}
                {activeTab === "handbook" && <Handbook />}

              </div>

              {/* Bottom Home Indicator Lock Pill */}
              <div className="absolute bottom-1 right-0 left-0 h-1.5 flex justify-center pointer-events-none z-50">
                <div className="w-32 bg-zinc-800 h-1 rounded-full" />
              </div>

            </div>
          </div>
        ) : (
          /* Standard Fullscreen Area */
          <main className="min-h-[480px]">
            {activeTab === "dashboard" && <Dashboard onNavigate={handleTabClick} />}
            {activeTab === "simulator" && <Simulator />}
            {activeTab === "scanner" && <Scanner />}
            {activeTab === "inspector" && <Inspector />}
            {activeTab === "pet" && <CyberPet />}
            {activeTab === "password" && <PasswordLab />}
            {activeTab === "comics" && <NoirComics />}
            {activeTab === "handbook" && <Handbook />}
          </main>
        )}

        {/* Simplified Teenage Engineering Footer details */}
        <footer className="border-t border-[#1D1B18]/30 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-[#615C54] font-mono tracking-widest">
          <div>
            © 2026 PHISH DETECTIVE. INTEGRATIVE SYSTEM CONTROL.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-[#1D1B18] transition select-none cursor-pointer">MODEL: TE-SYS-8</span>
            <span className="hover:text-[#1D1B18] transition select-none cursor-pointer">BUILD: PASS_01</span>
          </div>
        </footer>

      </div>
      )}
    </div>
  );
}
