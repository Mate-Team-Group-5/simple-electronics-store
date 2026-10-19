import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { useLanguage } from '@/context/LanguageContext';

export function AccountPage() {
  const { t } = useLanguage();

  return (
    <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
      {t('header.account')}
    </PageTitle>
  );
}
