import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { PetState } from "./types";

interface RetroStageProps {
  isGaming: boolean;
  gameFeedback: "success" | "fail" | "timeout" | null;
  gameRound: number;
  gameScore: number;
  isGameOver: boolean;
  petVisualOverride: string | null;
  getAvatar: () => string;
  isHot: boolean;
  pet: PetState;
  gamePacket: { text: string; isPhish: boolean; type: string } | null;
  gameTimer: number;
  handleGameAnswer: (answeredPhish: boolean | null) => void;
  language?: string;
  onResetGame: () => void;
}

export default function RetroStage({
  isGaming,
  gameFeedback,
  gameRound,
  gameScore,
  isGameOver,
  petVisualOverride,
  getAvatar,
  isHot,
  pet,
  gamePacket,
  gameTimer,
  handleGameAnswer,
  language = "de",
  onResetGame
}: RetroStageProps) {
  return (
    <div
      className={`w-full ${
        isGaming
          ? gameFeedback === "success"
            ? "bg-[#d1f7ec]/95 border-[#00A3A6]"
            : gameFeedback === "fail"
            ? "bg-[#fed7d7]/95 border-[#FF5500]"
            : gameFeedback === "timeout"
            ? "bg-[#fef3c7]/95 border-[#D48F00]"
            : "bg-[#E0EADA]"
          : "bg-[#E5E1D8]"
      } border-2 border-[#1D1B18] shadow-inner flex flex-col items-center justify-center relative p-5 overflow-hidden min-h-[250px] rounded-lg transition-colors duration-200`}
      id="retro-stage-display"
    >
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
            id="floating-pet-avatar"
          >
            {petVisualOverride || getAvatar()}
          </motion.div>

          {/* Temperature badge style */}
          <div className="z-10 bg-white border border-[#1D1B18] px-3 py-1 flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#1D1B18] text-[9px] font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${isHot ? "bg-[#FF5500] animate-ping" : "bg-[#00A3A6]"}`}></span>
            <span className="text-[#615C54]">{language === "en" ? "MEMORY LEVEL:" : "SPEICHER-DRUCK:"}</span>
            <span className={`font-bold uppercase ${isHot ? "text-[#FF5500]" : "text-[#1D1B18]"}`}>
              {isHot 
                ? (language === "en" ? "EXTREMELY HOT & SECURE" : "EXTREM HEISS & SICHER")
                : (language === "en" ? "MODERATE / STABLE" : "MODERAT / STABIL")}
            </span>
          </div>

          {/* Tiny text speech bubble lookalike */}
          <p className="text-[10px] text-[#615C54] font-mono mt-3 z-10 border-t border-[#1D1B18]/10 pt-2 w-full text-center uppercase tracking-wider">
            {language === "en" ? "LAST ACTION:" : "LETZTE AKTION:"} {pet.lastAction}
          </p>
        </>
      ) : isGameOver ? (
        <div className="text-center space-y-3 z-10 font-mono w-full animate-fade-in p-4" id="game-ended-congrats">
          <div className="text-4xl">🏆</div>
          <h3 className="font-black text-[#1D1B18] text-sm uppercase">
            {language === "en" ? "TRAINING COMPLETE!" : "TRAINING BEENDET!"}
          </h3>
          <p className="text-[11px] text-[#2E2C29] uppercase">
            SCORE: <span className="font-bold text-[#FF5500]">{gameScore} / 500 {language === "en" ? "PTS" : "PKT"}</span>
          </p>
          <p className="text-[9px] text-[#615C54] leading-relaxed max-w-xs mx-auto uppercase">
            {gameScore >= 400 
              ? (language === "en" ? "Absolute Cyber Expert! Your fish is proud of you and swims happily." : "Absoluter Cyber-Experte! Dein Fisch ist stolz auf dich und schwimmt glücklich.")
              : (language === "en" ? "Good training, but keep practicing your speed!" : "Gutes Training, aber übe weiter deine Speicher-Präzision!")}
          </p>
          <button
            onClick={onResetGame}
            className="mt-2 bg-[#1D1B18] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 hover:bg-[#FF5500] transition active:translate-y-0.5"
          >
            {language === "en" ? "[ Diagnostic State ]" : "[ Diagnose-Zustand ]"}
          </button>
        </div>
      ) : (
        <div className="w-full text-center font-mono space-y-4 pt-4 z-10 animate-fade-in" id="active-game-play">
          {gameFeedback === "success" && (
            <div className="space-y-2 py-4">
              <div className="text-5xl animate-bounce">😎</div>
              <div className="bg-[#1D1B18] text-[#00E5A3] font-bold text-xs uppercase py-1 px-3 inline-block">
                {language === "en" ? "+100 PTS // BLOCKED!" : "+100 PKT // GEBLOCKT!"}
              </div>
            </div>
          )}
          {gameFeedback === "fail" && (
            <div className="space-y-2 py-4">
              <div className="text-5xl animate-pulse">⚡💀⚡</div>
              <div className="bg-[#FF5500] text-[#FFFFFF] font-bold text-xs uppercase py-1 px-3 inline-block">
                {language === "en" ? "LEAK! DATA TAMPERED!" : "LEAK! DATENSCHADEN!"}
              </div>
            </div>
          )}
          {gameFeedback === "timeout" && (
            <div className="space-y-2 py-4">
              <div className="text-5xl">😵</div>
              <div className="bg-amber-500 text-white font-bold text-xs uppercase py-1 px-3 inline-block">
                {language === "en" ? "TIMEOUT / LEAK!" : "ZEITABLAUF / LEAK!"}
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
                <span className="text-[9px] text-[#615C54] uppercase">
                  {language === "en" ? "REACTION TIMER:" : "REAKTIONS-TIMER:"}
                </span>
                <div className="flex gap-1 text-[11px] font-black text-[#FF5500]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="transition-all duration-300">
                      {i < gameTimer ? "■" : "□"}
                    </span>
                  ))}
                </div>
                <span className="text-[8px] text-[#615C54] mt-1">
                  {language === "en" ? "[KEYBOARD: S = PHISH // D = SAFE]" : "[KEYBOARD: S = PHISH // D = SAFE]"}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
