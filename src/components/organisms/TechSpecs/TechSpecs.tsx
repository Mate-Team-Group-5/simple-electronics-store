import React from 'react';
import { SpecsList, type Spec } from '@/components/molecules/SpecsList';
import type { ProductDetails } from '@/types/ProductDetails';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  product: ProductDetails;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage();

  const specs: Spec[] = [
    { label: t('specs.screen'), value: product.screen },
    { label: t('specs.resolution'), value: product.resolution },
    { label: t('specs.processor'), value: product.processor },
    { label: t('specs.ram'), value: product.ram },
    { label: t('specs.builtInMemory'), value: product.capacity },
  ];

  if (product.camera) {
    specs.push({ label: t('specs.camera'), value: product.camera });
  }

  if (product.zoom) {
    specs.push({ label: t('specs.zoom'), value: product.zoom });
  }

  specs.push({ label: t('specs.cell'), value: product.cell.join(', ') });

  return (
    <section>
      <h2 className="text-[22px] font-extrabold text-primary">
        {t('details.techSpecs')}
      </h2>

      <hr className="mt-4 mb-6 border-elements" />

      <SpecsList
        specs={specs}
        className="text-sm"
      />
    </section>
  );
};
