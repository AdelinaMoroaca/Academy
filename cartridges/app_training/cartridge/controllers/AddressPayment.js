'use strict';

const server = require('server');
const URLUtils = require('dw/web/URLUtils');
const Resource = require('dw/web/Resource');
// const Form = require('*/cartridge/scripts/form');
const Transaction = require('dw/system/Transaction');

server.get('Show', function (req, res, next) {
    const addressPaymentForm = server.forms.getForm('address');
    // if (!addressPaymentForm) {
    //     throw new Error('Form not found: addressPayment');
    // }
    addressPaymentForm.clear();

    res.render('customPage/addressPaymentPage', {
        form: addressPaymentForm
    });
    next();
});

server.post('Submit', function (req, res, next) {
    const addressPaymentForm = server.forms.getForm('address');

    if (addressPaymentForm.valid) {
        Transaction.wrap(function () {
            // Here you would typically save the form data to a custom object or a system object
            // For example, saving to a custom object:
            // var CustomObjectMgr = require('dw/object/CustomObjectMgr');
            // var customObject = CustomObjectMgr.createCustomObject('AddressPayment', addressPaymentForm.addressId.value);
            // customObject.custom.firstName = addressPaymentForm.firstName.value;
            // customObject.custom.lastName = addressPaymentForm.lastName.value;
            // ... (save other fields as needed)
        });

        res.redirect(URLUtils.url('AddressPaymentForm-Confirmation'));
    } else {
        res.render('customPage/addressPaymentPage', {
            form: addressPaymentForm
        });
    }
    next();
});

server.get('Confirmation', function (req, res, next) {
    res.render('components/AddressPaymentConfirmation', {
        message: Resource.msg('confirmation.message', 'addressPaymentForm', null)
    });
    next();
});

module.exports = server.exports();

// 'use strict';

// const server = require('server');
// const csrfProtection = require('*/cartridge/scripts/middleware/csrf');
// const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
// const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
// const Transaction = require('dw/system/Transaction');
// const CustomerMgr = require('dw/customer/CustomerMgr');

// server.get('Show', csrfProtection.generateToken, consentTracking.consent, userLoggedIn.validateLoggedIn, function (req, res, next) {
//     const addressForm = server.forms.getForm('address');
//     const paymentForm = server.forms.getForm('creditCard');
//     addressForm.clear();
//     paymentForm.clear();

//     res.render('customPage/addressPayment', {
//         addressForm: addressForm,
//         paymentForm: paymentForm
//     });

//     return next();
// });

// server.post('Save', csrfProtection.validateAjaxRequest, function (req, res, next) {
//     const addressForm = server.forms.getForm('address');
//     const paymentForm = server.forms.getForm('creditCard');

//     if (addressForm.valid && paymentForm.valid) {
//         try {
//             Transaction.wrap(function () {
//                 const customer = CustomerMgr.getCustomerByCustomerNumber(req.currentCustomer.profile.customerNo);
//                 const wallet = customer.getProfile().getWallet();

//                 // Save address data
//                 const addressBook = customer.getProfile().getAddressBook();
//                 const address = addressBook.createAddress(addressForm.address.value);
//                 address.setCity(addressForm.city.value);
//                 address.setStateCode(addressForm.state.value);
//                 address.setPostalCode(addressForm.zip.value);

//                 // Save payment data
//                 const paymentInstrument = wallet.createPaymentInstrument(dw.order.PaymentInstrument.METHOD_CREDIT_CARD);
//                 paymentInstrument.setCreditCardHolder(paymentForm.cardOwner.value);
//                 paymentInstrument.setCreditCardNumber(paymentForm.cardNumber.value);
//                 paymentInstrument.setCreditCardExpirationMonth(paymentForm.expirationMonth.value);
//                 paymentInstrument.setCreditCardExpirationYear(paymentForm.expirationYear.value);
//             });

//             res.json({
//                 success: true,
//                 message: 'Shipping and payment details saved successfully!'
//             });
//         } catch (e) {
//             res.json({
//                 success: false,
//                 message: 'An error occurred while saving your details. Please try again.'
//             });
//         }
//     } else {
//         res.json({
//             success: false,
//             message: 'Please correct the errors in the form.'
//         });
//     }

//     return next();
// });

// module.exports = server.exports();


// 'use strict';

// const server = require('server');
// const csrfProtection = require('*/cartridge/scripts/middleware/csrf');
// const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
// const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

// server.get('Show', csrfProtection.generateToken, consentTracking.consent, userLoggedIn.validateLoggedIn, function (req, res, next) {
//     const addressForm = server.forms.getForm('address');
//     const paymentForm = server.forms.getForm('creditCard');
//     addressForm.clear();
//     paymentForm.clear();

//     res.render('customPage/addressPayment', {
//         addressForm: addressForm,
//         paymentForm: paymentForm
//     });

//     return next();
// });

// server.post('Save', csrfProtection.validateAjaxRequest, function (req, res, next) {
//     const addressForm = server.forms.getForm('address');
//     const paymentForm = server.forms.getForm('creditCard');

//     if (addressForm.valid && paymentForm.valid) {
//         // Process the form data
//         const shippingData = {
//             address: addressForm.address.value,
//             city: addressForm.city.value,
//             state: addressForm.state.value,
//             zip: addressForm.zip.value
//         };

//         const paymentData = {
//             cardOwner: paymentForm.cardOwner.value,
//             cardNumber: paymentForm.cardNumber.value,
//             expirationMonth: paymentForm.expirationMonth.value,
//             expirationYear: paymentForm.expirationYear.value
//         };

//         // Here you would typically save the data to a database or perform other processing

//         res.json({
//             success: true,
//             message: 'Shipping and payment details saved successfully!'
//         });
//     } else {
//         res.json({
//             success: false,
//             message: 'Please correct the errors in the form.'
//         });
//     }

//     return next();
// });

// module.exports = server.exports();