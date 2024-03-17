import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC4GcOOscdX_cPf9hC1BhYNh8nPH8LPyO4",
  authDomain: "we-chat-98f75.firebaseapp.com",
  projectId: "we-chat-98f75",
  storageBucket: "we-chat-98f75.appspot.com",
  messagingSenderId: "826815902818",
  appId: "1:826815902818:web:19b0f2e51a7e46da9e8d3b"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);