// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mernviteblog.firebaseapp.com',
  projectId: 'mernviteblog',
  storageBucket: 'mernviteblog.appspot.com',
  messagingSenderId: '85054818339',
  appId:
    '1:85054818339:web:6c01383e13c4881a678996',
  measurementId: 'G-R5WQ97LH10',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
