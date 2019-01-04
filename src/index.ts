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

type RMArguments = {
    env: string | null
    timeout: number | null
    clientId: string | null
    clientSecret: string | null
}

export class RMSDK {
    public env: string
    public timeout: number
    public clientId: string
    public clientSecret: string

    constructor(arg?: RMArguments) {
        this.env = arg!.env || 'sandbox'
        this.timeout = arg!.timeout || 2000
        this.clientId = arg!.clientId || ''
        this.clientSecret = arg!.clientSecret || ''
    }
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

const SDK = new RMSDK()
SDK.clientId = '2948617732362532265'
SDK.clientSecret = 'tuWQGvIeqQbJdwxVcLREkYOLBLemzVJJ'

const APIClient = init()
APIClient.clientId = '2948617732362532265'
APIClient.clientSecret = 'tuWQGvIeqQbJdwxVcLREkYOLBLemzVJJ'

;(async () => {
    const a = await APIClient.getClientCredentials()
    const b = await APIClient.refreshToken(a.refreshToken)
    console.log(b)
})()
