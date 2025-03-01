import 'dotenv/config'

const isProd = false;

export default {
    expo: {
        name: "DinnerReady",
        slug: "dinnerready",
        assetBundlePatterns: ["**/*"],
        scheme: "myapp",
        owner: "conmanrocks7",
        extra: {
            firebase: {
                isProd: isProd,
                apiKey: isProd ? process.env.FIREBASE_API_KEY : "",
                authDomain: isProd ? process.env.FIREBASE_AUTH_DOMAIN : "localhost",
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: isProd ? process.env.FIREBASE_STORAGE_BUCKET : "",
                messagingSenderId: isProd ? process.env.FIREBASE_MESSAGING_SENDER_ID : "",
                appId: isProd ? process.env.FIREBASE_APP_ID : "",
                measurementId: isProd ? process.env.FIREBASE_MEASUREMENT_ID : "",
            },
            "eas": {
                "projectId": process.env.EXPO_PROJECT_ID
            }
        },
        "ios": {
            "supportsTablet": true,
            "usesAppleSignIn": true,
            "googleServicesFile": "./GoogleService-Info.plist",
            "bundleIdentifier": "com.connormck.dinnerready"
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "googleServicesFile": "./google-services.json"
        },
    }
}