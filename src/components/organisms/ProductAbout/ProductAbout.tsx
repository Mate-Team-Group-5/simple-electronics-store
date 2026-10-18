import type { ProductDescription } from '@/types/Product';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDescription } from '@/i18n/productDescriptions';

type Props = {
  description: ProductDescription[];
};
export const ProductAbout: React.FC<Props> = ({ description }) => {
  const { t, language } = useLanguage();
  const translatedDescription = translateDescription(description, language);

  return (
    <section>
      <h2 className="text-[22px] font-extrabold text-text-primary">
        {t('details.about')}
      </h2>
      <hr className="mt-4 mb-6 border-elements" />

      {translatedDescription.map((desc, index) => (
        <div
          key={index}
          className="flex flex-col gap-4"
        >
          <h3 className="text-left text-[20px] mt-[32px] text-text-primary">
            {desc.title}
          </h3>
          {desc.text.map((p) => (
            <p
              className="text-text-secondary"
              key={p}
            >
              {p}
            </p>
          ))}
        </div>
      ))}
      <hr className="mt-4 mb-6 border-elements" />
    </section>
  );
};
