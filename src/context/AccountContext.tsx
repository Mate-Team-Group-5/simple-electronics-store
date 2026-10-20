import type { CartProduct } from '@/types/Cart';
import type { Product } from '@/types/Product';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface AccountContextType {
  favoriteProducts: number[];
  cartItems: CartProduct[];
  addFavorites: (id: number) => void;
  removeFavorites: (id: number) => void;
  addCartItem: (product: Product, quantity: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
  updateFavorites: (ids: number[]) => void;
  updateCart: (products: CartProduct[]) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoriteProducts');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const [cartItems, setCartItems] = useState<CartProduct[]>(() => {
    const saved = localStorage.getItem('cartItems');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function addFavorites(id: number) {
    setFavoriteProducts([...favoriteProducts, id]);
  }

  function removeFavorites(id: number) {
    setFavoriteProducts(
      favoriteProducts.filter((currentId) => currentId !== id),
    );
  }

  function addCartItem(product: Product, quantity: number) {
    if (cartItems.some((item) => item.id === product.id)) return;
    setCartItems([...cartItems, { id: product.id, product, quantity }]);
  }

  function updateCartItem(id: number, quantity: number) {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function removeCartItem(id: number) {
    setCartItems(
      cartItems.filter((currentCertItem) => currentCertItem.id !== id),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function updateFavorites(ids: number[]) {
    setFavoriteProducts(ids);
  }

  function updateCart(products: CartProduct[]) {
    setCartItems(products);
  }

  return (
    <AccountContext.Provider
      value={{
        favoriteProducts,
        cartItems,
        addFavorites,
        removeFavorites,
        addCartItem,
        updateCartItem,
        removeCartItem,
        clearCart,
        updateFavorites,
        updateCart,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountContext = () =>
  useContext(AccountContext) as AccountContextType;
