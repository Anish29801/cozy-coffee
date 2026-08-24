import mongoose, { Schema, Document } from 'mongoose';

export type MenuCategory =
  | 'espresso'
  | 'filter'
  | 'specialty'
  | 'cold_drinks'
  | 'pastries'
  | 'light_bite'
  | 'lunch';

export interface IMenuItem extends Document {
  title: string;
  slug: string;
  description?: string;
  price: string;
  category: MenuCategory;
  seasonal: boolean;
  available: boolean;
  allergens: string[];
  origin?: string;
  story?: string;
  imageUrl?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['espresso', 'filter', 'specialty', 'cold_drinks', 'pastries', 'light_bite', 'lunch'],
    },
    seasonal: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    allergens: {
      type: [String],
      default: [],
    },
    origin: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    story: {
      type: String,
      maxlength: 500,
    },
    imageUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

menuItemSchema.index({ category: 1 });
menuItemSchema.index({ available: 1, sortOrder: 1 });
menuItemSchema.index({ slug: 1 }, { unique: true });

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
