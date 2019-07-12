import { RMSDKInstance } from ".";
export declare function issueVoucher(this: RMSDKInstance, accessToken: string, batchKey: string): Promise<any>;
export declare function voidVoucher(this: RMSDKInstance, accessToken: string, code: string): Promise<any>;
export declare function getVoucherByCode(this: RMSDKInstance, accessToken: string, code: string): Promise<any>;
export declare function getVoucherBatches(this: RMSDKInstance, accessToken: string): Promise<any>;
export declare function getVoucherBatchByKey(this: RMSDKInstance, accessToken: string, batchKey: string): Promise<any>;
//# sourceMappingURL=voucher.d.ts.map