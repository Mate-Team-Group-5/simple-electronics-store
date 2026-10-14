export const ProductCategory = {
  all: 'all',
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];
