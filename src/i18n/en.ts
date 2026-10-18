export type PluralForms = {
  one: string;
  few?: string;
  many?: string;
  other: string;
};

export type TranslationValue = string | PluralForms;

export const en = {
  'language.label': 'Language',

  'nav.home': 'Home',
  'nav.phones': 'Phones',
  'nav.tablets': 'Tablets',
  'nav.accessories': 'Accessories',

  'header.favourites': 'Favourites',
  'header.cart': 'Cart',
  'header.openMenu': 'Open menu',
  'header.closeMenu': 'Close menu',
  'header.itemsCount': {
    one: '{label}, {count} item',
    other: '{label}, {count} items',
  },
} satisfies Record<string, TranslationValue>;

export type TranslationKey = keyof typeof en;

export type Translations = Record<TranslationKey, TranslationValue>;
