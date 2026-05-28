export interface AnalysisMarker {
  id: string;
  category: "sender" | "urgency" | "links" | "content" | "technical";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "safe";
}

export interface EmailScanResult {
  phishScore: number; // 0 to 100
  verdict: "safe" | "suspicious" | "dangerous" | "unknown";
  summary: string;
  markers: AnalysisMarker[];
  technicalDetails: string;
  detectiveTips: string[];
}

export interface SimulationCase {
  id: string;
  brand: string;
  logo: string; // Lucide icon name or emoji
  senderName: string;
  senderEmail: string;
  date: string;
  recipient: string;
  subject: string;
  body: string; // Can support HTML or markdown-like layout
  links: {
    id: string;
    text: string;
    actualUrl: string;
    hoverUrl: string; // The URL that appears on hover
  }[];
  isPhishing: boolean;
  difficulty: "Anfänger" | "Fortgeschritten" | "Experte";
  explainingClues: {
    target: string; // The part of the mail (e.g. "Absender", "Link-Ziel", "Sprache")
    text: string; // Explanation text
    status: "suspicious" | "safe";
  }[];
  detailedExplanation: string;
}

export interface DetectiveProfile {
  xp: number;
  score: number;
  completedCasesCount: number;
  streak: number;
  rank: string; // cadet -> deputy -> inspector -> chief inspector -> master detective
  solvedCaseIds: string[];
  failedCaseIds?: string[]; // Cases where the user guessed incorrectly
}

export interface LearningModule {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  content: string; // markdown or detailed text
  clues: string[];
}
