import Constants from "expo-constants";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, connectAuthEmulator, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage, connectStorageEmulator } from "firebase/storage";

let firebaseConfig: any;
const isProd: boolean = Constants.expoConfig?.extra?.firebase.isProd;

if (isProd) {
    firebaseConfig = {
        apiKey: Constants.expoConfig?.extra?.firebase.apiKey,
        authDomain: Constants.expoConfig?.extra?.firebase.authDomain,
        projectId: Constants.expoConfig?.extra?.firebase.projectId,
        storageBucket: Constants.expoConfig?.extra?.firebase.storageBucket,
        messagingSenderId: Constants.expoConfig?.extra?.firebase.messagingSenderId,
        appId: Constants.expoConfig?.extra?.firebase.appId,
        measurementId: Constants.expoConfig?.extra?.firebase.measurementId
    };
} else {
    firebaseConfig = {
        apiKey: "test-api-key",
        authDomain: "localhost",
        projectId: Constants.expoConfig?.extra?.firebase.projectId,
        storageBucket: Constants.expoConfig?.extra?.firebase.projectId + ".firebasestorage.app"
    };
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage: FirebaseStorage = getStorage(app);
// const messaging: Messaging = getMessaging(app);

if (!isProd) {
    connectAuthEmulator(auth, "http://192.168.0.44:9099");
    connectStorageEmulator(storage, "192.168.0.44", 9199);
}
// const analytics = getAnalytics(app);

const URL: string = isProd ? "" : "http://192.168.0.44:5001/dinner-ready-d541f/us-central1/";

export { auth, storage, URL };