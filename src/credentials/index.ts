import axios from 'axios';
import { RMOpenAPIClient } from '../index';
import { Buffer } from 'buffer';

/**
 * Get client credential (Authentication)
 * will return null if clientId and clientSecret incorrect
 */
export function getClientCredentials(this: RMOpenAPIClient) {
    if (!this.clientId || !this.clientSecret) {
        return null
    }

    const basic = this.clientId + ':' + this.clientSecret
    const basic_signature = Buffer.from(basic).toString('base64')

    return axios({
        url: 'https://sb-oauth.revenuemonster.my/v1/token',
        method: 'post',
        data: { grantType: 'client_credentials' },
        headers: { 'Authorization': 'Basic ' + basic_signature },
        timeout: this.timeout,
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

/**
 * Refresh token
 */
export function refreshToken(this: RMOpenAPIClient, refreshToken: string) { 
    const basic = this.clientId + ':' + this.clientSecret
    const basic_signature = Buffer.from(basic).toString('base64')

    return axios({
        url: 'https://sb-oauth.revenuemonster.my/v1/token',
        method: 'post',
        data: {
            grantType: "refresh_token",
            refreshToken, 
        },
        headers: { 'Authorization': 'Basic ' + basic_signature },
        timeout: this.timeout,
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}
