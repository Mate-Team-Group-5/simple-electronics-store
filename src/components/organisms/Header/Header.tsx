import { useState } from 'react';
import { Heart, Menu, MoonIcon, ShoppingBag, SunIcon, X } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo/Logo';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { BurgerMenu } from '@/components/organisms/BurgerMenu/BurgerMenu';
import { HeaderActionButton } from '@/components/molecules/HeaderActionButton/HeaderActionButton';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { Theme } from '@/types/Theme';
import { Button } from '@base-ui/react/button';

type HeaderProps = {
  favouritesCount?: number;
  cartCount?: number;
  theme?: Theme;
  onSwithTheme?: () => void;
};

export function Header({
  favouritesCount = 0,
  cartCount = 0,
  theme = Theme.white,
  onSwithTheme,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="flex h-12 items-center gap-2 bg-white shadow-[0_1px_0_0_var(--color-elements)] desktop:h-16 desktop:gap-6">
      <Logo className="h-full px-4 desktop:px-6" />

      <Navigation className="hidden tablet:block" />

      <div className="ml-auto flex h-full items-center">
        <LanguageSwitcher className="px-1 desktop:px-4" />

        <div className="hidden h-full tablet:flex">
          <Button onClick={onSwithTheme}>
            {theme === Theme.white && <SunIcon />}
            {theme === Theme.dark && <MoonIcon />}
          </Button>
          <HeaderActionButton
            to="/favourites"
            label={t('header.favourites')}
            count={favouritesCount}
            flyTarget="favourites"
          >
            <Heart size={16} />
          </HeaderActionButton>
          <HeaderActionButton
            to="/cart"
            label={t('header.cart')}
            count={cartCount}
            flyTarget="cart"
          >
            <ShoppingBag size={16} />
          </HeaderActionButton>
        </div>

        <IconButton
          aria-label={t(isMenuOpen ? 'header.closeMenu' : 'header.openMenu')}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="tablet:hidden"
        >
          {isMenuOpen ?
            <X size={16} />
          : <Menu size={16} />}
        </IconButton>
      </div>

      {isMenuOpen && (
        <BurgerMenu
          onClose={() => setIsMenuOpen(false)}
          favouritesCount={favouritesCount}
          cartCount={cartCount}
        />
      )}
    </header>
  );
}
