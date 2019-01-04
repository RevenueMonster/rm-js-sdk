
var events = require('events');
var helper = require('../helper');
var signature = require('./signature');
var utils = require('../utils');

var randomString = utils.randomString;

var generateSignature = signature.generateSignature;
var request = helper.request;

module.exports = function (options) {
    'use strict';

    // enable events
	var self = Object.create(events.EventEmitter.prototype);
    events.EventEmitter.call(self);


    /**
     * Quick Pay
     *
     * @return {Object}
     */
	self.quickPay = async (accessToken, data, privateKey, callback) => {
    
        var requestUrl = 'https://sb-open.revenuemonster.my/v3/payment/quickpay';

        var nonceStr = randomString(32);
        var timestamp = Date.now().toString();
        var signType = 'sha256';
        var method = 'post'

       const hash = await generateSignature(data, privateKey, requestUrl, nonceStr, signType,method, timestamp)
        
        var body = {
            data
        };

        var header = {
            'Authorization' : 'Bearer ' + accessToken,
            'X-Nonce-Str'   : nonceStr,
            'X-Signature'   : signType + ' ' + hash,
            'X-Timestamp'   : timestamp,
        }

        options.apiVersion = 'v3';
        return request('POST', 'open', 'payment/quickpay', body, header, options, callback);
    };

    return self;
}