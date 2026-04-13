import { Hono } from 'hono';
import Order from '../models/Order';

const orders = new Hono();

// Get all orders
orders.get('/', async (c) => {
  try {
    const userId = c.req.query('userId');
    const query = userId ? { userId } : {};
    const allOrders = await Order.find(query).sort({ createdAt: -1 });
    return c.json(allOrders);
  } catch (error) {
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Create order
orders.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const newOrder = new Order(body);
    await newOrder.save();
    return c.json(newOrder, 201);
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to create order' }, 400);
  }
});

// Update order status
orders.patch('/:id/status', async (c) => {
  try {
    const id = c.req.param('id');
    const { status } = await c.req.json();
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) return c.json({ error: 'Order not found' }, 404);
    return c.json(updatedOrder);
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to update order status' }, 400);
  }
});

export default orders;
