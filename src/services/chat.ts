import { client } from '@/utils/fetchClient';
import type { ChatMessage } from '@/types/ChatMessage';
import type { Language } from '@/context/LanguageContext';

type ChatResponse = {
  reply: string;
};

export const sendChatMessages = (
  messages: ChatMessage[],
  language: Language,
  currentProductId: string | null,
) => {
  return client.post<ChatResponse>('/chat', {
    messages,
    language,
    currentProductId,
  });
};
