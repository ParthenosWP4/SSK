// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { KeycloakConfig } from 'keycloak-angular';
const keycloakConfig: KeycloakConfig = {
  //url: 'http://localhost:8080/auth',
  url: 'https://ssh-cref.huma-num.fr/auth/',
  realm: 'SSK',
  clientId: 'ssk-client'
};

export const environment = {
  production: false,
  //sskBackendEndpoint : 'http://localhost:9080/',
  sskBackendEndpoint : 'http://ssk.huma-num.fr/ssk_services-0.0.1/',
  zoteroAPIUrl: 'https://api.zotero.org/groups/427927/items/',
  forImage: '',
  keycloakConfig
};
