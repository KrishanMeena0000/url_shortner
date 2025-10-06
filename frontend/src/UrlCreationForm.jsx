// In frontend/src/UrlCreationForm.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

// --- (All your styled components can remain exactly the same) ---
const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;
const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;
  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #6366f1;
  }
`;
const Button = styled.button`
  background: #4f46e5;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #4338ca;
  }
  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`;

function UrlCreationForm({ onCreateUrl, error }) {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    setIsLoading(true);
    await onCreateUrl({ // Pass an object with the data up to the Dashboard
      longUrl: longUrl.trim(),
      customAlias: customAlias.trim(),
    });
    setIsLoading(false);

    setLongUrl('');
    setCustomAlias('');
  };

  return (
    <FormWrapper>
      <Title>Create Short URL</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Long URL</Label>
          <Input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/your-long-url"
            required
          />
        </Field>

        <Field>
          <Label>Custom Alias (optional)</Label>
          <Input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value.replace(/\s/g, ''))}
            placeholder="my-custom-link"
          />
        </Field>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Short URL'}
        </Button>
      </Form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </FormWrapper>
  );
}

export default UrlCreationForm;