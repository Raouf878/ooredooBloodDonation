// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, collection} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0mcVkHneaaiXxeFcdMVGwV3YDNXZAXhU",
  authDomain: "blooddonation-9f61e.firebaseapp.com",
  projectId: "blooddonation-9f61e",
  storageBucket: "blooddonation-9f61e.appspot.com",
  messagingSenderId: "390329668506",
  appId: "1:390329668506:web:d562756730a10aa638e023",
  measurementId: "G-D3B7SDEB44"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
