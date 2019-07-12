"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var signature_1 = require("./signature");
function getWechatOauthUrl(accessToken, redirectUrl) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    var data = {
        redirectUrl: redirectUrl,
        scope: 'snsapi_userinfo'
    };
    return this.openApiInstance({
        url: '/socialmedia/rm/wechat-oauth/url',
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/socialmedia/rm/wechat-oauth/url',
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        },
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.getWechatOauthUrl = getWechatOauthUrl;
function getWechatUserByCode(accessToken, code) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    var data = { code: code };
    return this.openApiInstance({
        url: 'socialmedia/rm/wechat-oauth/code',
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/socialmedia/rm/wechat-oauth/code',
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.getWechatUserByCode = getWechatUserByCode;
//# sourceMappingURL=wechat.js.map