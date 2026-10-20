const PRODUCT_LINK_PATTERN = /\[\[([a-z0-9-]+)\]\]/g;
const MAX_PRODUCT_LINKS = 3;

export type ParsedChatReply = {
  text: string;
  productIds: string[];
};

export function parseChatReply(content: string): ParsedChatReply {
  const productIds = [...content.matchAll(PRODUCT_LINK_PATTERN)].map(
    (match) => match[1],
  );

  const text = content
    .replace(PRODUCT_LINK_PATTERN, '')
    .replace(/ +([.,!?:;])/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trim();

  return {
    text,
    productIds: [...new Set(productIds)].slice(0, MAX_PRODUCT_LINKS),
  };
}
