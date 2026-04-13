import { Hono } from 'hono';
import Product from '../models/Product';

const products = new Hono();

// Get all products
products.get('/', async (c) => {
  try {
    const allProducts = await Product.find({});
    return c.json(allProducts);
  } catch (error) {
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Create a product (Initial seed helper)
products.post('/seed', async (c) => {
  try {
    const sampleProducts = [
      {
        name: "Premium T-Shirt",
        description: "Comfortable cotton t-shirt",
        price: 25000,
        category: "Clothing",
        images: ["https://example.com/tshirt.jpg"],
        stock: 100,
        featured: true
      }
    ];
    await Product.insertMany(sampleProducts);
    return c.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to seed database' }, 500);
  }
});

export default products;
