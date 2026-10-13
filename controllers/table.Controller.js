const tableService = require('../services/table.services');


const createTable = async (req, res) => {
  try {

    const newTable = await tableService.createTable();

    res.status(201).json(newTable);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};


const getTables = async (req, res) => {
  try {

    const tables = await tableService.getTables();

    res.status(200).json(tables);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteTable = async (req, res) => {

    try {

        await tableService.deleteTable(req.params.id);

        res.status(200).json({
            success: true,
            message: "Table deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
  createTable,
  getTables,
  deleteTable
};