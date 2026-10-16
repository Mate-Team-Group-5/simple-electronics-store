import React from 'react';
import { SpecsList, type Spec } from '@/components/molecules/SpecsList';
import type { ProductDetails } from '@/types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const specs: Spec[] = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
  ];

  if (product.camera) {
    specs.push({ label: 'Camera', value: product.camera });
  }

  if (product.zoom) {
    specs.push({ label: 'Zoom', value: product.zoom });
  }

  specs.push({ label: 'Cell', value: product.cell.join(', ') });

  return (
    <section>
      <h2 className="text-[22px] font-extrabold text-text-primary">
        Tech specs
      </h2>

      <hr className="mt-4 mb-6 border-elements" />

      <SpecsList
        specs={specs}
        className="text-sm"
      />
    </section>
  );
};
