const Order = require("../models/order.models");
const MenuItem = require("../models/menuitems.models");
const Table = require("../models/table.models");

const createOrder = async (orderData) => {
  const { table, items, user } = orderData;

  // Verify table exists
  const existingTable = await Table.findById(table);

  if (!existingTable) {
    throw new Error("Invalid table ID provided.");
  }

  let calculatedTotalPrice = 0;
  const processedItems = [];

  // Verify menu items and calculate total
  for (const item of items) {
    const dbItem = await MenuItem.findById(item.menuItem);

    if (!dbItem) {
      throw new Error(`Menu item with ID ${item.menuItem} not found.`);
    }

    calculatedTotalPrice += dbItem.price * item.quantity;

    processedItems.push({
      menuItem: item.menuItem,
      quantity: item.quantity
    });
  }

  // Create order
  const newOrder = new Order({
    user: user || null,
    table,
    items: processedItems,
    totalPrice: Number(calculatedTotalPrice.toFixed(2))
  });

  await newOrder.save();

  // Occupy table
  existingTable.status = "occupied";
  await existingTable.save();

  return newOrder;
};

const getAllOrders = async () => {
  return await Order.find()
    .populate("table", "tableNumber")
    .populate("items.menuItem", "name price");
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("table", "tableNumber")
    .populate("items.menuItem", "name price");

  if (!order) {
    throw new Error("Order not found.");
  }

  return order;
};

const updateOrderStatus = async (id, status, role) => {

  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  // Role permissions
  const rolePermissions = {

    admin: [
      "accepted",
      "preparing",
      "ready",
      "served",
      "cancelled"
    ],

    waiter: [
      "accepted",
      "served"
    ],

    chef: [
      "preparing",
      "ready"
    ]

  };

  if (!rolePermissions[role]?.includes(status)) {
    throw new Error("You are not allowed to perform this action.");
  }

  // Workflow transitions
  const allowedTransitions = {

    pending: [
      "accepted",
      "cancelled"
    ],

    accepted: [
      "preparing"
    ],

    preparing: [
      "ready"
    ],

    ready: [
      "served"
    ],

    served: [],

    cancelled: []

  };

  if (!allowedTransitions[order.status].includes(status)) {
    throw new Error("Invalid status transition.");
  }

  order.status = status;

  // Free table after serving
  if (status === "served") {

    const table = await Table.findById(order.table);

    if (table) {
      table.status = "available";
      await table.save();
    }

  }

  return await order.save();

};

const updatePaymentStatus = async (id) => {

  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.paymentStatus === "paid") {
    throw new Error("Order is already paid.");
  }

  order.paymentStatus = "paid";

  return await order.save();

};

const deleteOrder = async (id) => {

  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  // Free table if order wasn't completed
  if (
    order.status !== "served" &&
    order.status !== "cancelled"
  ) {

    const table = await Table.findById(order.table);

    if (table) {
      table.status = "available";
      await table.save();
    }

  }

  await Order.findByIdAndDelete(id);

  return order;

};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder
};