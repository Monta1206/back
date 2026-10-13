const express = require('express');
const router = express.Router();

const publicController = require('../controllers/public.Controller');


// Customer sees menu
router.get(
    '/menu/:tableId',
    publicController.getMenu
);


// Customer creates order
router.post(
    '/orders',
    publicController.createCustomerOrder
);


module.exports = router;