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
    .catch(err => console.error(err))
}
