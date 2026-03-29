export interface TranscriptEntry {
  id: string;
  role: "assistant" | "user";
  text: string;
}

// Mirrors the RealtimeItem shape from @openai/agents/realtime
// https://platform.openai.com/docs/api-reference/realtime
export interface RealtimeHistoryItem {
  itemId: string;
  type: string;
  role?: string;
  status?: string;
  content?: Array<{
    type: string;
    text?: string;
    transcript?: string | null;
  }>;
}

export function extractTranscript(
  history: RealtimeHistoryItem[],
): TranscriptEntry[] {
  const entries: TranscriptEntry[] = [];

  for (const item of history) {
    if (item.type !== "message") continue;
    if (item.role !== "assistant" && item.role !== "user") continue;

    const text = extractText(item);
    if (!text) continue;

    entries.push({ id: item.itemId, role: item.role, text });
  }

  return entries;
}

function extractText(item: RealtimeHistoryItem): string {
  if (!item.content?.length) return "";

  const parts: string[] = [];
  for (const c of item.content) {
    if (c.type === "input_text" && c.text) {
      parts.push(c.text);
    } else if (c.type === "input_audio" && c.transcript) {
      parts.push(c.transcript);
    } else if (c.type === "output_text" && c.text) {
      parts.push(c.text);
    } else if (c.type === "output_audio" && c.transcript) {
      parts.push(c.transcript);
    }
  }
  return parts.join(" ").trim();
}
