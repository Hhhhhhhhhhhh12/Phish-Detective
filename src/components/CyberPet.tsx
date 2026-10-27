import React, { useState, useEffect } from "react";
import { Zap, Heart, Award, Shield, Sparkles, RefreshCw, Cookie, Flame, Play, Terminal, BookOpen } from "lucide-react";
import { PetState, LEVEL_NAMES, EVOLUTION_AVATARS, GAME_PACKETS_POOL } from "./cyberpet/types";
import PetStatsMonitor from "./cyberpet/PetStatsMonitor";
import LeitnerConsole from "./cyberpet/LeitnerConsole";
import RetroStage from "./cyberpet/RetroStage";
import { translations, Language } from "../utils/i18n";

export default function CyberPet({ language = "de" }: { language?: Language }) {
  const [pet, setPet] = useState<PetState>(() => {
    const saved = localStorage.getItem("phish_detective_pet");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return {
      name: "Byte",
      level: 1,
      xp: 15,
      energy: 80,
      happiness: 75,
      passwordDefense: 30,
      lastAction: language === "en" ? "Freshly adopted from cyberspace." : "Gerade aus dem Cyberspace adoptiert."
    };
  });

  const [message, setMessage] = useState("");
  const [customNameInput, setCustomNameInput] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  // --- RETRO MINIGAME STATES WITH LEITNER BOX MEMORY ---
  const [isGaming, setIsGaming] = useState(false);
  const [gameRound, setGameRound] = useState(1);
  const [gameScore, setGameScore] = useState(0);
  const [gamePacket, setGamePacket] = useState<{ text: string; isPhish: boolean; type: string } | null>(null);
  const [gameTimer, setGameTimer] = useState(4);
  const [gameFeedback, setGameFeedback] = useState<"success" | "fail" | "timeout" | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [petVisualOverride, setPetVisualOverride] = useState<string | null>(null);

  const getLeitnerMap = (): Record<string, number> => {
    try {
      const saved = localStorage.getItem("phish_leitner_box");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  };

  const saveLeitnerMap = (map: Record<string, number>) => {
    localStorage.setItem("phish_leitner_box", JSON.stringify(map));
  };

  // Game timer countdown loop
  useEffect(() => {
    if (!isGaming || isGameOver || gameFeedback) return;

    const token = setTimeout(() => {
      if (gameTimer <= 1) {
        handleGameAnswer(null);
      } else {
        setGameTimer((t) => t - 1);
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
      setMessage(language === "en" 
        ? `${pet.name} is too tired for games! Feed them web cookies first (+25 Energy).`
        : `${pet.name} ist zu müde für Spiele! Gib ihm erst Web-Cookies (+25 Energy).`);
      return;
    }

    setIsGaming(true);
    setGameRound(1);
    setGameScore(0);
    setIsGameOver(false);
    setGameFeedback(null);
    setPetVisualOverride(null);

    const leitner = getLeitnerMap();
    let playable = GAME_PACKETS_POOL.filter((p) => (leitner[p.text] || 0) < 2);

    // Auto reset if all are mastered so the game doesn't stall
    if (playable.length === 0) {
      GAME_PACKETS_POOL.forEach((p) => {
        leitner[p.text] = 0;
      });
      saveLeitnerMap(leitner);
      playable = [...GAME_PACKETS_POOL];
    }

    const firstPacket = playable[Math.floor(Math.random() * playable.length)];
    setGamePacket(firstPacket);
    setGameTimer(4);
    setMessage("");
  };

  const handleGameAnswer = (answeredPhish: boolean | null) => {
    if (gameFeedback) return;

    const correct = answeredPhish === null ? false : answeredPhish === gamePacket?.isPhish;

    // Leitner Box update
    const currentText = gamePacket?.text;
    if (currentText) {
      const leitner = getLeitnerMap();
      if (correct) {
        leitner[currentText] = (leitner[currentText] || 0) + 1;
      } else {
        // Reset to 0 if mistake is made (strict Leitner box principle)
        leitner[currentText] = 0;
      }
      saveLeitnerMap(leitner);
    }

    if (answeredPhish === null) {
      setGameFeedback("timeout");
      setPetVisualOverride("😵");
    } else if (correct) {
      setGameFeedback("success");
      setGameScore((prev) => prev + 100);
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

        setPet((prev) => {
          let nextXp = prev.xp + earnedXp;
          let nextLevel = prev.level;
          const xpNeeded = nextLevel * 100;
          let levelUpMsg = "";

          if (nextXp >= xpNeeded) {
            nextLevel = Math.min(5, nextLevel + 1);
            nextXp = nextXp - xpNeeded;
            levelUpMsg = language === "en" 
              ? ` ✨ EVOLUTION TO LEVEL ${nextLevel}!` 
              : ` ✨ EVOLUTION AUF LEVEL ${nextLevel}!`;
          }

          setMessage(language === "en"
            ? `Mini-training complete! +${earnedXp} XP, +${earnedHappiness}% happiness.${levelUpMsg}`
            : `Minitraining beendet! +${earnedXp} XP, +${earnedHappiness}% Zufriedenheit.${levelUpMsg}`);

          return {
            ...prev,
            level: nextLevel,
            xp: nextXp,
            energy: Math.max(0, prev.energy - 15),
            happiness: Math.min(100, prev.happiness + earnedHappiness),
            lastAction: language === "en" 
              ? `Played reflex game with score of ${finalScore}!` 
              : `Reflex-Spiel gespielt mit Score ${finalScore}!`
          };
        });
      } else {
        setGameRound((prev) => prev + 1);

        const leitner = getLeitnerMap();
        let playable = GAME_PACKETS_POOL.filter((p) => (leitner[p.text] || 0) < 2);
        if (playable.length === 0) {
          playable = [...GAME_PACKETS_POOL];
        }

        let nextPacket = playable[Math.floor(Math.random() * playable.length)];
        let safetyCounter = 0;
        while (nextPacket.text === gamePacket?.text && playable.length > 1 && safetyCounter < 10) {
          nextPacket = playable[Math.floor(Math.random() * playable.length)];
          safetyCounter++;
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
    setPet((prev) => {
      let nextXp = prev.xp;
      let nextEnergy = prev.energy;
      let nextHappiness = prev.happiness;
      let nextPass = prev.passwordDefense;
      let actionLog = "";

      switch (type) {
        case "feed":
          if (prev.energy >= 100) {
            setMessage(language === "en" 
              ? `${prev.name} is already completely full!` 
              : `${prev.name} ist bereits kugelrund gegessen!`);
            return prev;
          }
          nextXp += 5;
          nextEnergy = Math.min(100, prev.energy + 25);
          nextHappiness = Math.min(100, prev.happiness + 10);
          actionLog = language === "en" ? "Fed cookie! Crispy payload." : "Mit Cookies gefüttert! Knusprige Daten.";
          setMessage(language === "en"
            ? `Chomp! You fed ${prev.name} delicious web cookies (+25 Energy).`
            : `Mampf! Sie haben ${prev.name} leckere Web-Cookies gefüttert (+25 Energie).`);
          break;
        case "train_sender":
          if (prev.energy < 20) {
            setMessage(language === "en" 
              ? `${prev.name} is too tired to train! Please feed them.` 
              : `${prev.name} ist zu müde für Training! Bitte füttern.`);
            return prev;
          }
          nextXp += 20;
          nextEnergy = Math.max(0, prev.energy - 20);
          nextHappiness = Math.min(100, prev.happiness + 15);
          actionLog = language === "en" ? "Taught sender forensics!" : "Absender-Forensik gelehrt!";
          setMessage(language === "en"
            ? `Successful header training completed! Your Phish detects malicious senders even better now (+20 XP).`
            : `Erfolgreiches Header-Training abgeschlossen! Ihr Phish riecht Phishing-Mails jetzt noch besser (+20 XP).`);
          break;
        case "harden_password":
          if (prev.energy < 15) {
            setMessage(language === "en" 
              ? `${prev.name} is nearly asleep. Provide energy first.` 
              : `${prev.name} schläft fast ein. Geben Sie ihm erst Energie.`);
            return prev;
          }
          nextXp += 15;
          nextEnergy = Math.max(0, prev.energy - 15);
          nextPass = Math.min(100, prev.passwordDefense + 18);
          actionLog = language === "en" ? "Hardened password defense." : "Passwort-Verteidigung trainiert.";
          setMessage(language === "en"
            ? `Shield hardened! ${prev.name} now understands complex passphrases (+18% password strength).`
            : `Schild gehärtet! ${prev.name} beherrscht nun komplexe Phrasen (+18% Passwortstärke).`);
          break;
        case "clean_logs":
          nextHappiness = Math.min(100, prev.happiness + 20);
          nextXp += 10;
          actionLog = language === "en" ? "Cleared system malware logs." : "Malware-Logs bereinigt.";
          setMessage(language === "en"
            ? `System cleared. Cache is purged and ${prev.name} swims happily in dust-free memory.`
            : `System aufgeräumt. Der Cache ist leer und ${prev.name} schwimmt glücklich im staubfreien Speicher.`);
          break;
      }

      // Check level up (every 100 XP)
      let nextLevel = prev.level;
      const xpNeeded = nextLevel * 100;
      if (nextXp >= xpNeeded) {
        nextLevel = Math.min(5, nextLevel + 1);
        nextXp = nextXp - xpNeeded; // carry over
        setMessage(language === "en"
          ? `✨ EVOLUTION! Your Phish reached level ${nextLevel} and gets even sleek and robust!`
          : `✨ EVOLUTION! Ihr Phish hat Level ${nextLevel} erreicht und wird immer heißer und robuster!`);
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
      setPet((prev) => ({ ...prev, name: customNameInput.trim() }));
      setIsRenaming(false);
      setCustomNameInput("");
      setMessage(language === "en" ? "Pet renamed!" : "Haustier umbenannt!");
    }
  };

  const getEvolutionText = () => {
    if (language === "en") {
      const enNames = [
        "Innocent Tadpole",
        "Bait-Phish 🐟",
        "Cyber-Phish with Sunglasses 🕶️🐟",
        "Neon Fire-Phish 🔥🕶️🐟🔥",
        "Supreme Lord-Phish 🔱🦈⚡"
      ];
      return enNames[pet.level - 1] || enNames[0];
    }
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
            {language === "en" 
              ? "TRAIN YOUR AQUATIC SPECIES TO DEFEND DOMAIN SCAMS VIA CRYPTO-PROTOCOLS."
              : "TRAINIEREN SIE IHREN SPEICHER-FISCH PER SPEZIELLEM SICHERHEITS-PROTOKOLL."}
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
                <h3 className="text-base font-black text-[#1D1B18] font-mono uppercase" id="pet-display-name">
                  {pet.name}
                </h3>
                <button
                  onClick={() => setIsRenaming(!isRenaming)}
                  className="text-[10px] text-[#FF5500] hover:underline font-mono uppercase font-bold"
                >
                  {language === "en" ? "[Rename]" : "[Namen ändern]"}
                </button>
              </div>
              <p className="text-[11px] text-[#615C54] font-mono uppercase tracking-wide">
                STATUS: {getEvolutionText()}
              </p>
            </div>

            <div className="bg-white border-2 border-[#1D1B18] px-4 py-1 flex flex-col items-center shadow-[2px_2px_0px_#1D1B18]">
              <span className="text-[9px] uppercase font-mono text-[#615C54] leading-none font-bold">LEVEL</span>
              <span className="text-base font-black text-[#FF5500] font-mono leading-none mt-1">
                {pet.level} / 5
              </span>
            </div>
          </div>

          {/* Rename popup sub-control */}
          {isRenaming && (
            <div className="bg-white p-3 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] mb-4 w-full flex gap-2">
              <input
                type="text"
                value={customNameInput}
                onChange={(e) => setCustomNameInput(e.target.value)}
                placeholder={language === "en" ? "New Name..." : "Neuer Name..."}
                className="bg-[#FAF8F5] border border-[#1D1B18] px-3 py-1.5 text-xs text-[#1D1B18] placeholder-[#615C54]/65 flex-1 outline-hidden font-mono uppercase"
              />
              <button
                onClick={handleRename}
                className="bg-[#1D1B18] hover:bg-[#FF5500] text-white py-1.5 px-3 text-xs font-mono font-bold uppercase transition"
              >
                {language === "en" ? "Save" : "Speichern"}
              </button>
            </div>
          )}

          {/* Large Retro Tamagotchi Pixel-Glass Stage Component */}
          <RetroStage
            isGaming={isGaming}
            gameFeedback={gameFeedback}
            gameRound={gameRound}
            gameScore={gameScore}
            isGameOver={isGameOver}
            petVisualOverride={petVisualOverride}
            getAvatar={getAvatar}
            isHot={isHot}
            pet={pet}
            gamePacket={gamePacket}
            gameTimer={gameTimer}
            handleGameAnswer={handleGameAnswer}
            language={language}
            onResetGame={() => {
              setIsGaming(false);
              setIsGameOver(false);
            }}
          />

          {/* Arcade physical button controllers */}
          {isGaming && !isGameOver && !gameFeedback && (
            <div className="w-full mt-4 grid grid-cols-2 gap-3 animate-fade-in animate-duration-150">
              <button
                onClick={() => handleGameAnswer(true)}
                className="bg-[#FF5500] hover:bg-[#CC4400] text-white border-2 border-[#1D1B18] py-3 text-xs font-black font-mono uppercase tracking-wider shadow-[3px_3px_0px_#1D1B18] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1B18] transition flex flex-col items-center justify-center gap-1"
              >
                <span>🚨 BLOCK / PHISH</span>
                <span className="text-[9px] opacity-90 font-bold">{language === "en" ? "[S KEY]" : "[TASTE S]"}</span>
              </button>
              <button
                onClick={() => handleGameAnswer(false)}
                className="bg-[#008080] hover:bg-[#005A5A] text-white border-2 border-[#1D1B18] py-3 text-xs font-black font-mono uppercase tracking-wider shadow-[3px_3px_0px_#1D1B18] active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1B18] transition flex flex-col items-center justify-center gap-1"
              >
                <span>✅ SAFE / PASS</span>
                <span className="text-[9px] opacity-90 font-bold">{language === "en" ? "[D KEY]" : "[TASTE D]"}</span>
              </button>
            </div>
          )}

          {/* Level Progress Slider */}
          {!isGaming && (
            <div className="w-full mt-5 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#615C54] uppercase font-bold">
                  {language === "en" ? "MEMORY EVOLUTION PROGRESS (XP):" : "SPEICHER-FORT_SCHRITT (XP):"}
                </span>
                <span className="text-[#FF5500] font-black">
                  {pet.xp} / {pet.level * 100} XP
                </span>
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
          {/* Pet Stats Monitor Component */}
          <PetStatsMonitor pet={pet} language={language} />

          {/* Action Hub Panels */}
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-[#1D1B18] border-b-2 border-[#1D1B18] pb-1">
              {language === "en" ? "SYS_OPERATIONS // INTERACTIONS" : "SYS_OPERATIONS // INTERAKTIONEN"}
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
                className={`w-full text-left bg-[#FF5500]/5 hover:bg-[#FF5500]/10 border-2 border-[#1D1B18] p-2.5 flex items-center gap-3 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] shadow-[2px_2px_0px_#1D1B18] ${
                  isGaming ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="p-1.5 bg-[#FF5500] text-white border border-[#1D1B18]">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#FF5500] leading-tight">
                    {language === "en" ? "🕹️ REFLEX REFLECTOR (PLAY)" : "🕹️ REFLEX-REFLEKTOR (SPIELEN)"}
                  </h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">
                    {language === "en" 
                      ? "Costs -15 Energy. Grants extreme XP & happiness!"
                      : "Kostet -15 Energie. Bringt viel XP & Glückseligkeit!"}
                  </p>
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
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">
                    {language === "en" ? "STORE WEB COOKIE" : "COOKIE SPEICHERN"}
                  </h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">
                    {language === "en"
                      ? "Provides +25 Energy for training sessions."
                      : "Gibt +25 Energie für Trainings."}
                  </p>
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
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">
                    {language === "en" ? "TEACH SENDER FORENSICS" : "ABSENDER FORENSIK LEHREN"}
                  </h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">
                    {language === "en"
                      ? "Costs -20 Energy, awards +20 XP."
                      : "Kostet -20 Energie, gibt +20 XP."}
                  </p>
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
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">
                    {language === "en" ? "HARDEN PASSWORD CONTROL" : "PASSWORT-STEUERUNG HÄRTEN"}
                  </h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">
                    {language === "en"
                      ? "Adds +18% password strength."
                      : "Gibt +18% Passwortstärke."}
                  </p>
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
                  <h5 className="text-[11px] font-mono font-black uppercase text-[#1D1B18] leading-tight">
                    {language === "en" ? "PURGE SYSTEM CACHE" : "SYSTEM SPEICHER BEREINIGEN"}
                  </h5>
                  <p className="text-[9px] text-[#615C54] font-mono uppercase mt-0.5">
                    {language === "en"
                      ? "Permanently boosts pet happiness."
                      : "Steigert permanent das Wohlbefinden."}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Leitner Box System status monitor component */}
      <LeitnerConsole
        getLeitnerMap={getLeitnerMap}
        language={language}
        onReset={() => {
          if (window.confirm(language === "en" ? "Do you want to reset all mastered domains inside the card box?" : "Möchtest du die gelernten Domänen im Vokabelkasten zurücksetzen?")) {
            localStorage.removeItem("phish_leitner_box");
            setMessage(language === "en" ? "Flashcard box has been flushed and reset successfully." : "Vokabelkasten wurde geleert und zurückgesetzt.");
          }
        }}
      />
    </div>
  );
}
