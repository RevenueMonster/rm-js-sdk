# API-SDK-Nodejs
This is an Nodejs SDK that maps some of the RESTful methods of Open API that are documented at [doc.revenuemonster.my](https://doc.revenuemonster.my/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites



### Installing



### Covered API
* Client Credentials (Authentication)
* Refresh Token (Authentication)
* Payment (Quick Pay) - Payment
* Payment (Quick Pay) - Refund
* Payment (Quick Pay) - Reverse
* Payment (Quick Pay) - Get All Payment Transactions
* Payment (Quick Pay) - Get Payment Transaction By ID
* Payment (Quick Pay) - Get Payment Transaction By Order ID
* Payment (Quick Pay) - Daily Settlement Report


### Usage
1. Get Client ID and Client Secret from portal.
![ClientIDClientSecret](https://storage.googleapis.com/rm-portal-assets/img/rm-landing/clientIDclientSecret.png)
2. Generate private key and publci key from portal. 
![PrivateKeyPublicKey](https://storage.googleapis.com/rm-portal-assets/img/rm-landing/privateKeypublicKey.PNG)
3. Store private key for own use and public key at portal.
![PastePublicKey](https://storage.googleapis.com/rm-portal-assets/img/rm-landing/pastePublicKey.png)


* Client SDK Config
    * default SDK config object 
```
const SDK = RMSDK({
    clientId: '',
    clientSecret: '',
    privateKey: '',
    isProduction: false,
    timeout: 2000,
  });
```

* Client Credentials (Authentication)
    * To get refresh token and access token(expired after 2 hours) with using provided clientId and clientSecret
```
var result = await SDK.getClientCredentials();
```

* Refresh Token (Authentication)
    * To get new access token(expired after 2 hours) with using provided clientId and clientSecret (recommended to schedule to run this fucntion on every less than 2 hours) in order to avoid expired access token error.
```
var result = await SDK.refreshToken(refreshToken);
```

* Payment (Quick Pay) - Payment
    * To make payment by scanning barcode/authcode from user
```
const data =
{
    authCode = "161583080660761280", //get from user payment barcode
    order = new { 
                  amount = 100, currencyType = "MYR", id = "12345678131", 
                  title = "title", detail = "desc", additionalData = "API Test" 
                },
   ipAddress = "127.0.0.1",
   storeId = "123412341234", 
};
const result = await SDK.Payment.initQuickPay(accessToken, data);
```

* Payment (Quick Pay) - Refund
    * To refund the successful transactions 
```
const data =
{
   transactionId = "181203100634010427614646", // get from user's transaction 
   refund = new { type = "FULL", currencyType = "MYR", amount = 100 },
   reason = "test",
};
const result = await SDK.Payment.refund(accessToken, data);
```

* Payment (Quick Pay) - Reverse
    * To reverse time-out or problematic transaction
```
const data = 
{
    orderId = "12345678131",
};
const result = await SDK.Payment.reverse(accessToken, data);
```

* Payment (Quick Pay) - Get all payment trasnactions
    * To query all payment transaction.
    
```
const result = await SDK.Payment.getPaymentTransactions(accessToken);
```

* Payment (Quick Pay) - get payment trasnaction by Trasnaction ID
    * To query for payment transaction using trasnactionId.

    
```
const result = await SDK.Payment.getPaymentTransactionById(accessToken, trasnactionId);
```

* Payment (Quick Pay) - get payment trasnaction by Order ID
    * To query for payment transaction using orderId.
    
```
const result = await SDK.Payment.getPaymentTransactionByOrderId(accessToken, orderId);
```

* Payment (Quick Pay) - Get daily settlement report
    * To get daily settlment report 
```
const data = 
{
     date: "2019-01-06",
     method: "WECHATPAY",
     region: "MALAYSIA",
     sequence: 1
};
const result = await SDK.Payment.getDailySettlementReport(accessToken, data);
```


