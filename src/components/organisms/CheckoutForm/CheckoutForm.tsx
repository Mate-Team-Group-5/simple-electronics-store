import type { SubmitEvent } from 'react';
import { TextField } from '@/components/atoms/TextField/TextField';
import { ChoiceOption } from '@/components/atoms/ChoiceOption/ChoiceOption';
import { Select } from '@/components/atoms/Select/Select';
import { DELIVERY_CITIES, getNovaPoshtaBranches } from '@/services/novaPoshta';
import type {
  CheckoutFormErrors,
  CheckoutFormValues,
} from '@/utils/validateCheckout';

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
          Contact details
        </legend>

        <TextField
          label="Full name"
          value={values.fullName}
          onChange={(value) => onFieldChange('fullName', value)}
          error={errors.fullName}
          autoComplete="name"
          placeholder="John Smith"
        />

        <div className="grid gap-4 tablet:grid-cols-2">
          <TextField
            label="Phone"
            type="tel"
            value={values.phone}
            onChange={(value) => onFieldChange('phone', value)}
            error={errors.phone}
            autoComplete="tel"
            placeholder="+380 67 123 45 67"
          />

          <TextField
            label="Email"
            type="email"
            value={values.email}
            onChange={(value) => onFieldChange('email', value)}
            error={errors.email}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-xl font-bold text-text-primary">
          Delivery
        </legend>

        <div className="grid gap-4 tablet:grid-cols-3">
          <ChoiceOption
            name="delivery"
            value="nova-poshta"
            checked={values.delivery === 'nova-poshta'}
            onChange={() => onFieldChange('delivery', 'nova-poshta')}
            title="Nova Poshta"
            description="To a branch in 1–2 days"
          />

          <ChoiceOption
            name="delivery"
            value="courier"
            checked={values.delivery === 'courier'}
            onChange={() => onFieldChange('delivery', 'courier')}
            title="Courier"
            description="To your door in 1–3 days"
          />

          <ChoiceOption
            name="delivery"
            value="pickup"
            checked={values.delivery === 'pickup'}
            onChange={() => onFieldChange('delivery', 'pickup')}
            title="Pickup from store"
            description="Free, ready tomorrow"
          />
        </div>

        {values.delivery !== 'pickup' && (
          <Select
            label="City"
            value={values.city}
            options={CITY_OPTIONS}
            onChange={handleCityChange}
            placeholder="Choose your city"
            error={errors.city}
            selectClassName="h-12 px-4"
          />
        )}

        {values.delivery === 'nova-poshta' && (
          <Select
            label="Nova Poshta branch"
            value={values.branch}
            options={branchOptions}
            onChange={(value) => onFieldChange('branch', value)}
            placeholder={
              values.city ? 'Choose a branch' : 'Choose your city first'
            }
            disabled={!values.city}
            error={errors.branch}
            selectClassName="h-12 px-4"
          />
        )}

        {values.delivery === 'courier' && (
          <TextField
            label="Address"
            value={values.address}
            onChange={(value) => onFieldChange('address', value)}
            error={errors.address}
            autoComplete="street-address"
            placeholder="Street, building, apartment"
          />
        )}

        {values.delivery === 'pickup' && (
          <p className="text-sm text-text-secondary">
            Nice Gadgets store: 1 Khreshchatyk St, Kyiv. Open daily 10:00–21:00.
          </p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-xl font-bold text-text-primary">
          Payment
        </legend>

        <div className="grid gap-4 tablet:grid-cols-2">
          <ChoiceOption
            name="payment"
            value="card"
            checked={values.payment === 'card'}
            onChange={() => onFieldChange('payment', 'card')}
            title="Card on delivery"
            description="Pay by card when you receive the order"
          />

          <ChoiceOption
            name="payment"
            value="cash"
            checked={values.payment === 'cash'}
            onChange={() => onFieldChange('payment', 'cash')}
            title="Cash on delivery"
            description="Pay in cash when you receive the order"
          />
        </div>
      </fieldset>
    </form>
  );
}
