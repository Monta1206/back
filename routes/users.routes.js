var express = require('express');
var router = express.Router();

const authorize = require('../middlewares/roleMiddleware');
const usersController = require('../controllers/users.Controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Public
router.post('/login', usersController.login);

// We'll decide later if registration stays public
router.post('/', usersController.createUser);

// Admin only
router.get(
    '/',
    authMiddleware,
    authorize('admin'),
    usersController.getUsers
);

router.get(
    '/:id',
    authMiddleware,
    authorize('admin'),
    usersController.getUser
);

router.put(
    '/:id',
    authMiddleware,
    authorize('admin'),
    usersController.updateUser
);

router.delete(
    '/:id',
    authMiddleware,
    authorize('admin'),
    usersController.deleteUser
);

module.exports = router;