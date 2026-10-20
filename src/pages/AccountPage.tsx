import { useLocation, useNavigate } from 'react-router';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { AuthTabs } from '@/components/organisms/AuthTabs/AuthTabs';
import { AccountDetails } from '@/components/organisms/AccountDetails/AccountDetails';
import { AuthBenefits } from '@/components/molecules/AuthBenefits/AuthBenefits';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

type LocationState = {
  from?: string;
} | null;

export function AccountPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as LocationState)?.from;

  const handleAuthSuccess = () => {
    if (from) {
      navigate(from, { replace: true });
    }
  };

  return (
    <>
      <PageTitle className="mt-6 mb-6 text-center tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
        {t('header.account')}
      </PageTitle>

      {user ?
        <AccountDetails
          user={user}
          className="mx-auto mb-20 w-full max-w-md"
        />
      : <div className="mx-auto mb-20 grid max-w-4xl items-start gap-10 desktop:grid-cols-2 desktop:gap-16">
          <AuthTabs
            onSuccess={handleAuthSuccess}
            className="w-full max-w-md justify-self-center"
          />

          <AuthBenefits className="mx-auto w-full max-w-md desktop:pt-14" />
        </div>
      }
    </>
  );
}
