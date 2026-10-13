const express = require('express');
const router = express.Router();

const menuItemController = require('../controllers/menuItems.Controller');
const upload = require('../middlewares/upload.file');


router.post(
    '/',
    upload.single('image'),
    menuItemController.createMenuItem
);


router.get(
    '/',
    menuItemController.getMenuItems
);


router.put(
    '/:id',
    upload.single('image'),
    menuItemController.updateMenuItem
);


router.delete(
    '/:id',
    menuItemController.deleteMenuItem
);


module.exports = router;