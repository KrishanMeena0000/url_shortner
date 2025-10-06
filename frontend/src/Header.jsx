import React from 'react';
import { Link2, LogOut } from 'lucide-react';
import styled from 'styled-components';

// ============================
// Styled Components
// ============================

const HeaderWrapper = styled.header`
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
`;

const Container = styled.div`
  max-width: 72rem; /* ~6xl */
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #4f46e5; /* indigo-600 */
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem; /* text-xl */
  font-weight: 700;
  color: #111827; /* gray-900 */
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Greeting = styled.span`
  color: #374151; /* gray-700 */
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #374151;
  border-radius: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6; /* gray-100 */
  }

  svg {
    flex-shrink: 0;
  }
`;

// ============================
// Header Component
// ============================

function Header({ user, onLogout }) {
  return (
    <HeaderWrapper>
      <Container>
        <Left>
          <IconBox>
            <Link2 size={24} />
          </IconBox>
          <Title>URL Shortener</Title>
        </Left>
        <Right>
          <Greeting>Hello, {user?.name}!</Greeting>
          <LogoutButton onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </LogoutButton>
        </Right>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
