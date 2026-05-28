import React, { useState } from "react";
import { Link2, AlertOctagon, HelpCircle, AlertTriangle, ShieldCheck } from "lucide-react";

interface ParsedUrl {
  isValid: boolean;
  raw: string;
  scheme: string;
  subdomain: string;
  domain: string;
  tld: string;
  pathAndQuery: string;
  warnings: string[];
}

export default function Inspector() {
  const [urlInput, setUrlInput] = useState("");
  const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);

  const handleInspect = () => {
    let cleanUrl = urlInput.trim();
    if (!cleanUrl) return;

    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "http://" + cleanUrl;
    }

    try {
      const urlObj = new URL(cleanUrl);
      const hostname = urlObj.hostname;
      const protocol = urlObj.protocol;
      const pathAndQuery = urlObj.pathname + urlObj.search + urlObj.hash;

      const parts = hostname.split(".");
      let scheme = protocol.replace(":", "");
      let subdomain = "";
      let domain = "";
      let tld = "";
      let warnings: string[] = [];

      if (parts.length === 1) {
        domain = parts[0];
      } else if (parts.length === 2) {
        domain = parts[0];
        tld = parts[1];
      } else {
        const isMultiPartTld = ["co.uk", "com.de", "org.de", "net.de", "or.at", "ac.at", "gov.uk"].includes(
          parts[parts.length - 2] + "." + parts[parts.length - 1]
        );

        if (isMultiPartTld && parts.length >= 3) {
          tld = parts[parts.length - 2] + "." + parts[parts.length - 1];
          domain = parts[parts.length - 3];
          subdomain = parts.slice(0, parts.length - 3).join(".");
        } else {
          tld = parts[parts.length - 1];
          domain = parts[parts.length - 2];
          subdomain = parts.slice(0, parts.length - 2).join(".");
        }
      }

      const brands = ["paypal", "microsoft", "amazon", "google", "apple", "netflix", "fedex", "dhl", "sparkasse", "postbank", "sparda", "volksbank"];
      for (const brand of brands) {
        if (subdomain.toLowerCase().includes(brand) && !domain.toLowerCase().includes(brand)) {
          warnings.push(`Brand-Täuschung: Die Marke '${brand}' steht in der Subdomain (${subdomain}), der echte Webhost ist aber '${domain}.${tld}'! Kriminelle tarnen bösartige Server gerne so.`);
        }
      }

      const riskyTlds = ["cn", "ru", "xyz", "top", "work", "fit", "buzz", "click", "download", "tk", "cf", "ga", "ml", "gq", "info", "support"];
      if (riskyTlds.includes(tld.toLowerCase())) {
        warnings.push(`Ungewöhnliche Endung (.${tld}): Das Länder- oder Themenkürzel wird überdurchschnittlich häufig für Phishing und Malware registriert. Größte Vorsicht!`);
      }

      if (domain.includes("paypa1") || domain.includes("netf1ix") || domain.includes("pаypal") || domain.includes("аmazon")) {
        warnings.push(`Look-alike Zeichenkette (Homoglyph): Der Domainname imitiert eine bekannte Marke mit leicht geänderten Zahlen oder fremdländischem Unicode (z.B. cyrillisches 'а').`);
      }

      if (domain.split("-").length > 2) {
        warnings.push(`Verdächtig viele Bindestriche: Betrüger registrieren lange Bindestrich-Ketten wie 'sparkasse-login-online-sicherheit.de', um offiziell zu wirken.`);
      }

      const isIpOfHost = /^[0-9.]+$/.test(hostname);
      if (isIpOfHost) {
        warnings.push(`Nackte IP-Adresse: Der Link nutzt eine IP-Adresse (${hostname}) anstelle eines echten Domainnamens. Das ist für seriöse Firmen-Mails extrem untypisch.`);
      }

      setParsedUrl({
        isValid: true,
        raw: urlInput,
        scheme,
        subdomain,
        domain,
        tld,
        pathAndQuery,
        warnings
      });

    } catch (e) {
      setParsedUrl({
        isValid: false,
        raw: urlInput,
        scheme: "",
        subdomain: "",
        domain: "",
        tld: "",
        pathAndQuery: "",
        warnings: ["Ungültiges URL-Format. Bitte prüfen Sie die Eingabe."]
      });
    }
  };

  return (
    <div className="space-y-6" id="inspector-tool-root">
      
      {/* Header Info */}
      <div className="border-b border-[#1D1B18] pb-5">
        <h2 className="text-xl font-black text-[#1D1B18] flex items-center gap-2 uppercase font-mono">
          <Link2 className="w-5 h-5 text-[#FF5500]" />
          DOMÄNEN-SEZIERER // LINK-INSPEKTIONSMODUL
        </h2>
        <p className="text-xs text-[#615C54] font-mono mt-1">
          RECHNERISCHE ZERLEGUNG VON LINKS ZUR ENTLARVUNG VERREISENDER SUBDOMÄNEN UND SPOOFING-ZONEN.
        </p>
      </div>

      <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
        
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-[#615C54] uppercase tracking-wider block font-black">Verdächtigen Link / URL im Chassisspeicher eintragen</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://login.paypal.de.secure-webpage.cn/reverify/auth"
              className="flex-1 bg-white border-2 border-[#1D1B18] px-4 py-3 text-sm text-[#1D1B18] placeholder-[#615C54]/45 outline-none font-mono rounded-none focus:bg-[#FAF8F5] shadow-inner"
              id="inspect-input"
            />
            <button
              onClick={handleInspect}
              className="bg-[#1D1B18] hover:bg-[#FF5500] text-white font-mono font-bold py-3 px-6 rounded-none text-xs uppercase tracking-wider transition shrink-0 active:translate-y-0.5"
              id="inspect-button"
            >
              SEZIEREN
            </button>
          </div>
        </div>

        {/* Quick Demo Demos */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[#615C54] font-mono text-[10px] uppercase font-bold">SCHNELLE DEMO_SÄTZE:</span>
          <button
            onClick={() => { setUrlInput("login.paypal-sicherheit.de.verify-tokens.cn/pay"); }}
            className="text-[9px] bg-white border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-1 px-2.5 rounded-none shadow-[1.5px_1.5px_0px_#1D1B18] hover:bg-[#FAF8F5]"
          >
            PAYPAL CLONE (.CN)
          </button>
          <button
            onClick={() => { setUrlInput("https://www.amazon.de/gp/css/homepage.html"); }}
            className="text-[9px] bg-white border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-1 px-2.5 rounded-none shadow-[1.5px_1.5px_0px_#1D1B18] hover:bg-[#FAF8F5]"
          >
            ECHTES AMAZON PRIME
          </button>
          <button
            onClick={() => { setUrlInput("postbank-sicherungsverfahren-anmelden2026.ru"); }}
            className="text-[9px] bg-white border-2 border-[#1D1B18] text-[#1D1B18] font-mono font-black py-1 px-2.5 rounded-none shadow-[1.5px_1.5px_0px_#1D1B18] hover:bg-[#FAF8F5]"
          >
            POSTBANK CAMOUFLAGE (.RU)
          </button>
        </div>

      </div>

      {parsedUrl && parsedUrl.isValid && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Anatomy Analyzer */}
          <div className="lg:col-span-12 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2">
              ANATOMIE DER URL // INTEGRITÄTSPRÜFUNG
            </h3>

            {/* Split Visual Pipeline */}
            <div className="bg-[#FAF8F5] p-4 border-2 border-[#1D1B18] overflow-x-auto text-nowrap select-all font-mono text-xs flex justify-start items-stretch gap-2 shadow-inner">
              {parsedUrl.scheme && (
                <div className="flex flex-col items-center justify-between border-r border-[#1D1B18]/15 pr-2.5">
                  <span className="text-[#615C54] text-[8px] font-black tracking-widest block uppercase mb-1">PROT_SCHE</span>
                  <span className="text-[#615C54] font-bold">{parsedUrl.scheme}://</span>
                </div>
              )}
              {parsedUrl.subdomain && (
                <div className="flex flex-col items-center justify-between border-r border-[#1D1B18]/15 pr-2.5">
                  <span className="text-[#00A3A6] text-[8px] font-black tracking-widest block uppercase mb-1">SUBDOM_ZEL</span>
                  <span className="text-[#00A3A6] font-extrabold">{parsedUrl.subdomain}.</span>
                </div>
              )}
              <div className="flex flex-col items-center justify-between bg-white border-2 border-[#FF5500] px-3 py-1 text-center scale-102">
                <span className="text-[#FF5500] text-[8px] font-black tracking-widest block uppercase mb-1 animate-pulse">AKTIVER_WIRT</span>
                <span className="text-[#1D1B18] font-black tracking-tight">{parsedUrl.domain}</span>
              </div>
              <div className="flex flex-col items-center justify-between border-l border-[#1D1B18]/15 pl-2.5">
                <span className="text-[#00A3A6] text-[8px] font-black tracking-widest block uppercase mb-1">TLD_ZONE</span>
                <span className="text-[#00A3A6] font-bold">.{parsedUrl.tld}</span>
              </div>
              {parsedUrl.pathAndQuery && (
                <div className="flex flex-col items-center justify-between border-l border-[#1D1B18]/15 pl-2.5">
                  <span className="text-[#615C54] text-[8px] font-black tracking-widest block uppercase mb-1">PFAD_ATT</span>
                  <span className="text-[#615C54] truncate max-w-[200px]" title={parsedUrl.pathAndQuery}>{parsedUrl.pathAndQuery}</span>
                </div>
              )}
            </div>

            {/* Verdict Explanation boxes */}
            <div className="p-4 bg-white border-2 border-[#1D1B18] shadow-[3px_3px_0px_#1D1B18] space-y-2.5 font-mono text-xs text-[#1D1B18] uppercase leading-relaxed">
              <p>
                👉 <span className="font-black text-[#FF5500]">DAS KRITISCHE RESULTAT:</span> DER INHABER DIESER WEBSEITE IST EINZIG UND ALLEIN UNTER DER ADRESSE: <span className="font-bold underline text-[#FF5500] bg-[#FAF8F5] border border-[#1D1B18] py-0.5 px-2.5">{parsedUrl.domain}.{parsedUrl.tld}</span> REGISTRIERT.
              </p>
              <p className="text-[10px] text-[#615C54] leading-normal font-sans">
                EGAL WIE VIELE BEKANNTE NAMEN WEITER VORNE IN DER SUBDOMAIN STEHEN: ES WIRD ALLES ÜBER DIE INHABERZONE DER HAUPTDOMÄNE VERTEILT. DORT SITZT DER EMPFÄNGERSERVER DER ANMELDEDATEN.
              </p>
            </div>
          </div>

          {/* Warnings List on Left, Guide on Right */}
          <div className="lg:col-span-7 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2">
              SICHERHEITS-DIAGNOSE // ANOMALIE-MELDUNGEN
            </h3>

            {parsedUrl.warnings.length > 0 ? (
              <div className="space-y-3">
                {parsedUrl.warnings.map((warn, idx) => (
                  <div 
                    key={idx}
                    className="bg-white p-4 border-2 border-[#1D1B18] flex gap-3 items-start shadow-[2px_2px_0px_#1D1B18]"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#FF5500] mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-black text-[#FF5500] block uppercase tracking-wider">WARNUNG {idx + 1}</span>
                      <p className="text-xs text-[#1D1B18] leading-relaxed font-sans">{warn}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#00A3A6]/10 p-4 border-2 border-[#00A3A6] flex gap-3 items-start">
                <ShieldCheck className="w-6 h-6 text-[#00A3A6] mt-0.5 shrink-0" />
                <div className="space-y-1 font-mono uppercase text-[#1D1B18] text-xs">
                  <span className="font-black tracking-widest text-[#00A3A6] block">SYS_STATUS: KEINE OFFENSICHTLICHEN AMBIGUITÄTEN</span>
                  <p className="text-[10px] leading-relaxed font-sans text-[#615C54] normal-case">
                    Diese URL verzichtet auf die klassischen gängigen Domänen-Täuschungsaktionen. 
                    Dies garantiert aber noch <strong>keineswegs</strong>, dass es sich um eine absolut vertrauenswürdige Instanz handelt! Prüfen Sie weiterhin den finalen Inhalt.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#F4F1EA] border-2 border-[#1D1B18] shadow-[4px_4px_0px_#1D1B18] p-5 space-y-4">
            <h3 className="text-xs font-black text-[#1D1B18] uppercase tracking-wider font-mono border-b border-[#1D1B18] pb-2 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#00A3A6]" />
              DIREKTIVE FÜR SENDER-IDENTIFIZIERUNG
            </h3>
            
            <div className="space-y-3 text-xs leading-relaxed text-[#1D1B18] font-sans">
              <div className="bg-white p-3 border border-[#1D1B18] font-mono uppercase text-[10px]">
                <span className="font-extrabold text-[#FF5500] block mb-1">🔍 DIE RECHTS-LINKS REGEL</span>
                LEST WEBLINKS GRUNDSÄTZLICH VON RECHTS NACH LINKS. ERTFOLGEN SIE DER ENDUNG (DE/COM) UND NEHMEN DAS ERSTE WORT DANACH... DAS IST DIE ABSOLUTE HERKUNFT.
              </div>
              <p className="font-mono text-[10px] uppercase text-[#615C54] leading-normal pt-1_5">
                BEISPIEL:
                <br />
                <span className="text-[#615C54]">secure.</span>
                <span className="text-[#615C54]">bank.com.</span>
                <span className="text-[#FF5500] font-black underline bg-white px-1 py-0.5 border border-[#1D1B18]">HACKERDOMAIN</span>
                <span className="text-[#00A3A6]">.de</span>
                <br />
                DIE ENDUNG IST .DE, DIE HERKUNFT LINKS DAVON: HACKERDOMAIN. VERBINDUNG ZUR BANK DIREKT NULLKOMMANULL.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
