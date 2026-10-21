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
import cn from 'classnames';
import { Theme } from './types/Theme';
import { useLanguage } from './context/LanguageContext';
import { AccountPage } from './pages/AccountPage';
import { ChatWidget } from './components/organisms/ChatWidget/ChatWidget';
import { useCookie } from './hooks/useCookie';

function App() {
  const { favoriteProducts, cartItems } = useAccountContext();
  const { t } = useLanguage();
  const cartCount =
    cartItems ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const [activeTheme, setActiveTheme] = useCookie('theme', Theme.white);

  function handleSwitchTheme() {
    if (activeTheme === Theme.dark) setActiveTheme(Theme.white);
    else setActiveTheme(Theme.dark);
  }

  return (
    <div
      className={cn('flex min-h-screen flex-col', 'bg-main-beak', {
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
                  title={t('category.phones')}
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
                  title={t('category.tablets')}
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
                  title={t('category.accessories')}
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
            <Route
              path="account"
              element={<AccountPage />}
            />
          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
