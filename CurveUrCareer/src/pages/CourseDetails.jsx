import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Course Details</h1>
        <p className="text-lg text-gray-600 mb-4">
          Detailed information about course ID: {courseId}
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Course Information</h2>
          <p className="text-gray-700">
            This page will display detailed information about the selected course,
            including syllabus, duration, prerequisites, and career prospects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;