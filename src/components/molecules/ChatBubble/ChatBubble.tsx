import type { ReactNode } from 'react';
import { cn } from 'cn';
import type { ChatRole } from '@/types/ChatMessage';

type ChatBubbleProps = {
  role: ChatRole;
  children: ReactNode;
};

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words',
          isUser ?
            'rounded-br-sm bg-accent-purple text-white'
          : 'rounded-bl-sm bg-card-border-background text-card-primary-text',
        )}
      >
        {children}
      </div>
    </div>
  );
}
