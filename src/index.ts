import { getClientCredentials, refreshToken } from "./credentials";

export type RMOpenAPIClient = {
    env: string,
    version: string,
    timeout: number,
    clientId: string,
    clientSecret: string,
    getClientCredentials: any,
    refreshToken: any,
}

/**
 * Create a API instance to interact with RevenueMonster Open API
 */
export function init(): RMOpenAPIClient {
    return {
        env: 'sandbox',
        version: 'v1',
        timeout: 2000,
        clientId: '',
        clientSecret: '',

        // credentials related
        getClientCredentials,
        refreshToken,
    }
}

const APIClient = init()
APIClient.clientId = '2948617732362532265'
APIClient.clientSecret = 'tuWQGvIeqQbJdwxVcLREkYOLBLemzVJJ'

;(async () => {
    const a = await APIClient.getClientCredentials()
    const b = await APIClient.refreshToken(a.refreshToken)
    console.log(b)
})()
