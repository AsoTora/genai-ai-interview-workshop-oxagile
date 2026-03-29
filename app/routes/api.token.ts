import OpenAI from "openai";

export async function action() {
  const client = new OpenAI();

  const secret = await client.realtime.clientSecrets.create({
    session: {
      type: "realtime",

      //models: https://developers.openai.com/api/docs/models
      model: "gpt-realtime-1.5",
      audio: {
        input: {
          transcription: {
            model: "gpt-4o-mini-transcribe",
            language: "en",
          },
        },
        // https://developers.openai.com/api/docs/guides/text-to-speech#voice-options
        output: { voice: "cedar" },
      },
    },
  });

  return Response.json({ client_secret: secret.value });
}
