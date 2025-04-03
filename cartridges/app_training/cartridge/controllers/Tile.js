"use strict";

const server = require('server');

server.extend(module.superModule);

const productHelpers = require('*/cartridge/scripts/helpers/productHelpers');


server.append('Show', function (req, res, next) {
    const viewData = res.getViewData();
    let discountPercentage = null;
    const product = viewData.product.price;

    if (product && product.sales && product.list && product.sales.decimalPrice < product.list.decimalPrice) {
        const standardPrice = product.list.decimalPrice;
        const salePrice = product.sales.decimalPrice;
        discountPercentage = productHelpers.calculatePercentageOff(standardPrice, salePrice);

    }

    viewData.discountPercentage = discountPercentage;

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();