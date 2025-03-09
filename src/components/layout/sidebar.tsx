"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { createChat } from "@/app/(app)/_functions/actions";
import { type Chat } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SidebarChatsGroup from "./sidebar-chats-group";

interface ChatsListProps {
  chats: Chat[];
}

export function AppSidebar({ chats }: ChatsListProps) {
  const router = useRouter();

  async function handleCreateChat() {
    const { chat } = await createChat();
    if (chat) router.push(`/c/${chat.id}`);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="mb-2 -mx-1 flex items-center justify-between">
          <SidebarTrigger className="size-9" />

          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={handleCreateChat}
          >
            <Image src="/new-icon.svg" alt="" width={18} height={18} />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          <Image src="/chatgpt-icon.svg" alt="Logo" width={24} height={24} />
          <Link href="/" className="text-sm">
            ChatGPT
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarChatsGroup chats={chats} />
      </SidebarContent>
    </Sidebar>
  );
}

// <SidebarFooter>
//   <div className="flex items-center gap-x-2">
//     <Image src="/users-icon.svg" alt="Logo" width={24} height={24} />
//     <span className="text-sm">Invite members</span>
//   </div>
// </SidebarFooter>
