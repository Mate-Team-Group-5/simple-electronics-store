import { cn } from 'cn';
import type { Product } from '@/types/Product';
import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';

type ProductsGridProps = {
  products: Product[];
  className?: string;
};

export function ProductsGrid({ products, className }: ProductsGridProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(229px,1fr))] gap-x-4 gap-y-10',
        className,
      )}
    >
      {products.map((product) => (
        <li
          key={product.id}
          className="flex justify-center"
        >
          <ProductCard
            product={product}
            isAddedToCart={false}
            isFavorite={false}
          />
        </li>
      ))}
    </ul>
  );
}
