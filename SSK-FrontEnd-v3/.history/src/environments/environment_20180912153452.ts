// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  sskBackendEndpoint : 'http://localhost:9080/',
  standardEndpoint : 'it.dariah.eu:8983/solr/WP4/select?indent=on&q=*:*&rows=100&wt=json'
};
