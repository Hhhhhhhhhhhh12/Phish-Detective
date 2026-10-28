// The Pages build has no backend. Never request live AI from this build.
export const isStaticHosting = import.meta.env.MODE === "github-pages";
export const liveAiEnabled = !isStaticHosting;
