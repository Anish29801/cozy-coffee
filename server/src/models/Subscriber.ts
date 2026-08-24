import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  name?: string;
  unsubToken: string;
  active: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    unsubToken: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ active: 1 });
subscriberSchema.index({ unsubToken: 1 });

export const Subscriber = mongoose.model<ISubscriber>('Subscriber', subscriberSchema);
