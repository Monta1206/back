const publicService = require('../services/public.services');
const orderService = require('../services/order.services');


// Get menu for customer
const getMenu = async (req,res)=>{

    try {

        const menu = await publicService.getCustomerMenu(
            req.params.tableId
        );

        res.status(200).json(menu);


    } catch(error){

        res.status(404).json({
            message:error.message
        });

    }

};


// Customer creates order (guest)
const createCustomerOrder = async (req,res)=>{

    try {

        const orderData = {
            table: req.body.table,
            items: req.body.items,
            user: null
        };


        const order = await orderService.createOrder(orderData);


        res.status(201).json(order);


    } catch(error){

        res.status(400).json({
            message:error.message
        });

    }

};


module.exports = {
    getMenu,
    createCustomerOrder
};