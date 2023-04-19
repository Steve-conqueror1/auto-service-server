import mongoose, { Schema } from 'mongoose';

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    serviceAddress: {
      type: String,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCategory',
    },
  },
  { timestamps: true },
);

export const Service = mongoose.model('Service', ServiceSchema);
