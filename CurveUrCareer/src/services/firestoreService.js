import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db, isFirebaseAvailable, FirebaseErrors } from '../firebase.js';

// Collection names
const COLLECTIONS = {
  ASSESSMENTS: 'assessments',
  COLLEGES: 'colleges',
  USERS: 'users'
};

// Error handling utility
const handleFirebaseError = (error, operation) => {
  console.error(`Firebase ${operation} error:`, error);

  if (error.code === 'permission-denied') {
    throw new Error('Permission denied. Please check your Firestore security rules.');
  } else if (error.code === 'unavailable') {
    throw new Error('Network error. Please check your internet connection.');
  } else if (error.code === 'not-found') {
    throw new Error('Document not found.');
  } else if (error.code === 'already-exists') {
    throw new Error('Document already exists.');
  } else if (error.code === 'failed-precondition') {
    throw new Error('Operation failed due to Firestore constraints.');
  } else {
    throw new Error(`Database operation failed: ${error.message}`);
  }
};

// Check if Firebase is available before operations
const ensureFirebaseAvailable = () => {
  if (!isFirebaseAvailable()) {
    throw new Error('Firebase is not available. Please check your configuration.');
  }
};

// Assessment operations
export const saveAssessmentResult = async (assessmentData) => {
  try {
    ensureFirebaseAvailable();

    const { name, topTags, directions, ...otherData } = assessmentData;

    if (!name || !topTags || !directions) {
      throw new Error('Missing required assessment data: name, topTags, or directions');
    }

    const docData = {
      name: name.trim(),
      topTags: Array.isArray(topTags) ? topTags : [],
      directions: Array.isArray(directions) ? directions : [],
      timestamp: Timestamp.now(),
      ...otherData
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.ASSESSMENTS), docData);
    console.log('Assessment result saved with ID:', docRef.id);

    return {
      success: true,
      id: docRef.id,
      message: 'Assessment result saved successfully'
    };
  } catch (error) {
    handleFirebaseError(error, 'save assessment');
    return {
      success: false,
      error: error.message,
      message: 'Failed to save assessment result. Please try again.'
    };
  }
};

// College data operations
export const fetchColleges = async (filters = {}) => {
  try {
    ensureFirebaseAvailable();

    let q = collection(db, COLLECTIONS.COLLEGES);

    // Apply filters if provided
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }

    // Order by name and limit results
    q = query(q, orderBy('name'), limit(100));

    const querySnapshot = await getDocs(q);
    const colleges = [];

    querySnapshot.forEach((doc) => {
      colleges.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`Fetched ${colleges.length} colleges`);
    return {
      success: true,
      data: colleges,
      count: colleges.length
    };
  } catch (error) {
    handleFirebaseError(error, 'fetch colleges');
    return {
      success: false,
      data: [],
      error: error.message,
      message: 'Failed to load college data. Using local data as fallback.'
    };
  }
};

// Get assessment by ID
export const getAssessmentById = async (assessmentId) => {
  try {
    ensureFirebaseAvailable();

    const docRef = doc(db, COLLECTIONS.ASSESSMENTS, assessmentId);
    const docSnap = await getDocs(query(collection(db, COLLECTIONS.ASSESSMENTS), where('__name__', '==', docRef)));

    if (!docSnap.empty) {
      const doc = docSnap.docs[0];
      return {
        success: true,
        data: {
          id: doc.id,
          ...doc.data()
        }
      };
    } else {
      throw new Error('Assessment not found');
    }
  } catch (error) {
    handleFirebaseError(error, 'get assessment');
    return {
      success: false,
      error: error.message,
      message: 'Failed to retrieve assessment data.'
    };
  }
};

// Update assessment
export const updateAssessment = async (assessmentId, updateData) => {
  try {
    ensureFirebaseAvailable();

    const docRef = doc(db, COLLECTIONS.ASSESSMENTS, assessmentId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });

    return {
      success: true,
      message: 'Assessment updated successfully'
    };
  } catch (error) {
    handleFirebaseError(error, 'update assessment');
    return {
      success: false,
      error: error.message,
      message: 'Failed to update assessment.'
    };
  }
};

// Delete assessment
export const deleteAssessment = async (assessmentId) => {
  try {
    ensureFirebaseAvailable();

    await deleteDoc(doc(db, COLLECTIONS.ASSESSMENTS, assessmentId));

    return {
      success: true,
      message: 'Assessment deleted successfully'
    };
  } catch (error) {
    handleFirebaseError(error, 'delete assessment');
    return {
      success: false,
      error: error.message,
      message: 'Failed to delete assessment.'
    };
  }
};

// Get user's assessment history
export const getUserAssessments = async (userId, limitCount = 10) => {
  try {
    ensureFirebaseAvailable();

    const q = query(
      collection(db, COLLECTIONS.ASSESSMENTS),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const assessments = [];

    querySnapshot.forEach((doc) => {
      assessments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      data: assessments,
      count: assessments.length
    };
  } catch (error) {
    handleFirebaseError(error, 'get user assessments');
    return {
      success: false,
      data: [],
      error: error.message,
      message: 'Failed to load assessment history.'
    };
  }
};

// Utility function to check database connectivity
export const testDatabaseConnection = async () => {
  try {
    ensureFirebaseAvailable();

    // Try to fetch a single document to test connection
    const q = query(collection(db, COLLECTIONS.COLLEGES), limit(1));
    await getDocs(q);

    return {
      success: true,
      message: 'Database connection successful'
    };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Database connection failed. Please check your configuration.'
    };
  }
};