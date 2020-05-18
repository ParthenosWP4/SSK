import { KeycloakService } from 'keycloak-angular';

import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
//return (): Promise<any> => keycloak.init();
 return () => keycloak.init({
          config: environment.keycloakConfig,
          initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: ['#/', '/#/scenarios/*', '/#/steps']
        }).catch((e) => {
          console.log('Error thrown in init ' + e);
       });
}

