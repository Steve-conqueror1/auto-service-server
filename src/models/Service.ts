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
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCategory',
    },
  },
  { timestamps: true },
);

export const Service = mongoose.model('Service', ServiceSchema);
