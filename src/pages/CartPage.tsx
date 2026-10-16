import React from 'react';
import type { CartProduct } from '@/types/Cart';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { CartItem } from '@/components/organisms/CartItem/CartItem';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/atoms/Button/Button';
//import cartIsEmpty from '@/assets/img/cart-is-empty.png';

// TODO: замінити тимчасові дані.
const testCart: CartProduct[] = [
  {
    id: 191,
    quantity: 1,
    product: {
      id: 191,
      category: 'phones',
      itemId: 'apple-iphone-14-pro-128gb-gold',
      name: 'Apple iPhone 14 Pro 128GB Gold',
      fullPrice: 1156,
      price: 1068,
      screen: "6.1' OLED",
      capacity: '128GB',
      color: 'gold',
      ram: '6GB',
      year: 2022,
      image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
    },
  },
  {
    id: 57,
    quantity: 2,
    product: {
      id: 57,
      category: 'phones',
      itemId: 'apple-iphone-11-pro-max-64gb-gold',
      name: 'Apple iPhone 11 Pro Max 64GB Gold',
      fullPrice: 1480,
      price: 1400,
      screen: "6.5' OLED",
      capacity: '64GB',
      color: 'gold',
      ram: '4GB',
      year: 2019,
      image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    },
  },
  {
    id: 150,
    quantity: 1,
    product: {
      id: 150,
      category: 'accessories',
      itemId: 'apple-watch-se-44mm-silver',
      name: 'Apple Watch SE 44mm Silver',
      fullPrice: 309,
      price: 279,
      screen: "1.78' OLED",
      capacity: '44mm',
      color: 'silver',
      ram: '1GB',
      year: 2020,
      image: 'img/accessories/apple-watch-se/silver/00.webp',
    },
  },
];
export const CartPage: React.FC = () => {
  const [cart, setCart] = useState(testCart);
  const navigate = useNavigate();

  const onRemove = (id: number) => {
    return setCart(cart.filter((filteredItem) => filteredItem.id !== id));
  };
  const handleIncrease = (id: number) => {
    setCart(
      cart.map((itemLocal) =>
        itemLocal.id === id ?
          { ...itemLocal, quantity: itemLocal.quantity + 1 }
        : itemLocal,
      ),
    );
  };
  const handleDecrease = (id: number) => {
    setCart(
      cart.map((itemLocal) =>
        itemLocal.id === id ?
          { ...itemLocal, quantity: itemLocal.quantity - 1 }
        : itemLocal,
      ),
    );
  };

  const totalSum = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
        Cart
      </PageTitle>
      {cart.length === 0 ?
        <img
          src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
          alt="Your cart is empty"
          className="mx-auto w-full max-w-[400px]"
        />
      : <div className="flex flex-col gap-8 desktop:flex-row desktop:items-start desktop:gap-4">
          <div className="flex flex-col gap-4 desktop:flex-1">
            {cart.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  onDecrease={() => handleDecrease(item.id)}
                  onIncrease={() => handleIncrease(item.id)}
                  onRemove={() => onRemove(item.id)}
                />
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4 border border-elements p-4 tablet:p-6 desktop:w-[368px]">
            <div className="flex flex-col items-center">
              <p className="text-[41px] font-bold text-text-primary">
                ${totalSum}
              </p>
              <span className="text-sm text-text-secondary">
                Total for {totalCount} items
              </span>
            </div>

            <hr className="w-full border-elements" />

            <Button
              size="lg"
              className="h-12 w-full"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </Button>
          </div>
        </div>
      }
    </>
  );
};
