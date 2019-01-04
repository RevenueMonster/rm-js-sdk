'use strict';
var httpRequest = require('request');
/**
 * Get OAuth URL
 *
 * @param  {String} endpoint
 *
 * @return {String}
 */
var getOAuthUrl = function(options, endpoint) {
    var api = options.env === 'sandbox' ? 'sb-oauth' : 'oauth';
    var url = 'https://' + api + '.revenuemonster.my' + '/' + options.apiVersion + '/' + endpoint;
    
    return url;
  };
  
/**
 * Get Open URL
 *
 * @param  {String} endpoint
 *
 * @return {String}
 */
var getOpenUrl = function(options, endpoint) {
    var api = options.env === 'sandbox' ? 'sb-open' : 'open';
    var url = 'https://' + api + '.revenuemonster.my' + '/' + options.apiVersion + '/' + endpoint;
    
    return url;
  };


  /**
 * Do requests
 *
 * @param  {String}   method
 * @param  {String}   endpoint
 * @param  {Object}   data
 * @param  {Function} callback
 *
 * @return {Object}
 */

function request(method, api, endpoint, data, customHeader,options, callback) {

    var url;
    if(api === 'oauth'){
        url = getOAuthUrl(options, endpoint);
    } else if(api === 'open') {
        url = getOpenUrl(options, endpoint);
    } else {
        throw new Error('Please specify api');
    }
    
    var params = {
      url: url,
      method: method,
      encoding: 'utf8',
      timeout: options.timeout,
      headers: {
        'User-Agent': 'RM API Client-Node.js/' + options.classVersion,
      }
    };
  
    if (data) {
      params.headers['Content-Type'] = 'application/json';
      params.body = JSON.stringify(data);
    }
    
    if(customHeader) {
        Object.assign(params.headers, customHeader);
    }
  
    console.log('params',params)
    return new Promise(function (res, rej) {
        httpRequest(params, function (error, response, body) {

            if (error) {
                throw new Error(error);
            }
            
            try {
                res(JSON.parse(body));
                if(callback) callback();
            } catch (err) {
                throw new Error(err);
            }
        });
    });
  };
  
module.exports = {  
    getOAuthUrl,
    getOpenUrl,
    request
}
