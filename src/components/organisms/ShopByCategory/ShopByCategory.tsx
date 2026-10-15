import { CategoryCard } from '@/components/molecules/CategoryCard/CategoryCard';
import type { Category } from '@/hooks/useProducts';

const IMG_URL = `${import.meta.env.BASE_URL}img`;

const CATEGORIES: {
  category: Category;
  title: string;
  image: string;
  imageBgClassName: string;
}[] = [
  {
    category: 'phones',
    title: 'Mobile phones',
    image: `${IMG_URL}/category-phones.webp`,
    imageBgClassName: 'bg-[#6d6474]',
  },
  {
    category: 'tablets',
    title: 'Tablets',
    image: `${IMG_URL}/category-tablets.webp`,
    imageBgClassName: 'bg-[#8d8d92]',
  },
  {
    category: 'accessories',
    title: 'Accessories',
    image: `${IMG_URL}/category-accessories.webp`,
    imageBgClassName: 'bg-[#973d5f]',
  },
];

type ShopByCategoryProps = {
  counts: Record<Category, number>;
  className?: string;
};

export function ShopByCategory({ counts, className }: ShopByCategoryProps) {
  return (
    <section className={className}>
      <h2 className="text-[22px] font-bold text-text-primary tablet:text-[32px]">
        Shop by category
      </h2>

      <ul className="mt-6 grid gap-8 tablet:grid-cols-3 tablet:gap-4">
        {CATEGORIES.map(({ category, title, image, imageBgClassName }) => (
          <li key={category}>
            <CategoryCard
              to={`/${category}`}
              title={title}
              count={counts[category]}
              image={image}
              imageBgClassName={imageBgClassName}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
