import API from './api';
import React, { useState } from 'react';
import styled from 'styled-components';

// ============================
// Styled Components
// ============================

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
// SignupForm Component
// ============================

function SignupForm({ onLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/user/signup", formData);
    console.log(res.data);
    onLogin(res.data.user); // Save user in state
  } catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Name</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          required
        />
      </Field>

      <Field>
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          required
        />
      </Field>

      <Field>
        <Label>Password</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="••••••••"
          required
        />
      </Field>

      <Button type="submit">Sign Up</Button>
    </Form>
  );
}

export default SignupForm;
