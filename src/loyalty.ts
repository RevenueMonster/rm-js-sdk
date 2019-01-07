import crypto = require('crypto')
import { RMSDKInstance } from ".";
import { generateSignature } from "./signature";

export interface ILoyaltyRewardArg {
    point: number,
    type: 'PHONENUMBER' | 'ID',
    memberId?: string,
    countryCode?: string,
    phoneNumber?: string,
}

export function giveLoyaltyPoint(this: RMSDKInstance, accessToken: string, data: ILoyaltyRewardArg) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: 'loyalty/reward',
        method: 'post',
        data,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/loyalty/reward',
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
