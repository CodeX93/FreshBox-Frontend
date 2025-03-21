// FloatingButton.jsx
'use client';
import React from 'react';
import { Calendar } from 'lucide-react';

const FloatingButton = () => {
  return (
    <button
      onClick={() => console.log('Button clicked')}
      style={{
        position: 'fixed',
        top: '50%',
        right: '24px',
        transform: 'translateY(-50%)',
        backgroundColor: '#28ddcd',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '9999px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 9999,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 700
      }}
    >
      <Calendar size={20} />
      <span style={{ fontWeight: 700 }}>Schedule Pickup</span>
    </button>
  );
};

export default FloatingButton;