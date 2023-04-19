import mongoose, { Schema } from 'mongoose';

const ServiceCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  { timestamps: true },
);

export const ServiceCategory = mongoose.model('ServiceCategory', ServiceCategorySchema);
