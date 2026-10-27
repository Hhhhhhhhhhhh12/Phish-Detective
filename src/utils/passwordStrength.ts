export interface PasswordEvaluation {
  score: number; // 0 to 4
  crackTime: string;
  level: "Schwach" | "Mittel" | "Sehr Stark";
  feedback: string[];
}

export function evaluatePassword(val: string): PasswordEvaluation {
  const feedbacks: string[] = [];
  let score = 0;

  if (!val) {
    return {
      score: 0,
      crackTime: "Unter einer Millisekunde (Sofort)",
      level: "Schwach",
      feedback: []
    };
  }

  // Length analysis
  if (val.length >= 8) score++;
  if (val.length >= 12) score++;
  if (val.length >= 16) score++;

  // Character variety
  const hasLower = /[a-z]/.test(val);
  const hasUpper = /[A-Z]/.test(val);
  const hasDigit = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);

  const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
  if (varietyCount >= 3) score++;

  // Estimate Crack Time (simulated formula based on entropy)
  let crackTime = "Sofort (< 1 Sekunde)";
  let level: "Schwach" | "Mittel" | "Sehr Stark" = "Schwach";

  if (val.length < 6) {
    crackTime = "Unter einer Millisekunde (Sofort)";
    level = "Schwach";
    feedbacks.push("🚨 Zu kurz! Passwörter unter 8 Zeichen werden unmittelbar durch Wörterbuch-Angriffe geknackt.");
  } else if (score <= 1) {
    crackTime = "Wenige Sekunden";
    level = "Schwach";
    feedbacks.push("⚠️ Sehr geringe Zeichenvielfalt. Fügen Sie Großbuchstaben, Zahlen oder Sonderzeichen ein.");
  } else if (score === 2) {
    crackTime = "ca. 5 Minuten bis 1 Tag (Heuristische Suche)";
    level = "Schwach";
    feedbacks.push("⚠️ Mäßige Länge. Für Angreifer-Cluster spielerisch berechenbar.");
  } else if (score === 3) {
    crackTime = "ca. 10 Monate bis 50 Jahre";
    level = "Mittel";
    feedbacks.push("👍 Gute Länge! Um es im Alltag unhackbar zu machen, aktivieren Sie zusätzlich Zwei-Faktor-Authentifizierung (2FA).");
  } else if (score >= 4) {
    crackTime = "Mehrere Jahrtausende (unbezwingbar)";
    level = "Sehr Stark";
    feedbacks.push("✨ Erstklassige Festung! Durch die hohe Länge widersteht dieses Kennwort jedem Brute-Force-Cluster.");
  }

  // Common dangerous patterns
  if (/1234/.test(val) || /qwert/i.test(val) || /pass/i.test(val) || /hallo/i.test(val)) {
    score = Math.max(0, score - 2);
    crackTime = "Sofort (Beliebtes Opfermuster)";
    level = "Schwach";
    feedbacks.push("❌ Enthält triviale Tastaturmuster (wie '1234' oder 'password'). Hacker-Wörterbücher prüfen diese zuerst!");
  }

  return {
    score,
    crackTime,
    level,
    feedback: feedbacks
  };
}
export default evaluatePassword;
