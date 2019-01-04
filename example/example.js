'use strict';

var RMAPI = require('../src'); // use require('RMAPI')
var fs = require('fs');

var rm = RMAPI.configure(
    '5499912462549392881',
    'pwMapjZzHljBALIGHxfGGXmiGLxjWbkT',
);

var refreshToken;
var accessToken;

async function log() {

    // get client Credential

    await rm.auth.clientCredential().then((response) => {
        refreshToken = response.refreshToken;
        accessToken = response.accessToken;
    });


    // get refresh token 

    // await rm.auth.refreshToken(refreshToken).then((response) => {
    //     console.log('response here ======>',response)
    // });


    var data = {
      amount: 100,
      currencyType: 'MYR',
      id : '12344333233444',
      title: 'title',
      detail: 'desc',
    }


    var privateKey = fs.readFileSync('../src/private.pem')
    privateKey = Buffer.from(privateKey).toString()

    // quick pay

    await rm.payment.quickPay(accessToken, data, privateKey).then((response) => {
            console.log('response here ======>',response)
    });

}

log()
