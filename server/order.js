import sendEmail from './resendapi.js';
import pool from './db.js';
import { renderOrderEmail } from './emails/renderOrderEmail.js';
import { createTtn } from './novaPoshta.js';

async function orderHandler(req, res) {
  try {
    const { customer, items, total } = req.body;

    const deliveryType = customer.delivery;
    const usermail = customer.email;
    const orderDetails = customer;
    const orderCart = items;

    if (!usermail) {
      return res.status(400).json({ error: 'Email required' });
    }

    let newTtn;
    // Posible types: pickup, courier, nova-poshta
    if (deliveryType === 'nova-poshta') {
      newTtn = (await createTtn({ customer: orderDetails, items, total })).ttn;
    }

    // Storing to DB, and return new OrderId
    const newOrder = await pool.query(
      'INSERT INTO orders (email, details, cart) VALUES ($1,$2, $3 ) RETURNING id ',
      [usermail, orderDetails, orderCart],
    );

    const newOrderId = newOrder.rows[0].id;

    // Sending mail.
    const mailPrams = {
      orderId: newOrderId,
      customer: orderDetails,
      items: orderCart,
      total: total,
      ttn: newTtn,
    };
    const body = renderOrderEmail(mailPrams);
    sendEmail(usermail, body);

    res.status(201).json({ orderId: newOrderId });
    //res.status(400).json({ error: 'Method not implemented' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error registering order' });
  }
}

export default orderHandler;
