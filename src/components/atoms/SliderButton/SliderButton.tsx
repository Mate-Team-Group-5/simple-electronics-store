import type { ComponentProps } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type SliderButtonProps = ComponentProps<'button'> & {
  direction: 'left' | 'right';
};

export function SliderButton({
  direction,
  className,
  type = 'button',
  ...props
}: SliderButtonProps) {
  const { t } = useLanguage();
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      type={type}
      aria-label={t(direction === 'left' ? 'slider.previous' : 'slider.next')}
      className={cn(
        'flex w-8 shrink-0 items-center justify-center',
        'border border-icons text-text-primary',
        'transition-colors hover:border-text-primary',
        className,
      )}
      {...props}
    >
      <Icon size={16} />
    </button>
  );
}
