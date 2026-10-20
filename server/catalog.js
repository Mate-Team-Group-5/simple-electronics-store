import readJSONFile from './readjson.js';

const SIZE_PATTERN = /\s\d+(GB|TB|mm)\b.*$/;

let cachedProducts = null;
let cachedCatalog = null;

function getModelName(productName) {
  return productName.replace(SIZE_PATTERN, '');
}

function sizeToNumber(size) {
  const value = parseFloat(size);

  return size.endsWith('TB') ? value * 1024 : value;
}

async function getProducts() {
  if (!cachedProducts) {
    cachedProducts = await readJSONFile('products.json');
  }

  return cachedProducts;
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
        id: product.itemId,
      });
    }

    const model = models.get(key);

    model.sizes.add(product.capacity);
    model.colors.add(product.color);
    model.maxPrice = Math.max(model.maxPrice, product.price);

    if (product.price < model.minPrice) {
      model.minPrice = product.price;
      model.id = product.itemId;
    }
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

      return `- ${model.name} [[${model.id}]] (${model.category}, ${model.year}): ${sizes}; colors: ${colors}; price: ${price}`;
    })
    .join('\n');
}

export async function getCatalogText() {
  if (!cachedCatalog) {
    cachedCatalog = buildCatalogText(await getProducts());
  }

  return cachedCatalog;
}

export async function findProduct(itemId) {
  const products = await getProducts();

  return products.find((product) => product.itemId === itemId) ?? null;
}
