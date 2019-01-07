import { Buffer } from 'buffer';
import { RMSDKInstance } from '../index';

/**
 * Get client credential (Authentication)
 * will return null if clientId and clientSecret incorrect
 */
export function quickPay(this: RMSDKInstance) {
    if (!this.clientId || !this.clientSecret) {
        return null
    }

    const basic = this.clientId + ':' + this.clientSecret
    const basic_signature = Buffer.from(basic).toString('base64')

    return this.openApiInstance({
        url: '/token',
        method: 'post',
        data: { grantType: 'client_credentials' },
        headers: { 'Authorization': 'Basic ' + basic_signature },
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}
