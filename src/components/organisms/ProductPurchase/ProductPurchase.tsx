import React from 'react';
import type { Category } from '@/hooks/useProducts';
import type { Phone } from '@/types/Phone';
import { ColorSelector } from '@/components/molecules/ColorSelector';
import { CapacitySelector } from '@/components/molecules/CapacitySelector/CapacitySelector';
import { Button } from '@/components/atoms/Button';
import { Heart } from '@/components/atoms/Heart/Heart';
import { SpecsList } from '@/components/molecules/SpecsList/SpecsList';
type Props = {
  product: Phone;
  category: Category;
  catalogId: number | null;
};

export const ProductPurchase: React.FC<Props> = ({
  product,
  category,
  catalogId,
}) => {
  const shortSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div>
        <ColorSelector
          category={category}
          colors={product.colorsAvailable}
          selectedColor={product.color}
          namespaceId={product.namespaceId}
          capacity={product.capacity}
          catalogId={catalogId}
        />
      </div>
      <div className="flex w-full flex-col gap-6 tablet:max-w-60 desktop:max-w-80">
        <hr className="border-elements" />

        <CapacitySelector
          category={category}
          capacities={product.capacityAvailable}
          selectedColor={product.color}
          namespaceId={product.namespaceId}
          capacity={product.capacity}
        />

        <hr className="border-elements" />

        <div className="flex items-center gap-2">
          <span className="text-[32px] font-extrabold text-text-primary">
            ${product.priceDiscount}
          </span>

          {product.priceDiscount < product.priceRegular && (
            <span className="text-[22px] text-text-secondary line-through">
              ${product.priceRegular}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button className="h-12 flex-1">Add to cart</Button>

          <Button
            variant="outline"
            className="size-12"
            aria-label="Add to favorites"
          >
            <Heart />
          </Button>
        </div>
        <SpecsList specs={shortSpecs} />
      </div>
    </div>
  );
};
