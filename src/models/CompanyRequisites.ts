import { Schema, model } from 'mongoose';

const CompanyRequisitesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  },
  { timestamps: true },
);

export const CompanyRequisites = model('CompanyRequisites', CompanyRequisitesSchema);
