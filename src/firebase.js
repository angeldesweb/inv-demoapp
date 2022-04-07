// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getAuth } from 'firebase/auth';
import { getFirestore , initializeFirestore , CACHE_SIZE_UNLIMITED , enableIndexedDbPersistence} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe98VLvwTi8VDMxHiczsVEoPSz7GOMeCg",
  authDomain: "metalrecuperadora.firebaseapp.com",
  projectId: "metalrecuperadora",
  storageBucket: "metalrecuperadora.appspot.com",
  messagingSenderId: "212364472069",
  appId: "1:212364472069:web:933b5ca45ee5c81fa6116c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = initializeFirestore(app,{
  cacheSizeBytes:CACHE_SIZE_UNLIMITED
});
enableIndexedDbPersistence(db).catch(err => {
  if(err.code === 'failed.precondition') alert('failed-precondition');
  if(err.code === 'unimplemented') alert('No implementado');
  alert(err)
})