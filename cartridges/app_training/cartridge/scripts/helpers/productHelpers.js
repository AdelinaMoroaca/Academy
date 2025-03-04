'use strict';

// Import or extend the base module if necessary
const base = module.superModule || {};

// Function to calculate the percentage discount
const calculatePercentageOff = (standardPrice, salePrice) => {
    if (standardPrice === null) {
        return 0;
    }

    // Check if the product has a sale price
    return Math.round(((standardPrice - salePrice) / standardPrice) * 100);
};

// Add the function to the base module
base.calculatePercentageOff = calculatePercentageOff;

// Export the base module with the new function
module.exports = base;