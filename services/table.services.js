const Table = require("../models/table.models");
const QRCode = require("qrcode");

const createTable = async () => {

    // Get all existing table numbers
    const tables = await Table
        .find({}, "tableNumber")
        .sort({ tableNumber: 1 });

    // Find the first available number
    let nextTableNumber = 1;

    for (const table of tables) {

        if (table.tableNumber !== nextTableNumber) {
            break;
        }

        nextTableNumber++;

    }

    // Create table
    const table = new Table({
        tableNumber: nextTableNumber
    });

    await table.save();

    // Create QR link
    const url = `${process.env.FRONTEND_URL}/menu/${table.tableNumber}`;

    // Generate QR code
    table.qrCode = await QRCode.toDataURL(url);

    await table.save();

    return table;

};

const deleteTable = async (id) => {

    return await Table.findByIdAndDelete(id);

};

const getTables = async () => {

    return await Table.find().sort({ tableNumber: 1 });

};

module.exports = {
    createTable,
    getTables,
    deleteTable
};