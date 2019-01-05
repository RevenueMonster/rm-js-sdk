"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var lodash_1 = require("lodash");
function generateSignature(arg, privateKey) {
    var keys = Object.keys(arg.data);
    var sortedKeys = lodash_1.sortBy(keys);
    var signature_body = lodash_1.fromPairs(lodash_1.map(sortedKeys, function (key) { return [key, arg.data[key]]; }));
    var signature = Buffer.from(JSON.stringify(signature_body)).toString('base64');
    var full_signature = ''
        + 'data=' + signature
        + '&method=' + arg.method
        + '&nonceStr=' + arg.nonceStr
        + '&requestUrl=' + arg.requestUrl
        + '&signType=' + arg.signType
        + '&timestamp=' + arg.timestamp;
    console.log(full_signature);
    return crypto.createHmac('sha256', privateKey).update(full_signature).digest('base64');
}
exports.generateSignature = generateSignature;
//# sourceMappingURL=signature.js.map