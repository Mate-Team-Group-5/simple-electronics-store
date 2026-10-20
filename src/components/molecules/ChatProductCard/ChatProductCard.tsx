import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types/Product';

type ChatProductCardProps = {
  product: Product;
  onOpen: () => void;
};

export function ChatProductCard({ product, onOpen }: ChatProductCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      onClick={onOpen}
      className="flex items-center gap-3 rounded-xl border border-card-border-background bg-card-background p-2 text-card-primary-text transition-colors hover:border-accent-purple"
    >
      <img
        src={product.image}
        alt={product.name}
        className="size-12 shrink-0 object-contain"
      />

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs font-semibold">{product.name}</p>
        <p className="text-sm font-bold">${product.price}</p>
      </div>

      <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-accent-purple">
        {t('chat.openProduct')}
        <ChevronRight size={14} />
      </span>
    </Link>
  );
}
