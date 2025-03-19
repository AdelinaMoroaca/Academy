'use strict'

const server = require('server');
const assets = require('*/cartridge/scripts/assets.js');

server.get('Show', function (req, res, next) {
    assets.addJs('/js/productTile.js');
    assets.addCss('/css/homePage.css');

    res.render('homePage');
    next();
});

module.exports = server.exports();