const orderService = require('../services/order.services');

const createOrder = async (req, res) => {
  try {
    // req.body should contain { table, items, user (optional) }
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {

    const updated = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
      req.user.role
    );

    res.status(200).json(updated);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
}; 

const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);

    res.status(200).json({
      message: 'Order deleted successfully.'
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);

        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const updated = await orderService.updatePaymentStatus(
      req.params.id
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};



module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder
};