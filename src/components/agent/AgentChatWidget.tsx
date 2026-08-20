import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface AgentChatWidgetProps {
  onOpen: () => void;
}

export const AgentChatWidget: React.FC<AgentChatWidgetProps> = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 90,
        background: 'linear-gradient(135deg, #0284c7, #059669)',
        color: '#ffffff',
        border: 'none',
        borderRadius: 'var(--radius-full)',
        padding: '0.85rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        cursor: 'pointer',
        boxShadow: '0 8px 30px rgba(2, 132, 199, 0.45)',
        fontWeight: 700,
        fontSize: '0.92rem',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
      aria-label="Open Personal Brand AI Agent"
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Bot size={20} />
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#34d399',
            border: '2px solid #0284c7',
          }}
        />
      </div>
      <span>Ask AI Agent</span>
      <Sparkles size={14} style={{ opacity: 0.9 }} />
    </button>
  );
};
