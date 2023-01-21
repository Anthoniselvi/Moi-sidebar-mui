import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYEHIv6P8M_tN_Q0XZdXuQFqv-I2yGyb0",
  authDomain: "signup-112d4.firebaseapp.com",
  projectId: "signup-112d4",
  storageBucket: "signup-112d4.appspot.com",
  messagingSenderId: "348667575174",
  appId: "1:348667575174:web:7255fb49575d817d764a07",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
