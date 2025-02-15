import Constants from "expo-constants";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, connectAuthEmulator, Auth } from "firebase/auth";

let firebaseConfig: any;
const isProd: boolean = Constants.expoConfig?.extra?.isProd;

if (isProd) {
    firebaseConfig = {
        apiKey: Constants.expoConfig?.extra?.apiKey,
        authDomain: Constants.expoConfig?.extra?.authDomain,
        projectId: Constants.expoConfig?.extra?.projectId,
        storageBucket: Constants.expoConfig?.extra?.storageBucket,
        messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
        appId: Constants.expoConfig?.extra?.appId,
        measurementId: Constants.expoConfig?.extra?.measurementId
    };
} else {
    firebaseConfig = {
        apiKey: "test-api-key",
        authDomain: "localhost",
        projectId: Constants.expoConfig?.extra?.projectId
    };
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

if (!isProd) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
// const analytics = getAnalytics(app);

const URL: string = isProd ? "" : "http://127.0.0.1:5001/dinner-ready-d541f/us-central1/";

export { auth, URL };