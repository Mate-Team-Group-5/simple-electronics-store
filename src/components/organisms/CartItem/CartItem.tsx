import React from 'react';
import { Link } from 'react-router';
import { X } from 'lucide-react';
import type { CartProduct } from '@/types/Cart';
import { QuantityCounter } from '@/components/molecules/QuantityCounter/QuantityCounter';

type CartItemProps = {
  item: CartProduct;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { product, quantity } = item;

  return (
    <article className="flex flex-col gap-4 border border-elements p-4 tablet:flex-row tablet:items-center tablet:gap-6 tablet:p-6">
      <div className="flex items-center gap-4 tablet:flex-1 tablet:gap-6">
        <button
          type="button"
          aria-label="Remove from cart"
          onClick={onRemove}
          className="text-icons transition-colors hover:text-text-primary"
        >
          <X className="size-4" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="size-20 object-contain"
        />

        <Link
          to={`/${product.category}/${item.id}`}
          className="text-sm text-text-primary"
        >
          {product.name}
        </Link>
      </div>

      <div className="flex items-center justify-between tablet:gap-6">
        <QuantityCounter
          value={quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />

        <p className="w-20 text-right text-[22px] font-bold text-text-primary">
          ${product.price * quantity}
        </p>
      </div>
    </article>
  );
};
