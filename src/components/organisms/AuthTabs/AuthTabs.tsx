import { useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { cn } from 'cn';
import { LoginForm } from '@/components/organisms/LoginForm/LoginForm';
import { RegisterForm } from '@/components/organisms/RegisterForm/RegisterForm';
import { useLanguage } from '@/context/LanguageContext';

type AuthTab = 'login' | 'register';

type AuthTabsProps = {
  onSuccess: () => void;
  className?: string;
};

const tabClassName =
  'h-12 flex-1 cursor-pointer text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary data-[active]:text-text-primary';

export function AuthTabs({ onSuccess, className }: AuthTabsProps) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<AuthTab>('login');

  return (
    <Tabs.Root
      value={tab}
      onValueChange={(value) => setTab(value as AuthTab)}
      className={cn('border border-elements', className)}
    >
      <Tabs.List className="relative flex border-b border-elements">
        <Tabs.Tab
          value="login"
          className={tabClassName}
        >
          {t('auth.tabs.login')}
        </Tabs.Tab>
        <Tabs.Tab
          value="register"
          className={tabClassName}
        >
          {t('auth.tabs.register')}
        </Tabs.Tab>

        <Tabs.Indicator className="absolute bottom-0 left-(--active-tab-left) h-0.5 w-(--active-tab-width) bg-text-primary transition-all duration-200" />
      </Tabs.List>

      <Tabs.Panel
        value="login"
        className="p-6 tablet:p-8"
      >
        <p className="mb-6 text-sm text-text-secondary">
          {t('auth.loginSubtitle')}
        </p>
        <LoginForm onSuccess={onSuccess} />
      </Tabs.Panel>

      <Tabs.Panel
        value="register"
        className="p-6 tablet:p-8"
      >
        <p className="mb-6 text-sm text-text-secondary">
          {t('auth.registerSubtitle')}
        </p>
        <RegisterForm onSuccess={onSuccess} />
      </Tabs.Panel>
    </Tabs.Root>
  );
}
