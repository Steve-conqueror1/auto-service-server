import mongoose, { Schema } from 'mongoose';
import { UserType } from './types';

const UserSchema = new Schema<UserType>(
  {
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    surName: {
      type: String,
    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
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
