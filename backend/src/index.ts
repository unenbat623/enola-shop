import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import paymentRoutes from './routes/payment'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'
import userRoutes from './routes/users'
import { connectDB } from './lib/db'

// Connect to MongoDB
connectDB()

const app = new Hono()

app.use('/api/*', cors())

// Register routes
app.route('/api/payment', paymentRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/users', userRoutes)

app.get('/', (c) => c.text('Antigravity API is running'))

const port = Number(process.env.PORT) || 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app
