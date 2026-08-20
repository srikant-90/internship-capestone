import React, { useState } from 'react';
import { Cpu, Bot, Database, Layout, Activity, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { AI_STACK_LAYERS } from '../../data/aiStackData';
import { StackLayerCard } from './StackLayerCard';

export const AIStackExplorer: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(AI_STACK_LAYERS[0].id);

  return (
    <section id="ai-stack" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>AI Stack Mastery</span>
          </div>
          <h2 className="section-title">
            The Modern AI Stack, <span style={{ color: 'var(--accent-cyan)' }}>End-to-End</span>
          </h2>
          <p className="section-subtitle">
            From raw foundation model inference and multi-agent LangGraph loops down to zero-jank SSE streaming UX and client observability.
          </p>
        </div>

        {/* Quick Horizontal Layer Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {AI_STACK_LAYERS.map((layer) => {
            const isSelected = selectedLayerId === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                style={{
                  background: isSelected ? 'var(--accent-cyan)' : 'var(--bg-tertiary)',
                  color: isSelected ? '#050c18' : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-medium)'}`,
                  padding: '0.6rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{layer.number}</span>
                <span>{layer.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Stack Cards Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {AI_STACK_LAYERS.map((layer) => (
            <StackLayerCard
              key={layer.id}
              layer={layer}
              isActive={selectedLayerId === layer.id}
              onSelect={() => setSelectedLayerId(layer.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
