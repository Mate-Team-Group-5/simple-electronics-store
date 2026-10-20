import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  MessageCircle,
  RotateCcw,
  SendHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { matchPath, useLocation } from 'react-router';
import { cn } from 'cn';
import { ChatBubble } from '@/components/molecules/ChatBubble/ChatBubble';
import { ChatProductCard } from '@/components/molecules/ChatProductCard/ChatProductCard';
import { useChat } from '@/hooks/useChat';
import { useProductsByItemId } from '@/hooks/useProductsByItemId';
import { parseChatReply } from '@/utils/parseChatReply';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const MAX_MESSAGE_LENGTH = 1000;

const SUGGESTIONS: TranslationKey[] = [
  'chat.suggestions.photo',
  'chat.suggestions.budget',
  'chat.suggestions.delivery',
];

const PRODUCT_CATEGORIES = ['phones', 'tablets', 'accessories'];

function getCurrentProductId(pathname: string) {
  const match = matchPath('/:category/:productId', pathname);

  if (!match || !PRODUCT_CATEGORIES.includes(match.params.category ?? '')) {
    return null;
  }

  return match.params.productId ?? null;
}

export function ChatWidget() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const currentProductId = getCurrentProductId(pathname);
  const { messages, isLoading, errorKey, sendMessage, clearChat } =
    useChat(currentProductId);
  const [isOpen, setIsOpen] = useState(false);
  const productsByItemId = useProductsByItemId(isOpen);

  const suggestions: TranslationKey[] =
    currentProductId ?
      ['chat.suggestions.thisProduct', ...SUGGESTIONS]
    : SUGGESTIONS;
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ block: 'end' });
    }
  }, [isOpen, messages, isLoading, errorKey]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleProductOpen = () => {
    const isMobile = !window.matchMedia('(min-width: 40rem)').matches;

    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.trim() || isLoading) {
      return;
    }

    sendMessage(draft);
    setDraft('');
  };

  return (
    <>
      {isOpen && (
        <section
          role="dialog"
          aria-label={t('chat.title')}
          className={cn(
            'fixed inset-0 z-50 flex flex-col',
            'bg-card-background text-card-primary-text',
            'tablet:inset-auto tablet:right-6 tablet:bottom-24',
            'tablet:h-[520px] tablet:w-[380px] tablet:rounded-2xl',
            'tablet:border tablet:border-card-border-background tablet:shadow-2xl',
          )}
        >
          <header className="flex items-center gap-3 border-b border-card-border-background px-4 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-purple text-white">
              <Sparkles size={18} />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold">{t('chat.title')}</h2>
              <p className="truncate text-xs text-card-Secondary-text">
                {t('chat.subtitle')}
              </p>
            </div>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                aria-label={t('chat.clear')}
                title={t('chat.clear')}
                className="flex size-8 cursor-pointer items-center justify-center rounded-full text-card-Secondary-text transition-colors hover:text-card-primary-text"
              >
                <RotateCcw size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t('chat.close')}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-card-Secondary-text transition-colors hover:text-card-primary-text"
            >
              <X size={18} />
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 [scrollbar-color:var(--card-border-background)_transparent] [scrollbar-width:thin]"
          >
            <ChatBubble role="assistant">{t('chat.greeting')}</ChatBubble>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => sendMessage(t(key))}
                    className="cursor-pointer rounded-full border border-card-border-background px-3 py-1.5 text-xs transition-colors hover:border-accent-purple hover:text-accent-purple"
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, index) => {
              if (message.role === 'user') {
                return (
                  <ChatBubble
                    key={index}
                    role="user"
                  >
                    {message.content}
                  </ChatBubble>
                );
              }

              const { text, productIds } = parseChatReply(message.content);
              const products = productIds
                .map((id) => productsByItemId.get(id))
                .filter((product) => product !== undefined);

              return (
                <div
                  key={index}
                  className="flex flex-col gap-2"
                >
                  {text && <ChatBubble role="assistant">{text}</ChatBubble>}

                  {products.map((product) => (
                    <ChatProductCard
                      key={product.itemId}
                      product={product}
                      onOpen={handleProductOpen}
                    />
                  ))}
                </div>
              );
            })}

            {isLoading && (
              <div
                role="status"
                aria-label={t('chat.typing')}
                className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-card-border-background px-4 py-3"
              >
                <span className="size-2 animate-bounce rounded-full bg-card-Secondary-text [animation-delay:-0.3s]" />
                <span className="size-2 animate-bounce rounded-full bg-card-Secondary-text [animation-delay:-0.15s]" />
                <span className="size-2 animate-bounce rounded-full bg-card-Secondary-text" />
              </div>
            )}

            {errorKey && (
              <p
                role="alert"
                className="text-center text-sm text-red"
              >
                {t(errorKey)}
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-card-border-background p-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t('chat.placeholder')}
              aria-label={t('chat.placeholder')}
              maxLength={MAX_MESSAGE_LENGTH}
              autoFocus
              className="h-10 min-w-0 flex-1 rounded-full border border-card-border-background bg-transparent px-4 text-sm outline-none placeholder:text-card-Secondary-text focus:border-accent-purple"
            />

            <button
              type="submit"
              disabled={!draft.trim() || isLoading}
              aria-label={t('chat.send')}
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent-purple text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendHorizontal size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t(isOpen ? 'chat.close' : 'chat.open')}
        aria-expanded={isOpen}
        className={cn(
          'fixed right-4 bottom-4 z-40 flex size-14 cursor-pointer items-center justify-center',
          'rounded-full bg-accent-purple text-white shadow-lg',
          'transition-transform hover:scale-105',
          'tablet:right-6 tablet:bottom-6',
          isOpen && 'hidden tablet:flex',
        )}
      >
        {isOpen ?
          <X size={24} />
        : <MessageCircle size={24} />}
      </button>
    </>
  );
}
