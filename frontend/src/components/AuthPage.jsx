import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import styled from 'styled-components';
import LoginForm from '../LogInPage';
import SignupForm from '../SignUp';

// ============================
// Styled Components
// ============================

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 420px;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #4f46e5; /* indigo-600 */
  border-radius: 50%;
  margin-bottom: 1rem;

  svg {
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem; /* 3xl */
  font-weight: 700;
  color: #111827; /* gray-900 */
`;

const Subtitle = styled.p`
  margin-top: 0.5rem;
  color: #4b5563; /* gray-600 */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s;

  ${({ $active }) =>
    $active
      ? `
        background: #4f46e5;
        color: white;
      `
      : `
        background: #f3f4f6; 
        color: #374151;
        &:hover {
          background: #e5e7eb;
        }
      `}
`;

// ============================
// AuthPage Component
// ============================

function AuthPage({ onLogin }) {
  const [currentView, setCurrentView] = useState('login');

  return (
    <PageWrapper>
      <Card>
        <Header>
          <IconWrapper>
            <Link2 size={32} />
          </IconWrapper>
          <Title>URL Shortener</Title>
          <Subtitle>Shorten your links, track your clicks</Subtitle>
        </Header>

        <ButtonGroup>
          <TabButton
            $active={currentView === 'login'}
            onClick={() => setCurrentView('login')}
          >
            Login
          </TabButton>
          <TabButton
            $active={currentView === 'signup'}
            onClick={() => setCurrentView('signup')}
          >
            Sign Up
          </TabButton>
        </ButtonGroup>

        {currentView === 'login' ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <SignupForm onLogin={onLogin} />
        )}
      </Card>
    </PageWrapper>
  );
}

export default AuthPage;
