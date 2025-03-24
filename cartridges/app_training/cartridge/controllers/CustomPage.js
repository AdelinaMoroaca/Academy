'use strict';

const server = require('server');

server.get('CustomPage', function (req, res, next) {

    res.render('customPage/customPage');
    return next();
});

module.exports = server.exports();