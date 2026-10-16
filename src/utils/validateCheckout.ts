export type DeliveryMethod = 'courier' | 'pickup';
export type PaymentMethod = 'card' | 'cash';

export type CheckoutFormValues = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  delivery: DeliveryMethod;
  payment: PaymentMethod;
};

export type CheckoutFormErrors = Partial<
  Record<keyof CheckoutFormValues, string>
>;

export const EMPTY_CHECKOUT_FORM: CheckoutFormValues = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  delivery: 'courier',
  payment: 'card',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckout(
  values: CheckoutFormValues,
): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');

  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email';
  }

  if (!values.city.trim()) {
    errors.city = 'Enter your city';
  }

  if (values.delivery === 'courier' && !values.address.trim()) {
    errors.address = 'Enter your delivery address';
  }

  return errors;
}
