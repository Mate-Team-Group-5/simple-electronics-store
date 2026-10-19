import type { ReactNode } from 'react';
import { cn } from 'cn';
import type { CartProduct } from '@/types/Cart';
import { useLanguage } from '@/context/LanguageContext';

type OrderSummaryProps = {
  items: CartProduct[];
  children?: ReactNode;
  className?: string;
};

export function OrderSummary({
  items,
  children,
  className,
}: OrderSummaryProps) {
  const { t } = useLanguage();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      className={cn(
        'flex flex-col gap-6 border border-elements p-6 desktop:sticky desktop:top-24',
        className,
      )}
    >
      <h2 className="text-xl font-bold text-text-primary">
        {t('checkout.yourOrder')}
      </h2>

      <ul className="flex flex-col gap-4">
        {items.map(({ id, quantity, product }) => (
          <li
            key={id}
            className="flex items-center gap-4"
          >
            <img
              src={product.image}
              alt=""
              className="size-12 shrink-0 object-contain"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="truncate text-sm text-text-primary">
                {product.name}
              </p>
              <p className="text-xs text-text-secondary">
                {quantity} × ${product.price}
              </p>
            </div>

            <p className="text-sm font-semibold text-text-primary">
              ${product.price * quantity}
            </p>
          </li>
        ))}
      </ul>

      <hr className="border-elements" />

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-secondary">
            {t('summary.items', { count: totalCount })}
          </dt>
          <dd className="text-text-primary">${totalPrice}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">{t('checkout.delivery')}</dt>
          <dd className="text-text-primary">{t('summary.free')}</dd>
        </div>
      </dl>

      <div className="flex items-baseline justify-between">
        <span className="font-semibold text-text-primary">
          {t('summary.total')}
        </span>
        <span className="text-[32px] font-bold text-text-primary">
          ${totalPrice}
        </span>
      </div>

      {children}
    </div>
  );
}
