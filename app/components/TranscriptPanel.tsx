import { useEffect, useRef } from "react";
import type { TranscriptEntry } from "~/lib/transcript";

interface TranscriptPanelProps {
  entries: TranscriptEntry[];
}

export function TranscriptPanel({ entries }: TranscriptPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [entries.length]);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-brand-light py-12 text-sm text-brand-grey">
        Transcript will appear here once the interview begins…
      </div>
    );
  }

  return (
    <div className="flex max-h-[28rem] flex-col gap-3 overflow-y-auto rounded-xl border border-brand-light bg-gray-50/60 p-4">
      {entries.map((entry) => (
        <Bubble key={entry.id} entry={entry} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function Bubble({ entry }: { entry: TranscriptEntry }) {
  const isAssistant = entry.role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isAssistant
            ? "rounded-tl-sm bg-white text-brand-dark shadow-sm ring-1 ring-brand-light"
            : "rounded-tr-sm bg-brand-navy text-white"
        }`}
      >
        <span className="mb-0.5 block text-[0.65rem] font-semibold uppercase tracking-wider opacity-60">
          {isAssistant ? "Interviewer" : "You"}
        </span>
        {entry.text}
      </div>
    </div>
  );
}
