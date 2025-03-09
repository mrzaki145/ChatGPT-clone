import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Chat } from "@/types";
import { unstable_cache } from "next/cache";

export async function getChat(id: string) {
  try {
    const user = await getUser();

    if (!user) {
      return { error: "User not found" };
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        },
      },
    });

    if (chat && chat.messages) {
      chat.messages.reverse();
    }

    return { chat };
  } catch (error) {
    console.error("Failed to fetch chat:", error);
    return { error: "Failed to fetch chat" };
  }
}

export const getChats = unstable_cache(
  async function getChats(userId: string): Promise<Chat[]> {
    try {
      const chats = await prisma.chat.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return chats;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      throw new Error("Failed to fetch chats");
    }
  },
  ["chats"],
  {
    tags: ["chats"],
  }
);

export async function getMessages(chatId: string) {
  new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return { error: "Failed to fetch messages" };
  }
}
