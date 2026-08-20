import React, { useState } from 'react';
import { Cpu, Bot, Database, Layout, Activity, Copy, Check, Code2, Sparkles, Terminal } from 'lucide-react';
import { AIStackLayer } from '../../types';
import { Badge } from '../common/Badge';

const ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={24} color="var(--accent-cyan)" />,
  Bot: <Bot size={24} color="var(--accent-emerald)" />,
  Database: <Database size={24} color="var(--accent-amber)" />,
  Layout: <Layout size={24} color="var(--accent-blue)" />,
  Activity: <Activity size={24} color="var(--accent-rose)" />,
};

interface StackLayerCardProps {
  layer: AIStackLayer;
  isActive: boolean;
  onSelect: () => void;
}

export const StackLayerCard: React.FC<StackLayerCardProps> = ({ layer, isActive, onSelect }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(layer.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="glass-card"
      onClick={onSelect}
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        borderLeft: isActive ? '4px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
        background: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        transition: 'all var(--transition-normal)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {ICONS[layer.iconName] || <Cpu size={22} />}
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              LAYER {layer.number}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
              {layer.title}
            </h3>
          </div>
        </div>

        <Badge variant={isActive ? 'cyan' : 'neutral'}>
          {layer.technologies.length} Frameworks
        </Badge>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        {layer.subtitle}
      </p>

      {/* Tech Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {layer.technologies.map((tech, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '0.78rem',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontWeight: 500,
            }}
          >
            {tech.name}
          </span>
        ))}
      </div>

      {/* Expanded Details when Active */}
      {isActive && (
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
          {/* Key Concepts Grid */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Core Engineering Concepts
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {layer.keyConcepts.map((concept, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Sparkles size={13} color="var(--accent-cyan)" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend Relevance */}
          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
              marginBottom: '1.25rem',
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: 'var(--accent-cyan)' }}>Frontend Engineering Relevance: </strong>
            {layer.frontendRelevance}
          </div>

          {/* Code Snippet Box */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#070a10',
                padding: '0.5rem 1rem',
                borderTopLeftRadius: 'var(--radius-md)',
                borderTopRightRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                borderBottom: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <Code2 size={14} color="var(--accent-cyan)" />
                <span>{layer.codeSnippet.title}</span>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: copied ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontWeight: 600,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre
              style={{
                background: '#04070c',
                border: '1px solid var(--border-medium)',
                borderBottomLeftRadius: 'var(--radius-md)',
                borderBottomRightRadius: 'var(--radius-md)',
                padding: '1rem',
                margin: 0,
                overflowX: 'auto',
                fontSize: '0.8rem',
                color: '#e2e8f0',
                lineHeight: 1.5,
              }}
            >
              <code>{layer.codeSnippet.code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
