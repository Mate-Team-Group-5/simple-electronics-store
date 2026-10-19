import { cn } from 'cn';
import { SliderButton } from '@/components/atoms/SliderButton/SliderButton';
import { PageButton } from '@/components/atoms/PageButton/PageButton';
import { getVisiblePages } from '@/utils/getVisiblePages';
import { useLanguage } from '@/context/LanguageContext';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const { t } = useLanguage();

  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label={t('pagination.label')}
      className={cn('flex items-center justify-center gap-4', className)}
    >
      <SliderButton
        direction="left"
        aria-label={t('pagination.previous')}
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-8 disabled:cursor-not-allowed disabled:border-elements disabled:text-icons"
      />

      <ul className="flex gap-2">
        {pages.map((page) => (
          <li key={page}>
            <PageButton
              page={page}
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            />
          </li>
        ))}
      </ul>

      <SliderButton
        direction="right"
        aria-label={t('pagination.next')}
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-8 disabled:cursor-not-allowed disabled:border-elements disabled:text-icons"
      />
    </nav>
  );
}
