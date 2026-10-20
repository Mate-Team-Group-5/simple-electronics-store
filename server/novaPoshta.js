import getIntegration from './integrations.js';

const PARCEL_DESCRIPTION = 'Електроніка';
const WEIGHT_PER_ITEM_KG = 1;

async function callNovaPoshta(
  integration,
  modelName,
  calledMethod,
  methodProperties,
) {
  const response = await fetch(integration.baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: integration.apiKey,
      modelName,
      calledMethod,
      methodProperties,
    }),
  });

  if (!response.ok) {
    throw new Error(`Nova Poshta HTTP ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(`Nova Poshta: ${json.errors.join(', ')}`);
  }

  return json.data;
}

// "Ройко Юрій Андрійович" → { lastName, firstName, middleName }
function splitFullName(fullName) {
  const [lastName = '', firstName = '', middleName = ''] = fullName
    .trim()
    .split(/\s+/);

  return { lastName, firstName, middleName };
}

// "067 123 45 67" → "380671234567"
function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '');

  return digits.startsWith('380') ? digits : `38${digits}`;
}

// Nova Poshta expects dd.mm.yyyy
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()}`;
}

async function createRecipient(integration, customer) {
  const { lastName, firstName, middleName } = splitFullName(customer.fullName);

  const [recipient] = await callNovaPoshta(
    integration,
    'Counterparty',
    'save',
    {
      CounterpartyType: 'PrivatePerson',
      CounterpartyProperty: 'Recipient',
      LastName: lastName,
      FirstName: firstName,
      MiddleName: middleName,
      Phone: normalizePhone(customer.phone),
      Email: customer.email,
    },
  );

  return {
    recipientRef: recipient.Ref,
    contactRef: recipient.ContactPerson.data[0].Ref,
  };
}

export async function createTtn({ customer, items, total }) {
  const integration = await getIntegration();
  const { settings } = integration;
  const recipient = await createRecipient(integration, customer);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [document] = await callNovaPoshta(
    integration,
    'InternetDocument',
    'save',
    {
      PayerType: settings.payerType,
      PaymentMethod: settings.paymentMethod,
      DateTime: formatDate(new Date()),
      CargoType: settings.cargoType,
      Weight: String(itemsCount * WEIGHT_PER_ITEM_KG),
      ServiceType: settings.serviceType,
      SeatsAmount: '1',
      Description: PARCEL_DESCRIPTION,
      Cost: String(total),

      CitySender: settings.citySenderRef,
      Sender: settings.senderRef,
      SenderAddress: settings.senderWarehouseRef,
      ContactSender: settings.contactSenderRef,
      SendersPhone: settings.sendersPhone,

      CityRecipient: customer.cityRef,
      Recipient: recipient.recipientRef,
      RecipientAddress: customer.branch,
      ContactRecipient: recipient.contactRef,
      RecipientsPhone: normalizePhone(customer.phone),
    },
  );

  return { ttn: document.IntDocNumber };
}
