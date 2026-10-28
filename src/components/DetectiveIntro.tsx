import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Language } from "../utils/i18n";

const mediaRoot = `${import.meta.env.BASE_URL}media/detective/`;

type Props = {
  language: Language;
  onComplete: () => void;
  children?: ReactNode;
};

export default function DetectiveIntro({ language, onComplete, children }: Props) {
  const english = language === "en";
  const [phase, setPhase] = useState<"welcome" | "pov">("welcome");
  // Start with the poster until the browser's motion preference is known.
  const [motion, setMotion] = useState<"unknown" | "allow" | "reduce">("unknown");
  const [introDone, setIntroDone] = useState(false);
  const [introFailed, setIntroFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const started = useRef(false);
  const completed = useRef(false);
  const completeRef = useRef(onComplete);

  useEffect(() => { completeRef.current = onComplete; }, [onComplete]);

  const complete = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    completeRef.current();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(query.matches ? "reduce" : "allow");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (phase !== "pov") return;
    if (motion !== "allow") {
      complete();
      return;
    }
    skipRef.current?.focus({ preventScroll: true });
    // The clip lasts three seconds. Loading or a missing ended event must not
    // turn the introduction into a gate to the training application.
    const timer = window.setTimeout(complete, 8000);
    return () => window.clearTimeout(timer);
  }, [phase, motion, complete]);

  const start = () => {
    if (started.current) return;
    started.current = true;
    if (motion !== "allow") complete();
    else setPhase("pov");
  };

  const playIntro = (video: HTMLVideoElement) => {
    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (videoRef.current === video) setIntroFailed(true);
    });
  };

  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) playIntro(video);
    else {
      video.pause();
      setPaused(true);
    }
  };

  const showIntro = phase === "welcome" && motion === "allow" && !introDone && !introFailed;
  const description = phase === "pov"
    ? (english
      ? "The detective examines the envelope and discovers its hook and fishing line."
      : "Der Detective untersucht den Brief und entdeckt den Haken und die Angelschnur.")
    : (english
      ? "A composed fish detective watches an envelope in an underwater office."
      : "Ein souveräner Fischdetektiv beobachtet einen Brief im Unterwasserbüro.");

  return (
    <section
      className="space-y-6"
      aria-label={english ? "Detective introduction" : "Detektiv-Intro"}
      onKeyDown={(event) => {
        if (phase === "pov" && event.key === "Escape") {
          event.preventDefault();
          complete();
        }
      }}
    >
      <div
        role="group"
        aria-label={description}
        className="relative aspect-video overflow-hidden rounded-xl border border-[#00A3A6]/30 bg-[#071619]"
      >
        {phase === "pov" ? (
          <video
            key="pov"
            ref={videoRef}
            src={`${mediaRoot}pov.mp4`}
            poster={`${mediaRoot}poster.jpg`}
            autoPlay
            muted={!soundOn}
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-contain"
            onCanPlay={(event) => { event.currentTarget.play().catch(complete); }}
            onEnded={complete}
            onError={complete}
          />
        ) : showIntro ? (
          <video
            key="intro"
            ref={videoRef}
            src={`${mediaRoot}intro.mp4`}
            poster={`${mediaRoot}poster.jpg`}
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="h-full w-full object-contain"
            onCanPlay={(event) => { if (!paused) playIntro(event.currentTarget); }}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onEnded={() => setIntroDone(true)}
            onError={() => setIntroFailed(true)}
          />
        ) : (
          <img src={`${mediaRoot}poster.jpg`} alt="" className="h-full w-full object-contain" />
        )}
        {showIntro && (
          <button
            type="button"
            onClick={togglePause}
            className="absolute bottom-2 right-2 rounded border border-[#D9D2B1]/60 bg-[#071619]/95 px-3 py-2 text-xs text-[#FAF8F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]"
          >
            {paused
              ? (english ? "Play intro" : "Intro abspielen")
              : (english ? "Pause intro" : "Intro anhalten")}
          </button>
        )}
      </div>

      {children}

      <div className="space-y-3 pt-2">
        {phase === "pov" ? (
          <button
            ref={skipRef}
            type="button"
            onClick={complete}
            className="w-full rounded-xl bg-[#FF5500] px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#1D1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAF8F5]"
          >
            {english ? "Skip introduction" : "Intro überspringen"}
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="w-full rounded-xl bg-[#FF5500] px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-[#FAF8F5] shadow-[0_4px_25px_rgba(255,85,0,0.25)] hover:bg-[#FAF8F5] hover:text-[#1D1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAF8F5]"
          >
            START
          </button>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p role="status" className="text-xs text-zinc-400">
            {phase === "pov"
              ? (english ? "Examining the envelope …" : "Der Brief wird untersucht …")
              : (motion === "reduce"
                ? (english ? "Reduced motion: direct entry." : "Reduzierte Bewegung: direkter Einstieg.")
                : "")}
          </p>
          <button
            type="button"
            aria-pressed={soundOn}
            onClick={() => setSoundOn(value => !value)}
            className="rounded px-2 py-2 text-xs text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]"
          >
            {english ? "Sound" : "Ton"}: {soundOn ? (english ? "on" : "an") : (english ? "off" : "aus")}
          </button>
        </div>
      </div>
    </section>
  );
}
