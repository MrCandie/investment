const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user must have an email"],
      unique: [true, "email already exists"],
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "guide", "admin"],
    },
    image: {
      type: String,
      default: "/images/unknown.png",
    },
    password: {
      type: String,
      minlength: [8, "password cannot be less than 8 characters"],
      trim: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "passwords do not match",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (this.isModified || this.isNew) {
    this.passwordChangedAt = Date.now();
    next();
  }
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  password
) {
  return await bcrypt.compare(enteredPassword, password);
};

userSchema.methods.passwordChangedAfter = function (jwtTime) {
  if (this.passwordChangedAt) {
    const passwordTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTime < passwordTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
