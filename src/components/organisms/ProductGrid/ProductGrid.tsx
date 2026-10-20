import { Button } from '@/components/atoms/Button';
import type { Product } from '@/types/Product';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type React from 'react';
import { ProductCard } from '../ProductCard';
import { useRef, useState } from 'react';
import { cn } from 'cn';
import { LoadingProductCard } from '../LoadingProductCard';

type Props = {
  title: string;
  products: (Product | null)[];
  isSaleGrid?: boolean;
  classNames?: string;
  loadMoreProducts?: (limit: number) => void;
  isLoading?: boolean;
  hasMore?: boolean;
};

const ITEMS_PER_VIEW = 4;

export const ProductGrid: React.FC<Props> = ({
  title,
  products,
  isSaleGrid,
  classNames,
  loadMoreProducts,
  isLoading,
  hasMore,
}) => {
  const [gridSections, setGridSections] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const isLeftEnd = gridSections === 0;
  const isRightEnd = isLoading && hasMore;

  function handleLeftButton(): void {
    const container = scrollRef.current;

    if (!container) return;

    if (container.scrollLeft > 1) {
      container.scrollBy({
        left: -container.clientWidth,
        behavior: 'smooth',
      });
      return;
    }

    const newValue =
      gridSections - ITEMS_PER_VIEW < 0 ? 0 : gridSections - ITEMS_PER_VIEW;
    setGridSections(newValue);
    container.scrollTo({
      left: container.scrollWidth,
      behavior: 'smooth',
    });
  }

  function handleRightButon(): void {
    const container = scrollRef.current;

    if (!container || isLoading) return;

    const isAtRightEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    if (!isAtRightEnd) {
      container.scrollBy({
        left: container.clientWidth,
        behavior: 'smooth',
      });
      return;
    }

    const nextStart = gridSections + ITEMS_PER_VIEW;

    if (nextStart < products.length) {
      setGridSections(nextStart);
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (!hasMore || !loadMoreProducts) return;

    setGridSections(nextStart);
    loadMoreProducts(ITEMS_PER_VIEW);
    container.scrollTo({ left: 0, behavior: 'smooth' });
  }

  return (
    <div className={cn(classNames)}>
      <div className="flex justify-between mb-5">
        <h2 className="text-[22px] text-card-primary-text sm:text-[32px] font-bold">
          {title}
        </h2>
        <div className="h-fit gap-4 flex flex-row ">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'h-8 w-8 rounded-none',
              'bg-sbns border-sbns-border text-sbns-text',
              'hover:bg-sbns-hover  ',
              'hover:border-sbns-hover-border',
              'hover:text-sbns-hover-text',
              {
                'disabled:border-sbns-disabled': isLeftEnd,
                'disabled:border-sbns-disabled-border': isLeftEnd,
                'disabled:border-sbns-disabled-text': isLeftEnd,
              },
            )}
            disabled={isLeftEnd}
            onClick={handleLeftButton}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'h-8 w-8 rounded-none',
              'bg-sbns border-sbns-border text-sbns-text',
              'hover:bg-sbns-hover  ',
              'hover:border-sbns-hover-border',
              'hover:text-sbns-hover-text',
              {
                'disabled:border-sbns-disabled': isRightEnd,
                'disabled:border-sbns-disabled-border': isRightEnd,
                'disabled:border-sbns-disabled-text': isRightEnd,
              },
            )}
            disabled={isRightEnd}
            onClick={handleRightButon}
          >
            {isLoading ?
              <Loader2 className="animate-spin" />
            : <ArrowRight />}
          </Button>
        </div>
      </div>
      <div
        className="overflow-x-auto flex flex-row gap-4 scrollbar-hide p-1 -mx-1"
        ref={scrollRef}
      >
        {products
          .slice(gridSections, gridSections + 4)
          .map((product, index) => {
            return product ?
                <ProductCard
                  key={product.id}
                  product={product}
                  isSale={isSaleGrid}
                />
              : <LoadingProductCard key={`loading-${index}`} />;
          })}
      </div>
    </div>
  );
};
