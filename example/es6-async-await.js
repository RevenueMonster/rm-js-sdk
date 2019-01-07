const RMSDK = require('../dist')

async function main() {
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
}

main()
