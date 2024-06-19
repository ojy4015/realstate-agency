// User model

import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property', // Collection where we're getting the IDs
      },
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
