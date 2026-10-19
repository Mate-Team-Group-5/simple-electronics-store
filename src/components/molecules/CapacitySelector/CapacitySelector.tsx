import type { Category } from '@/hooks/useProducts';
import React from 'react';
import { Link } from 'react-router';
import { buildProductId } from '@/utils/buildProductId';
import { useLanguage } from '@/context/LanguageContext';
type Props = {
  category: Category;
  capacity: string;
  namespaceId: string;
  capacities: string[];
  selectedColor: string;
};
export const CapacitySelector: React.FC<Props> = ({
  category,
  namespaceId,
  capacities,
  selectedColor,
  capacity,
}) => {
  const { t } = useLanguage();

  return (
    <div>
      <p className="text-xs text-text-secondary mb-2">
        {t('details.selectCapacity')}
      </p>
      <div className="flex gap-2">
        {capacities.map((capacityLocal) => (
          <Link
            className={`flex h-8 items-center border px-2 text-sm transition-colors ${
              capacityLocal === capacity ?
                'border-text-primary bg-text-primary text-white'
              : 'border-icons bg-white text-text-primary hover:border-text-primary'
            }`}
            key={capacityLocal}
            to={`/${category}/${buildProductId(namespaceId, capacityLocal, selectedColor)}`}
          >
            {capacityLocal}
          </Link>
        ))}
      </div>
    </div>
  );
};
