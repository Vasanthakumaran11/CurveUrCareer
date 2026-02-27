import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate fetching real-time market data for careers.
 * In a production app, this would call an API like Adzuna, Glassdoor, or LinkedIn.
 */
export const useMarketData = (careerName) => {
  // We use a single state object to avoid multiple synchronous updates
  const [state, setState] = useState({
    data: null,
    loading: !!careerName,
    currentCareer: careerName
  });

  // Update loading state if careerName changes without triggering a synchronous effect update
  if (careerName !== state.currentCareer) {
    setState({
      data: null,
      loading: !!careerName,
      currentCareer: careerName
    });
  }

  useEffect(() => {
    if (!careerName) return;
    
    // Simulate API delay
    const timer = setTimeout(() => {
      // Mock data based on popular career paths
      const mockData = {
        'Software Development': {
          demandGrowth: 22,
          entrySalary: '₹4.5L - ₹8L',
          midSalary: '₹12L - ₹25L',
          seniorSalary: '₹35L+',
          hotSkills: ['React.js', 'Python', 'Cloud Computing (AWS/Azure)', 'System Design', 'AI/ML'],
          topLocations: ['Bangalore', 'Hyderabad', 'Pune', 'Noida', 'Remote'],
          remoteWorkTrend: 'High (65% of roles)',
          industryHealth: 'Excellent'
        },
        'Data Science': {
          demandGrowth: 31,
          entrySalary: '₹6L - ₹10L',
          midSalary: '₹15L - ₹30L',
          seniorSalary: '₹45L+',
          hotSkills: ['PyTorch/TensorFlow', 'Advanced SQL', 'Data Visualization', 'Big Data Engineering'],
          topLocations: ['Bangalore', 'Mumbai', 'Gurgaon', 'San Francisco', 'Remote'],
          remoteWorkTrend: 'Moderate-High (50% of roles)',
          industryHealth: 'Excellent'
        },
        'Digital Marketing': {
          demandGrowth: 18,
          entrySalary: '₹3L - ₹5L',
          midSalary: '₹8L - ₹15L',
          seniorSalary: '₹25L+',
          hotSkills: ['SEO/SEM', 'Content Strategy', 'Data Analytics', 'Growth Hacking'],
          topLocations: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Remote'],
          remoteWorkTrend: 'High (70% of roles)',
          industryHealth: 'Good'
        },
        'Business Analytics': {
          demandGrowth: 15,
          entrySalary: '₹5L - ₹8L',
          midSalary: '₹12L - ₹22L',
          seniorSalary: '₹35L+',
          hotSkills: ['Power BI/Tableau', 'Business Intelligence', 'Strategic Planning', 'Python'],
          topLocations: ['Bangalore', 'Mumbai', 'Chennai', 'Pune'],
          remoteWorkTrend: 'Moderate (40% of roles)',
          industryHealth: 'Stable'
        }
      };

      // Default data if career not specifically matched
      const defaultData = {
        demandGrowth: 12,
        entrySalary: '₹3.5L - ₹6L',
        midSalary: '₹9L - ₹18L',
        seniorSalary: '₹25L+',
        hotSkills: ['Communication', 'Problem Solving', 'Project Management', 'Digital Literacy'],
        topLocations: ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad'],
        remoteWorkTrend: 'Moderate (30% of roles)',
        industryHealth: 'Stable'
      };

      // Find best match or return default
      const matchedKey = Object.keys(mockData).find(key => 
        careerName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(careerName.toLowerCase())
      );

      setState(prev => ({
        ...prev,
        data: mockData[matchedKey] || defaultData,
        loading: false
      }));
    }, 800);

    return () => clearTimeout(timer);
  }, [careerName]);

  return { marketData: state.data, loading: state.loading };
};
