import type { PetState } from "../components/cyberpet/types";
import type { DetectiveProfile } from "../types";
import { readStoredJson, writeStoredJson } from "./storage";

export const MODULE_UNLOCK_XP = {
  dashboard: 0, pet: 0, password: 0, simulator: 80,
  comics: 180, scanner: 280, inspector: 380, handbook: 0,
} as const;

export const PET_STORAGE_KEY = "phish_detective_pet";
export const PROFILE_STORAGE_KEY = "phish_detective_profile_v2";
const MAX_XP = 1_000_000_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isCounter = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= MAX_XP;

export function defaultPet(): PetState {
  return { name: "Byte", level: 1, xp: 15, totalXp: 15, energy: 80,
    happiness: 75, passwordDefense: 30, lastAction: "" };
}

function levelFromTotal(totalXp: number): { level: number; xp: number } {
  let level = 1;
  let xp = totalXp;
  while (level < 5 && xp >= level * 100) {
    xp -= level * 100;
    level += 1;
  }
  return { level, xp };
}

/** Old saves had only level XP. Reconstruct the earned minimum without relocking. */
export function parsePet(value: unknown): PetState | null {
  if (!isRecord(value) || typeof value.name !== "string" || !value.name.trim()
      || !isCounter(value.level) || value.level < 1 || value.level > 5
      || !isCounter(value.xp) || !isCounter(value.energy) || value.energy > 100
      || !isCounter(value.happiness) || value.happiness > 100
      || !isCounter(value.passwordDefense) || value.passwordDefense > 100
      || typeof value.lastAction !== "string"
      || (value.totalXp !== undefined && !isCounter(value.totalXp))) return null;
  const minimumTotal = (value.level * (value.level - 1) / 2) * 100 + value.xp;
  const totalXp = Math.min(MAX_XP, Math.max(minimumTotal, (value.totalXp as number | undefined) ?? minimumTotal));
  return { name: value.name.trim().slice(0, 40), ...levelFromTotal(totalXp), totalXp,
    energy: value.energy, happiness: value.happiness, passwordDefense: value.passwordDefense,
    lastAction: value.lastAction.slice(0, 500) };
}

export function loadPet(): PetState {
  return readStoredJson(PET_STORAGE_KEY, parsePet, defaultPet());
}

export function savePet(pet: PetState): boolean {
  return writeStoredJson(PET_STORAGE_KEY, pet);
}

/** Read immediately before a user action; never persist a stale component snapshot. */
export function updatePet(update: (current: PetState) => PetState): PetState {
  const current = loadPet();
  const next = update(current);
  if (next !== current) savePet(next);
  return next;
}

export function addPetXp(pet: PetState, amount: number): PetState {
  const earned = isCounter(amount) ? amount : 0;
  const totalXp = Math.min(MAX_XP, pet.totalXp + earned);
  return { ...pet, ...levelFromTotal(totalXp), totalXp };
}

export function parseLeitnerMap(value: unknown): Record<string, number> | null {
  if (!isRecord(value)) return null;
  const result: Record<string, number> = Object.create(null);
  for (const [key, count] of Object.entries(value)) {
    if (!isCounter(count) || key.length > 200) return null;
    result[key] = Math.min(2, count);
  }
  return result;
}

export function loadLeitnerMap(): Record<string, number> {
  return readStoredJson("phish_leitner_box", parseLeitnerMap, {});
}

export function saveLeitnerMap(map: Record<string, number>): boolean {
  return writeStoredJson("phish_leitner_box", map);
}

export type SimulatorProfile = DetectiveProfile & {
  activeCaseId?: string;
  lastGuess?: boolean;
  resetRevision: number;
};

export function defaultProfile(): SimulatorProfile {
  return { xp: 0, score: 0, completedCasesCount: 0, streak: 0, rank: "",
    solvedCaseIds: [], failedCaseIds: [], resetRevision: 0 };
}

export function parseProfile(value: unknown): SimulatorProfile | null {
  if (!isRecord(value) || !isCounter(value.xp) || !isCounter(value.score)
      || !isCounter(value.completedCasesCount) || !isCounter(value.streak)
      || typeof value.rank !== "string" || !Array.isArray(value.solvedCaseIds)
      || !value.solvedCaseIds.every(id => typeof id === "string")
      || (value.failedCaseIds !== undefined && (!Array.isArray(value.failedCaseIds)
        || !value.failedCaseIds.every(id => typeof id === "string")))
      || (value.activeCaseId !== undefined && typeof value.activeCaseId !== "string")
      || (value.lastGuess !== undefined && typeof value.lastGuess !== "boolean")
      || (value.resetRevision !== undefined && !isCounter(value.resetRevision))) return null;
  const failedCaseIds = [...new Set((value.failedCaseIds ?? []) as string[])];
  return { xp: value.xp, score: value.score, completedCasesCount: value.completedCasesCount,
    streak: Math.min(value.streak, value.completedCasesCount), rank: value.rank,
    // Legacy data can contain a case in both lists. Treat its last failure as needing review.
    solvedCaseIds: [...new Set(value.solvedCaseIds as string[])].filter(id => !failedCaseIds.includes(id)),
    failedCaseIds, activeCaseId: value.activeCaseId as string | undefined,
    lastGuess: typeof value.activeCaseId === "string" ? value.lastGuess as boolean | undefined : undefined,
    resetRevision: (value.resetRevision as number | undefined) ?? 0 };
}

export function loadProfile(): SimulatorProfile {
  return readStoredJson(PROFILE_STORAGE_KEY, parseProfile, defaultProfile());
}

export function saveProfile(profile: SimulatorProfile): boolean {
  return writeStoredJson(PROFILE_STORAGE_KEY, profile);
}

function updateProfile(update: (current: SimulatorProfile) => SimulatorProfile): SimulatorProfile {
  const current = loadProfile();
  const next = update(current);
  if (next !== current) saveProfile(next);
  return next;
}

export function selectProfileCase(caseId: string): SimulatorProfile {
  return updateProfile(current => ({ ...current, activeCaseId: caseId, lastGuess: undefined }));
}

export function resetProfile(caseId: string): SimulatorProfile {
  return updateProfile(current => ({ ...defaultProfile(), activeCaseId: caseId,
    resetRevision: Math.min(MAX_XP, current.resetRevision + 1) }));
}

/** A response from a tab that has not observed a reset must not revive its old round. */
export function recordStoredCaseDecision(caseId: string, guess: boolean, isPhishing: boolean, expectedResetRevision: number): SimulatorProfile {
  return updateProfile(current => current.resetRevision === expectedResetRevision
    ? recordCaseDecision(current, caseId, guess, isPhishing)
    : current);
}

/** Each displayed round can award practice points once; deliberately reopening it starts a new round. */
export function recordCaseDecision(profile: SimulatorProfile, caseId: string, guess: boolean, isPhishing: boolean): SimulatorProfile {
  if (profile.activeCaseId === caseId && profile.lastGuess !== undefined) return profile;
  const correct = guess === isPhishing;
  const solved = profile.solvedCaseIds.filter(id => id !== caseId);
  const failed = (profile.failedCaseIds ?? []).filter(id => id !== caseId);
  (correct ? solved : failed).push(caseId);
  return { ...profile, xp: Math.min(MAX_XP, profile.xp + (correct ? 50 : 10)),
    score: Math.min(MAX_XP, profile.score + (correct ? 10 + profile.streak * 5 : 0)),
    completedCasesCount: Math.min(MAX_XP, profile.completedCasesCount + 1),
    streak: correct ? Math.min(MAX_XP, profile.streak + 1) : 0,
    solvedCaseIds: solved, failedCaseIds: failed, activeCaseId: caseId, lastGuess: guess };
}
