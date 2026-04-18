import { Hono } from 'hono'
import Order from '../models/Order'
import { authMiddleware, adminMiddleware, HonoVariables } from '../lib/auth'

const orders = new Hono<HonoVariables>()

// GET /api/orders — all orders (admin only)
orders.get('/', authMiddleware, adminMiddleware, async (c) => {
  try {
    const allOrders = await Order.find({}).sort({ createdAt: -1 })
    return c.json(allOrders)
  } catch {
    return c.json({ error: 'Failed to fetch orders' }, 500)
  }
})

// GET /api/orders/my — authenticated user's orders
orders.get('/my', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const userId = user._id.toString()
    // Match orders where userId equals the user's ID string
    const myOrders = await Order.find({ userId }).sort({ createdAt: -1 })
    return c.json(myOrders)
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch orders' }, 500)
  }
})

// POST /api/orders — create order (authenticated)
orders.post('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const newOrder = new Order({
      ...body,
      userId: user._id.toString(), // always attach real userId
    })
    await newOrder.save()
    return c.json(newOrder, 201)
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to create order' }, 400)
  }
})

// PATCH /api/orders/:id/status — update status (admin only)
orders.patch('/:id/status', authMiddleware, adminMiddleware, async (c) => {
  try {
    const id = c.req.param('id')
    const { status } = await c.req.json()
    const updated = await Order.findByIdAndUpdate(id, { status }, { returnDocument: 'after' })
    if (!updated) return c.json({ error: 'Order not found' }, 404)
    return c.json(updated)
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to update status' }, 400)
  }
})

// GET /api/orders/:id — get single order
orders.get('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id')
    const user = c.get('user')
    const order = await Order.findById(id)
    
    if (!order) return c.json({ error: 'Order not found' }, 404)
    
    // Ownership check
    if (order.userId !== user._id.toString() && user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 403)
    }
    
    return c.json(order)
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch order' }, 500)
  }
})

export default orders
