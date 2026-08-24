import { MenuItem, type IMenuItem } from '../models/MenuItem';
import { NotFoundError, ConflictError } from '../lib/errors';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const menuService = {
  async create(data: {
    title: string;
    slug?: string;
    description?: string;
    price: string;
    category: IMenuItem['category'];
    seasonal?: boolean;
    available?: boolean;
    allergens?: string[];
    origin?: string;
    story?: string;
    imageUrl?: string;
    sortOrder?: number;
  }) {
    const slug = data.slug || generateSlug(data.title);

    const existing = await MenuItem.findOne({ slug });
    if (existing) {
      throw new ConflictError(`Menu item with slug "${slug}" already exists`);
    }

    const item = await MenuItem.create({ ...data, slug });
    return item.toObject();
  },

  async list(query: {
    page?: number;
    limit?: number;
    category?: string;
    available?: boolean;
    seasonal?: boolean;
  }) {
    const { page = 1, limit = 20, category, available, seasonal } = query;
    const filter: Record<string, unknown> = {};

    if (category) filter.category = category;
    if (available !== undefined) filter.available = available;
    if (seasonal !== undefined) filter.seasonal = seasonal;

    const total = await MenuItem.countDocuments(filter);
    const items = await MenuItem.find(filter)
      .sort({ category: 1, sortOrder: 1, title: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  },

  async getBySlug(slug: string) {
    const item = await MenuItem.findOne({ slug }).lean();
    if (!item) throw new NotFoundError(`Menu item "${slug}" not found`);
    return item;
  },

  async getById(id: string) {
    const item = await MenuItem.findById(id).lean();
    if (!item) throw new NotFoundError('Menu item not found');
    return item;
  },

  async update(id: string, data: Partial<IMenuItem>) {
    const item = await MenuItem.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!item) throw new NotFoundError('Menu item not found');
    return item.toObject();
  },

  async delete(id: string) {
    const item = await MenuItem.findByIdAndDelete(id);
    if (!item) throw new NotFoundError('Menu item not found');
    return { message: `Menu item "${item.title}" deleted` };
  },

  async getCategories() {
    const categories = await MenuItem.distinct('category', { available: true });
    return categories.sort();
  },
};
