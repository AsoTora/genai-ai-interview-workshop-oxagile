import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import interview from "../../interview.json";
import {
  insightsRequestSchema,
  interviewInsightsSchema,
} from "~/lib/insights-schema";

const INSIGHTS_MODEL = "gpt-5.4-mini";

export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = insightsRequestSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { transcript } = parsed.data;
  if (transcript.length === 0) {
    return Response.json(
      { error: "Transcript is empty" },
      { status: 400 },
    );
  }

  const dialogue = transcript
    .map((line) => `${line.role === "user" ? "Participant" : "Interviewer"}: ${line.text}`)
    .join("\n");

  const client = new OpenAI();

  try {
    const completion = await client.chat.completions.parse({
      model: INSIGHTS_MODEL,
      reasoning_effort: "none",
      messages: [
        {
          role: "system",
          content: `You analyze voice interview transcripts. The survey is titled "${interview.title}". Context: ${interview.description}

Produce faithful insights from the transcript only. Key themes must reflect what the participant actually said. Notable quotes must be participant lines only (user turns), kept short. If there are no strong quotes, use an empty array.`,
        },
        {
          role: "user",
          content: `Transcript:\n\n${dialogue}`,
        },
      ],
      response_format: zodResponseFormat(
        interviewInsightsSchema,
        "interview_insights",
      ),
    });

    const message = completion.choices[0]?.message;
    if (!message?.parsed) {
      return Response.json(
        { error: "Model returned no structured output" },
        { status: 502 },
      );
    }

    return Response.json(message.parsed);
  } catch (err) {
    console.error("Insights generation failed:", err);
    const msg = err instanceof Error ? err.message : "Insights request failed";
    return Response.json({ error: msg }, { status: 502 });
  }
}
