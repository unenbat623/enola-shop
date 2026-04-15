import { Hono } from 'hono';
import cloudinary from '../config/cloudinary';
import { authMiddleware, adminMiddleware } from '../lib/auth';

const upload = new Hono();

// Upload image to Cloudinary
upload.post('/image', authMiddleware, adminMiddleware, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return c.json({ error: 'No image provided' }, 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'enola_shop' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return c.json(result);
  } catch (error: any) {
    return c.json({ error: error.message || 'Upload failed' }, 500);
  }
});

export default upload;
