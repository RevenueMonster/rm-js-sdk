"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var signature_1 = require("./signature");
function getStores(accessToken) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: 'stores',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/stores',
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
exports.getStores = getStores;
function getStoreById(accessToken, storeId) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: 'store/' + storeId,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/store/' + storeId,
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
exports.getStoreById = getStoreById;
function createStore(accessToken, data) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: 'store',
        method: 'post',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/store',
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
exports.createStore = createStore;
function updateStore(accessToken, storeId, data) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: 'store/' + storeId,
        method: 'patch',
        data: signature_1.sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: data,
                requestUrl: this.openApiUrl + '/store/' + storeId,
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'patch',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.updateStore = updateStore;
function deleteStore(accessToken, storeId) {
    var nonceStr = crypto.randomBytes(32).toString('hex');
    var timestamp = new Date().getTime().toString();
    return this.openApiInstance({
        url: 'store/' + storeId,
        method: 'delete',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + signature_1.generateSignature({
                data: null,
                requestUrl: this.openApiUrl + '/store/' + storeId,
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
exports.deleteStore = deleteStore;
//# sourceMappingURL=store.js.map