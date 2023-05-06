import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    operatorComment: {
      type: String,
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'done', 'rejected'],
      default: 'pending',
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },

    responses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderResponse',
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export const Order = mongoose.model('Order', OrderSchema);
