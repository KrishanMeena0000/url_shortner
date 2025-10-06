// In frontend/src/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import UrlCreationForm from '../UrlCreationForm';
import UrlList from '../UrlList';
import API from '../api';

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`;

const Main = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

function Dashboard({ user, onLogout }) {
  const [urls, setUrls] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await API.get('/urls');
        setUrls(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching URLs:', err);
        setUrls([]);
      }
    };
    fetchUrls();
  }, []);

  const handleCreateUrl = async (formData) => {
    try {
      setFormError(''); // Clear previous errors
      const response = await API.post('/urls', formData);
      const newUrlFromApi = response.data;
      setUrls(prevUrls => [newUrlFromApi, ...prevUrls]);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setFormError(error.response.data.error);
      } else {
        setFormError("An unexpected error occurred. Please try again.");
        console.error("Failed to create short URL:", error);
      }
    }
  };

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