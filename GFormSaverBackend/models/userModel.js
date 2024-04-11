import mongoose from "mongoose";
import "mongoose-type-url";

const FormMetadataSchema = new mongoose.Schema(
  {
    url: {
      type: mongoose.SchemaTypes.Url,
      required: [true, "Form URL missing!"],
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    comment: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the user is missing!"],
    },
    email: {
      type: String,
      required: [true, "Email of the user is missing!"],
    },
    profileUrl: {
      type: mongoose.SchemaTypes.Url,
      default: "https://avatar.iran.liara.run/public/boy?username=Ash",
    },
    googleRefreshToken: {
      type: String,
      required: [true, "Google's refresh token of the user is missing!"],
    },
    myRefreshTokens: {
      type: [String],
      default: [],
    },
    googleUserId: {
      type: String,
      required: [true, "User's Google ID is missing!"],
      unique: [true, "User with this Google ID already exists!"],
    },
    filledForms: {
      type: [FormMetadataSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
