import React, { useState, useEffect } from "react";
import { Shield, Sparkles, KeyRound, Award, Zap, Flame, Play, Terminal, HelpCircle, ChevronRight, BookOpen, AlertTriangle, Eye, ArrowRight, CheckCircle2, GitBranch, GitPullRequest, RotateCw, ExternalLink, Check } from "lucide-react";
import { motion } from "motion/react";
import { translations, Language } from "../utils/i18n";

interface DashboardProps {
  onNavigate: (tab: "simulator" | "scanner" | "inspector" | "comics" | "pet" | "password" | "handbook") => void;
  language?: Language;
}

export default function Dashboard({ onNavigate, language = "de" }: DashboardProps) {
  // Read pet stats for local display
  const [petStats, setPetStats] = useState({
    name: "Byte",
    level: 1,
    xp: 15,
  });

  // Read Leitner system mastered structures
  const [masteredCount, setMasteredCount] = useState(0);

  // CI/CD Pipeline Simulator State
  const [pipelineState, setPipelineState] = useState<"idle" | "running" | "success">("idle");
  const [activeLogStep, setActiveLogStep] = useState(0);
  const [expandedLogs, setExpandedLogs] = useState(false);

  const labels = translations[language];

  const runLocalPipeline = () => {
    if (pipelineState === "running") return;
    setPipelineState("running");
    setActiveLogStep(0);
    setExpandedLogs(true);
  };

  useEffect(() => {
    if (pipelineState === "running") {
      const timer = setInterval(() => {
        setActiveLogStep((prev) => {
          if (prev < 4) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setPipelineState("success");
            return prev;
          }
        });
      }, 1200);
      return () => clearInterval(timer);
    }
  }, [pipelineState]);

  useEffect(() => {
    // Read Pet
    const savedPet = localStorage.getItem("phish_detective_pet");
    if (savedPet) {
      try {
        const parsed = JSON.parse(savedPet);
        setPetStats({
          name: parsed.name || "Byte",
          level: parsed.level || 1,
          xp: parsed.xp || 15,
        });
      } catch (e) {
        // Fallback
      }
    }

    // Read Leitner mastered domains
    try {
      const mapStr = localStorage.getItem("phish_leitner_box");
      if (mapStr) {
        const map = JSON.parse(mapStr);
        const mastered = Object.values(map).filter((count: any) => count >= 2).length;
        setMasteredCount(mastered);
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  // Visual milestones on our structured Duolingo-like map, completely localized
  const milestones = [
    {
      id: "pet" as const,
      requiredXp: 0,
      title: language === "en" ? "Phish-O-Matic" : "Phish-O-Mat",
      subtitle: language === "en" ? "Training & Reflex Reflector" : "Training & Reflex-Reflektor",
      description: language === "en" 
        ? "Train your cyber fish's reflexes in this fast-paced domain response training environment."
        : language === "ch"
        ? "Trainiere die Abwehrkräfte deines Fisches im schnellen Domänen-Reaktionsspiel."
        : "Trainiere die Abwehrkräfte deines Fisches im schnellen Domänen-Reaktionsspiel.",
      difficulty: language === "en" ? "Starter" : "Starter",
      icon: <Flame className="w-5 h-5 text-amber-500 animate-pulse" />,
      xpReward: 100,
      badge: language === "en" ? "DAILY DUTY" : "TÄGLICHE PFLICHT",
      badgeColor: "bg-amber-500/15 border-amber-500 text-amber-600",
      statsText: language === "en" 
        ? `Fish Level: stage ${petStats.level} / ${masteredCount} patterns` 
        : `Fisch-Stufe: Stufe ${petStats.level} / ${masteredCount} Muster`,
    },
    {
      id: "password" as const,
      requiredXp: 0,
      title: language === "en" ? "Password Lab" : "Passwort-Lab",
      subtitle: language === "en" ? "Entropy & Crypto Sentences" : "Entropie & Krypto-Sätze",
      description: language === "en" 
        ? "Witness live why length defeats complex character sets. Crack standard weak patterns."
        : language === "ch"
        ? "Erlebe live, warum Länge über Komplexität siegt, und knacke schwache Muster."
        : "Erlebe live, warum Länge über Komplexität siegt, und knacke schwache Muster.",
      difficulty: language === "en" ? "Basic" : "Basis",
      icon: <KeyRound className="w-5 h-5 text-emerald-500" />,
      xpReward: 150,
      badge: language === "en" ? "HIGHLY RECOMMENDED" : "DRINGEND EMPFOHLEN",
      badgeColor: "bg-emerald-500/15 border-emerald-500 text-emerald-600",
      statsText: language === "en" ? "Pre-unlocked instructions" : "Erklärung vorab freigeschaltet",
    },
    {
      id: "simulator" as const,
      requiredXp: 80,
      title: language === "en" ? "Email Simulator" : "E-Mail-Simulator",
      subtitle: language === "en" ? "Live Phishing Inbox" : "Der scharfe Posteingang",
      description: language === "en" 
        ? "Investigate incoming emails. Which are authentic and which intend to harvest credentials?"
        : language === "ch"
        ? "Untersuche E-Mails. Welche sind echt, welche wollen deine Zugangsdaten abgreifen?"
        : "Untersuche Emails. Welche sind echt, welche wollen deine Zugangsdaten abgreifen?",
      difficulty: language === "en" ? "Medium" : "Mittel",
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      xpReward: 250,
      badge: language === "en" ? "CHAPTER 3 (Lock: 80 XP)" : "KAPITEL 3 (Sperre: 80 XP)",
      badgeColor: "bg-blue-500/10 border-blue-400 text-blue-600",
      statsText: language === "en" ? "Scenario simulator active" : "Szenario-Simulator bereit",
    },
    {
      id: "comics" as const,
      requiredXp: 180,
      title: language === "en" ? "Interactive Noir Comics" : "Interactive Noir-Comics",
      subtitle: language === "en" ? "The Clumsy Fish Saga" : "Die chaotische Fisch-Saga",
      description: language === "en" 
        ? "Direct 'Phish', the clumsy aquatic hero. Save the corporate infrastructure from algae collapse."
        : language === "ch"
        ? "Steuere 'Phish', den tollpatschigen Helden. Schütze die IT-Welt vor dem Algen-Kollaps."
        : "Steuere 'Phish', den tollpatschigen Helden. Schütze die IT-Welt vor dem Algen-Kollaps.",
      difficulty: language === "en" ? "Advanced" : "Fortgeschritten",
      icon: <BookOpen className="w-5 h-5 text-violet-500" />,
      xpReward: 200,
      badge: language === "en" ? "CHAPTER 4 (Lock: 180 XP)" : "KAPITEL 4 (Sperre: 180 XP)",
      badgeColor: "bg-violet-500/10 border-violet-400 text-violet-600",
      statsText: language === "en" ? "3 acts with decision paths" : "3 Akte mit Entscheidungsweichen",
    },
    {
      id: "scanner" as const,
      requiredXp: 280,
      title: language === "en" ? "AI Phish Scanner" : "AI Phish-Scanner",
      subtitle: language === "en" ? "Vulnerability Analyzer" : "Der automatische Forensiker",
      description: language === "en" 
        ? "Copy-paste suspicious headers or code directly into the AI terminal for instant forensic evaluation."
        : language === "ch"
        ? "Kopiere verdächtige Texte oder Quellcode in das Terminal für AI-Analysen."
        : "Copypaste verdächtige Texte oder Quellcode in das Terminal für AI Analysen.",
      difficulty: language === "en" ? "Expert" : "Experte",
      icon: <Terminal className="w-5 h-5 text-[#00A3A6]" />,
      xpReward: 300,
      badge: language === "en" ? "CHAPTER 5 (Lock: 280 XP)" : "KAPITEL 5 (Sperre: 280 XP)",
      badgeColor: "bg-[#00A3A6]/10 border-[#00A3A6] text-[#008080]",
      statsText: "Gemini AI Intel Engine",
    },
    {
      id: "inspector" as const,
      requiredXp: 380,
      title: language === "en" ? "URL Inspector Pro" : "URL-Sicherheitsprüfer",
      subtitle: language === "en" ? "Deep Link Deconstructor" : "Der Link-Deconstructor",
      description: language === "en" 
        ? "Break down unknown domain configurations. Discover tricky subdomains completely risk-free."
        : language === "ch"
        ? "Zerlege unbekannte Web-Links in ihre Einzelteile. Prüfe Subdomains risikofrei."
        : "Zerlege unbekannte Web-Links in ihre Einzelteile. Prüfe Subdomains risikofrei.",
      difficulty: language === "en" ? "Expert" : "Experte",
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      xpReward: 200,
      badge: language === "en" ? "CHAPTER 6 (Lock: 380 XP)" : "KAPITEL 6 (Sperre: 380 XP)",
      badgeColor: "bg-rose-500/10 border-rose-400 text-rose-600",
      statsText: language === "en" ? "Subdomain detector active" : "Subdomain-Detektor aktiv",
    },
  ];

  // Check state config loaded directly
  const bypassLocks = localStorage.getItem("phish_bypass_locks") === "true";

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard-root">
      
      {/* Visual Hero Intro Banner: Highly Polished Digital Aquarium (No Heavy Text) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Pure Animated Digital Aquarium Container (7 Columns) with ZERO text overload */}
        <div className="md:col-span-8 bg-[#1D1B18] border-2 border-[#1D1B18] p-1.5 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-[4px_4px_0px_#FF5500] rounded-lg">
          
          {/* Internal Glowing Glass Screen representing simulated water tank */}
          <div className="flex-1 bg-gradient-to-b from-[#0B1516] to-[#04090A] border border-[#FF5500]/20 rounded-md p-4 relative overflow-hidden flex flex-col justify-between select-none">
            
            {/* Custom SVG Animations & Keyframes injected directly into style */}
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
              @keyframes radar-scan {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(200%); }
              }
              .aq-swim { animation: swim 6s ease-in-out infinite; }
              .aq-fin { animation: fin-wiggle 1.2s ease-in-out infinite; transform-origin: left center; }
              .aq-bubble-1 { animation: bubble-rise 7s ease-in infinite; }
              .aq-bubble-2 { animation: bubble-rise 9s ease-in infinite; animation-delay: 2.5s; }
              .aq-bubble-3 { animation: bubble-rise 6s ease-in infinite; animation-delay: 4s; }
            `}} />

            {/* Simulated Radar Scanline across aquarium */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A3A6]/45 to-transparent z-20 pointer-events-none" style={{ animation: "radar-scan 4.5s linear infinite" }} />

            {/* Retro Analog Glass Grid backdrop */}
            <div className="absolute inset-0 bg-[#00A3A6]/[0.02] bg-[linear-gradient(to_right,#00A3A6_1px,transparent_1px),linear-gradient(to_bottom,#00A3A6_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* Clean diagnostic corners */}
            <div className="absolute top-2 left-3 text-[7px] font-mono text-[#00A3A6] tracking-wider uppercase opacity-80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>BYTE.SYS CHIP // ONLINE</span>
            </div>
            <div className="absolute top-2 right-3 text-[7px] font-mono text-zinc-500 uppercase">
              GRID: AC-7A
            </div>

            {/* Rising Vector bubbles */}
            <div className="absolute bottom-0 left-1/4 w-4 h-full pointer-events-none">
              <div className="aq-bubble-1 absolute bottom-0 left-1 w-2.5 h-2.5 rounded-full border border-teal-500/40" />
            </div>
            <div className="absolute bottom-0 right-1/3 w-4 h-full pointer-events-none">
              <div className="aq-bubble-2 absolute bottom-0 left-2 w-1.5 h-1.5 rounded-full border border-teal-500/30" />
            </div>
            <div className="absolute bottom-0 right-1/4 w-4 h-full pointer-events-none">
              <div className="aq-bubble-3 absolute bottom-0 left-0 w-2 h-2 rounded-full border border-teal-500/50" />
            </div>

            {/* Massive central vector illustration of the cyber-pet (Pure graphic, no surrounding text) */}
            <div className="flex-1 w-full flex items-center justify-center p-2">
              <svg viewBox="0 0 320 180" className="w-full max-w-[280px] h-full">
                
                {/* Circuit background traces */}
                <path d="M 40,30 L 120,30 L 150,60" stroke="#00A3A6" strokeOpacity="0.08" fill="none" strokeWidth="1.5" />
                <path d="M 280,150 L 220,150 L 190,120" stroke="#FF5500" strokeOpacity="0.08" fill="none" strokeWidth="1.5" />
                
                {/* Animated Cyber Fish Struct */}
                <g className="aq-swim" transform="translate(40, 20)">
                  
                  {/* Neon Glow beneath water */}
                  <ellipse cx="110" cy="70" rx="35" ry="12" fill="#00D2FF" fillOpacity="0.05" className="blur-md" />
                  
                  {/* Level 3+: Cool matrix agent glasses background shadow */}
                  {petStats.level >= 3 && (
                    <ellipse cx="65" cy="55" rx="14" ry="4" fill="#000" fillOpacity="0.2" className="blur-xs" />
                  )}

                  {/* Level 4+: Interactive Fire Sparks particles */}
                  {petStats.level >= 4 && (
                    <g transform="translate(130, 25)">
                      <circle cx="2" cy="15" r="2.5" fill="#FF5500" className="animate-ping" />
                      <path d="M 0,20 L -25,40" stroke="#FF5500" strokeWidth="1.5" strokeOpacity="0.3" />
                      <path d="M 12,30 L -12,50" stroke="#FFA500" strokeWidth="1" strokeOpacity="0.4" />
                    </g>
                  )}

                  {/* LEVEL 5 ONLY: King Trident / Glowing Halo symbol behind */}
                  {petStats.level >= 5 && (
                    <g transform="translate(50, 15)" stroke="#FBBF24" fill="none" strokeWidth="1.5" className="animate-pulse">
                      <path d="M 40,0 L 40,15 M 34,4 L 46,4 M 36,9 L 44,9" />
                      <circle cx="40" cy="12" r="16" strokeDasharray="3,3" />
                    </g>
                  )}

                  {/* Fish Body path (Dynamic sizing, thicker for higher levels representing evolution!) */}
                  <path 
                    d={petStats.level >= 5 
                      ? "M 50,70 Q 110,25 180,70 Q 110,115 50,70 Z" // Level 5 thick shark
                      : "M 55,70 C 85,35 145,35 175,70 C 145,105 85,105 55,70 Z"
                    } 
                    fill={petStats.level >= 5 ? "#061314" : petStats.level >= 4 ? "#1C0D05" : "#0D1819"} 
                    stroke={petStats.level >= 4 ? "#FF5500" : "#00A3A6"} 
                    strokeWidth="2.5" 
                  />

                  {/* Highlight dorsal scales */}
                  <path d="M 85,50 Q 115,50 145,55" stroke={petStats.level >= 4 ? "#FFaa66" : "#44e3e6"} strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="2,3" fill="none" />

                  {/* Tail fin (Animated separately using wiggle keyframe) */}
                  <g className="aq-fin" style={{ transformOrigin: "175px 70px" }}>
                    <path 
                      d="M 175,70 L 210,35 L 202,70 L 210,105 Z" 
                      fill={petStats.level >= 4 ? "#501A02" : "#082526"} 
                      stroke={petStats.level >= 4 ? "#FF5500" : "#00A3A6"} 
                      strokeWidth="2" 
                    />
                    <path d="M 183,70 L 202,50 M 183,70 L 202,90" stroke={petStats.level >= 4 ? "#FF5500" : "#44e3e6"} strokeWidth="1" strokeOpacity="0.5" />
                  </g>

                  {/* Pectoral Fin */}
                  <path d="M 95,78 Q 110,95 105,100 Q 98,90 95,78" fill="#113334" stroke={petStats.level >= 4 ? "#FF5500" : "#00A3A6"} strokeWidth="1.5" />

                  {/* Eyes (glowing cyan / sharp orange for Level 4) */}
                  <circle 
                    cx="80" 
                    cy="60" 
                    r={petStats.level >= 5 ? "4" : "3.5"} 
                    fill={petStats.level >= 4 ? "#FF5500" : "#00E5FF"} 
                    className="animate-pulse" 
                  />
                  <circle cx="79" cy="59" r="1" fill="#FAF8F5" />

                  {/* Level 3+: Agent Sunglasses overlay - Minimalistic cyber glasses */}
                  {petStats.level >= 3 && (
                    <g fill="#111" stroke={petStats.level >= 4 ? "#FF5500" : "#00E5FF"} strokeWidth="1">
                      {/* Left lens */}
                      <polygon points="68,54 84,54 81,64 69,64" />
                      {/* Bridge */}
                      <line x1="84" y1="56" x2="87" y2="56" strokeWidth="1.5" />
                      {/* Temple arm */}
                      <line x1="68" y1="54" x2="60" y2="56" />
                    </g>
                  )}

                  {/* Level 5 ONLY: Cute tiny golden detective hat */}
                  {petStats.level >= 5 && (
                    <g fill="#FBBF24" stroke="#D97706" strokeWidth="1" transform="translate(68, 26)">
                      {/* Brim */}
                      <path d="M 0,15 L 24,11 L 22,8 L 1,12 Z" />
                      {/* Crown */}
                      <polygon points="5,12 19,9 17,2 7,4" />
                    </g>
                  )}

                  {/* Happy/neutral bubbles rising from mouth */}
                  <circle cx="50" cy="66" r="1.5" fill="none" stroke="#00A3A6" strokeOpacity="0.5" className="animate-bounce" />
                </g>
              </svg>
            </div>

            {/* Micro-scale slider representing status levels */}
            <div className="flex items-center justify-between border-t border-[#00A3A6]/15 pt-2 text-[8px] font-mono text-zinc-500 uppercase mt-auto">
              <span>WAVEFORM: ACTIVE</span>
              <span className="text-[#00A3A6] font-bold">MUT_STAGE_{petStats.level}</span>
            </div>

          </div>
        </div>

        {/* Simplified Status Diagnostic Telemetry Widget (4 Columns) */}
        <div className="md:col-span-4 bg-[#FAF8F5] border-2 border-[#1D1B18] p-5 text-[#1D1B18] font-mono shadow-[4px_4px_0px_#1D1B18] rounded-lg flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="border-b border-[#1D1B18]/25 pb-2 flex justify-between items-center">
              <span className="text-[10px] font-black tracking-widest text-[#1D1B18]">BYTE_STATUS</span>
              <span className="text-[9px] bg-emerald-500/10 border border-emerald-500 text-emerald-700 px-1.5 py-0.5 font-bold rounded-sm">
                {language === "en" ? "ACTIVE / ALIVE" : "AKTIV / GEFÜHRT"}
              </span>
            </div>

            {/* Quick clean metric metrics grid */}
            <div className="space-y-3">
              <div className="bg-[#FAF8F5] p-2.5 border border-[#1D1B18] flex items-center gap-3">
                <span className="text-3xl filter select-none">
                  {petStats.level >= 5 ? "🦈" : petStats.level >= 3 ? "🐠" : "🐟"}
                </span>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#615C54] block font-bold uppercase leading-none">NAME</span>
                  <span className="text-sm font-black text-[#1D1B18] uppercase tracking-wide leading-none">{petStats.name}</span>
                </div>
              </div>

              {/* Progress: Level */}
              <div className="space-y-1">
                <div className="flex justify-between items-end text-[9px] font-bold text-[#615C54]">
                  <span>{language === "en" ? "PET EVOLUTION LEVEL:" : "PET STUFE:"}</span>
                  <span className="text-[#FF5500] font-black text-xs leading-none">STAGE {petStats.level} / 5</span>
                </div>
                <div className="w-full bg-[#ECE8DF] h-2.5 border border-[#1D1B18] rounded-xs overflow-hidden">
                  <div 
                    className="bg-[#FF5500] h-full transition-all duration-300"
                    style={{ width: `${(petStats.level / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Progress: Mastering (Leitner) */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-end text-[9px] font-bold text-[#615C54]">
                  <span>{language === "en" ? "PATTERNS INTERNALIZED:" : "MUSTER VERINNERLICHT:"}</span>
                  <span className="text-[#00A3A6] font-black text-xs leading-none">{masteredCount} / 12</span>
                </div>
                <div className="w-full bg-[#ECE8DF] h-2.5 border border-[#1D1B18] rounded-xs overflow-hidden">
                  <div 
                    className="bg-[#00A3A6] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (masteredCount / 12) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1D1B18]/15 mt-4 text-left">
            <span className="text-[9px] font-bold text-[#615C54] block uppercase">{language === "en" ? "XP ACCRUED:" : "XP GESAMMELT:"}</span>
            <div className="text-xl font-black font-mono tracking-tight text-[#1D1B18]">
              {petStats.xp} XP
            </div>
            <p className="text-[9.5px] text-[#615C54] font-medium uppercase mt-1 leading-snug font-sans">
              {language === "en" 
                ? "Acquire XP milestones to unlock advanced chapters on the training track!" 
                : "Erreiche Meilensteine, um weitere Kapitel auf dem Lernpfad freizuschalten!"}
            </p>
          </div>

        </div>

      </div>

      {/* GitHub Repository Health & CI/CD Pipeline Monitor Widget */}
      <div className="bg-[#FAF8F5] border-2 border-[#1D1B18] p-5 shadow-[4px_4px_0px_#1D1B18] rounded-lg space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1D1B18]/15 pb-3">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-black text-[#FF5500] uppercase tracking-widest block">
              🔧 VERIFY_CONTROL // INTEGRATION & QUALITY
            </span>
            <h4 className="text-sm font-black text-[#1D1B18] uppercase tracking-wide">
              {labels.integrateTitle}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-[#1D1B18]/70 bg-[#ECE8DF] border border-[#1D1B18]/20 px-2 py-1 rounded-sm">
            <GitBranch className="w-3.5 h-3.5 text-[#1D1B18]" />
            <span className="font-bold">BRANCH: <span className="text-[#FF5500]">main</span></span>
            <span className="text-[#1D1B18]/30">|</span>
            <GitPullRequest className="w-3.5 h-3.5 text-[#1D1B18]" />
            <span className="font-bold">INTEGRITY: <span className="text-[#00A3A6]">SECURE</span></span>
          </div>
        </div>

        {/* Unified Custom Badges Bar */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-zinc-600 font-sans uppercase">
            {language === "en" ? "Unified Repository Certification (CI Badges):" : "Einheitliche Repository-Sicherungsplaketten (CI Badges):"}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {/* CI Pipeline Pass Badge */}
            <span className="inline-flex text-[9px] font-mono border border-[#00A3A6] rounded-xs overflow-hidden shadow-[1px_1px_0px_#1D1B18]">
              <span className="bg-[#1D1B18] text-[#FAF8F5] px-2 py-0.5 font-bold uppercase tracking-wider">CI_Pipeline</span>
              <span className="bg-[#00A3A6] text-[#FAF8F5] px-2 py-0.5 font-black uppercase tracking-wider">Passing</span>
            </span>

            {/* TypeScript Strict Check Badge */}
            <span className="inline-flex text-[9px] font-mono border border-cyan-500 rounded-xs overflow-hidden shadow-[1px_1px_0px_#1D1B18]">
              <span className="bg-[#1D1B18] text-[#FAF8F5] px-2 py-0.5 font-bold uppercase tracking-wider">TypeScript</span>
              <span className="bg-[#00E5FF] text-black px-2 py-0.5 font-black uppercase tracking-wider">Strict Check</span>
            </span>

            {/* Unit Tests Passing Badge */}
            <span className="inline-flex text-[9px] font-mono border border-[#FF5500] rounded-xs overflow-hidden shadow-[1px_1px_0px_#1D1B18]">
              <span className="bg-[#1D1B18] text-[#FAF8F5] px-2 py-0.5 font-bold uppercase tracking-wider">Tests</span>
              <span className="bg-[#FF5500] text-[#FAF8F5] px-2 py-0.5 font-black uppercase tracking-wider">Vitest Passing</span>
            </span>

            {/* Platform Engine Badge */}
            <span className="inline-flex text-[9px] font-mono border border-emerald-500 rounded-xs overflow-hidden shadow-[1px_1px_0px_#1D1B18]">
              <span className="bg-[#1D1B18] text-[#FAF8F5] px-2 py-0.5 font-bold uppercase tracking-wider">Engine</span>
              <span className="bg-emerald-600 text-[#FAF8F5] px-2 py-0.5 font-black uppercase tracking-wider">Node v20/v22</span>
            </span>

            {/* License Badge */}
            <span className="inline-flex text-[9px] font-mono border border-zinc-700 rounded-xs overflow-hidden shadow-[1px_1px_0px_#1D1B18]">
              <span className="bg-[#1D1B18] text-[#FAF8F5] px-2 py-0.5 font-bold uppercase tracking-wider">License</span>
              <span className="bg-zinc-600 text-[#FAF8F5] px-2 py-0.5 font-black uppercase tracking-wider">MIT License</span>
            </span>
          </div>
        </div>

        {/* Dashboard Live Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[11px] text-[#615C54] font-sans leading-relaxed uppercase font-medium">
              {labels.localBuild}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={runLocalPipeline}
                disabled={pipelineState === "running"}
                className={`flex items-center gap-2 text-[10px] uppercase font-mono font-black tracking-wider px-3.5 py-2.5 border-2 border-[#1D1B18] transition-all rounded-md ${
                  pipelineState === "running"
                    ? "bg-[#ECE8DF] text-zinc-400 cursor-not-allowed"
                    : "bg-[#FF5500] text-white hover:bg-[#ff6a1a] shadow-[2px_2px_0px_#1D1B18] hover:shadow-[1px_1px_0px_#1D1B18] active:translate-x-0.5 active:translate-y-0.5"
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${pipelineState === "running" ? "animate-spin" : ""}`} />
                {pipelineState === "running" ? labels.pipelineRunning : labels.runPipelineBtn}
              </button>

              {pipelineState !== "idle" && (
                <button
                  onClick={() => {
                    setPipelineState("idle");
                    setActiveLogStep(0);
                    setExpandedLogs(false);
                  }}
                  className="text-[9px] uppercase font-mono font-bold px-3 py-2 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-all rounded-md"
                >
                  {labels.resetPipeline}
                </button>
              )}
            </div>

            {/* Internal Github repo connection info */}
            <div className="text-[9.5px] font-mono text-zinc-600 bg-[#ECE8DF]/40 p-2.5 border border-[#1D1B18]/15 rounded-md">
              <span className="font-bold text-zinc-700 block uppercase mb-1">💡 GitHub-Repo Best Practice</span>
              {language === "en" ? (
                <span>The real pipeline safety configuration is declared in: <code className="bg-[#ECE8DF] px-1 py-0.5 text-zinc-850 rounded-xs font-bold font-mono">.github/workflows/ci.yml</code>. Your open-source license lives in <code className="bg-[#ECE8DF] px-1 py-0.5 text-zinc-850 rounded-xs font-bold font-mono">/LICENSE</code>.</span>
              ) : (
                <span>Die reale Pipeline-Sicherung ist konfiguriert unter: <code className="bg-[#ECE8DF] px-1 py-0.5 text-zinc-850 rounded-xs font-bold font-mono">.github/workflows/ci.yml</code>. Deine Open-Source-Lizenz liegt in <code className="bg-[#ECE8DF] px-1 py-0.5 text-zinc-850 rounded-xs font-bold font-mono">/LICENSE</code>.</span>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            {/* Terminal Panel */}
            <div className="bg-[#151311] border border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-300 space-y-3 relative overflow-hidden shadow-inner">
              <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                <span className="text-[10px] text-[#00A3A6] font-bold tracking-widest uppercase">
                  🤖 BYTE_CI_RUNNER // PIPELINE_OUTPUT
                </span>
                <span className="text-[9px] text-zinc-500 uppercase">
                  {pipelineState === "idle" ? (language === "en" ? "READY FOR CHECK" : "Bereit zum Scannen") : pipelineState === "running" ? (language === "en" ? "STATE: IN PROGRESS..." : "Zustand: Analysiert...") : "Status: SUCCESS ✅"}
                </span>
              </div>

              {pipelineState === "idle" ? (
                <div className="h-36 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2 py-4">
                  <Terminal className="w-8 h-8 text-zinc-600 stroke-[1.5]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 select-none">
                    {labels.terminalReady}
                  </span>
                </div>
              ) : (
                <div className="space-y-2 h-36 overflow-y-auto text-left py-1 text-[10px] leading-relaxed">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 animate-pulse">●</span>
                    <span className="text-zinc-500">[0.0s]</span>
                    <span className="font-bold text-white uppercase">{language === "en" ? "INITIALIZE CI CONTAINER..." : "Initialisiere CI Container..."}</span>
                  </div>

                  {activeLogStep >= 1 && (
                    <div className="flex items-center gap-2">
                      <span className={activeLogStep > 1 ? "text-emerald-500" : "text-amber-500 animate-pulse"}>
                        {activeLogStep > 1 ? "✓" : "●"}
                      </span>
                      <span className="text-zinc-500">[0.8s]</span>
                      <span className={activeLogStep === 1 ? "text-amber-300 font-bold" : "text-zinc-300"}>
                        TypeScript check (tsc --noEmit)...
                      </span>
                      {activeLogStep > 1 && <span className="text-[#00E5FF] font-black">STRICT_TYPES_OK</span>}
                    </div>
                  )}

                  {activeLogStep >= 2 && (
                    <div className="flex items-center gap-2 font-mono">
                      <span className={activeLogStep > 2 ? "text-emerald-500" : "text-amber-500 animate-pulse"}>
                        {activeLogStep > 2 ? "✓" : "●"}
                      </span>
                      <span className="text-zinc-500">[1.9s]</span>
                      <span className={activeLogStep === 2 ? "text-amber-300 font-bold" : "text-zinc-300"}>
                        {language === "en" ? "Executing Vitest Suite (passwordStrength.test.ts)..." : "Führe Vitest Suite (passwordStrength.test.ts) aus..."}
                      </span>
                      {activeLogStep > 2 && <span className="text-[#00A3A6] font-black">4_TESTS_PASSED 🧪</span>}
                    </div>
                  )}

                  {activeLogStep >= 3 && (
                    <div className="flex items-center gap-2">
                      <span className={activeLogStep > 3 ? "text-emerald-500" : "text-amber-500 animate-pulse"}>
                        {activeLogStep > 3 ? "✓" : "●"}
                      </span>
                      <span className="text-zinc-500">[3.2s]</span>
                      <span className={activeLogStep === 3 ? "text-amber-300 font-bold" : "text-zinc-300"}>
                        {language === "en" ? "Validating Vite React production bundles..." : "Validiere Vite React + Express Production Bundels..."}
                      </span>
                      {activeLogStep > 3 && <span className="text-amber-400 font-bold">BUNDLE_CREATED (dist/)</span>}
                    </div>
                  )}

                  {activeLogStep >= 4 && (
                    <div className="mt-3 p-2 bg-emerald-950/45 border border-emerald-500/25 rounded-md text-emerald-400 animate-fade-in flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <div>
                        <span className="font-black block uppercase text-[10px] tracking-wider leading-none">
                          {labels.terminalSuccess}
                        </span>
                        <span className="text-[9px] block text-emerald-300 font-bold mt-1.5 leading-none font-sans">
                          {labels.terminalDesc}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Progress bar matching step */}
              {pipelineState === "running" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00A3A6] to-[#00E5FF] transition-all duration-300" 
                    style={{ width: `${(activeLogStep / 4) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guided Path Header */}
      <div className="flex items-center justify-between border-b border-[#1D1B18] pb-3 text-left">
        <div>
          <h3 className="text-base font-black uppercase text-[#1D1B18] font-sans">
            {labels.dashboardMilestoneTitle}
          </h3>
          <p className="text-[11px] text-[#615C54] font-mono font-medium uppercase mt-0.5">
            {labels.dashboardMilestoneDesc}
          </p>
        </div>
        <div className="text-[9px] font-mono bg-white border border-[#1D1B18] px-2 py-0.5 uppercase font-bold text-[#615C54]">
          {petStats.xp} XP {language === "en" ? "TOTAL" : "GESAMMELT"}
        </div>
      </div>

      {/* Duolingo-Styled Visual Node Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {milestones.map((step, idx) => {
          const isLocked = !bypassLocks && petStats.xp < step.requiredXp;

          return (
            <motion.div
              key={step.id}
              whileHover={isLocked ? {} : { y: -4, transition: { duration: 0.15 } }}
              className={`border-2 border-[#1D1B18] p-5 flex flex-col justify-between min-h-[220px] transition group relative overflow-hidden ${
                isLocked 
                  ? "bg-slate-100/70 border-dashed opacity-75 grayscale shadow-none" 
                  : "bg-[#F4F1EA] shadow-[4px_4px_0px_#1D1B18]"
              }`}
            >
              {/* Number or Lock indicator overlay */}
              <div className="absolute top-2 right-3 text-3xl font-black font-sans text-[#1D1B18]/5 group-hover:text-[#FF5500]/10 select-none font-bold transition-colors">
                {isLocked ? "🔒" : `0${idx + 1}`}
              </div>

              <div className="space-y-3.5 relative z-10 text-left">
                {/* Milestone Badge */}
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-mono font-extrabold border px-2 py-0.5 tracking-wider uppercase ${
                    isLocked 
                      ? "bg-slate-200 text-slate-500 border-slate-300" 
                      : step.badgeColor
                  }`}>
                    {isLocked ? (language === "en" ? `LOCKED (STAGE ${step.requiredXp} XP)` : `GESPERRT (AB ${step.requiredXp} XP)`) : step.badge}
                  </span>
                  {!isLocked && (
                    <span className="text-[9px] font-mono text-[#615C54] uppercase font-bold">
                      [ XP +{step.xpReward} ]
                    </span>
                  )}
                </div>

                {/* Info Text */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`p-1 bg-white border border-[#1D1B18] rounded-sm ${isLocked ? "bg-slate-200/50" : ""}`}>
                      {step.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-sm text-[#1D1B18] font-sans group-hover:text-[#FF5500] transition-colors leading-tight">
                        {step.title}
                      </h4>
                      <p className="text-[10px] font-mono text-[#615C54] font-bold uppercase">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#2E2C29] leading-relaxed mt-2.5 font-sans font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Action and local status */}
              <div className="mt-5 pt-3.5 border-t border-[#1D1B18]/10 flex flex-col gap-2 relative z-10 text-left">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#615C54] uppercase font-bold">
                  <span>STATUS:</span>
                  <span className="text-[#1D1B18]">
                    {isLocked ? (language === "en" ? "🔒 LOCKED" : "🔒 NOCH NICHT FREIGESCHALTET") : step.statsText}
                  </span>
                </div>

                {isLocked ? (
                  <div className="w-full bg-slate-200 border border-slate-300 text-neutral-500 text-[10px] font-mono font-bold py-2 text-center flex items-center justify-center gap-1">
                    <span>{language === "en" ? "REQUIRES" : "BENÖTIGT"} {step.requiredXp} XP 🐟</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(step.id)}
                    className="w-full bg-white hover:bg-[#1D1B18] hover:text-[#FAF8F5] text-[#1D1B18] border-2 border-[#1D1B18] py-2 px-3 text-[11px] font-bold font-mono uppercase tracking-wider shadow-[2.5px_2.5px_0px_#1D1B18] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1B18] transition flex items-center justify-center gap-1.5"
                  >
                    <span>{language === "en" ? "START MISSION" : "MISSION STARTEN"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Handbuch Quick-Access Board Widget at the bottom */}
      <div className="bg-[#FAF8F5] border-2 border-dashed border-[#1D1B18]/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <h4 className="text-xs font-black uppercase text-[#1D1B18] font-mono flex items-center gap-1.5">
            <BookOpen className="w-4.5 h-4.5 text-[#1D1B18]" />
            {language === "en" ? "REFERENCE MATERIALS & CYBER HANDBOOK" : "NACHSCHLAGEWERK UND THEORIE-HANDBUCH"}
          </h4>
          <p className="text-xs text-[#615C54] max-w-2xl leading-relaxed font-sans font-normal">
            {language === "en"
              ? "Looking for detailed theoretical explanations of protocols like SPF, DKIM, DMARC, email message headers, or interactive phishing taxonomy? Read comprehensive articles in the handbook."
              : "Du suchst nach tiefergehenden theoretischen Erläuterungen wie SPF, DKIM, DMARC, E-Mail-Köpfen oder Phishing-Kategorisierungen? Im Handbuch findest du detaillierte Artikel."}
          </p>
        </div>
        <button
          onClick={() => onNavigate("handbook")}
          className="bg-[#1D1B18] hover:bg-[#FF5500] text-white border-2 border-[#1D1B18] px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider shrink-0 transition"
        >
          {language === "en" ? "Launch Handbook" : "Handbuch öffnen"}
        </button>
      </div>

    </div>
  );
}
