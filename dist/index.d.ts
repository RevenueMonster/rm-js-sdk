import { AxiosInstance } from 'axios';
import { ILoyaltyRewardArg } from './loyalty';
interface config {
    timeout?: number;
    isProduction?: boolean;
    clientId: string;
    clientSecret: string;
    privateKey: string;
}
export interface RMSDKInstance {
    timeout: number;
    isProduction: boolean;
    clientId: string;
    clientSecret: string;
    privateKey: string;
    oauthApiVersion: string;
    oauthUrl: string;
    openApiVersion: string;
    openApiUrl: string;
    oauthInstance: AxiosInstance;
    openApiInstance: AxiosInstance;
    getClientCredentials: () => Promise<any>;
    refreshToken: (refreshToken: string) => Promise<any>;
    getMerchantProfile: (accessToken: string) => Promise<any>;
    getMerchantSubscriptions: (accessToken: string) => Promise<any>;
    getStores: (accessToken: string) => Promise<any>;
    getStoreById: (accessToken: string, storeId: string) => Promise<any>;
    createStore: (accessToken: string, data: object) => Promise<any>;
    updateStore: (accessToken: string, storeId: string, data: object) => Promise<any>;
    deleteStore: (accessToken: string, storeId: string) => Promise<any>;
    getUserProfile: (accessToken: string) => Promise<any>;
    giveLoyaltyPoint: (accessToken: string, data: ILoyaltyRewardArg) => Promise<any>;
    issueVoucher: (accessToken: string, batchKey: string) => Promise<any>;
    voidVoucher: (accessToken: string, code: string) => Promise<any>;
    getVoucherByCode: (accessToken: string, code: string) => Promise<any>;
    getVoucherBatches: (accessToken: string) => Promise<any>;
    getVoucherBatchByKey: (accessToken: string, batchKey: string) => Promise<any>;
    getWechatOauthUrl: (accessToken: string, redirectUrl: string) => Promise<any>;
    getWechatUserByCode: (accessToken: string, code: string) => Promise<any>;
    Payment: {
        timeout: number;
        isProduction: boolean;
        clientId: string;
        clientSecret: string;
        privateKey: string;
        oauthApiVersion: string;
        oauthUrl: string;
        openApiVersion: string;
        openApiUrl: string;
        oauthInstance: AxiosInstance;
        openApiInstance: AxiosInstance;
        initQuickPay: (acessToken: string, data: object) => Promise<any>;
        refund: (acessToken: string, data: object) => Promise<any>;
        reverse: (acessToken: string, data: object) => Promise<any>;
        getPaymentTransactions: (acessToken: string) => Promise<any>;
        getPaymentTransactionById: (acessToken: string, Id: string) => Promise<any>;
        getPaymentTransactionByOrderId: (acessToken: string, orderId: string) => Promise<any>;
        getDailySettlementReport: (acessToken: string, data: object) => Promise<any>;
        createTransactionUrl: (acessToken: string, data: object) => Promise<any>;
        getTransactionUrl: (accessToken: string) => Promise<any>;
        getTransactionUrlByCode: (accessToken: string, code: string) => Promise<any>;
        getTransactionsByCode: (accessToken: string, code: string) => Promise<any>;
    };
}
export declare function RMSDK(instanceConfig?: config): RMSDKInstance;
export default RMSDK;
//# sourceMappingURL=index.d.ts.map