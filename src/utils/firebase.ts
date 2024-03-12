// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { type Hospital } from '@/utils/hospitals'
import { ref } from 'vue';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp7-slZWJi63a6u1NSgXUTZniK_F-twE4",
  authDomain: "carefinder-app-4a765.firebaseapp.com",
  projectId: "carefinder-app-4a765",
  storageBucket: "carefinder-app-4a765.appspot.com",
  messagingSenderId: "371845711278",
  appId: "1:371845711278:web:b10528f2b3590ee1e0343f",
  measurementId: "G-7PYCPP6063"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export const auth = getAuth(app);

const email = ref('');
const password = ref('');
const error = ref(null);

const handleSignUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    console.error('Error: ', err as Error);
  }
};

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    console.error('Error: ', err as Error);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Error signing out: ', err);
  }
};

const handlePasswordReset = async () => {
  try {
    await sendPasswordResetEmail(auth, email.value);
    alert('Password reset email sent. Check your inbox.');
  } catch (err) {
    console.error('Error: ', err as Error);
  }
};

const hospitals: Hospital[] = [];

const addHospitalsToFirebase = async () => {
  try {
    for (const hospital of hospitals) {
      await addDoc(collection(db, 'hospitals'), hospital);
    }
    console.log('Hospitals added to Firebase successfully!');
  } catch (error) {
    console.error('Error adding hospitals to Firebase: ', error);
  }
};

export { app, db, email, password, error, handleSignUp, handleLogin, handleLogout, handlePasswordReset, addHospitalsToFirebase };