import { Button } from './components/atoms/Button/Button';
import { Logo } from './components/atoms/Logo/Logo';
import { NavItem } from './components/atoms/NavItem/NavItem';
import { Counter } from './components/atoms/Counter/Counter';
import { Heart, ShoppingBag } from 'lucide-react';
import { HeaderActionButton } from './components/molecules/HeaderActionButton/HeaderActionButton';

function App() {
  return (
    <>
      <header className="flex h-12 items-center gap-8 px-4">
        <Logo />
        <NavItem
          to="/"
          end
        >
          Home
        </NavItem>
        <div className="flex gap-4 p-4">
          <Counter count={3} />
          <Counter count={0} />
          <Counter count={150} />
        </div>
        <div className="flex">
          <HeaderActionButton
            to="/favourites"
            label="Favourites"
            count={3}
          >
            <Heart size={16} />
          </HeaderActionButton>
          <HeaderActionButton
            to="/cart"
            label="Cart"
          >
            <ShoppingBag size={16} />
          </HeaderActionButton>
        </div>
        <NavItem to="/phones">Phones</NavItem>
      </header>
      <main>
        <Button
          size="lg"
          onClick={() => console.log('Button clicked')}
        >
          Buy gadget
        </Button>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
