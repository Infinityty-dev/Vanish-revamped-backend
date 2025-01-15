const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      // unique: true, // Uncomment if phone should be unique
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    TandC: {
      type: Boolean,
      required: true,
      default: false,
    },
    pick_up_location: {
      type: String,
    },
    drop_off_location: {
      type: String,
    },
    userComplaint: {
      type: Number,
      default: 0, // Added default value
    },
    completedDelivery: {
      type: Number,
      default: 0, // Added default value
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    userAccount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
