// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID'
  ];

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    const errorMsg = `Missing required Firebase environment variables: ${missingVars.join(', ')}`;
    console.warn(errorMsg);
    return false;
  }

  return true;
};

// Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase app with error handling
let app;
let db;
let auth;
let googleProvider;

if (validateFirebaseConfig()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
}

// Export Firebase instances
export { app, db, auth, googleProvider };

// Export a function to check if Firebase is available
export const isFirebaseAvailable = () => {
  return !!app && !!db && !!auth;
};

// Export error types for better error handling
export const FirebaseErrors = {
  APP_NOT_INITIALIZED: 'Firebase App not initialized',
  PERMISSION_DENIED: 'Firestore permission denied',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_CONFIG: 'Invalid Firebase configuration'
};