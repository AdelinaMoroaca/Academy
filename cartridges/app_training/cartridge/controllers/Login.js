'use strict';

const server = require('server');
// const PageMgr = require('dw/experience/PageMgr');
// const pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

server.get('Show', function (req, res, next) {


    // Render the login page
    res.render('account/login', {
        navTabValue: 'login'
    });

    next();
});

module.exports = server.exports();