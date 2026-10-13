var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');

require('dotenv').config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const cors = require("cors");
const { conntectTodb } = require('./config/conntectTodb');


// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var categoriesRouter = require('./routes/categories.routes');
var menuItemsRouter = require('./routes/menuitems.routes');
var tablesRouter = require('./routes/table.routes');
var ordersRouter = require('./routes/order.routes');
var dashboardRouter = require('./routes/dashboard.routes');
var qrRouter = require('./routes/qr.routes');
var publicRouter = require('./routes/public.routes');


var app = express();



// Middleware
app.use(logger('dev'));



const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000"
];



app.use(cors({

    origin: function(origin, callback){


        // Allow Postman/mobile requests
        if(!origin){
            return callback(null, true);
        }



        if(allowedOrigins.includes(origin)){
            return callback(null, true);
        }



        return callback(
            new Error("Not allowed by CORS")
        );

    },

    credentials: true

}));



app.use(express.json());

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(cookieParser());

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);




// Routes
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/menu-items', menuItemsRouter);
app.use('/tables', tablesRouter);
app.use('/orders', ordersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/qr', qrRouter);
app.use('/public', publicRouter);




// 404 handler
app.use(function(req, res, next) {

    next(createError(404));

});




// Error handler
app.use(function(err, req, res, next) {


    const status = err.status || 500;

    const message =
        err.message || "Internal Server Error";



    res.status(status).json({

        message

    });


});




// Start server
const server = http.createServer(app);



server.listen(process.env.PORT, () => {

    conntectTodb();

    console.log(
        `Server is running on port ${process.env.PORT}`
    );

});