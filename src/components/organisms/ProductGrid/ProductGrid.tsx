import { Button } from '@/components/atoms/Button';
import type { Product } from '@/types/Product';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type React from 'react';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products?: Product[];
};

export const ProductGrid: React.FC<Props> = ({ title, products }) => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-[22px] sm:text-[32px] font-bold">{title}</h2>
        <div className="h-fit gap-4 flex flex-row">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-none"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-none"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="grid-cols-4 gap-4">
        {products?.map((product) => {
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
    </>
  );
};
