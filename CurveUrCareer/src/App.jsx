import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CareerGuidance from './pages/CareerGuidance';
import StreamsPage from './pages/StreamsPage';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career-guidance" element={<CareerGuidance />} />
        <Route path="/streams" element={<StreamsPage />} />
        <Route path="/streams/:streamId" element={<StreamsPage />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;