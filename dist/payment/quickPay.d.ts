import { RMSDKInstance } from '../';
/**
 * Quick Pay QR
 *
 * @return {Object} Transaction object("item")
 */
export declare function initQuickPay(this: RMSDKInstance, accessToken: string, data: object): Promise<any>;
export declare function refund(this: RMSDKInstance, accessToken: string, data: object): () => Promise<void>;
export declare function reverse(this: RMSDKInstance, accessToken: string, data: object): Promise<any>;
export declare function getPaymentTransactions(this: RMSDKInstance, accessToken: string): Promise<any>;
export declare function getPaymentTransactionById(this: RMSDKInstance, accessToken: string, Id: string): Promise<any>;
export declare function getPaymentTransactionByOrderId(this: RMSDKInstance, accessToken: string, orderId: string): Promise<any>;
export declare function getDailySettlementReport(this: RMSDKInstance, accessToken: string, data: object): Promise<any>;
//# sourceMappingURL=quickPay.d.ts.map