import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  gender: 'male' | 'female';
  image: string;
  text: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: 200,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
      maxlength: 500,
    },
    text: {
      type: String,
      required: [true, 'Testimonial text is required'],
      maxlength: 1000,
    },
    active: {
      type: Boolean,
      default: true,
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

testimonialSchema.index({ active: 1, sortOrder: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
