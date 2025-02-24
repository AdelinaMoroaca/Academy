"use strict";

var server = require('server');

server.extend(module.superModule);

var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');


server.append('Show', function (req, res, next) {
    let viewData = res.getViewData();
    let discountPercentage = null;
    let product = viewData.product.price;

    if (product && product.sales && product.list && product.sales.decimalPrice < product.list.decimalPrice) {
        let standardPrice = product.list.decimalPrice;
        let salePrice = product.sales.decimalPrice;
        discountPercentage = productHelpers.calculatePercentageOff(standardPrice, salePrice);

    }

    viewData.discountPercentage = discountPercentage;

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();