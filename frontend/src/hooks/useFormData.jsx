import { useContext } from 'react';
import { FormDataContext } from '../contexts/FormDataContext';

// Custom hook to use form data context
export const useFormData = () => {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }

  return context;
};
