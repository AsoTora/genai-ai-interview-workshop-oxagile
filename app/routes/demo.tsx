import { useState, useRef, useCallback, useEffect } from "react";
import type { Route } from "./+types/demo";
import interview from "../../interview.json";

type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${interview.title} — Voice Interview Workshop` },
    { name: "description", content: interview.description },
  ];
}

export default function Demo() {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [micActive, setMicActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      sessionRef.current?.close?.();
    };
  }, []);

  const startInterview = useCallback(async () => {
    try {
      setStatus("connecting");
      setError(null);

      const tokenRes = await fetch("/api/token", { method: "POST" });
      if (!tokenRes.ok) {
        const body = await tokenRes.text();
        throw new Error(`Token request failed (${tokenRes.status}): ${body}`);
      }
      const { client_secret } = await tokenRes.json();

      const { RealtimeAgent, RealtimeSession } = await import(
        "@openai/agents/realtime"
      );

      const instructions = [
        `You are a friendly AI interviewer conducting: "${interview.title}".`,
        interview.description,
        `Ask these questions one at a time, waiting for the user's full response before proceeding:`,
        ...interview.questions.map((q, i) => `${i + 1}. ${q}`),
        `Start by greeting the user, then begin with question 1.`,
        `After all questions, thank the participant and say goodbye.`,
      ].join("\n");

      const agent = new RealtimeAgent({
        name: "Interviewer",
        instructions,
      });

      const session = new RealtimeSession(agent);

      sessionRef.current = session;

      await session.connect({ apiKey: client_secret });

      setStatus("connected");
      setMicActive(true);
    } catch (err) {
      console.error("Connection error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Connection failed");
      sessionRef.current = null;
    }
  }, []);

  const stopInterview = useCallback(() => {
    try {
      sessionRef.current?.close?.();
    } catch {
      // ignore close errors
    }
    sessionRef.current = null;
    setStatus("idle");
    setMicActive(false);
  }, []);

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-brand-light">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 max-w-full flex-[1_1_12rem] items-center gap-3">
            <a
              href="https://www.oxagile.com/"
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <img src="/logo.svg" alt="Oxagile" className="h-7 w-auto" />
            </a>
            <span className="min-w-0 break-words text-sm font-medium leading-snug text-brand-grey">
              Voice Interview Workshop
            </span>
          </div>
          <a
            href="https://www.genaizurich.ch/"
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 items-center gap-2"
          >
            <img
              src="/favicon.png"
              alt=""
              width={32}
              height={32}
              className="h-6 w-6 shrink-0"
            />
            <span className="min-w-0 text-sm font-semibold leading-snug text-brand-navy sm:text-base">
              GenAI Zürich 2026
            </span>
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl min-w-0 px-4 py-12 sm:px-6">
        <div className="mb-10 min-w-0">
          <h1 className="break-words text-3xl font-bold tracking-tight text-brand-navy">
            {interview.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-brand-grey">
            {interview.description}
          </p>
        </div>

        <ol className="space-y-4">
          {interview.questions.map((question, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-xl border border-brand-light bg-white p-5 shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                {i + 1}
              </span>
              <p className="pt-0.5 leading-relaxed text-brand-dark">
                {question}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <ConnectionBadge status={status} />
            <MicBadge active={micActive} />
          </div>

          {isConnected ? (
            <button
              type="button"
              onClick={stopInterview}
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-dark px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-brand-navy"
            >
              <StopIcon />
              End Interview
            </button>
          ) : (
            <button
              type="button"
              onClick={startInterview}
              disabled={isConnecting}
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-red px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConnecting ? <Spinner /> : <MicIcon />}
              {isConnecting ? "Connecting…" : "Talk to Interviewer"}
            </button>
          )}

          {error && (
            <p className="max-w-md text-center text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  const config = {
    idle: { label: "Disconnected", dot: "bg-gray-400", text: "text-gray-600" },
    connecting: {
      label: "Connecting",
      dot: "bg-amber-400 animate-pulse",
      text: "text-amber-700",
    },
    connected: {
      label: "Connected",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
    },
    error: { label: "Error", dot: "bg-red-500", text: "text-red-700" },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function MicBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        active ? "text-emerald-700" : "text-gray-500"
      }`}
    >
      <MicSmallIcon active={active} />
      {active ? "Mic on" : "Mic off"}
    </span>
  );
}

function MicSmallIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={active ? "text-emerald-600" : "text-gray-400"}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
      {!active && <line x1="2" x2="22" y1="2" y2="22" />}
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
