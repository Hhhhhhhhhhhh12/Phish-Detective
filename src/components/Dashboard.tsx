import React, { useState, useEffect } from "react";
import { Shield, Sparkles, KeyRound, Flame, Terminal, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { translations, Language, getLocalizedGamePacketsPool } from "../utils/i18n";
import { loadPet, loadLeitnerMap, MODULE_UNLOCK_XP } from "../utils/progress";
import { readStoredString, subscribeStorageChanges } from "../utils/storage";

interface DashboardProps {
  onNavigate: (tab: "simulator" | "scanner" | "inspector" | "comics" | "pet" | "password" | "handbook") => void;
  language?: Language;
}

export default function Dashboard({ onNavigate, language = "de" }: DashboardProps) {
  const [petStats, setPetStats] = useState(loadPet);
  const [masteredCount, setMasteredCount] = useState(0);
  const [bypassLocks, setBypassLocks] = useState(() => readStoredString("phish_bypass_locks") === "true");
  const labels = translations[language];
  const packetCount = getLocalizedGamePacketsPool(language).length;

  useEffect(() => {
    const refresh = () => {
      setPetStats(loadPet());
      setBypassLocks(readStoredString("phish_bypass_locks") === "true");
      const map = loadLeitnerMap();
      setMasteredCount(getLocalizedGamePacketsPool(language).filter(packet => (map[packet.text] ?? 0) >= 2).length);
    };
    refresh();
    return subscribeStorageChanges(refresh);
  }, [language]);

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
      subtitle: language === "en" ? "Password examples" : "Kennwort-Beispiele",
      description: language === "en"
        ? "Compare fictional password examples, length and common patterns. The illustration does not estimate cracking time."
        : language === "ch"
        ? "Vergleiche Übungskennwörter, Länge und häufige Muster. Die Illustration berechnet keine Knackzeit."
        : "Vergleiche Übungskennwörter, Länge und häufige Muster. Die Illustration berechnet keine Knackzeit.",
      difficulty: language === "en" ? "Basic" : "Basis",
      icon: <KeyRound className="w-5 h-5 text-emerald-500" />,
      badge: language === "en" ? "HIGHLY RECOMMENDED" : "DRINGEND EMPFOHLEN",
      badgeColor: "bg-emerald-500/15 border-emerald-500 text-emerald-600",
      statsText: language === "en" ? "Pre-unlocked instructions" : "Erklärung vorab freigeschaltet",
    },
    {
      id: "simulator" as const,
      requiredXp: MODULE_UNLOCK_XP.simulator,
      title: language === "en" ? "Email Simulator" : "E-Mail-Simulator",
      subtitle: language === "en" ? "Prepared training inbox" : "Vorbereiteter Übungsposteingang",
      description: language === "en"
        ? "Investigate incoming emails. Which are authentic and which intend to harvest credentials?"
        : language === "ch"
        ? "Untersuche E-Mails. Welche sind echt, welche wollen deine Zugangsdaten abgreifen?"
        : "Untersuche Emails. Welche sind echt, welche wollen deine Zugangsdaten abgreifen?",
      difficulty: language === "en" ? "Medium" : "Mittel",
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      badge: language === "en" ? "CHAPTER 3 (Lock: 80 XP)" : "KAPITEL 3 (Sperre: 80 XP)",
      badgeColor: "bg-blue-500/10 border-blue-400 text-blue-600",
      statsText: language === "en" ? "Scenario simulator active" : "Szenario-Simulator bereit",
    },
    {
      id: "comics" as const,
      requiredXp: MODULE_UNLOCK_XP.comics,
      title: language === "en" ? "Interactive Noir Comics" : "Interactive Noir-Comics",
      subtitle: language === "en" ? "The Clumsy Fish Saga" : "Die chaotische Fisch-Saga",
      description: language === "en"
        ? "Direct 'Phish', the clumsy aquatic hero. Save the corporate infrastructure from algae collapse."
        : language === "ch"
        ? "Steuere 'Phish', den tollpatschigen Helden. Schütze die IT-Welt vor dem Algen-Kollaps."
        : "Steuere 'Phish', den tollpatschigen Helden. Schütze die IT-Welt vor dem Algen-Kollaps.",
      difficulty: language === "en" ? "Advanced" : "Fortgeschritten",
      icon: <BookOpen className="w-5 h-5 text-violet-500" />,
      badge: language === "en" ? "CHAPTER 4 (Lock: 180 XP)" : "KAPITEL 4 (Sperre: 180 XP)",
      badgeColor: "bg-violet-500/10 border-violet-400 text-violet-600",
      statsText: language === "en" ? "2 stories with decision paths" : "2 Geschichten mit Entscheidungen",
    },
    {
      id: "scanner" as const,
      requiredXp: MODULE_UNLOCK_XP.scanner,
      title: language === "en" ? "Example reports" : "Beispielberichte",
      subtitle: language === "en" ? "Fixed training examples" : "Feste Trainingsbeispiele",
      description: language === "en" ? "Explore prepared phishing reports. Live analysis of your own messages is unavailable in this version." : "Untersuche vorbereitete Phishing-Berichte. Eigene Nachrichten können in dieser Version nicht live analysiert werden.",
      difficulty: language === "en" ? "Expert" : "Experte",
      icon: <Terminal className="w-5 h-5 text-[#00A3A6]" />,
      badge: language === "en" ? "CHAPTER 5 (Lock: 280 XP)" : "KAPITEL 5 (Sperre: 280 XP)",
      badgeColor: "bg-[#00A3A6]/10 border-[#00A3A6] text-[#008080]",
      statsText: language === "en" ? "No live AI" : "Ohne Live-KI",
    },
    {
      id: "inspector" as const,
      requiredXp: MODULE_UNLOCK_XP.inspector,
      title: language === "en" ? "URL Inspector" : "URL-Inspector",
      subtitle: language === "en" ? "Deep Link Deconstructor" : "Der Link-Deconstructor",
      description: language === "en"
        ? "Inspect the structure of a URL locally without opening its destination. This does not verify a website’s safety."
        : language === "ch"
        ? "Zerlege eine URL lokal, ohne die Zielseite aufzurufen. Das ist keine Prüfung der Sicherheit einer Website."
        : "Zerlege eine URL lokal, ohne die Zielseite aufzurufen. Das ist keine Prüfung der Sicherheit einer Website.",
      difficulty: language === "en" ? "Expert" : "Experte",
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      badge: language === "en" ? "CHAPTER 6 (Lock: 380 XP)" : "KAPITEL 6 (Sperre: 380 XP)",
      badgeColor: "bg-rose-500/10 border-rose-400 text-rose-600",
      statsText: language === "en" ? "Subdomain detector active" : "Subdomain-Detektor aktiv",
    },
  ];

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
                  <span>{language === "en" ? "TRAINING CARDS CORRECT TWICE:" : "ÜBUNGSKARTEN ZWEIMAL RICHTIG:"}</span>
                  <span className="text-[#00A3A6] font-black text-xs leading-none">{masteredCount} / {packetCount}</span>
                </div>
                <div className="w-full bg-[#ECE8DF] h-2.5 border border-[#1D1B18] rounded-xs overflow-hidden">
                  <div
                    className="bg-[#00A3A6] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (masteredCount / Math.max(1, packetCount)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1D1B18]/15 mt-4 text-left">
            <span className="text-[9px] font-bold text-[#615C54] block uppercase">{language === "en" ? "BYTE TOTAL XP:" : "BYTE GESAMT-XP:"}</span>
            <div className="text-xl font-black font-mono tracking-tight text-[#1D1B18]">
              {petStats.totalXp} XP
            </div>
            <p className="text-[9.5px] text-[#615C54] font-medium uppercase mt-1 leading-snug font-sans">
              {language === "en"
                ? "Byte’s total XP unlock modules permanently across level changes. Simulator and comic points are separate."
                : "Bytes Gesamt-XP schalten Module auch über Levelwechsel hinweg frei. Simulator- und Comicpunkte zählen separat."}
            </p>
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
          {petStats.totalXp} XP {language === "en" ? "TOTAL" : "GESAMMELT"}
        </div>
      </div>

      {/* Duolingo-Styled Visual Node Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {milestones.map((step, idx) => {
          const isLocked = !bypassLocks && petStats.totalXp < step.requiredXp;

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

      <section aria-labelledby="demo-evidence-title" className="bg-[#FAF8F5] border-2 border-[#1D1B18] p-5 space-y-3 text-left">
        <h3 id="demo-evidence-title" className="text-sm font-black text-[#1D1B18]">
          {language === "en" ? "About this training demo" : "Über diese Trainingsdemo"}
        </h3>
        <p className="text-sm text-[#615C54]">
          {language === "en"
            ? "Cases and reports are prepared examples. Points are game feedback, not a measurement of security expertise. For a quick tour, turn on demo mode in the navigation, open a case and read its feedback."
            : "Fälle und Berichte sind vorbereitete Beispiele. Punkte sind Spielrückmeldungen und keine Messung von Sicherheitskompetenz. Für eine kurze Vorführung: Demo-Modus in der Navigation aktivieren, einen Fall öffnen und das Feedback lesen."}
        </p>
        <p className="text-sm text-[#615C54]">
          {language === "en"
            ? "Actual automated check results are available on GitHub. Their status belongs to the commit shown there; this screen does not run tests or certify the current website."
            : "Die tatsächlichen automatisierten Prüfergebnisse stehen auf GitHub. Ihr Status gilt für den dort genannten Commit, also einen bestimmten Code-Stand. Diese Ansicht führt keine Tests aus und zertifiziert die Website nicht."}
        </p>
        <a href="https://github.com/Hhhhhhhhhhhh12/Phish-Detective/actions/workflows/ci.yml" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-[#1D1B18] bg-white px-3 py-2 text-sm font-bold text-[#1D1B18] hover:bg-[#ECE8DF]">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {language === "en" ? "View real checks on GitHub (new tab)" : "Echte Prüfungen auf GitHub ansehen (neuer Tab)"}
        </a>
      </section>

      {/* Handbuch Quick-Access Board Widget at the bottom */}
      <div className="bg-[#FAF8F5] border-2 border-dashed border-[#1D1B18]/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <h4 className="text-xs font-black uppercase text-[#1D1B18] font-mono flex items-center gap-1.5">
            <BookOpen className="w-4.5 h-4.5 text-[#1D1B18]" />
            {language === "en" ? "REFERENCE MATERIALS & CYBER HANDBOOK" : "NACHSCHLAGEWERK UND THEORIE-HANDBUCH"}
          </h4>
          <p className="text-xs text-[#615C54] max-w-2xl leading-relaxed font-sans font-normal">
            {language === "en"
              ? "Read short explanations of sender addresses, URL structure and psychological pressure in the handbook."
              : "Im Handbuch findest du kurze Erklärungen zu Absenderadressen, URL-Aufbau und psychologischem Handlungsdruck."}
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
