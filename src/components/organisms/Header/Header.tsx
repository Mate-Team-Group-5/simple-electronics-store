import { useState } from 'react';
import { Heart, Menu, MoonIcon, ShoppingBag, SunIcon, X } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo/Logo';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { BurgerMenu } from '@/components/organisms/BurgerMenu/BurgerMenu';
import { HeaderActionButton } from '@/components/molecules/HeaderActionButton/HeaderActionButton';
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

  return (
    <header className="flex h-12 items-center gap-4 bg-white shadow-[0_1px_0_0_var(--color-elements)] desktop:h-16 desktop:gap-6">
      <Logo className="h-full px-4 desktop:px-6" />

      <Navigation className="hidden tablet:block" />

      <div className="ml-auto flex h-full">
        <div className="hidden h-full tablet:flex">
          <Button onClick={onSwithTheme}>
            {theme === Theme.white && <SunIcon />}
            {theme === Theme.dark && <MoonIcon />}
          </Button>
          <HeaderActionButton
            to="/favourites"
            label="Favourites"
            count={favouritesCount}
            flyTarget="favourites"
          >
            <Heart size={16} />
          </HeaderActionButton>
          <HeaderActionButton
            to="/cart"
            label="Cart"
            count={cartCount}
            flyTarget="cart"
          >
            <ShoppingBag size={16} />
          </HeaderActionButton>
        </div>

        <IconButton
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
