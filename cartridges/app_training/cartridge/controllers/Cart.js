'use strict';

const server = require('server');
const Logger = require('dw/system/Logger');
const BasketMgr = require('dw/order/BasketMgr');
const Site = require('dw/system/Site');

server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    const currentBasket = BasketMgr.getCurrentBasket();

    if (!currentBasket || currentBasket.getAllProductLineItems().length === 0) {
        Logger.warn('No current basket found or basket is empty.');
        return next();
    }

    // Retrieve the total gross price of the basket, including all items and taxes.
    const cartTotalGrossPrice = currentBasket.totalGrossPrice.value;

    // Represents the total price of merchandise in the basket after product-level discounts, excluding shipping and taxes.
    const cartTotal = currentBasket.getAdjustedMerchandizeTotalGrossPrice().value;

    // Retrieve the cart total threshold from site preferences, defaulting to 200 if not set.
    const cartTotalThreshold = Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold') || 200;

    // Check if the cart total exceeds the threshold and log a message if it does.
    if (cartTotal > cartTotalThreshold) {
        Logger.info(`Cart total exceeds the threshold of $${cartTotalThreshold}. Current total: $${cartTotal}`);
    }

    // Prepare view data to be sent to the front-end.
    const viewData = res.getViewData();
    viewData.cartTotal = cartTotal;
    viewData.cartTotalGrossPrice = cartTotalGrossPrice;
    viewData.cartTotalThreshold = cartTotalThreshold;

    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();