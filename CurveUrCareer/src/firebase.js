// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (!apiKey || apiKey.length < 20) {
    throw new Error('Invalid Firebase API key. Please check your .env file.');
  }

  if (!authDomain || !authDomain.includes('.firebaseapp.com')) {
    throw new Error('Invalid Firebase auth domain. Please check your .env file.');
  }

  if (!projectId || projectId.length < 5) {
    throw new Error('Invalid Firebase project ID. Please check your .env file.');
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

try {
  validateFirebaseConfig();
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  // Graceful degradation - app can still run without Firebase
  app = null;
  db = null;
}

// Export Firebase instances
export { app, db };

// Export a function to check if Firebase is available
export const isFirebaseAvailable = () => {
  return app !== null && db !== null;
};

// Export error types for better error handling
export const FirebaseErrors = {
  APP_NOT_INITIALIZED: 'Firebase App not initialized',
  PERMISSION_DENIED: 'Firestore permission denied',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_CONFIG: 'Invalid Firebase configuration'
};