const MenuItem = require('../models/menuitems.models');


const createMenuItem = async (itemData) => {

    const menuItem = new MenuItem(itemData);

    return await menuItem.save();

};



const getAllMenuItems = async () => {

    return await MenuItem.find()
        .populate('category');

};




const updateMenuItem = async (id, data) => {

    return await MenuItem.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

};




const deleteMenuItem = async (id) => {

    return await MenuItem.findByIdAndDelete(id);

};



module.exports = {

    createMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem

};