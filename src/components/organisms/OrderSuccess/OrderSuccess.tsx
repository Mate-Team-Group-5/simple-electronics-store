import { Link } from 'react-router';
import { CircleCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type OrderSuccessProps = {
  orderId: string;
  email: string;
};

export function OrderSuccess({ orderId, email }: OrderSuccessProps) {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center"
    >
      <CircleCheck
        size={56}
        strokeWidth={1.5}
        className="text-[#27ae60]"
      />

      <h2 className="text-2xl font-bold text-text-primary">
        {t('success.title')}
      </h2>

      <p className="text-sm text-text-secondary">
        {t('success.order')}{' '}
        <span className="font-semibold text-text-primary">#{orderId}</span>{' '}
        {t('success.placed')}{' '}
        <span className="font-semibold text-text-primary">{email}</span>.
      </p>

      <Link
        to="/"
        className="mt-4 flex h-12 items-center justify-center bg-text-primary px-10 text-sm font-semibold text-white transition-shadow hover:shadow-lg"
      >
        {t('success.continue')}
      </Link>
    </div>
  );
}
