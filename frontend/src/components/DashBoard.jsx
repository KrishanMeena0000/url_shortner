import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import UrlCreationForm from '../UrlCreationForm';
import UrlList from '../UrlList';
import API from '../api';



// ============================
// Styled Components
// ============================

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f9fafb; /* gray-50 */
`;

const Main = styled.main`
  max-width: 72rem; /* ~6xl */
  margin: 0 auto;
  padding: 2rem 1rem;
`;

// ============================
// Dashboard Component
// ============================

function Dashboard({ user, onLogout }) {
  const [urls, setUrls] = useState([]);
  const [formError, setFormError] = useState([]);

 useEffect(() => {
  const fetchUrls = async () => {
    try {
      console.log('enter fetch urls in use effect')
      const res = await API.get('/urls', { withCredentials: true });
      console.log('fetch data : ', res.data)
      setUrls(Array.isArray(res.data) ? res.data : []); // set the URLs returned from backend
    } catch (err) {
       console.error('Error fetching URLs:', err);
      if (err.response?.status === 401) {
        // Redirect to login page or show a login prompt
        console.log('Unauthorized, redirecting to login...');
        // Example: window.location.href = '/login';
      }
      setUrls([]); 
    }
  };

  fetchUrls();
}, []);

  // Dashboard.jsx

  const handleCreateUrl = async (longUrl, customAlias) => {
    try {
      // 1. Call the backend API to create the new URL
      const response = await API.post('/urls',
        { longUrl, customAlias },
        { withCredentials: true }
      );

      // 2. Get the REAL URL object from the API response
      //    (This works because we fixed your backend in the previous step)
      const newUrlFromApi = response.data;

      // 3. Add the new URL from the API to the top of the list
      setUrls(prevUrls => [newUrlFromApi, ...prevUrls]);

    } catch (error) {
      // Check if the error is the 409 conflict we set up
      if (error.response && error.response.status === 409) {
        setFormError(error.response.data.error); // Set the specific error message
      } else {
        setFormError("An unexpected error occurred. Please try again."); // For other errors
        console.error("Failed to create short URL:", error);
      }
    }
  };

  // In DashBoard.jsx
  const handleDeleteUrl = (id) => {
    setUrls(urls.filter((url) => url._id !== id));
  };

  return (
    <DashboardWrapper>
      <Header user={user} onLogout={onLogout} />

      <Main>
        <UrlCreationForm onCreateUrl={handleCreateUrl} error={formError} />
        <UrlList urls={urls} onDeleteUrl={handleDeleteUrl} />
      </Main>
    </DashboardWrapper>
  );
}

export default Dashboard;
