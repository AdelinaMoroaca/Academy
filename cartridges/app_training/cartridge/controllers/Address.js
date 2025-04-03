'use strict';

const server = require('server');
const URLUtils = require('dw/web/URLUtils');
// const Resource = require('dw/web/Resource');
// const Form = require('*/cartridge/scripts/form');
const Transaction = require('dw/system/Transaction');
const csrfProtection = require('*/cartridge/scripts/middleware/csrf');
const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.get('Show', function (req, res, next) {
    const addressForm = server.forms.getForm('address');
    addressForm.clear();

    res.render('customPage/addressPage', {
        addressForm: addressForm
    });
    next();
});
server.get(
    'AddAddress',
    csrfProtection.generateToken,
    userLoggedIn.validateLoggedIn,
    consentTracking.consent,
    function (req, res, next) {
        const addressForm = server.forms.getForm('address');
        addressForm.clear();

        res.render('account/editAddAddress', {
            addressForm: addressForm
        });

        return next();
    }
);

server.get(
    "EditAddress",
    // csrfProtection.generateToken,
    // userLoggedIn.validateLoggedIn,
    // consentTracking.consent,
    function (req, res, next) {
        // Removed login check
        // const addressId = req.querystring.addressId;

        // Assuming you have a way to get a customer without login
        // This is just a placeholder logic
        // const user = CustomerMgr.getCustomerByCustomerNumber('someCustomerNumber');

        // if (!user) {
        //     res.setStatusCode(404);
        //     res.json({
        //         error: true,
        //         message: 'Customer not found.'
        //     });
        //     return next();
        // }

        // const addressBook = customer.getProfile().getAddressBook();
        // const rawAddress = addressBook.getAddress(addressId);
        // const addressModel = new AddressModel(rawAddress);
        const addressForm = server.forms.getForm('address');
        addressForm.clear();

        // addressForm.copyFrom(addressModel.address);

        res.render('account/editAddAddress', {
            addressForm: addressForm,
            // addressId: addressId,
        });
        return next();
    }
);

server.post('Submit', function (req, res, next) {
    const addressForm = server.forms.getForm('address');

    if (addressForm.valid) {
        // Process the form data
        Transaction.wrap(function () {
            // Example: Save the form data to a custom object or a system object
            const CustomObjectMgr = require('dw/object/CustomObjectMgr');
            const customObject = CustomObjectMgr.createCustomObject('Address', addressForm.addressId.value);

            customObject.custom.firstName = addressForm.firstName.value;
            customObject.custom.lastName = addressForm.lastName.value;
            customObject.custom.address1 = addressForm.address1.value;
            customObject.custom.address2 = addressForm.address2.value;
            customObject.custom.country = addressForm.country.value;
        });

        res.redirect(URLUtils.url('Address-Confirmation'));
    } else {
        res.render('customPage/addressPage', {
            addressForm: addressForm
        });
    }
    next();
});

module.exports = server.exports();


















// 'use strict';

// const server = require('server');
// const csrfProtection = require('*/cartridge/scripts/middleware/csrf');
// const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
// const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
// // const AddressModel = require('*/cartridge/models/address');

// server.get(
//     "EditAddress",
//     csrfProtection.generateToken,
//     userLoggedIn.validateLoggedIn,
//     consentTracking.consent,
//     function (req, res, next) {
//         const CustomerMgr = require("dw/customer/CustomerMgr");
//         const AddressModel = require('*/cartridge/models/address');
//         const addressId = req.querystring.addressId;
//         const customer = CustomerMgr.getCustomerByCustomerNumber(
//             req.currentCustomer.profile.customerNo
//         );
//         const addressBook = customer.getProfile().getAddressBook();
//         const rawAddress = addressBook.getAddress(addressId);
//         const addressModel = new AddressModel(rawAddress);
//         const addressForm = server.forms.getForm("address");
//         if (!addressForm) {
//             throw new Error("Address form is not initialized");
//         }
//         addressForm.clear();

//         addressForm.copyFrom(addressModel.address);

//         res.render("account/editAddAddress", {
//             addressForm: addressForm,
//             addressId: addressId,
//         });
//     }
// );

// server.get(
//     'AddAddress',
//     csrfProtection.generateToken,
//     userLoggedIn.validateLoggedIn,
//     consentTracking.consent,
//     function (req, res, next) {
//         const addressForm = server.forms.getForm('address');
//         addressForm.clear();

//         res.render('account/editAddAddress', {
//             addressForm: addressForm
//         });

//         return next();
//     }
// );
// module.exports = server.exports();