const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.Controller');

// POST http://localhost:5000/tables
router.post('/', tableController.createTable);

// GET http://localhost:5000/tables
router.get('/', tableController.getTables);

// DELETE http://localhost:5000/tables/:id
router.delete("/:id", tableController.deleteTable);

module.exports = router;