import { Hono } from 'hono';
import Product from '../models/Product';
import { authMiddleware, adminMiddleware, HonoVariables } from '../lib/auth';

const products = new Hono<HonoVariables>();

// Get all products
products.get('/', async (c) => {
  try {
    const allProducts = await Product.find({}).sort({ createdAt: -1 });
    return c.json(allProducts);
  } catch (error) {
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Create product
products.post('/', authMiddleware, adminMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const newProduct = new Product(body);
    await newProduct.save();
    return c.json(newProduct, 201);
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to create product' }, 400);
  }
});

// Update product
products.put('/:id', authMiddleware, adminMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { returnDocument: 'after' });
    if (!updatedProduct) return c.json({ error: 'Product not found' }, 404);
    return c.json(updatedProduct);
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to update product' }, 400);
  }
});

// Delete product
products.delete('/:id', authMiddleware, adminMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return c.json({ error: 'Product not found' }, 404);
    return c.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete product' }, 500);
  }
});

export default products;
