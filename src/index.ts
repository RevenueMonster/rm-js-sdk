import axios, { AxiosInstance } from 'axios';
import { merge } from 'lodash'

import { getClientCredentials, refreshToken } from "./credentials";

interface config {
  timeout?: number
  isProduction?: boolean
  clientId: string
  clientSecret: string
}

export interface RMSDKInstance {
  timeout: number,
  isProduction: boolean,
  clientId: string,
  clientSecret: string,

  oauthInstance: AxiosInstance,
  openApiInstance: AxiosInstance,

  getClientCredentials: () => Promise<any> | null,
  refreshToken: (refreshToken: string) => Promise<any>,
}

export function RMSDK(instanceConfig?: config): RMSDKInstance {
  const defaults = {
    timeout: 2000,
    isProduction: false,
    clientId: '',
    clientSecret: '',
  }
  const config = merge(defaults, instanceConfig)
  
  const oauthUrl = config.isProduction
    ? 'https://oauth.revenuemonster.my/v1'
    : 'https://sb-oauth.revenuemonster.my/v1'
  
  const openApiUrl = config.isProduction
    ? 'https://open.revenuemonster.my/v1'
    : 'https://sb-open.revenuemonster.my/v1'

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
    
    oauthInstance,
    openApiInstance,

    getClientCredentials,
    refreshToken,
  }
}

//////////

const SDK = RMSDK({
  clientId: '5499912462549392881',
  clientSecret: 'pwMapjZzHljBALIGHxfGGXmiGLxjWbkT'
});

(async () => {
  const a = await SDK.getClientCredentials();
  // console.log(a);
  const b = await SDK.refreshToken(a.refreshToken)
  console.log(b)
})();
