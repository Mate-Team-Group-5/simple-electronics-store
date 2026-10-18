import { Header } from './components/organisms/Header/Header';
import { Footer } from './components/organisms/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductCategory } from './types/ProductCategory';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { useAccountContext } from './context/AccountContext';
import { CheckoutPage } from './pages/CheckoutPage';
import { useState } from 'react';
import cn from 'classnames';
import { Theme } from './types/Theme';

function App() {
  const { favoriteProducts, cartItems } = useAccountContext();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [activeTheme, setActiveTheme] = useState<Theme>(Theme.white);

  function handleSwitchTheme() {
    if (activeTheme === Theme.dark) setActiveTheme(Theme.white);
    else setActiveTheme(Theme.dark);
  }

  return (
    <div
      className={cn('flex min-h-screen flex-col', {
        dark: activeTheme === Theme.dark,
      })}
    >
      <Header
        favouritesCount={favoriteProducts.length}
        cartCount={cartCount}
        theme={activeTheme}
        onSwithTheme={handleSwitchTheme}
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
              path="/phones/:productId"
              element={<ProductDetailsPage category={ProductCategory.phones} />}
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
              path="/tablets/:productId"
              element={
                <ProductDetailsPage category={ProductCategory.tablets} />
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
              path="/accessories/:productId"
              element={
                <ProductDetailsPage category={ProductCategory.accessories} />
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
