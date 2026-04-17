import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { authMiddleware, HonoVariables } from '../lib/auth'
import { googleAuth } from '@hono/oauth-providers/google'

const auth = new Hono<HonoVariables>()

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

// FRONTEND хаягийг авахдаа төгсгөлийн / тэмдэгтийг устгаж цэвэрлэнэ
const getFrontendUrl = () => {
  let url = process.env.FRONTEND_URL || 'https://enola-shop.pages.dev'
  return url.replace(/\/$/, '')
}

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

// Google OAuth flow
auth.get('/google', (c, next) => {
  if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Missing GOOGLE_CLIENT_SECRET')
    return c.redirect(`${getFrontendUrl()}/login?error=missing_config`)
  }
  return googleAuth({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ['profile', 'email'],
  })(c, next)
}, async (c) => {
  const googleUser = c.get('user-google')
  const frontendUrl = getFrontendUrl()
  
  if (!googleUser || !googleUser.email) {
    return c.redirect(`${frontendUrl}/login?error=oauth_failed`)
  }

  try {
    let user = await User.findOne({ googleId: googleUser.id })

    if (!user) {
      user = await User.findOne({ email: googleUser.email })
      if (user) {
        user.googleId = googleUser.id
        if (!user.avatar && googleUser.picture) {
          user.avatar = googleUser.picture
        }
        await user.save()
      } else {
        user = await User.create({
          googleId: googleUser.id,
          name: googleUser.name || googleUser.email.split('@')[0],
          email: googleUser.email,
          avatar: googleUser.picture,
          role: 'user'
        })
      }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // ✅ Одоо заавал FRONTEND_URL/auth/callback руу шилжинэ
    return c.redirect(`${frontendUrl}/auth/callback?token=${token}`)
  } catch (error) {
    console.error('Google Auth Error:', error)
    return c.redirect(`${frontendUrl}/login?error=server_error`)
  }
})

export default auth
