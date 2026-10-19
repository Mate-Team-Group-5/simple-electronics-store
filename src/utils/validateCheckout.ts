import type { TranslationKey } from '@/i18n/en';
import type { WarehouseType } from '@/types/NovaPoshta';

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
  cityRef: string;
  warehouseType: WarehouseType;
  branchName: string;
};

export type CheckoutFormErrors = Partial<
  Record<keyof CheckoutFormValues, TranslationKey>
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
  cityRef: '',
  warehouseType: 'branch',
  branchName: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckout(
  values: CheckoutFormValues,
): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'checkout.errors.fullName';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');

  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'checkout.errors.phone';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'checkout.errors.email';
  }

  if (values.delivery !== 'pickup' && !values.cityRef) {
    errors.city = 'checkout.errors.city';
  }

  if (values.delivery === 'nova-poshta' && !values.branch) {
    errors.branch = 'checkout.errors.branch';
  }

  if (values.delivery === 'courier' && !values.address.trim()) {
    errors.address = 'checkout.errors.address';
  }

  return errors;
}
