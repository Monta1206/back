const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.Controller');
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');


// Create order
// waiter/admin can create orders
router.post(
    '/',
    authMiddleware,
    authorize('admin', 'waiter'),
    orderController.createOrder
);


// Get all orders
// admin/chef/waiter can view orders
router.get(
    '/',
    authMiddleware,
    authorize('admin', 'chef', 'waiter'),
    orderController.getOrders
);


// Get one order
// admin/chef/waiter can view order details
router.get(
    '/:id',
    authMiddleware,
    authorize('admin', 'chef', 'waiter'),
    orderController.getOrderById
);


// Update order status
// admin/chef can change status
router.patch(
    '/:id/status',
    authMiddleware,
    authorize('admin', 'chef', 'waiter'),
    orderController.updateOrderStatus
);


// Mark order as paid
// admin/waiter can mark payment completed
router.patch(
    '/:id/payment',
    authMiddleware,
    authorize('admin', 'waiter'),
    orderController.updatePaymentStatus
);


// Delete order
// admin only
router.delete(
    '/:id',
    authMiddleware,
    authorize('admin'),
    orderController.deleteOrder
);


module.exports = router;