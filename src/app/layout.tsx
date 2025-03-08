import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "ChatGPT Clone",
  icons: {
    icon: "/chatgpt-icon.svg",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
