import { CategoryCard } from '@/components/molecules/CategoryCard/CategoryCard';
import type { Category } from '@/hooks/useProducts';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const IMG_URL = `${import.meta.env.BASE_URL}img`;

const CATEGORIES: {
  category: Category;
  titleKey: TranslationKey;
  image: string;
  imageBgClassName: string;
}[] = [
  {
    category: 'phones',
    titleKey: 'category.phones',
    image: `${IMG_URL}/category-phones.webp`,
    imageBgClassName: 'bg-[#6d6474]',
  },
  {
    category: 'tablets',
    titleKey: 'category.tablets',
    image: `${IMG_URL}/category-tablets.webp`,
    imageBgClassName: 'bg-[#8d8d92]',
  },
  {
    category: 'accessories',
    titleKey: 'category.accessories',
    image: `${IMG_URL}/category-accessories.webp`,
    imageBgClassName: 'bg-[#973d5f]',
  },
];

type ShopByCategoryProps = {
  counts: Record<Category, number>;
  className?: string;
};

export function ShopByCategory({ counts, className }: ShopByCategoryProps) {
  const { t } = useLanguage();

  return (
    <section className={className}>
      <h2 className="text-[22px] font-bold text-primary tablet:text-[32px]">
        {t('home.shopByCategory')}
      </h2>

      <ul className="mt-6 grid gap-8 tablet:grid-cols-3 tablet:gap-4">
        {CATEGORIES.map(({ category, titleKey, image, imageBgClassName }) => (
          <li key={category}>
            <CategoryCard
              to={`/${category}`}
              title={t(titleKey)}
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
