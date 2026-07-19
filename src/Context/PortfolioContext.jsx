import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithMinimumDelay } from '../Components/common/loaderUtils';
import Loader from '../Components/common/Loader';
import {
  getHomepageData,
  getContactData,
  getAllProjects,
  getAllProjectTopics,
  getAllBlogs,
  getAllBlogTopics
} from '../Services/gist.js';

const PortfolioContext = createContext();

// Export the context for class components
export { PortfolioContext };

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    homepage: null,
    contact: null,
    projects: [],
    projectTopics: [],
    blogs: [],
    blogTopics: []
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [
          homepage,
          contact,
          projects,
          projectTopics,
          blogs,
          blogTopics
        ] = await fetchWithMinimumDelay([
          getHomepageData,
          getContactData,
          getAllProjects,
          getAllProjectTopics,
          getAllBlogs,
          getAllBlogTopics
        ]);

        setData({
          homepage,
          contact,
          projects,
          projectTopics,
          blogs,
          blogTopics
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Set fallback data
        setData({
          homepage: {
            name: 'Utkarsh Dhiman',
            title: "I'm a full stack web developer."
          },
          contact: {
            github: 'https://github.com/utkarsh48',
            twitter: 'https://twitter.com/utkarshdhiman48',
            linkedin: 'https://www.linkedin.com/in/utkarshdhiman48/',
            email: 'utkarshdhiman48@gmail.com',
            copyright: '© Utkarsh Dhiman'
          },
          projects: [],
          projectTopics: [],
          blogs: [],
          blogTopics: []
        });
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};
