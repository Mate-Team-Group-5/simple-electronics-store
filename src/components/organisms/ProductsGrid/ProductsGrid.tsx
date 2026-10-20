// import { useState, type AnimationEvent } from 'react';
// import { useFavourites } from '@/hooks/useFavourites';
import { cn } from 'cn';
import type { Product } from '@/types/Product';
import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';

type ProductsGridProps = {
  products: Product[];
  animateRemoval?: boolean;
  className?: string;
};

export function ProductsGrid({ products, className }: ProductsGridProps) {
  // const { isFavourite, toggleFavourite } = useFavourites();
  // const [removingIds, setRemovingIds] = useState<number[]>([]);

  // const handleFavouriteClick = (id: number) => {
  //   if (animateRemoval && isFavourite(id)) {
  //     setRemovingIds((prev) => [...prev, id]);

  //     return;
  //   }

  //   toggleFavourite(id);
  // };

  // const handleAnimationEnd = (
  //   event: AnimationEvent<HTMLLIElement>,
  //   id: number,
  // ) => {
  //   if (event.target !== event.currentTarget) {
  //     return;
  //   }

  //   toggleFavourite(id);
  //   setRemovingIds((prev) => prev.filter((removingId) => removingId !== id));
  // };

  return (
    <ul
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-x-4 gap-y-10',
        className,
      )}
    >
      {products.map((product) => {
        // const isRemoving = removingIds.includes(product.id);

        return (
          <li
            key={product.id}
            className={cn(
              'flex justify-center',
              // isRemoving && 'pointer-events-none animate-card-out',
            )}
            // onAnimationEnd={(event) => handleAnimationEnd(event, product.id)}
          >
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
}
