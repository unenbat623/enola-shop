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

const app = new Hono()

// 1. CORS хамгийн эхэнд байх ёстой
app.use(
  '/api/*',
  cors({
    origin: [
      'http://localhost:5173',
      'https://enola-shop.pages.dev',
      'https://enola-shop-1.onrender.com',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// 2. Health check - DB холболтгүйгээр
app.get('/api/health', (c) => c.json({ status: 'ok', message: 'API is alive' }))

// Routes
app.route('/api/auth', authRoutes)
app.route('/api/payment', paymentRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/users', userRoutes)
app.route('/api/seed', seedRoutes)
app.route('/api/upload', uploadRoutes)

app.get('/', (c) => c.text('Enola Shop API is running'))

const PORT = Number(process.env.PORT) || 3000

connectDB()
  .then(() => {
    console.log('MongoDB холбогдлоо')
    serve({ fetch: app.fetch, port: PORT }, () => {
      console.log(`Server ${PORT} порт дээр ажиллаж байна`)
    })
  })
  .catch((err) => {
    console.error('MongoDB холбогдож чадсангүй:', err)
    process.exit(1)
  })


export { app }