"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var signature_1 = require("./signature");
function createTransactionUrl(accessToken, data) {
    var nonceStr = crypto.randomBytes(20).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: '/payment/transaction/qrcode',
        method: 'post',
        data: data,
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-NonceStr': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/payment/transaction/qrcode',
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response); });
}
exports.createTransactionUrl = createTransactionUrl;
//# sourceMappingURL=payment.js.map