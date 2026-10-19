import { useState, type SubmitEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { TextField } from '@/components/atoms/TextField/TextField';
import { Button } from '@/components/atoms/Button/Button';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';
import { register, type User } from '@/services/auth';
import { ApiError } from '@/utils/fetchClient';
import {
  EMPTY_REGISTER_FORM,
  MIN_PASSWORD_LENGTH,
  validateRegister,
  type RegisterFormErrors,
  type RegisterFormValues,
} from '@/utils/validateRegister';

type RegisterFormProps = {
  onSuccess: (user: User) => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { t } = useLanguage();
  const [values, setValues] = useState<RegisterFormValues>(EMPTY_REGISTER_FORM);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<TranslationKey | null>(null);

  const handleFieldChange = (
    field: keyof RegisterFormValues,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const getError = (field: keyof RegisterFormValues) => {
    const errorKey = errors[field];

    return errorKey ? t(errorKey) : undefined;
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateRegister(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { user } = await register({
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      });

      onSuccess(user);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setSubmitError('auth.errors.emailTaken');
      } else {
        setSubmitError('common.error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <TextField
        label={t('checkout.email')}
        type="email"
        value={values.email}
        onChange={(value) => handleFieldChange('email', value)}
        error={getError('email')}
        autoComplete="email"
        placeholder="you@example.com"
      />

      <TextField
        label={t('checkout.phone')}
        type="tel"
        value={values.phone}
        onChange={(value) => handleFieldChange('phone', value)}
        error={getError('phone')}
        autoComplete="tel"
        placeholder="+380 67 123 45 67"
      />

      <TextField
        label={t('auth.password')}
        type="password"
        value={values.password}
        onChange={(value) => handleFieldChange('password', value)}
        error={getError('password')}
        autoComplete="new-password"
        placeholder={t('auth.passwordHint', { min: MIN_PASSWORD_LENGTH })}
      />

      <TextField
        label={t('auth.confirmPassword')}
        type="password"
        value={values.confirmPassword}
        onChange={(value) => handleFieldChange('confirmPassword', value)}
        error={getError('confirmPassword')}
        autoComplete="new-password"
      />

      {submitError && (
        <p
          role="alert"
          className="text-sm text-red"
        >
          {t(submitError)}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-2 h-12 w-full"
      >
        {isSubmitting && <LoaderCircle className="animate-spin" />}
        {t(isSubmitting ? 'auth.registering' : 'auth.register')}
      </Button>
    </form>
  );
}
