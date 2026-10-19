import type { MouseEvent } from 'react';
import { Heart, ShoppingBag, UserRound, X } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo/Logo';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { HeaderActionButton } from '@/components/molecules/HeaderActionButton/HeaderActionButton';
import { useLanguage } from '@/context/LanguageContext';

type BurgerMenuProps = {
  onClose: () => void;
  favouritesCount: number;
  cartCount: number;
};

export function BurgerMenu({
  onClose,
  favouritesCount,
  cartCount,
}: BurgerMenuProps) {
  const { t } = useLanguage();
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('a')) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white tablet:hidden"
      onClick={handleClick}
    >
      <div className="flex h-12 shrink-0 items-center justify-between shadow-[0_1px_0_0_var(--color-elements)]">
        <Logo className="h-full px-4" />
        <IconButton
          aria-label={t('header.closeMenu')}
          onClick={onClose}
        >
          <X size={16} />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto pt-6">
        <Navigation vertical />
      </div>

      <div className="flex shrink-0 shadow-[0_-1px_0_0_var(--color-elements)]">
        <HeaderActionButton
          to="/favourites"
          label={t('header.favourites')}
          count={favouritesCount}
          className="h-16 flex-1"
        >
          <Heart size={16} />
        </HeaderActionButton>
        <HeaderActionButton
          to="/cart"
          label={t('header.cart')}
          count={cartCount}
          className="h-16 flex-1"
        >
          <ShoppingBag size={16} />
        </HeaderActionButton>
        <HeaderActionButton
          to="/account"
          label={t('header.account')}
          className="h-16 flex-1"
        >
          <UserRound size={16} />
        </HeaderActionButton>
      </div>
    </div>
  );
}
