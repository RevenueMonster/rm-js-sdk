"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
/**
 * Get client credential (Authentication)
 * will return null if clientId and clientSecret incorrect
 */
function getClientCredentials() {
    var basic = this.clientId + ':' + this.clientSecret;
    var basic_signature = buffer_1.Buffer.from(basic).toString('base64');
    return this.oauthInstance({
        url: '/token',
        method: 'post',
        data: { grantType: 'client_credentials' },
        headers: { 'Authorization': 'Basic ' + basic_signature },
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.getClientCredentials = getClientCredentials;
/**
 * Refresh token
 */
function refreshToken(refreshToken) {
    var basic = this.clientId + ':' + this.clientSecret;
    var basic_signature = buffer_1.Buffer.from(basic).toString('base64');
    return this.oauthInstance({
        url: 'token',
        method: 'post',
        data: {
            grantType: "refresh_token",
            refreshToken: refreshToken,
        },
        headers: { 'Authorization': 'Basic ' + basic_signature },
    })
        .then(function (x) { return x.data; })
        .catch(function (err) { return console.error(err); });
}
exports.refreshToken = refreshToken;
//# sourceMappingURL=credentials.js.map