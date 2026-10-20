import { client } from '@/utils/fetchClient';
import type { ChatMessage } from '@/types/ChatMessage';

type ChatResponse = {
  reply: string;
};

export const sendChatMessages = (messages: ChatMessage[]) => {
  return client.post<ChatResponse>('/chat', { messages });
};
