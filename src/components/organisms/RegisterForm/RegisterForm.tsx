import { useState, type SubmitEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { TextField } from '@/components/atoms/TextField/TextField';
import { PasswordField } from '@/components/atoms/PasswordField/PasswordField';
import { PasswordStrength } from '@/components/molecules/PasswordStrength/PasswordStrength';
import { Button } from '@/components/atoms/Button/Button';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/utils/fetchClient';
import {
  EMPTY_REGISTER_FORM,
  MIN_PASSWORD_LENGTH,
  validateRegister,
  type RegisterFormErrors,
  type RegisterFormValues,
} from '@/utils/validateRegister';

type RegisterFormProps = {
  onSuccess: () => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { t } = useLanguage();
  const { register } = useAuth();
  const [values, setValues] = useState<RegisterFormValues>(EMPTY_REGISTER_FORM);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<TranslationKey | null>(null);

  const handleFieldChange = <K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K],
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
      await register({
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      });

      onSuccess();
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

      <PasswordField
        label={t('auth.password')}
        value={values.password}
        onChange={(value) => handleFieldChange('password', value)}
        error={getError('password')}
        autoComplete="new-password"
        placeholder={t('auth.passwordHint', { min: MIN_PASSWORD_LENGTH })}
      >
        <PasswordStrength password={values.password} />
      </PasswordField>

      <PasswordField
        label={t('auth.confirmPassword')}
        value={values.confirmPassword}
        onChange={(value) => handleFieldChange('confirmPassword', value)}
        error={getError('confirmPassword')}
        autoComplete="new-password"
      />

      <div className="flex flex-col gap-1">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={values.acceptTerms}
            onChange={(event) =>
              handleFieldChange('acceptTerms', event.target.checked)
            }
            aria-invalid={Boolean(errors.acceptTerms)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-text-primary"
          />
          {t('auth.acceptTerms')}
        </label>

        {errors.acceptTerms && (
          <p className="text-xs text-red">{t(errors.acceptTerms)}</p>
        )}
      </div>

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
