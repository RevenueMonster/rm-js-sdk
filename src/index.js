var Auth = require('./services/auth');
var Payment = require('./services/payment');

module.exports = (function (self) {
	'use strict';

	self.configure = (clientID, clientSecret, option) => {


        var option = option || {};

        if(!(clientID)) {
            throw new Error('clientID is required');
        }
    
        if(!(clientSecret)) {
            throw new Error('clientSecret is required');
        }
    

        self.options = () => {
            option.env             = option.env || 'sandbox';
            option.apiVersion      = option.apiVersion || 'v1';
            option.clientID        = clientID;
            option.clientSecret    = clientSecret;
            option.timeout         = option.timeout || 2000;
            option.classVersion    = '1.0.0';
            
            return option;
        };

        self.auth = new Auth(self.options());
        self.payment = new Payment(self.options());


        return self;
        
    };
    
   
	return self;
}({}));