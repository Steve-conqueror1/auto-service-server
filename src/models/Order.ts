import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },

    status: {
      type: String,
      enum: ['pending', 'processing', 'done', 'rejected'],
      default: 'unconfirmed',
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model('Order', OrderSchema);
