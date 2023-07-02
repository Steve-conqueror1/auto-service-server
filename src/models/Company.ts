import mongoose, { Schema } from 'mongoose';

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    phone: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'EventSchedule',
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    workFrom: {
      type: String,
      required: true,
    },
    workTo: {
      type: String,
      required: true,
    },
    workWeekend: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Company = mongoose.model('Company', CompanySchema);
