/**
 * Imports
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

/**
 * Routes
 */
const routes = require('./routes/index');
const userRoutes = require('./routes/user');

app.use('/', routes);
app.use('/user', userRoutes);

/**
 * Print stacktrace when Development
 */
/*if(app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/
 
/**
 * Don't print when Production
 */
/*app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/

module.exports = app;