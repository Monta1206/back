const Table = require('../models/table.models');
const MenuItem = require('../models/menuitems.models');


const getCustomerMenu = async (tableId) => {


    // Find table by number
    const table = await Table.findOne({
        tableNumber: tableId
    });


    if (!table) {

        throw new Error('Table not found');

    }




    const menuItems = await MenuItem.find()
        .populate('category', 'name');




    return {

        table: {

            id: table._id,

            tableNumber: table.tableNumber

        },

        menuItems

    };


};



module.exports = {
    getCustomerMenu
};