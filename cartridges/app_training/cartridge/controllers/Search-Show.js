'use strict';

const server = require('server');
const PageMgr = require('dw/experience/PageMgr');
const CatalogMgr = require('dw/catalog/CatalogMgr');

server.get('Show', function (req, res, next) {
    const catId = req.querystring.cgid || '';
    const category = catId ? CatalogMgr.getCategory(catId) : null;

    // Check if category exists and has pageDesignerPageID
    const pageDesignerID = (category && category.custom && category.custom.pageDesignerPageID)
        ? category.custom.pageDesignerPageID
        : null;

    // Ensure pageDesignerID is valid before calling PageMgr.getPage
    const pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;

    if (pageDesigner && pageDesigner.isVisible()) {
        res.print(PageMgr.renderPage(pageDesigner.ID, ''));
    }

    res.render('search/searchResults', {
        category: category || null
    });

    next();
});

module.exports = server.exports();
