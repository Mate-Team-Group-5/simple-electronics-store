import { useRef } from 'react';
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
import { flyToTarget } from '@/utils/flyToTarget';
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
  product,
  isFavorite,
  isSale,
  onAddToFavorites,
}) => {
  const { name, price, fullPrice, image, id, ram, capacity, screen } = product;
  const productLink = `/${product.category}/${product.itemId}`;
  const imageRef = useRef<HTMLImageElement>(null);

  const { cartItems, addCartItem, removeCartItem, updateCartItem } =
    useAccountContext();
  function handleAddCartButton(): void {
    if (cartItems.some((item) => item.id === id)) {
      updateCartItem(
        id,
        (cartItems.find((item) => item.id === id)?.quantity || 0) + 1,
      );
    } else {
      addCartItem(product, 1);

      if (imageRef.current) {
        flyToTarget(imageRef.current, 'cart');
      }
    }
  }
  function handleFavouriteClick() {
    if (!isFavorite && imageRef.current) {
      flyToTarget(imageRef.current, 'favourites');
    }

    onAddToFavorites?.(id);
  }

  function handleDeleteButton() {
    const quantity = cartItems.find((item) => item.id === id)?.quantity || 0;
    if (quantity > 1) {
      updateCartItem(id, quantity - 1);
    } else {
      removeCartItem(id);
    }
  }

  return (
    <Card className="shrink-0 w-68 h-126.5 border-box p-8 flex-col gap-0 snap-x snap-mandatory scroll-smooth hoverAnimations">
      <Link
        to={productLink}
        className="flex min-h-0 flex-1 items-center justify-center"
      >
        <img
          ref={imageRef}
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </Link>
      <CardHeader className="border-box px-0 gap-0">
        <CardTitle className="mt-6 text-sm">
          <Link
            to={productLink}
            className="transition-colors hover:text-accent-purple"
          >
            {name}
          </Link>
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
          productsCount={cartItems.find((item) => item.id === id)?.quantity}
          onAddToCart={handleAddCartButton}
          onDelete={handleDeleteButton}
        />

        <FavouriteButton
          isFavourite={isFavorite}
          onClick={handleFavouriteClick}
        />
      </CardFooter>
    </Card>
  );
};
