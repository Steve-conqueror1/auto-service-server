import mongoose, { Schema } from 'mongoose';
import { UserType } from './types';

const UserSchema = new Schema<UserType>(
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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

export const User = mongoose.model('User', UserSchema);
