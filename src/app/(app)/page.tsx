"use client";

import { createChat } from "@/app/(app)/_functions/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function Home() {
  const router = useRouter();
  async function handleCreateChat() {
    const { chat } = await createChat();
    if (chat) router.push(`/c/${chat.id}`);
  }

  return (
    <>
      <div className="flex-1 flex flex-col justify-center align-center">
        <Image
          src="/OpenAI-logo.svg"
          alt="OpenAI"
          width={84}
          height={84}
          className="mb-15 mx-auto"
        />

        <Button
          size="lg"
          className="max-w-sm mx-auto"
          onClick={handleCreateChat}
        >
          Start a new chat
        </Button>
      </div>
    </>
  );
}

export default Home;
