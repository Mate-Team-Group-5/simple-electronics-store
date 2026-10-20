import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: 'new-password' | 'current-password';
  children?: ReactNode;
};

export function PasswordField({
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete = 'current-password',
  children,
}: PasswordFieldProps) {
  const { t } = useLanguage();
  const id = useId();
  const errorId = `${id}-error`;
  const [isVisible, setIsVisible] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(event.getModifierState('CapsLock'));
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-primary"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKey}
          onKeyUp={handleKey}
          onBlur={() => setIsCapsLockOn(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-12 w-full border pr-12 pl-4 text-sm text-primary transition-colors outline-none placeholder:text-icons focus:border-accent-purple',
            error ? 'border-red' : 'border-icons hover:border-primary',
          )}
        />

        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label={t(isVisible ? 'auth.hidePassword' : 'auth.showPassword')}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
        >
          {isVisible ?
            <EyeOff size={18} />
          : <Eye size={18} />}
        </button>
      </div>

      {isCapsLockOn && (
        <p className="text-xs text-accent-purple">{t('auth.capsLock')}</p>
      )}

      {children}

      {error && (
        <p
          id={errorId}
          className="text-xs text-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}
