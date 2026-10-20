import readJSONFile from './readjson.js';

const SIZE_PATTERN = /\s\d+(GB|TB|mm)\b.*$/;

let cachedCatalog = null;

function getModelName(productName) {
  return productName.replace(SIZE_PATTERN, '');
}

function sizeToNumber(size) {
  const value = parseFloat(size);

  return size.endsWith('TB') ? value * 1024 : value;
}

function buildCatalogText(products) {
  const models = new Map();

  for (const product of products) {
    const name = getModelName(product.name);
    const key = `${product.category}|${name}`;

    if (!models.has(key)) {
      models.set(key, {
        name,
        category: product.category,
        year: product.year,
        sizes: new Set(),
        colors: new Set(),
        minPrice: product.price,
        maxPrice: product.price,
      });
    }

    const model = models.get(key);

    model.sizes.add(product.capacity);
    model.colors.add(product.color);
    model.minPrice = Math.min(model.minPrice, product.price);
    model.maxPrice = Math.max(model.maxPrice, product.price);
  }

  return [...models.values()]
    .map((model) => {
      const sizes = [...model.sizes]
        .sort((a, b) => sizeToNumber(a) - sizeToNumber(b))
        .join('/');
      const colors = [...model.colors].join(', ');
      const price =
        model.minPrice === model.maxPrice ?
          `$${model.minPrice}`
        : `$${model.minPrice}-$${model.maxPrice}`;

      return `- ${model.name} (${model.category}, ${model.year}): ${sizes}; colors: ${colors}; price: ${price}`;
    })
    .join('\n');
}

export async function getCatalogText() {
  if (!cachedCatalog) {
    const products = await readJSONFile('products.json');

    cachedCatalog = buildCatalogText(products);
  }

  return cachedCatalog;
}
