async function orderHandler(req, res) {
  const { customer, items } = req.body;

  console.log(customer.email);
  console.log(customer);
  console.log(items);
  res.status(400).json({ error: 'Method not implemented' });
}

export default orderHandler;
