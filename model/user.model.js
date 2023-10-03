const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "Your name is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phoneNumber: {
      type: String,
      required: false,
      default: "",
    },
    photoProfile: {
      type: String,
      required: false,
      default: "",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false, // Hide the __v field
  },
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
