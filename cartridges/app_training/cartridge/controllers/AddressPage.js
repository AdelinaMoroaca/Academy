// 'use strict';

// const server = require('server');

// server.get('Show', function (req, res, next) {
//     res.render('customPage/addressPayment');
//     return next();
// });



// module.exports = server.exports();

'use strict';

const server = require('server');
const CustomerMgr = require('dw/customer/CustomerMgr');
// const AddressModel = require('app_training/cartridge/models/address');

server.get('Show', function (req, res, next) {
    const addressForm = server.forms.getForm('address');
    addressForm.clear();
    res.render('customPage/addressPayment', {
        addressForm: addressForm
    });

    return next();
});

server.get(
    'EditAddress',
    // csrfProtection.generateToken,
    // userLoggedIn.validateLoggedIn,
    // consentTracking.consent,
    function (req, res, next) {
        const addressId = req.querystring.addressId;
        const customer = CustomerMgr.getCustomerByCustomerNumber(
            req.currentCustomer.profile.customerNo
        );

        const addressBook = customer.getProfile().getAddressBook();
        const rawAddress = addressBook.getAddress(addressId);
        const addressModel = new AddressModel(rawAddress);
        const addressForm = server.forms.getForm('address');
        addressForm.clear();

        addressForm.copyFrom(addressModel.address);

        res.render('default/components/ShippingPaymentForm', {
            addressForm: addressForm,
            addressId: addressId,
        });
    }
);

module.exports = server.exports();