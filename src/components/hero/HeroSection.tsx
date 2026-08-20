import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Play, Terminal, ArrowRight, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { LiveStatusBadge } from './LiveStatusBadge';
import { Button } from '../common/Button';

interface HeroSectionProps {
  onOpenAgent: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAgent }) => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Initializing AI Stack Kernel v4.19...',
    'Mounting LangGraph Agent Executor [OK]',
    'Establishing Resilient SSE Stream Buffer [OK]',
    'Connecting Pinecone Vector Index [1536-dim HNSW] [OK]',
    'Personal AI Agent "DevAgent" online & ready.',
  ]);

  const [activePillarIndex, setActivePillarIndex] = useState(0);

  // Auto-scroll terminal effect
  useEffect(() => {
    const timer = setInterval(() => {
      const additionalLogs = [
        `Telemetry heartbeat: 120 FPS render loop healthy`,
        `RRF Rank Fusion cache hit: 0.94 score`,
        `Tool 'evaluate_fit' loaded for FlyRank AI`,
        `SSE backpressure threshold: 0 dropped tokens`,
      ];
      const randomLog = additionalLogs[Math.floor(Math.random() * additionalLogs.length)];
      setTerminalLogs((prev) => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${randomLog}`]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const pillarIcons: Record<string, React.ReactNode> = {
    Zap: <Zap size={20} color="var(--accent-cyan)" />,
    Bot: <Bot size={20} color="var(--accent-emerald)" />,
    ShieldCheck: <ShieldCheck size={20} color="var(--accent-amber)" />,
    Layout: <Layers size={20} color="var(--accent-blue)" />,
  };

  return (
    <section
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Headline & Branding */}
          <div>
            <LiveStatusBadge />

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em',
              }}
            >
              Mastering the <span style={{ color: 'var(--accent-cyan)' }}>AI Stack</span>, Shipping <span style={{ color: 'var(--accent-emerald)' }}>Autonomous Agents</span>.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '600px',
              }}
            >
              Hi, I’m <strong>{PERSONAL_INFO.name}</strong>. I bridge complex LLM reasoning, multi-agent state machines, and hybrid vector retrieval with <strong>resilient, low-latency streaming frontend interfaces</strong>.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<Bot size={20} />}
                onClick={onOpenAgent}
              >
                Chat with My AI Agent
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={<Cpu size={18} />}
                onClick={() => {
                  document.querySelector('#ai-stack')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore AI Stack
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<Play size={16} />}
                onClick={() => {
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Live Demos
              </Button>
            </div>

            {/* Quick Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      marginTop: '0.15rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Terminal & Telemetry Card */}
          <div>
            <div
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* Terminal Window Header */}
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.85rem 1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    agent-runtime@flyrank-node:~
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="pulse-beacon pulse-beacon-emerald" />
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    LIVE_STREAMING
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div
                style={{
                  padding: '1.25rem',
                  background: '#070a10',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {terminalLogs.map((log, index) => (
                  <div
                    key={index}
                    style={{
                      color: log.includes('[OK]')
                        ? 'var(--accent-emerald)'
                        : log.includes('DevAgent')
                        ? 'var(--accent-cyan)'
                        : '#94a3b8',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)' }}>❯</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Agent Quick Trigger Footer */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-card)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    Personal Brand Agent
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Trained on candidate resume, projects, and AI Stack
                  </div>
                </div>

                <Button variant="primary" size="sm" icon={<Bot size={15} />} onClick={onOpenAgent}>
                  Launch Agent
                </Button>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.85rem',
                marginTop: '1.25rem',
              }}
            >
              {PERSONAL_INFO.corePillars.map((pillar, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    borderColor: activePillarIndex === i ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  }}
                  onClick={() => setActivePillarIndex(i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    {pillarIcons[pillar.icon]}
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      {pillar.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {pillar.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
