import type React from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import { Minus, PlusIcon, Trash2 } from 'lucide-react';
import './AddToCartButton.css';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="flex-1 h-10 relative justify-center">
      {(productsCount || 0) > 0 && (
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
          'rounded-none',
          'hover:shadow-button-shadow',
          'hover:bg-button-background-hover',
          {
            'bg-button-background': !productsCount,
            'bg-button-background-active': productsCount,
            'hover:bg-button-background-active-hover': productsCount,
            'text-button-text': !productsCount,
            'text-button-text-active': productsCount,
            'hover:text-button-text-active': productsCount,
          },
        )}
        onClick={onAddToCart}
      >
        {productsCount ?
          t('card.inCart', { count: productsCount })
        : t('card.addToCart')}
      </Button>
      {(productsCount || 0) > 0 && (
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
