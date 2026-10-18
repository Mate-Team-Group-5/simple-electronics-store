import type React from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import { Minus, PlusIcon, Trash2 } from 'lucide-react';
import './AddToCartButton.css';

type Props = {
  productsCount?: number;
  onAddToCart: () => void;
  onDelete?: () => void;
};

export const AddToCartButton: React.FC<Props> = ({
  productsCount,
  onAddToCart,
  onDelete,
}) => {
  return (
    <div className="flex-1 h-10 relative justify-center">
      {productsCount && (
        <Button
          variant={'destructive'}
          className="h-8 w-8 z-10 rounded-full absolute left-1 top-1"
          onClick={onDelete}
        >
          {productsCount === 1 ?
            <Trash2 />
          : <Minus />}
        </Button>
      )}
      <Button
        variant={productsCount ? 'outline' : 'default'}
        className={classNames(
          'w-full',
          'h-full',
          'hover:shadow',
          'rounded-none',
          'relative',
          {
            'bg-button-background': !productsCount,
            'bg-button-background-active': productsCount,
            'text-button-text': !productsCount,
            'text-button-text-active': productsCount,
          },
        )}
        onClick={onAddToCart}
      >
        {productsCount ? `ea ${productsCount}` : 'Add to cart'}
      </Button>
      {productsCount && (
        <Button
          className="absolute right-1 top-1 h-8 w-8 rounded-full"
          variant={'secondary'}
          onClick={onAddToCart}
        >
          <PlusIcon />
        </Button>
      )}
    </div>
  );
};
