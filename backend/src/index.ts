import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import paymentRoutes from './routes/payment'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import seedRoutes from './routes/seed'
import uploadRoutes from './routes/upload'
import { connectDB } from './lib/db'

// Connect to MongoDB
connectDB()

const app = new Hono()

app.use('/api/*', cors())

// Register routes
app.route('/api/auth', authRoutes)
app.route('/api/payment', paymentRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/users', userRoutes)
app.route('/api/seed', seedRoutes)
app.route('/api/upload', uploadRoutes)

app.get('/', (c) => c.text('Enola Shop API is running'))

const port = Number(process.env.PORT) || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app
