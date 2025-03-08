"use client";

import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  chat: Awaited<ReturnType<typeof useChat>>;
}

function MessagesList({ chat }: Props) {
  const { messages } = chat;
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({
        // behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-y-6 text-sm">
      {messages.map((message) => (
        <Fragment key={message.id}>
          {message.role === "user" ? (
            <UserMessage>{message.content}</UserMessage>
          ) : (
            <BotMessage>{message.content}</BotMessage>
          )}
        </Fragment>
      ))}

      {chat.status == "submitted" && <BotMessageSkeleton />}

      <div ref={lastElementRef} />
    </div>
  );
}

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-200/10 ms-auto w-fit lg:max-w-[70%] px-4 p-3 rounded-2xl ">
      <ReactMarkdown>{String(children)}</ReactMarkdown>
    </div>
  );
}

function BotMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-x-4">
      <Image
        src="/chatgpt-icon.svg"
        alt="ChatGPT"
        width={32}
        height={32}
        className="mt-2"
      />

      <div className="flex-1 prose">
        <ReactMarkdown
          components={{
            pre: "span",
            // code({ node, inline, className, children, ...props }) {
            //   const match = /language-(\w+)/.exec(className || "");
            //   return !inline && match ? (
            //     <SyntaxHighlighter
            //       children={String(children).replace(/\n$/, "")}
            //       language={match[1]}
            //       PreTag="div"
            //       {...props}
            //     />
            //   ) : (
            //     <code className={className} {...props}>
            //       {children}
            //     </code>
            //   );
            // },
          }}
        >
          {String(children)}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function BotMessageSkeleton() {
  return (
    <div className="flex items-start gap-x-4">
      <Image src="/chatgpt-icon.svg" alt="ChatGPT" width={32} height={32} />

      <div className="flex-1 space-y-2">
        <p>Thinking...</p>
      </div>
    </div>
  );
}

export { BotMessage, MessagesList, UserMessage };
