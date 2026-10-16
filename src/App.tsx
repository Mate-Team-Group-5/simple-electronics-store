import { Header } from './components/organisms/Header/Header';
import { Footer } from './components/organisms/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductCategory } from './types/ProductCategory';
import { useAccountContext } from './context/AccountContext';
import { CheckoutPage } from './pages/CheckoutPage';

function App() {
  const { favoriteProducts, cartItems } = useAccountContext();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        favouritesCount={favoriteProducts.length}
        cartCount={cartCount}
      />
      <main className="w-full flex-1 px-4 tablet:px-6 desktop:mx-auto desktop:max-w-[1200px] desktop:px-8">
        <Routes>
          <Route path="/">
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="/phones"
              element={
                <CatalogPage
                  category={ProductCategory.phones}
                  title="Mobile phones"
                />
              }
            />
            <Route
              path="/tablets"
              element={
                <CatalogPage
                  category={ProductCategory.tablets}
                  title="Tablets"
                />
              }
            />
            <Route
              path="/accessories"
              element={
                <CatalogPage
                  category={ProductCategory.accessories}
                  title="Accessories"
                />
              }
            />
            <Route
              path="cart"
              element={<CartPage />}
            />
            <Route
              path="checkout"
              element={<CheckoutPage />}
            />
            <Route
              path="favourites"
              element={<FavouritesPage />}
            />
          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
