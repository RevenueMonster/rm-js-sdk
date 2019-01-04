
var crypto = require('crypto');

var generateSignature = function (data, privateKey, requestUrl, nonceStr, signType,method, timestamp) {
    const body = {};
    body.requestUrl = requestUrl;
    body.privateKey = privateKey;
    body.method = method;
    body.signType = signType;
    body.nonceStr = nonceStr;
    body.timestamp = timestamp;

    var sortedObject = function (data){
        var obj = {};
        Object.keys(data)
        .sort()
        .forEach(function(v, i) {
            if(data[v].constructor === Object) {
                obj[v] = sortedObject(data[v]);
                
            } else {
                obj[v] = data[v];
            }
        });
        return obj;
    }

    var encodeDataBase64 = Buffer.from(JSON.stringify(sortedObject(data))).toString('base64')

    var plainText = 'data='+encodeDataBase64+'&method='+body.method+'&nonceStr='
                    +body.nonceStr+'&requestUrl='+body.requestUrl+'&signType='+body.signType
                    +'&timestamp='+body.timestamp;

    var hash = crypto.createSign('SHA256');
    hash.update(plainText);

    return hash.sign(body.privateKey, 'base64');
}

module.exports = {  
    generateSignature,
}
