const QRCode = require('qrcode');


const generateTableQR = async (tableId) => {

    const url = `${process.env.FRONTEND_URL}/menu/${table._id}`;

    const qr = await QRCode.toDataURL(url);

    return qr;
};


module.exports = {
    generateTableQR
};