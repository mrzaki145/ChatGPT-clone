"use client";

import Container from "@/components/layout/container";
import { Message, useChat } from "@ai-sdk/react";
import { MessagesList } from "./messages";
import PromptInput from "./search-form";

interface Props {
  chatId?: string | undefined;
  initialMessages: Message[];
}

function Chat({ chatId, initialMessages }: Props) {
  const chat = useChat({
    id: chatId,
    initialMessages,
    sendExtraMessageFields: true,
    experimental_prepareRequestBody({ messages, id }) {
      return { message: messages[messages.length - 1], id };
    },
  });

  return (
    <>
      <div className="relative flex-1 overflow-auto">
        <Container className="absolute z-10 inset-0">
          <div className="pt-4 pb-14">
            <MessagesList chat={chat} />
          </div>
        </Container>
      </div>

      <PromptInput chat={chat} />
    </>
  );
}

export default Chat;
