import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema<any>(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  { timestamps: true },
);

export const EventSchedule = mongoose.model('EventSchedule', EventSchema);
