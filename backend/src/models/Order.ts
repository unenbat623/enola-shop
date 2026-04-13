import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: string;
  items: any[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  status: 'Хүлээгдэж буй' | 'Илгээгдсэн' | 'Хүргэгдсэн' | 'Цуцлагдсан';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, default: 'anonymous' }, // Using string for now, could be ObjectId if user system was fully real
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Хүлээгдэж буй', 'Илгээгдсэн', 'Хүргэгдсэн', 'Цуцлагдсан'],
    default: 'Хүлээгдэж буй' 
  },
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

export default mongoose.model<IOrder>('Order', OrderSchema);
