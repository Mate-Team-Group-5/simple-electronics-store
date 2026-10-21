import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';

import { useLanguage } from '@/context/LanguageContext';
import type React from 'react';

export const ContactsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-6 tablet:py-8">
      <PageTitle className="mb-6">{t('footer.contacts')}</PageTitle>

      <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3 tablet:gap-8">
        <section className="border-t border-sidebar-ring pt-4">
          <h2 className="mb-2 text-lg font-bold text-primary">
            {t('contacts.email')}
          </h2>
          <p className="text-secondary">{t('contacts.emailDescription')}</p>
        </section>

        <section className="border-t border-sidebar-ring pt-4">
          <h2 className="mb-2 text-lg font-bold text-primary">
            {t('contacts.phone')}
          </h2>
          <p className="text-secondary">{t('contacts.phoneDescription')}</p>
        </section>

        <section className="border-t border-sidebar-ring pt-4">
          <h2 className="mb-2 text-lg font-bold text-primary">
            {t('contacts.location')}
          </h2>
          <p className="text-secondary">{t('contacts.locationDescription')}</p>
        </section>
      </div>
    </section>
  );
};
