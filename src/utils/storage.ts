/** Browser storage with a session-only fallback when persistence is unavailable. */
export type StorageIssue = "unavailable" | "invalid";

const sessionValues = new Map<string, string | null>();
const pendingValues = new Set<string>();
const issues = new Set<StorageIssue>();
const changeListeners = new Set<() => void>();
const issueListeners = new Set<() => void>();

function recordIssue(issue: StorageIssue) {
  if (issues.has(issue)) return;
  issues.add(issue);
  // Reads can happen inside a React state initializer. Notify after rendering.
  queueMicrotask(() => issueListeners.forEach(listener => listener()));
}

export function getStorageIssues(): StorageIssue[] {
  return [...issues];
}

/** Returns an unsubscribe callback; listeners never receive stored user data. */
export function subscribeStorageIssues(listener: () => void): () => void {
  issueListeners.add(listener);
  return () => { issueListeners.delete(listener); };
}

/** Same-tab writes and other-tab storage changes; returns an unsubscribe callback. */
export function subscribeStorageChanges(listener: () => void): () => void {
  changeListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key?.startsWith("phish_") || event.key === null) listener();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    changeListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

export function readStoredString(key: string): string | null {
  // A failed write must not be replaced by an older value on the next read.
  if (pendingValues.has(key)) return sessionValues.get(key) ?? null;
  try {
    const value = globalThis.localStorage.getItem(key);
    sessionValues.set(key, value);
    return value;
  } catch {
    recordIssue("unavailable");
    return sessionValues.get(key) ?? null;
  }
}

export function writeStoredString(key: string, value: string): boolean {
  sessionValues.set(key, value);
  let persisted = true;
  try {
    globalThis.localStorage.setItem(key, value);
    pendingValues.delete(key);
  } catch {
    pendingValues.add(key);
    recordIssue("unavailable");
    persisted = false;
  }
  changeListeners.forEach(listener => listener());
  return persisted;
}

export function readStoredJson<T>(key: string, parse: (value: unknown) => T | null, fallback: T): T {
  const raw = readStoredString(key);
  if (raw === null) return fallback;
  try {
    const parsed = parse(JSON.parse(raw));
    if (parsed !== null) return parsed;
  } catch {
    // Syntax errors and structurally invalid data have the same safe fallback.
  }
  recordIssue("invalid");
  return fallback;
}

export function writeStoredJson(key: string, value: unknown): boolean {
  return writeStoredString(key, JSON.stringify(value));
}
