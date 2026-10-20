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
  'header.account': 'Account',
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
  'common.noResults': 'Nothing found',
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

  'checkout.title': 'Checkout',
  'checkout.goShopping': 'Go shopping',
  'checkout.formLabel': 'Delivery and payment',
  'checkout.yourOrder': 'Your order',
  'checkout.placeOrder': 'Place order',
  'checkout.placingOrder': 'Placing order…',

  'checkout.contactDetails': 'Contact details',
  'checkout.fullName': 'Full name',
  'checkout.fullNamePlaceholder': 'John Smith',
  'checkout.phone': 'Phone',
  'checkout.email': 'Email',
  'checkout.delivery': 'Delivery',
  'checkout.novaPoshta': 'Nova Poshta',
  'checkout.novaPoshtaHint': 'To a branch in 1–2 days',
  'checkout.courier': 'Courier',
  'checkout.courierHint': 'To your door in 1–3 days',
  'checkout.pickup': 'Pickup from store',
  'checkout.pickupHint': 'Free, ready tomorrow',
  'checkout.city': 'City',
  'checkout.cityPlaceholder': 'Choose your city',
  'checkout.branch': 'Nova Poshta branch',
  'checkout.branchPlaceholder': 'Choose a branch',
  'checkout.branchCityFirst': 'Choose your city first',
  'checkout.postomat': 'Nova Poshta parcel locker',
  'checkout.postomatPlaceholder': 'Choose a parcel locker',
  'checkout.warehouseBranch': 'Branch',
  'checkout.warehousePostomat': 'Parcel locker',
  'checkout.address': 'Address',
  'checkout.addressPlaceholder': 'Street, building, apartment',
  'checkout.pickupInfo':
    'Nice Gadgets store: 1 Khreshchatyk St, Kyiv. Open daily 10:00–21:00.',
  'checkout.payment': 'Payment',
  'checkout.card': 'Card on delivery',
  'checkout.cardHint': 'Pay by card when you receive the order',
  'checkout.cash': 'Cash on delivery',
  'checkout.cashHint': 'Pay in cash when you receive the order',

  'checkout.errors.fullName': 'Enter your full name',
  'checkout.errors.phone': 'Enter a valid phone number',
  'checkout.errors.email': 'Enter a valid email',
  'checkout.errors.city': 'Choose your city',
  'checkout.errors.branch': 'Choose a Nova Poshta branch',
  'checkout.errors.postomat': 'Choose a Nova Poshta parcel locker',
  'checkout.errors.address': 'Enter your delivery address',

  'summary.items': 'Items ({count})',
  'summary.free': 'Free',
  'summary.total': 'Total',

  'success.title': 'Thank you for your order!',
  'success.order': 'Order',
  'success.placed': 'has been placed. We will send the details to',
  'success.continue': 'Continue shopping',

  'auth.registerSubtitle':
    'Save your favourites and cart and check out faster.',
  'auth.password': 'Password',
  'auth.passwordHint': 'At least {min} characters',
  'auth.confirmPassword': 'Repeat password',
  'auth.register': 'Sign up',
  'auth.registering': 'Signing up…',
  'auth.errors.passwordShort': 'Password must be at least 6 characters',
  'auth.errors.passwordMismatch': 'Passwords do not match',
  'auth.errors.emailTaken': 'An account with this email already exists',
  'auth.showPassword': 'Show password',
  'auth.hidePassword': 'Hide password',
  'auth.capsLock': 'Caps Lock is on',
  'auth.strength.weak': 'Weak',
  'auth.strength.medium': 'Medium',
  'auth.strength.strong': 'Strong',
  'auth.acceptTerms': 'I agree to the terms of use and privacy policy',
  'auth.errors.terms': 'Please accept the terms to continue',
  'auth.benefits.title': 'Why create an account',
  'auth.benefits.syncTitle': 'Favourites and cart everywhere',
  'auth.benefits.syncText':
    'Your saved products are available on any device after you sign in.',
  'auth.benefits.fastTitle': 'Faster checkout',
  'auth.benefits.fastText': 'Your contact details are filled in automatically.',
  'auth.benefits.historyTitle': 'Order history',
  'auth.benefits.historyText': 'Track your orders and reorder in one click.',
  'auth.tabs.login': 'Sign in',
  'auth.tabs.register': 'Sign up',
  'auth.loginSubtitle': 'Welcome back! Sign in to your account.',
  'auth.login': 'Sign in',
  'auth.loggingIn': 'Signing in…',
  'auth.errors.passwordRequired': 'Enter your password',
  'auth.errors.invalidCredentials': 'Wrong email or password',

  'account.greeting': 'Hello!',
  'account.signedInAs': 'You are signed in as {email}',
  'account.logout': 'Sign out',

  'checkout.haveAccount': 'Already have an account?',
  'chat.open': 'Open chat assistant',
  'chat.close': 'Close chat',
  'chat.title': 'Nice Gadgets assistant',
  'chat.subtitle': 'AI · replies in a few seconds',
  'chat.greeting':
    "Hi! I'm the Nice Gadgets assistant. I'll help you choose a phone, tablet or watch and answer questions about delivery.",
  'chat.placeholder': 'Type a message…',
  'chat.send': 'Send',
  'chat.clear': 'Clear chat',
  'chat.typing': 'Assistant is typing',
  'chat.suggestions.photo': 'Which phone is best for photos?',
  'chat.suggestions.budget': 'What can I buy under $500?',
  'chat.suggestions.delivery': 'How does delivery work?',
  'chat.errors.common': 'Something went wrong. Please try again.',
  'chat.openProduct': 'Open',
  'chat.suggestions.thisProduct': 'Tell me about this product',
  'chat.errors.tooManyRequests': 'Too many requests. Please wait a minute.',
} satisfies Record<string, TranslationValue>;

export type TranslationKey = keyof typeof en;

export type Translations = Record<TranslationKey, TranslationValue>;
