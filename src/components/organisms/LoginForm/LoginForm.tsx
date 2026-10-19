import { useState, type SubmitEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { TextField } from '@/components/atoms/TextField/TextField';
import { PasswordField } from '@/components/atoms/PasswordField/PasswordField';
import { Button } from '@/components/atoms/Button/Button';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import type { TranslationKey } from '@/i18n/en';
import { ApiError } from '@/utils/fetchClient';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginErrors = {
  email?: TranslationKey;
  password?: TranslationKey;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<TranslationKey | null>(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors: LoginErrors = {};

    if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'checkout.errors.email';
    }

    if (!password) {
      nextErrors.password = 'auth.errors.passwordRequired';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await login(email.trim(), password);
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setSubmitError('auth.errors.invalidCredentials');
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
        value={email}
        onChange={(value) => {
          setEmail(value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email && t(errors.email)}
        autoComplete="email"
        placeholder="you@example.com"
      />

      <PasswordField
        label={t('auth.password')}
        value={password}
        onChange={(value) => {
          setPassword(value);
          setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={errors.password && t(errors.password)}
        autoComplete="current-password"
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
        {t(isSubmitting ? 'auth.loggingIn' : 'auth.login')}
      </Button>
    </form>
  );
}
