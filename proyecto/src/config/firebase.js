// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi2HFglxoA0uSD97U36vwRbxk3O_guc1s",
  authDomain: "backend-coderhouse-967c1.firebaseapp.com",
  projectId: "backend-coderhouse-967c1",
  storageBucket: "backend-coderhouse-967c1.appspot.com",
  messagingSenderId: "1066998217174",
  appId: "1:1066998217174:web:35170b5f5f253e481d8c77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

export default database