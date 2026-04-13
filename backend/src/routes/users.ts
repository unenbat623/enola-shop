import { Hono } from 'hono';
import User from '../models/User';

const users = new Hono();

// Get all users
users.get('/', async (c) => {
  try {
    const allUsers = await User.find({}).sort({ createdAt: -1 });
    return c.json(allUsers);
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

export default users;
