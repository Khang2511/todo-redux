import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA9hckL93q84OvvLcC3iCOE1VAIf0LDhro",
  authDomain: "todok4n9.firebaseapp.com",
  projectId: "todok4n9",
  storageBucket: "todok4n9.appspot.com",
  messagingSenderId: "628849140653",
  appId: "1:628849140653:web:1b70669ad8c4610dbbb724",
  measurementId: "G-PRY21ZJQM0"
};


firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const index = firebase.firestore.FieldValue.increment;
export { projectFirestore, timeStamp,index};