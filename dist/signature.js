"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function sortObject(obj) {
    var sortedObj = {};
    Object.keys(obj).sort().forEach(function (key) {
        if (Array.isArray(obj[key])) {
            sortedObj[key] = obj[key];
        }
        else if (typeof obj[key] === 'object') {
            sortedObj[key] = sortObject(obj[key]);
        }
        else {
            sortedObj[key] = obj[key];
        }
    });
    return sortedObj;
}
exports.sortObject = sortObject;
function generateSignature(arg, privateKey) {
    var signature_data = '';
    if (arg.data !== null && typeof arg.data === 'object') {
        var signature_body = sortObject(arg.data);
        var signature = Buffer.from(JSON.stringify(signature_body)).toString('base64');
        signature_data = 'data=' + signature + '&';
    }
    var full_signature = signature_data
        + 'method=' + arg.method
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