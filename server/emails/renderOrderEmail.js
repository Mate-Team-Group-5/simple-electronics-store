const SITE_URL =
  'https://mate-team-group-5.github.io/simple-electronics-store/';
const TRACKING_URL = 'https://novaposhta.ua/tracking/';
const FONT = 'Mont, Arial, Helvetica, sans-serif';

const COLORS = {
  primary: '#313237',
  secondary: '#89939a',
  border: '#e2e6e9',
  surface: '#fafbfc',
  success: '#27ae60',
  white: '#ffffff',
};

const PAYMENT_LABELS = {
  card: 'карткою',
  cash: 'готівкою при отриманні',
};

const ITEM_WORDS = {
  one: 'товар',
  few: 'товари',
  many: 'товарів',
  other: 'товару',
};

const pluralRules = new Intl.PluralRules('uk-UA');
const priceFormatter = new Intl.NumberFormat('uk-UA');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPrice(amount) {
  return `${priceFormatter.format(amount)} $`;
}

function formatItemsCount(count) {
  return `${count} ${ITEM_WORDS[pluralRules.select(count)]}`;
}

function formatTtn(ttn) {
  const digits = String(ttn).replace(/\D/g, '');
  const pretty = digits.replace(/^(\d{2})(\d{4})(\d{4})(\d+)$/, '$1 $2 $3 $4');

  return { digits, pretty };
}

function getDeliveryLines({ delivery, city, branchName, address }) {
  if (delivery === 'pickup') {
    return ['Самовивіз з магазину'];
  }

  if (delivery === 'courier') {
    return ['Курʼєрська доставка', city, address];
  }

  return ['Нова Пошта', city, branchName];
}

function renderLabel(text) {
  return `<div style="font-size:12px;line-height:16px;font-weight:700;color:${COLORS.secondary};text-transform:uppercase;letter-spacing:0.5px;">${text}</div>`;
}

function renderItemRow({ name, image, quantity, price }) {
  const imageUrl = new URL(image, SITE_URL).href;
  const count = Number(quantity);

  return `
    <tr>
      <td width="64" style="padding:16px 16px 16px 0;border-bottom:1px solid ${COLORS.border};">
        <img src="${escapeHtml(imageUrl)}" width="64" height="64" alt="${escapeHtml(name)}"
          style="display:block;width:64px;height:64px;object-fit:contain;border:1px solid ${COLORS.border};">
      </td>
      <td style="padding:16px 0;border-bottom:1px solid ${COLORS.border};">
        <div style="font-size:14px;line-height:20px;font-weight:600;color:${COLORS.primary};">${escapeHtml(name)}</div>
        <div style="padding-top:4px;font-size:12px;line-height:16px;color:${COLORS.secondary};">${count} × ${formatPrice(price)}</div>
      </td>
      <td align="right" style="padding:16px 0 16px 16px;border-bottom:1px solid ${COLORS.border};font-size:16px;font-weight:700;white-space:nowrap;color:${COLORS.primary};">
        ${formatPrice(price * count)}
      </td>
    </tr>`;
}

function renderTtnBlock(ttn) {
  if (!ttn) {
    return '';
  }

  const { digits, pretty } = formatTtn(ttn);
  const trackingUrl = `${TRACKING_URL}${encodeURIComponent(digits)}`;

  return `
    <tr>
      <td style="padding:0 32px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          style="background:${COLORS.surface};border:1px solid ${COLORS.border};">
          <tr>
            <td style="padding:16px 20px;">
              ${renderLabel('ТТН Нової Пошти')}
              <div style="padding-top:4px;font-size:18px;line-height:24px;font-weight:700;letter-spacing:1px;color:${COLORS.primary};">${pretty}</div>
            </td>
            <td align="right" style="padding:16px 20px;">
              <a href="${trackingUrl}" target="_blank"
                style="display:inline-block;padding:12px 20px;background:${COLORS.primary};color:${COLORS.white};font-size:12px;font-weight:700;text-transform:uppercase;text-decoration:none;">
                Відстежити
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function renderOrderEmail({ orderId, customer, items, total, ttn }) {
  const safeOrderId = escapeHtml(orderId);
  const itemsCount = items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const itemsHtml = items.map(renderItemRow).join('');
  const deliveryHtml = getDeliveryLines(customer)
    .filter(Boolean)
    .map(escapeHtml)
    .join('<br>');
  const paymentLabel = PAYMENT_LABELS[customer.payment] ?? '';

  return `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Замовлення #${safeOrderId}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.surface};">
  <div style="display:none;max-height:0;overflow:hidden;">
    Замовлення #${safeOrderId} оформлено. Дякуємо за покупку в Nice Gadgets!
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.surface};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
          style="width:100%;max-width:600px;background:${COLORS.white};border:1px solid ${COLORS.border};font-family:${FONT};color:${COLORS.primary};">

          <tr>
            <td style="padding:20px 32px;border-bottom:1px solid ${COLORS.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:15px;line-height:16px;font-weight:800;letter-spacing:0.5px;">NICE<br>GADGETS</td>
                  <td align="right" style="font-size:12px;color:${COLORS.secondary};">Замовлення #${safeOrderId}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="40" height="40" align="center" valign="middle"
                    style="width:40px;height:40px;border-radius:50%;background:${COLORS.success};color:${COLORS.white};font-size:22px;line-height:40px;">
                    &#10003;
                  </td>
                </tr>
              </table>
              <h1 style="margin:16px 0 8px;font-size:26px;line-height:32px;font-weight:800;color:${COLORS.primary};">Дякуємо за замовлення!</h1>
              <p style="margin:0;font-size:14px;line-height:21px;color:${COLORS.secondary};">
                ${escapeHtml(customer.fullName)}, ми отримали ваше замовлення і вже готуємо його до відправки.
              </p>
            </td>
          </tr>

          ${renderTtnBlock(ttn)}

          <tr>
            <td style="padding:0 32px;">
              <div style="padding-bottom:8px;border-bottom:1px solid ${COLORS.border};">${renderLabel('Ваше замовлення')}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 0 24px;font-size:14px;color:${COLORS.secondary};">Разом · ${formatItemsCount(itemsCount)}</td>
                  <td align="right" style="padding:16px 0 24px;font-size:26px;font-weight:800;white-space:nowrap;">${formatPrice(total)}</td>
                </tr>
              </table>
            </td>
          </tr>

                    <tr>
            <td style="padding:0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" valign="top" style="padding:16px 20px;border:1px solid ${COLORS.border};">
                    ${renderLabel('Контакти')}
                    <p style="margin:8px 0 0;font-size:14px;line-height:22px;">
                      ${escapeHtml(customer.fullName)}<br>
                      ${escapeHtml(customer.phone)}<br>
                      ${escapeHtml(customer.email)}
                    </p>
                  </td>
                  <td width="16" style="width:16px;font-size:0;line-height:0;">&nbsp;</td>
                  <td width="50%" valign="top" style="padding:16px 20px;border:1px solid ${COLORS.border};">
                    ${renderLabel('Доставка')}
                    <p style="margin:8px 0 0;font-size:14px;line-height:22px;">
                      ${deliveryHtml}<br>
                      <span style="color:${COLORS.secondary};">Оплата: ${paymentLabel}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;border-top:1px solid ${COLORS.border};background:${COLORS.surface};font-size:12px;line-height:18px;color:${COLORS.secondary};">
              Питання щодо замовлення? Дайте відповідь на цей лист.<br>
              © ${new Date().getFullYear()} Nice Gadgets
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
