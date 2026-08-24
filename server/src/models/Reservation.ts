import mongoose, { Schema, Document } from 'mongoose';

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

export interface IReservation extends Document {
  name: string;
  email: string;
  phone?: string;
  date: Date;
  time: string;
  partySize: number;
  notes?: string;
  status: ReservationStatus;
  confirmToken: string;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-]{7,20}$/, 'Invalid phone number'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      match: [/^\d{2}:\d{2}$/, 'Time must be HH:MM format'],
    },
    partySize: {
      type: Number,
      required: true,
      min: [1, 'Minimum party size is 1'],
      max: [20, 'Maximum party size is 20'],
      default: 2,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
      default: 'pending',
    },
    confirmToken: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.index({ date: 1, time: 1, status: 1 });
reservationSchema.index({ email: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ date: 1 });

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);
