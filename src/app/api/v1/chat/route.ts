import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      // take,

      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(chats, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}

export async function POST(_request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
      },
    });

    revalidatePath("/");

    return NextResponse.json(chat, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}
