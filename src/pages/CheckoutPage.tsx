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

const CHECKOUT_FORM_ID = 'checkout-form';

type CompletedOrder = {
  orderId: string;
  email: string;
};

export function CheckoutPage() {
  const { cartItems, clearCart } = useAccountContext();
  const [values, setValues] = useState<CheckoutFormValues>(EMPTY_CHECKOUT_FORM);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
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
    setSubmitError('');

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
      setSubmitError('Something went wrong. Please try again.');
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
          <p className="text-text-secondary">Your cart is empty</p>
          <Link
            to="/"
            className="font-semibold text-text-primary underline underline-offset-4"
          >
            Go shopping
          </Link>
        </div>
      );
    }

    return (
      <div className="mt-8 mb-20 grid items-start gap-8 desktop:grid-cols-[1fr_368px] desktop:gap-16">
        <section aria-label="Delivery and payment">
          <CheckoutForm
            id={CHECKOUT_FORM_ID}
            values={values}
            errors={errors}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
        </section>

        <aside aria-label="Your order">
          <OrderSummary items={cartItems}>
            {submitError && (
              <p
                role="alert"
                className="text-sm text-red"
              >
                {submitError}
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
              {isSubmitting ? 'Placing order…' : 'Place order'}
            </Button>
          </OrderSummary>
        </aside>
      </div>
    );
  };

  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]}
        className="mt-6"
      />

      <PageTitle className="mt-6 tablet:mt-10">Checkout</PageTitle>

      {renderContent()}
    </>
  );
}
