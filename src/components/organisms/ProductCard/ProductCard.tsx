import type { Product } from '@/types/Product';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card';
import { FavouriteButton } from '@/components/atoms/FavouriteButton/FavouriteButton';
import { Link } from 'react-router';
import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import { useAccountContext } from '@/context/AccountContext';
import './ProductCard.css';

type Props = {
  product: Product;
  isAddedToCart: boolean;
  isFavorite: boolean;
  isSale?: boolean;

  onAddToCart?: (id: number) => void;
  onAddToFavorites?: (id: number) => void;
};

export const ProductCard: React.FC<Props> = ({
  product: { name, price, fullPrice, image, id, ram, capacity, screen },
  isFavorite,
  isSale,
  onAddToFavorites,
}) => {
  const { cartItems, addCartItem, removeCartItem } = useAccountContext();
  function handleAddCartButton(): void {
    console.log(cartItems);
    console.log(id);

    if (cartItems.some((item) => item.id === id)) {
      removeCartItem(id);
    } else {
      addCartItem(id, 1);
    }
  }

  return (
    <Card className="shrink-0 w-68 h-126.5 border-box p-8 flex-col gap-0 snap-x snap-mandatory scroll-smooth hoverAnimations">
      <Link
        to="../"
        className="flex min-h-0 flex-1 items-center justify-center"
      >
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </Link>
      <CardHeader className="border-box px-0 gap-0">
        <CardTitle className="mt-6 text-sm">
          {name}
          <div className="mt-2 border-box border-b border-gray-500 pb-2">
            {isSale ?
              <>
                <span className="text-bold">${price} </span>
                <span className="line-through text-gray-500">
                  ${fullPrice}{' '}
                </span>
              </>
            : <span className="text-bold ">${fullPrice}</span>}
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
        <AddToCartButton
          isAddedToCart={cartItems.some((item) => item.id === id)}
          onAddToCart={handleAddCartButton}
        />

        <FavouriteButton
          isFavourite={isFavorite}
          onClick={() => onAddToFavorites?.(id)}
        />
      </CardFooter>
    </Card>
  );
};
