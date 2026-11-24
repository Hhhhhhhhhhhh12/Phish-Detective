import React, { useEffect, useRef, useState } from "react";
import { Sparkles, KeyRound, Eye, EyeOff, AlertCircle, RefreshCw } from "lucide-react";
import { evaluatePassword } from "../utils/passwordStrength";

// These are public teaching examples, deliberately not a password generator.
const TRAINING_EXAMPLES = [
  "H0f_f@r!",
  "12345678901234567890",
  "regenschirm-kiesel-zebra-nebel",
];
const ILLUSTRATION_STAGES = [
  "Beispiel: Häufige Kennwörter können zuerst ausprobiert werden.",
  "Beispiel: Bekannte Wörter und Wiederholungen machen Versuche vorhersehbarer.",
  "Reale Angriffe hängen unter anderem von Versuchslimits und der Speicherung beim Dienst ab.",
];
const COMPLETE_MESSAGE = "Illustration beendet. Es wurde kein Kennwort geknackt oder auf Sicherheit geprüft.";

export default function PasswordLab() {
  const [showIntro, setShowIntro] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [illustrationProgress, setIllustrationProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [tickerText, setTickerText] = useState("Bereit für eine Lernillustration.");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const evaluation = password ? evaluatePassword(password) : null;

  useEffect(() => () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
  }, []);

  const resetIllustration = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsSimulating(false);
    setIllustrationProgress(0);
    setTickerText("Bereit für eine Lernillustration.");
  };

  const changeExample = (value: string) => {
    resetIllustration();
    setPassword(value);
  };

  const chooseTrainingExample = () => {
    changeExample(TRAINING_EXAMPLES[exampleIndex]);
    setExampleIndex((exampleIndex + 1) % TRAINING_EXAMPLES.length);
  };

  const handleRunSimulation = () => {
    if (!password || intervalRef.current !== null) return;
    setIsSimulating(true);
    setIllustrationProgress(0);
    setTickerText(ILLUSTRATION_STAGES[0]);
    let step = 0;
    // A fixed educational animation, independent of the entered example.
    // It never tries guesses, sends the input, or derives a cracking result.
    intervalRef.current = setInterval(() => {
      step += 1;
      setIllustrationProgress(Math.min(100, step * 10));
      if (step >= 10) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsSimulating(false);
        setTickerText(COMPLETE_MESSAGE);
      } else {
        setTickerText(ILLUSTRATION_STAGES[Math.min(2, Math.floor(step / 3))]);
      }
    }, 350);
  };

  if (showIntro) {
    return (
      <div className="space-y-6 animate-fade-in" id="password-lab-introduction">
        <div className="border-b border-[#1D1B18] pb-5">
          <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase">
            <KeyRound className="w-5 h-5 text-[#FF5500]" />
            KENNWORT-LABOR // BRIEFING
          </h2>
          <p className="text-xs text-[#615C54] font-mono mt-1">LÄNGE, VORHERSEHBARKEIT UND DIE GRENZEN EINER LERNHEURISTIK.</p>
        </div>

        <div className="bg-[#FAF8F5] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-6 text-left space-y-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="inline-flex gap-1.5 bg-[#FF5500] text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase">DIE WICHTIGSTE UNTERSCHEIDUNG</div>
            <h3 className="text-lg font-black uppercase text-[#1D1B18]">Länger hilft, wenn die Auswahl schwer zu erraten ist.</h3>
            <p className="text-xs md:text-sm text-[#2E2C29] leading-relaxed">
              Eine Heuristik ist eine vereinfachte Faustregel. Dieses Labor betrachtet Zeichenlänge und einige auffällige Muster.
              Es kennt weder die Entstehung eines Kennworts noch dessen Wiederverwendung oder Bekanntheit aus Datenlecks.
              Aus der Zeichenfolge allein lässt sich keine belastbare Knackzeit ableiten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border-2 border-[#FF5500] bg-orange-50/40 p-4 space-y-3">
              <h4 className="text-[10px] font-mono text-[#FF5500] font-extrabold uppercase">KURZES BEISPIEL MIT SONDERZEICHEN</h4>
              <div className="bg-white p-3 border border-[#FF5500] font-mono text-center text-sm font-black tracking-widest text-[#1D1B18]">H0f_f@r!</div>
              <p className="text-[11px] text-[#615C54] leading-relaxed">
                Acht Zeichen bieten weniger Auswahlmöglichkeiten als ein längeres, ähnlich zufällig gewähltes Kennwort.
                Bekannte Ersetzungen wie „a“ durch „@“ sind vorhersehbar. Eine Mischung von Zeichenarten allein belegt keine Stärke.
              </p>
            </div>
            <div className="border-2 border-[#00A3A6] bg-teal-50/40 p-4 space-y-3">
              <h4 className="text-[10px] font-mono text-[#007D80] font-extrabold uppercase">LÄNGERES WORTBEISPIEL</h4>
              <div className="bg-white p-3 border border-[#00A3A6] font-mono text-center text-xs font-black text-[#1D1B18] break-words">regenschirm-kiesel-zebra-nebel</div>
              <p className="text-[11px] text-[#615C54] leading-relaxed">
                Mehrere zufällig und unabhängig ausgewählte Wörter können eine längere Passphrase bilden.
                Eine bekannte Redewendung, eine kleine feste Wortliste oder dieses veröffentlichte Beispiel ist keine verlässliche Auswahl für ein echtes Konto.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#E5E1D8] border border-[#1D1B18] text-xs space-y-2 text-[#615C54] leading-relaxed">
            <h4 className="text-xs text-[#1D1B18] font-black font-mono uppercase">WAS DIE ANGRIFFSDAUER BEEINFLUSST</h4>
            <p>
              Bei einer Anmeldung begrenzen Dienste oft die Zahl der Versuche. Werden gespeicherte Passwort-Hashes gestohlen,
              hängt ein Offline-Angriff auch von deren Schutzverfahren und der verfügbaren Rechenleistung ab.
              Ein Hash ist ein aus dem Kennwort berechneter Prüfwert. Das Labor kennt diese Bedingungen nicht.
            </p>
            <p>Länge schützt ausserdem nicht vor Phishing. Ein einzigartiges Kennwort pro Dienst und zusätzliche Anmeldefaktoren verringern unterschiedliche Risiken.</p>
          </div>
          <p className="text-[11px] text-[#615C54] leading-relaxed">
            Fachliche Grundlage: <a className="underline underline-offset-2" href="https://pages.nist.gov/800-63-4/sp800-63b/passwords/" target="_blank" rel="noopener noreferrer">NIST SP 800-63B-4: Strength of Passwords</a>.
            Die hier verwendete kleine Musterprüfung ist keine NIST-Konformitätsprüfung.
          </p>
          <div className="flex justify-end pt-3">
            <button onClick={() => setShowIntro(false)} className="bg-[#1D1B18] hover:bg-[#FF5500] text-white border-2 border-[#1D1B18] py-3.5 px-6 font-mono font-bold text-xs uppercase tracking-wider transition shadow-[3px_3px_0px_#FFA500]">
              Zurück zu den Trainingsbeispielen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="password-lab-root">
      <div className="border-b border-[#1D1B18] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase">
            <KeyRound className="w-5 h-5 text-[#FF5500]" />
            KENNWORT-LABOR // TRAININGSBEISPIELE
          </h2>
          <p className="text-xs text-[#615C54] font-mono mt-1">LOKALE BEOBACHTUNGEN ZU LÄNGE UND MUSTERN.</p>
        </div>
        <button onClick={() => { resetIllustration(); setShowIntro(true); }} className="text-xs text-[#FF5500] hover:underline font-mono uppercase font-bold self-start mt-1">
          [ Erläuterung ansehen ]
        </button>
      </div>

      <p id="password-lab-privacy" className="border-2 border-[#FF5500] bg-orange-50 p-4 text-xs text-[#1D1B18] leading-relaxed">
        <strong>Nur erfundene Trainingsbeispiele eingeben, keine echten Kennwörter oder Zugangstoken.</strong>{" "}
        Das Labor speichert oder versendet diese Eingabe nicht. Die Anzeige bewertet weder die Sicherheit eines Kontos noch eine reale Knackzeit.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
          <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b-2 border-[#1D1B18] pb-2">BEISPIEL UNTERSUCHEN</h3>
          <div className="space-y-3">
            <label htmlFor="password-input-field" className="text-[10px] font-mono text-[#615C54] uppercase block font-bold">Erfundenes Kennwort-Beispiel</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={event => changeExample(event.target.value)}
                placeholder="Nur ein erfundenes Beispiel"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={256}
                aria-describedby="password-lab-privacy password-example-note"
                className="w-full bg-white border-2 border-[#1D1B18] pl-4 pr-12 py-3.5 text-sm text-[#1D1B18] placeholder-[#615C54]/60 outline-none focus:bg-[#FAF8F5] shadow-inner font-mono rounded-none"
                id="password-input-field"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} aria-label={showPass ? "Trainingsbeispiel verbergen" : "Trainingsbeispiel anzeigen"} aria-pressed={showPass} className="absolute right-3 top-4 text-[#1D1B18] hover:text-[#FF5500]">
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button onClick={chooseTrainingExample} className="bg-white hover:bg-[#FAF8F5] border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-bold py-2.5 px-4 text-xs transition flex items-center gap-1.5 shadow-[2px_2px_0px_#1D1B18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
              Trainingsbeispiel wechseln
            </button>
            <button onClick={() => changeExample("")} className="bg-[#ECE8DF] border-2 border-[#1D1B18] py-2.5 px-4 text-xs font-mono font-bold text-[#1D1B18] hover:bg-[#DCD8CF] transition">Eingabe leeren</button>
          </div>
          <p id="password-example-note" className="text-[11px] text-[#615C54] leading-relaxed">Die Schaltfläche wechselt zwischen drei öffentlichen Lernbeispielen. Sie erzeugt keine Kennwörter für echte Konten.</p>

          {evaluation && (
            <div className="pt-4 space-y-4 border-t-2 border-[#1D1B18]" aria-live="polite" aria-atomic="true">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <span className="text-[10px] font-mono text-[#615C54] uppercase font-bold">Beobachtung:</span>
                <span className={`text-[10px] uppercase font-mono px-3 py-1 border-2 font-black ${evaluation.hasObviousPattern ? "bg-[#FF5500]/10 border-[#FF5500] text-[#A23800]" : "bg-white border-[#1D1B18] text-[#1D1B18]"}`}>{evaluation.level}</span>
              </div>
              <div className="p-4 bg-white border-2 border-[#1D1B18] shadow-[3px_3px_0px_#1D1B18] space-y-1">
                <span className="text-[9px] font-mono text-[#615C54] block uppercase font-bold">Zeichenlänge</span>
                <span className="text-lg font-black block font-mono text-[#1D1B18]" id="password-length-display">{evaluation.length} Zeichen</span>
                <p className="text-[11px] text-[#615C54] leading-relaxed">Die Länge ist eine Beobachtung. Auswahlverfahren, Wiederverwendung und Bekanntheit werden hier nicht geprüft.</p>
              </div>
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono font-black text-[#1D1B18] uppercase block">EINORDNUNG DER LERNHEURISTIK:</span>
                {evaluation.feedback.map(feedback => (
                  <div key={feedback} className="flex gap-2 items-start text-xs text-[#1D1B18] bg-white border border-[#1D1B18] p-3 shadow-[1.5px_1.5px_0px_#1D1B18]">
                    <AlertCircle className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                    <p className="font-sans leading-relaxed">{feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2">ILLUSTRATION: PASSWÖRTER ERRATEN</h3>
            <p className="text-xs text-[#615C54] leading-relaxed">Eine feste Lernanimation erklärt Einflussfaktoren. Der Ablauf ist für jedes Beispiel gleich; es werden keine Kombinationen geprüft.</p>
            <div className="bg-[#E5E1D8] p-4 border-2 border-[#1D1B18] font-mono text-xs space-y-3 shadow-inner">
              <div className="flex justify-between text-[#615C54] font-black border-b border-[#1D1B18]/20 pb-1.5">
                <span>LERNILLUSTRATION</span>
                <span className="text-[#A23800]">{isSimulating ? "LÄUFT" : "BEREIT"}</span>
              </div>
              <div className="text-[#1D1B18] min-h-[64px] bg-white/60 p-2 border border-[#1D1B18] text-[11px] leading-relaxed">{tickerText}</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#615C54] font-black uppercase">
                  <span id="password-illustration-progress-label">Animationsfortschritt</span>
                  <span>{illustrationProgress}%</span>
                </div>
                <div className="bg-white border border-[#1D1B18] h-3" role="progressbar" aria-labelledby="password-illustration-progress-label" aria-valuemin={0} aria-valuemax={100} aria-valuenow={illustrationProgress}>
                  <div className="bg-[#1D1B18] h-full" style={{ width: `${illustrationProgress}%` }} />
                </div>
              </div>
            </div>
            <p className="sr-only" role="status">{isSimulating ? "Die Lernillustration läuft." : illustrationProgress === 100 ? COMPLETE_MESSAGE : "Die Lernillustration ist bereit."}</p>
            <button onClick={handleRunSimulation} disabled={!password || isSimulating} className="w-full bg-[#1D1B18] hover:bg-[#FF5500] text-white disabled:opacity-40 py-2.5 px-4 text-xs font-mono font-bold uppercase transition flex items-center justify-center gap-2 shadow-[2px_2px_0px_#1D1B18]">
              <RefreshCw className={`w-4 h-4 text-white ${isSimulating ? "animate-spin motion-reduce:animate-none" : ""}`} />
              Illustration starten
            </button>
          </div>
          <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-3.5">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-1">FÜR ECHTE KONTEN</h3>
            <div className="text-xs text-[#1D1B18] space-y-3 leading-relaxed">
              <p><strong>Einzigartige Kennwörter:</strong> Ein Passwortmanager kann lange, zufällige Kennwörter erzeugen und aufbewahren. Veröffentlichte Lernbeispiele eignen sich dafür nicht.</p>
              <p><strong>Keine Wiederverwendung:</strong> Wird ein Kennwort bekannt, können Angreifer es bei anderen Diensten ausprobieren.</p>
              <p><strong>Zusätzlicher Schutz:</strong> Nutze unterstützte Passkeys – Anmeldeschlüssel statt eines Passworts – oder zusätzliche Anmeldefaktoren. Auch ein langes Kennwort schützt nicht davor, es auf einer gefälschten Anmeldeseite preiszugeben.</p>
            </div>
            <a className="text-[11px] text-[#615C54] underline underline-offset-2" href="https://pages.nist.gov/800-63-4/sp800-63b/passwords/" target="_blank" rel="noopener noreferrer">Fachliche Grundlage: NIST SP 800-63B-4</a>
          </div>
        </div>
      </div>
    </div>
  );
}
