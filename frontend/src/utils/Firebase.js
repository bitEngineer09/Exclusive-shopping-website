import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "loginexclusive-65982.firebaseapp.com",
    projectId: "loginexclusive-65982",
    storageBucket: "loginexclusive-65982.firebasestorage.app",
    messagingSenderId: "3602768606",
    appId: "1:3602768606:web:9a85e292849294a2f1184f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

