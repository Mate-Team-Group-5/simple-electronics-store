import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type LoaderProps = {
  className?: string;
};

export function Loader({ className }: LoaderProps) {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      className={cn('flex justify-center py-20', className)}
    >
      <span
        aria-hidden="true"
        className="size-10 animate-spin rounded-full border-4 border-elements border-t-text-primary"
      />
      <span className="sr-only">{t('common.loading')}</span>
    </div>
  );
}
