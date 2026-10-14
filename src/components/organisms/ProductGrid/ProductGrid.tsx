import { Button } from '@/components/atoms/Button';
import type { Product } from '@/types/Product';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type React from 'react';
import { ProductCard } from '../ProductCard';
import { useEffect, useRef, useState } from 'react';
import { cn } from 'cn';

type Props = {
  title: string;
  products: Product[];
  classNames?: string;
};

export const ProductGrid: React.FC<Props> = ({
  title,
  products,
  classNames,
}) => {
  const [gridSections, setGridSections] = useState<number>(
    Math.ceil(products.length / 4),
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  function handleLeftButon(): void {
    const container = scrollRef.current;

    if (!container) return;

    const isAtLeftEnd = container.scrollLeft <= 1;

    if (isAtLeftEnd) {
      const newValue = gridSections - 4 < 0 ? 0 : gridSections - 4;
      setGridSections(newValue);
      container.scrollTo({
        left: container.scrollWidth,
        behavior: 'smooth',
      });
    } else {
      container.scrollBy({
        left: container.clientWidth * -1,
        behavior: 'smooth',
      });
    }
  }

  function handleRightButon(): void {
    const container = scrollRef.current;

    if (!container) return;

    const isAtRightEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    if (isAtRightEnd) {
      const newValue =
        gridSections + 4 >= products.length ?
          products.length - 4
        : gridSections + 4;
      setGridSections(newValue);
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      container.scrollBy({
        left: container.clientWidth,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className={cn(classNames)}>
      <div className="flex justify-between mb-5">
        <h2 className="text-[22px] sm:text-[32px] font-bold">{title}</h2>
        <div className="h-fit gap-4 flex flex-row">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={handleLeftButon}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={handleRightButon}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div
        className="overflow-x-auto flex flex-row gap-4 scrollbar-hide p-1 -mx-1"
        ref={scrollRef}
      >
        {products.slice(gridSections, gridSections + 4).map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              isAddedToCart={false}
              isFavorite={false}
            />
          );
        })}
      </div>
    </div>
  );
};
