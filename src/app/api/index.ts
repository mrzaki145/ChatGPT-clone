import { createFetch, createSchema } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";
import { z } from "zod";

export const $fetch = createFetch({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`,
  plugins: [logger()],
  schema: createSchema({
    "@get/chat": {
      output: z.array(
        z.object({
          id: z.string(),
          name: z.string().nullable(),
          createdAt: z.string(),
        })
      ),
    },
    "@post/chat": {
      output: z.object({
        id: z.string(),
        name: z.string().nullable(),
        createdAt: z.string(),
      }),
    },
    "@get/chat/:id": {
      params: z.object({
        id: z.string(),
      }),
      output: z.object({
        id: z.string(),
        name: z.string().nullable(),
        messages: z.array(
          z.object({
            id: z.string(),
            role: z.enum(["user", "assistant"]),
            content: z.string(),
            createdAt: z.string(),
          })
        ),
      }),
    },
    "@delete/chat/:id": {
      params: z.object({
        id: z.string(),
      }),
      output: z.object({
        success: z.boolean(),
      }),
    },
  }),
});

// export const api = {
//   getChats: (opts?: BetterFetchOption) => $fetch("@get/chat", opts),
//   createChat: (opts?: BetterFetchOption) => $fetch("@post/chat", opts),
//   getChat: (id: string) => $fetch("@get/chat/:id", { params: { id } }),
//   deleteChat: (id: string, opts?: BetterFetchOption) =>
//     $fetch("@delete/chat/:id", { params: { id }, ...opts }),

//   updateChat: (id: string, data: any) => $fetch(`/chat/${id}`),
//   getMessages: (chatId: string) => $fetch(`/messages/${chatId}`),
// };
