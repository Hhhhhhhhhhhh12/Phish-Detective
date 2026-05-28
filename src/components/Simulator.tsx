import React, { useState, useEffect } from "react";
import { defaultCases } from "../cases";
import { SimulationCase, DetectiveProfile } from "../types";
import { 
  ShieldAlert, ShieldCheck, Award, Zap, RefreshCw, Sparkles, Check, ChevronRight, Compass,
  AlertTriangle, Play, Target, Brain
} from "lucide-react";

const RANKS = [
  { minXp: 0, title: "Anfänger-Detektiv (Kadett)" },
  { minXp: 100, title: "Sicherheits-Agent (Ermittler)" },
  { minXp: 250, title: "Phishing-Fahnder (Inspektor)" },
  { minXp: 550, title: "Cyber-Forensiker (Kommissar)" },
  { minXp: 1000, title: "Sicherheits-Meisterdetektiv (Superintendent)" }
];

export default function Simulator() {
  const [profile, setProfile] = useState<DetectiveProfile>({
    xp: 0,
    score: 0,
    completedCasesCount: 0,
    streak: 0,
    rank: "Anfänger-Detektiv (Kadett)",
    solvedCaseIds: []
  });

  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [currentCase, setCurrentCase] = useState<SimulationCase>(defaultCases[0]);
  const [hoveredLinkUrl, setHoveredLinkUrl] = useState<string | null>(null);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [isRoundSolved, setIsRoundSolved] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCaseSetup, setShowCaseSetup] = useState(false);

  const [genBrand, setGenBrand] = useState("");
  const [genDiff, setGenDiff] = useState<"Anfänger" | "Fortgeschritten" | "Experte">("Fortgeschritten");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("phish_detective_profile_v2");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const calculateRank = (xp: number) => {
    let currentRank = RANKS[0].title;
    for (const rank of RANKS) {
      if (xp >= rank.minXp) {
        currentRank = rank.title;
      }
    }
    return currentRank;
  };

  const saveProfile = (newProfile: DetectiveProfile) => {
    setProfile(newProfile);
    localStorage.setItem("phish_detective_profile_v2", JSON.stringify(newProfile));
  };

  const handleDecision = (claimedIsPhish: boolean) => {
    if (isRoundSolved) return;

    setUserGuess(claimedIsPhish);
    const correct = currentCase.isPhishing === claimedIsPhish;
    setIsCorrect(correct);
    setIsRoundSolved(true);

    const xpGained = correct ? 50 : 10;
    const pointsGained = correct ? (10 + profile.streak * 5) : 0;
    const nextStreak = correct ? profile.streak + 1 : 0;
    
    const updatedSolvedIds = [...profile.solvedCaseIds];
    const updatedFailedIds = [...(profile.failedCaseIds || [])];

    if (correct) {
      if (!updatedSolvedIds.includes(currentCase.id)) {
        updatedSolvedIds.push(currentCase.id);
      }
      const failedIdx = updatedFailedIds.indexOf(currentCase.id);
      if (failedIdx > -1) {
        updatedFailedIds.splice(failedIdx, 1);
      }
    } else {
      if (!updatedFailedIds.includes(currentCase.id)) {
        updatedFailedIds.push(currentCase.id);
      }
    }

    const nextXp = profile.xp + xpGained;
    const nextProfile: DetectiveProfile = {
      xp: nextXp,
      score: profile.score + pointsGained,
      completedCasesCount: profile.completedCasesCount + 1,
      streak: nextStreak,
      rank: calculateRank(nextXp),
      solvedCaseIds: updatedSolvedIds,
      failedCaseIds: updatedFailedIds
    };

    saveProfile(nextProfile);
  };

  const handleNextCase = () => {
    setIsRoundSolved(false);
    setUserGuess(null);
    setHoveredLinkUrl(null);
    
    const nextIdx = (activeCaseIdx + 1) % defaultCases.length;
    setActiveCaseIdx(nextIdx);
    setCurrentCase(defaultCases[nextIdx]);
  };

  const handleRestartProgress = () => {
    if (confirm("Möchten Sie Ihren gesamten Fortschritt und Ihr Detektiv-Level zurücksetzen?")) {
      const freshProf: DetectiveProfile = {
        xp: 0,
        score: 0,
        completedCasesCount: 0,
        streak: 0,
        rank: RANKS[0].title,
        solvedCaseIds: [],
        failedCaseIds: []
      };
      saveProfile(freshProf);
      setActiveCaseIdx(0);
      setCurrentCase(defaultCases[0]);
      setIsRoundSolved(false);
      setUserGuess(null);
    }
  };

  const computeSkills = () => {
    const skills = [
      {
        id: "sender",
        name: "ABSENDER-RECHTLICHKEIT",
        description: "PRÜFUNG VON CO-SENDER ADRESSEN UND DOMAINS.",
        associatedCases: ["case-paypal", "case-dhl", "case-hr-spear"],
        tipIfWeak: "TIPP: REINSCHAUEN BEIM DOMAIN-HOSTELEMENT NACH DEM '@'."
      },
      {
        id: "links",
        name: "LINK-RECHNER-DIAGNOSTIK",
        description: "ENTLARVUNG VON HOCHRISIKO-TLDS (Z.B. .CN UND .RU).",
        associatedCases: ["case-paypal", "case-dhl", "case-hr-spear"],
        tipIfWeak: "TIPP: NUTZEN SIE DAS 'SEZIERMESSER' IN DER LINK-INSPEKTION."
      },
      {
        id: "urgency",
        name: "VETRESISTENZ GEGEN DRUCK",
        description: "WIDERSTAND GEGEN KÜNSTLICHE ZEITBEDROHUNGEN.",
        associatedCases: ["case-paypal", "case-hr-spear", "case-microsoft"],
        tipIfWeak: "TIPP: REALE FIRMEN DROHEN SELTEN MIT SPONTANEN 24H-SPERREN."
      },
      {
        id: "social",
        name: "SOCIAL ENGINE DEFENSE",
        description: "ABWEHR VON EXTREME SPEAR-PHISHING VERSUCHEN.",
        associatedCases: ["case-dhl", "case-amazon", "case-hr-spear"],
        tipIfWeak: "TIPP: HINTERFRAGEN SIE DRITTLINKS GRUNDSÄTZLICH TELEFONISCH."
      }
    ];

    const solvedIds = profile.solvedCaseIds || [];
    const failedIds = profile.failedCaseIds || [];

    return skills.map(skill => {
      let solvedCount = 0;
      let failedCount = 0;

      skill.associatedCases.forEach(caseId => {
        if (solvedIds.includes(caseId)) solvedCount++;
        if (failedIds.includes(caseId)) failedCount++;
      });

      const total = solvedCount + failedCount;
      let percentage = 75;

      if (total > 0) {
        percentage = Math.round((solvedCount / total) * 100);
      } else {
        if (profile.xp > 0) {
          percentage = Math.min(100, 75 + Math.min(25, Math.floor(profile.xp / 25) * 5));
        }
      }

      return {
        ...skill,
        solvedCount,
        failedCount,
        total,
        percentage
      };
    });
  };

  const handleGenerateCustomCase = async () => {
    setIsGenerating(true);
    setGenerationError("");
    try {
      const response = await fetch("/api/generate-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: genBrand.trim() || undefined,
          difficulty: genDiff
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fehler beim Generieren des Szenarios.");
      }

      const customId = `generated-${Date.now()}`;
      const generatedCase: SimulationCase = {
        id: customId,
        brand: data.brand || "Generierter Fall",
        logo: data.logo || "🤖",
        senderName: data.senderName || "Kundenservice",
        senderEmail: data.senderEmail,
        date: "Zustellung soeben",
        recipient: "ihre.adresse@beispiel.de",
        subject: data.subject,
        body: data.body,
        links: data.links || [],
        isPhishing: data.isPhishing,
        difficulty: genDiff,
        explainingClues: data.explainingClues,
        detailedExplanation: data.detailedExplanation
      };

      setCurrentCase(generatedCase);
      setIsRoundSolved(false);
      setUserGuess(null);
      setHoveredLinkUrl(null);
      setShowCaseSetup(false);

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("API_KEY_MISSING")) {
        setGenerationError("AI API-Key fehlt. Generierungs-Features erfordern einen konfigurierten Google Gemini Key.");
      } else {
        setGenerationError("Schnittstellen-Fehler. Stellen Sie sicher, der Gemini-API-Schlüssel ist gültig.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in" id="simulator-container-elem">
      
      {/* LEFT: Dashboard profile status & actions (4 columns) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 relative">
          
          <div className="flex items-center gap-3 border-b-2 border-[#1D1B18] pb-4 mb-4">
            <div className="p-2.5 bg-white border-2 border-[#1D1B18] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#FF5500]" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-[#615C54] font-black block">ERMITTLER_STEUERUNG</span>
              <h3 className="text-sm font-black text-[#1D1B18] uppercase tracking-tight font-mono">{profile.rank}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-3 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18]">
              <span className="text-[9px] font-mono text-[#615C54] uppercase tracking-wider block font-bold">ERFAHRUNG (XP)</span>
              <div className="text-base font-black font-mono text-[#FF5500] mt-0.5">{profile.xp} XP</div>
            </div>
            <div className="bg-white p-3 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18]">
              <span className="text-[9px] font-mono text-[#615C54] uppercase tracking-wider block font-bold">PUNKTESTAND</span>
              <div className="text-base font-black font-mono text-[#00A3A6] mt-0.5">{profile.score}</div>
            </div>
          </div>

          <div className="mt-4 space-y-2 uppercase font-mono text-xs text-[#1D1B18]">
            <div className="flex justify-between">
              <span>FÄLLE EXAMINIERT</span>
              <span className="font-bold text-[#1D1B18]">{profile.completedCasesCount}</span>
            </div>
            
            <div className="flex justify-between">
              <span>SERIE_EFFEKT (STREAK)</span>
              <span className="font-bold text-[#FF5500] flex items-center gap-1">
                <Zap className="w-4 h-4 text-[#FF5500]" />
                {profile.streak}
              </span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4 pt-3 border-t-2 border-[#1D1B18]">
            <div className="flex justify-between text-[9px] font-mono text-[#615C54] mb-1 font-bold uppercase">
              <span>RANK_PROGRESS REGULATOR</span>
              <span>
                {profile.xp} // {profile.xp < 100 ? 100 : profile.xp < 250 ? 250 : profile.xp < 550 ? 550 : profile.xp < 1000 ? 1000 : 2000}
              </span>
            </div>
            <div className="w-full bg-white border border-[#1D1B18] h-3">
              <div 
                className="h-full bg-[#1D1B18]"
                style={{
                  width: `${Math.min(100, (profile.xp / (profile.xp < 100 ? 100 : profile.xp < 250 ? 250 : profile.xp < 550 ? 550 : profile.xp < 1000 ? 1000 : 2000)) * 100)}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Kompetenz-Profil (Stärken & Schwächen) */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#1D1B18]">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#00A3A6]" />
              <h4 className="text-xs font-black uppercase text-[#1D1B18] font-mono">📊 STRÄRKEN & SCHWÄCHEN_INDEX</h4>
            </div>
            <span className="text-[8px] font-mono font-black border-2 border-[#1D1B18] bg-[#1D1B18] text-white px-2 py-0.5 uppercase">
              {profile.completedCasesCount > 0 ? "LIVE_ANALYSE" : "AUSSTEHEND"}
            </span>
          </div>

          {profile.completedCasesCount === 0 ? (
            <div className="p-3 bg-white border border-[#1D1B18] text-center space-y-2.5 font-mono text-[10px] uppercase">
              <p className="text-[#615C54] leading-relaxed">
                Absolvieren Sie Fälle im Simulator, um Ihr persönliches <strong>Stärken- & Schwächenprofil</strong> freizuschalten. Unser System wertet Ihre Ermittlungen live aus.
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[#FF5500] font-black uppercase tracking-wider animate-pulse pt-1">
                <Target className="w-4 h-4" />
                ERSTE AKTE ÖFFNEN!
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#1D1B18] font-mono uppercase tracking-tight">
                BASIEREND AUF {profile.completedCasesCount} DURCHGEFÜHRTEN EXAMEN:
              </p>

              <div className="space-y-3.5">
                {computeSkills().map((skill) => {
                  const isStrength = skill.percentage >= 80;
                  const isWeakness = skill.percentage < 60;
                  
                  return (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase font-black">
                        <span className="text-[#1D1B18]">{skill.name}</span>
                        <span className={`font-black ${
                          isStrength ? "text-[#00A3A6]" : isWeakness ? "text-[#FF5500]" : "text-amber-500"
                        }`}>
                          {skill.percentage}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-white border border-[#1D1B18] h-3">
                        <div 
                          className={`h-full ${
                            isStrength ? "bg-[#00A3A6]" : isWeakness ? "bg-[#FF5500]" : "bg-amber-400"
                          }`}
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic list of custom Stärken & Schwächen summary list */}
              <div className="border-t-2 border-[#1D1B18] pt-3.5 space-y-3 font-mono">
                
                {/* Strengths section */}
                {computeSkills().some(s => s.percentage >= 80) && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#00A3A6] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      Ermittlungs-Stärken:
                    </span>
                    <div className="space-y-1">
                      {computeSkills().filter(s => s.percentage >= 80).map(s => (
                        <div key={s.id} className="text-[10px] text-[#1D1B18] bg-[#00A3A6]/10 px-2.5 py-1.5 border border-[#00A3A6] uppercase">
                          🎯 <strong>{s.name}</strong> IST SEHR GUT GEFESTIGT ({s.percentage}%)
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weaknesses/Tips Section */}
                {computeSkills().some(s => s.percentage < 80) && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#FF5500] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      Schulungsbedarf / Tipps:
                    </span>
                    <div className="space-y-1.5 flex flex-col gap-1">
                      {computeSkills().filter(s => s.percentage < 80).map(s => (
                        <div key={s.id} className="text-[9px] text-[#1D1B18] bg-white p-2.5 border border-[#1D1B18] uppercase">
                          ⚠️ <span className="font-extrabold text-[#FF5500]">{s.name} ({s.percentage}%):</span>
                          <span className="text-[#615C54] block mt-1 font-sans normal-case">
                            {s.tipIfWeak}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>

        {/* AI Case generator block */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5">
          {!showCaseSetup ? (
            <div className="space-y-3 font-mono">
              <h4 className="text-xs font-black uppercase text-[#1D1B18]">🤖 CO-AUTHOR: SCENARIO BOOT</h4>
              <p className="text-[11px] text-[#615C54] leading-relaxed uppercase">
                GENERIERE EIN SPEZIALISIERTES PHISHING-PROBE-SZENARIO ÜBER DIE GEMINI KI FÜR BELIEBIGE MARKEN.
              </p>
              <button
                onClick={() => setShowCaseSetup(true)}
                className="w-full bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-bold py-2.5 px-3 rounded-none flex items-center justify-center gap-2 text-xs uppercase shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
                AUTOR_STEUERUNG BOOTEN
              </button>
            </div>
          ) : (
            <div className="space-y-4 font-mono">
              <div className="flex justify-between items-center pb-2 border-b-2 border-[#1D1B18]">
                <span className="text-[10px] font-black uppercase text-[#1D1B18]">KI-PROBE-KONSTRUKTEUR</span>
                <button 
                  onClick={() => setShowCaseSetup(false)}
                  className="text-[9px] text-[#FF5500] font-black uppercase"
                >
                  ABBRECHEN
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#615C54] block uppercase">ZIEL_MARKE (Z.B. PAYPAL, DHL, AMAZON)</label>
                  <input
                    type="text"
                    value={genBrand}
                    onChange={(e) => setGenBrand(e.target.value)}
                    placeholder="PayPal, Netflix, Amazon..."
                    className="w-full bg-white border-2 border-[#1D1B18] rounded-none px-2.5 py-1.5 text-xs text-[#1D1B18] font-serif outline-none"
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#615C54] block uppercase">LEVEL</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["Anfänger", "Fortgeschritten", "Experte"] as const).map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setGenDiff(diff)}
                        disabled={isGenerating}
                        className={`text-[8px] font-black font-mono uppercase py-1 px-1 rounded-none border-2 transition ${
                          genDiff === diff 
                            ? "bg-[#1D1B18] border-[#1D1B18] text-white" 
                            : "bg-white border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {generationError && (
                  <div className="text-[9px] text-[#FF5500] bg-rose-500/5 border border-rose-500/20 p-2 uppercase font-mono">
                    ⚠️ {generationError}
                  </div>
                )}

                <button
                  onClick={handleGenerateCustomCase}
                  disabled={isGenerating}
                  className="w-full bg-[#1D1B18] hover:bg-[#FF5500] disabled:bg-[#1D1B18]/30 text-white py-2.5 px-3 rounded-none text-xs font-black uppercase flex items-center justify-center gap-1.5 transition"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                      AUTOR VERFASST AKTE...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      FALL ZUSAMMENSETZEN
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Local Preset Switcher */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-3">
          <h4 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-1.5">📚 LOKALES CHASSIS-BUCH</h4>
          <div className="space-y-1.5">
            {defaultCases.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => {
                  setActiveCaseIdx(idx);
                  setCurrentCase(cs);
                  setIsRoundSolved(false);
                  setUserGuess(null);
                  setHoveredLinkUrl(null);
                  setShowCaseSetup(false);
                }}
                className={`w-full text-left p-2.5 rounded-none flex items-center justify-between text-[11px] font-mono border-2 transition ${
                  currentCase.id === cs.id 
                    ? "bg-[#1D1B18] border-[#1D1B18] text-white"
                    : "bg-white border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5]"
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="text-xs shrink-0">{cs.logo}</span>
                  <span className="truncate">{cs.brand} - {cs.subject.substring(0, 16)}...</span>
                </span>
                <span className={`font-mono text-[8px] border px-1.5 py-0.5 rounded-none ${
                  currentCase.id === cs.id ? "bg-white text-[#1D1B18] border-white font-black" : "bg-[#ECE8DF] text-slate-500 border-[#1D1B18]"
                }`}>
                  {cs.difficulty.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-[#1D1B18]/20 w-full">
            <button 
              onClick={handleRestartProgress}
              className="w-full text-center py-2 px-3 border-2 border-[#1D1B18] bg-[#ECE8DF] hover:bg-[#FF5500] hover:text-white text-[#1D1B18] text-[9.5px] font-mono font-black uppercase transition shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5"
            >
              🔄 SPIELFORTSCHRITT ABSÄUBERN
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Active Email Client (8 columns) */}
      <div className="lg:col-span-8 space-y-5">
        
        {/* Email Client Visual Mockup */}
        <div className="bg-white border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] flex flex-col h-[520px] relative overflow-hidden">
          
          {/* Mail Client Header Top Bar */}
          <div className="bg-[#1D1B18] px-4 py-3 flex justify-between items-center border-b-2 border-[#1D1B18]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#FF5500]"></span>
              <span className="w-3 h-3 bg-white"></span>
              <span className="w-3 h-3 bg-[#00A3A6]"></span>
              <span className="text-white text-[10px] font-mono font-black ml-2 uppercase tracking-tight">Sicherheits-E-Mail-Posteinlass v3.5</span>
            </div>
            <div className="bg-white border border-[#1D1B18] px-2 py-0.5 text-[8px] font-mono text-[#1D1B18] uppercase tracking-wider font-black">
              {currentCase.difficulty.toUpperCase()}
            </div>
          </div>

          {/* Mail Metadata (Sender, Subject, Recipient) */}
          <div className="bg-[#F4F1EA] p-4 border-b-2 border-[#1D1B18] space-y-2 font-mono text-xs">
            <div className="flex flex-col md:flex-row md:justify-between text-xs">
              <div className="space-y-1">
                <div>
                  <span className="text-[#615C54] inline-block w-16">Von:</span>
                  <span className="font-extrabold text-[#1D1B18]">{currentCase.senderName} </span>
                  <span className="text-[#1D1B18] bg-white border border-[#1D1B18] py-0.5 px-2 select-all break-all inline-block">
                    &lt;{currentCase.senderEmail}&gt;
                  </span>
                </div>
                <div>
                  <span className="text-[#615C54] inline-block w-16">An:</span>
                  <span className="text-[#1D1B18]">{currentCase.recipient}</span>
                </div>
              </div>
              <div className="text-[#615C54] font-bold text-[10px] mt-1 md:mt-0 uppercase">
                {currentCase.date}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1D1B18]/15">
              <span className="text-[#615C54] inline-block w-16">Betreff:</span>
              <span className="text-xs font-black text-[#1D1B18] uppercase">{currentCase.subject}</span>
            </div>
          </div>

          {/* Mail Content Canvas Body */}
          <div className="flex-1 overflow-y-auto bg-[#FAF8F5] p-6 relative font-serif text-sm text-[#1D1B18] leading-relaxed space-y-4">
            
            <div className="whitespace-pre-line max-w-2xl font-serif">
              {currentCase.body}
            </div>

            {/* Email Links rendered inside the body container */}
            <div className="pt-4 max-w-md">
              {currentCase.links && currentCase.links.map((link) => (
                <button
                  key={link.id}
                  onMouseEnter={() => setHoveredLinkUrl(link.actualUrl)}
                  onMouseLeave={() => setHoveredLinkUrl(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Vorsicht! Im Simulator müssen Sie den Link nicht anklicken. Hovern Sie stattdessen darüber, um das echte Ziel unten in der Statusleiste zu prüfen, und fällen Sie dann Ihr Ermittlerurteil.`);
                  }}
                  className="bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-2.5 px-5 rounded-none ml-0 transition flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#1D1B18] hover:shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5 uppercase text-xs"
                >
                  {link.text}
                </button>
              ))}
            </div>

            {/* Simulated Desktop Client Hover Bar (Statusleiste) */}
            <div className="absolute bottom-2 left-2 max-w-[90%] md:max-w-md pointer-events-none">
              {hoveredLinkUrl && (
                <div className="bg-[#1D1B18] border-2 border-[#1D1B18] text-white font-mono px-3 py-1.5 rounded-none shadow-lg flex items-center gap-1.5 tracking-tight">
                  <span className="w-1.5 h-1.5 bg-[#FF5500] animate-pulse"></span>
                  <span className="text-slate-400 mr-0.5 text-[9px] uppercase font-black">Link-Ziel:</span>
                  <span className="break-all select-all font-bold text-[10px] whitespace-normal">{hoveredLinkUrl}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions Client Block */}
          <div className="bg-[#F4F1EA] border-t-2 border-[#1D1B18] p-4">
            {!isRoundSolved ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
                <span className="text-[10px] text-[#615C54] flex items-center gap-1.5 font-bold uppercase">
                  HOVERN SIE ZUM PRÜFEN UND ENTSCHEIDEN SIE.
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleDecision(false)}
                    className="flex-1 sm:flex-none border-2 border-[#1D1B18] bg-[#008080] hover:bg-[#005A5A] text-white font-bold py-2.5 px-5 rounded-none text-xs uppercase shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5 transition"
                  >
                    ✅ LEGITIM / KLAR
                  </button>
                  <button
                    onClick={() => handleDecision(true)}
                    className="flex-1 sm:flex-none border-2 border-[#1D1B18] bg-[#FF5500] hover:bg-[#CC4400] text-white font-bold py-2.5 px-5 rounded-none text-xs uppercase shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5 transition"
                  >
                    🚨 INVASIVER PHISH!
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 font-mono">
                <div className="flex items-center gap-2">
                  <div className={`p-2 border-2 ${
                    isCorrect ? "bg-[#00A3A6]/10 text-[#00A3A6] border-[#00A3A6]" : "bg-[#FF5500]/10 text-[#FF5500] border-[#FF5500]"
                  }`}>
                    {isCorrect ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5 animate-pulse" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1D1B18] uppercase">
                      {isCorrect ? "ERFOLGREICH IDENTIFIZIERT!" : "DIAGNOSE VERABSÄUMT!"}
                    </h4>
                    <p className="text-[10px] text-[#615C54] uppercase font-bold leading-normal">
                      {isCorrect 
                        ? "Ihr Verdacht war absolut gerechtfertigt. +50 XP hinzugefügt." 
                        : "Der Köder wurde geschluckt. Risikoanalyse verbucht (+10 XP)."
                      }
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextCase}
                  className="bg-[#1D1B18] hover:bg-[#FF5500] text-white border-2 border-[#1D1B18] text-xs font-bold py-2 px-4 rounded-none flex items-center gap-1.5 transition"
                >
                  NÄCHSTE AKTE
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Revealed Evidence / Lesson panel once solved/answered */}
        {isRoundSolved && (
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 shadow-[4px_4px_0px_#1D1B18] space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 border-b-2 border-[#1D1B18] pb-2">
              <Compass className="w-4 h-4 text-[#FF5500]" />
              <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono">
                ERMITTLERBERICHT // BEWEISSTÜCKE & QUELLE
              </h3>
            </div>

            <p className="text-xs text-[#1D1B18] leading-relaxed bg-white p-3 border border-[#1D1B18] font-mono uppercase">
              {currentCase.detailedExplanation}
            </p>

            <div className="space-y-2.5">
              <span className="text-[9px] font-mono text-[#615C54] uppercase tracking-wider block font-bold">SPUREN AUS DER AKTE:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCase.explainingClues && currentCase.explainingClues.map((clue, idx) => (
                  <div 
                    key={idx}
                    className="bg-white p-3 border border-[#1D1B18] flex gap-2.5 items-start shadow-[1.5px_1.5px_0px_#1D1B18]"
                  >
                    <span className="text-xs mt-0.5 select-none shrink-0">
                      {clue.status === "suspicious" ? "🟥" : "🟩"}
                    </span>
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-black text-[#1D1B18] block uppercase leading-none">{clue.target}</span>
                      <p className="text-[11px] text-[#615C54] font-sans normal-case leading-normal">{clue.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
