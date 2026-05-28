import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of Gemini client to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (aiClient) return aiClient;
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY_MISSING");
  }
  
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
  return aiClient;
}

// 1. Phishing Analysis API
app.post("/api/analyze", async (req: Request, res: Response): Promise<void> => {
  try {
    const { messageText } = req.body;
    if (!messageText || messageText.trim() === "") {
      res.status(400).json({ error: "Bitte geben Sie einen Text zur Analyse ein." });
      return;
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      if (err.message === "GEMINI_API_KEY_MISSING") {
        res.status(500).json({
          error: "API_KEY_MISSING",
          message: "Der Gemini-API-Schlüssel ist nicht in den Secrets konfiguriert. Bitte fügen Sie diesen in Ihren Applet-Einstellungen unter 'Secrets' hinzu."
        });
        return;
      }
      throw err;
    }

    const systemInstruction = `Du bist ein hochqualifizierter IT-Forensiker und Spezialist für Cybersicherheit im Bereich Phishing-Erkennung.
Deine Aufgabe ist es, den bereitgestellten Text (eine E-Mail, SMS, Chat-Nachricht oder ein Link-Inhalt) akribisch zu scannen.
Analysiere folgende Kriterien:
1. Absender & Domänen-Abgleiche (falls Adressen angegeben sind)
2. Emotionale Trigger, Zeitdruck-Szenarien, künstliche Dringlichkeit
3. Aufforderungen und Call-to-Actions (Links, Datenabfragen, Kreditkarteneingaben, Anhänge)
4. Rechtschreibung, Grammatik, Stil untypisch für bekannte Unternehmen
5. Allgemeine Struktur und Plausibilität.

WICHTIG: Antworte AUSSCHLIESSLICH im geforderten JSON-Format. Verwende Deutsch für alle beschreibenden Texte.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        phishScore: { 
          type: Type.INTEGER, 
          description: "Phishing-Wahrscheinlichkeit von 0 (absolut sicher/legitim) bis 100 (definitiv bösartiges Phishing)." 
        },
        verdict: { 
          type: Type.STRING, 
          description: "Eine Einschätzung: 'safe' (sicher), 'suspicious' (verdächtig), 'dangerous' (gefährlich)." 
        },
        summary: { 
          type: Type.STRING, 
          description: "Eine prägnante Zusammenfassung der Ergebnisse auf Deutsch (1-2 Sätze)." 
        },
        markers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Eindeutige ID (z.B. marker-1)" },
              category: { type: Type.STRING, description: "Eine Kategorie: 'sender', 'urgency', 'links', 'content', 'technical'" },
              title: { type: Type.STRING, description: "Kurzer, ausdrucksstarker Titel des Hinweises (Deutsch)" },
              description: { type: Type.STRING, description: "Ausführliche Erklärung, warum dieser Aspekt verdächtig oder ein wichtiges Sicherheitsmerkmal ist (Deutsch)" },
              severity: { type: Type.STRING, description: "Schweregrad des Phishing-Indikators: 'low', 'medium', 'high', oder 'safe' für legitime Bestätigungen" }
            },
            required: ["id", "category", "title", "description", "severity"]
          },
          description: "Eine Liste von konkreten Hinweisen und Spuren (mindestens 3-5), die du im Text gefunden hast."
        },
        technicalDetails: { 
          type: Type.STRING, 
          description: "Eine tiefergehende IT-forensische Erklärung der Angriffsvektoren oder der Unbedenklichkeit auf Deutsch." 
        },
        detectiveTips: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "3 konkrete, handlungsorientierte Tipps für den Benutzer, wie er sich in diesem spezifischen Fall verhalten soll (z.B. Absender-Header prüfen, Website manuell eingeben)."
        }
      },
      required: ["phishScore", "verdict", "summary", "markers", "technicalDetails", "detectiveTips"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analysiere folgende Nachricht auf Phishing:\n\n${messageText}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2
      }
    });

    const resultText = response.text || "{}";
    const cleanedResult = JSON.parse(resultText);
    res.json(cleanedResult);

  } catch (error: any) {
    console.error("Fehler bei der Analyse:", error);
    res.status(500).json({ error: "Fehler bei der KI-Analyse", message: error.message });
  }
});

// 2. Dynamics Simulation Case Generator
app.post("/api/generate-scenario", async (req: Request, res: Response): Promise<void> => {
  try {
    const { brand, difficulty } = req.body;
    
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      if (err.message === "GEMINI_API_KEY_MISSING") {
        res.status(500).json({
          error: "API_KEY_MISSING",
          message: "Der API-Schlüssel fehlt. Verwende stattdessen die Standard-Fälle der Offline-Ermittlung."
        });
        return;
      }
      throw err;
    }

    const brandName = brand || "beliebiges bekanntes Unternehmen (z.B. Amazon, Netflix, eine Bank oder Zoom)";
    const diffLevel = difficulty || "Fortgeschritten";

    const systemInstruction = `Du bist ein Spielleiter für Cybersicherheits-Schulungen.
Deine Aufgabe ist es, einen super spannenden, realistischen Trainings-Fall (E-Mail) zu generieren, bei dem der Nutzer entscheiden muss, ob es Phishing oder legitim ist.

Generiere einen Fall für die Marke bzw. das Thema: "${brandName}".
Der Schwierigkeitsgrad soll sein: "${diffLevel}".

WICHTIG: Entscheide zufällig, ob dieser E-Mail-Fall "Phishing" (isPhishing = true) ODER "Legitim" (isPhishing = false) ist.
- Phishing-Fälle müssen raffinierte, aber enttarnbare Angriffsmerkmale enthalten (beispielsweise eine leicht fehlerhafte Absenderadresse wie 'service@netf1ix-info.support', manipulierte Link-Ziele bei Hovern, subtile Dringlichkeit).
- Legitime Fälle müssen absolut regelkonform sein und z.B. echte Domainstrukturen aufweisen, ohne unaufgeforderte Handlungsaufforderungen oder emotionale Erpressung.

Für das Feld 'body': Schreibe den E-Mail-Body als ansprechenden, gut formatierten Text. Nutze Zeilenumbrüche (\\n) für professionellen Aufbau. Der Text muss typisch für E-Mail-Korrespondenz des ausgewählten Senders sein.
Für das Feld 'links': Es muss mind. ein Link enthalten sein (z.B. Schaltfläche oder anklickbarer Text).
- actualUrl ist der echte Link, wo das Opfer hingeleitet wird.
- hoverUrl ist der Link, der dem Nutzer im E-Mail-Client angezeigt wird, wenn er seine Maus über den Link bewegt. Bei legitimen Fällen stimmen diese meist überein. Bei Phishing-Fällen können sie subtil abweichen oder der actualUrl zeigt auf eine Fake-Domain während hoverUrl seriös aussieht.

Antworte AUSSCHLIESSLICH als JSON-Dokument.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        brand: { type: Type.STRING, description: "Name des Unternehmens (z.B. PayPal, Netflix, Lufthansa, Sparkasse)." },
        logo: { type: Type.STRING, description: "Ein passendes Emoji für das Logo (z.B. 📦 für DHL, 💳 für Sparkasse, 🎬 für Netflix, ✈️ für Lufthansa)." },
        senderName: { type: Type.STRING, description: "Absender-Anzeigename, z.B. 'DHL Paketbenachrichtigung' oder 'Service Team'." },
        senderEmail: { type: Type.STRING, description: "Die genutzte Absender-E-Mail-Adresse (z.B. no-reply@dhl.de oder dhl-paket-storno@mail-service.xyz)" },
        subject: { type: Type.STRING, description: "Die Betreffzeile der E-Mail (spannend, realistisch in Deutsch)." },
        body: { type: Type.STRING, description: "Der vollständige Textkörper (Body) der E-Mail in deutscher Sprache, passend formatiert." },
        links: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Eine ID wie 'link-1'." },
              text: { type: Type.STRING, description: "Der sichtbare Linktext, z.B. 'Zahlung anpassen' oder 'Paket verfolgen'." },
              actualUrl: { type: Type.STRING, description: "Die tatsächliche Ziel-URL (z.B. 'https://paypaI-sicherheit-verifizieren.cn/account' bei Phishing oder 'https://www.paypal.com/signin' bei legitim)." },
              hoverUrl: { type: Type.STRING, description: "Die URL, die der Nutzer auf Hover sieht (meistens harmlos wirkend)." }
            },
            required: ["id", "text", "actualUrl", "hoverUrl"]
          }
        },
        isPhishing: { type: Type.BOOLEAN, description: "Ist dieser Fall Phishing? (true) Oder legitim? (false)" },
        explainingClues: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              target: { type: Type.STRING, description: "Der Teil der E-Mail (z.B. 'Absenderadresse', 'Dringlichkeit', 'Abweichender Link' oder 'Anrede')." },
              text: { type: Type.STRING, description: "Erläuterung, warum dieser Punkt verdächtig oder sicher ist (auf Deutsch)." },
              status: { type: Type.STRING, description: "Entweder 'suspicious' wenn verdächtig/Phishing-Indiz, oder 'safe' wenn vertrauensstiftend." }
            },
            required: ["target", "text", "status"]
          },
          description: "3-4 Beweisstücke (Clues), die der Nutzer nach dem Runden-Ende untersuchen kann."
        },
        detailedExplanation: { type: Type.STRING, description: "Das Schlusswort des Ermittlers, das erklärt, warum diese E-Mail eine Falle war oder warum man ihr vertrauen konnte (Deutsch, lerneffektiv)." }
      },
      required: ["brand", "logo", "senderName", "senderEmail", "subject", "body", "links", "isPhishing", "explainingClues", "detailedExplanation"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Erstelle ein detektivisches Trainingsszenario im JSON-Format.",
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.8
      }
    });

    const resultText = response.text || "{}";
    const cleanedResult = JSON.parse(resultText);
    res.json(cleanedResult);

  } catch (error: any) {
    console.error("Fehler beim Generieren des Szenarios:", error);
    res.status(500).json({ error: "Fehler bei der Szenario-Generierung", message: error.message });
  }
});

// Serve frontend in dev / prod environments
const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  // Integrate Vite server in developer mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  // Serve static dist in production
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Phish Detective Platform] Server gestartet auf Port ${PORT}`);
});
