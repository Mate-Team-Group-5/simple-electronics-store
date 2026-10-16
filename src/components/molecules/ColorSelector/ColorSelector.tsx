import type { Category } from '@/hooks/useProducts';
import React from 'react';
import { Link } from 'react-router';
import { buildProductId } from '@/utils/buildProductId';
import { PRODUCT_COLORS } from '@/types/productColors';
type Props = {
  category: Category;
  colors: string[];
  namespaceId: string;
  capacity: string;
  selectedColor: string;
  catalogId: number | null;
};
export const ColorSelector: React.FC<Props> = ({
  category,
  colors,
  namespaceId,
  capacity,
  selectedColor,
  catalogId,
}) => {
  return (
    <div>
      <div className="flex flex-row w-full place-content-between">
        <p className="text-xs text-text-secondary mb-2">Available colors</p>
        {catalogId !== null && (
          <span className="text-xs text-icons">ID: {catalogId}</span>
        )}
      </div>

      <div className="flex gap-2">
        {colors.map((color) => (
          <Link
            key={color}
            to={`/${category}/${buildProductId(namespaceId, capacity, color)}`}
            aria-label={color}
            className={`block size-8 rounded-full border p-0.5 transition-colors hover:border-text-primary ${
              color === selectedColor ?
                'border-text-primary'
              : 'border-elements'
            }`}
          >
            <span
              className="block size-full rounded-full"
              style={{ backgroundColor: PRODUCT_COLORS[color] ?? color }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
