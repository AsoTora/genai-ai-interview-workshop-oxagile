import { z } from "zod";

export const transcriptLineSchema = z.object({
  id: z.string(),
  role: z.enum(["assistant", "user"]),
  text: z.string(),
});

export const insightsRequestSchema = z.object({
  transcript: z.array(transcriptLineSchema),
});

export type TranscriptLine = z.infer<typeof transcriptLineSchema>;

export const interviewInsightsSchema = z.object({
  summary: z
    .string()
    .describe("2–4 sentences capturing the participant's overall stance and takeaways."),
  keyThemes: z
    .array(z.string())
    .min(1)
    .max(8)
    .describe("Short theme labels (a few words each) grounded in the conversation."),
  notableQuotes: z
    .array(z.string())
    .min(0)
    .max(6)
    .describe("Short verbatim or near-verbatim quotes from the participant only."),
});

export type InterviewInsights = z.infer<typeof interviewInsightsSchema>;
