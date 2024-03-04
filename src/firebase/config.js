import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "textcraft-sudoarun.firebaseapp.com",
  databaseURL: "https://textcraft-sudoarun-default-rtdb.firebaseio.com",
  projectId: "textcraft-sudoarun",
  storageBucket: "textcraft-sudoarun.appspot.com",
  messagingSenderId: "897178499192",
  appId: "1:897178499192:web:f65fac885c2b4bf881558d",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
