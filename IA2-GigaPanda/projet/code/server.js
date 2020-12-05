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

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');


app.use('/', routes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


/**
 * Server using
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.use(flash());
//app.use(express.static(path.join(__dirname, 'public/')));


/**
 * Catch 404 Error and Forward to Error Handler
 */
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/**
 * Print stacktrace when Development
 */
if(app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Don't print when Production
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;