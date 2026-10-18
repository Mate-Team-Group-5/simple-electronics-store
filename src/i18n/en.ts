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

  'footer.label': 'Footer',
  'footer.github': 'Github',
  'footer.contacts': 'Contacts',
  'footer.rights': 'Rights',
  'footer.backToTop': 'Back to top',

  'home.title': 'Welcome to Nice Gadgets store!',
  'home.newModels': 'Brand new models',
  'home.hotPrices': 'Hot prices',
  'home.shopByCategory': 'Shop by category',

  'category.phones': 'Mobile phones',
  'category.tablets': 'Tablets',
  'category.accessories': 'Accessories',
  'category.modelsCount': {
    one: '{count} model',
    other: '{count} models',
  },

  'banner.label': 'Promo banners',
  'banner.nowAvailable': 'Now available',
  'banner.orderNow': 'Order now',
  'banner.phonesSubtitle': 'Pro camera. Pro display. Pro performance.',
  'banner.tabletsSubtitle': 'A big screen for big ideas.',
  'banner.accessoriesSubtitle': 'Your health and fitness, right on your wrist.',

  'slider.previous': 'Previous slide',
  'slider.next': 'Next slide',
  'slider.goTo': 'Slide {number}',
} satisfies Record<string, TranslationValue>;

export type TranslationKey = keyof typeof en;

export type Translations = Record<TranslationKey, TranslationValue>;
