import { Link } from 'react-router';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type CategoryCardProps = {
  to: string;
  title: string;
  count: number;
  image: string;
  imageBgClassName: string;
};

export function CategoryCard({
  to,
  title,
  count,
  image,
  imageBgClassName,
}: CategoryCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      to={to}
      className="group flex flex-col"
    >
      <div
        className={cn(
          'relative aspect-square overflow-hidden',
          imageBgClassName,
        )}
      >
        <img
          src={image}
          alt=""
          className="absolute top-[12%] left-[18%] w-[95%] transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-text-primary">{title}</h3>

      <p className="mt-1 text-sm text-text-secondary">
        {t('category.modelsCount', { count })}
      </p>
    </Link>
  );
}
