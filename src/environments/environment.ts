// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAf0zZLbXlI8mAcpNosj1omzk-wZttdl_M",
    authDomain: "shoala.firebaseapp.com",
    databaseURL: "https://shoala.firebaseio.com",
    projectId: "shoala",
    storageBucket: "shoala.appspot.com",
    messagingSenderId: "245312403399",
    appId: "1:245312403399:web:c8ad4176085f3b23860be2",
  },
  base_url:"http://127.0.0.1:3000/api",
  // base_url:"https://jaz-44101f5ac6ba.herokuapp.com/api",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
