const mongoose = require('mongoose');
module.exports.conntectTodb = ( ) => {
    mongoose.connect(process.env.mongoURI).then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Error connecting to database', err);
    });
} 