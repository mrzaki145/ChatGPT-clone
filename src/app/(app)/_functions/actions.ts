"use server";

import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MessageRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createChat(role?: {
  title: string;
  description: string;
}) {
  try {
    const user = await getUser();

    if (!user) {
      return { error: "User not found" };
    }

    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
        name: role?.title || "Untitled Chat",
        system: role?.description || "You are a helpful assistant.",
      },
    });

    revalidatePath("/");

    return { chat };
  } catch (error) {
    console.error("Failed to create chat:", error);
    return { error: "Failed to create chat" };
  }
}

export async function changeChatName(id: string, name: string) {
  try {
    await prisma.chat.update({
      where: { id },
      data: { name },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error changing chat name:", error);
    return { error: "Failed to change chat name" };
  }
}

export async function deleteChat(id: string) {
  try {
    const user = await getUser();

    if (!user) {
      return { error: "User not found" };
    }

    const chatExists = await prisma.chat.findUnique({
      where: { id },
    });

    if (!chatExists) {
      return { error: "Chat not found" };
    }

    await prisma.chat.delete({
      where: { id },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting chat:", error);
    return { error: "Failed to delete chat" };
  }
}

export async function updateChatMessages({
  id,
  content,
  role,
}: {
  id: string;
  content: string;
  role: MessageRole;
}) {
  try {
    const user = await getUser();

    if (!user) {
      return { error: "User not found" };
    }

    await prisma.message.create({
      data: {
        chatId: id,
        userId: user.id,
        content,
        role,
      },
    });

    revalidatePath(`/chat/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating chat messages:", error);
    return { error: "Failed to update chat messages" };
  }
}
