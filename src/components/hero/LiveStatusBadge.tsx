import React from 'react';
import { Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const LiveStatusBadge: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.4rem 0.95rem',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.28)',
        fontSize: '0.82rem',
        fontWeight: 600,
        color: 'var(--accent-emerald)',
        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.1)',
        marginBottom: '1.25rem',
      }}
    >
      <span className="pulse-beacon pulse-beacon-emerald" />
      <span>{PERSONAL_INFO.targetRole} Candidate</span>
      <span style={{ color: 'var(--text-muted)' }}>•</span>
      <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
        <Sparkles size={13} color="var(--accent-cyan)" /> Available Now
      </span>
    </div>
  );
};
