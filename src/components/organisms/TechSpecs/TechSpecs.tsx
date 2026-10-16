import React from 'react';
import type { Phone } from '@/types/Phone';
import { SpecsList, type Spec } from '@/components/molecules/SpecsList';

type Props = {
  product: Phone;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const specs: Spec[] = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

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
