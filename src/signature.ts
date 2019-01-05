import crypto = require('crypto');
import { map, sortBy, fromPairs } from 'lodash'

export function generateSignature(arg: {
    data: any,
    requestUrl: string,
    nonceStr: string,
    signType: string,
    method: string,
    timestamp: string,
}, privateKey: string): string {
    const keys = Object.keys(arg.data)
    const sortedKeys = sortBy(keys)
    const signature_body = fromPairs(map(sortedKeys, (key: string) => [ key, arg.data[key] ]))

    const signature = Buffer.from(JSON.stringify(signature_body)).toString('base64')

    const full_signature = ''
    + 'data=' + signature
    + '&method=' + arg.method
    + '&nonceStr=' + arg.nonceStr
    + '&requestUrl=' + arg.requestUrl
    + '&signType=' + arg.signType
    + '&timestamp=' + arg.timestamp

    return crypto
        .createHmac('sha256', privateKey)
        .update(full_signature)
        .digest('base64')
}