import axios, { AxiosInstance, AxiosResponse, AxiosAdapter } from 'axios'

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
  createOnlinePay,
} from './payment/onlinePay'
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

export namespace RM {
  export enum TransactionType {
    WEB_PAYMENT = 'WEB_PAYMENT',
    MOBILE_PAYMENT = 'MOBILE_PAYMENT'
  }

  export enum Method {
    WECHATPAY = 'WECHATPAY',
    PRESTO = 'PRESTO',
    ALIPAY = 'ALIPAY',
    TNG = 'TNG',
    VCASH = 'VCASH',
    BOOST = 'BOOST',
    MAYBANK = 'MAYBANK',
    GRABPAY = 'GRABPAY',
    RAZERPAY = 'RAZERPAY',
    SHOPEEPAY = 'SHOPEEPAY',
    GOBIZ = 'GOBIZ',
    ZAPP = 'ZAPP',
    TAPAY = 'TAPAY',
    MCASH = 'MCASH',
    SARAWAKPAY = 'SARAWAKPAY',
    MASTERCARD = 'MASTERCARD',
    FPX = 'FPX'
  }

  export enum MobilePaymentMethod {
    WECHATPAY_MY = 'WECHATPAY_MY',
    BOOST_MY = 'BOOST_MY',
    TNG_MY = 'TNG_MY',
    ALIPAY_CN = 'ALIPAY_CN',
    GRABPAY_MY = 'GRABPAY_MY',
  }
  
  export enum WebPaymentMethod {
    WECHATPAY_MY = 'WECHATPAY_MY',
    WECHATPAY_CN = 'WECHATPAY_CN',
    PRESTO_MY = 'PRESTO_MY',
    BOOST_MY = 'BOOST_MY',
    TNG_MY = 'TNG_MY',
    ALIPAY_CN = 'ALIPAY_CN',
    GRABPAY_MY = 'GRABPAY_MY',
    RAZER_MY = 'RAZER_MY',
    GOBIZ_MY = 'GOBIZ_MY',
    MAYBANK_MY = 'MAYBANK_MY',
    FPX_MY = 'FPX_MY'
  }

  export interface CreateOnlinePayPayload {
    order: Order;
    method: string[];
    type: TransactionType;
    storeId: string;
    redirectUrl: string;
    notifyUrl: string;
    layoutVersion: LayoutVersion
  }
  
  export enum LayoutVersion {
    v1 = 'v1',
    v2 = 'v2',
  }
  
  export enum CurrencyType {
    MYR = 'MYR'
  }

  export interface Config {
    timeout?: number
    isProduction?: boolean
    clientId: string
    clientSecret: string
    privateKey: string
    adapter?: AxiosAdapter
  }
  
  export interface Response<T = any> {
    item: T;
    code: string;
    error?: Error;
  }

  export interface WebhookResponse {
    eventType: "PAYMENT_WEB_ONLINE"
  }

  export interface WebPaymentWebhook extends WebhookResponse {
    eventType: "PAYMENT_WEB_ONLINE"
    data: PaymentTransactionItem
  }

  export interface Error {
    code: string;
    message: string;
  }

  export class RMError extends Error implements RM.Error {
    code: string;
    raw: any;
    constructor(message: string , code: string, raw?: any) {
      super(message);
      this.code = code;
      this.raw = raw;
    }
  }

  export interface QuickPayPayload {
    authCode: string;
    order: Order;
    ipAddress: string;
    terminalId?: string;
    storeId: string;
  }

  export interface Order {
    id: string;
    title: string;
    detail: string;
    amount: number;
    additionalData: string;
    currencyType: CurrencyType;
  }

  export interface OnlinePaymentItem {
    checkoutId: string;
    url: string;
  }

  export interface WebPaymentItem {
    item: OnlinePaymentItem;
    code: string;
  }

  export enum PaymentTransactionItemStatus {
    IN_PROCESS = 'IN_PROCESS',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    FULL_REFUNDED = 'FULL_REFUNDED'
  }

  export interface PaymentTransactionItem {
    store: Store;
    referenceId: string;
    transactionId: string;
    order: Order;
    region: 'MALAYSIA' | 'CHINA';
    payee: {
      userId: string;
    };
    currencyType: CurrencyType;
    platform: string;
    method: RM.Method;
    type: string;
    status: PaymentTransactionItemStatus;
    error: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Store {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    phoneNumber: string;
    geoLocation: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface RefundPayload {
    transactionId: string;
    refund: Refund;
    reason: string;
  }

  export interface Refund {
    amount: number,
    currencyType: CurrencyType,
    type: 'FULL' | 'PARTIAL',
  }
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

    initQuickPay: (acessToken: string, data: RM.QuickPayPayload) => Promise<RM.Response<RM.PaymentTransactionItem>>,
    refund: (acessToken: string, data: RM.RefundPayload) => Promise<RM.Response<RM.PaymentTransactionItem>>,
    reverse: (acessToken: string, data: object) => Promise<RM.Response<RM.PaymentTransactionItem>>,
    getPaymentTransactions: (acessToken: string) => Promise<any>,
    getPaymentTransactionById: (acessToken: string, Id: string) => Promise<RM.Response<RM.PaymentTransactionItem>>,
    getPaymentTransactionByOrderId:(acessToken: string, orderId: string) => Promise<RM.Response<RM.PaymentTransactionItem>>,
    getDailySettlementReport:(acessToken: string, data: object) => Promise<any>, 

    createTransactionUrl: (acessToken: string, data: object) => Promise<any>,
    getTransactionUrl: (accessToken: string) => Promise<any>,
    getTransactionUrlByCode: (accessToken: string, code: string) => Promise<any>,
    getTransactionsByCode: (accessToken: string, code: string) => Promise<any>,

    createOnlinePay: (accessToken: string, data: RM.CreateOnlinePayPayload) => Promise<RM.Response<RM.OnlinePaymentItem>>
  }
}

function axiosFactory(url: string, timeout: number, adapter?: AxiosAdapter): AxiosInstance {
  const client = axios.create({
    baseURL: url,
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json'
    },
    adapter
  });
  client.interceptors.response.use(
    (response: AxiosResponse<RM.Response>): any => {
      const body = response.data;
      if(body) {
        if (body.error) {
          return Promise.reject(new RM.RMError(body.error.message, body.error.code, response));
        }

        const item = body.item;
        if(item && typeof item === 'object') {
          let status = 'UNKNOWN_STATUS';
          let message = 'UNKNOWN_ERROR';
          if(typeof item.status === 'string') {
            status = item.status.toLowerCase();
          }
          if(typeof item.error === 'object' && typeof item.error.message === 'string') {
            message = item.error.message;
          } else if(typeof item.error === 'string') {
            message = item.error;
          }
          if(status === 'failed') {
            return Promise.reject(new RM.RMError(message, status, response));
          }
        }
      } else {
        return Promise.reject(new RM.RMError('unhandled revenue monster error', 'UNKNOWN_ERROR', response));
      }
      if (response && response.data && response.data.error) {
        return Promise.reject(new RM.RMError(response.data.error.message, response.data.error.code, response));
      }
      return response;
    },
    (error): Promise<any> => {
      if(error.response) {
        const body = error.response.data;
        if (body && body.error) {
          return Promise.reject(new RM.RMError(body.error.message, body.error.code, error));
        }
        return Promise.reject(new RM.RMError('unhandled revenue monster error', 'UNKNOWN_ERROR', error));
      }
      return Promise.reject(new RM.RMError(error.message, 'NETWORK_ERROR', error));
    },
  );
  return client;
}

export function RMSDK(instanceConfig?: RM.Config): RMSDKInstance {
  const defaults = {
    timeout: 2000,
    isProduction: false,
    clientId: '',
    clientSecret: '',
    privateKey: '',
    oauthApiVersion: 'v1',
    openApiVersion: 'v3',
  }
  const config = {
    ...defaults,
    ...instanceConfig
  }

  const oauthUrl = config.isProduction
    ? 'https://oauth.revenuemonster.my/' + config.oauthApiVersion
    : 'https://sb-oauth.revenuemonster.my/' + config.oauthApiVersion
  
  const openApiUrl = config.isProduction
    ? 'https://open.revenuemonster.my/' + config.openApiVersion
    : 'https://sb-open.revenuemonster.my/' + config.openApiVersion 

  const adapter = instanceConfig ? instanceConfig.adapter : undefined

  const oauthInstance = axiosFactory(oauthUrl, config.timeout, adapter);

  const openApiInstance = axiosFactory(openApiUrl, config.timeout, adapter);

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

      createOnlinePay
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
