const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//load routes
const mulQueueRouter = require('./src/api/routes/mulQueue');
const randQueueRouter = require('./src/api/routes/randQueue');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handle Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

//Routes which should handle requests
app.use('/api/queue/mul', mulQueueRouter);
app.use('/api/queue/rand', randQueueRouter);


//Handle Not Found Requests
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error);
});

//Handle Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;