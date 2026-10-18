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

  'common.loading': 'Loading...',
  'common.error': 'Something went wrong. Please try again.',
  'common.reload': 'Reload',
  'breadcrumbs.label': 'Breadcrumbs',

  'catalog.filteredCount': {
    one: '{shown} of {count} model',
    other: '{shown} of {count} models',
  },
  'catalog.empty': 'There are no {category} yet',
  'catalog.filters': 'Filters',
  'catalog.noMatches': 'No products match your filters',
  'catalog.resetFilters': 'Reset filters',

  'sort.label': 'Sort by',
  'sort.newest': 'Newest',
  'sort.alphabetically': 'Alphabetically',
  'sort.cheapest': 'Cheapest',
  'perPage.label': 'Items on page',
  'perPage.all': 'All',

  'pagination.label': 'Pagination',
  'pagination.previous': 'Previous page',
  'pagination.next': 'Next page',
  'pagination.page': 'Page {page}',

  'filters.reset': 'Reset ({count})',
  'filters.search': 'Search',
  'filters.searchLabel': 'Search by name',
  'filters.price': 'Price, $',
  'filters.minPrice': 'Minimum price',
  'filters.maxPrice': 'Maximum price',
  'filters.capacity': 'Capacity',
  'filters.ram': 'RAM',
  'filters.year': 'Year',
  'filters.showMore': 'Show more',
  'filters.showLess': 'Show less',

  'specs.screen': 'Screen',
  'specs.resolution': 'Resolution',
  'specs.processor': 'Processor',
  'specs.ram': 'RAM',
  'specs.capacity': 'Capacity',
  'specs.builtInMemory': 'Built in memory',
  'specs.camera': 'Camera',
  'specs.zoom': 'Zoom',
  'specs.cell': 'Cell',

  'card.addToCart': 'Add to cart',
  'card.inCart': '{count} in cart',
  'card.addToFavourites': 'Add to favourites',
  'card.removeFromFavourites': 'Remove from favourites',

  'details.notFound': 'Product not found',
  'details.availableColors': 'Available colors',
  'details.selectCapacity': 'Select capacity',
  'details.photo': '{name}, photo {number}',
  'details.about': 'About',
  'details.techSpecs': 'Tech specs',
  'details.alsoLike': 'You may also like',

  'cart.empty': 'Your cart is empty',
  'cart.total': {
    one: 'Total for {count} item',
    other: 'Total for {count} items',
  },
  'cart.checkout': 'Checkout',
  'cart.remove': 'Remove from cart',
  'quantity.decrease': 'Decrease quantity',
  'quantity.increase': 'Increase quantity',

  'favourites.empty': 'You have no favourites yet',
  'favourites.count': {
    one: '{count} item',
    other: '{count} items',
  },

  'notFound.title': 'Page Not Found',
} satisfies Record<string, TranslationValue>;

export type TranslationKey = keyof typeof en;

export type Translations = Record<TranslationKey, TranslationValue>;
