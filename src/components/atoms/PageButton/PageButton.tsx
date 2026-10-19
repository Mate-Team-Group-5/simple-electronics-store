import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type PageButtonProps = {
  page: number;
  isActive: boolean;
  onClick: () => void;
};

export function PageButton({ page, isActive, onClick }: PageButtonProps) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t('pagination.page', { page })}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex size-8 items-center justify-center text-sm leading-[21px] transition-colors',
        isActive ?
          'bg-text-primary text-white'
        : 'border border-elements text-text-primary hover:border-text-primary',
      )}
    >
      {page}
    </button>
  );
}
