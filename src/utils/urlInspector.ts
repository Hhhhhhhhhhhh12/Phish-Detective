import { parse } from "tldts";

export interface UrlNote {
  code: "assumed-scheme" | "http" | "userinfo" | "ip" | "idn" | "private-suffix" | "unknown-suffix" | "bare-suffix" | "subdomain";
  text: string;
}

export interface ParsedUrl {
  isValid: true;
  scheme: "http" | "https";
  hostname: string;
  port: string;
  subdomain: string;
  domain: string | null;
  publicSuffix: string | null;
  hostKind: "domain" | "ipv4" | "ipv6";
  isPrivateSuffix: boolean;
  hasUserInfo: boolean;
  isIdn: boolean;
  assumedScheme: boolean;
  pathAndQuery: string;
  notes: UrlNote[];
}

export interface InvalidUrl {
  isValid: false;
  error: string;
}

export type UrlInspection = ParsedUrl | InvalidUrl;
const invalid = (error: string): InvalidUrl => ({ isValid: false, error });

/**
 * Local structural inspection only: no DNS, requests, reputation or owner lookup.
 * WHATWG URL determines the host a browser would use. tldts receives that host,
 * never the complete URL, and includes the private part of the Public Suffix List.
 * https://url.spec.whatwg.org/ and https://github.com/remusao/tldts
 */
export function inspectUrl(input: string): UrlInspection {
  const trimmed = input.trim();
  if (!trimmed) return invalid("Bitte gib eine Webadresse für die Zerlegung ein.");
  if (trimmed.length > 4096) return invalid("Diese Übung unterstützt Webadressen mit höchstens 4096 Zeichen.");
  if (/[\u0000-\u0020\u007f\\]/u.test(trimmed)) {
    return invalid("Die Eingabe enthält Leerzeichen, Steuerzeichen oder Rückstriche. Verwende eine vollständige Webadresse; Leerzeichen im Pfad lassen sich als %20 schreiben.");
  }

  const schemeMatch = trimmed.match(/^([a-z][a-z\d+.-]*):/i);
  // A bare domain with a port (example.com:8443) is not a custom URL scheme.
  const bareHostWithPort = /^(?:[^:/?#@]+\.[^:/?#@]+|localhost):\d+(?=[/?#]|$)/i.test(trimmed);
  let candidate = trimmed;
  let assumedScheme = false;

  if (schemeMatch && !bareHostWithPort) {
    if (!/^https?$/i.test(schemeMatch[1])) {
      return invalid("Hier lassen sich nur HTTP- und HTTPS-Webadressen zerlegen. Andere Protokolle wie mailto: oder javascript: werden nicht verarbeitet.");
    }
    if (!/^https?:\/\/[^/?#]/i.test(trimmed)) {
      return invalid("Bitte schreibe das Protokoll vollständig, zum Beispiel https://example.com/.");
    }
  } else {
    if (/^[/?#]/.test(trimmed) && !/^\/\/[^/?#]/.test(trimmed)) {
      return invalid("Ein Pfad allein reicht nicht aus. Bitte gib auch den Hostnamen an, zum Beispiel example.com/pfad.");
    }
    candidate = trimmed.startsWith("//") ? `https:${trimmed}` : `https://${trimmed}`;
    assumedScheme = true;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return invalid("Hier lassen sich nur HTTP- und HTTPS-Webadressen zerlegen.");
    }

    const hostname = url.hostname;
    const hostForSuffix = hostname.replace(/\.$/, "");
    const suffix = parse(hostForSuffix, { allowPrivateDomains: true, extractHostname: false });
    if (!suffix.hostname || (!suffix.isIp && hostForSuffix.split(".").some((part) => !part))) {
      return invalid("Der Hostname lässt sich nicht zerlegen. Prüfe die Schreibweise, Punkte und gegebenenfalls die Klammern einer IPv6-Adresse.");
    }

    const hostKind = suffix.isIp ? (hostname.startsWith("[") ? "ipv6" : "ipv4") : "domain";
    const knownSuffix = suffix.isIcann === true || suffix.isPrivate === true;
    // Never promote the fallback for an unknown/reserved suffix to a claimed
    // registrable domain. A suffix match is never an ownership check.
    const domain = knownSuffix ? suffix.domain : null;
    const publicSuffix = knownSuffix ? suffix.publicSuffix : null;
    const subdomain = domain ? suffix.subdomain || "" : "";
    const authority = candidate.slice(candidate.indexOf("://") + 3).split(/[/?#]/, 1)[0];
    const hasUserInfo = authority.includes("@");
    const isIdn = hostForSuffix.split(".").some((label) => label.startsWith("xn--"));
    const notes: UrlNote[] = [];

    if (assumedScheme) notes.push({ code: "assumed-scheme", text: "Für die Zerlegung wurde https:// ergänzt. Ob der Host HTTPS anbietet oder überhaupt erreichbar ist, wurde nicht geprüft." });
    if (url.protocol === "http:") notes.push({ code: "http", text: "HTTP bietet keine Transportverschlüsselung. Gib dort keine Zugangsdaten ein. Auch HTTPS allein wäre kein Beleg für einen vertrauenswürdigen Anbieter." });
    if (hasUserInfo) notes.push({ code: "userinfo", text: "Vor dem @ stehen URL-Anmeldedaten, nicht der Zielhost. Entscheidend ist der Host nach dem @. Anmeldedaten werden im Ergebnis nicht wiedergegeben." });
    if (suffix.isIp) notes.push({ code: "ip", text: `Der Zielhost ist eine ${hostKind === "ipv6" ? "IPv6" : "IPv4"}-Adresse. Eine Aufteilung in Domain und öffentliche Endung ist dafür nicht möglich. Das allein sagt nichts über die Vertrauenswürdigkeit aus.` });
    if (isIdn) notes.push({ code: "idn", text: "Der Host enthält einen internationalisierten Domainnamen. Er erscheint hier in seiner ASCII-Schreibweise (Punycode, beginnend mit xn--). Solche Namen sind auch legitim; ähnlich aussehende Zeichen werden hier nicht zuverlässig als Täuschung erkannt." });
    if (suffix.isPrivate) notes.push({ code: "private-suffix", text: `Die Endung ${publicSuffix} gehört zum privaten Hosting-Teil der Public Suffix List. Namen darunter können zu verschiedenen Nutzern gehören. Das Ergebnis weist keinen Betreiber oder Inhaber nach.` });
    if (!suffix.isIp && !knownSuffix) notes.push({ code: "unknown-suffix", text: "Für diesen Host wurde keine bekannte öffentliche Endung in der mitgelieferten Liste erkannt. Es kann sich zum Beispiel um einen lokalen, reservierten oder unbekannten Namen handeln. Eine registrierbare Domain wird deshalb nicht behauptet." });
    if (knownSuffix && !domain) notes.push({ code: "bare-suffix", text: "Der Host entspricht einer öffentlichen Endung. Ein eigener Name oberhalb dieser Endung wurde nicht erkannt." });
    if (subdomain) notes.push({ code: "subdomain", text: "Die Subdomain ist ein Teil des Hostnamens. Bekannte Wörter in ihr belegen keine Verbindung zu einer Marke. Vergleiche den vollständigen Host mit einer unabhängig bekannten Adresse." });

    return {
      isValid: true,
      scheme: url.protocol === "https:" ? "https" : "http",
      hostname,
      port: url.port,
      subdomain,
      domain,
      publicSuffix,
      hostKind,
      isPrivateSuffix: suffix.isPrivate === true,
      hasUserInfo,
      isIdn,
      assumedScheme,
      pathAndQuery: url.pathname + url.search + url.hash,
      notes,
    };
  } catch {
    return invalid("Die Webadresse konnte nicht zerlegt werden. Prüfe Hostname, Port und gegebenenfalls die Klammern einer IPv6-Adresse.");
  }
}
