import fs = require('fs')
import axios, { AxiosInstance } from 'axios'
import { merge } from 'lodash'

import { getClientCredentials, refreshToken } from './credentials'
import { createTransactionUrl } from './payment'

interface config {
  timeout?: number
  isProduction?: boolean
  clientId: string
  clientSecret: string
  privateKey: string
}

export interface RMSDKInstance {
  timeout: number,
  isProduction: boolean,
  clientId: string,
  clientSecret: string,
  privateKey: string,

  oauthUrl: string,
  openApiUrl: string,

  oauthInstance: AxiosInstance,
  openApiInstance: AxiosInstance,

  getClientCredentials: () => Promise<any> | null,
  refreshToken: (refreshToken: string) => Promise<any>,
  createTransactionUrl: (acessToken: string, data: object) => Promise<any>,
}

export function RMSDK(instanceConfig?: config): RMSDKInstance {
  const defaults = {
    timeout: 2000,
    isProduction: false,
    clientId: '',
    clientSecret: '',
    privateKey: '',
  }
  const config = merge(defaults, instanceConfig)
  
  const oauthUrl = config.isProduction
    ? 'https://oauth.revenuemonster.my/v1'
    : 'https://sb-oauth.revenuemonster.my/v1'
  
  const openApiUrl = config.isProduction
    ? 'https://open.revenuemonster.my/v3'
    : 'https://sb-open.revenuemonster.my/v3'

  const oauthInstance = axios.create({
    baseURL: oauthUrl,
    timeout: config.timeout,
    headers: { 'User-Agent': 'RM API Client Nodejs' }
  })

  const openApiInstance = axios.create({
    baseURL: openApiUrl,
    timeout: config.timeout,
    headers: { 'User-Agent': 'RM API Client Nodejs' }
  })

  return {
    timeout: config.timeout,
    isProduction: config.isProduction,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    privateKey: config.privateKey,

    oauthUrl,
    openApiUrl,

    oauthInstance,
    openApiInstance,

    getClientCredentials,
    refreshToken,
    createTransactionUrl,
  }
}

//////////



(async () => {
  const privateKey = Buffer.from(fs.readFileSync('src/private.pem')).toString()

  const SDK = RMSDK({
    clientId: '5499912462549392881',
    clientSecret: 'pwMapjZzHljBALIGHxfGGXmiGLxjWbkT',
    privateKey,
  });

  const a = await SDK.getClientCredentials();
  // console.log(a);
  // const b = await SDK.refreshToken(a.refreshToken)
  // console.log(b)

  const data = {
    amount: 100,
    currencyType: 'MYR',
    expiry: { type: 'PERMENANT' },
    isPreFillAmount: true,
    method: ['WECHATPAY'],
    order: {
      details: 'detail AAA',
      title: 'title BBB',
    },
    redirectUrl: 'https://www.google.com',
    storeId: '1981039839353524638',
    type: 'DYNAMIC',
  }

  const resp = await SDK.createTransactionUrl(a.accessToken, data)
  console.log(resp)
})();
