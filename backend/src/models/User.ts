import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  googleId?: string;
  avatar?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // don't return password by default
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  googleId: { type: String, sparse: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    transform: function (doc, ret: Record<string, any>) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
  }
});

export default mongoose.model<IUser>('User', UserSchema);
