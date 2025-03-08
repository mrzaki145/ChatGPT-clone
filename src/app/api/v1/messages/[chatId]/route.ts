import { getMessages } from "@/app/(app)/_functions/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const messages = await getMessages(params.chatId);
    return NextResponse.json(messages);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
