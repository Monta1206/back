const menuItemService = require('../services/menuItems.services');

const createMenuItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a food image file.' });
    }

    const itemData = {
  ...req.body,
  image: req.file.filename
};

    const newItem = await menuItemService.createMenuItem(itemData);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const items = await menuItemService.getAllMenuItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {

    try {


        const data = {
            ...req.body
        };


        if(req.file){

            data.image = req.file.filename;

        }



        const item = await menuItemService.updateMenuItem(
            req.params.id,
            data
        );


        res.status(200).json(item);



    } catch(error) {


        res.status(400).json({

            message:error.message

        });


    }

};



const deleteMenuItem = async (req, res) => {

    try {

        await menuItemService.deleteMenuItem(
            req.params.id
        );


        res.status(200).json({
            message:"Menu item deleted successfully"
        });


    } catch(error) {

        res.status(400).json({
            message:error.message
        });

    }

};

module.exports = {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
};