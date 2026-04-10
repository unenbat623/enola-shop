import { Hono } from 'hono'
import { cors } from 'hono/cors'
import paymentRoutes from './routes/payment'

const app = new Hono()

app.use('/api/*', cors())

// Register routes
app.route('/api/payment', paymentRoutes)

app.get('/', (c) => c.text('Antigravity API is running'))

export default app
