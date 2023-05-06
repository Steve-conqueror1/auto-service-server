import mongoose, { Schema } from 'mongoose';

const OrderResponseSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'done', 'declined'],
    },

    sparePart: {
      type: String,
      default: '',
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
  },
  { timestamps: true },
);

export const OrderResponse = mongoose.model('OrderResponse', OrderResponseSchema);
