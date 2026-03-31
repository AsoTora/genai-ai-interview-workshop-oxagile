import type { Route } from "./+types/demo";
import interview from "../../interview.json";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${interview.title} — Oxagile Voice Agent Workshop` },
    { name: "description", content: interview.description },
  ];
}

export default function Demo() {
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
              Oxagile Voice Agent Workshop
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

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2.5 rounded-xl bg-brand-red px-8 py-4 text-lg font-semibold text-white opacity-60 shadow-lg cursor-not-allowed"
          >
            <MicIcon />
            Talk to Interviewer
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-brand-grey">
          Voice connection will be enabled in the next workshop step.
        </p>
      </div>
    </main>
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
