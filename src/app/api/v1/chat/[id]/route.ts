import {
  changeChatName,
  updateChatMessages,
} from "@/app/(app)/_functions/actions";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser();

    if (!user) {
      NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userId: user?.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc", // Fetch in descending order
          },
          take: 20,
        },
      },
    });

    // Reverse the messages to display the latest at the bottom
    if (chat && chat.messages) {
      chat.messages.reverse();
    }

    return NextResponse.json(chat, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const chatExists = await prisma.chat.findUnique({
      where: { id },
    });

    if (!chatExists) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    await prisma.chat.delete({
      where: { id },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { error: "Failed to delete chat" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (body.name) {
      await changeChatName(params.id, body.name);
    } else if (body.message) {
      await updateChatMessages({
        id: params.id,
        content: body.message,
        role: body.role,
      });
    }

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to update chat" },
      { status: 500 }
    );
  }
}
