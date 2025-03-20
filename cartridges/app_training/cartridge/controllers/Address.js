'use strict';

const server = require('server');
// const CustomerMgr = require('dw/customer/CustomerMgr');
// const AddressModel = require('*cartridge/models/address');

server.get(
    'EditAddress',
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

module.exports = server.exports();