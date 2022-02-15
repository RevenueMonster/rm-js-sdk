import axios, { AxiosInstance } from 'axios'
import { merge } from 'lodash'

import { getClientCredentials, refreshToken } from './credentials'
import {
  initQuickPay,
  refund,
  reverse,
  getPaymentTransactions,
  getPaymentTransactionById,
  getPaymentTransactionByOrderId,
  getDailySettlementReport,
} from './payment/quickPay'
import {
  createTransactionUrl,
  getTransactionUrl,
  getTransactionUrlByCode,
  getTransactionsByCode,
} from './payment/transactionQR'
import {
  createWebPayment,
} from './payment/webPayment'
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
import { 
  issueVoucher,
  voidVoucher,
  getVoucherByCode,
  getVoucherBatches,
  getVoucherBatchByKey,
 } from './voucher';
import {
  getWechatOauthUrl,
  getWechatUserByCode,
} from './wechat'

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

  oauthApiVersion: string,
  oauthUrl: string,
  openApiVersion: string,
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

  giveLoyaltyPoint: (accessToken: string, data: ILoyaltyRewardArg) => Promise<any>,

  issueVoucher: (accessToken: string, batchKey: string) => Promise<any>,
  voidVoucher: (accessToken: string, code: string) => Promise<any>,
  getVoucherByCode: (accessToken: string, code: string) => Promise<any>,
  getVoucherBatches: (accessToken: string) => Promise<any>,
  getVoucherBatchByKey: (accessToken: string, batchKey: string) => Promise<any>,

  getWechatOauthUrl: (accessToken: string, redirectUrl: string) => Promise<any>,
  getWechatUserByCode: (accessToken: string, code: string) => Promise<any>,

  Payment: {
    timeout: number,
    isProduction: boolean,
    clientId: string,
    clientSecret: string,
    privateKey: string,
  
    oauthApiVersion: string,
    oauthUrl: string,
    openApiVersion: string,
    openApiUrl: string,
  
    oauthInstance: AxiosInstance,
    openApiInstance: AxiosInstance,

    initQuickPay: (acessToken: string, data: object) => Promise<any>,
    refund: (acessToken: string, data: object) => Promise<any>,
    reverse: (acessToken: string, data: object) => Promise<any>,
    getPaymentTransactions: (acessToken: string) => Promise<any>,
    getPaymentTransactionById: (acessToken: string, Id: string) => Promise<any>,
    getPaymentTransactionByOrderId:(acessToken: string, orderId: string) => Promise<any>,
    getDailySettlementReport:(acessToken: string, data: object) => Promise<any>, 

    createTransactionUrl: (acessToken: string, data: object) => Promise<any>,
    getTransactionUrl: (accessToken: string) => Promise<any>,
    getTransactionUrlByCode: (accessToken: string, code: string) => Promise<any>,
    getTransactionsByCode: (accessToken: string, code: string) => Promise<any>,

    createWebPayment: (acessToken: string, data: object) => Promise<any>,
  }
}

export function RMSDK(instanceConfig?: config): RMSDKInstance {
  const defaults = {
    timeout: 2000,
    isProduction: false,
    clientId: '',
    clientSecret: '',
    privateKey: '',
    oauthApiVersion: 'v1',
    openApiVersion: 'v3',
  }
  const config = merge(defaults, instanceConfig)

  const oauthUrl = config.isProduction
    ? 'https://oauth.revenuemonster.my/' + config.oauthApiVersion
    : 'https://sb-oauth.revenuemonster.my/' + config.oauthApiVersion
  
  const openApiUrl = config.isProduction
    ? 'https://open.revenuemonster.my/' + config.openApiVersion
    : 'https://sb-open.revenuemonster.my/' + config.openApiVersion 

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

    oauthApiVersion: config.oauthApiVersion,
    oauthUrl,
    openApiVersion: config.openApiVersion,
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
    
    Payment: {
      timeout: config.timeout,
      isProduction: config.isProduction,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      privateKey: config.privateKey,
  
      oauthApiVersion: config.oauthApiVersion,
      oauthUrl,
      openApiVersion: config.openApiVersion,
      openApiUrl,
  
      oauthInstance,
      openApiInstance,

      initQuickPay,
      refund,
      reverse,
      getPaymentTransactions,
      getPaymentTransactionById,
      getPaymentTransactionByOrderId,
      getDailySettlementReport,

      createTransactionUrl,
      getTransactionUrl,
      getTransactionUrlByCode,
      getTransactionsByCode,

      createWebPayment,
    },

    giveLoyaltyPoint,

    issueVoucher,
    voidVoucher,
    getVoucherByCode,
    getVoucherBatches,
    getVoucherBatchByKey,
    getWechatOauthUrl,
    getWechatUserByCode,
  }
}

export default RMSDK
