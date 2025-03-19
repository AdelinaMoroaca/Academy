'use strict';

const server = require('server');

server.get('Show', function (req, res, next) {
    res.render('customPage/carouselPage');

    return next();
});

module.exports = server.exports();