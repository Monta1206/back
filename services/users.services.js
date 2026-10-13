const User = require('../models/user.models');
const { generateToken } = require('../utils/jwt');
const createUser = async (data) => {
  const user = new User(data);
  return user.save();
};

const getUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateUser = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  Object.keys(data).forEach((key) => {
    user[key] = data[key];
  });

  await user.save();

  return await User.findById(user._id).select('-password');
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};


const loginUser = async (email, password) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};