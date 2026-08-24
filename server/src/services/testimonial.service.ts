import { Testimonial, type ITestimonial } from '../models/Testimonial';
import { NotFoundError } from '../lib/errors';

export const testimonialService = {
  async create(data: {
    name: string;
    role: string;
    gender: 'male' | 'female';
    image: string;
    text: string;
    active?: boolean;
    sortOrder?: number;
  }) {
    const testimonial = await Testimonial.create(data);
    return testimonial.toObject();
  },

  async listActive() {
    const testimonials = await Testimonial.find({ active: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    return testimonials;
  },

  async listAll() {
    const testimonials = await Testimonial.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    return testimonials;
  },

  async getById(id: string) {
    const testimonial = await Testimonial.findById(id).lean();
    if (!testimonial) throw new NotFoundError('Testimonial not found');
    return testimonial;
  },

  async update(id: string, data: Partial<ITestimonial>) {
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) throw new NotFoundError('Testimonial not found');
    return testimonial.toObject();
  },

  async delete(id: string) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) throw new NotFoundError('Testimonial not found');
    return { message: `Testimonial from "${testimonial.name}" deleted` };
  },
};
