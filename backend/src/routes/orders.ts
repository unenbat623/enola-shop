import { Hono } from 'hono';
import Order from '../models/Order';
import { authMiddleware, adminMiddleware } from '../lib/auth';

const orders = new Hono();

// Get all orders (admin)
orders.get('/', authMiddleware, adminMiddleware, async (c) => {
  try {
    const allOrders = await Order.find({}).sort({ createdAt: -1 });
    return c.json(allOrders);
  } catch (error) {
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Get my orders
orders.get('/my', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const myOrders = await Order.find({ userId: user._id.toString() }).sort({ createdAt: -1 });
    return c.json(myOrders);
  } catch (error) {
    return c.json({ error: 'Failed to fetch my orders' }, 500);
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
orders.patch('/:id/status', authMiddleware, adminMiddleware, async (c) => {
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
