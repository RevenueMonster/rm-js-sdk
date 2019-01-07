import axios, { AxiosInstance } from 'axios'
import { merge } from 'lodash'

import { getClientCredentials, refreshToken } from './credentials'
import {
  createTransactionUrl,
  getTransactionUrl,
  getTransactionUrlByCode,
  getTransactionsByCode
} from './payment'
import { getMerchantProfile, getMerchantSubscriptions } from './merchant'
import { getUserProfile } from './user'
import {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
} from './store';
import { giveLoyaltyPoint, ILoyaltyRewardArg } from './loyalty';

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

  getMerchantProfile: (accessToken: string) => Promise<any>,
  getMerchantSubscriptions: (accessToken: string) => Promise<any>,

  getStores: (accessToken: string) => Promise<any>,
  getStoreById: (accessToken: string, storeId: string) => Promise<any>,
  createStore: (accessToken: string, data: object) => Promise<any>,
  updateStore: (accessToken: string, storeId: string, data: object) => Promise<any>,
  deleteStore: (accessToken: string, storeId: string) => Promise<any>,

  getUserProfile: (accessToken: string) => Promise<any>,

  createTransactionUrl: (acessToken: string, data: object) => Promise<any>,
  getTransactionUrl: (accessToken: string) => Promise<any>,
  getTransactionUrlByCode: (accessToken: string, code: string) => Promise<any>,
  getTransactionsByCode: (accessToken: string, code: string) => Promise<any>,

  giveLoyaltyPoint: (accessToken: string, data: ILoyaltyRewardArg) => Promise<any>,
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
    
    getMerchantProfile,
    getMerchantSubscriptions,
    
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore,

    getUserProfile,
    
    createTransactionUrl,
    getTransactionUrl,
    getTransactionUrlByCode,
    getTransactionsByCode,

    giveLoyaltyPoint
  }
}

export default RMSDK