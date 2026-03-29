import type { InterviewInsights } from "~/lib/insights-schema";

type Props = {
  insights: InterviewInsights | null;
  loading: boolean;
  error: string | null;
};

export function InsightsPanel({ insights, loading, error }: Props) {
  if (!loading && !error && !insights) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl border border-brand-light bg-gray-50/80 p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-brand-navy">Insights</h2>

      {loading && (
        <p className="text-sm text-brand-grey">Generating insights…</p>
      )}

      {error && !loading && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {insights && !loading && (
        <div className="space-y-6 text-brand-dark">
          <section>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-grey">
              Summary
            </h3>
            <p className="leading-relaxed">{insights.summary}</p>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-grey">
              Key themes
            </h3>
            <ul className="list-inside list-disc space-y-1 leading-relaxed">
              {insights.keyThemes.map((theme, i) => (
                <li key={i}>{theme}</li>
              ))}
            </ul>
          </section>

          {insights.notableQuotes.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-grey">
                Notable quotes
              </h3>
              <ul className="space-y-3">
                {insights.notableQuotes.map((q, i) => (
                  <li
                    key={i}
                    className="border-l-4 border-brand-red/70 pl-4 italic leading-relaxed text-brand-dark"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
