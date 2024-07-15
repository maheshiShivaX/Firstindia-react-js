import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs5ConzFDM2yGvweN-sZdAPFAlowyCDhE",
  authDomain: "reactmoviepp.firebaseapp.com",
  projectId: "reactmoviepp",
  storageBucket: "reactmoviepp.appspot.com",
  messagingSenderId: "719848561957",
  appId: "1:719848561957:web:254facecfb591921474ecc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

// https://ishivaxservices.com/admin_panel/public/api/login