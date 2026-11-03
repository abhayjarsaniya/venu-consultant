import { defaultSiteContent, type DefaultSiteContent } from "./defaultSiteContent";
import { getFirebaseDb } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const STORAGE_KEY = "venu_site_content_v1";
const ADMIN_AUTH_KEY = "venu_admin_auth_state";
const ADMIN_PIN_KEY = "venu_admin_pin";
const DEFAULT_PIN = "admin123";

let currentContent: DefaultSiteContent = defaultSiteContent;
const listeners = new Set<(content: DefaultSiteContent) => void>();

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  if (typeof source !== "object" || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined) {
      if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export function initContent(): DefaultSiteContent {
  if (typeof window === "undefined") return defaultSiteContent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      currentContent = deepMerge(defaultSiteContent, parsed);
    } else {
      currentContent = defaultSiteContent;
    }
  } catch (err) {
    console.error("Error reading stored site content:", err);
    currentContent = defaultSiteContent;
  }
  return currentContent;
}

export function getContent(): DefaultSiteContent {
  return currentContent;
}

export function subscribeToContent(fn: (content: DefaultSiteContent) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function notify() {
  for (const l of listeners) {
    l(currentContent);
  }
}

export function saveContent(updated: Partial<DefaultSiteContent>): DefaultSiteContent {
  currentContent = deepMerge(currentContent, updated);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentContent));
    } catch (e) {
      console.error("Could not write to localStorage", e);
    }
  }
  notify();
  return currentContent;
}

export function resetContentToDefault(): DefaultSiteContent {
  currentContent = JSON.parse(JSON.stringify(defaultSiteContent));
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  notify();
  return currentContent;
}

export async function syncFromFirestore(): Promise<{ success: boolean; message: string }> {
  const db = getFirebaseDb();
  if (!db) {
    return {
      success: false,
      message:
        "Firebase is not configured yet. Add your Firebase credentials in the Cloud Sync tab.",
    };
  }
  try {
    const snap = await getDoc(doc(db, "site_settings", "content"));
    if (snap.exists()) {
      const remoteData = snap.data() as Partial<DefaultSiteContent>;
      saveContent(remoteData);
      return { success: true, message: "Content successfully loaded from Firebase Cloud!" };
    } else {
      // First time, upload current content
      await setDoc(doc(db, "site_settings", "content"), currentContent);
      return {
        success: true,
        message:
          "No remote document found. Successfully seeded your current content to Firebase Cloud!",
      };
    }
  } catch (err: any) {
    console.error("Firebase sync error:", err);
    return { success: false, message: `Firebase Cloud error: ${err?.message || String(err)}` };
  }
}

export async function syncToFirestore(): Promise<{ success: boolean; message: string }> {
  const db = getFirebaseDb();
  if (!db) {
    return {
      success: false,
      message:
        "Firebase is not configured yet. Add your Firebase credentials in the Cloud Sync tab.",
    };
  }
  try {
    await setDoc(doc(db, "site_settings", "content"), currentContent);
    return {
      success: true,
      message: "Content successfully published and synced to Firebase Cloud!",
    };
  } catch (err: any) {
    console.error("Firebase push error:", err);
    return { success: false, message: `Firebase Cloud error: ${err?.message || String(err)}` };
  }
}

// Authentication helpers for Admin
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function setAdminAuthenticated(authenticated: boolean) {
  if (typeof window === "undefined") return;
  if (authenticated) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

export function getAdminPin(): string {
  if (typeof window === "undefined") return DEFAULT_PIN;
  return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
}

export function setAdminPin(newPin: string): boolean {
  if (typeof window === "undefined" || !newPin || newPin.length < 4) return false;
  localStorage.setItem(ADMIN_PIN_KEY, newPin);
  return true;
}

export function verifyAdminPin(enteredPin: string): boolean {
  const actual = getAdminPin();
  return enteredPin === actual;
}
