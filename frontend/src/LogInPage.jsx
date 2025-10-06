import React, { useState } from 'react';
import styled from 'styled-components';
import API from './api';

// ============================
// Styled Components
// ============================

const FormWrapper = styled.div`
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
  width: 100%;
  background: #4f46e5; /* indigo-600 */
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #4338ca; /* indigo-700 */
  }
`;

// ============================
// LoginForm Component
// ============================

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/user/login', formData);
    console.log("Login response:", res);       // 👈 log entire response
    console.log("Response data:", res.data);
    // localStorage.setItem('token', res.data.token);
    onLogin(res.data.user);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <FormWrapper>
      <Field>
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
        />
      </Field>

      <Field>
        <Label>Password</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="••••••••"
        />
      </Field>

      <Button onClick={handleSubmit}>Login</Button>
    </FormWrapper>
  );
}

export default LoginForm;
