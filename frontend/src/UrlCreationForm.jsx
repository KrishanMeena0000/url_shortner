import React, { useState } from 'react';
import styled from 'styled-components';
import API from './api';

// ============================
// Styled Components
// ============================

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 1rem; /* rounded-xl */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  padding: 1.5rem; /* p-6 */
  margin-bottom: 2rem; /* mb-8 */
`;

const Title = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;
  color: #111827; /* gray-900 */
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  color: #374151; /* gray-700 */
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #6366f1; /* indigo-500 */
  }
`;

const Button = styled.button`
  background: #4f46e5; /* indigo-600 */
  color: white;
  padding: 0.5rem 1.5rem; /* px-6 py-2 */
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #4338ca; /* indigo-700 */
  }
`;

// ============================
// UrlCreationForm Component
// ============================

function UrlCreationForm({ onCreateUrl, error }) {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!longUrl.trim()) return;

  try {
    const res = await API.post('/urls', {
      longUrl: longUrl.trim(),
      customAlias: customAlias.trim(),
    });
    onCreateUrl(res.data); // add new URL to frontend state
    setLongUrl('');
    setCustomAlias('');
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Failed to create URL');
  }
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
            onChange={(e) =>
              setCustomAlias(e.target.value.replace(/\s/g, ''))
            }
            placeholder="my-custom-link"
          />
        </Field>

        <Button type="submit">Shorten URL</Button>
      </Form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </FormWrapper>
  );
}

export default UrlCreationForm;
