import { Stage } from "./types";

export const GATEAU_API_URL = process.env.REACT_APP_GATEAU_API_URL;

export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
export const FIREBASE_DATABASE_URL =
  process.env.REACT_APP_FIREBASE_DATABASE_URL;
export const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET =
  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

export const FIREBASE_AUTH_EMULATOR_HOST =
  process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST;

export const APP_STAGE =
  process.env.REACT_APP_STAGE === "production" ? Stage.PROD : Stage.DEV;
