'use strict';

const server = require('server');
const ProductMgr = require('dw/catalog/ProductMgr');
const ProductSearchModel = require('dw/catalog/ProductSearchModel');
const CatalogMgr = require('dw/catalog/CatalogMgr');
const ProductSearch = require('*/cartridge/models/search/productSearch');

server.extend(module.superModule);

server.append('Show', (req, res, next) => {
    const productId = res.getViewData().product.id;
    const product = ProductMgr.getProduct(productId);
    const suggestedProducts = [];

    // Check if product is not null and has a primary category
    if (product && product.isCategorized()) {
        const primaryCategory = product.getPrimaryCategory();

        if (primaryCategory) {
            const apiProductSearch = new ProductSearchModel();
            apiProductSearch.setCategoryID(primaryCategory.ID);
            apiProductSearch.search();

            // Ensure srule is a string
            const srule = Array.isArray(req.querystring.srule) ? req.querystring.srule[0] : req.querystring.srule || '';

            // Handle potential null or undefined sorting options
            const sortingOptions = CatalogMgr.getSortingOptions() || [];

            const productSearch = new ProductSearch(
                apiProductSearch,
                req.querystring,
                srule,
                sortingOptions,
                CatalogMgr.getSiteCatalog().getRoot()
            );

            productSearch.productIds.slice(0, 4).forEach(productIdObj => {
                const suggestedProduct = ProductMgr.getProduct(productIdObj.productID);
                suggestedProducts.push(suggestedProduct);
            });

        }
    }

    res.setViewData({
        suggestedProducts
    });

    return next();
});

module.exports = server.exports();