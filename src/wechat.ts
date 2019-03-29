import crypto = require('crypto')
import { RMSDKInstance } from "."
import { generateSignature } from "./signature"

export function getWechatOauthUrl(this: RMSDKInstance, accessToken: string, redirectUrl: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: 'socialmedia/rm/wechat-oauth/url',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: {
                    redirectUrl,
                    scope: 'snsapi_userinfo',
                },
                requestUrl: this.openApiUrl + '/socialmedia/rm/wechat-oauth/url',
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

export function getWechatUserByCode(this: RMSDKInstance, accessToken: string, code: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: 'socialmedia/rm/wechat-oauth/code',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: {
                    code,
                },
                requestUrl: this.openApiUrl + '/socialmedia/rm/wechat-oauth/code',
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