import { ChevronUp } from 'lucide-react';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type BackToTopButtonProps = {
  className?: string;
};

export function BackToTopButton({ className }: BackToTopButtonProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn('group flex items-center gap-4', className)}
    >
      <span className="text-xs font-semibold text-text-secondary transition-colors group-hover:text-text-primary">
        {t('footer.backToTop')}
      </span>
      <span className="flex size-8 items-center justify-center border border-icons text-text-primary transition-colors group-hover:border-text-primary">
        <ChevronUp size={16} />
      </span>
    </button>
  );
}
