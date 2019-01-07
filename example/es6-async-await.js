const fs = require('fs')

const { RMSDK } = require('../dist')
// or `const RMSDK = require('../dist').RMSDK`

async function main() {
    const privateKey = Buffer.from(fs.readFileSync('src/private.pem')).toString()
  
    const SDK = RMSDK({
      clientId: '5499912462549392881',
      clientSecret: 'pwMapjZzHljBALIGHxfGGXmiGLxjWbkT',
      privateKey,
    });
  
    const resp0 = await SDK.getClientCredentials()
    const resp1 = await SDK.getMerchantProfile(resp0.accessToken)
    console.log(resp1)
    const resp2 = await SDK.getMerchantSubscriptions(resp0.accessToken)
    console.log(resp2)

    const resp3 = await SDK.createTransactionUrl(resp0.accessToken, {
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
    const resp4 = await SDK.getTransactionUrlByCode(resp0.accessToken, resp3.item.code)
    console.log(resp4)
    const resp5 = await SDK.getTransactionsByCode(resp0.accessToken, resp3.item.code)
    console.log(resp5)
}

main()
