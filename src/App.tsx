import { Button } from './components/atoms/Button/Button';
import { Logo } from './components/atoms/Logo/Logo';
import { NavItem } from './components/atoms/NavItem/NavItem';

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
