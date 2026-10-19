import { useState } from 'react';
import { Link } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { Button } from '@/components/atoms/Button/Button';
import { CheckoutForm } from '@/components/organisms/CheckoutForm/CheckoutForm';
import { OrderSummary } from '@/components/organisms/OrderSummary/OrderSummary';
import { OrderSuccess } from '@/components/organisms/OrderSuccess/OrderSuccess';
import { useAccountContext } from '@/context/AccountContext';
import { placeOrder } from '@/services/orders';
import {
  EMPTY_CHECKOUT_FORM,
  validateCheckout,
  type CheckoutFormErrors,
  type CheckoutFormValues,
} from '@/utils/validateCheckout';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const CHECKOUT_FORM_ID = 'checkout-form';

type CompletedOrder = {
  orderId: string;
  email: string;
};

export function CheckoutPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cartItems, clearCart } = useAccountContext();
  const [values, setValues] = useState<CheckoutFormValues>(() => ({
    ...EMPTY_CHECKOUT_FORM,
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  }));
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(
    null,
  );

  const handleFieldChange = <K extends keyof CheckoutFormValues>(
    field: K,
    value: CheckoutFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    const nextErrors = validateCheckout(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setHasSubmitError(false);

    try {
      const { orderId } = await placeOrder({
        customer: values,
        items: cartItems.map(({ id, quantity, product }) => ({
          id,
          quantity,
          price: product.price,
        })),
        total: cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
      });

      clearCart();
      setCompletedOrder({ orderId, email: values.email.trim() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setHasSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (completedOrder) {
      return (
        <OrderSuccess
          orderId={completedOrder.orderId}
          email={completedOrder.email}
        />
      );
    }

    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-text-secondary">{t('cart.empty')}</p>
          <Link
            to="/"
            className="font-semibold text-text-primary underline underline-offset-4"
          >
            {t('checkout.goShopping')}
          </Link>
        </div>
      );
    }

    return (
      <div className="mt-8 mb-20 grid items-start gap-8 desktop:grid-cols-[1fr_368px] desktop:gap-16">
        <section aria-label={t('checkout.formLabel')}>
          {!user && (
            <p className="mb-8 border border-elements p-4 text-sm text-text-secondary">
              {t('checkout.haveAccount')}{' '}
              <Link
                to="/account"
                state={{ from: '/checkout' }}
                className="font-semibold text-text-primary underline underline-offset-4"
              >
                {t('auth.login')}
              </Link>
            </p>
          )}

          <CheckoutForm
            id={CHECKOUT_FORM_ID}
            values={values}
            errors={errors}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
        </section>

        <aside aria-label={t('checkout.yourOrder')}>
          <OrderSummary items={cartItems}>
            {hasSubmitError && (
              <p
                role="alert"
                className="text-sm text-red"
              >
                {t('common.error')}
              </p>
            )}

            <Button
              type="submit"
              form={CHECKOUT_FORM_ID}
              size="lg"
              disabled={isSubmitting}
              className="h-12 w-full"
            >
              {isSubmitting && <LoaderCircle className="animate-spin" />}
              {t(
                isSubmitting ? 'checkout.placingOrder' : 'checkout.placeOrder',
              )}
            </Button>
          </OrderSummary>
        </aside>
      </div>
    );
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t('header.cart'), to: '/cart' },
          { label: t('checkout.title') },
        ]}
        className="mt-6"
      />

      <PageTitle className="mt-6 tablet:mt-10">{t('checkout.title')}</PageTitle>

      {renderContent()}
    </>
  );
}
