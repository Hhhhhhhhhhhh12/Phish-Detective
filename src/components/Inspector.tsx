import React, { useState } from "react";
import { Link2, AlertTriangle, HelpCircle, Info } from "lucide-react";
import { inspectUrl, type UrlInspection } from "../utils/urlInspector";

const EXAMPLES = [
  { label: "Subdomain", url: "https://login.bank.example.com/konto" },
  { label: "Name vor dem @", url: "https://bank.example@training.example.org/login" },
  { label: "Internationaler Name", url: "https://bücher.example.org/lesen" },
];

export default function Inspector() {
  const [urlInput, setUrlInput] = useState("");
  const [inspection, setInspection] = useState<UrlInspection | null>(null);
  const parsedUrl = inspection?.isValid ? inspection : null;
  const error = inspection?.isValid === false ? inspection.error : null;

  const changeInput = (value: string) => {
    setUrlInput(value);
    setInspection(null);
  };

  return (
    <div className="space-y-6" id="inspector-tool-root">
      <div className="border-b border-[#1D1B18] pb-5">
        <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase font-mono">
          <Link2 className="w-5 h-5 text-[#FF5500]" aria-hidden="true" />
          DOMÄNEN-SEZIERER // URL-STRUKTUR
        </h2>
        <p className="text-xs text-[#615C54] font-mono mt-2 leading-relaxed">
          Erkenne die Bestandteile einer Webadresse. Das Werkzeug zerlegt nur Text; es prüft weder die Website noch ihren Betreiber.
        </p>
      </div>

      <form
        onSubmit={(event) => { event.preventDefault(); setInspection(inspectUrl(urlInput)); }}
        className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="inspect-input" className="text-[10px] font-mono text-[#615C54] uppercase tracking-wider block font-black">
            Webadresse als Übungseingabe
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="inspect-input"
              type="text"
              inputMode="url"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={urlInput}
              onChange={(event) => changeInput(event.target.value)}
              placeholder="https://login.bank.example.com/konto"
              aria-describedby={`inspect-help${error ? " inspect-error" : ""}`}
              aria-invalid={error ? true : undefined}
              className="min-w-0 flex-1 bg-white border-2 border-[#1D1B18] px-4 py-3 text-sm text-[#1D1B18] placeholder-[#615C54]/60 font-mono rounded-none focus:outline-2 focus:outline-offset-2 focus:outline-[#FF5500] shadow-inner"
            />
            <button type="submit" id="inspect-button" className="bg-[#1D1B18] hover:bg-[#FF5500] text-white font-mono font-bold py-3 px-6 text-xs uppercase tracking-wider transition shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]">
              ZERLEGEN
            </button>
          </div>
          <p id="inspect-help" className="text-xs text-[#615C54] leading-relaxed">
            Die eingegebene Adresse wird nicht aufgerufen, gespeichert oder zur Analyse übertragen. Verwende Übungsdaten ohne echte Kennwörter, private Zugangslinks oder Tokens. Ohne Protokoll wird für die Darstellung HTTPS angenommen.
          </p>
          {error && (
            <p id="inspect-error" role="alert" className="border-2 border-[#FF5500] bg-white p-3 text-sm text-[#1D1B18] flex gap-2 items-start">
              <AlertTriangle className="w-5 h-5 text-[#FF5500] shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[#615C54] font-mono text-[10px] uppercase font-bold">ÜBUNGSBEISPIELE:</span>
          {EXAMPLES.map((example) => (
            <button key={example.label} type="button" onClick={() => changeInput(example.url)} className="text-[10px] bg-white border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-2 px-2.5 shadow-[1.5px_1.5px_0px_#1D1B18] hover:bg-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]">
              {example.label}
            </button>
          ))}
        </div>
      </form>

      {parsedUrl && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" aria-labelledby="inspection-result-title">
          <div className="lg:col-span-12 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 id="inspection-result-title" className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2">
              ANATOMIE DER URL // KEIN SICHERHEITSURTEIL
            </h3>
            <p role="status" className="text-xs text-[#615C54]">Adresse zerlegt. Die Website wurde nicht kontaktiert.</p>

            <div className="bg-[#FAF8F5] p-4 border-2 border-[#1D1B18] break-all select-all font-mono text-sm leading-7 shadow-inner" aria-label="Normalisierte URL-Bestandteile">
              <span className="text-[#615C54]">{parsedUrl.scheme}://</span>
              {parsedUrl.hasUserInfo && <span className="text-[#615C54]">[Anmeldedaten ausgeblendet]@</span>}
              <strong className="text-[#1D1B18] bg-white border-b-2 border-[#FF5500]">{parsedUrl.hostname}</strong>
              {parsedUrl.port && <span className="text-[#615C54]">:{parsedUrl.port}</span>}
              <span className="text-[#615C54]">{parsedUrl.pathAndQuery}</span>
            </div>

            <dl className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white border-2 border-[#1D1B18] p-3 min-w-0">
                <dt className="font-mono font-black text-[#615C54] uppercase mb-2">Zielhost laut URL</dt>
                <dd className="font-mono font-bold break-all text-[#1D1B18]">{parsedUrl.hostname}</dd>
                <dd className="text-[#615C54] mt-2">{parsedUrl.hostKind === "domain" ? "Vollständiger Hostname; kein Nachweis über Inhaber oder Erreichbarkeit." : `${parsedUrl.hostKind === "ipv6" ? "IPv6" : "IPv4"}-Adresse, keine Domain-Aufteilung.`}</dd>
              </div>
              <div className="bg-white border-2 border-[#FF5500] p-3 min-w-0">
                <dt className="font-mono font-black text-[#615C54] uppercase mb-2">Registrierbarer Bereich laut Liste</dt>
                <dd className="font-mono font-bold break-all text-[#1D1B18]">{parsedUrl.domain || "Nicht ermittelt"}</dd>
                <dd className="text-[#615C54] mt-2">Öffentliche Endung plus ein Name davor. Bei Hosting-Diensten kann dieser Bereich einem Nutzer zugeordnet sein; der tatsächliche Betreiber wird nicht ermittelt.</dd>
              </div>
              <div className="bg-white border-2 border-[#1D1B18] p-3 min-w-0">
                <dt className="font-mono font-black text-[#615C54] uppercase mb-2">Subdomain</dt>
                <dd className="font-mono font-bold break-all text-[#1D1B18]">{parsedUrl.subdomain || (parsedUrl.domain ? "Keine" : "Nicht ermittelt")}</dd>
                <dd className="text-[#615C54] mt-2">Zusätzliche Namen vor dem registrierbaren Bereich. Ein Markenwort darin belegt keine Zugehörigkeit.</dd>
              </div>
              <div className="bg-white border-2 border-[#1D1B18] p-3 min-w-0">
                <dt className="font-mono font-black text-[#615C54] uppercase mb-2">Öffentliche Endung</dt>
                <dd className="font-mono font-bold break-all text-[#1D1B18]">{parsedUrl.publicSuffix || "Nicht ermittelt"}</dd>
                <dd className="text-[#615C54] mt-2">Auch mehrteilige Endungen wie co.uk und Hosting-Endungen wie github.io werden berücksichtigt. Eine Endung allein kennzeichnet keinen Betrug.</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2">HINWEISE ZUR STRUKTUR</h3>
            {parsedUrl.notes.length > 0 ? (
              <ul className="space-y-3">
                {parsedUrl.notes.map((note) => (
                  <li key={note.code} className="bg-white p-4 border-2 border-[#1D1B18] flex gap-3 items-start shadow-[2px_2px_0px_#1D1B18]">
                    <Info className="w-5 h-5 text-[#FF5500] mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="text-xs text-[#1D1B18] leading-relaxed">{note.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="bg-white p-4 border-2 border-[#1D1B18] text-xs leading-relaxed text-[#1D1B18]">
                Keine weiteren Strukturhinweise. Auch eine unauffällige Webadresse kann zu einer betrügerischen oder kompromittierten Website führen. Dieses Ergebnis bestätigt keine Sicherheit.
              </p>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#00A3A6]" aria-hidden="true" />
              SO ORDNET MAN DAS ERGEBNIS EIN
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#1D1B18]">
              <p>Beginne beim vollständigen Hostnamen. Die relevante Grenze steht häufig weiter rechts, lässt sich aber nicht immer aus den letzten zwei Wörtern ableiten: co.uk besteht zum Beispiel aus zwei Teilen.</p>
              <p>Die <strong>Public Suffix List</strong> ist eine Liste solcher öffentlichen Endungen. Sie hilft bei der Aufteilung, prüft aber weder Registrierung, Eigentum, Weiterleitungen, Zertifikate noch Seiteninhalte.</p>
              <p>Bei einer unerwarteten Nachricht öffnest du den Anbieter am besten über eine bereits bekannte Adresse oder seine App. Ein vertrauter Markenname irgendwo im Link reicht nicht als Bestätigung.</p>
              <a href="https://publicsuffix.org/learn/" target="_blank" rel="noopener noreferrer" className="inline-block underline underline-offset-2 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]">Hintergrund zur Public Suffix List</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
