import jwt from 'jsonwebtoken'
import { Context, Next } from 'hono'
import User from '../models/User'

export type HonoVariables = {
  Variables: {
    user: any // Replace with proper IUser type if available
  }
}

export const authMiddleware = async (c: Context<HonoVariables>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string }
    const user = await User.findById(decoded.id)
    if (!user) {
      return c.json({ error: 'User not found' }, 401)
    }
    c.set('user', user)
    await next()
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

export const adminMiddleware = async (c: Context<HonoVariables>, next: Next) => {
  const user = c.get('user')
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'Forbidden: Admin access required' }, 403)
  }
  await next()
}
