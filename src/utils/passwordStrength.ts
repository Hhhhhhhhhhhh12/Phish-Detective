export interface PasswordEvaluation {
  /** Unicode code points after NFC normalization, not UTF-16 code units. */
  length: number;
  level: "Leer" | "Auffälliges Muster" | "Kurzes Beispiel" | "Längeres Beispiel";
  hasObviousPattern: boolean;
  feedback: string[];
}

/**
 * A small, local teaching heuristic. It does not estimate entropy, guessing time,
 * breach exposure, or suitability for a real account. Its pattern list is
 * deliberately limited. The absence of a match is not a security verdict.
 */
export function evaluatePassword(value: string): PasswordEvaluation {
  const normalized = value.normalize("NFC");
  const characters = Array.from(normalized);
  const length = characters.length;

  if (length === 0) {
    return { length: 0, level: "Leer", hasObviousPattern: false, feedback: [] };
  }

  const commonSequence = /1234|4321|qwert|asdf|zxcv|passw(?:ord|ort)|letmein|admin/iu.test(normalized);
  const repeatedCharacter = characters.length > 1 && characters.every(character => character === characters[0]);
  const repeatedBlock = /^(.{1,4})\1{2,}$/u.test(normalized);
  const hasObviousPattern = commonSequence || repeatedCharacter || repeatedBlock;

  // Inspect patterns before generating feedback so a warning cannot coexist
  // with an earlier claim that the same example is exceptionally strong.
  if (hasObviousPattern) {
    return {
      length,
      level: "Auffälliges Muster",
      hasObviousPattern: true,
      feedback: [
        "Dieses Beispiel enthält eine bekannte Zeichenfolge oder Wiederholung. Mehr Zeichen allein machen ein vorhersehbares Muster nicht schwer zu erraten.",
        "Die lokale Musterliste ist klein und ersetzt weder eine Prüfung auf bekannte kompromittierte Kennwörter noch eine Sicherheitsbewertung.",
      ],
    };
  }

  return {
    length,
    level: length < 15 ? "Kurzes Beispiel" : "Längeres Beispiel",
    hasObviousPattern: false,
    feedback: [
      length < 15
        ? "Für ein Kennwort als einzigen Anmeldefaktor empfiehlt NIST mindestens 15 Zeichen. Andere Anwendungsfälle haben andere Anforderungen; Sonderzeichen allein gleichen geringe Länge nicht aus."
        : "Mehr Länge kann das Erraten erschweren, wenn die Auswahl nicht vorhersehbar ist. Eine bekannte Wortfolge oder ein veröffentlichtes Beispiel bleibt ungeeignet für ein echtes Konto.",
      "Kein Muster in dieser kleinen Auswahl erkannt. Das sagt nichts über Wiederverwendung, veröffentlichte Kennwörter oder andere vorhersehbare Wörter aus.",
    ],
  };
}

export default evaluatePassword;
