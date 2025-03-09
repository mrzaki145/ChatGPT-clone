"use client";

import Container from "@/components/layout/container";
import { useChat } from "@ai-sdk/react";
import { type Chat, type Message } from "@prisma/client";
import { MessagesList } from "./messages";
import PromptInput from "./search-form";

interface Props {
  chat: Chat & {
    messages: Message[];
  };
}

function Chat({ chat }: Props) {
  const aiChat = useChat({
    id: chat.id,
    initialMessages: chat.messages as Message[],
    sendExtraMessageFields: true,
    experimental_prepareRequestBody({ messages, id }) {
      return {
        id,
        system: chat.system,
        message: messages[messages.length - 1],
      };
    },
  });

  return (
    <>
      <div className="relative flex-1 overflow-auto">
        <Container className="absolute z-10 inset-0">
          <div className="pt-4 pb-14">
            <MessagesList
              messages={aiChat.messages}
              chatStatus={aiChat.status}
            />
          </div>
        </Container>
      </div>

      <PromptInput chat={aiChat} />
    </>
  );
}

export default Chat;
