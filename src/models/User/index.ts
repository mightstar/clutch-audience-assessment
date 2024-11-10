/* eslint-disable indent */
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "client", "vendor", "admin"],
      required: [true, "Please provider your userRole"],
      default: "user",
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    referralCode: { type: String, unique: true, default: null },
    referredBy: { type: String, default: null },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: 8,
    },
    passwordConfirm: {
      type: String,
      minLength: 8,
      validate: [
        {
          validator(field: any) {
            return field === this.password;
          },
          message: "Password does not match",
        },
      ],
    },
    token: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user: any = this;
  if (!user?.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 12);
  user.passwordConfirm = undefined;
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user: any = this;

  const userData: any = {
    _id: user._id,
  };

  const config: any = {
    tokenSecret: process.env.JWT_SECRET,
  };
  const token = jwt.sign(userData, config.tokenSecret);

  user.token = token;

  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user: any = await User.findOne({ email });
  if (!user) return false;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return "invalid-password";

  return user;
};

const User: any = mongoose.model("User", userSchema);
export default User;
