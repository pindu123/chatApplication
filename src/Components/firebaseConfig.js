// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics} from "firebase/analytics";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSxUP23QjsBvh8LnIGdJ1wnvHU_rAAxow",
  authDomain: "sample-92b1f.firebaseapp.com",
  projectId: "sample-92b1f",
  storageBucket: "sample-92b1f.appspot.com",
  messagingSenderId: "222925786963",
  appId: "1:222925786963:web:cf28c140dc0201cf189ba6",
  measurementId: "G-Z57BQ2Z06L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);