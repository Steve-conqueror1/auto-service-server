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
    userPermission: {
      type: String,
      enum: ['operator', 'superAdmin', 'admin'],
      default: 'user',
      required: true,
    },
    userStatus: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', UserSchema);
