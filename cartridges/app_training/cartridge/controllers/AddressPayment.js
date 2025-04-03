'use strict';

const server = require('server');
const URLUtils = require('dw/web/URLUtils');
const Resource = require('dw/web/Resource');
// const Form = require('*/cartridge/scripts/form');
const Transaction = require('dw/system/Transaction');

server.get('Show', function (req, res, next) {
    const addressPaymentForm = server.forms.getForm('address');
    if (!addressPaymentForm) {
        throw new Error('Form not found: addressPayment');
    }
    addressPaymentForm.clear();

    // Initialize all form fields with empty values
    addressPaymentForm.firstName.value = '';
    addressPaymentForm.lastName.value = '';
    addressPaymentForm.address1.value = '';
    addressPaymentForm.address2.value = '';
    addressPaymentForm.country.value = '';
    // addressPaymentForm.states.value = '';
    // addressPaymentForm.postalCode.value = '';
    // addressPaymentForm.phone.value = '';
    // addressPaymentForm.comments.value = '';
    // addressPaymentForm.cardNumber.value = '';
    // addressPaymentForm.expirationMonth.value = '';
    // addressPaymentForm.expirationYear.value = '';
    // addressPaymentForm.securityCode.value = '';
    // addressPaymentForm.email.value = '';



    res.render('customPage/addressPaymentPage', {
        form: addressPaymentForm
    });
    next();
});

server.post('Submit', function (req, res, next) {
    const addressPaymentForm = server.forms.getForm('address');

    if (addressPaymentForm.valid) {
        Transaction.wrap(function () {
            // Extragerea datelor din formular
            const firstName = addressPaymentForm.firstName.value;
            const lastName = addressPaymentForm.lastName.value;

            // Verificare pentru debugging
            if (!firstName || !lastName) {
                throw new Error('Valori lipsă în formular');
            }

        });

        res.redirect(URLUtils.url('AddressPayment-Confirmation'));
    } else {
        res.render('customPage/addressPaymentPage', {
            form: addressPaymentForm
        });
    }
    next();
});

// server.get('Confirmation', function (req, res, next) {
//     res.render('components/AddressPaymentConfirmation', {
//         message: Resource.msg('confirmation.message', 'addressPaymentForm', null)
//     });
//     next();
// });

module.exports = server.exports();