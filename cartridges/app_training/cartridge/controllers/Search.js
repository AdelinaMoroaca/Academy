'use strict';

const server = require('server');
const searchController = module.superModule;
server.extend(searchController);

server.append('Show', function (req, res, next) {
    if (req.querystring.cgid) {
        const categoryID = req.querystring.cgid;


        if (categoryID === 'womens-clothing' || categoryID === 'mens-clothing') {
            res.setViewData({
                isClothingCategory: true
            });
        }
    }
    next();
});

module.exports = server.exports();