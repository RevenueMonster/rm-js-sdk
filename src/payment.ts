import crypto = require('crypto')
import { RMSDKInstance } from ".";
import { generateSignature } from "./signature";

export function createTransactionUrl(this: RMSDKInstance, accessToken: string, data: object) {
    const nonceStr = crypto.randomBytes(20).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: '/payment/transaction/qrcode',
        method: 'post',
        data,
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-NonceStr': nonceStr,
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
    .catch(err => console.error(err.response))
}