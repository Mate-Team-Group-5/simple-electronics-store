import { Button } from './components/atoms/Button/Button';
import { Header } from './components/organisms/Header/Header';

function App() {
  return (
    <>
      <Header />
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
