import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyDbS0yH5CfFPlbBEHEJm_I_uA3BjzOv4ms",
  // authDomain: "gloader-349706.firebaseapp.com",
  // projectId: "gloader-349706",
  // storageBucket: "gloader-349706.appspot.com",
  // messagingSenderId: "346457672075",
  // appId: "1:346457672075:web:1409c5c7616ed50573878e",
  // measurementId: "G-YJ0W5EV3VR",
  apiKey: "AIzaSyASEnhwH3Iqkq1xUyE8A2xiW2ZIcZ8ajY0",
  authDomain: "matrix-audit.firebaseapp.com",
  projectId: "matrix-audit",
  storageBucket: "matrix-audit.appspot.com",
  messagingSenderId: "357179339774",
  appId: "1:357179339774:web:6115e8f8f6c6cb861f86af",
  measurementId: "G-PBN721C6SZ",
};

const fireApp = initializeApp(firebaseConfig);
export const storage = getStorage(fireApp);
export const firedb = getFirestore(fireApp);
