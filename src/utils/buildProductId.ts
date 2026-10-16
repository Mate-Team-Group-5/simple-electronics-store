export function buildProductId(
  namespaceId: string,
  capacity: string,
  color: string,
) {
  const result = `${namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase()}`;

  return result.replaceAll(' ', '-');
}
