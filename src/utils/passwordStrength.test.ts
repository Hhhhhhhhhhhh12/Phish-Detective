import { describe, it, expect } from "vitest";
import { evaluatePassword } from "./passwordStrength";

describe("password teaching observations", () => {
  it("has no security verdict for an empty example", () => {
    expect(evaluatePassword("")).toEqual({
      length: 0,
      level: "Leer",
      hasObviousPattern: false,
      feedback: [],
    });
  });

  it("does not describe a single Unicode code point as a repetition", () => {
    const result = evaluatePassword("😀");
    expect(result.length).toBe(1);
    expect(result.level).toBe("Kurzes Beispiel");
    expect(result.hasObviousPattern).toBe(false);
  });

  it("does not award strength for character-class complexity in a short example", () => {
    const result = evaluatePassword("H0f_f@r!");
    expect(result.level).toBe("Kurzes Beispiel");
    expect(result.length).toBe(8);
    expect(result.feedback.join(" ")).toContain("Sonderzeichen allein");
  });

  it.each([
    "SichererText1234!",
    "THIS-IS-A-LONG-PASSWORD-EXAMPLE",
    "qwerty-als-langes-beispiel",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "abcabcabcabcabcabc",
    "😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀",
    "                    ",
  ])("flags a visible pattern without praising the length: %s", example => {
    const result = evaluatePassword(example);
    expect(result.level).toBe("Auffälliges Muster");
    expect(result.hasObviousPattern).toBe(true);
    expect(result.feedback.join(" ")).toContain("Wiederholung");
    expect(result.feedback.join(" ")).not.toContain("Mehr Länge kann");
  });

  it("describes a long phrase without certifying it or estimating crack time", () => {
    const result = evaluatePassword("regenschirm-kiesel-zebra-nebel");
    expect(result.level).toBe("Längeres Beispiel");
    expect(result.hasObviousPattern).toBe(false);
    expect(result.feedback.join(" ")).toContain("veröffentlichtes Beispiel");
    expect(result.feedback.join(" ")).toContain("Wiederverwendung");
    expect(result).not.toHaveProperty("crackTime");
    expect(result).not.toHaveProperty("score");
  });

  it("keeps the length boundary descriptive rather than treating it as certification", () => {
    expect(evaluatePassword("zebra-kiesel-x").level).toBe("Kurzes Beispiel");
    const longer = evaluatePassword("zebra-kiesel-xy");
    expect(longer.length).toBe(15);
    expect(longer.level).toBe("Längeres Beispiel");
    expect(longer.feedback.join(" ")).toContain("vorhersehbar");
  });

  it("counts supplementary Unicode characters once, not as UTF-16 surrogate pairs", () => {
    const result = evaluatePassword("😀🚲🌧️");
    // The variation selector is a code point too; this is not a grapheme count.
    expect(result.length).toBe(4);
    expect(result.level).toBe("Kurzes Beispiel");
  });

  it("treats canonically equivalent Unicode examples consistently", () => {
    expect(evaluatePassword("café-nebel")).toEqual(evaluatePassword("cafe\u0301-nebel"));
  });
});
