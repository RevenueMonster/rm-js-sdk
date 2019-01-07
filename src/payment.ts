import crypto = require('crypto')
import { RMSDKInstance } from ".";
import { generateSignature } from "./signature";

export function createTransactionUrl(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    
    return this.openApiInstance({
        url: '/payment/transaction/qrcode',
        method: 'post',
        data,
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
    .catch(err => console.error(err))
}

export function getTransactionUrl(this: RMSDKInstance, accessToken: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: '/payment/transaction/qrcodes',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/payment/transaction/qrcodes',
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function getTransactionUrlByCode(this: RMSDKInstance, accessToken: string, code: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: '/payment/transaction/qrcode/' + code,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/payment/transaction/qrcode/' + code,
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function getTransactionsByCode(this: RMSDKInstance, accessToken: string, code: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: '/payment/transaction/qrcode/' + code + '/transactions',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/payment/transaction/qrcode/' + code + '/transactions',
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}
