// Keep the legacy exports aligned with the data used by the application.
// The localised catalogue is the single source for cases and handbook material.
import { getLocalizedCases, getLocalizedLearningModules } from "./utils/i18n";

export const defaultCases = getLocalizedCases("de");
export const learningModules = getLocalizedLearningModules("de");
