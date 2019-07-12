"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var signature_1 = require("./signature");
function issueVoucher(accessToken, batchKey) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "voucher-batch/" + batchKey + "/issue",
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + ("voucher-batch/" + batchKey + "/issue"),
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
exports.issueVoucher = issueVoucher;
function voidVoucher(accessToken, code) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "voucher/" + code + "/issue",
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + ("voucher/" + code + "/issue"),
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
exports.voidVoucher = voidVoucher;
function getVoucherByCode(accessToken, code) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "voucher/" + code,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + ("voucher/" + code),
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.getVoucherByCode = getVoucherByCode;
function getVoucherBatches(accessToken) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "voucher-batches",
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + "voucher-batches",
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.getVoucherBatches = getVoucherBatches;
function getVoucherBatchByKey(accessToken, batchKey) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "voucher-batches" + batchKey,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + ("voucher-batches" + batchKey),
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.getVoucherBatchByKey = getVoucherBatchByKey;
//# sourceMappingURL=voucher.js.map