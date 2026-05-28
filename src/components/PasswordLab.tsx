import React, { useState } from "react";
import { Shield, Sparkles, KeyRound, AlertTriangle, Eye, EyeOff, Check, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

const SYSTEM_WORDS = [
  "Regenschirm", "Kaffeetasse", "Balkontür", "Katzenfell", "Waldspaziergang",
  "Nordsee", "Abenteuer", "Sicherheitsnetz", "Zahnrad", "Lieblingsbuch",
  "Wolkenbruch", "Zirkuszelt", "Abendlicht", "Sonnenschein", "Schlüsselbund"
];

export default function PasswordLab() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [entropyResult, setEntropyResult] = useState<{
    score: number; // 0 to 4
    crackTime: string;
    level: "Schwach" | "Mittel" | "Sehr Stark";
    feedback: string[];
  } | null>(null);

  const [simulatedGuessProgress, setSimulatedGuessProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [tickerText, setTickerText] = useState("Bereit");

  // Multiwords passphrase generator
  const generatePassphrase = () => {
    const shuffled = [...SYSTEM_WORDS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    // Add numbers or separators
    const num = Math.floor(1000 + Math.random() * 9000);
    const result = `${selected.join("-")}-${num}!`;
    setPassword(result);
    evaluatePassword(result);
  };

  const evaluatePassword = (val: string) => {
    if (!val) {
      setEntropyResult(null);
      return;
    }

    const feedbacks: string[] = [];
    let score = 0;

    // Length analysis
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (val.length >= 16) score++;

    // Character variety
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasDigit = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (varietyCount >= 3) score++;

    // Estimate Crack Time (simulated formula based on entropy)
    let crackTime = "Sofort (< 1 Sekunde)";
    let level: "Schwach" | "Mittel" | "Sehr Stark" = "Schwach";

    const totalPossibilities = Math.pow(varietyCount * 20, val.length);

    if (val.length < 6) {
      crackTime = "Unter einer Millisekunde (Sofort)";
      level = "Schwach";
      feedbacks.push("🚨 Zu kurz! Passwörter unter 8 Zeichen werden unmittelbar durch Wörterbuch-Angriffe geknackt.");
    } else if (score <= 1) {
      crackTime = "Wenige Sekunden";
      level = "Schwach";
      feedbacks.push("⚠️ Sehr geringe Zeichenvielfalt. Fügen Sie Großbuchstaben, Zahlen oder Sonderzeichen ein.");
    } else if (score === 2) {
      crackTime = "ca. 5 Minuten bis 1 Tag (Heuristische Suche)";
      level = "Schwach";
      feedbacks.push("⚠️ Mäßige Länge. Für Angreifer-Cluster spielerisch berechenbar.");
    } else if (score === 3) {
      crackTime = "ca. 10 Monate bis 50 Jahre";
      level = "Mittel";
      feedbacks.push("👍 Gute Länge! Um es im Alltag unhackbar zu machen, aktivieren Sie zusätzlich Zwei-Faktor-Authentifizierung (2FA).");
    } else if (score >= 4) {
      crackTime = "Mehrere Jahrtausende (unbezwingbar)";
      level = "Sehr Stark";
      feedbacks.push("✨ Erstklassige Festung! Durch die hohe Länge widersteht dieses Kennwort jedem Brute-Force-Cluster.");
    }

    // Common dangerous patterns
    if (/1234/.test(val) || /qwert/i.test(val) || /pass/i.test(val) || /hallo/i.test(val)) {
      score = Math.max(0, score - 2);
      crackTime = "Sofort (Beliebtes Opfermuster)";
      level = "Schwach";
      feedbacks.push("❌ Enthält triviale Tastaturmuster (wie '1234' oder 'password'). Hacker-Wörterbücher prüfen diese zuerst!");
    }

    setEntropyResult({
      score,
      crackTime,
      level,
      feedback: feedbacks
    });
  };

  const handleRunSimulation = () => {
    if (!password) return;
    setIsSimulating(true);
    setSimulatedGuessProgress(0);
    setTickerText("Hacker-Cluster bootet...");

    let steps = 0;
    const interval = setInterval(() => {
      steps += 8;
      setSimulatedGuessProgress(prev => Math.min(100, prev + 12));
      
      // Random garbage characters mimicking brute-forcing
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
      let mockWord = "";
      for (let i = 0; i < Math.min(16, password.length); i++) {
        mockWord += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setTickerText(`Prüfe Kombinationen: ${mockWord}`);

      if (steps >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulatedGuessProgress(100);
        
        if (entropyResult && entropyResult.level === "Sehr Stark") {
          setTickerText("💥 Timeout! Angreifer bricht nach Billionen Fehlversuchen erschöpft ab.");
        } else {
          setTickerText("🔓 Geknackt! Passwort kompromittiert.");
        }
      }
    }, 120);
  };

  return (
    <div className="space-y-6" id="password-lab-root">
      
      {/* Header Info */}
      <div className="border-b border-[#1D1B18] pb-5">
        <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase">
          <KeyRound className="w-5 h-5 text-[#FF5500]" />
          KENNWORT-STÄRKEMESSER // SECURE-KEY LAB
        </h2>
        <p className="text-xs text-[#615C54] font-mono mt-1">
          ANALYSATOR FÜR DRUCKFESTIGKEIT UND ENTROPIE-DIAGNOSTIK BEI DEZENTRALER VERTEIDIGUNG.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Input & Evaluation section (7 cols) */}
        <div className="lg:col-span-7 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
          <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b-2 border-[#1D1B18] pb-2">
            🔑 CHASSIS_WERTE // KENN_WORT DIAGNOSTIK
          </h3>

          <div className="space-y-3">
            <label className="text-[10px] font-mono text-[#615C54] uppercase block font-bold">Kennwort oder Token eingeben</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  evaluatePassword(e.target.value);
                }}
                placeholder="z.B. Mein-Sicheres-Lieblings-Wetter-2026!"
                className="w-full bg-white border-2 border-[#1D1B18] pl-4 pr-12 py-3.5 text-sm text-[#1D1B18] placeholder-[#615C54]/40 outline-none focus:bg-[#FAF8F5] shadow-inner font-mono rounded-none"
                id="password-input-field"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-4 text-[#1D1B18] hover:text-[#FF5500]"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Quick Generator Shortcut Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={generatePassphrase}
              className="bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-bold py-2.5 px-4 rounded-none text-xs transition flex items-center gap-1.5 shadow-[2px_2px_0px_#1D1B18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
              SATZPASS-WORT WÜRFELN (XKCD)
            </button>

            <button
              onClick={() => {
                setPassword("");
                setEntropyResult(null);
                setSimulatedGuessProgress(0);
                setTickerText("Bereit");
              }}
              className="bg-[#ECE8DF] border-2 border-[#1D1B18] py-2.5 px-4 rounded-none text-xs font-mono font-bold text-[#1D1B18] hover:bg-[#DCD8CF] transition"
            >
              ABSÄUBERN
            </button>
          </div>

          {entropyResult && (
            <div className="pt-4 space-y-4 border-t-2 border-[#1D1B18]">
              
              {/* Security Shield badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#615C54] uppercase font-bold">Sicherheits-Standard:</span>
                <span className={`text-[10px] uppercase font-mono px-3 py-1 rounded-none border-2 font-black ${
                  entropyResult.level === "Sehr Stark" 
                    ? "bg-[#00A3A6]/10 border-[#00A3A6] text-[#00A3A6]"
                    : entropyResult.level === "Mittel"
                    ? "bg-[#1D1B18]/10 border-[#1D1B18] text-[#1D1B18]"
                    : "bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500]"
                }`}>
                  {entropyResult.level}
                </span>
              </div>

              {/* Time estimation visual display */}
              <div className="p-4 bg-white border-2 border-[#1D1B18] shadow-[3px_3px_0px_#1D1B18] space-y-1">
                <span className="text-[9px] font-mono text-[#615C54] block uppercase font-bold">Rechnerische Brute-Force-Knackzeit:</span>
                <span className={`text-lg font-black block uppercase font-mono ${
                  entropyResult.level === "Sehr Stark" ? "text-[#00A3A6]" : "text-[#FF5500]"
                }`} id="crack-time-display">
                  {entropyResult.crackTime}
                </span>
                <p className="text-[10px] text-[#615C54] font-mono leading-relaxed mt-1 uppercase">
                  BASIEREND AUF DER ANNAHME, DASS EIN GENERISCHES BOTNET BILLIARDEN SCHLÜSSELPRÜFUNGEN PRO SEKUNDE AUSFÜHRT.
                </p>
              </div>

              {/* Feedback guidelines */}
              {entropyResult.feedback.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono font-black text-[#1D1B18] uppercase block">SYS_EXPERTEN ANALYSE:</span>
                  {entropyResult.feedback.map((fb, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-xs text-[#1D1B18] bg-white border border-[#1D1B18] p-3 rounded-none shadow-[1.5px_1.5px_0px_#1D1B18]">
                      <AlertCircle className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <p className="font-sans leading-relaxed">{fb}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right column: Crack/Hacker simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Visual Crack Animation card */}
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2">
              👾 BOTNET-ANGREIFER SIMULATION
            </h3>
            <p className="text-xs text-[#615C54] leading-normal font-mono uppercase text-[11px]">
              PRÜFEN SIE LIVE, OB COMPUTER-CLUSTER DAGEGEN EINE EXTREME CHANCE HÄTTEN. STARTEN SIE DEN ANGRIFFS-ZYKLUS.
            </p>

            <div className="bg-[#E5E1D8] p-4 border-2 border-[#1D1B18] font-mono text-xs space-y-3 rounded-none shadow-inner">
              <div className="flex justify-between text-[#615C54] font-black border-b border-[#1D1B18]/20 pb-1.5">
                <span>TASK: BRUTE_FORCE</span>
                <span className="animate-pulse text-[#FF5500]">ACTIVE_STAGES</span>
              </div>
              
              <div className="text-[#1D1B18] min-h-[38px] bg-white/60 p-2 border border-[#1D1B18] text-wrap select-all font-mono text-[10px] uppercase font-bold">
                {tickerText}
              </div>

              {/* Bar progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#615C54] font-black uppercase">
                  <span>Such-Fortschritt</span>
                  <span>{simulatedGuessProgress}%</span>
                </div>
                <div className="bg-white border border-[#1D1B18] h-3">
                  <div 
                    className="bg-[#1D1B18] h-full"
                    style={{ width: `${simulatedGuessProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={!password || isSimulating}
              className="w-full bg-[#1D1B18] hover:bg-[#FF5500] text-white disabled:opacity-40 py-2.5 px-4 rounded-none text-xs font-mono font-bold uppercase transition flex items-center justify-center gap-2 shadow-[2px_2px_0px_#1D1B18]"
            >
              <RefreshCw className={`w-4 h-4 text-white ${isSimulating ? "animate-spin" : ""}`} />
              Angriff starten
            </button>
          </div>

          {/* Secure Rules Tips */}
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-3.5">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-1">
              💡 DIE GOLDENE PROTOKOLL-REGEL
            </h3>
            
            <div className="text-xs text-[#1D1B18] space-y-3 font-sans leading-relaxed">
              <p>
                1. <strong>Länge schlägt Wirrwarr</strong>: Ein glattes langes Wort-Gebilde wie <span className="font-mono text-xs font-bold text-[#FF5500] bg-white border border-[#1D1B18] px-1 py-0.5 whitespace-nowrap">schmetterling-kuchen-tür-wind</span> ist milliardenfach stärker gegen Hacker-Cluster als unmerkbare, extreme Zeichen-Puzzles wie <span className="font-mono text-xs text-[#1D1B18] bg-white border border-[#1D1B18] px-1 py-0.5 whitespace-nowrap">H@9&amp;!</span>.
              </p>
              <p>
                2. <strong>Keine Wiederverwendung</strong>: Wenn dasselbe Passwort an mehreren Orten eingetragen wird, reicht ein einziges gehacktes Miniforum, um all Ihre Hauptkonten sofort zu kompromittieren.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
