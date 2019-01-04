import { RMOpenAPIClient } from '../index';
/**
 * Get client credential (Authentication)
 * will return null if clientId and clientSecret incorrect
 */
export declare function getClientCredentials(this: RMOpenAPIClient): Promise<any> | null;
/**
 * Refresh token
 */
export declare function refreshToken(this: RMOpenAPIClient, refreshToken: string): Promise<any>;
//# sourceMappingURL=index.d.ts.map