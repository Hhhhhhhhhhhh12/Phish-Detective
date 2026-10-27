import { describe, it, expect } from "vitest";
import { evaluatePassword } from "./passwordStrength";

describe("Password Evaluation Utility", () => {
  it("should handle empty password gracefully", () => {
    const result = evaluatePassword("");
    expect(result.score).toBe(0);
    expect(result.level).toBe("Schwach");
    expect(result.feedback).toEqual([]);
  });

  it("should mark very short passwords as Schwach", () => {
    const result = evaluatePassword("abc1");
    expect(result.level).toBe("Schwach");
    expect(result.feedback[0]).toContain("Zu kurz");
  });

  it("should penalize keyboards or simple dictionary sequences like 1234", () => {
    const result = evaluatePassword("SichererText1234!");
    expect(result.level).toBe("Schwach");
    expect(result.feedback.join(" ")).toContain("Tastaturmuster");
  });

  it("should rate a long multiword passphrase as Sehr Stark", () => {
    const result = evaluatePassword("Regenschirm-Kaffeetasse-Nordsee-Sicherheitsnetz-2026!");
    expect(result.level).toBe("Sehr Stark");
    expect(result.feedback[0]).toContain("Erstklassige Festung");
    expect(result.score).toBeGreaterThanOrEqual(4);
  });
});
