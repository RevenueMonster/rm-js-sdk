import fs = require('fs')
import axios, { AxiosInstance } from 'axios'
import { merge } from 'lodash'

import { getClientCredentials, refreshToken } from './credentials'
import { 
  createTransactionUrl,
  quickPayCreate,
  quickPayRefund,
  quickPayReverse,
  quickPayGetPaymentTransactions,
  quickPayGetPaymentTransactionByID,
  quickPayGetPaymentTransactionByOrderID,
  quickPayGetDailySettlementReport
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

  getClientCredentials: () => Promise<any> | null,
  refreshToken: (refreshToken: string) => Promise<any>,
  createTransactionUrl: (acessToken: string, data: object) => Promise<any>,


  quickPayCreate: (acessToken: string, data: object) => Promise<any>,
  quickPayRefund: (acessToken: string, data: object) => Promise<any>,
  quickPayReverse: (acessToken: string, data: object) => Promise<any>,
  quickPayGetPaymentTransactions: (acessToken: string) => Promise<any>,
  quickPayGetPaymentTransactionByID: (acessToken: string, Id: string) => Promise<any>,
  quickPayGetPaymentTransactionByOrderID:(acessToken: string, orderId: string) => Promise<any>,
  quickPayGetDailySettlementReport:(acessToken: string, data: object) => Promise<any>,
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
    headers: { 'User-Agent': 'RM API Client Nodejs', 'Content-Type': 'application/json' }
  })

  const openApiInstance = axios.create({
    baseURL: openApiUrl,
    timeout: config.timeout,
    headers: { 'User-Agent': 'RM API Client Nodejs', 'Content-Type': 'application/json' }
  })

  openApiInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

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

    quickPayCreate,
    quickPayRefund,
    quickPayReverse,
    quickPayGetPaymentTransactions,
    quickPayGetPaymentTransactionByID,
    quickPayGetPaymentTransactionByOrderID,
    quickPayGetDailySettlementReport
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
  console.log(a);
  // // const b = await SDK.refreshToken(a.refreshToken)
  // // console.log(b)

  // const data = {
  //   amount: 100,
  //   currencyType: 'MYR',
  //   expiry: { type: 'PERMANENT' },
  //   isPreFillAmount: true,
  //   method: ['WECHATPAY'],
  //   order: {
  //     details: 'detail AAA',
  //     title: 'title BBB',
  //   },
  //   redirectUrl: 'https://www.google.com',
  //   storeId: '1981039839353524638',
  //   type: 'DYNAMIC',
  // }

  // const data = {b: true, a: 1}
  // console.log(JSON.stringify(sortedObject(data)))
  // console.log(generateSignature({
  //   data,
  //   requestUrl: 'https://sb-open.revenuemonster.my/v3/payment/transaction/qrcode',
  //   signType: 'sha256',
  //   nonceStr: '123',
  //   method: 'get',
  //   timestamp: '123'
  // }, privateKey))
  // console.log(JSON.stringify(sortedObject(data)))
  // const resp = await SDK.createTransactionUrl(a.accessToken, data)
  // console.log(resp)




  ////// ----------------------quickPay QR (create)----------------------//////

  // const quickPayQrCreateData = {
  // authCode:"161746337888726240",
  // order:{ 
  //   amount:100,
  //   currencyType: "MYR",
  //   id: "12344333233452",
  //   title:"title",
  //   detail:"desc",
  //   additonalData:"API Test"
  // },
  //   ipAddress:"175.143.101.229",
  //   storeId:"1331862367915081341"
  // }
  // // 190107081314010421633199

  // const resp = await SDK.quickPayCreate(a.accessToken, quickPayQrCreateData)
  // console.log(resp)




  ////// ----------------------quickPay QR (refund)----------------------//////

  // const quickPayQrRefundData = {
  //   transactionId: "190107081314010421633199",
  //   refund: {
  //     type: "FULL",
  //     currencyType: "MYR",
  //     amount: 100
  //   },
  //   reason: "test"
  // }
  // const resp = await SDK.quickPayRefund(a.accessToken, quickPayQrRefundData)
  // console.log(resp)




  ////// ----------------------quickPay QR (reverse)----------------------//////

  // const quickPayQrReverseData = {
  //   orderId: "12344333233452"
  // }
  // const resp = await SDK.quickPayReverse(a.accessToken, quickPayQrReverseData)
  // console.log(resp)




  ////// ----------------------quickPay QR (get payment trasnactions)----------------------//////

  // const resp1 = await SDK.quickPayGetPaymentTransactions(a.accessToken)
  // console.log(resp1)





  ////// ----------------------quickPay QR (get payment trasnaction by ID)----------------------//////

  // const resp2 = await SDK.quickPayGetPaymentTransactionByID(a.accessToken,'190103084646010324970256' )
  // console.log(resp2)





  ////// ----------------------quickPay QR (get payment trasnaction by OrderID)----------------------//////

  // const resp2 = await SDK.quickPayGetPaymentTransactionByOrderID(a.accessToken,'12344333233452' )
  // console.log(resp2)


  ////// ----------------------quickPay QR (get daily settlement report)----------------------//////

  // const quickPayQrDailySettlementReport = {
  //   date: "2019-01-06",
  //   method: "WECHATPAY",
  //   region: "MALAYSIA",
  //   sequence: 1
  // }
  // const resp = await SDK.quickPayGetDailySettlementReport(a.accessToken, quickPayQrDailySettlementReport)
  // console.log(resp)
})();
