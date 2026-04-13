import { Hono } from 'hono';
import User from '../models/User';
import { authMiddleware, adminMiddleware } from '../lib/auth';

const users = new Hono();

// Get all users
users.get('/', authMiddleware, adminMiddleware, async (c) => {
  try {
    const allUsers = await User.find({}).sort({ createdAt: -1 });
    return c.json(allUsers);
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

export default users;
