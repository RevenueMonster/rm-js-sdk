import { AxiosInstance } from 'axios';
interface config {
    timeout?: number;
    isProduction?: boolean;
    clientId: string;
    clientSecret: string;
}
export interface RMSDKInstance {
    timeout: number;
    isProduction: boolean;
    clientId: string;
    clientSecret: string;
    oauthInstance: AxiosInstance;
    openApiInstance: AxiosInstance;
    quickPay: () => Promise<any> | null;
    getClientCredentials: () => Promise<any> | null;
    refreshToken: (refreshToken: string) => Promise<any>;
}
export declare function RMSDK(instanceConfig?: config): RMSDKInstance;
export {};
//# sourceMappingURL=index.d.ts.map