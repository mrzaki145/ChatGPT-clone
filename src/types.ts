export interface Message {
  content: string;
  role: "USER" | "ASSISTANT";
}

export interface StoredMessage extends Message {
  id: string;
  chatId: string;
}

export interface Chat {
  id: string;
  name: string | null;
  createdAt: Date;
}

export interface ChatWithMessages extends Chat {
  messages: Message[];
}
