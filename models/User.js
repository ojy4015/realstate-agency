// User model

import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: "string",
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: "string",
      required: [true, "Username is required"],
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
