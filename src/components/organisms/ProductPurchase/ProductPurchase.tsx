import React from 'react';
import type { Category } from '@/hooks/useProducts';
import type { Phone } from '@/types/Phone';
import { ColorSelector } from '@/components/molecules/ColorSelector';
import { CapacitySelector } from '@/components/molecules/CapacitySelector/CapacitySelector';

type Props = {
  product: Phone;
  category: Category;
};

export const ProductPurchase: React.FC<Props> = ({ product, category }) => {
  return (
    <div className="flex flex-col gap-6">
      <ColorSelector
        category={category}
        colors={product.colorsAvailable}
        selectedColor={product.color}
        namespaceId={product.namespaceId}
        capacity={product.capacity}
      />

      <hr className="border-elements" />

      <CapacitySelector
        category={category}
        capacities={product.capacityAvailable}
        selectedColor={product.color}
        namespaceId={product.namespaceId}
        capacity={product.capacity}
      />

      <hr className="border-elements" />

      {/* TODO: ціна, Add to cart + favourites, короткі характеристики */}
    </div>
  );
};
