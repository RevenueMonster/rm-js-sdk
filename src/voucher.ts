import crypto = require('crypto')
import { RMSDKInstance } from ".";
import { generateSignature, sortObject } from "./signature";

export function issueVoucher(this: RMSDKInstance, accessToken: string, batchKey: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `voucher-batch/${batchKey}/issue`,
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + `/voucher-batch/${batchKey}/issue`,
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function voidVoucher(this: RMSDKInstance, accessToken: string, code: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `voucher/${code}/void`,
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + `/voucher/${code}/void`,
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function getVoucherByCode(this: RMSDKInstance, accessToken: string, code: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `voucher/${code}`,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + `/voucher/${code}`,
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function getVoucherBatches(this: RMSDKInstance, accessToken: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `voucher-batches`,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + `/voucher-batches`,
                nonceStr: nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp: timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function getVoucherBatchByKey(this: RMSDKInstance, accessToken: string, batchKey: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `voucher-batch/${batchKey}`,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data: null,
                requestUrl: this.openApiUrl + `/voucher-batch/${batchKey}`,
                nonceStr,
                signType: 'sha256',
                method: 'get',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function reinstateVoucher(this: RMSDKInstance, accessToken: string, code: string, data: object) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `voucher/${code}/reinstate`,
        method: 'patch',
        data: sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + `/voucher/${code}/reinstate`,
                nonceStr,
                signType: 'sha256',
                method: 'patch',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}

export function bulkRedeemVouchers(this: RMSDKInstance, accessToken: string, codes: string[]) {
    const data = { codes }
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()

    return this.openApiInstance({
        url: `vouchers/redeem`,
        method: 'post',
        data: sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + `/vouchers/redeem`,
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
    .then(x => x.data)
    .catch(err => console.error(err))
}