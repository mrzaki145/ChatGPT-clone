"use client";

import { Message } from "ai";
import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  messages: Message[];
  chatStatus: string;
}

function MessagesList({ messages, chatStatus }: Props) {
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastElementRef.current) return;

    lastElementRef.current.scrollIntoView();
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

      {chatStatus === "submitted" && <BotMessageSkeleton />}

      <div ref={lastElementRef} />
    </div>
  );
}

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-200/10 ms-auto w-fit lg:max-w-[70%] px-4 p-3 rounded-2xl">
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
        className="mt-1"
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

      <div className="flex-1 space-y-2 mt-1.5">
        <p>Thinking...</p>
      </div>
    </div>
  );
}

export { BotMessage, MessagesList, UserMessage };
