import React from 'react';
import type { Category } from '@/hooks/useProducts';
import type { Phone } from '@/types/Phone';
import type { Product } from '@/types/Product';
import { ColorSelector } from '@/components/molecules/ColorSelector';
import { CapacitySelector } from '@/components/molecules/CapacitySelector/CapacitySelector';
import { SpecsList } from '@/components/molecules/SpecsList/SpecsList';
import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import { FavouriteButton } from '@/components/atoms/FavouriteButton/FavouriteButton';
import { useAccountContext } from '@/context/AccountContext';
import { useFavourites } from '@/hooks/useFavourites';

type Props = {
  product: Phone;
  category: Category;
  catalogProduct: Product | null;
};

export const ProductPurchase: React.FC<Props> = ({
  product,
  category,
  catalogProduct,
}) => {
  const { cartItems, addCartItem, updateCartItem, removeCartItem } =
    useAccountContext();
  const { isFavourite, toggleFavourite } = useFavourites();

  const cartQuantity =
    catalogProduct ?
      cartItems.find((item) => item.id === catalogProduct.id)?.quantity
    : undefined;

  function handleAddToCart() {
    if (!catalogProduct) return;

    if (cartQuantity) {
      updateCartItem(catalogProduct.id, cartQuantity + 1);
    } else {
      addCartItem(catalogProduct, 1);
    }
  }

  function handleRemoveFromCart() {
    if (!catalogProduct || !cartQuantity) return;

    if (cartQuantity > 1) {
      updateCartItem(catalogProduct.id, cartQuantity - 1);
    } else {
      removeCartItem(catalogProduct.id);
    }
  }

  const shortSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className="flex flex-col gap-6">
      <ColorSelector
        category={category}
        colors={product.colorsAvailable}
        selectedColor={product.color}
        namespaceId={product.namespaceId}
        capacity={product.capacity}
        catalogId={catalogProduct?.id ?? null}
      />

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

        {catalogProduct && (
          <div className="flex gap-2">
            <AddToCartButton
              productsCount={cartQuantity}
              onAddToCart={handleAddToCart}
              onDelete={handleRemoveFromCart}
            />

            <FavouriteButton
              isFavourite={isFavourite(catalogProduct.id)}
              onClick={() => toggleFavourite(catalogProduct.id)}
            />
          </div>
        )}

        <SpecsList specs={shortSpecs} />
      </div>
    </div>
  );
};
