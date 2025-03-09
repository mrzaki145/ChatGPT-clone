import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { cache } from "react";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }, _request) => {
      console.log({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
});

export const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
});
