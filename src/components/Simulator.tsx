import React, { useState, useEffect, useRef } from "react";
import { SimulationCase } from "../types";
import { loadProfile, selectProfileCase, resetProfile, recordStoredCaseDecision, SimulatorProfile } from "../utils/progress";
import { subscribeStorageChanges } from "../utils/storage";
import { 
  ShieldAlert, ShieldCheck, Award, Zap, Check, ChevronRight, Compass,
  AlertTriangle, Play, Target, Brain
} from "lucide-react";
import { translations, Language, getLocalizedCases } from "../utils/i18n";

const getLocalizedRanks = (lang: string) => {
  if (lang === "en") {
    return [
      { minXp: 0, title: "Novice Detective (Cadet)" },
      { minXp: 100, title: "Security Agent (Investigator)" },
      { minXp: 250, title: "Phishing Hunter (Inspector)" },
      { minXp: 550, title: "Cyber Forensics Expert (Captain)" },
      { minXp: 1000, title: "Master Detective (Superintendent)" }
    ];
  }
  return [
    { minXp: 0, title: "Anfänger-Detektiv (Kadett)" },
    { minXp: 100, title: "Sicherheits-Agent (Ermittler)" },
    { minXp: 250, title: "Phishing-Fahnder (Inspektor)" },
    { minXp: 550, title: "Cyber-Forensiker (Kommissar)" },
    { minXp: 1000, title: "Sicherheits-Meisterdetektiv (Superintendent)" }
  ];
};

export default function Simulator({ language = "de" }: { language?: Language }) {
  const currentCases = getLocalizedCases(language);

  const [profile, setProfile] = useState<SimulatorProfile>(loadProfile);
  const [activeCaseIdx, setActiveCaseIdx] = useState(() => Math.max(0, currentCases.findIndex(c => c.id === profile.activeCaseId)));
  const [currentCase, setCurrentCase] = useState<SimulationCase>(currentCases[activeCaseIdx]);
  const [hoveredLinkUrl, setHoveredLinkUrl] = useState<string | null>(null);
  const restoredGuess = profile.activeCaseId === currentCases[activeCaseIdx].id ? profile.lastGuess : undefined;
  const [userGuess, setUserGuess] = useState<boolean | null>(restoredGuess ?? null);
  const [isRoundSolved, setIsRoundSolved] = useState(restoredGuess !== undefined);
  const [isCorrect, setIsCorrect] = useState(restoredGuess === currentCases[activeCaseIdx].isPhishing);
  const roundAnswered = useRef(restoredGuess !== undefined);
  const calculatedRanks = getLocalizedRanks(language);
  const profileRef = useRef(profile);
  const [syncNotice, setSyncNotice] = useState("");

  useEffect(() => {
    if (activeCaseIdx < currentCases.length) {
      setCurrentCase(currentCases[activeCaseIdx]);
    }
  }, [language, activeCaseIdx]);

  const calculateRank = (xp: number) => {
    let currentRank = calculatedRanks[0].title;
    for (const rank of calculatedRanks) {
      if (xp >= rank.minXp) {
        currentRank = rank.title;
      }
    }
    return currentRank;
  };

  const acceptProfile = (latest: SimulatorProfile) => {
    profileRef.current = latest;
    setProfile(latest);
  };

  const restoreSavedRound = (latest: SimulatorProfile) => {
    const idx = Math.max(0, currentCases.findIndex(c => c.id === latest.activeCaseId));
    const restoredCase = currentCases[idx];
    const guess = latest.activeCaseId === restoredCase.id ? latest.lastGuess : undefined;
    setActiveCaseIdx(idx);
    setCurrentCase(restoredCase);
    setUserGuess(guess ?? null);
    setIsCorrect(guess === restoredCase.isPhishing);
    setIsRoundSolved(guess !== undefined);
    roundAnswered.current = guess !== undefined;
    setHoveredLinkUrl(null);
  };

  const resetNotice = language === "en"
    ? "Simulator progress was reset in another tab. The saved round is shown; the old round was discarded."
    : "Der Simulator-Fortschritt wurde in einem anderen Tab zurückgesetzt. Die gespeicherte Runde wird angezeigt; die alte Runde wurde verworfen.";

  useEffect(() => {
    const refresh = () => {
      const latest = loadProfile();
      const resetChanged = latest.resetRevision !== profileRef.current.resetRevision;
      acceptProfile(latest);
      // Other tabs may choose their own practice case. Only a shared reset
      // discards the currently displayed round and its obsolete feedback.
      if (resetChanged) {
        restoreSavedRound(latest);
        setSyncNotice(resetNotice);
      }
    };
    refresh();
    return subscribeStorageChanges(refresh);
  }, [language]);

  const handleDecision = (claimedIsPhish: boolean) => {
    if (isRoundSolved || roundAnswered.current) return;
    roundAnswered.current = true;
    const expectedResetRevision = profileRef.current.resetRevision;
    const nextProfile = recordStoredCaseDecision(currentCase.id, claimedIsPhish, currentCase.isPhishing, expectedResetRevision);
    acceptProfile(nextProfile);
    if (nextProfile.resetRevision !== expectedResetRevision) {
      restoreSavedRound(nextProfile);
      setSyncNotice(resetNotice);
      return;
    }

    // If another tab answered this saved round first, show that recorded
    // answer instead of claiming a second reward for the current click.
    const recordedGuess = nextProfile.lastGuess ?? claimedIsPhish;
    setUserGuess(recordedGuess);
    setIsCorrect(currentCase.isPhishing === recordedGuess);
    setIsRoundSolved(true);
    setSyncNotice("");
  };

  const openCase = (idx: number) => {
    const latest = selectProfileCase(currentCases[idx].id);
    acceptProfile(latest);
    roundAnswered.current = false;
    setIsRoundSolved(false);
    setUserGuess(null);
    setHoveredLinkUrl(null);
    setSyncNotice("");
    setActiveCaseIdx(idx);
    setCurrentCase(currentCases[idx]);
  };

  const handleNextCase = () => openCase((activeCaseIdx + 1) % currentCases.length);

  const handleRestartProgress = () => {
    const confirmMsg = language === "en"
      ? "Reset simulator practice points, answers and rank in this browser (including other tabs)? Byte, pet XP, unlocks and the flashcard box will stay unchanged."
      : "Simulator-Übungspunkte, Antworten und Rang in diesem Browser (auch in anderen Tabs) zurücksetzen? Byte, Fisch-XP, Modulfreischaltungen und der Vokabelkasten bleiben erhalten.";
    if (window.confirm(confirmMsg)) {
      const latest = resetProfile(currentCases[0].id);
      acceptProfile(latest);
      restoreSavedRound(latest);
      setSyncNotice("");
    }
  };

  const computeSkills = () => {
    const skills = [
      {
        id: "sender",
        name: language === "en" ? "SENDER CHECKS" : "ABSENDERPRÜFUNG",
        description: language === "en" ? "CHECKING SENDER ADDRESSES AND DOMAINS." : "ABSENDERADRESSEN UND DOMAINS PRÜFEN.",
        associatedCases: ["case-paypal", "case-dhl", "case-hr-spear"],
        tipIfWeak: language === "en" ? "TIP: INSPECT THE DOMAIN PORTION AFTER THE '@'." : "TIPP: REINSCHAUEN BEIM DOMAIN-HOSTELEMENT NACH DEM '@'."
      },
      {
        id: "links",
        name: language === "en" ? "LINK INSPECTION" : "LINKPRÜFUNG",
        description: language === "en" ? "COMPARING LINK HOSTNAMES WITH THE EXPECTED SERVICE." : "LINK-HOSTNAMEN MIT DEM ERWARTETEN DIENST ABGLEICHEN.",
        associatedCases: ["case-paypal", "case-dhl", "case-hr-spear"],
        tipIfWeak: language === "en" ? "TIP: USE THE 'INSPECTOR' TOOL TO DECONSTRUCT MULTI-LEVEL DOMAINS." : "TIPP: NUTZEN SIE DAS 'SEZIERMESSER' IN DER LINK-INSPEKTION."
      },
      {
        id: "urgency",
        name: language === "en" ? "PRESSURE RESISTANCE" : "UMGANG MIT ZEITDRUCK",
        description: language === "en" ? "RESISTING ARTIFICIAL TIMEOUT THREATS." : "WIDERSTAND GEGEN KÜNSTLICHE ZEITBEDROHUNGEN.",
        associatedCases: ["case-paypal", "case-hr-spear", "case-microsoft"],
        tipIfWeak: language === "en" ? "TIP: VERIFY URGENT REQUESTS THROUGH A KNOWN, INDEPENDENT CHANNEL." : "TIPP: DRINGENDE ANFRAGEN ÜBER EINEN BEKANNTEN, UNABHÄNGIGEN KANAL PRÜFEN."
      },
      {
        id: "social",
        name: language === "en" ? "SOCIAL ENGINE DEFENSE" : "SOCIAL ENGINE DEFENSE",
        description: language === "en" ? "BLOCKING TARGETED SPEAR-PHISHING ATTEMPTS." : "ABWEHR VON EXTREME SPEAR-PHISHING VERSUCHEN.",
        associatedCases: ["case-dhl", "case-amazon", "case-hr-spear"],
        tipIfWeak: language === "en" ? "TIP: ALWAYS VERIFY SENSITIVE EXECUTIVE ASSIGNMENTS OUT-OF-BAND (PHONE)." : "TIPP: HINTERFRAGEN SIE DRITTLINKS GRUNDSÄTZLICH TELEFONISCH."
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
      const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : null;

      return {
        ...skill,
        solvedCount,
        failedCount,
        total,
        percentage
      };
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in" id="simulator-container-elem">
      {syncNotice && <p role="status" className="lg:col-span-12 border-2 border-amber-600 bg-amber-50 p-3 text-sm text-amber-950">{syncNotice}</p>}
      
      {/* LEFT: Dashboard profile status & actions (4 columns) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 relative">
          
          <div className="flex items-center gap-3 border-b-2 border-[#1D1B18] pb-4 mb-4">
            <div className="p-2.5 bg-white border-2 border-[#1D1B18] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#FF5500]" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-[#615C54] font-black block">
                {language === "en" ? "INVESTIGATOR_HQ" : "ERMITTLER_STEUERUNG"}
              </span>
              <h3 className="text-sm font-black text-[#1D1B18] uppercase tracking-tight font-mono">{calculateRank(profile.xp)}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-3 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18]">
              <span className="text-[9px] font-mono text-[#615C54] uppercase tracking-wider block font-bold">
                {language === "en" ? "PRACTICE POINTS" : "ÜBUNGSPUNKTE"}
              </span>
              <div className="text-base font-black font-mono text-[#FF5500] mt-0.5">{profile.xp}</div>
            </div>
            <div className="bg-white p-3 border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18]">
              <span className="text-[9px] font-mono text-[#615C54] uppercase tracking-wider block font-bold">
                {language === "en" ? "SCORE" : "PUNKTESTAND"}
              </span>
              <div className="text-base font-black font-mono text-[#00A3A6] mt-0.5">{profile.score}</div>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#615C54]">
            {language === "en"
              ? "Simulator points and ranks belong to this practice mode, including repeats. Pet XP unlock modules separately."
              : "Simulator-Punkte und Ränge gelten für diesen Übungsmodus, einschliesslich Wiederholungen. Fisch-XP schalten separat Module frei."}
          </p>
          <div className="mt-4 space-y-2 uppercase font-mono text-xs text-[#1D1B18]">
            <div className="flex justify-between">
              <span>{language === "en" ? "PRACTICE ROUNDS" : "ÜBUNGSRUNDEN"}</span>
              <span className="font-bold text-[#1D1B18]">{profile.completedCasesCount}</span>
            </div>
            
            <div className="flex justify-between">
              <span>{language === "en" ? "STREAK EFFECT" : "SERIE_EFFEKT (STREAK)"}</span>
              <span className="font-bold text-[#FF5500] flex items-center gap-1">
                <Zap className="w-4 h-4 text-[#FF5500]" />
                {profile.streak}
              </span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4 pt-3 border-t-2 border-[#1D1B18]">
            <div className="flex justify-between text-[9px] font-mono text-[#615C54] mb-1 font-bold uppercase">
              <span>{language === "en" ? "RANK PROGRESS STATUS" : "RANK_PROGRESS REGULATOR"}</span>
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
              <h4 className="text-xs font-black uppercase text-[#1D1B18] font-mono">
                {language === "en" ? "📊 ANSWERS BY TOPIC" : "📊 ANTWORTEN NACH THEMA"}
              </h4>
            </div>
            <span className="text-[8px] font-mono font-black border-2 border-[#1D1B18] bg-[#1D1B18] text-white px-2 py-0.5 uppercase">
              {profile.completedCasesCount > 0 
                ? (language === "en" ? "LOCAL ANSWERS" : "LOKALE ANTWORTEN")
                : (language === "en" ? "PENDING" : "AUSSTEHEND")}
            </span>
          </div>

          {profile.completedCasesCount === 0 ? (
            <div className="p-3 bg-white border border-[#1D1B18] text-center space-y-2.5 font-mono text-[10px] uppercase">
              <p className="text-[#615C54] leading-relaxed">
                {language === "en" 
                  ? "Solve prepared cases to see a summary of your answers. This is practice feedback, not a validated skills assessment."
                  : "Bearbeite vorbereitete Fälle, um deine Antworten zusammengefasst zu sehen. Das ist Übungsfeedback, keine validierte Kompetenzmessung."}
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[#FF5500] font-black uppercase tracking-wider animate-pulse pt-1">
                <Target className="w-4 h-4" />
                {language === "en" ? "OPEN FIRST CASE!" : "ERSTE AKTE ÖFFNEN!"}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#1D1B18] font-mono uppercase tracking-tight">
                {language === "en" 
                  ? "Latest answer per relevant case; unanswered topics show no percentage:"
                  : "Letzte Antwort je zugeordnetem Fall; ohne Antworten gibt es keinen Prozentwert:"}
              </p>

              <div className="space-y-3.5">
                {computeSkills().map((skill) => {
                  const isStrength = skill.percentage !== null && skill.percentage >= 80;
                  const isWeakness = skill.percentage !== null && skill.percentage < 60;
                  
                  return (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase font-black">
                        <span className="text-[#1D1B18]">{skill.name}</span>
                        <span className={`font-black ${
                          isStrength ? "text-[#00A3A6]" : isWeakness ? "text-[#FF5500]" : "text-amber-500"
                        }`}>
                          {skill.percentage === null ? (language === "en" ? "No answers yet" : "Noch keine Antworten") : `${skill.percentage}% (${skill.solvedCount}/${skill.total})`}
                        </span>
                      </div>
                      
                      <div className="w-full bg-white border border-[#1D1B18] h-3">
                        <div 
                          className={`h-full ${
                            isStrength ? "bg-[#00A3A6]" : isWeakness ? "bg-[#FF5500]" : "bg-amber-400"
                          }`}
                          style={{ width: `${skill.percentage ?? 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic list of custom Stärken & Schwächen summary list */}
              <div className="border-t-2 border-[#1D1B18] pt-3.5 space-y-3 font-mono">
                
                {/* Strengths section */}
                {computeSkills().some(s => s.percentage !== null && s.percentage >= 80) && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#00A3A6] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      {language === "en" ? "Correct practice answers:" : "Richtige Übungsantworten:"}
                    </span>
                    <div className="space-y-1">
                      {computeSkills().filter(s => s.percentage !== null && s.percentage >= 80).map(s => (
                        <div key={s.id} className="text-[10px] text-[#1D1B18] bg-[#00A3A6]/10 px-2.5 py-1.5 border border-[#00A3A6] uppercase">
                          🎯 <strong>{s.name}</strong> {language === "en" ? "CORRECT IN THESE CASES" : "IN DIESEN FÄLLEN RICHTIG"} ({s.percentage}%)
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weaknesses/Tips Section */}
                {computeSkills().some(s => s.percentage !== null && s.percentage < 80) && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#FF5500] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {language === "en" ? "Training Input & Tips:" : "Schulungsbedarf / Tipps:"}
                    </span>
                    <div className="space-y-1.5 flex flex-col gap-1">
                      {computeSkills().filter(s => s.percentage !== null && s.percentage < 80).map(s => (
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

        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5">
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-black uppercase text-[#1D1B18]">
              {language === "en" ? "Fixed training cases" : "Feste Trainingsfälle"}
            </h4>
            <p className="text-[11px] text-[#615C54] leading-relaxed">
              {language === "en"
                ? "This version does not generate new cases with AI. Choose a prepared case from the list below."
                : "Diese Version erzeugt keine neuen Fälle per KI. Wähle einen vorbereiteten Fall aus der Liste darunter."}
            </p>
          </div>
        </div>

        {/* Local Preset Switcher */}
        <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-3">
          <h4 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-1.5">
            {language === "en" ? "📚 CHOOSE A PRACTICE CASE" : "📚 ÜBUNGSFALL WÄHLEN"}
          </h4>
          <div className="space-y-1.5">
            {currentCases.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => openCase(idx)}
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
                  {cs.difficulty === "Anfänger" 
                    ? (language === "en" ? "NOVICE" : "ANFÄNGER") 
                    : cs.difficulty === "Fortgeschritten" 
                    ? (language === "en" ? "INTERMEDIATE" : "FORTGESCHRITTEN") 
                    : (language === "en" ? "EXPERT" : "EXPERTE")}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-[#1D1B18]/20 w-full">
            <button 
              onClick={handleRestartProgress}
              className="w-full text-center py-2 px-3 border-2 border-[#1D1B18] bg-[#ECE8DF] hover:bg-[#FF5500] hover:text-white text-[#1D1B18] text-[9.5px] font-mono font-black uppercase transition shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5"
            >
              {language === "en" ? "🔄 RESET SIMULATOR PROGRESS" : "🔄 SIMULATOR-FORTSCHRITT ZURÜCKSETZEN"}
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
              <span className="text-white text-[10px] font-mono font-black ml-2 uppercase tracking-tight">
                {language === "en" ? "Secure Email Ingress Gateway v3.5" : "Sicherheits-E-Mail-Posteinlass v3.5"}
              </span>
            </div>
            <div className="bg-white border border-[#1D1B18] px-2 py-0.5 text-[8px] font-mono text-[#1D1B18] uppercase tracking-wider font-black">
              {currentCase.difficulty === "Anfänger" 
                ? (language === "en" ? "NOVICE" : "ANFÄNGER") 
                : currentCase.difficulty === "Fortgeschritten" 
                ? (language === "en" ? "INTERMEDIATE" : "FORTGESCHRITTEN") 
                : (language === "en" ? "EXPERT" : "EXPERTE")}
            </div>
          </div>

          {/* Mail Metadata (Sender, Subject, Recipient) */}
          <div className="bg-[#F4F1EA] p-4 border-b-2 border-[#1D1B18] space-y-2 font-mono text-xs">
            <div className="flex flex-col md:flex-row md:justify-between text-xs">
              <div className="space-y-1">
                <div>
                  <span className="text-[#615C54] inline-block w-16">
                    {language === "en" ? "From:" : "Von:"}
                  </span>
                  <span className="font-extrabold text-[#1D1B18]">{currentCase.senderName} </span>
                  <span className="text-[#1D1B18] bg-white border border-[#1D1B18] py-0.5 px-2 select-all break-all inline-block">
                    &lt;{currentCase.senderEmail}&gt;
                  </span>
                </div>
                <div>
                  <span className="text-[#615C54] inline-block w-16">
                    {language === "en" ? "To:" : "An:"}
                  </span>
                  <span className="text-[#1D1B18]">{currentCase.recipient}</span>
                </div>
              </div>
              <div className="text-[#615C54] font-bold text-[10px] mt-1 md:mt-0 uppercase">
                {currentCase.date}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1D1B18]/15">
              <span className="text-[#615C54] inline-block w-16">
                {language === "en" ? "Subject:" : "Betreff:"}
              </span>
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
                  onFocus={() => setHoveredLinkUrl(link.actualUrl)}
                  onClick={() => setHoveredLinkUrl(link.actualUrl)}
                  aria-label={`${link.text} – ${language === "en" ? "show destination, does not open the site" : "Ziel anzeigen, öffnet keine Website"}`}
                  className="bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-2.5 px-5 rounded-none ml-0 transition flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#1D1B18] hover:shadow-[1px_1px_0px_#1D1B18] active:translate-y-0.5 uppercase text-xs"
                >
                  {link.text}
                </button>
              ))}
            </div>

            {/* Simulated Desktop Client Hover Bar (Statusleiste) */}
            <div className="absolute bottom-2 left-2 max-w-[90%] md:max-w-md pointer-events-none">
              {hoveredLinkUrl && (
                <div role="status" className="bg-[#1D1B18] border-2 border-[#1D1B18] text-white font-mono px-3 py-1.5 rounded-none shadow-lg flex items-center gap-1.5 tracking-tight">
                  <span className="w-1.5 h-1.5 bg-[#FF5500] animate-pulse"></span>
                  <span className="text-slate-400 mr-0.5 text-[9px] uppercase font-black">
                    {language === "en" ? "Target Link:" : "Link-Ziel:"}
                  </span>
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
                  {language === "en" ? "HOVER, FOCUS OR TAP A LINK TO INSPECT ITS DESTINATION." : "LINK-ZIELE PER MAUS, TASTATURFOKUS ODER ANTIPPEN PRÜFEN."}
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleDecision(false)}
                    className="flex-1 sm:flex-none border-2 border-[#1D1B18] bg-[#008080] hover:bg-[#005A5A] text-white font-bold py-2.5 px-5 rounded-none text-xs uppercase shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5 transition"
                  >
                    {language === "en" ? "✅ LEGITIMATE / CLEAN" : "✅ LEGITIM / KLAR"}
                  </button>
                  <button
                    onClick={() => handleDecision(true)}
                    className="flex-1 sm:flex-none border-2 border-[#1D1B18] bg-[#FF5500] hover:bg-[#CC4400] text-white font-bold py-2.5 px-5 rounded-none text-xs uppercase shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5 transition"
                  >
                    {language === "en" ? "🚨 PHISHING" : "🚨 PHISHING"}
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
                      {isCorrect 
                        ? (language === "en" ? "SUCCESSFULLY IDENTIFIED!" : "ERFOLGREICH IDENTIFIZIERT!") 
                        : (language === "en" ? "TRY THE EXPLANATION" : "SCHAU DIR DIE ERKLÄRUNG AN")}
                    </h4>
                    <p className="text-[10px] text-[#615C54] uppercase font-bold leading-normal">
                      {isCorrect 
                        ? (language === "en" ? "Correct for this prepared case. +50 practice points." : "Richtig für diesen vorbereiteten Fall. +50 Übungspunkte.")
                        : (language === "en" ? "Review the case explanation. +10 practice points for the attempt." : "Lies die Fallerklärung. +10 Übungspunkte für den Versuch.")
                      }
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextCase}
                  className="bg-[#1D1B18] hover:bg-[#FF5500] text-white border-2 border-[#1D1B18] text-xs font-bold py-2 px-4 rounded-none flex items-center gap-1.5 transition"
                >
                  {language === "en" ? "NEXT CASE" : "NÄCHSTE AKTE"}
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
                {language === "en" ? "FORENSIC CASE NOTES // COLLECTED EVIDENCE" : "ERMITTLERBERICHT // BEWEISSTÜCKE & QUELLE"}
              </h3>
            </div>

            <p className="text-xs text-[#1D1B18] leading-relaxed bg-white p-3 border border-[#1D1B18] font-mono uppercase">
              {currentCase.detailedExplanation}
            </p>

            <div className="space-y-2.5">
              <span className="text-[9px] font-mono text-[#615C54] uppercase tracking-wider block font-bold">
                {language === "en" ? "CRITICAL TRACES DISCOVERED:" : "SPUREN AUS DER AKTE:"}
              </span>
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
