import React from 'react';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { CartItem } from '@/components/organisms/CartItem/CartItem';
import { Button } from '@/components/atoms/Button/Button';
import { useAccountContext } from '@/context/AccountContext';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/context/LanguageContext';
//import cartIsEmpty from '@/assets/img/cart-is-empty.png';

export const CartPage: React.FC = () => {
  const { cartItems, updateCartItem, removeCartItem } = useAccountContext();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const onRemove = (id: number) => {
    removeCartItem(id);
  };
  const handleIncrease = (id: number, quantity: number) => {
    updateCartItem(id, quantity + 1);
  };
  const handleDecrease = (id: number, quantity: number) => {
    updateCartItem(id, quantity - 1);
  };

  const totalSum = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
        {t('header.cart')}
      </PageTitle>
      {cartItems.length === 0 ?
        <img
          src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
          alt={t('cart.empty')}
          className="mx-auto w-full max-w-100"
        />
      : <div className="flex flex-col gap-8 desktop:flex-row desktop:items-start desktop:gap-4">
          <div className="flex flex-col gap-4 desktop:flex-1">
            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  onDecrease={() => handleDecrease(item.id, item.quantity)}
                  onIncrease={() => handleIncrease(item.id, item.quantity)}
                  onRemove={() => onRemove(item.id)}
                />
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4 border border-elements p-4 tablet:p-6 desktop:w-92">
            <div className="flex flex-col items-center">
              <p className="text-[41px] font-bold text-text-primary">
                ${totalSum}
              </p>
              <span className="text-sm text-text-secondary">
                {t('cart.total', { count: totalCount })}
              </span>
            </div>

            <hr className="w-full border-elements" />

            <Button
              size="lg"
              className="h-12 w-full"
              onClick={() => navigate('/checkout')}
            >
              {t('cart.checkout')}
            </Button>
          </div>
        </div>
      }
    </>
  );
};
