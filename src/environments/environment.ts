import { Environment } from "./environment.model";

export const environment: Environment = {
    env: 'local',
    onpremise: {
      baseUrl: 'http://127.0.0.1:8000',
      client_secret: '8JSmdKVO5iM15rbOxPLejihiLNAyzrvU6XuBBLWQ',
      cliente_id: '99ca8602-0115-4b83-896e-893f0520e555',
      grant_type: 'password',
      path: {
        authToken: 'oauth/token',
        V1: {
          authUserConfig: 'api/v1/user/config',
          revokeToken: 'api/v1/access/token',
          sellerServices: 'api/v1/seller-services',
          stationRecoveryBatch: 'api/v1/station/recovery-batch',
          toAfiliateStation: 'api/v1/station/afiliar',
          getStationsAfiliate: 'api/v1/station/afiliados',
          unsetAfiliatedStation: 'api/v1/station/unset'
        }
      }
    }
};
