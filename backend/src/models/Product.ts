import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  badge?: 'Шинэ' | 'Хямдрал' | 'Hot' | 'NEW' | 'SALE' | 'HOT' | 'Эрэлттэй';
  stock: number;
  images: string[];
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  sizes?: string[];
  colors?: string[];
  details?: string;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  badge: { type: String },
  stock: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  sizes: { type: [String] },
  colors: { type: [String] },
  details: { type: String },
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    transform: function (doc, ret: Record<string, any>) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
