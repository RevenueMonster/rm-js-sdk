import { AxiosInstance } from 'axios';
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
    oauthUrl: string;
    openApiUrl: string;
    oauthInstance: AxiosInstance;
    openApiInstance: AxiosInstance;
    getClientCredentials: () => Promise<any> | null;
    refreshToken: (refreshToken: string) => Promise<any>;
    createTransactionUrl: (acessToken: string, data: object) => Promise<any>;
}
export declare function RMSDK(instanceConfig?: config): RMSDKInstance;
export {};
//# sourceMappingURL=index.d.ts.map