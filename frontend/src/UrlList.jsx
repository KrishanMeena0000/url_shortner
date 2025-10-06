import React from 'react';
import styled from 'styled-components';
import UrlItem from './UrlItem';

// ============================
// Styled Components
// ============================

const ListWrapper = styled.div`
  background: #ffffff;
  border-radius: 1rem; /* rounded-xl */
  box-shadow: 0 1px 2px rgba(0,0,0,0.05); /* shadow-sm */
  padding: 1.5rem; /* p-6 */
`;

const Title = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;
  color: #111827; /* gray-900 */
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #6b7280; /* gray-500 */
  text-align: center;
  padding: 2rem 0;
`;

const UrlItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
`;

// ============================
// UrlList Component
// ============================

function UrlList({ urls, onDeleteUrl }) {
  return (
    <ListWrapper>
      <Title>Your URLs</Title>

      {urls.length === 0 ? (
        <EmptyText>
          No URLs created yet. Start by creating your first short URL!
        </EmptyText>
      ) : (
        <UrlItemsContainer>
          {urls.map((url) => (
            <UrlItem key={url._id} url={url} onDelete={onDeleteUrl} />
          ))}
        </UrlItemsContainer>
      )}
    </ListWrapper>
  );
}

export default UrlList;
