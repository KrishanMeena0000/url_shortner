// src/UrlItem.jsx
import React, { useState } from 'react';
import { Copy, Check, Trash2, BarChart3 } from 'lucide-react';
import styled from 'styled-components';
import API from './api'; // Make sure api.js is inside src/

// ============================
// Styled Components
// ============================

const ItemWrapper = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const ShortUrlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ShortUrlText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4f46e5;
`;

const CopyButton = styled.button`
  padding: 0.25rem;
  border-radius: 0.375rem;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  svg {
    display: block;
  }
`;

const LongUrlText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;

  svg {
    display: block;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem;
  color: #dc2626;
  border-radius: 0.375rem;
  transition: background 0.2s;

  &:hover {
    background: #fee2e2;
  }
`;

// ============================
// UrlItem Component
// ============================

function UrlItem({ url, onDelete }) {
  const [copied, setCopied] = useState(false);

  // Copy URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${url.shortId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Delete URL from backend & frontend
  const handleDelete = async (id) => {
    try {
      await API.delete(`/urls/${id}`); // Backend call
      onDelete(id); // Update frontend state
    } catch (err) {
      console.error(err);
      alert('Failed to delete URL');
    }
  };

  return (
    <ItemWrapper>
      <ItemContainer>
        <Info>
          <ShortUrlRow>
            <ShortUrlText><a href={url.redirectURL} target="_blank" rel="noopener noreferrer">{url.shortId}</a></ShortUrlText>
            <CopyButton onClick={handleCopy}>
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} color="#4b5563" />}
            </CopyButton>
          </ShortUrlRow>

          <LongUrlText>{url.redirectURL}</LongUrlText>

          <StatsRow>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <BarChart3 size={14} />
              {url.visitHistory.length} clicks
            </span>
            <span>Created: {url.createdAt}</span>
          </StatsRow>
        </Info>

        <DeleteButton onClick={() => handleDelete(url._id)}>
          <Trash2 size={18} />
        </DeleteButton>
      </ItemContainer>
    </ItemWrapper>
  );
}

export default UrlItem;
