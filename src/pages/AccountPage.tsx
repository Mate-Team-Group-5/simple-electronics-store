import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { RegisterForm } from '@/components/organisms/RegisterForm/RegisterForm';
import { useLanguage } from '@/context/LanguageContext';
import type { User } from '@/services/auth';

export function AccountPage() {
  const { t } = useLanguage();
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);

  return (
    <>
      <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
        {t('header.account')}
      </PageTitle>

      <section className="mb-20 max-w-md border border-elements p-6 tablet:p-8">
        {registeredUser ?
          <div
            role="status"
            className="flex flex-col items-center gap-3 py-6 text-center"
          >
            <CircleCheck
              size={48}
              strokeWidth={1.5}
              className="text-[#27ae60]"
            />
            <h2 className="text-xl font-bold text-text-primary">
              {t('auth.registered')}
            </h2>
            <p className="text-sm text-text-secondary">
              {t('auth.registeredText', { email: registeredUser.email })}
            </p>
          </div>
        : <>
            <h2 className="text-xl font-bold text-text-primary">
              {t('auth.registerTitle')}
            </h2>
            <p className="mt-1 mb-6 text-sm text-text-secondary">
              {t('auth.registerSubtitle')}
            </p>

            <RegisterForm onSuccess={setRegisteredUser} />
          </>
        }
      </section>
    </>
  );
}
