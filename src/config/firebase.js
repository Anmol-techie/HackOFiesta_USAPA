import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB9UC23dhcbUscWJ4hqohzzqKuXx0FHFL8",
  authDomain: "stock-it-536a3.firebaseapp.com",
  projectId: "stock-it-536a3",
  storageBucket: "stock-it-536a3.appspot.com",
  messagingSenderId: "100466556239",
  appId: "1:100466556239:web:781d5e8da8a26df1a7993a",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
