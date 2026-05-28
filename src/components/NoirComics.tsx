import React, { useState } from "react";
import { BookOpen, ShieldAlert, ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface ComicPage {
  panelId: number;
  imageEmoji: string;
  narrator: string;
  dialogue?: string;
  clueText?: string;
}

interface ComicBook {
  id: string;
  title: string;
  synopsis: string;
  difficulty: string;
  pages: ComicPage[];
}

const NOIR_COMICS: ComicBook[] = [
  {
    id: "comic-1",
    title: "Akt I: Der Schatten des doppelten Absenders",
    synopsis: "In einer stürmischen Regennacht vor dem Terminal. Ein dubioser Posteingang, der das Schicksal einer ganzen Kanzlei verändert.",
    difficulty: "ANFÄNGER",
    pages: [
      {
        panelId: 1,
        imageEmoji: "🌧️🕵️‍♂️💼",
        narrator: "Es regnete in Strömen. Der Kaffee schmeckte wie altes Motoröl. Auf meinem Bildschirm blinkte eine E-Mail auf.",
        dialogue: "„Ihre Lizenz läuft ab, Detektiv. Klicken Sie hier...“",
        clueText: "Hinweis des Detektivs: Auf den ersten Blick schien es ein offizieller Brief des Bundesamtes zu sein."
      },
      {
        panelId: 2,
        imageEmoji: "🔍📡📊",
        narrator: "Ich zog die Lupe heran. Der Absender behauptete, 'justiz-service' zu sein. Aber hinter dem Display-Namen lauerte der wahre Jäger.",
        dialogue: "„@legaloffice-verify-cn.com... das ist kein Rechtshilfe-Server. Das riecht nach Schwindel.“",
        clueText: "Spuren-Analyse: Ein echter Provider sitzt fast nie in einer neu registrierten ausländischen Zone!"
      },
      {
        panelId: 3,
        imageEmoji: "💡📦🚫",
        narrator: "Ich löschte die Akte ohne sie anzurühren. Ein weiterer Phish ging ins Leere. In dieser Stadt bist du entweder der Spürhund oder die Beute.",
        dialogue: "„Nicht heute, Kumpel. Nicht auf meinem Server.“",
        clueText: "Ermittlungs-Fazit: Vertraue niemals der bloßen Beschriftung einer E-Mail."
      }
    ]
  },
  {
    id: "comic-2",
    title: "Akt II: Die Sekunden-Sperre",
    synopsis: "Eine unpersönliche Warnung, die droht, das Bankkonto in 3 Stunden einzufrieren. Der Ermittler bewahrt kühlen Kopf.",
    difficulty: "GEÜBT",
    pages: [
      {
        panelId: 1,
        imageEmoji: "🕰️💳🚨",
        narrator: "Der Sekundenzeiger hämmerte in meinen Ohren wie ein Presslufthammer. Eine rote Benachrichtigung drohte, meine Ersparnisse einzufrieren.",
        dialogue: "„Ihr Konto wird in 180 Minuten gesperrt! Verifizieren Sie sich!“",
        clueText: "Psychologische Analyse: Kriminelle nutzen künstlichen Zeitdruck, um logisches Nachdenken auszuschalten."
      },
      {
        panelId: 2,
        imageEmoji: "💻🖥️🔗",
        narrator: "Ich glitt mit der Maus über den glühenden Button. Die Statusleiste verriet mir die hässliche Wahrheit. Kein HTTPS-Ziel, sondern schlichtes Harvesting.",
        dialogue: "„Ein Link, der ins Dunkle führt... Sie wollten mein Passwort abgreifen.“",
        clueText: "Hovern ist Pflicht: Nur wer vergleicht, sieht das wahre Einbruchsziel der Angreifer."
      },
      {
        panelId: 3,
        imageEmoji: "🛡️☕️🕶️",
        narrator: "Ich lehnte mich zurück und schlürfte meinen kalten Kaffee. Mein Konto war sicher. Mein Verstand noch sicherer.",
        dialogue: "„Dringlichkeit ist der beste Freund des Diebes – aber nicht meiner.“",
        clueText: "Lernspur: Banken fordern Sie niemals panikartig per E-Mail zur sofortigen Passworteingabe auf."
      }
    ]
  },
  {
    id: "comic-3",
    title: "Akt III: Das leise Flüstern des Passworts",
    synopsis: "Ein simpler Brute-Force-Angriff zerschmettert ein scheinbar starkes Passwort. Ein Mahnmal für Online-Sicherheit.",
    difficulty: "EXPERTE",
    pages: [
      {
        panelId: 1,
        imageEmoji: "🔓🔑💥",
        narrator: "Sie dachte, 'Sommer2024!' sei eine unbezwingbare Festung. Doch für die Algorithmen im Keller war es nur ein staubiges Vorhängeschloss.",
        dialogue: "„In einer Sekunde geknackt? Aber es hatte doch ein Sonderzeichen...!“",
        clueText: "Passwort-Forensik: Ein leicht vorhersagbares Wortmuster wird von Cracking-Wörterbüchern sofort kompromittiert."
      },
      {
        panelId: 2,
        imageEmoji: "🧠🛡️🔐",
        narrator: "Ich gab ihr die goldene Formel mit auf den Weg. Länge schlägt Komplexität. Sätze schlagen Einzelwörter. Eine Phrase aus vier zufälligen Begriffen.",
        dialogue: "„Verbinden Sie Phrasen: 'Blaues-Regenfass-Kater-Zirkus'. Fast unmöglich zu erraten.“",
        clueText: "Die Faustregel: Ein Satz mit über 16 Zeichen widersteht selbst Hochleistungs-Cluster-Computern jahrzehntelang."
      },
      {
        panelId: 3,
        imageEmoji: "🎖️🐈🌌",
        narrator: "Nun glänzte ihre Festung wieder im Mondlicht. Die Spione zogen ab, hungrig und besiegt.",
        dialogue: "„Zwei-Faktor-Authentifizierung ist ab jetzt mein neuer bester Freund.“",
        clueText: "Zusätzlicher Schutz: 2FA stoppt Scammer, selbst wenn sie irgendwie an Ihr Passwort gelangen."
      }
    ]
  }
];

export default function NoirComics() {
  const [activeComicIdx, setActiveComicIdx] = useState(0);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);

  const activeComic = NOIR_COMICS[activeComicIdx];
  const activePage = activeComic.pages[currentPageIdx];

  const handleNextPage = () => {
    if (currentPageIdx < activeComic.pages.length - 1) {
      setCurrentPageIdx(currentPageIdx + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(currentPageIdx - 1);
    }
  };

  return (
    <div className="space-y-6" id="noir-comics-panel-root">
      
      {/* Header element */}
      <div className="border-b border-[#1D1B18] pb-5">
        <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase font-mono">
          <BookOpen className="w-5 h-5 text-[#FF5500]" />
          DETEKTIV NOIR // INTERAKTIVE BILD-PROTOKOLLE
        </h2>
        <p className="text-xs text-[#615C54] font-mono mt-1">
          DÜSTERE SICHERHEITS-CHRONIKEN IN EXTREMEM HOCH-KONTRAST. ERFORSCHEN SIE DIE METHODIK DER METROPOLEN-SPOILER.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Comic book selector & Act switcher (4 cols) */}
        <div className="lg:col-span-4 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
          <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[#615C54] block mb-1">
            🎬 PROTOKOLL-AUSWAHL:
          </span>
          <div className="space-y-3">
            {NOIR_COMICS.map((comic, idx) => (
              <button
                key={comic.id}
                onClick={() => {
                  setActiveComicIdx(idx);
                  setCurrentPageIdx(0);
                }}
                className={`w-full text-left p-4 rounded-none border-2 transition ${
                  activeComicIdx === idx
                    ? "bg-[#1D1B18] border-[#1D1B18] text-white"
                    : "bg-white border-[#1D1B18] text-[#1D1B18] hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#1D1B18]"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black font-mono tracking-tight uppercase">{comic.title}</span>
                  <span className={`text-[8px] font-mono font-black border px-1.5 py-0.5 rounded-none ${
                    activeComicIdx === idx 
                      ? "bg-white text-[#1D1B18] border-white" 
                      : "bg-[#ECE8DF] text-[#1D1B18] border-[#1D1B18]"
                  }`}>
                    {comic.difficulty}
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed font-mono ${
                  activeComicIdx === idx ? "text-slate-300" : "text-[#615C54]"
                }`}>
                  {comic.synopsis}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Comic Reader screen (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Main Visual Board Panel Card */}
          <div className="bg-[#FAF8F5] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] flex flex-col min-h-[460px] relative">
            
            {/* Comic Header status */}
            <div className="bg-[#1D1B18] px-5 py-3 border-b-2 border-[#1D1B18] flex justify-between items-center">
              <span className="text-xs font-mono font-black tracking-widest text-[#FAF8F5] uppercase">
                {activeComic.title}
              </span>
              <span className="text-xs font-mono font-black text-[#FF5500] uppercase">
                PANEL {currentPageIdx + 1} // {activeComic.pages.length}
              </span>
            </div>

            {/* Panel Stage area */}
            <div className="flex-1 flex flex-col md:flex-row bg-[#ECE8DF] items-center justify-center p-6 gap-6 min-h-[320px]">
              
              {/* Graphic container styled to look high-contrast noir sketch */}
              <div className="w-44 h-44 md:w-56 md:h-56 bg-white border-4 border-[#1D1B18] flex flex-col items-center justify-center text-center p-4 shadow-[4px_4px_0px_#1D1B18] relative shrink-0">
                <div className="absolute top-2 left-2 text-[8px] uppercase font-mono tracking-wider font-extrabold text-[#FAF8F5] bg-[#1D1B18] px-1 py-0.5 border border-[#1D1B18]">
                  PANEL {activePage.panelId}
                </div>
                <div className="text-6xl md:text-8xl mb-2 filter grayscale select-none">
                  {activePage.imageEmoji}
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#FF5500] animate-pulse"></span>
                  <span className="text-[8px] font-mono uppercase font-black text-[#1D1B18]">NOIR_FEED</span>
                </div>
              </div>

              {/* Text, Dialogues, Clues column */}
              <div className="flex-1 space-y-4 text-left w-full">
                
                {/* Narrator intro */}
                <div className="p-4 bg-white border-2 border-[#1D1B18] shadow-[3px_3px_0px_#1D1B18]">
                  <span className="text-[9px] font-mono font-black uppercase text-[#FF5500] block mb-1 tracking-wider">DETEKTIV_MONOLOG:</span>
                  <p className="text-xs md:text-sm text-[#1D1B18] leading-relaxed italic font-serif">
                    „{activePage.narrator}“
                  </p>
                </div>

                {/* Direct Dialogue inside a speech bubble lookalike */}
                {activePage.dialogue && (
                  <div className="p-3 bg-[#1D1B18] text-white border-l-4 border-[#FF5500] ml-2">
                    <p className="text-xs font-mono font-bold leading-normal">
                      {activePage.dialogue}
                    </p>
                  </div>
                )}

                {/* Educational clue block */}
                {activePage.clueText && (
                  <div className="text-xs text-[#1D1B18] flex items-start gap-2.5 pt-2 bg-white/40 p-3 border border-[#1D1B18]/30">
                    <Compass className="w-4 h-4 text-[#00A3A6] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black text-[#1D1B18] block mb-0.5 font-mono text-[9px] uppercase tracking-wider">FORENSIKER_HINWEIS:</span>
                      <p className="text-[11px] leading-relaxed text-[#615C54] font-mono uppercase">{activePage.clueText}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Navigation buttons */}
            <div className="bg-[#FAF8F5] border-t-2 border-[#1D1B18] px-5 py-4 flex justify-between items-center mt-auto">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIdx === 0}
                className="bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-bold py-2 px-4 rounded-none text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#1D1B18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1D1B18] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                ZURÜCK
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPageIdx === activeComic.pages.length - 1}
                className="bg-[#1D1B18] hover:bg-[#FF5500] text-white font-mono font-bold py-2 px-5 rounded-none text-xs flex items-center gap-1.5 transition disabled:opacity-40"
              >
                WEITER
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

          {/* Quick learning card */}
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[2px_2px_0px_#1D1B18] p-4 text-xs text-[#1D1B18] font-mono text-center flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#FF5500]" />
            <span className="uppercase text-[10px]">Erkennen Sie dieses Angriffsmuster wieder? Nutzen Sie Ihr Wissen im Trainings-Simulator!</span>
          </div>

        </div>
      </div>

    </div>
  );
}
