import type { SubmitEvent } from 'react';
import { TextField } from '@/components/atoms/TextField/TextField';
import { ChoiceOption } from '@/components/atoms/ChoiceOption/ChoiceOption';
import { Select } from '@/components/atoms/Select/Select';
import { DELIVERY_CITIES, getNovaPoshtaBranches } from '@/services/novaPoshta';
import type {
  CheckoutFormErrors,
  CheckoutFormValues,
} from '@/utils/validateCheckout';
import { useLanguage } from '@/context/LanguageContext';

const CITY_OPTIONS = DELIVERY_CITIES.map((city) => ({
  value: city,
  label: city,
}));

type CheckoutFormProps = {
  id: string;
  values: CheckoutFormValues;
  errors: CheckoutFormErrors;
  onFieldChange: <K extends keyof CheckoutFormValues>(
    field: K,
    value: CheckoutFormValues[K],
  ) => void;
  onSubmit: () => void;
};

export function CheckoutForm({
  id,
  values,
  errors,
  onFieldChange,
  onSubmit,
}: CheckoutFormProps) {
  const { t } = useLanguage();

  const getError = (field: keyof CheckoutFormErrors) => {
    const errorKey = errors[field];

    return errorKey ? t(errorKey) : undefined;
  };

  const branchOptions = getNovaPoshtaBranches(values.city).map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleCityChange = (city: string) => {
    onFieldChange('city', city);
    onFieldChange('branch', '');
  };

  return (
    <form
      id={id}
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-10"
    >
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-xl font-bold text-text-primary">
          {t('checkout.contactDetails')}
        </legend>

        <TextField
          label={t('checkout.fullName')}
          value={values.fullName}
          onChange={(value) => onFieldChange('fullName', value)}
          error={getError('fullName')}
          autoComplete="name"
          placeholder={t('checkout.fullNamePlaceholder')}
        />

        <div className="grid gap-4 tablet:grid-cols-2">
          <TextField
            label={t('checkout.phone')}
            type="tel"
            value={values.phone}
            onChange={(value) => onFieldChange('phone', value)}
            error={getError('phone')}
            autoComplete="tel"
            placeholder="+380 67 123 45 67"
          />

          <TextField
            label={t('checkout.email')}
            type="email"
            value={values.email}
            onChange={(value) => onFieldChange('email', value)}
            error={getError('email')}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-xl font-bold text-text-primary">
          {t('checkout.delivery')}
        </legend>

        <div className="grid gap-4 tablet:grid-cols-3">
          <ChoiceOption
            name="delivery"
            value="nova-poshta"
            checked={values.delivery === 'nova-poshta'}
            onChange={() => onFieldChange('delivery', 'nova-poshta')}
            title={t('checkout.novaPoshta')}
            description={t('checkout.novaPoshtaHint')}
          />

          <ChoiceOption
            name="delivery"
            value="courier"
            checked={values.delivery === 'courier'}
            onChange={() => onFieldChange('delivery', 'courier')}
            title={t('checkout.courier')}
            description={t('checkout.courierHint')}
          />

          <ChoiceOption
            name="delivery"
            value="pickup"
            checked={values.delivery === 'pickup'}
            onChange={() => onFieldChange('delivery', 'pickup')}
            title={t('checkout.pickup')}
            description={t('checkout.pickupHint')}
          />
        </div>

        {values.delivery !== 'pickup' && (
          <Select
            label={t('checkout.city')}
            value={values.city}
            options={CITY_OPTIONS}
            onChange={handleCityChange}
            placeholder={t('checkout.cityPlaceholder')}
            error={getError('city')}
            selectClassName="h-12 px-4"
          />
        )}

        {values.delivery === 'nova-poshta' && (
          <Select
            label={t('checkout.branch')}
            value={values.branch}
            options={branchOptions}
            onChange={(value) => onFieldChange('branch', value)}
            placeholder={t(
              values.city ?
                'checkout.branchPlaceholder'
              : 'checkout.branchCityFirst',
            )}
            disabled={!values.city}
            error={getError('branch')}
            selectClassName="h-12 px-4"
          />
        )}

        {values.delivery === 'courier' && (
          <TextField
            label={t('checkout.address')}
            value={values.address}
            onChange={(value) => onFieldChange('address', value)}
            error={getError('address')}
            autoComplete="street-address"
            placeholder={t('checkout.addressPlaceholder')}
          />
        )}

        {values.delivery === 'pickup' && (
          <p className="text-sm text-text-secondary">
            {t('checkout.pickupInfo')}
          </p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-xl font-bold text-text-primary">
          {t('checkout.payment')}
        </legend>

        <div className="grid gap-4 tablet:grid-cols-2">
          <ChoiceOption
            name="payment"
            value="card"
            checked={values.payment === 'card'}
            onChange={() => onFieldChange('payment', 'card')}
            title={t('checkout.card')}
            description={t('checkout.cardHint')}
          />

          <ChoiceOption
            name="payment"
            value="cash"
            checked={values.payment === 'cash'}
            onChange={() => onFieldChange('payment', 'cash')}
            title={t('checkout.cash')}
            description={t('checkout.cashHint')}
          />
        </div>
      </fieldset>
    </form>
  );
}
