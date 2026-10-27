export interface PetState {
  name: string;
  level: number;
  xp: number;
  energy: number; // 0 - 100
  happiness: number; // 0 - 100
  passwordDefense: number; // 0 - 100
  lastAction: string;
}

export const LEVEL_NAMES = [
  "Unschuldige Kaulquappe",
  "Köder-Phish 🐟",
  "Cyber-Phish mit Sonnenbrille 🕶️🐟",
  "Neon Fire-Phish 🔥🕶️🐟🔥",
  "Supreme Lord-Phish 🔱🦈⚡"
];

export const EVOLUTION_AVATARS = [
  "🐟", // Level 1
  "🐠", // Level 2
  "🕶️🐟", // Level 3
  "⚡🔥🐠🔥⚡", // Level 4
  "🔱🦈🕶️🔥" // Level 5
];

export const GAME_PACKETS_POOL = [
  { text: "dhl-sendung-zoll.cn", isPhish: true, type: "LINK_DOMAIN" },
  { text: "paypal.de", isPhish: false, type: "LINK_DOMAIN" },
  { text: "it-security@company-login.info", isPhish: true, type: "SENDENDE_ADRESSE" },
  { text: "service@amazon.de", isPhish: false, type: "SENDENDE_ADRESSE" },
  { text: "microsoft-activation-key.ru", isPhish: true, type: "LINK_DOMAIN" },
  { text: "accounts.google.com", isPhish: false, type: "LINK_DOMAIN" },
  { text: "netflix-abo-gesperrt.click", isPhish: true, type: "LINK_DOMAIN" },
  { text: "postbank-direkt-support.com", isPhish: true, type: "SENDENDE_ADRESSE" },
  { text: "support@postbank.de", isPhish: false, type: "SENDENDE_ADRESSE" },
  { text: "mfa-token-auth.company-login-portal.info", isPhish: true, type: "LINK_DOMAIN" },
  { text: "elster-steuer-rueckzahlung.de.com", isPhish: true, type: "LINK_DOMAIN" },
  { text: "github.com", isPhish: false, type: "LINK_DOMAIN" }
];
