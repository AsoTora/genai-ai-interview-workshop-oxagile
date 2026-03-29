import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voice Interview Workshop" },
    { name: "description", content: "Build a voice-powered survey app with OpenAI Realtime API." },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mb-8 flex items-center gap-5">
          <a href="https://www.oxagile.com/" target="_blank" rel="noreferrer">
            <img src="/logo.svg" alt="Oxagile" className="h-10" />
          </a>
          <span className="text-brand-blue-grey">×</span>
          <a
            href="https://www.genaizurich.ch/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <img src="/favicon.png" alt="" className="h-6 w-6 shrink-0" />
            <span className="text-base font-semibold text-brand-navy">
              GenAI Zürich 2026
            </span>
          </a>
        </div>
        <h1 className="text-center text-4xl font-bold tracking-tight text-brand-navy">
          Voice Interview Workshop
        </h1>
        <p className="mt-4 max-w-md text-center text-lg leading-relaxed text-brand-grey">
          A live-coding workshop building a voice-powered survey app with
          OpenAI&apos;s Realtime API
        </p>
        <Link
          to="/demo"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-lg font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
        >
          Open Demo
          <ArrowIcon />
        </Link>
      </main>

      <footer className="flex items-center justify-center gap-3 border-t border-brand-light px-6 py-5">
        <span className="text-sm text-brand-grey">Presented at</span>
        <a
          href="https://www.genaizurich.ch/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
        >
          <img src="/favicon.png" alt="" className="h-5 w-5 shrink-0" />
          <span className="text-sm font-semibold text-brand-navy">
            GenAI Zürich 2026
          </span>
        </a>
      </footer>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
