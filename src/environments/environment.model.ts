import { GrantType } from "src/app/commons/constants/grant-type";

interface Api<T> {
    baseUrl: string;
    path: T;
    cliente_id: string;
    client_secret: string;
    grant_type: GrantType;
}

interface OnpremiseEndPoint {
    revokeToken: string;
    authUserConfig: string;
    sellerServices: string;
    stationRecoveryBatch: string;
    toAfiliateStation: string;
    getStationsAfiliate: string;
    unsetAfiliatedStation: string;
}

interface OnpremiseApi{
    authToken: string;
    V1: OnpremiseEndPoint
}

export interface Environment {
    env: 'local' | 'dev' | 'prod' | 'cert',
    onpremise: Api<OnpremiseApi>
}
