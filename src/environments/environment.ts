// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyBcDFmnE_2GGgrJwFCRI_Sz5x_7ktjOp9k",
        authDomain: "pard-app.firebaseapp.com",
        databaseURL: "https://pard-app.firebaseio.com",
        projectId: "pard-app",
        storageBucket: "pard-app.appspot.com",
        messagingSenderId: "146692342733",
        appId: "1:146692342733:web:d7a63aaa55b1878a80fa84",
        measurementId: "G-BC24S4YV91"
    },
    algoliaConfig: {
        appId: "8A6TCGT3CX",
        apiKey: "4ee9375d899179a0701130c2df2c1f76"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
