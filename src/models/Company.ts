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
    requisites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CompanyRequisites',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Company = mongoose.model('Company', CompanySchema);
