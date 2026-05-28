import React, { useState, useEffect } from "react";
import { Zap, Heart, Award, Shield, Sparkles, RefreshCw, Cookie, Flame, Play, Terminal, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PetState {
  name: string;
  level: number;
  xp: number;
  energy: number; // 0 - 100
  happiness: number; // 0 - 100
  passwordDefense: number; // 0 - 100
  lastAction: string;
}

const LEVEL_NAMES = [
  "Unschuldige Kaulquappe",
  "Köder-Phish 🐟",
  "Cyber-Phish mit Sonnenbrille 🕶️🐟",
  "Neon Fire-Phish 🔥🕶️🐟🔥",
  "Supreme Lord-Phish 🔱🦈⚡"
];

const EVOLUTION_AVATARS = [
  "🐟", // Level 1
  "🐠", // Level 2
  "🕶️🐟", // Level 3
  "⚡🔥🐠🔥⚡", // Level 4
  "🔱🦈🕶️🔥" // Level 5
];

export default function CyberPet() {
  const [pet, setPet] = useState<PetState>(() => {
    const saved = localStorage.getItem("phish_detective_pet");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      name: "Byte",
      level: 1,
      xp: 15,
      energy: 80,
      happiness: 75,
      passwordDefense: 30,
      lastAction: "Gerade aus dem Cyberspace adoptiert."
    };
  });

  const [message, setMessage] = useState("");
  const [customNameInput, setCustomNameInput] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  // --- RETRO MINIGAME STATES ---
  const [isGaming, setIsGaming] = useState(false);
  const [gameRound, setGameRound] = useState(1);
  const [gameScore, setGameScore] = useState(0);
  const [gamePacket, setGamePacket] = useState<{ text: string; isPhish: boolean; type: string } | null>(null);
  const [gameTimer, setGameTimer] = useState(4);
  const [gameFeedback, setGameFeedback] = useState<"success" | "fail" | "timeout" | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [petVisualOverride, setPetVisualOverride] = useState<string | null>(null);

  const GAME_PACKETS_POOL = [
    { text: "dhl-sendung-zoll.cn", isPhish: true, type: "LINK_DOMAIN" },
    { text: "paypal.de", isPhish: false, type: "LINK_DOMAIN" },
    { text: "it-security@company-login.info", isPhish: true, type: "SENDENDE_ADRESSE" },
    { text: "service@amazon.de", isPhish: false, type: "SENDENDE_ADRESSE" },
    { text: "microsoft-activation-key.ru", isPhish: true, type: "LINK_DOMAIN" },
    { text: "accounts.google.com", isPhish: false, type: "LINK_DOMAIN" },
    { text: "netflix-abo-gesperrt.click", isPhish: true, type: "LINK_DOMAIN" },
    { text: "postbank-direkt-support.com", isPhish: true, type: "SENDENDE_ADRESSE" },
    { text: "support@postbank.de", isPhish: false, type: "SENDENDE_ADRESSE" },
    { text: "mfa-token-auth.company-login-portal.info", isPhish: true, type: "LINK_DOMAIN" },
    { text: "elster-steuer-rueckzahlung.de.com", isPhish: true, type: "LINK_DOMAIN" },
    { text: "github.com", isPhish: false, type: "LINK_DOMAIN" }
  ];

  // Game timer countdown loop
  useEffect(() => {
    if (!isGaming || isGameOver || gameFeedback) return;
    
    const token = setTimeout(() => {
      if (gameTimer <= 1) {
        handleGameAnswer(null);
      } else {
        setGameTimer(t => t - 1);
      }
    }, 1000);
    
    return () => clearTimeout(token);
  }, [isGaming, isGameOver, gameFeedback, gameTimer]);

  // Game keybindings (S = Sperren/Phish, D = Durchlassen/Safe)
  useEffect(() => {
    if (!isGaming || isGameOver || gameFeedback) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") {
        handleGameAnswer(true);
      } else if (e.key === "d" || e.key === "D") {
        handleGameAnswer(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGaming, isGameOver, gameFeedback, gamePacket]);

  const startMinigame = () => {
    if (pet.energy < 15) {
      setMessage(`${pet.name} ist zu müde für Spiele! Gib ihm erst Web-Cookies (+25 Energy).`);
      return;
    }
    
    setIsGaming(true);
    setGameRound(1);
    setGameScore(0);
    setIsGameOver(false);
    setGameFeedback(null);
    setPetVisualOverride(null);
    
    const firstPacket = GAME_PACKETS_POOL[Math.floor(Math.random() * GAME_PACKETS_POOL.length)];
    setGamePacket(firstPacket);
    setGameTimer(4);
    setMessage("");
  };

  const handleGameAnswer = (answeredPhish: boolean | null) => {
    if (gameFeedback) return;
    
    const correct = answeredPhish === null ? false : answeredPhish === gamePacket?.isPhish;
    
    if (answeredPhish === null) {
      setGameFeedback("timeout");
      setPetVisualOverride("😵");
    } else if (correct) {
      setGameFeedback("success");
      setGameScore(prev => prev + 100);
      setPetVisualOverride("😎");
    } else {
      setGameFeedback("fail");
      setPetVisualOverride("⚡💀⚡");
    }
    
    setTimeout(() => {
      setPetVisualOverride(null);
      setGameFeedback(null);
      
      if (gameRound >= 5) {
        setIsGameOver(true);
        const finalScore = gameScore + (correct ? 100 : 0);
        const earnedXp = Math.floor(finalScore / 10) + 15;
        const earnedHappiness = Math.min(30, 8 + Math.floor(finalScore / 30));
        
        setPet(prev => {
          let nextXp = prev.xp + earnedXp;
          let nextLevel = prev.level;
          const xpNeeded = nextLevel * 100;
          let levelUpMsg = "";
          
          if (nextXp >= xpNeeded) {
            nextLevel = Math.min(5, nextLevel + 1);
            nextXp = nextXp - xpNeeded;
            levelUpMsg = ` ✨ EVOLUTION AUF LEVEL ${nextLevel}!`;
          }
          
          setMessage(`Minitraining beendet! +${earnedXp} XP, +${earnedHappiness}% Zufriedenheit.${levelUpMsg}`);
          
          return {
            ...prev,
            level: nextLevel,
            xp: nextXp,
            energy: Math.max(0, prev.energy - 15),
            happiness: Math.min(100, prev.happiness + earnedHappiness),
            lastAction: `Reflex-Spiel gespielt mit Score ${finalScore}!`
          };
        });
      } else {
        setGameRound(prev => prev + 1);
        let nextPacket = GAME_PACKETS_POOL[Math.floor(Math.random() * GAME_PACKETS_POOL.length)];
        while (nextPacket.text === gamePacket?.text) {
          nextPacket = GAME_PACKETS_POOL[Math.floor(Math.random() * GAME_PACKETS_POOL.length)];
        }
        setGamePacket(nextPacket);
        setGameTimer(4);
      }
    }, 1300);
  };

  useEffect(() => {
    localStorage.setItem("phish_detective_pet", JSON.stringify(pet));
  }, [pet]);

  // Actions
  const handleAction = (type: "feed" | "train_sender" | "harden_password" | "clean_logs") => {
    setPet(prev => {
      let nextXp = prev.xp;
      let nextEnergy = prev.energy;
      let nextHappiness = prev.happiness;
      let nextPass = prev.passwordDefense;
      let actionLog = "";

      switch (type) {
        case "feed":
          if (prev.energy >= 100) {
            setMessage(`${prev.name} ist bereits kugelrund gegessen!`);
            return prev;
          }
          nextXp += 5;
          nextEnergy = Math.min(100, prev.energy + 25);
          nextHappiness = Math.min(100, prev.happiness + 10);
          actionLog = "Mit Cookies gefüttert! Knusprige Daten.";
          setMessage(`Mampf! Sie haben ${prev.name} leckere Web-Cookies gefüttert (+25 Energie).`);
          break;
        case "train_sender":
          if (prev.energy < 20) {
            setMessage(`${prev.name} ist zu müde für Training! Bitte füttern.`);
            return prev;
          }
          nextXp += 20;
          nextEnergy = Math.max(0, prev.energy - 20);
          nextHappiness = Math.min(100, prev.happiness + 15);
          actionLog = "Absender-Forensik gelehrt!";
          setMessage(`Erfolgreiches Header-Training abgeschlossen! Ihr Phish riecht Phishing-Mails jetzt noch besser (+20 XP).`);
          break;
        case "harden_password":
          if (prev.energy < 15) {
            setMessage(`${prev.name} schläft fast ein. Geben Sie ihm erst Energie.`);
            return prev;
          }
          nextXp += 15;
          nextEnergy = Math.max(0, prev.energy - 15);
          nextPass = Math.min(100, prev.passwordDefense + 18);
          actionLog = "Passwort-Verteidigung trainiert.";
          setMessage(`Schild gehärtet! ${prev.name} beherrscht nun komplexe Phrasen (+18% Passwortstärke).`);
          break;
        case "clean_logs":
          nextHappiness = Math.min(100, prev.happiness + 20);
          nextXp += 10;
          actionLog = "Malware-Logs bereinigt.";
          setMessage(`System aufgeräumt. Der Cache ist leer und ${prev.name} schwimmt glücklich im staubfreien Speicher.`);
          break;
      }

      // Check level up (every 100 XP)
      let nextLevel = prev.level;
      const xpNeeded = nextLevel * 100;
      if (nextXp >= xpNeeded) {
        nextLevel = Math.min(5, nextLevel + 1);
        nextXp = nextXp - xpNeeded; // carry over
        setMessage(`✨ EVOLUTION! Ihr Phish hat Level ${nextLevel} erreicht und wird immer heißer und robuster!`);
      }

      return {
        ...prev,
        level: nextLevel,
        xp: nextXp,
        energy: nextEnergy,
        happiness: nextHappiness,
        passwordDefense: nextPass,
        lastAction: actionLog
      };
    });
  };

  const handleRename = () => {
    if (customNameInput.trim()) {
      setPet(prev => ({ ...prev, name: customNameInput.trim() }));
      setIsRenaming(false);
      setCustomNameInput("");
      setMessage(`Haustier umbenannt!`);
    }
  };

  const getEvolutionText = () => {
    return LEVEL_NAMES[pet.level - 1] || LEVEL_NAMES[0];
  };

  const getAvatar = () => {
    return EVOLUTION_AVATARS[pet.level - 1] || EVOLUTION_AVATARS[0];
  };

  const isHot = pet.level >= 3;

  return (
    <div className="space-y-6" id="tamagotchi-panel-root">
      
      {/* Header element */}
      <div className="border-b border-[#1D1B18] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase">
            <Flame className="w-5 h-5 text-[#FF5500]" />
            PHISH-O-MAT // CYBER-PET
          </h2>
          <p className="text-xs text-[#615C54] font-mono mt-1">
            TRAINIEREN SIE IHREN SPEICHER-FISCH PER SPEZIELLEM SICHERHEITS-PROTOKOLL.
          </p>
        </div>
        <div className="font-mono text-[10px] bg-[#ECE8DF] border border-[#1D1B18] px-3 py-1 flex items-center gap-1.5 self-start">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
          <span>UNIT_ID: PM-42</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Tamagotchi screen monitor (7 cols) */}
        <div className="lg:col-span-7 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-6 relative flex flex-col items-center">
          
          {/* Top Pet Status header */}
          <div className="w-full flex justify-between items-center mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#1D1B18] font-mono uppercase" id="pet-display-name">{pet.name}</h3>
                <button 
                  onClick={() => setIsRenaming(!isRenaming)}
                  className="text-[10px] text-[#FF5500] hover:underline font-mono uppercase font-bold"
                >
                  [Namen ändern]
                </button>
              </div>
              <p className="text-[11px] text-[#615C54] font-mono uppercase tracking-wide">STATUS: {getEvolutionText()}</p>
            </div>

            <div className="bg-white border-2 border-[#1D1B18] px-4 py-1 flex flex-col items-center shadow-[2px_2px_0px_#1D1B18]">
              <span className="text-[9px] uppercase font-mono text-[#615C54] leading-none font-bold">LEVEL</span>
              <span className="text-base font-black text-[#FF5500] font-mono leading-none mt-1">{pet.level} / 5</span>
            </div>
          </div>

          {/* Rename popup sub-control */}
          {isRenaming && (
            <div className="bg-white p-3 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] mb-4 w-full flex gap-2">
              <input 
                type="text" 
                value={customNameInput}
                onChange={(e) => setCustomNameInput(e.target.value)}
                placeholder="Neuer Name..."
                className="bg-[#FAF8F5] border border-[#1D1B18] px-3 py-1.5 text-xs text-[#1D1B18] placeholder-[#615C54]/65 flex-1 outline-hidden font-mono uppercase"
              />
              <button 
                onClick={handleRename}
                className="bg-[#1D1B18] hover:bg-[#FF5500] text-white py-1.5 px-3 text-xs font-mono font-bold uppercase transition"
              >
                Speichern
              </button>
            </div>
          )}

          {/* Large Retro Tamagotchi Pixel-Glass Stage */}
          <div className={`w-full ${isGaming ? (gameFeedback === "success" ? "bg-[#d1f7ec]/95 border-[#00A3A6]" : gameFeedback === "fail" ? "bg-[#fed7d7]/95 border-[#FF5500]" : gameFeedback === "timeout" ? "bg-[#fef3c7]/95 border-[#D48F00]" : "bg-[#E0EADA]") : "bg-[#E5E1D8]"} border-2 border-[#1D1B18] shadow-inner flex flex-col items-center justify-center relative p-5 overflow-hidden min-h-[250px] rounded-lg transition-colors duration-200`}>
            
            {/* Subtle retro hardware details */}
            <div className="absolute top-2 left-3 text-[8px] font-mono text-[#615C54] tracking-widest uppercase">
              {isGaming ? `GAME-MATRIX // SCREEN ${gameRound}/5` : "LCD MATRIX // SYSTEM-V1"}
            </div>
            <div className="absolute top-2 right-3 text-[8px] font-mono text-[#1D1B18] border border-[#1D1B18] px-1 font-bold">
              {isGaming ? `SCORE: ${gameScore}` : "128-PX"}
            </div>

            {!isGaming ? (
              <>
                {/* Glowing active Pet Avatar with micro-animations */}
                <motion.div 
                  animate={{ 
                    y: [0, -8, 0], 
                    scale: isHot ? [1, 1.04, 1] : 1 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: isHot ? 2 : 3.5,
                    ease: "easeInOut" 
                  }}
                  className="text-7xl md:text-8xl select-none mb-3 z-10 filter drop-shadow-[5px_5px_0px_rgba(29,27,24,0.15)]"
                >
                  {petVisualOverride || getAvatar()}
                </motion.div>

                {/* Temperature badge style */}
                <div className="z-10 bg-white border border-[#1D1B18] px-3 py-1 flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#1D1B18] text-[9px] font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${isHot ? "bg-[#FF5500] animate-ping" : "bg-[#00A3A6]"}`}></span>
                  <span className="text-[#615C54]">SPEICHER-DRUCK:</span>
                  <span className={`font-bold uppercase ${isHot ? "text-[#FF5500]" : "text-[#1D1B18]"}`}>
                    {isHot ? "EXTREM HEISS & SICHER" : "MODERAT / STABIL"}
                  </span>
                </div>

                {/* Tiny text speech bubble lookalike */}
                <p className="text-[10px] text-[#615C54] font-mono mt-3 z-10 border-t border-[#1D1B18]/10 pt-2 w-full text-center uppercase tracking-wider">
                  LETZTE AKTION: {pet.lastAction}
                </p>
              </>
            ) : isGameOver ? (
              <div className="text-center space-y-3 z-10 font-mono w-full animate-fade-in p-4">
                <div className="text-4xl">🏆</div>
                <h3 className="font-black text-[#1D1B18] text-sm uppercase">TRAINING BEENDET!</h3>
                <p className="text-[11px] text-[#2E2C29] uppercase">SCORE: <span className="font-bold text-[#FF5500]">{gameScore} / 500 PKT</span></p>
                <p className="text-[9px] text-[#615C54] leading-relaxed max-w-xs mx-auto uppercase">
                  {gameScore >= 400 ? "Absoluter Cyber-Experte! Dein Fisch ist stolz auf dich und schwimmt glücklich." : "Gutes Training, aber übe weiter deine Speicher-Präzision!"}
                </p>
                <button
                  onClick={() => {
                    setIsGaming(false);
                    setIsGameOver(false);
                  }}
                  className="mt-2 bg-[#1D1B18] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 hover:bg-[#FF5500] transition active:translate-y-0.5"
                >
                  [ Diagnose-Zustand ]
                </button>
              </div>
            ) : (
              <div className="w-full text-center font-mono space-y-4 pt-4 z-10 animate-fade-in">
                {gameFeedback === "success" && (
                  <div className="space-y-2 py-4">
                    <div className="text-5xl animate-bounce">😎</div>
                    <div className="bg-[#1D1B18] text-[#00E5A3] font-bold text-xs uppercase py-1 px-3 inline-block">
                      +100 PKT // GEBLOCKT!
                    </div>
                  </div>
                )}
                {gameFeedback === "fail" && (
                  <div className="space-y-2 py-4">
                    <div className="text-5xl animate-pulse">⚡💀⚡</div>
                    <div className="bg-[#FF5500] text-white font-bold text-xs uppercase py-1 px-3 inline-block">
                      LEAK! DATENSCHADEN!
                    </div>
                  </div>
                )}
                {gameFeedback === "timeout" && (
                  <div className="space-y-2 py-4">
                    <div className="text-5xl">😵</div>
                    <div className="bg-amber-500 text-white font-bold text-xs uppercase py-1 px-3 inline-block">
                      ZEITABLAUF / LEAK!
                    </div>
                  </div>
                )}

                {!gameFeedback && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#554F47] uppercase tracking-wider font-bold">PROMPT: [{gamePacket?.type}]</span>
                      <div className="bg-white border-2 border-[#1D1B18] p-3 text-xs md:text-sm font-black text-[#1D1B18] break-all select-all shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                        {gamePacket?.text}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-[#615C54] uppercase">REAKTIONS-TIMER:</span>
                      <div className="flex gap-1 text-[11px] font-black text-[#FF5500]">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <span key={i} className="transition-all duration-300">
                            {i < gameTimer ? "■" : "□"}
                          </span>
                        ))}
                      </div>
                      <span className="text-[8px] text-[#615C54] mt-1">[KEYBOARD: S = PHISH // D = SAFE]</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Arcade physical button controllers */}
          {isGaming && !isGameOver && !gameFeedback && (
            <div className="w-full mt-4 grid grid-cols-2 gap-3 animate-fade-in">
              <button
                onClick={() => handleGameAnswer(true)}
                className="bg-[#FF5500] hover:bg-[#CC4400] text-white border-2 border-[#1D1B18] py-3 text-xs font-black font-mono uppercase tracking-wider shadow-[3px_3px_0px_#1D1B18] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1B18] transition flex flex-col items-center justify-center gap-1"
              >
                <span>🚨 BLOCK / PHISH</span>
                <span className="text-[9px] opacity-90 font-bold">[TASTE S]</span>
              </button>
              <button
                onClick={() => handleGameAnswer(false)}
                className="bg-[#008080] hover:bg-[#005A5A] text-white border-2 border-[#1D1B18] py-3 text-xs font-black font-mono uppercase tracking-wider shadow-[3px_3px_0px_#1D1B18] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1B18] transition flex flex-col items-center justify-center gap-1"
              >
                <span>✅ SAFE / PASS</span>
                <span className="text-[9px] opacity-90 font-bold">[TASTE D]</span>
              </button>
            </div>
          )}

          {/* Level Progress Slider */}
          {!isGaming && (
            <div className="w-full mt-5 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#615C54] uppercase font-bold">SPEICHER-FORT_SCHRITT (XP):</span>
                <span className="text-[#FF5500] font-black">{pet.xp} / {pet.level * 100} XP</span>
              </div>
              <div className="w-full bg-[#ECE8DF] h-3 border-2 border-[#1D1B18]">
                <div 
                  className="bg-[#FF5500] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (pet.xp / (pet.level * 100)) * 100)}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Right column: Training Controls & Stats gauges (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Pet Stats Monitor */}
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-[#1D1B18] border-b-2 border-[#1D1B18] pb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#00A3A6]" />
              SPEZIFIKATION // DIAGNOSE_WERTE
            </h4>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Stat 1: Energy */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1D1B18] flex items-center gap-1 font-mono font-bold uppercase text-[10px]">
                    <Zap className="w-3.5 h-3.5 text-[#FF5500] shrink-0" /> DATEN-AKKU (ENERGY)
                  </span>
                  <span className="font-mono font-black text-[#FF5500]">{pet.energy}%</span>
                </div>
                <div className="bg-[#ECE8DF] border border-[#1D1B18] h-2.5">
                  <div className="bg-[#FF5500] h-full" style={{ width: `${pet.energy}%` }}></div>
                </div>
              </div>

              {/* Stat 2: Happiness */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1D1B18] flex items-center gap-1 font-mono font-bold uppercase text-[10px]">
                    <Heart className="w-3.5 h-3.5 text-[#FF5500] shrink-0" /> ZUFRIEDENHEIT (CORE)
                  </span>
                  <span className="font-mono font-black text-[#1D1B18]">{pet.happiness}%</span>
                </div>
                <div className="bg-[#ECE8DF] border border-[#1D1B18] h-2.5">
                  <div className="bg-[#1D1B18] h-full" style={{ width: `${pet.happiness}%` }}></div>
                </div>
              </div>

              {/* Stat 3: Password Defense Level */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1D1B18] flex items-center gap-1 font-mono font-bold uppercase text-[10px]">
                    <Shield className="w-3.5 h-3.5 text-[#00A3A6] shrink-0" /> ABWEHR-STÄRKE (SECURE)
                  </span>
                  <span className="font-mono font-black text-[#00A3A6]">{pet.passwordDefense}%</span>
                </div>
                <div className="bg-[#ECE8DF] border border-[#1D1B18] h-2.5">
                  <div className="bg-[#00A3A6] h-full" style={{ width: `${pet.passwordDefense}%` }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Hub Panels */}
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-[#1D1B18] border-b-2 border-[#1D1B18] pb-1">
              SYS_OPERATIONS // INTERAKTIONEN
            </h4>

            {message && (
              <div className="bg-white p-3 border border-[#1D1B18] text-[10px] text-[#1D1B18] font-mono leading-relaxed uppercase tracking-wider">
                <span className="text-[#FF5500] font-black">FEEDBACK_INFO &gt;</span> {message}
              </div>
            )}

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              
              <button
                onClick={startMinigame}
                disabled={isGaming}
                className={`w-full text-left bg-[#FF5500]/5 hover:bg-[#FF5500]/10 border-2 border-[#1D1B18] p-2.5 flex items-center gap-3 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] shadow-[2px_2px_0px_#1D1B18] ${isGaming ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="p-1.5 bg-[#FF5500] text-white border border-[#1D1B18]">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#FF5500] leading-tight">🕹️ REFLEX-REFLEKTOR (SPIELEN)</h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">Kostet -15 Energie. Bringt viel XP & Glückseligkeit!</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("feed")}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] p-2.5 flex items-center gap-3 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] shadow-[2px_2px_0px_#1D1B18]"
              >
                <div className="p-1.5 bg-[#FF5500]/10 text-[#FF5500] border border-[#1D1B18]">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">COOKIE SPEICHERN</h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">Gibt +25 Energie für Trainings.</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("train_sender")}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] p-2.5 flex items-center gap-3 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] shadow-[2px_2px_0px_#1D1B18]"
              >
                <div className="p-1.5 bg-[#FF5500]/10 text-[#FF5500] border border-[#1D1B18]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">ABSENDER FORENSIK LEHREN</h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">Kostet -20 Energie, gibt +20 XP.</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("harden_password")}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] p-2.5 flex items-center gap-3 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] shadow-[2px_2px_0px_#1D1B18]"
              >
                <div className="p-1.5 bg-[#00A3A6]/10 text-[#00A3A6] border border-[#1D1B18]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">PASSWORT-STEUERUNG HÄRTEN</h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">Gibt +18% Passwortstärke.</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("clean_logs")}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] p-2.5 flex items-center gap-3 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] shadow-[2px_2px_0px_#1D1B18]"
              >
                <div className="p-1.5 bg-[#1D1B18]/10 text-[#1D1B18] border border-[#1D1B18]">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">SYSTEM SPEICHER BEREINIGEN</h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">Steigert permanent das Wohlbefinden.</p>
                </div>
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
