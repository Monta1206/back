const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: [true, 'Email address already exists'],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'chef', 'waiter'],
      default: 'waiter',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      match: [/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/, 'Password must contain uppercase, lowercase, and a number'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
