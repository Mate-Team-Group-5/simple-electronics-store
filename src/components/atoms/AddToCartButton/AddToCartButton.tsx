import type React from 'react';
import { Button } from '../Button';
import classNames from 'classnames';

type Props = {
  isAddedToCart: boolean;
  onAddToCart: () => void;
};

export const AddToCartButton: React.FC<Props> = ({
  isAddedToCart,
  onAddToCart,
}) => {
  return (
    <Button
      variant={isAddedToCart ? 'outline' : 'default'}
      className={classNames('flex-1', 'h-10', 'hover:shadow', {
        'text-[#27AE60]': isAddedToCart,
      })}
      onClick={onAddToCart}
    >
      {isAddedToCart ? 'Added' : 'Add to cart'}
    </Button>
  );
};
