import {
  Accordion,
  AccordionItem,
} from '@/components/atoms/Accordion/Accordion';
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
          <p className="text-secondary">
            {t('contacts.emailDescription')} niceElectronic@gmail.com
          </p>
        </section>

        <section className="border-t border-sidebar-ring pt-4">
          <h2 className="mb-2 text-lg font-bold text-primary">
            {t('contacts.phone')}
          </h2>
          <p className="text-secondary">
            {t('contacts.phoneDescription')} +380-00-000-00-00
          </p>
        </section>

        <section className="border-t border-sidebar-ring pt-4">
          <h2 className="mb-2 text-lg font-bold text-primary">
            {t('contacts.location')}
          </h2>
          <p className="text-secondary">{t('contacts.locationDescription')}</p>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          {t('contacts.faqTitle')}
        </h2>
        <Accordion className="border-t border-sidebar-ring">
          <AccordionItem
            value="delivery"
            title={t('contacts.faqDeliveryQuestion')}
          >
            <div className="space-y-3 text-secondary">
              <p>{t('contacts.faqDeliveryAnswer')}</p>
              <p className="font-semibold text-primary">
                {t('contacts.faqDeliveryOptionsTitle')}
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>{t('contacts.faqDeliveryNovaPoshta')}</li>
                <li>{t('contacts.faqDeliveryPickup')}</li>
                <li>{t('contacts.faqDeliveryCourier')}</li>
              </ul>
              <p className="font-semibold text-primary">
                {t('contacts.faqDeliveryHowToChooseTitle')}
              </p>
              <ul className="list-disc pl-5">
                <li>{t('contacts.faqDeliveryHowToChoose')}</li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem
            value="payment"
            title={t('contacts.faqPaymentQuestion')}
          >
            <ol className="list-decimal space-y-2 pl-5 text-secondary">
              <li>{t('contacts.faqPaymentOnline')}</li>
              <li>{t('contacts.faqPaymentCash')}</li>
              <li>{t('contacts.faqPaymentOnDelivery')}</li>
            </ol>
          </AccordionItem>
          <AccordionItem
            value="returns"
            title={t('contacts.faqReturnsQuestion')}
          >
            <p className="text-secondary">{t('contacts.faqReturnsAnswer')}</p>
          </AccordionItem>
        </Accordion>
      </section>
    </section>
  );
};
