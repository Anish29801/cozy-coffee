import { Subscriber } from '../models/Subscriber';
import { ConflictError, NotFoundError } from '../lib/errors';

export const newsletterService = {
  async subscribe(email: string, name?: string) {
    const existing = await Subscriber.findOne({ email, active: true });
    if (existing) {
      throw new ConflictError('This email is already subscribed');
    }

    // Reactivate if previously unsubscribed
    const reactivated = await Subscriber.findOneAndUpdate(
      { email, active: false },
      { active: true, unsubscribedAt: undefined, name },
      { new: true }
    );

    if (reactivated) {
      return { email: reactivated.email, message: 'Welcome back!' };
    }

    const subscriber = await Subscriber.create({ email, name });
    return { email: subscriber.email, message: 'Welcome to the Cozy Coffee family!' };
  },

  async unsubscribe(token: string) {
    const subscriber = await Subscriber.findOne({ unsubToken: token, active: true });
    if (!subscriber) {
      throw new NotFoundError('Invalid unsubscribe link');
    }

    subscriber.active = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return { message: "You've been unsubscribed. We'll miss you!" };
  },

  async listActive(page = 1, limit = 20) {
    const total = await Subscriber.countDocuments({ active: true });
    const subscribers = await Subscriber.find({ active: true })
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('email name subscribedAt')
      .lean();

    return {
      subscribers,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  },

  async getStats() {
    const totalActive = await Subscriber.countDocuments({ active: true });
    const totalUnsubscribed = await Subscriber.countDocuments({ active: false });
    const thisMonth = await Subscriber.countDocuments({
      active: true,
      subscribedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    return { totalActive, totalUnsubscribed, thisMonth };
  },
};
