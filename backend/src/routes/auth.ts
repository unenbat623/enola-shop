import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { authMiddleware } from '../lib/auth'

const auth = new Hono()

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

auth.post('/register', async (c) => {
  try {
    const { name, email, password } = await c.req.json()
    
    if (!name || !email || !password) {
      return c.json({ error: 'All fields are required' }, 400)
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return c.json({ error: 'Email already exists' }, 400)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      email,
      password: hashedPassword
    })
    
    await user.save()

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })

    const userObj = user.toJSON()

    return c.json({ user: userObj, token }, 201)
  } catch (error: any) {
    return c.json({ error: error.message || 'Registration failed' }, 500)
  }
})

auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400)
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !user.password) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })

    const userObj = user.toJSON()
    
    return c.json({ user: userObj, token })
  } catch (error: any) {
    return c.json({ error: error.message || 'Login failed' }, 500)
  }
})

auth.get('/me', authMiddleware, async (c) => {
  const user = c.get('user')
  return c.json({ user })
})

export default auth
