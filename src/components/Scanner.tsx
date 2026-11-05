import React, { useState } from "react";
import { mockForensicResults } from "./scanner/mockData";
import ScannerResults from "./scanner/ScannerResults";
import { Language } from "../utils/i18n";

export default function Scanner({ language = "de" }: { language?: Language }) {
  const [selected, setSelected] = useState<"paypal" | "general" | null>(null);
  const english = language === "en";

  return (
    <section className="space-y-6" aria-labelledby="example-reports-title">
      <div className="bg-[#F4F1EA] border-2 border-[#1D1B18] p-5 space-y-3">
        <h2 id="example-reports-title" className="text-xl font-black text-[#1D1B18]">
          {english ? "Example reports" : "Beispielberichte"}
        </h2>
        <p className="text-sm text-[#615C54]">
          {english
            ? "Live AI analysis is unavailable in this training version. These are fixed examples, not an analysis of your own messages. No message is sent to an AI service."
            : "Diese Trainingsversion bietet keine Live-KI-Analyse. Die Berichte sind feste Beispiele und keine Prüfung eigener Nachrichten. Es wird keine Nachricht an einen KI-Dienst gesendet."}
        </p>
        <div className="flex flex-wrap gap-3">
          {(["paypal", "general"] as const).map((example) => (
            <button key={example} type="button" aria-pressed={selected === example}
              onClick={() => setSelected(example)}
              className="bg-white border-2 border-[#1D1B18] px-4 py-2 font-bold text-[#1D1B18] hover:bg-[#FAF8F5]">
              {example === "paypal"
                ? (english ? "PayPal example" : "PayPal-Beispiel")
                : (english ? "Phishing example" : "Phishing-Beispiel")}
            </button>
          ))}
        </div>
      </div>
      {selected && <ScannerResults scanResult={mockForensicResults[selected]}
        exampleLabel={english ? "Fixed training example · not a live analysis" : "Festes Trainingsbeispiel · keine Live-Analyse"} />}
    </section>
  );
}
