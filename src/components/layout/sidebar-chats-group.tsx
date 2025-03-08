"use client";

import { changeChatName, deleteChat } from "@/app/(app)/_functions/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { Button, LoadingButton } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";

interface ChatsListProps {
  chats:
    | {
        id: string;
        name: string | null;
        createdAt: string;
      }[]
    | null;
}

function SidebarChatsGroup({ chats }: ChatsListProps) {
  return (
    <>
      <SidebarGroup className="h-full">
        {chats && chats.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p>No chats yet</p>
          </div>
        ) : chats ? (
          <>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarChatListItem key={chat.id} chat={chat} />
              ))}
            </SidebarMenu>
          </>
        ) : null}
      </SidebarGroup>
    </>
  );
}

interface ChatsListItemProps {
  chat: {
    id: string;
    name: string | null;
    createdAt: string;
  };
}

function SidebarChatListItem({ chat }: ChatsListItemProps) {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);

  const chatName = chat.name ?? "Untitled Chat";

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setIsEditing(!isEditing);
      return;
    }

    if (e.key === "Enter") {
      const newName = editRef.current?.value || "New Chat";
      changeChatName(chat.id, newName);
      setIsEditing(!isEditing);
    }
  }

  function handleBlur() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <SidebarMenuItem
      className={`rounded-sm p-2 ${id == chat.id && "bg-background"}`}
    >
      {isEditing ? (
        <input
          type="text"
          ref={editRef}
          defaultValue={chatName}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full block appearance-none"
        />
      ) : (
        <Link className="block w-full truncate" href={`/c/${chat.id}`}>
          {chatName}
        </Link>
      )}

      {!isEditing && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`absolute end-0 inset-y-0 px-2 rounded-sm outline-hidden  group-hover/menu-item:opacity-100 aria-expanded:opacity-100 transition-opacity ${
                  id == chat.id
                    ? "bg-background opacity-100"
                    : "bg-sidebar opacity-0"
                }`}
              >
                <EllipsisIcon className="size-5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                  Rename
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <span className="text-red-700">Delete</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteChatDialog chatId={chat.id} closeDialog={setIsOpen} />
        </Dialog>
      )}
    </SidebarMenuItem>
  );
}

function DeleteChatDialog({
  chatId,
  closeDialog,
}: {
  chatId: string;
  closeDialog: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteChat(chatId);
      closeDialog(false);
      toast.success("Chat deleted");
      router.push("/");
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <LoadingButton
          variant="destructive"
          onClick={handleDelete}
          loading={pending}
        >
          Delete
        </LoadingButton>
      </DialogFooter>
    </DialogContent>
  );
}

export default SidebarChatsGroup;
