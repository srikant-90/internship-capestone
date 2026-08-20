import React, { useState } from 'react';
import { Bot, Mail, Check, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';

export const Footer: React.FC<{ onOpenAgent: () => void }> = ({ onOpenAgent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        paddingTop: '4.5rem',
        paddingBottom: '3rem',
        marginTop: '4rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Col 1: Bio & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                SK
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                Srikant
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Crafting resilient, low-latency user interfaces for frontier AI models and autonomous agent workflows. Capstone submission for the <strong>FlyRank AI Frontend Engineer Internship</strong>.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pulse-beacon pulse-beacon-emerald" />
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                {PERSONAL_INFO.availability}
              </span>
            </div>
          </div>

          {/* Col 2: AI Stack & Links */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AI Stack Pillars
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>⚡ Ultra-Low Latency Token Streaming</li>
              <li>🤖 Multi-Agent Graph Orchestration (LangGraph)</li>
              <li>🔍 Hybrid Vector & BM25 Knowledge Retrieval</li>
              <li>🛡️ Offline Resilience & Backpressure UX</li>
              <li>📊 Client AI Telemetry & Observability</li>
            </ul>
          </div>

          {/* Col 3: Direct Action & Contact */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect & Ship
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                onClick={handleCopyEmail}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
              >
                {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Mail size={16} />}
                <span>{copied ? 'Email Copied to Clipboard!' : PERSONAL_INFO.email}</span>
              </button>

              <button
                onClick={onOpenAgent}
                className="btn btn-primary btn-sm"
                style={{ justifyContent: 'flex-start', gap: '0.6rem' }}
              >
                <Bot size={16} />
                <span>Launch Autonomous Brand Agent</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'color 150ms ease',
                }}
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'color 150ms ease',
                }}
                title="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            Built with React 19, TypeScript, and AI Design Tokens. Designed for FlyRank AI.
          </div>
          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-cyan)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
