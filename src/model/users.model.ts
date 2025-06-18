import { timeStamp } from "console";
import mongoose from "mongoose";
import { iUser } from "../interfaces/user.interface";

export interface IUserDocument extends iUser, Document {}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["staff", "manager", "admin"],
      default: "staff",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// export const User = mongoose.model('user', userSchema);
export const User = mongoose.model<IUserDocument>("User", userSchema);
