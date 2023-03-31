import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'processing', 'done', 'rejected'],
  },
});

export const Order = mongoose.model('Order', OrderSchema);
