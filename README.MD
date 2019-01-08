# API-SDK-Nodejs
This is an Nodejs SDK that maps some of the RESTful methods of Open API that are documented at [doc.revenuemonster.my](https://doc.revenuemonster.my/).

### Supported APIs
* Client Credentials (Authentication)
  * [client credential - access token generation](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#access-token-generation---getclientcredentials)
  * [refresh access token](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#refresh-access-token---refreshtokenstring)
* Mechant related API
  * [get merchant profile](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-merchant-profile---getmerchantprofileaccesstoken)
  * [get list of merchant subscriptions](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-merchant-subscription---getmerchantsubscriptionsaccesstoken)
* Store related API
  * get list of stores
  * get store by Id
  * create store
  * update store
  * delete store
* User related API
  * [get user profile](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-user-profile---getuserprofileaccesstoken)
* Payment (Transaction QRCode/URL)
  * [create transaction QRCode/URL](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#create-transaction-qrcodeurl)
  * [get list of transaction QRCode/URLs generated](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-list-of-transaction-qrcodeurls-generated)
  * [get transaction QRCode/URL by code](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-transaction-qrcodeurl-by-code)
  * [get list of transactions by code](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-list-of-transactions-by-code)
* Payment (Quick Pay)
  * [initiate Quick Pay transaction](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#initiate-quick-pay-transaction)
  * [refund transaction](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#refund-transaction)
  * [reverse transaction](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#reverse-transaction)
  * [get list of payment transactions](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-list-of-payment-transactions)
  * [get payment transaction by Id](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-payment-transaction-by-id)
  * [get payment trasaction by Order Id](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-payment-trasaction-by-order-id)
  * [get daily settlement report](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-daily-settlement-report)
* Loyalty
  * give loyalty point

### Prerequisites
1. Get Client ID and Client Secret from portal.
![ClientIDClientSecret](https://storage.googleapis.com/rm-portal-assets/img/rm-landing/clientIDclientSecret.png)
2. Generate private key and publci key from portal. 
![PrivateKeyPublicKey](https://storage.googleapis.com/rm-portal-assets/img/rm-landing/privateKeypublicKey.PNG)
3. Store private key for own use and public key at portal.
![PastePublicKey](https://storage.googleapis.com/rm-portal-assets/img/rm-landing/pastePublicKey.png)

## SDK API

Import the RMSDK via `require`
```js
var RMSDK = require('../RM-API-SDK-Nodejs').RMSDK
```
Or ES5
```js
var { RMSDK } = require('../RM-API-SDK-Nodejs')
```
Or Import/Export convention
```js
import { RMSDK } from '../RM-API-SDK-Nodejs'
```

Initialise a RMSDK instance by using
```js
const SDK = RMSDK({
    clientId: '5499912462549392892',
    clientSecret: 'pwMapjZzHljBALIGHxfGGXmiGLxjWBKt',
    privateKey: Buffer.from(fs.readFileSync('privateKey.pem')).toString(),

    isProduction: false // default, optional
    timeout: 2000, // default, optional
})
```

### Access Token Generation - getClientCredentials()
To get refresh token and access token(expired after 2 hours) with using provided `clientId` and `clientSecret`.

```js
const result = await SDK.getClientCredentials();
```

### Refresh Access Token - refreshToken(string)
To get new access token(expired after 2 hours) with using provided clientId and clientSecret (recommended to schedule to run this fucntion on every less than 2 hours) in order to avoid expired access token error.
```js
const result = await SDK.refreshToken(refreshToken);
```

## Merchant related API

### Get merchant profile - getMerchantProfile(accessToken)
```js
const result = await SDK.getMerchantProfile(accessToken);
```
### Get merchant subscription - getMerchantSubscriptions(accessToken)
```js
const result = await SDK.getMerchantSubscriptions(accessToken)
```

## User related API
### Get user profile - getUserProfile(accessToken)
```js
const result = await SDK.getUserProfile(accessToken)
```

## Payment (Transaction QRCode/URL)
### Create transaction QRCode/URL
**Payment.createTransactionUrl(accessToken, transactionPayload)**
```js
const result = await SDK.Payment.createTransactionUrl(accessToken, {
    amount: 100,
    currencyType: 'MYR',
    expiry: { type: 'PERMANENT' },
    isPreFillAmount: true,
    method: ['WECHATPAY'],
    order: {
        details: 'detail AAA',
        title: 'title BBB',
    },
    redirectUrl: 'https://www.google.com',
    storeId: '1981039839353524638',
    type: 'DYNAMIC',
})
console.log(result)
```

### Get list of transaction QRCode/URLs generated
**Payment.getTransactionUrl(accessToken)**
```js
const result = await SDK.Payment.getTransactionUrl(accessToken)
```

### Get transaction QRCode/URL by code
**Payment.getTransactionUrlByCode(accessToken, code)**
```js
const result = await SDK.Payment.getTransactionUrlByCode(accessToken, code)
```

### Get list of transactions by code
**Payment.getTransactionsByCode(accessToken, code)**
```js
const result = await SDK.Payment.getTransactionsByCode(accessToken)
```

## Payment (Quick Pay)

### Initiate Quick Pay transaction
**Payment.initQuickPay(accessToken, data)**
```js
const result = await SDK.Payment.initQuickPay(accessToken, {
    authCode: '161108235812586242',
    order: {
        amount: 100,
        currencyType: 'MYR',
        id: '12344333233444',
        title: 'title',
        detail: 'description here',
        additionalData: 'API testing',
    },
    ipAddress: '175.143.101.229',
    storeId: '5237968049713769466'
});
```

### Refund transaction
**Payment.refund(accessToken, data)**
```js
const result = await SDK.Payment.refund(accessToken, {
    transactionId: '181203100634010427614646',
    refund: {
        type: 'FULL',
        currencyType: 'MYR',
        amount: 100,
    },
    reason: 'testing purpose',
});
```
### Reverse transaction
**Payment.reverse(accessToken, data)**
```js
const result = await SDK.Payment.reverse(accessToken, {
    orderId: '12345678123'
});
```

### Get list of payment transactions
**Payment.getPaymentTransactions(accessToken)**
```js
const result = await SDK.Payment.getPaymentTransactions(accessToken);
```

### Get payment transaction by Id
**Payment.getTransactionById(accessToken, Id)**
```js
const result = await SDK.Payment.getPaymentTransactionById(accessToken, trasnactionId);
```

### Get payment trasaction by Order Id
**Payment.getTransactionByOrderId(accessToken, orderId)**
```js
const result = await SDK.Payment.getPaymentTransactionByOrderId(accessToken, orderId);
```

### Get daily settlement report
**Payment.getDailySettlementReport(accessToken, data)**
```js
const result = await SDK.Payment.getDailySettlementReport(accessToken, {
    date: "2019-01-06",
    method: "WECHATPAY",
    region: "MALAYSIA",
    sequence: 1
});
```
