const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.Controller');
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');


router.get(
    '/stats',
    authMiddleware,
    authorize('admin'),
    dashboardController.getStats
);


module.exports = router;