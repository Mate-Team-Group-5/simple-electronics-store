import { useState, type SubmitEvent } from 'react';
import { TextField } from '@/components/atoms/TextField/TextField';
import { ChoiceOption } from '@/components/atoms/ChoiceOption/ChoiceOption';
import type { SelectOption } from '@/components/atoms/Select/Select';
import { SearchSelect } from '@/components/molecules/SearchSelect/SearchSelect';
import { useCitySearch } from '@/hooks/useCitySearch';
import { useWarehouses } from '@/hooks/useWarehouses';
import type { WarehouseType } from '@/types/NovaPoshta';
import type {
  CheckoutFormErrors,
  CheckoutFormValues,
} from '@/utils/validateCheckout';
import { useLanguage } from '@/context/LanguageContext';

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
  const [cityQuery, setCityQuery] = useState(values.city);
  const [branchQuery, setBranchQuery] = useState(values.branchName);

  const {
    cities,
    isLoading: isCitiesLoading,
    hasError: hasCitiesError,
  } = useCitySearch(cityQuery);

  const {
    warehouses,
    isLoading: isWarehousesLoading,
    hasError: hasWarehousesError,
  } = useWarehouses(values.cityRef, values.warehouseType, branchQuery);

  const cityOptions = cities.map((city) => ({
    value: city.ref,
    label: city.name,
  }));

  const branchOptions = warehouses.map((warehouse) => ({
    value: warehouse.ref,
    label: warehouse.name,
  }));

  const getError = (field: keyof CheckoutFormErrors) => {
    const errorKey = errors[field];

    return errorKey ? t(errorKey) : undefined;
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const resetBranch = () => {
    onFieldChange('branch', '');
    onFieldChange('branchName', '');
    setBranchQuery('');
  };

  const handleCityQueryChange = (query: string) => {
    setCityQuery(query);
    onFieldChange('city', '');
    onFieldChange('cityRef', '');
    resetBranch();
  };

  const handleCitySelect = (option: SelectOption) => {
    setCityQuery(option.label);
    onFieldChange('city', option.label);
    onFieldChange('cityRef', option.value);
    resetBranch();
  };

  const handleWarehouseTypeChange = (type: WarehouseType) => {
    onFieldChange('warehouseType', type);
    resetBranch();
  };

  const handleBranchQueryChange = (query: string) => {
    setBranchQuery(query);
    onFieldChange('branch', '');
    onFieldChange('branchName', '');
  };

  const handleBranchSelect = (option: SelectOption) => {
    setBranchQuery(option.label);
    onFieldChange('branch', option.value);
    onFieldChange('branchName', option.label);
  };

  const isPostomat = values.warehouseType === 'postomat';

  const getBranchPlaceholder = () => {
    if (!values.cityRef) {
      return 'checkout.branchCityFirst';
    }

    return isPostomat ?
        'checkout.postomatPlaceholder'
      : 'checkout.branchPlaceholder';
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
          <SearchSelect
            label={t('checkout.city')}
            query={cityQuery}
            onQueryChange={handleCityQueryChange}
            options={cityOptions}
            onSelect={handleCitySelect}
            isLoading={isCitiesLoading}
            hasError={hasCitiesError}
            placeholder={t('checkout.cityPlaceholder')}
            error={getError('city')}
          />
        )}

        {values.delivery === 'nova-poshta' && values.cityRef && (
          <div className="grid gap-4 tablet:grid-cols-2">
            <ChoiceOption
              name="warehouseType"
              value="branch"
              checked={values.warehouseType === 'branch'}
              onChange={() => handleWarehouseTypeChange('branch')}
              title={t('checkout.warehouseBranch')}
            />

            <ChoiceOption
              name="warehouseType"
              value="postomat"
              checked={values.warehouseType === 'postomat'}
              onChange={() => handleWarehouseTypeChange('postomat')}
              title={t('checkout.warehousePostomat')}
            />
          </div>
        )}

        {values.delivery === 'nova-poshta' && (
          <SearchSelect
            label={t(isPostomat ? 'checkout.postomat' : 'checkout.branch')}
            query={branchQuery}
            onQueryChange={handleBranchQueryChange}
            options={branchOptions}
            onSelect={handleBranchSelect}
            isLoading={isWarehousesLoading}
            hasError={hasWarehousesError}
            placeholder={t(getBranchPlaceholder())}
            disabled={!values.cityRef}
            error={getError('branch')}
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
