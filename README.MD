# API-SDK-Nodejs
[![](https://img.shields.io/npm/v/rm-api-sdk.svg?style=flat-square)](https://www.npmjs.com/package/rm-api-sdk)
[![](https://img.shields.io/npm/types/rm-api-sdk.svg)](https://www.npmjs.com/package/rm-api-sdk)

This is an Nodejs/Typescript SDK that maps some of the RESTful methods of Open API that are documented at [doc.revenuemonster.my](https://doc.revenuemonster.my/).

### Supported APIs
* Client Credentials (Authentication)
  * [client credential - access token generation](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#access-token-generation---getclientcredentials)
  * [refresh access token](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#refresh-access-token---refreshtokenstring)
* Mechant related API
  * [get merchant profile](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-merchant-profile---getmerchantprofileaccesstoken)
  * [get list of merchant subscriptions](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-merchant-subscription---getmerchantsubscriptionsaccesstoken)
* Store related API
  * [get list of stores](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-list-of-stores---getstoresaccesstoken)
  * [get store by Id](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-store-by-id---getstorebyidaccesstoken)
  * [create store](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#create-store---createstoreaccesstoken-data)
  * [update store](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#update-store---updatestoreaccesstoken-storeid-data)
  * [delete store](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#delete-store---deletestoreaccesstoken-storeid)
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
  * [give loyalty point](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#give-loyalty-point---giveloyaltypointaccesstoken-data)
* Voucher
  * [issue voucher](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#issue-voucher---issuevoucheraccesstoken-batchkey)
  * [void voucher](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#void-voucher---voidvoucheraccesstoken-code)
  * [get voucher by code](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-voucher-by-code---getvoucherbycodeaccesstoken-code)
  * [get list of voucher batches](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-list-of-voucher-batches---getvoucherbatchesaccesstoken)
  * [get voucher batch by key](https://github.com/RevenueMonster/RM-API-SDK-Nodejs#get-voucher-batch-by-key---getvoucherbatchbykeyaccesstoken-batchkey)

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
var RMSDK = require('rm-api-sdk').RMSDK
```
Or ES5
```js
var { RMSDK } = require('rm-api-sdk')
```
Or Import/Export convention
```js
import { RMSDK } from 'rm-api-sdk'
```

Initialise a RMSDK instance by using
```js
const SDK = RMSDK({
    clientId: '5499912462549392892',
    clientSecret: 'pwMapjZzHljBALIGHxfGGXmiGLxjWBKt',
    privateKey: Buffer.from(fs.readFileSync('privateKey.pem')).toString(),

    openApiVersion: 'v3'  // default, optional
    oauthApiVersion: 'v1' // default, optional
    isProduction: false   // default, optional
    timeout: 2000,        // default, optional
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

## Store realted API
### Get list of stores - getStores(accessToken)
```js
const result = await SDK.getMerchantSubscriptions(accessToken)
```

### Get store by Id - getStoreById(accessToken)
```js
const result = await SDK.getStoreById(accessToken)
```

### Create store - createStore(accessToken, data)
```js
const result = await SDK.createStore(accessToken, {
    name: 'Revenue Monster',
    addressLine1: 'B-5-30, 5th Floor, Block Bougainvillea,'
    addressLine2: 'PJU 6A, Lebuhraya SPRINT, 10 Boulevard,' // optional
    postCode: '47400',
    city: 'Petaling Jaya',
    state: 'Selangor',
    country: 'Malaysia',
    countryCode: '60',
    phoneNumber: '377334080',
    geoLocation: { // optional
        Lat: 3.1349857,
        Lng: 101.6136659
    }
})
```

### Update store - updateStore(accessToken, storeId, data)
```js
const result = await SDK.updateStore(accessToken, '1662168764176583360', {
    name: 'Revenue Monster',
    addressLine1: 'B-5-30, 5th Floor, Block Bougainvillea,'
    addressLine2: 'PJU 6A, Lebuhraya SPRINT, 10 Boulevard,' // optional
    postCode: '47400',
    city: 'Petaling Jaya',
    state: 'Selangor',
    country: 'Malaysia',
    countryCode: '60',
    phoneNumber: '377334080',
    geoLocation: { // optional
        Lat: 3.1349857,
        Lng: 101.6136659
    }
})
```

### Delete store - deleteStore(accessToken, storeId)
```js
const result = await SDK.deleteStore(accessToken, '1662168764176583360')
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
const result = await SDK.Payment.getTransactionUrlByCode(accessToken, 'a669adc3b06fe5cef977cc762f40ce8c')
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
const result = await SDK.Payment.getPaymentTransactionById(accessToken, '1805260552060011600267');
```

### Get payment trasaction by Order Id
**Payment.getTransactionByOrderId(accessToken, orderId)**
```js
const result = await SDK.Payment.getPaymentTransactionByOrderId(accessToken, '9809099398273542333339');
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

## Loyalty related API
### Give loyalty point - giveLoyaltyPoint(accessToken, data)
```js
const result = await SDK.giveLoyaltyPoint(accessToken, {
    point: 100,
    type: 'PHONENUMBER',
    countryCode: '60',
    phoneNumber: '176473298',
});
```

## Voucher related API
### Issue voucher - issueVoucher(accessToken, batchKey)
```js
const result = await SDK.issueVoucher(
    accessToken,
    'EhQKCE1lcmNoYW50EJXVzd3wraqTORIYCgxWb3VjaGVyQmF0Y2gQkvnGweaB2uQg'
)
```

### Void voucher - voidVoucher(accessToken, code)
```js
const result = await SDK.voidVoucher(accessToken, 'NAklEfbVdV')
```

### Get voucher by code - getVoucherByCode(accessToken, code)
```js
const result = await SDK.getVoucherByCode(accessToken, 'NAklEfbVdV')
```

### Get list of voucher batches - getVoucherBatches(accessToken)
```js
const result = await SDK.getVoucherBatches(accessToken)
```

### Get voucher batch by key - getVoucherBatchByKey(accessToken, batchKey)
```js
const result = await SDK.getVoucherBatchByKey(
    accessToken,
    'EhQKCE1lcmNoYW50EJXVzd3wraqTORIYCgxWb3VjaGVyQmF0Y2gQxZP495jpsOla'
)
```

### Get WeChat User OAuth URL throught Revenue Monster Official Account
```js
const result = await SDK.getWechatOauthUrl(
    accessToken,
    'user-defined-redirectUrl'
)
```

###  Get Revenue Monster Official Account WeChat User Information By Code
```js
const result = await SDK.getWechatUserByCode(
    accessToken,
    'code-you-get-from-wechat-oauth-url'
)
```
