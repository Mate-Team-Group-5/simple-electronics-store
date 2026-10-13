import type { Product } from '@/types/Product';
import { Button } from '@/components/atoms/Button';
import cn from 'classnames';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card';
import { Heart, RedHeart } from '@/components/atoms/Heart/Heart';

type Props = {
  product: Product;
  isAddedToCart: boolean;
  isFavorite: boolean;
  sale?: number;

  onAddToCart?: (id: number) => void;
  onAddToFavorites?: (id: number) => void;
};

export const ProductCard: React.FC<Props> = ({
  product: { name, price, image, id, ram, capacity, screen },
  isAddedToCart,
  isFavorite,
  sale,
  onAddToCart,
  onAddToFavorites,
}) => {
  return (
    <Card className="w-full max-w-[272px] max-h-[506px] border-box p-8 flex-col gap-0">
      <CardHeader className="border-box px-0 gap-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
        <CardTitle className="mt-6 text-sm">
          {name}
          <div className="mt-2 border-box border-b border-gray-500 pb-2">
            {sale ?
              <>
                <span className="text-bold">${sale} </span>
                <span className="line-through text-gray-500">${price} </span>
              </>
            : <span className="text-bold ">${price}</span>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs px-0 my-2 font-semibold gap-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Screen</span>
          <span>{screen}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Capacity</span>
          <span>{capacity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">RAM</span>
          <span>{ram}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-row gap-2 px-0 ">
        <Button
          variant={isAddedToCart ? 'outline' : 'default'}
          className={cn('flex-1', 'h-10', 'hover:shadow', {
            'text-[#27AE60]': isAddedToCart,
          })}
          onClick={() => {
            if (onAddToCart) onAddToCart(id);
          }}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </Button>
        <Button
          variant="outline"
          className="w-10 h-10"
          onClick={() => {
            if (onAddToFavorites) onAddToFavorites(id);
          }}
        >
          {isFavorite ?
            <RedHeart />
          : <Heart />}
        </Button>
      </CardFooter>
    </Card>
  );
};
