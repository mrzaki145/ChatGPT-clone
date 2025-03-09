import { updateChatMessages } from "@/app/(app)/_functions/actions";
import { getMessages } from "@/app/(app)/_functions/queries";
import { google } from "@ai-sdk/google";
import { appendClientMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { message, id, system } = await req.json();
  const previousMessages = await getMessages(id);

  if ("error" in previousMessages) {
    // Handle the error case
    return new Response(JSON.stringify({ error: previousMessages.error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = appendClientMessage({
    messages: previousMessages,
    message,
  });

  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    system,
    messages,

    async onFinish({ text }) {
      await updateChatMessages({
        id: id,
        content: message.content,
        role: message.role,
      });

      await updateChatMessages({
        id: id,
        content: text,
        role: "assistant",
      });
    },
  });

  return result.toDataStreamResponse();
}
