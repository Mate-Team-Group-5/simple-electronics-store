import type {
  WarehouseType,
  NovaPoshtaCity,
  NovaPoshtaWarehouse,
} from '@/types/NovaPoshta';

type RawSettlement = {
  Present: string;
  DeliveryCity: string;
  Warehouses: number;
};

type SearchSettlementsData = {
  Addresses: RawSettlement[];
};

async function callNovaPoshta<T>(
  calledMethod: string,
  methodProperties: Record<string, string>,
): Promise<T[]> {
  const urlNovaPoshtaAPI = 'https://api.novaposhta.ua/v2.0/json/';
  const response = await fetch(urlNovaPoshtaAPI, {
    method: 'POST',
    body: JSON.stringify({
      apiKey: '',
      modelName: 'Address',
      calledMethod,
      methodProperties,
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const json = await response.json();
  if (!json.success) {
    throw new Error(json.errors[0]);
  }
  return json.data;
}

export async function searchCities(query: string): Promise<NovaPoshtaCity[]> {
  const trimmed = query.trim();

  if (!trimmed) {
    return [];
  }

  const data = await callNovaPoshta<SearchSettlementsData>(
    'searchSettlements',
    { CityName: trimmed, Limit: '20', Page: '1' },
  );

  const addresses = data[0]?.Addresses ?? [];

  return addresses
    .filter((address) => address.Warehouses > 0)
    .map((address) => ({
      ref: address.DeliveryCity,
      name: address.Present,
    }));
}

const WAREHOUSE_TYPE_REFS: Record<WarehouseType, string[]> = {
  branch: [
    '841339c7-591a-42e2-8233-7a0a00f0ed6f', // Поштове
    '9a68df70-0267-42a8-bb5c-37f427e36ee4', // Вантажне
  ],
  postomat: ['f9316480-5f2d-425d-bc2c-ac7cd29decf0'], // Поштомат
};

type RawWarehouse = {
  Ref: string;
  Description: string;
  Number: string;
  WarehouseStatus: string;
  DenyToSelect: string;
  PostMachineType: string;
};

export async function getWarehouses(
  cityRef: string,
  type: WarehouseType,
  query: string,
): Promise<NovaPoshtaWarehouse[]> {
  if (!cityRef) {
    return [];
  }

  const results = await Promise.all(
    WAREHOUSE_TYPE_REFS[type].map((typeRef) =>
      callNovaPoshta<RawWarehouse>('getWarehouses', {
        CityRef: cityRef,
        TypeOfWarehouseRef: typeRef,
        FindByString: query.trim(),
        Limit: '20',
        Page: '1',
      }),
    ),
  );

  return results
    .flat()
    .filter(
      (warehouse) =>
        warehouse.WarehouseStatus === 'Working' &&
        warehouse.DenyToSelect === '0' &&
        warehouse.PostMachineType !== 'ForResidentsOfEntrance',
    )
    .map((warehouse) => ({
      ref: warehouse.Ref,
      name: warehouse.Description,
      number: warehouse.Number,
    }))
    .sort((a, b) => Number(a.number) - Number(b.number));
}
