const Order = require('../models/order.models');
const Table = require('../models/table.models');


const getDashboardStats = async () => {

    // Orders created today
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);


    const todayOrders = await Order.countDocuments({
        createdAt: {
            $gte: startOfDay
        }
    });


    // Total money from paid orders
    const revenue = await Order.aggregate([
        {
            $match: {
                paymentStatus: "paid"
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$totalPrice"
                }
            }
        }
    ]);


    // Orders waiting
    const pendingOrders = await Order.countDocuments({
        status: "pending"
    });


    // Tables currently occupied
    const activeTables = await Table.countDocuments({
        status: "occupied"
    });


    return {
        todayOrders,
        totalRevenue: revenue[0]?.total || 0,
        pendingOrders,
        activeTables
    };
};


module.exports = {
    getDashboardStats
};