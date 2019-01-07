import crypto = require('crypto')
import { RMSDKInstance } from ".";
import { generateSignature, sortedObject } from "./signature";

export function createTransactionUrl(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    
    return this.openApiInstance({
        url: '/payment/transaction/qrcode',
        method: 'post',
        data: sortedObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/payment/transaction/qrcode',
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}

    /**
     * Quick Pay QR
     *
     * @return {Object} Transaction object("item")
     */
export function quickPayCreate(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    
    return this.openApiInstance({
        url: '/payment/quickpay',
        method: 'post',
        data: sortedObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/payment/quickpay',
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}

export function quickPayRefund(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    
    return this.openApiInstance({
        url: '/payment/refund',
        method: 'post',
        data: sortedObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/payment/refund',
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}


export function quickPayReverse(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    
    return this.openApiInstance({
        url: '/payment/reverse',
        method: 'post',
        data: sortedObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/payment/reverse',
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}

export function quickPayGetPaymentTransactions(this: RMSDKInstance, accessToken: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    const data = {};

    return this.openApiInstance({
        url: `/payment/transactions`,
        method: 'get',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + `/payment/transactions`,
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}

export function quickPayGetPaymentTransactionByID(this: RMSDKInstance, accessToken: string, Id: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    const data = {};

    return this.openApiInstance({
        url: `/payment/transaction/${Id}`,
        method: 'get',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + `/payment/transaction/${Id}`,
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}


export function quickPayGetPaymentTransactionByOrderID(this: RMSDKInstance, accessToken: string, orderId: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    const data = {};

    return this.openApiInstance({
        url: `/payment/transaction/order/${orderId}`,
        method: 'get',
        data: {},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + `/payment/transaction/order/${orderId}`,
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}

export function quickPayGetDailySettlementReport(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()


    return this.openApiInstance({
        url: `/payment/settlement/csv`,
        method: 'post',
        data: sortedObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + `/payment/settlement/csv`,
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err.response.data))
}