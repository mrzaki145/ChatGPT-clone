import { Metadata } from "next";
import { notFound } from "next/navigation";
import Chat from "../../_components/chat";
import { getChat } from "../../_functions/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { chat } = await getChat(id);

  return {
    title: chat?.name ?? "Untitled Chat",
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;
  const { chat } = await getChat(id);

  if (!chat) {
    notFound();
  }

  return <Chat chatId={chat.id} initialMessages={chat?.messages} />;
}

export default Page;
