// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const serverUrl = 'https://gurm-app-dev-server.azurewebsites.net';

export const environment = {
  appName: 'DentaBase',
  envName: 'DEV',
  production: false,
  test: false,
  serverUrl,
  apiUrl: serverUrl + '/api',
  oAuthConfig: {
    id: 'dentaBase_front',
    secret: 'front#2018',
  },
  oAuthUrl: serverUrl + '/oauth',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
