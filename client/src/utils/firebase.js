// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: "t-manager-6ac23.firebaseapp.com",
    projectId: "t-manager-6ac23",
    storageBucket: "t-manager-6ac23.appspot.com",
    messagingSenderId: "101596523356",
    appId: "1:101596523356:web:bbb1368dd4df57489a2f99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);