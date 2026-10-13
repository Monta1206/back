const usersService = require('../services/users.services');

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      return res.status(409).json({ message: 'Email address already exists' });
    }
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      return res.status(409).json({ message: 'Email address already exists' });
    }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await usersService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
};