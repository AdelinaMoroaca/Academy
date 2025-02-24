'use strict';

// Import or extend the base module if necessary
var base = module.superModule || {};

// Function to calculate the percentage discount
function calculatePercentageOff(standardPrice, salePrice) {
    if (standardPrice === null) {
        return 0;
    }

    //Check if the product has a sale price
    let discountPercentage = Math.round(((standardPrice - salePrice) / standardPrice) * 100);

    return discountPercentage;
}


// Add the function to the base module
base.calculatePercentageOff = calculatePercentageOff;

// Export the base module with the new function
module.exports = base;