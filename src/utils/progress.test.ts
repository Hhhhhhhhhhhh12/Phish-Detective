import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addPetXp, defaultPet, defaultProfile, MODULE_UNLOCK_XP, parsePet, parseProfile, parseLeitnerMap, recordCaseDecision } from "./progress";

describe("permanent pet unlock progress", () => {
  it("keeps the simulator unlocked at the 95 + 20 XP evolution boundary", () => {
    const pet = addPetXp({ ...defaultPet(), xp: 95, totalXp: 95 }, 20);
    expect(pet).toMatchObject({ level: 2, xp: 15, totalXp: 115 });
    expect(pet.totalXp).toBeGreaterThanOrEqual(MODULE_UNLOCK_XP.simulator);
    expect(parsePet(JSON.parse(JSON.stringify(pet)))).toEqual(pet);
  });

  it("migrates legacy level XP and preserves zero instead of replacing it with 15", () => {
    const { totalXp, ...legacy } = defaultPet();
    expect(parsePet({ ...legacy, level: 3, xp: 0 })).toMatchObject({ level: 3, xp: 0, totalXp: 300 });
    expect(parsePet({ ...legacy, level: 1, xp: 0 })).toMatchObject({ xp: 0, totalXp: 0 });
  });

  it("handles several level boundaries and keeps accumulating at maximum level", () => {
    const highLevel = addPetXp(defaultPet(), 1_200);
    expect(highLevel).toMatchObject({ level: 5, xp: 215, totalXp: 1_215 });
    expect(addPetXp(highLevel, 600)).toMatchObject({ level: 5, xp: 815, totalXp: 1_815 });
  });

  it.each([null, [], {}, "Byte", { ...defaultPet(), xp: "15" },
    { ...defaultPet(), totalXp: -20 }, { ...defaultPet(), level: 7 },
    { ...defaultPet(), energy: Infinity }])("rejects malformed pet data: %j", value => {
    expect(parsePet(value)).toBeNull();
  });

  it("never subtracts earned XP for an invalid reward", () => {
    expect(addPetXp(defaultPet(), -10)).toEqual(defaultPet());
    expect(addPetXp(defaultPet(), Number.NaN)).toEqual(defaultPet());
  });
});

describe("simulator round and answer history", () => {
  it("records a correct answer once, including after a saved round is reloaded", () => {
    const correct = recordCaseDecision(defaultProfile(), "case-example", true, true);
    expect(correct).toMatchObject({ xp: 50, score: 10, completedCasesCount: 1, streak: 1, solvedCaseIds: ["case-example"], failedCaseIds: [] });
    const restored = parseProfile(JSON.parse(JSON.stringify(correct)))!;
    expect(recordCaseDecision(restored, "case-example", true, true)).toEqual(restored);
  });

  it("uses the most recent answer, without counting a case as both right and wrong", () => {
    const first = recordCaseDecision(defaultProfile(), "case-example", true, true);
    const retry = recordCaseDecision({ ...first, lastGuess: undefined }, "case-example", false, true);
    expect(retry).toMatchObject({ xp: 60, score: 10, streak: 0, completedCasesCount: 2, solvedCaseIds: [], failedCaseIds: ["case-example"] });
    const corrected = recordCaseDecision({ ...retry, lastGuess: undefined }, "case-example", true, true);
    expect(corrected).toMatchObject({ solvedCaseIds: ["case-example"], failedCaseIds: [] });
  });

  it("repairs overlapping legacy answer lists and rejects unsafe saved shapes", () => {
    expect(parseProfile({ ...defaultProfile(), solvedCaseIds: ["a", "a", "b"], failedCaseIds: ["b"] }))
      .toMatchObject({ solvedCaseIds: ["a"], failedCaseIds: ["b"] });
    expect(parseProfile({ ...defaultProfile(), solvedCaseIds: {} })).toBeNull();
    expect(parseProfile({ ...defaultProfile(), lastGuess: "true" })).toBeNull();
    expect(parseLeitnerMap([1, 2])).toBeNull();
    expect(parseLeitnerMap({ a: "2" })).toBeNull();
  });
});

describe("persistence failures and reloads", () => {
  let saved: Map<string, string>;
  let storage: { getItem: ReturnType<typeof vi.fn>; setItem: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    vi.resetModules();
    saved = new Map();
    storage = {
      getItem: vi.fn((key: string) => saved.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => { saved.set(key, value); }),
    };
    vi.stubGlobal("localStorage", storage);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("uses defaults for invalid JSON without overwriting the original on read", async () => {
    const progress = await import("./progress");
    const storageHelpers = await import("./storage");
    saved.set(progress.PET_STORAGE_KEY, "{broken");
    expect(progress.loadPet()).toEqual(progress.defaultPet());
    expect(storage.setItem).not.toHaveBeenCalled();
    expect(storageHelpers.getStorageIssues()).toContain("invalid");
  });

  it("keeps failed writes available across module changes in the same tab", async () => {
    const progress = await import("./progress");
    const storageHelpers = await import("./storage");
    saved.set(progress.PET_STORAGE_KEY, JSON.stringify(progress.defaultPet()));
    storage.setItem.mockImplementation(() => { throw new DOMException("full", "QuotaExceededError"); });
    const advanced = progress.addPetXp(progress.loadPet(), 100);
    expect(progress.savePet(advanced)).toBe(false);
    expect(progress.loadPet()).toEqual(advanced);
    expect(storageHelpers.getStorageIssues()).toContain("unavailable");
  });

  it("does not crash when the localStorage getter itself is denied", async () => {
    Object.defineProperty(globalThis, "localStorage", { configurable: true, get() { throw new DOMException("blocked", "SecurityError"); } });
    const progress = await import("./progress");
    expect(progress.loadPet()).toEqual(progress.defaultPet());
    const advanced = progress.addPetXp(progress.defaultPet(), 20);
    expect(progress.savePet(advanced)).toBe(false);
    expect(progress.loadPet()).toEqual(advanced);
  });

  it("reloads a migrated save without losing cumulative XP", async () => {
    const progress = await import("./progress");
    const { totalXp, ...old } = progress.defaultPet();
    saved.set(progress.PET_STORAGE_KEY, JSON.stringify({ ...old, level: 4, xp: 0 }));
    const migrated = progress.loadPet();
    expect(progress.savePet(migrated)).toBe(true);
    vi.resetModules();
    const reloaded = await import("./progress");
    expect(reloaded.loadPet()).toMatchObject({ level: 4, xp: 0, totalXp: 600 });
  });

  it("resets only simulator data, preserving Byte and unrelated application keys", async () => {
    const progress = await import("./progress");
    saved.set(progress.PET_STORAGE_KEY, JSON.stringify(progress.addPetXp(progress.defaultPet(), 500)));
    saved.set("unrelated-settings", "keep");
    progress.saveProfile(progress.defaultProfile());
    expect(progress.loadPet().totalXp).toBe(515);
    expect(saved.get("unrelated-settings")).toBe("keep");
    expect(progress.loadProfile().completedCasesCount).toBe(0);
  });

  it("preserves sequential pet rewards from tabs with stale displayed snapshots", async () => {
    const progress = await import("./progress");
    const tabA = progress.loadPet();
    const tabB = progress.loadPet();
    expect(tabA.totalXp).toBe(15);
    expect(tabB.totalXp).toBe(15);
    progress.updatePet(current => progress.addPetXp(current, 100));
    // Tab B has not received its storage event; its action still reads the latest save.
    progress.updatePet(current => progress.addPetXp(current, 20));
    expect(progress.loadPet()).toMatchObject({ totalXp: 135, level: 2, xp: 35 });
    // A later rename from either old screen must preserve the earned reward too.
    progress.updatePet(current => ({ ...current, name: "Byte Two" }));
    expect(progress.loadPet()).toMatchObject({ totalXp: 135, name: "Byte Two" });
  });

  it("merges sequential simulator decisions even before a second tab refreshes", async () => {
    const progress = await import("./progress");
    const tabA = progress.loadProfile();
    const tabB = progress.loadProfile();
    progress.recordStoredCaseDecision("case-a", true, true, tabA.resetRevision);
    progress.recordStoredCaseDecision("case-b", false, false, tabB.resetRevision);
    expect(progress.loadProfile()).toMatchObject({
      xp: 100, completedCasesCount: 2, streak: 2,
      solvedCaseIds: ["case-a", "case-b"], failedCaseIds: [],
    });
    // Selecting a case is metadata-only and must not save an older counter snapshot.
    progress.selectProfileCase("case-c");
    expect(progress.loadProfile()).toMatchObject({ xp: 100, completedCasesCount: 2, activeCaseId: "case-c" });
  });

  it("does not award the same stored round twice when two tabs answer it", async () => {
    const progress = await import("./progress");
    progress.selectProfileCase("case-a");
    const first = progress.recordStoredCaseDecision("case-a", true, true, 0);
    const duplicate = progress.recordStoredCaseDecision("case-a", false, true, 0);
    expect(duplicate).toEqual(first);
    expect(progress.loadProfile()).toMatchObject({ xp: 50, completedCasesCount: 1, lastGuess: true });
  });

  it("does not resurrect a reset when an old tab answers or chooses its next case", async () => {
    const progress = await import("./progress");
    progress.recordStoredCaseDecision("case-a", true, true, 0);
    const oldTab = progress.loadProfile();
    progress.resetProfile("case-a");
    const lateAnswer = progress.recordStoredCaseDecision("case-b", true, true, oldTab.resetRevision);
    expect(lateAnswer).toMatchObject({ xp: 0, completedCasesCount: 0, solvedCaseIds: [], resetRevision: 1 });
    const nextCase = progress.selectProfileCase("case-c");
    expect(nextCase).toMatchObject({ xp: 0, completedCasesCount: 0, solvedCaseIds: [], resetRevision: 1, activeCaseId: "case-c" });
    const newAnswer = progress.recordStoredCaseDecision("case-c", true, true, nextCase.resetRevision);
    expect(newAnswer).toMatchObject({ xp: 50, completedCasesCount: 1, solvedCaseIds: ["case-c"] });
  });
});
