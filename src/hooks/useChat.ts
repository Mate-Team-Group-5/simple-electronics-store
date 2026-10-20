import { useState } from 'react';
import { sendChatMessages } from '@/services/chat';
import { ApiError } from '@/utils/fetchClient';
import { useLanguage } from '@/context/LanguageContext';
import type { ChatMessage } from '@/types/ChatMessage';
import type { TranslationKey } from '@/i18n/en';

const STORAGE_KEY = 'chat_messages';

function readSavedMessages(): ChatMessage[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function getErrorKey(error: unknown): TranslationKey {
  if (error instanceof ApiError && error.status === 429) {
    return 'chat.errors.tooManyRequests';
  }

  return 'chat.errors.common';
}

export function useChat(currentProductId: string | null) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(readSavedMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<TranslationKey | null>(null);

  const saveMessages = (nextMessages: ChatMessage[]) => {
    setMessages(nextMessages);

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages));
    } catch {
      // storage can be unavailable (private mode) - chat still works
    }
  };

  const sendMessage = async (text: string) => {
    const content = text.trim();

    if (!content || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content },
    ];

    saveMessages(nextMessages);
    setErrorKey(null);
    setIsLoading(true);

    try {
      const { reply } = await sendChatMessages(
        nextMessages,
        language,
        currentProductId,
      );

      saveMessages([...nextMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      setErrorKey(getErrorKey(error));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    saveMessages([]);
    setErrorKey(null);
  };

  return { messages, isLoading, errorKey, sendMessage, clearChat };
}
