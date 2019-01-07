import fs = require('fs')
import axios, { AxiosInstance } from 'axios'
import { merge } from 'lodash'

import { getClientCredentials, refreshToken } from './credentials'
import {
  createTransactionUrl,
  getTransactionUrl,
  getTransactionUrlByCode,
  getTransactionsByCode
} from './payment'
// import { sortedObject, generateSignature } from './signature'

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

  getClientCredentials: () => Promise<any>,
  refreshToken: (refreshToken: string) => Promise<any>,
  createTransactionUrl: (acessToken: string, data: object) => Promise<any>,
  getTransactionUrl: (accesToken: string) => Promise<any>,
  getTransactionUrlByCode: (accessToken: string, code: string) => Promise<any>,
  getTransactionsByCode: (accessToken: string, code: string) => Promise<any>,
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
    headers: {
      'User-Agent': 'RM API Client Nodejs',
      'Content-Type': 'application/json'
    }
  })

  const openApiInstance = axios.create({
    baseURL: openApiUrl,
    timeout: config.timeout,
    headers: {
      'User-Agent': 'RM API Client Nodejs',
      'Content-Type': 'application/json'
    }
  })

  // openApiInstance.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   console.log(config)
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

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
    getTransactionUrl,
    getTransactionUrlByCode,
    getTransactionsByCode,
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

  const resp0 = await SDK.getClientCredentials()
  const resp1 = await SDK.createTransactionUrl(resp0.accessToken, {
    amount: 100,
    currencyType: 'MYR',
    expiry: { type: 'PERMANENT' },
    isPreFillAmount: true,
    method: ['WECHATPAY'],
    order: {
      details: 'detail AAA',
      title: 'title BBB',
    },
    redirectUrl: 'https://www.google.com',
    storeId: '1981039839353524638',
    type: 'DYNAMIC',
  })
  const resp2 = await SDK.getTransactionUrlByCode(resp0.accessToken, resp1.item.code)
  console.log(resp2)
  const resp3 = await SDK.getTransactionsByCode(resp0.accessToken, resp1.item.code)
  console.log(resp3)
})();
