"use client";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { CircleStop, SendHorizontal } from "lucide-react";

interface Props {
  chat: Awaited<ReturnType<typeof useChat>>;
}

function PromptInput({ chat }: Props) {
  return (
    <Container className="relative pt-1.5 pb-2.5">
      <div className="absolute z-20 inset-x-0 bottom-full h-16 bg-gradient-to-t from-background to-background/25" />

      <form
        onSubmit={chat.handleSubmit}
        className="flex items-center gap-2 bg-zinc-100/5 rounded-full p-1.5 h-12"
      >
        <input
          type="text"
          value={chat.input}
          onChange={chat.handleInputChange}
          placeholder="Ask anything"
          className="w-full text-sm placeholder:text-muted-foreground appearance-none outline-hidden bg-transparent ps-3"
        />

        <Button
          variant="secondary"
          size="icon"
          disabled={chat.status !== "ready" || chat.input === ""}
          onClick={() => {
            if (chat.status === "submitted" || chat.status === "streaming") {
              chat.stop();
            }
          }}
        >
          {chat.status === "submitted" ? <CircleStop /> : <SendHorizontal />}
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-[10px] mt-1.5">
        ChatGPT can make mistakes. Check important info.
      </p>
    </Container>
  );
}

export default PromptInput;
