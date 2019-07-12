"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var lodash_1 = require("lodash");
var credentials_1 = require("./credentials");
var quickPay_1 = require("./payment/quickPay");
var transactionQR_1 = require("./payment/transactionQR");
var merchant_1 = require("./merchant");
var user_1 = require("./user");
var store_1 = require("./store");
var loyalty_1 = require("./loyalty");
var voucher_1 = require("./voucher");
var wechat_1 = require("./wechat");
function RMSDK(instanceConfig) {
    var defaults = {
        timeout: 2000,
        isProduction: false,
        clientId: '',
        clientSecret: '',
        privateKey: '',
        oauthApiVersion: 'v1',
        openApiVersion: 'v3',
    };
    var config = lodash_1.merge(defaults, instanceConfig);
    var oauthUrl = config.isProduction
        ? 'https://oauth.revenuemonster.my/' + config.oauthApiVersion
        : 'https://sb-oauth.revenuemonster.my/' + config.oauthApiVersion;
    var openApiUrl = config.isProduction
        ? 'https://open.revenuemonster.my/' + config.openApiVersion
        : 'https://sb-open.revenuemonster.my/' + config.openApiVersion;
    var oauthInstance = axios_1.default.create({
        baseURL: oauthUrl,
        timeout: config.timeout,
        headers: {
            'User-Agent': 'RM API Client Nodejs',
            'Content-Type': 'application/json'
        }
    });
    var openApiInstance = axios_1.default.create({
        baseURL: openApiUrl,
        timeout: config.timeout,
        headers: {
            'User-Agent': 'RM API Client Nodejs',
            'Content-Type': 'application/json'
        }
    });
    return {
        timeout: config.timeout,
        isProduction: config.isProduction,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        privateKey: config.privateKey,
        oauthApiVersion: config.oauthApiVersion,
        oauthUrl: oauthUrl,
        openApiVersion: config.openApiVersion,
        openApiUrl: openApiUrl,
        oauthInstance: oauthInstance,
        openApiInstance: openApiInstance,
        getClientCredentials: credentials_1.getClientCredentials,
        refreshToken: credentials_1.refreshToken,
        getMerchantProfile: merchant_1.getMerchantProfile,
        getMerchantSubscriptions: merchant_1.getMerchantSubscriptions,
        getStores: store_1.getStores,
        getStoreById: store_1.getStoreById,
        createStore: store_1.createStore,
        updateStore: store_1.updateStore,
        deleteStore: store_1.deleteStore,
        getUserProfile: user_1.getUserProfile,
        Payment: {
            timeout: config.timeout,
            isProduction: config.isProduction,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            privateKey: config.privateKey,
            oauthApiVersion: config.oauthApiVersion,
            oauthUrl: oauthUrl,
            openApiVersion: config.openApiVersion,
            openApiUrl: openApiUrl,
            oauthInstance: oauthInstance,
            openApiInstance: openApiInstance,
            initQuickPay: quickPay_1.initQuickPay,
            refund: quickPay_1.refund,
            reverse: quickPay_1.reverse,
            getPaymentTransactions: quickPay_1.getPaymentTransactions,
            getPaymentTransactionById: quickPay_1.getPaymentTransactionById,
            getPaymentTransactionByOrderId: quickPay_1.getPaymentTransactionByOrderId,
            getDailySettlementReport: quickPay_1.getDailySettlementReport,
            createTransactionUrl: transactionQR_1.createTransactionUrl,
            getTransactionUrl: transactionQR_1.getTransactionUrl,
            getTransactionUrlByCode: transactionQR_1.getTransactionUrlByCode,
            getTransactionsByCode: transactionQR_1.getTransactionsByCode,
        },
        giveLoyaltyPoint: loyalty_1.giveLoyaltyPoint,
        issueVoucher: voucher_1.issueVoucher,
        voidVoucher: voucher_1.voidVoucher,
        getVoucherByCode: voucher_1.getVoucherByCode,
        getVoucherBatches: voucher_1.getVoucherBatches,
        getVoucherBatchByKey: voucher_1.getVoucherBatchByKey,
        getWechatOauthUrl: wechat_1.getWechatOauthUrl,
        getWechatUserByCode: wechat_1.getWechatUserByCode,
    };
}
exports.RMSDK = RMSDK;
exports.default = RMSDK;
//# sourceMappingURL=index.js.map