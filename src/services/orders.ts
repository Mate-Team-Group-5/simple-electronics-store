import { client } from '@/utils/fetchClient';
import type { CheckoutFormValues } from '@/utils/validateCheckout';

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

export type Order = {
  customer: CheckoutFormValues;
  items: OrderItem[];
  total: number;
};

export type PlacedOrder = {
  orderId: string;
};

//const FAKE_DELAY = 1000;

// Stub: there is no backend yet, so we only pretend to send the order.
// Replace the body with a real request when the API is ready.
export function placeOrder(order: Order): Promise<PlacedOrder> {
  /*   return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Order sent:', order);

      resolve({
        orderId: String(Math.floor(100000 + Math.random() * 900000)),
      });
    }, FAKE_DELAY);
  }); */
  return client.post('/order', order);
}
