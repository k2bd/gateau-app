import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_AUTH_EMULATOR_HOST,
  FIREBASE_DATABASE_URL,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  APP_STAGE,
} from "./constants";
import { Stage } from "./types";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// See https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

if (APP_STAGE === Stage.DEV && FIREBASE_AUTH_EMULATOR_HOST)
  connectAuthEmulator(auth, FIREBASE_AUTH_EMULATOR_HOST);

export default firebaseApp;
