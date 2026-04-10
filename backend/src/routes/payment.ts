import { Hono } from 'hono'

const payment = new Hono()

// POST /api/payment/qpay/create
payment.post('/qpay/create', async (c) => {
  const { orderId, amount } = await c.req.json()
  
  // Simulate QPay API response
  const invoiceId = `INV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
  
  return c.json({
    success: true,
    qpayUrl: `https://qpay.mn/pay/${invoiceId}`,
    qrImage: "base64_encoded_qr_image_here",
    invoiceId
  })
})

// GET /api/payment/qpay/check/:invoiceId
payment.get('/qpay/check/:invoiceId', async (c) => {
  const invoiceId = c.req.param('invoiceId')
  
  // Simulate polling: 50% chance of success
  const isPaid = Math.random() > 0.5
  
  return c.json({
    paid: isPaid,
    paidAt: isPaid ? new Date().toISOString() : null,
    invoiceId
  })
})

// POST /api/payment/confirm
payment.post('/confirm', async (c) => {
  const { orderId, method, invoiceId } = await c.req.json()
  
  // Here you would typically update your database
  console.log(`Order ${orderId} confirmed via ${method}`)
  
  return c.json({
    success: true,
    orderId,
    status: 'confirmed'
  })
})

export default payment
