"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var lodash_1 = require("lodash");
function sortObject(obj) {
    var keys = Object.keys(obj);
    var sortedKeys = lodash_1.sortBy(keys);
    return lodash_1.fromPairs(lodash_1.map(sortedKeys, function (key) { return [key, obj[key]]; }));
}
function generateSignature(arg, privateKey) {
    var signature_body = sortObject(arg.data);
    var signature = Buffer.from(JSON.stringify(signature_body)).toString('base64');
    var full_signature = ''
        + 'data=' + signature
        + '&method=' + arg.method
        + '&nonceStr=' + arg.nonceStr
        + '&requestUrl=' + arg.requestUrl
        + '&signType=' + arg.signType
        + '&timestamp=' + arg.timestamp;
    return crypto
        .createSign('SHA256')
        .update(full_signature)
        .sign(privateKey, 'base64');
}
exports.generateSignature = generateSignature;
//# sourceMappingURL=signature.js.map