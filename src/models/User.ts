import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['user', 'superAdmin', 'admin'],
      default: 'user',
    },
    userStatus: {
      type: String,
      enum: ['pending', 'active', 'blocked'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const user = mongoose.model('User', UserSchema);
