import React, { useState } from "react";
import { BookOpen, ShieldAlert, RotateCcw, Award, Zap, AlertTriangle, Compass, CheckCircle2, Skull } from "lucide-react";
import { motion } from "motion/react";

interface StoryChoice {
  text: string;
  nextPanelId: number;
  xpReward: number;
  chaosEffect: number; // increase our hilarious chaos index
  isCorrect: boolean;
  feedback: string;
}

interface StoryPanel {
  id: number;
  visualType: "terminal" | "fish_alert" | "lock_screen" | "server_chaos" | "safe_harbor";
  narrator: string;
  dialogue?: string;
  choices: StoryChoice[];
}

interface InteractiveSaga {
  id: string;
  title: string;
  synopsis: string;
  difficulty: string;
  startPanelId: number;
  panels: Record<number, StoryPanel>;
}

const INTERACTIVE_SAGAS: InteractiveSaga[] = [
  {
    id: "saga-1",
    title: "Phishs chaotischer Posteingang",
    synopsis: "Begleite Phish, unseren tollpatschigen Fisch, der versucht, sich durch seinen Arbeits-Posteingang zu navigieren. Jede falsche Taste droht das Firmennetzwerk zu sprengen!",
    difficulty: "EINSTEIGER",
    startPanelId: 1,
    panels: {
      1: {
        id: 1,
        visualType: "terminal",
        narrator: "Montagmorgen. Phish schlürft abgestandenes Wasser. Da ploppt eine Nachricht auf: 'DIREKTE GELD-AUSZAHLUNG! Klicken Sie hier, um Ihren Firmenbonus einzustreichen.'",
        dialogue: "Phish: „Oh Junge! Geld für zusätzliche Würmer! Da klicke ich sofort drauf!“",
        choices: [
          {
            text: "Kopfüber auf den blinkenden Bonus-Button hämmern!",
            nextPanelId: 2,
            xpReward: 0,
            chaosEffect: 60,
            isCorrect: false,
            feedback: "Aua! Phishing-Falle zugeschnappt. Schadsoftware blockiert sofort alle Datenbanksysteme. Die Bildschirme blinken blutrot."
          },
          {
            text: "Innehalten, den Mauszeiger über den Link bewegen (hovern) und Absender prüfen.",
            nextPanelId: 3,
            xpReward: 50,
            chaosEffect: 0,
            isCorrect: true,
            feedback: "Clever! Du siehst, dass der Link zu '@spearphishing-bonus-claims.ru' führt. Keine Spur von der echten HR-Abteilung!"
          }
        ]
      },
      2: {
        id: 2,
        visualType: "server_chaos",
        narrator: "Das IT-Zimmer füllt sich mit künstlichem Dampf. Phishs Monitor zeigt einen traurigen, verschlüsselten Karpfen: 'Sende 0.5 Bitcoin, oder deine Algen werden geschreddert!'",
        dialogue: "Phish: „Hoppla! Das war wohl kein Bonus. Vielleicht kann ich es mit einer Algen-Überweisung reparieren?“",
        choices: [
          {
            text: "Dem Erpresser die geforderten Bitcoins schicken, um das Problem heimlich zu lösen.",
            nextPanelId: 4,
            xpReward: 10,
            chaosEffect: 40,
            isCorrect: false,
            feedback: "Katastrophe! Die Scammer nehmen das Geld, rufen an und fordern noch mehr! Die Algen bleiben fest verschlüsselt."
          },
          {
            text: "Verbindung trennen (Kabel ab!) und sofort den Security-Admin rufen.",
            nextPanelId: 5,
            xpReward: 60,
            chaosEffect: -20,
            isCorrect: true,
            feedback: "Richtig reagiert! Durch das Kappen der physikalischen Verbindung verhinderst du, dass sich die Ransomware auf andere Server ausbreitet."
          }
        ]
      },
      3: {
        id: 3,
        visualType: "safe_harbor",
        narrator: "Phish meldet die Email vorbildlich. Ein goldener Stern erscheint über seinem Aquarium. Seine Kollegen klopfen ihm respektvoll auf die Flossen.",
        dialogue: "Phish: „Ich bin ein Genie! Die Würmer können warten, mein Server bleibt sauber!“",
        choices: [
          {
            text: "Saga erfolgreich beenden und Belohnung einsammeln!",
            nextPanelId: 100, // Victory panel
            xpReward: 100,
            chaosEffect: 0,
            isCorrect: true,
            feedback: "Ausgezeichnet! Du hast bewiesen, dass ein kühler Fischkopf jeden Angreifer ins Leere laufen lässt!"
          }
        ]
      },
      4: {
        id: 4,
        visualType: "server_chaos",
        narrator: "Der Serverraum brennt lichterloh. Phish schwimmt panisch im rauchenden Becken. Totale Systemkompromittierung! Die Kanzlei ist offline.",
        dialogue: "Phish: „Gibt es hier irgendwo eine Rettungsinsel?“",
        choices: [
          {
            text: "Saga neu starten und es besser machen!",
            nextPanelId: 1,
            xpReward: 0,
            chaosEffect: -100,
            isCorrect: false,
            feedback: "Zurück auf Start. Zeit, ein wahrer Detektiv zu werden!"
          }
        ]
      },
      5: {
        id: 5,
        visualType: "safe_harbor",
        narrator: "Dank Phishs schnellem Kabelziehen konnte das Backup eingespielt werden. Die Hacker gehen leer aus. Phish erhält eine Auszeichnung als 'Brandschutz-Matrose'!",
        dialogue: "Phish: „Manchmal ist kein Stecker der beste Stecker!“",
        choices: [
          {
            text: "Mission mit Bravour abschließen!",
            nextPanelId: 100,
            xpReward: 100,
            chaosEffect: 0,
            isCorrect: true,
            feedback: "Du hast Phish vor dem Ruin gerettet. Großartige Arbeit!"
          }
        ]
      },
      100: {
        id: 100,
        visualType: "safe_harbor",
        narrator: "ENDE DER CHRONIK. Phish schläft beruhigt in seiner Anemone. Die IT-Security-Abteilung hat heute ein bisschen weniger zu tun.",
        dialogue: "System: „Kapitel abgeschlossen. Du bist bereit für die nächste Stufe.“",
        choices: []
      }
    }
  },
  {
    id: "saga-2",
    title: "Das schwache Passwort-Flüstern",
    synopsis: "Phish will sein Geheimaquarium mit einer Kamera online stellen. Als Passwort hat er sich 'Phish123!' überlegt. Ein gefährliches Abenteuer im Brute-Force Keller beginnt.",
    difficulty: "GEÜBT",
    startPanelId: 1,
    panels: {
      1: {
        id: 1,
        visualType: "lock_screen",
        narrator: "Phish richtet den Router ein. Um sich die Arbeit leicht zu machen, wählt er das Passwort 'Phish123!', das er auch für sein Email-Konto nutzt.",
        dialogue: "Phish: „So ein super Passwort errät niemand! Es hat sogar ein Ausrufezeichen!“",
        choices: [
          {
            text: "Es so belassen. Passt doch super.",
            nextPanelId: 2,
            xpReward: 0,
            chaosEffect: 50,
            isCorrect: false,
            feedback: "Fehler! Innerhalb von 4 Minuten greifen automatische Scob-Scanner das Log-In an und erraten das simple Muster."
          },
          {
            text: "Ein langes Passwort (Passphrase) aus 4 zufälligen Wörtern zusammensetzen.",
            nextPanelId: 3,
            xpReward: 60,
            chaosEffect: 0,
            isCorrect: true,
            feedback: "Hervorragend! Du wählst 'ozean-koralle-taucherkette-balkon' (35 Zeichen). Die Brute-Force-Rechner der Cyber-Söldner kapitulieren sofort."
          }
        ]
      },
      2: {
        id: 2,
        visualType: "fish_alert",
        narrator: "Der Stream wurde gehackt! Die Angreifer kontrollieren nun Phishs Heizstab im Becken und kochen das Wasser langsam hoch!",
        dialogue: "Phish: „Puh, es wird plötzlich so kuschelig warm hier... Hilfe!“",
        choices: [
          {
            text: "Software-Update erzwingen um den Fehler auszumerzen.",
            nextPanelId: 4,
            xpReward: 10,
            chaosEffect: 30,
            isCorrect: false,
            feedback: "Keine Wirkung! Die Angreifer sperren dich per Admin-Konto komplett aus deinem eigenen Aquarium-System aus."
          },
          {
            text: "Router sofort auf Werkseinstellungen zurücksetzen und Zwei-Faktor-Authentifizierung (2FA) einschalten.",
            nextPanelId: 5,
            xpReward: 70,
            chaosEffect: -30,
            isCorrect: true,
            feedback: "Rettung! Der Hard-Reset vertreibt die Besatzer. Das neue 2FA-Protokoll fordert ab jetzt immer eine Bestätigung auf Phishs Muschel-Telefon."
          }
        ]
      },
      3: {
        id: 3,
        visualType: "safe_harbor",
        narrator: "Phishs Geheimaquarium bleibt absolut uneinnehmbar. Seine Kryptoschlüssel halten jedem Brute-Force-Sturm stand.",
        dialogue: "Phish: „Sicherheit fühlt sich trocken und entspannt an.“",
        choices: [
          {
            text: "Siegessignale anwerfen und Saga beenden!",
            nextPanelId: 100,
            xpReward: 80,
            chaosEffect: 0,
            isCorrect: true,
            feedback: "Stall-Sicherheit gemeistert!"
          }
        ]
      },
      4: {
        id: 4,
        visualType: "server_chaos",
        narrator: "Das Wasser kocht fast. Phish schwimmt wie eine gekochte Garnele im Kreis. Totale Niederlage wegen unzureichender IT-Hygiene.",
        dialogue: "Phish: „Bitte... wirft mich jemand zurück in den Ozean...“",
        choices: [
          {
            text: "Dieses feurige Debakel ungeschehen machen (Neustart)!",
            nextPanelId: 1,
            xpReward: 0,
            chaosEffect: -100,
            isCorrect: false,
            feedback: "Diesmal wählen wir direkt die starke Passphrase!"
          }
        ]
      },
      5: {
        id: 5,
        visualType: "safe_harbor",
        narrator: "Rettung im letzten Moment! Die Temperatur sinkt auf kühle 22 Grad. Phish atmet auf. Das Muschel-Handy signalisiert blockierte Logins.",
        dialogue: "Phish: „Keine unbefugte Erwärmung auf meiner Uhr!“",
        choices: [
          {
            text: "Zertifikat für 2FA aktivieren!",
            nextPanelId: 100,
            xpReward: 100,
            chaosEffect: 0,
            isCorrect: true,
            feedback: "Kompakt und bombensicher gelöst!"
          }
        ]
      },
      100: {
        id: 100,
        visualType: "safe_harbor",
        narrator: "ENDE DER CHRONIK. Länge gewinnt jedes Algorithmenrennen.",
        dialogue: "System: „Sicherheits-Zertifikat freigeschaltet.“",
        choices: []
      }
    }
  }
];

export default function NoirComics() {
  const [activeSagaIdx, setActiveSagaIdx] = useState(0);
  const [currentPanelId, setCurrentPanelId] = useState(1);
  const [chaosLevel, setChaosLevel] = useState(0); // Clumsy meter!
  const [xpPoints, setXpPoints] = useState(0);
  const [answeredText, setAnsweredText] = useState<string | null>(null);

  const activeSaga = INTERACTIVE_SAGAS[activeSagaIdx];
  const activePanel = activeSaga.panels[currentPanelId] || activeSaga.panels[1];

  const handleChoice = (choice: StoryChoice) => {
    setAnsweredText(choice.feedback);
    setXpPoints(prev => prev + choice.xpReward);
    setChaosLevel(prev => Math.max(0, Math.min(100, prev + choice.chaosEffect)));
    
    // Move to next step delay
    setTimeout(() => {
      setAnsweredText(null);
      setCurrentPanelId(choice.nextPanelId);
    }, 3800);
  };

  const resetSaga = () => {
    setCurrentPanelId(1);
    setChaosLevel(0);
    setAnsweredText(null);
  };

  // Render beautiful, stylized, interactive vector comic panels
  const renderInteractiveGraphic = (type: string) => {
    switch (type) {
      case "terminal":
        return (
          <div className="w-full h-full bg-[#1A1A1A] border-4 border-[#333] p-4 flex flex-col justify-between font-mono text-[#33FF33] text-left relative overflow-hidden select-none shadow-inner rounded-md">
            {/* CRT Screen Scanlines and Scan Vignette */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-20" />
            <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none z-20" />
            
            {/* Top diagnostic header */}
            <div className="flex justify-between items-center border-b border-[#33FF33]/30 pb-1 z-10 text-[9px]">
              <span className="animate-pulse">● CONSOLE: ACTIVE</span>
              <span>BATCH: COMM_01</span>
            </div>

            {/* Vintage computer screen print */}
            <div className="my-auto space-y-1.5 z-10 text-[10px] leading-tight">
              <p className="text-[#33FF33] font-bold">&gt; INCOMING SPEARPHISHING EM...</p>
              <p className="text-[#33FF33]/70 font-bold">&gt; SOURCE: bonus-hr@untrusted-domain.ru</p>
              <p className="text-amber-400 font-extrabold">&gt; WARN: DOMAIN LOOKALIKES DETECTED</p>
              <div className="flex items-center gap-1.5 bg-red-950/40 border border-[#33FF33]/30 px-1.5 py-1 text-red-400 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>PHISHING RISK INDEX: 94%</span>
              </div>
            </div>

            {/* Structured Vector Art: Retro Cybermatic Fish */}
            <div className="relative h-20 w-full flex items-center justify-center mt-2 z-10 bg-black/40 border border-[#33FF33]/20 rounded p-1">
              <svg viewBox="0 0 160 80" className="w-full h-full stroke-[#33FF33] fill-none stroke-[1.5]">
                {/* Vintage digital scope grid background */}
                <line x1="0" y1="40" x2="160" y2="40" stroke="#33FF33" strokeDasharray="2,5" strokeOpacity="0.2" />
                <line x1="80" y1="0" x2="80" y2="80" stroke="#33FF33" strokeDasharray="2,5" strokeOpacity="0.2" />
                
                {/* Vector Fish Wireframe */}
                <path d="M 25,40 C 45,20 85,20 115,40 C 85,60 45,60 25,40 Z" className="animate-pulse" />
                <circle cx="45" cy="35" r="2.5" fill="#33FF33" />
                {/* Detective Hat outline */}
                <path d="M 35,28 L 55,24 L 52,20 L 38,21 Z" fill="#33FF33" />
                {/* Tail fins */}
                <path d="M 115,40 L 135,22 L 130,40 L 135,58 Z" />
                {/* Digital code waves emit from mouth */}
                <path d="M 15,35 Q 8,30 2,36" strokeOpacity="0.8" />
                <path d="M 13,42 Q 5,45 1,39" strokeOpacity="0.6" />
                
                {/* Green text overlays */}
                <text x="110" y="15" className="text-[7px] fill-[#33FF33]/75 font-mono font-bold">101_SYS</text>
              </svg>
            </div>
            
            <div className="text-[8px] text-[#33FF33]/50 text-right z-10 font-mono">
              [DRÜCKE EINBLICK-TASTE...]
            </div>
          </div>
        );
      case "fish_alert":
        return (
          <div className="w-full h-full bg-[#3F0A0A] border-4 border-red-600 p-4 flex flex-col justify-between font-mono text-[#FAFAFA] text-center relative overflow-hidden rounded-md">
            {/* Visual warning background red indicator overlay to prevent chaos */}
            <div className="absolute inset-0 bg-red-600/10 animate-pulse pointer-events-none" />
            
            <div className="text-red-500 font-extrabold text-[10px] uppercase flex items-center justify-center gap-1.5 border-b border-red-500/30 pb-1">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
              <span>AKUTE CRISIS: HEIZSTAB-ÜBERNAHME</span>
            </div>
            
            {/* Real Graphic: Boiling water heater and sweating fish */}
            <div className="my-2 h-24 bg-black/50 border border-red-500/30 rounded p-1.5 relative flex justify-between items-center">
              
              {/* Graphic Left: Overheating aquarium thermometer */}
              <div className="w-10 h-full flex flex-col items-center justify-center gap-1 border-r border-red-500/20 pr-1 shrink-0">
                <span className="text-[8px] text-red-400 font-bold font-mono">42°C</span>
                <div className="w-2.5 h-12 bg-zinc-800 rounded-full border border-red-500/50 p-0.5 relative overflow-hidden">
                  <div className="bg-red-500 w-full h-4/5 absolute bottom-0 left-0 animate-pulse" />
                </div>
              </div>

              {/* Graphic Right: Beautiful boiling fish vector illustration */}
              <svg viewBox="0 0 120 70" className="flex-1 h-full mx-auto">
                {/* Heat-waves from heater rods */}
                <path d="M 15,10 Q 20,35 15,60 M 35,10 Q 40,35 35,60" fill="none" stroke="#FF5500" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse" />
                
                {/* Sweating Fish with spiral stress eye */}
                <g transform="translate(45, 12)">
                  <path d="M 10,25 C 25,10 50,10 65,25 C 50,40 25,40 10,25 Z" fill="#601010" stroke="#FF7777" strokeWidth="1.5" />
                  {/* Tail */}
                  <path d="M 65,25 L 78,13 L 75,25 L 78,37 Z" fill="#601010" stroke="#FF7777" strokeWidth="1.5" />
                  {/* Spiral Eye */}
                  <path d="M 22,23 Q 26,19 23,17 T 19,21" fill="none" stroke="#FFAAAA" strokeWidth="1.5" />
                  {/* Sweat droplet */}
                  <path d="M 28,11 Q 30,17 26,16" fill="#00D2FF" stroke="#00D2FF" strokeWidth="1" />
                </g>
                
                {/* Floating exhaust bubbles */}
                <circle cx="28" cy="18" r="2" fill="none" stroke="#FFAAAA" className="animate-bounce" />
                <circle cx="82" cy="52" r="3.5" fill="none" stroke="#FFAAAA" />
                <circle cx="102" cy="22" r="1.5" fill="none" stroke="#FFAAAA" />
              </svg>

            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9px] text-red-300">
                <span>SCHADCODE EXPANSION:</span>
                <span className="font-bold">SYSTEM_MAX</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 border border-red-500/50 rounded-sm overflow-hidden">
                <div className="bg-red-600 h-full w-11/12 animate-pulse" />
              </div>
            </div>
          </div>
        );
      case "lock_screen":
        return (
          <div className="w-full h-full bg-[#E5E9E0] border-4 border-[#2C3E2B] p-4 flex flex-col justify-between font-mono text-zinc-800 relative select-none rounded-md">
            <div className="text-[9px] text-[#2C3E2B] font-bold uppercase border-b border-zinc-300 pb-1 flex justify-between">
              <span>SECURITY_GATE_v0.99</span>
              <span>PWD_FAIL: 1</span>
            </div>
            
            {/* Real vector graphic of weak lock being cracked */}
            <div className="my-2 h-20 flex justify-center items-center gap-4 bg-white/40 border border-[#2C3E2B]/10 rounded p-1">
              <svg viewBox="0 0 160 80" className="w-32 h-full stroke-[#2C3E2B] fill-none stroke-[1.5]">
                {/* Lock body */}
                <rect x="55" y="32" width="50" height="38" rx="6" fill="#F0F3ED" strokeWidth="2" />
                {/* Shackle: Weak (Open lock shackle representing crack risk) */}
                <path d="M 65,32 L 65,20 C 65,8 95,8 95,20 L 95,28" stroke="#E53E3E" strokeWidth="2" strokeDasharray="2,2" />
                
                {/* Keyhole */}
                <circle cx="80" cy="46" r="3" fill="#2C3E2B" />
                <path d="M 78,46 L 82,46 L 83,56 L 77,56 Z" fill="#2C3E2B" />
                
                {/* Glitch vectors around weak password */}
                <path d="M 12,25 L 35,25" stroke="#E53E3E" strokeWidth="1" />
                <path d="M 125,25 L 148,25" stroke="#E53E3E" strokeWidth="1" />
                <text x="5" y="20" className="text-[7px] fill-[#E53E3E] font-extrabold">BRUTE-FORCE</text>
                <text x="115" y="20" className="text-[7px] fill-[#E53E3E] font-extrabold">CRACKABLE</text>
              </svg>
            </div>

            <div className="bg-red-50 border border-red-200 p-1.5 text-center">
              <p className="text-[9px] text-red-600 font-extrabold uppercase">PASSWORTSTÄRKE: 12% ALARM</p>
              <p className="text-[8px] text-zinc-500 font-medium">Wert: 'Phish123!' (Leicht zu raten)</p>
            </div>
          </div>
        );
      case "server_chaos":
        return (
          <div className="w-full h-full bg-[#1C1613] border-4 border-[#FF5500] p-4 flex flex-col justify-between font-mono text-[#FAF8F5] text-left relative overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-[#FF5500]/5 flex items-center justify-center text-red-500/10 font-sans text-5xl font-black rotate-12 select-none pointer-events-none">
              CHAOS
            </div>

            <div className="flex justify-between items-center border-b border-[#FF5500]/30 pb-1 z-10">
              <span className="text-[8px] bg-red-600 font-extrabold text-white px-2 py-0.5 rounded-sm">RANSOM BLOCKAGE</span>
              <Skull className="w-4 h-4 text-[#FF5500] animate-spin-slow" />
            </div>

            {/* Real Graphic: Server cabinet room melting with red wire chaos */}
            <div className="my-2 h-20 bg-black/65 border border-red-500/20 rounded p-1.5 relative flex justify-between items-center">
              <svg viewBox="0 0 160 80" className="w-full h-full">
                {/* Server rack slots */}
                <rect x="15" y="8" width="55" height="15" fill="#2D2D2D" rx="1" />
                <rect x="15" y="27" width="55" height="15" fill="#E53E3E" rx="1" className="animate-pulse" />
                <rect x="15" y="46" width="55" height="15" fill="#2D2D2D" rx="1" />
                
                {/* Blinking alarm LEDs */}
                <circle cx="22" cy="15" r="1.5" fill="#33FF33" />
                <circle cx="22" cy="34" r="1.5" fill="#FF1A1A" className="animate-ping" />
                <circle cx="22" cy="53" r="1.5" fill="#FFA500" />
                
                {/* Exploding sparks, crossed broken cables */}
                <path d="M 70,15 L 120,53" stroke="#FF5500" strokeWidth="1.5" className="animate-pulse" />
                <path d="M 70,34 L 105,15" stroke="#FF1A1A" strokeWidth="1" />
                <path d="M 70,53 L 130,12" stroke="#FF5500" strokeWidth="1.2" strokeDasharray="3,3" />

                {/* Broken database core visual representation */}
                <g transform="translate(125, 24)">
                  <ellipse cx="15" cy="10" rx="13" ry="5" fill="none" stroke="#E53E3E" strokeWidth="1.5" />
                  <ellipse cx="15" cy="18" rx="13" ry="5" fill="none" stroke="#602020" strokeWidth="1.5" />
                  <ellipse cx="15" cy="26" rx="13" ry="5" fill="none" stroke="#E53E3E" strokeWidth="1.2" className="animate-pulse" />
                  <path d="M 2,10 L 2,26" stroke="#E53E3E" strokeWidth="1.5" />
                  <path d="M 28,10 L 28,26" stroke="#E53E3E" strokeWidth="1.5" />
                </g>
              </svg>
            </div>

            <div className="z-10 text-[9px] space-y-0.5 text-[#FFA500]">
              <p className="font-bold">&gt;&gt; LOG: ALGENDATABASE LOCKDOWN...</p>
              <p className="text-red-500 font-extrabold">&gt;&gt; HOST_BUSY: CRYPTO-LOCK CORES ON FIRE</p>
            </div>
          </div>
        );
      case "safe_harbor":
      default:
        return (
          <div className="w-full h-full bg-[#E5F7F8] border-4 border-emerald-500 p-4 flex flex-col justify-between font-mono text-zinc-800 text-center relative overflow-hidden rounded-md">
            {/* Soft ocean animations */}
            <div className="absolute inset-0 bg-emerald-500/[0.03] pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-emerald-500/30 pb-1">
              <span className="text-[9px] text-emerald-700 font-extrabold uppercase">● HYPERSECU_OK</span>
              <span className="text-[8px] text-emerald-600 font-bold">SHIELD: ACTIVE</span>
            </div>
            
            {/* Real Graphic: Serene ocean sanctuary, crowned safe fish with Agent glasses */}
            <div className="my-2 h-20 bg-white/60 border border-emerald-500/20 rounded p-1 relative flex justify-between items-center overflow-hidden">
              <svg viewBox="0 0 160 80" className="w-full h-full">
                {/* Sunrays shining from corner */}
                <path d="M 0,0 L 40,80 M 0,0 L 90,80 M 0,0 L 140,80" stroke="#00D2FF" strokeWidth="1.5" strokeOpacity="0.15" />
                
                {/* Bubble flows */}
                <circle cx="20" cy="65" r="2.5" fill="none" stroke="#00A3A6" strokeOpacity="0.4" className="animate-bounce" />
                <circle cx="140" cy="20" r="1.5" fill="none" stroke="#00A3A6" strokeOpacity="0.4" />
                <circle cx="150" cy="55" r="3" fill="none" stroke="#00A3A6" strokeOpacity="0.4" />
                
                {/* Safety Cyber Shield visual */}
                <path d="M 10,40 C 25,60 140,55 150,40" stroke="#10B981" strokeWidth="2.5" fill="none" strokeDasharray="5,3" className="animate-pulse" />

                {/* Champion Agent Fish wearing absolute cool black glasses with custom Crown */}
                <g transform="translate(52, 12)">
                  {/* Golden status Crown */}
                  <path d="M 18,10 L 23,4 L 28,10 L 33,4 L 38,10 L 43,4 L 48,10 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
                  
                  {/* Happy green-teal fish body */}
                  <path d="M 10,24 C 25,12 48,12 60,24 C 48,36 25,36 10,24 Z" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
                  <path d="M 60,24 L 72,12 L 69,24 L 72,36 Z" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
                  
                  {/* Agent sunglasses (Black polygon glasses) */}
                  <polygon points="18,18 28,18 26,24 16,24" fill="#1D1B18" stroke="#10B981" strokeWidth="0.5" />
                  <polygon points="29,18 39,18 37,24 27,24" fill="#1D1B18" stroke="#10B981" strokeWidth="0.5" />
                  <line x1="28" y1="18" x2="29" y2="18" stroke="#FAF8F5" strokeWidth="1" />
                  
                  {/* Confident smile */}
                  <path d="M 18,29 Q 22,32 26,28" fill="none" stroke="#FAF8F5" strokeWidth="1" />
                </g>
              </svg>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 py-1.5 text-center leading-none">
              <p className="text-[10px] text-emerald-800 font-extrabold uppercase">BACKUPS INTACT - OUTGOING THREAT REPORTED</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" id="noir-comics-root">
      
      {/* Header element */}
      <div className="border-b border-[#1D1B18] pb-5">
        <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase font-mono">
          <BookOpen className="w-5 h-5 text-[#FF5500]" />
          PHISHS CHAOTISCHE COMIC-CHRONIKEN
        </h2>
        <p className="text-xs text-[#615C54] font-mono mt-1">
          ÜBERNEHME DIE STEUERUNG FÜR 'PHISH' – DEINEN UNGESCHICKTEN INTERAKTIVEN BEGleiter. JEDE ENTSCHEIDUNG VERÄNDERT DAS NETZWERKSCHICKSAL!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Saga switchers */}
        <div className="lg:col-span-4 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4 text-left">
          <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[#615C54] block mb-1">
            🎬 CHRONIK-AKT AUSWÄHLEN:
          </span>
          <div className="space-y-3">
            {INTERACTIVE_SAGAS.map((saga, idx) => (
              <button
                key={saga.id}
                onClick={() => {
                  setActiveSagaIdx(idx);
                  setCurrentPanelId(1);
                  setAnsweredText(null);
                  setChaosLevel(0);
                }}
                className={`w-full text-left p-4 rounded-none border-2 transition ${
                  activeSagaIdx === idx
                    ? "bg-[#1D1B18] border-[#1D1B18] text-white"
                    : "bg-white border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#1D1B18]"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-black font-mono tracking-tight uppercase">{saga.title}</span>
                  <span className={`text-[8px] font-mono font-black border px-1.5 py-0.5 rounded-none ${
                    activeSagaIdx === idx 
                      ? "bg-white text-[#1D1B18] border-white" 
                      : "bg-[#ECE8DF] text-[#1D1B18] border-[#1D1B18]"
                  }`}>
                    {saga.difficulty}
                  </span>
                </div>
                <p className={`text-[10px] leading-relaxed font-mono ${
                  activeSagaIdx === idx ? "text-slate-300" : "text-[#615C54]"
                }`}>
                  {saga.synopsis}
                </p>
              </button>
            ))}
          </div>

          {/* Core Telemetry Gauge: Dynamic Chaos Level meter! */}
          <div className="border-t-2 border-[#1D1B18] pt-4 space-y-2">
            <div className="flex justify-between text-[10px] font-mono font-black text-[#1D1B18] uppercase">
              <span>🐟 Phishs Chaos-Pegel :</span>
              <span className={chaosLevel > 50 ? "text-red-600 animate-pulse font-black" : "text-emerald-600"}>
                {chaosLevel}% {chaosLevel > 50 ? "[CRITICAL]" : "[STABIL]"}
              </span>
            </div>
            
            <div className="w-full bg-white h-4 border-2 border-[#1D1B18] overflow-hidden p-0.5">
              <div 
                className={`h-full transition-all duration-300 ${chaosLevel > 60 ? "bg-red-500 animate-pulse" : chaosLevel > 30 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${chaosLevel}%` }}
              />
            </div>
            <p className="text-[9px] text-[#615C54] font-mono uppercase leading-snug">
              Triffst du unvorsichtige Phishing-Entscheidungen, steigt Phishs Chaos-Pegel. Erreicht er 100%, brennt das System ab!
            </p>
          </div>
        </div>

        {/* Right Side: Visual Comic Panel Reader Screen */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          <div className="bg-[#FAF8F5] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] flex flex-col min-h-[460px] relative">
            
            {/* Tab header status */}
            <div className="bg-[#1D1B18] px-5 py-3 border-b-2 border-[#1D1B18] flex justify-between items-center text-left">
              <span className="text-xs font-mono font-black tracking-widest text-[#FAF8F5] uppercase">
                {activeSaga.title}
              </span>
              <span className="text-xs font-mono font-black text-[#FF5500] uppercase">
                Panel-ID: {currentPanelId} // NODE_SAGA
              </span>
            </div>

            {/* Main view panel board */}
            <div className="flex-1 flex flex-col md:flex-row bg-[#ECE8DF] items-stretch justify-center p-6 gap-6">
              
              {/* Graphic element rendering custom vector layouts based on visualType */}
              <div className="w-full md:w-60 h-60 bg-white border-4 border-[#1D1B18] flex flex-col items-center justify-center p-2 shadow-[4px_4px_0px_#1D1B18] relative shrink-0">
                {renderInteractiveGraphic(activePanel.visualType)}
              </div>

              {/* Interaction Details column */}
              <div className="flex-1 flex flex-col justify-between space-y-3.5 text-left w-full">
                
                {answeredText ? (
                  /* Live Feedback notification card with nice entry effect */
                  <div className="p-4 bg-white border-4 border-[#1D1B18] shadow-[3px_3px_0px_#FF5500] h-full flex flex-col justify-center space-y-2">
                    <span className="text-[10px] font-mono font-black text-[#FF5500] uppercase block tracking-wider animate-pulse flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#FF5500]" /> SYSTEM-AUSWIRKUNG &gt;
                    </span>
                    <p className="text-xs md:text-sm text-[#1D1B18] leading-relaxed font-mono uppercase font-black">
                      {answeredText}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Narrator text */}
                    <div className="p-4 bg-white border-2 border-[#1D1B18] shadow-[2.5px_2.5px_0px_#1D1B18]">
                      <span className="text-[9px] font-mono font-black uppercase text-[#FF5500] block mb-1 tracking-wider">CHRONIKEN_LOG:</span>
                      <p className="text-xs md:text-sm text-[#1D1B18] leading-relaxed italic font-serif">
                        „{activePanel.narrator}“
                      </p>
                    </div>

                    {/* Speech blurb from clumsy Phish */}
                    {activePanel.dialogue && (
                      <div className="p-3 bg-[#1D1B18] text-white border-l-4 border-[#FF5500] ml-2">
                        <p className="text-[11px] font-mono font-bold leading-normal uppercase">
                          {activePanel.dialogue}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Choices interface node */}
                {!answeredText && activePanel.choices.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] font-mono font-extrabold text-[#615C54] uppercase tracking-wider block">WÄHLE EINEN BEFEHL FÜR PHISH:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {activePanel.choices.map((choice, cidx) => (
                        <button
                          key={cidx}
                          onClick={() => handleChoice(choice)}
                          className="w-full text-left bg-white hover:bg-[#1D1B18] hover:text-white text-[#1D1B18] border-2 border-[#1D1B18] p-3 text-xs font-mono font-bold uppercase transition shadow-[2px_2px_0px_#1D1B18] active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] flex items-center justify-between gap-2 group"
                        >
                          <span className="pr-2 leading-relaxed">&gt;&gt; {choice.text}</span>
                          <span className="text-[#FF5500] font-black font-sans shrink-0 group-hover:text-white transition-colors">➔</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Victory state restart */}
                {activePanel.choices.length === 0 && (
                  <div className="space-y-3 pt-4">
                    <div className="p-3 bg-emerald-50 border-2 border-emerald-500 font-mono text-[11px] text-emerald-800 uppercase flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      <span>Saga erfolgreich gelöst! Erworbenes XP-Volumen: +{xpPoints} XP.</span>
                    </div>
                    <button
                      onClick={resetSaga}
                      className="bg-[#1D1B18] hover:bg-[#FF5500] text-white font-mono font-bold py-3.5 px-6 rounded-none text-xs uppercase tracking-wider transition shadow-[2px_2px_0px_#FF5500] flex items-center justify-center gap-1.5 w-full"
                    >
                      <RotateCcw className="w-4 h-4 text-white" />
                      Saga neu starten
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Footer reset button helper */}
            <div className="bg-[#FAF8F5] border-t-2 border-[#1D1B18] px-5 py-4 flex justify-between items-center text-left">
              <span className="text-[9px] font-mono text-[#615C54] uppercase font-bold">INTERAKTIVE SIMULATIONS-SAGA</span>
              {currentPanelId > 1 && activePanel.choices.length > 0 && (
                <button
                  onClick={resetSaga}
                  className="bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-extrabold py-1.5 px-3 rounded-none text-[10px] flex items-center gap-1.5 shadow-[2.5px_2.5px_0px_#1D1B18]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  RESTART_AKT
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
