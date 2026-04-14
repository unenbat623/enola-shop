import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import Product from '../models/Product'

const seed = new Hono()

seed.post('/', async (c) => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@enola.mn' })
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash('admin123', salt)
      await User.create({
        name: 'Admin',
        email: 'admin@enola.mn',
        password: hashedPassword,
        role: 'admin'
      })
    }

    // Seed 20 products
    await Product.deleteMany({}) // clear existing
    
    const categories = ['Цүнх & Уут', 'Хувцас', 'Гутал', 'Үнэт эдлэл']
    const categoriesSlugs = ['bags', 'clothing', 'shoes', 'jewelry']
    
    const sampleProducts = Array.from({ length: 20 }).map((_, i) => {
      const catIdx = i % categories.length
      return {
        name: `Бүтээгдэхүүн ${i + 1}`,
        slug: `product-${i + 1}`,
        price: 50000 + (Math.floor(Math.random() * 10) * 10000),
        category: categories[catIdx],
        categorySlug: categoriesSlugs[catIdx],
        images: [`https://picsum.photos/seed/${i + 1}/400/400`],
        description: `Гоёмсог шинэ загварын ${categories[catIdx].toLowerCase()}. Өдөр тутам болон гоёлд төгс зохицно.`,
        stock: 10,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Хар", "Цагаан"],
        badge: i % 4 === 0 ? 'NEW' : i % 5 === 0 ? 'SALE' : i % 7 === 0 ? 'HOT' : '',
        inStock: true,
        rating: 4.5 + Math.random() * 0.5,
        reviewCount: Math.floor(Math.random() * 100)
      }
    })

    await Product.insertMany(sampleProducts)

    return c.json({ message: 'Database seeded with admin and 20 products successful.' })
  } catch (error: any) {
    return c.json({ error: error.message || 'Seeding failed' }, 500)
  }
})

export default seed
