import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const OFFICIAL_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "AIzaSyCfX6qb3eJkLU_luK_2FZAr8wiudiFKPlk",
  authDomain: "venu-consultants-web.firebaseapp.com",
  projectId: "venu-consultants-web",
  storageBucket: "venu-consultants-web.firebasestorage.app",
  messagingSenderId: "9316893020",
  appId: "1:9316893020:web:7c4d89de4fe3d2a5000199",
};

export function getStoredFirebaseConfig(): FirebaseConfig {
  if (typeof window === "undefined") return OFFICIAL_FIREBASE_CONFIG;
  try {
    const raw = localStorage.getItem("venu_firebase_config");
    if (raw) {
      return { ...OFFICIAL_FIREBASE_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error("Failed to read firebase config from storage", err);
  }
  return OFFICIAL_FIREBASE_CONFIG;
}

export function saveStoredFirebaseConfig(config: FirebaseConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem("venu_firebase_config", JSON.stringify(config));
}

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!appInstance) {
    const existing = getApps();
    if (existing.length > 0) {
      appInstance = existing[0];
    } else {
      const config = getStoredFirebaseConfig();
      appInstance = initializeApp(config);
    }
  }
  return appInstance;
}

export function getFirebaseDb(): Firestore | null {
  try {
    const app = getFirebaseApp();
    if (!dbInstance && app) {
      dbInstance = getFirestore(app);
    }
    return dbInstance;
  } catch (e) {
    console.warn("Firestore initialization notice:", e);
    return null;
  }
}
