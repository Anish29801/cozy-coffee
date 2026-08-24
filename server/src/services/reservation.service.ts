import { Reservation, type IReservation } from '../models/Reservation';
import { ConflictError, NotFoundError } from '../lib/errors';

const MAX_PER_SLOT = 3;

export const reservationService = {
  async create(data: {
    name: string;
    email: string;
    phone?: string;
    date: string;
    time: string;
    partySize: number;
    notes?: string;
  }) {
    const conflicts = await Reservation.countDocuments({
      date: new Date(data.date),
      time: data.time,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (conflicts >= MAX_PER_SLOT) {
      throw new ConflictError('That time slot is fully booked. Try another time?');
    }

    const reservation = await Reservation.create({
      ...data,
      date: new Date(data.date),
    });

    return {
      id: reservation._id,
      name: reservation.name,
      date: data.date,
      time: reservation.time,
      partySize: reservation.partySize,
      status: reservation.status,
      confirmToken: reservation.confirmToken,
      message: 'Reservation received! Check your email for confirmation.',
    };
  },

  async list(query: {
    page?: number;
    limit?: number;
    status?: string;
    date?: string;
  }) {
    const { page = 1, limit = 20, status, date } = query;
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (date) filter.date = new Date(date);

    const total = await Reservation.countDocuments(filter);
    const reservations = await Reservation.find(filter)
      .sort({ date: -1, time: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      reservations,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  },

  async getById(id: string) {
    const reservation = await Reservation.findById(id).lean();
    if (!reservation) throw new NotFoundError('Reservation not found');
    return reservation;
  },

  async updateStatus(id: string, status: IReservation['status']) {
    const update: Record<string, unknown> = { status };
    if (status === 'cancelled') update.cancelledAt = new Date();

    const reservation = await Reservation.findByIdAndUpdate(id, update, { new: true });
    if (!reservation) throw new NotFoundError('Reservation not found');

    return { id: reservation._id, status: reservation.status };
  },

  async delete(id: string) {
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) throw new NotFoundError('Reservation not found');
    return { message: 'Reservation removed' };
  },

  async getAvailableSlots(date: string, partySize: number) {
    const allSlots = [
      '07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30',
      '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
      '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30',
      '19:00','19:30','20:00','20:30','21:00','21:30',
    ];

    const booked = await Reservation.find({
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] },
    }).distinct('time');

    const bookedSet = new Set(booked);
    const availableSlots = allSlots.filter((s) => !bookedSet.has(s));
    const bookedSlots = allSlots.filter((s) => bookedSet.has(s));

    return { date, partySize, availableSlots, bookedSlots };
  },
};
