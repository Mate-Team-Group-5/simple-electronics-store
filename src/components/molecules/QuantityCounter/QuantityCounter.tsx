import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
type QuantityCounterProps = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};
export const QuantityCounter: React.FC<QuantityCounterProps> = ({
  value,
  onIncrease,
  onDecrease,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label={t('quantity.decrease')}
        onClick={onDecrease}
        disabled={value <= 1}
        className="flex size-8 items-center justify-center border border-icons text-text-primary transition-colors enabled:hover:border-text-primary disabled:border-elements disabled:text-icons"
      >
        <Minus className="size-4" />
      </button>

      <span className="w-8 text-center text-sm text-text-primary">{value}</span>

      <button
        type="button"
        aria-label={t('quantity.increase')}
        onClick={onIncrease}
        className="flex size-8 items-center justify-center border border-icons text-text-primary transition-colors enabled:hover:border-text-primary"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
};
