import firebase from "@firebase/app";
// Required for side-effects
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCND6L-vr3nhaypxibBoSViJpo-CFySTlo",
  authDomain: "covac-notify.firebaseapp.com",
  projectId: "covac-notify",
  storageBucket: "covac-notify.appspot.com",
  messagingSenderId: "486679701569",
  appId: "1:486679701569:web:2f1972053ff89f46843ec0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
