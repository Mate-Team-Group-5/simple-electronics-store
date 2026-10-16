import { Link } from 'react-router';
import { CircleCheck } from 'lucide-react';

type OrderSuccessProps = {
  orderId: string;
  email: string;
};

export function OrderSuccess({ orderId, email }: OrderSuccessProps) {
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
        Thank you for your order!
      </h2>

      <p className="text-sm text-text-secondary">
        Order{' '}
        <span className="font-semibold text-text-primary">#{orderId}</span> has
        been placed. We will send the details to{' '}
        <span className="font-semibold text-text-primary">{email}</span>.
      </p>

      <Link
        to="/"
        className="mt-4 flex h-12 items-center justify-center bg-text-primary px-10 text-sm font-semibold text-white transition-shadow hover:shadow-lg"
      >
        Continue shopping
      </Link>
    </div>
  );
}
