import { Button } from './components/atoms/Button/Button';

export function App() {
  return (
    <>
      <header>Our shop</header>
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
