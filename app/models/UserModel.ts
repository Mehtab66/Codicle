import mongoose, { Schema, model, models } from "mongoose";

export const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String },
    image: String,
    bio: String,
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    githubId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
export type UserType = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  bio?: string;
  followers: string[];
  following: string[];
  githubId?: string;
};
