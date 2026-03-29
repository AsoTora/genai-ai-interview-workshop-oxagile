import OpenAI from "openai";
import interview from "../../interview.json";
import { buildInterviewerPrompt } from "~/lib/prompt-builder";

const instructions = buildInterviewerPrompt(interview);

export async function action() {
  const client = new OpenAI();

  const secret = await client.realtime.clientSecrets.create({
    session: {
      type: "realtime",
      // https://platform.openai.com/docs/models
      model: "gpt-realtime-1.5",
      instructions,
      audio: {
        input: {
          transcription: {
            model: "gpt-4o-mini-transcribe",
            language: "en",
          },
          // https://platform.openai.com/docs/guides/realtime-webrtc#noise-cancellation
          noise_reduction: { type: "near_field" },
          // https://platform.openai.com/docs/guides/realtime-model-capabilities#turn-detection
          turn_detection: {
            type: "semantic_vad",
            eagerness: "low",
          },
        },
        // https://platform.openai.com/docs/guides/text-to-speech#voice-options
        output: { voice: "cedar" },
      },
    },
  });

  return Response.json({ client_secret: secret.value });
}
