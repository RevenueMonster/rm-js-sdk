"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var signature_1 = require("../signature");
/**
 * Quick Pay QR
 *
 * @return {Object} Transaction object("item")
 */
function initQuickPay(accessToken, data) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: '/payment/quickpay',
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/payment/quickpay',
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.initQuickPay = initQuickPay;
function refund(accessToken, data) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: '/payment/refund',
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/payment/refund',
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.refund = refund;
function reverse(accessToken, data) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: '/payment/reverse',
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/payment/reverse',
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.reverse = reverse;
function getPaymentTransactions(accessToken) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "/payment/transactions",
        method: 'get',
        data: null,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + "/payment/transactions",
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.getPaymentTransactions = getPaymentTransactions;
function getPaymentTransactionById(accessToken, Id) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "/payment/transaction/" + Id,
        method: 'get',
        data: null,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + ("/payment/transaction/" + Id),
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.getPaymentTransactionById = getPaymentTransactionById;
function getPaymentTransactionByOrderId(accessToken, orderId) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "/payment/transaction/order/" + orderId,
        method: 'get',
        data: null,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + ("/payment/transaction/order/" + orderId),
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.getPaymentTransactionByOrderId = getPaymentTransactionByOrderId;
function getDailySettlementReport(accessToken, data) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: "/payment/settlement/csv",
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + "/payment/settlement/csv",
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err.response.data); });
}
exports.getDailySettlementReport = getDailySettlementReport;
//# sourceMappingURL=quickPay.js.map