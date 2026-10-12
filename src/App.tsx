import { Button } from './components/atoms/Button/Button';
import { Header } from './components/organisms/Header/Header';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <main className="px-4 tablet:px-6 desktop:mx-auto desktop:max-w-[1200px] desktop:px-8">
        <HomePage />
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
