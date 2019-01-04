
var events = require('events');
var helper = require('../helper');

var request = helper.request;

module.exports = function (options) {
    'use strict';

    // enable events
	var self = Object.create(events.EventEmitter.prototype);
    events.EventEmitter.call(self);


    /**
     * Client Credentials
     *
     * @return {Object}
     */
	self.clientCredential = (callback) => {
        
        var convertToBase64 = Buffer.from(options.clientID+':'+options.clientSecret).toString('base64')
        var body = {
            grantType: 'client_credentials'
        };
        var header = {
            'Authorization' : 'Basic ' + convertToBase64,
        }
        
        return request('POST', 'oauth', 'token', body, header, options, callback);
    };

    /**
     * Refresh Token
     *
     * @return {Object}
     */
    self.refreshToken = (refreshToken, callback) => {

        if(!(refreshToken)) {
            throw new Error('refreshToken is required');
        }

        var convertToBase64 = Buffer.from(options.clientID+':'+options.clientSecret).toString('base64')
        var body = {
            grantType: 'refresh_token',
            refreshToken,
        };
        var header = {
            'Authorization' : 'Basic ' + convertToBase64,
        }
    
        return request('POST', 'oauth', 'token', body, header, options, callback);
    };


    return self;
}