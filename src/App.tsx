import { Header } from './components/organisms/Header/Header';
import { Footer } from './components/organisms/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { NotFoundPage } from './pages/NotFoundPage';
import { useEffect, useState } from 'react';
import type { Product } from './types/Product';
import { getProducts } from './services/products';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductCategory } from './types/ProductCategory';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  console.log(products);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
