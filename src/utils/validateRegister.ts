import type { TranslationKey } from '@/i18n/en';

export type RegisterFormValues = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, TranslationKey>
>;

export const EMPTY_REGISTER_FORM: RegisterFormValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(
  values: RegisterFormValues,
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'checkout.errors.email';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');

  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'checkout.errors.phone';
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = 'auth.errors.passwordShort';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'auth.errors.passwordMismatch';
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'auth.errors.terms';
  }

  return errors;
}
