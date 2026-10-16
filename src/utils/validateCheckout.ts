export type DeliveryMethod = 'nova-poshta' | 'courier' | 'pickup';
export type PaymentMethod = 'card' | 'cash';

export type CheckoutFormValues = {
  fullName: string;
  phone: string;
  email: string;
  delivery: DeliveryMethod;
  city: string;
  branch: string;
  address: string;
  payment: PaymentMethod;
};

export type CheckoutFormErrors = Partial<
  Record<keyof CheckoutFormValues, string>
>;

export const EMPTY_CHECKOUT_FORM: CheckoutFormValues = {
  fullName: '',
  phone: '',
  email: '',
  delivery: 'nova-poshta',
  city: '',
  branch: '',
  address: '',
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

  if (values.delivery !== 'pickup' && !values.city) {
    errors.city = 'Choose your city';
  }

  if (values.delivery === 'nova-poshta' && !values.branch) {
    errors.branch = 'Choose a Nova Poshta branch';
  }

  if (values.delivery === 'courier' && !values.address.trim()) {
    errors.address = 'Enter your delivery address';
  }

  return errors;
}
