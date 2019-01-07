import crypto = require('crypto')
import { RMSDKInstance } from ".";
import { generateSignature } from "./signature";

export function getMerchantProfile(this: RMSDKInstance, accessToken: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: 'merchant',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/merchant',
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

export function getMerchantSubscriptions(this: RMSDKInstance, accessToken: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: '/merchant/subscriptions',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/merchant/subscriptions',
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