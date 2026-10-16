export type NovaPoshtaBranch = {
  id: string;
  name: string;
};

// Stub data: a few cities and branches instead of the real Nova Poshta API.
// Later it can be replaced with a request to api.novaposhta.ua.
const BRANCHES_BY_CITY: Record<string, NovaPoshtaBranch[]> = {
  Kyiv: [
    { id: 'kyiv-1', name: 'Branch No. 1: 2 Pyrohivskyi Shliakh St' },
    { id: 'kyiv-5', name: 'Branch No. 5: 22 Fedorova St' },
    { id: 'kyiv-12', name: 'Branch No. 12: 14 Khreshchatyk St' },
    { id: 'kyiv-31', name: 'Branch No. 31: 3 Lesi Ukrainky Blvd' },
  ],
  Lviv: [
    { id: 'lviv-1', name: 'Branch No. 1: 5 Horodotska St' },
    { id: 'lviv-7', name: 'Branch No. 7: 21 Svobody Ave' },
    { id: 'lviv-15', name: 'Branch No. 15: 8 Stryiska St' },
  ],
  Kharkiv: [
    { id: 'kharkiv-3', name: 'Branch No. 3: 10 Nauky Ave' },
    { id: 'kharkiv-9', name: 'Branch No. 9: 42 Sumska St' },
  ],
  Odesa: [
    { id: 'odesa-2', name: 'Branch No. 2: 16 Derybasivska St' },
    { id: 'odesa-11', name: 'Branch No. 11: 7 Shevchenka Ave' },
  ],
  Dnipro: [
    { id: 'dnipro-4', name: 'Branch No. 4: 30 Yavornytskoho Ave' },
    { id: 'dnipro-8', name: 'Branch No. 8: 12 Hlinky St' },
  ],
};

export const DELIVERY_CITIES = Object.keys(BRANCHES_BY_CITY);

export function getNovaPoshtaBranches(city: string): NovaPoshtaBranch[] {
  return BRANCHES_BY_CITY[city] ?? [];
}
