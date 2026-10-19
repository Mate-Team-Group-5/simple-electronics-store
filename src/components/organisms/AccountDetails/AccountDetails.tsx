import { Link } from 'react-router';
import { Heart, LogOut, ShoppingBag, UserRoundCheck } from 'lucide-react';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/types/User';

type AccountDetailsProps = {
  user: User;
  className?: string;
};

const linkClassName =
  'flex h-12 flex-1 items-center justify-center gap-2 border border-icons text-sm font-semibold text-text-primary transition-colors hover:border-text-primary';

export function AccountDetails({ user, className }: AccountDetailsProps) {
  const { t } = useLanguage();
  const { logout } = useAuth();

  return (
    <section
      className={cn(
        'flex flex-col gap-6 border border-elements p-6 tablet:p-8',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-hover-bg text-accent-purple">
          <UserRoundCheck
            size={24}
            aria-hidden="true"
          />
        </span>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-text-primary">
            {t('account.greeting')}
          </h2>
          <p className="truncate text-sm text-text-secondary">
            {t('account.signedInAs', { email: user.email })}
          </p>
        </div>
      </div>

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-text-secondary">{t('checkout.email')}</dt>
          <dd className="truncate text-text-primary">{user.email}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-secondary">{t('checkout.phone')}</dt>
          <dd className="text-text-primary">{user.phone}</dd>
        </div>
      </dl>

      <div className="flex gap-2">
        <Link
          to="/favourites"
          className={linkClassName}
        >
          <Heart
            size={16}
            aria-hidden="true"
          />
          {t('header.favourites')}
        </Link>
        <Link
          to="/cart"
          className={linkClassName}
        >
          <ShoppingBag
            size={16}
            aria-hidden="true"
          />
          {t('header.cart')}
        </Link>
      </div>

      <button
        type="button"
        onClick={logout}
        className="flex h-12 cursor-pointer items-center justify-center gap-2 text-sm font-semibold text-red transition-colors hover:bg-hover-bg"
      >
        <LogOut
          size={16}
          aria-hidden="true"
        />
        {t('account.logout')}
      </button>
    </section>
  );
}
