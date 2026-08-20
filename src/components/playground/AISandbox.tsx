import React, { useState } from 'react';
import { Sparkles, Zap, Database, DollarSign, Play, RefreshCw, Layers, Check, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const AISandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'streaming' | 'rag' | 'cost'>('streaming');

  return (
    <section id="sandbox" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Interactive Playground</span>
          </div>
          <h2 className="section-title">
            AI Engineering <span style={{ color: 'var(--accent-cyan)' }}>Sandbox</span>
          </h2>
          <p className="section-subtitle">
            Experiment live with streaming token perception, RAG vector similarity thresholds, and token economics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveTab('streaming')}
            className={`btn ${activeTab === 'streaming' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Zap size={16} />
            <span>Streaming vs Blocking Latency</span>
          </button>

          <button
            onClick={() => setActiveTab('rag')}
            className={`btn ${activeTab === 'rag' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Database size={16} />
            <span>Vector Distance & Context Ingestion</span>
          </button>

          <button
            onClick={() => setActiveTab('cost')}
            className={`btn ${activeTab === 'cost' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <DollarSign size={16} />
            <span>Token Economics Calculator</span>
          </button>
        </div>

        {/* Playground Container */}
        <div className="glass-card" style={{ padding: '2rem', maxWidth: '920px', margin: '0 auto' }}>
          {activeTab === 'streaming' && <StreamingPlayground />}
          {activeTab === 'rag' && <RAGPlayground />}
          {activeTab === 'cost' && <CostPlayground />}
        </div>
      </div>
    </section>
  );
};

/* --- 1. Streaming vs Blocking Latency Simulator --- */
function StreamingPlayground() {
  const [streamingProgress, setStreamingProgress] = useState(0);
  const [blockingProgress, setBlockingProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [blockingText, setBlockingText] = useState('');

  const runComparison = async () => {
    setIsSimulating(true);
    setStreamingProgress(0);
    setBlockingProgress(0);
    setStreamText('');
    setBlockingText('');

    const fullMessage = 'FlyRank AI empowers businesses to dominate search rankings with high-velocity, autonomous AI agent infrastructure.';
    const words = fullMessage.split(' ');

    // Start Streaming Simulation (Immediate first token in 150ms)
    setTimeout(async () => {
      let current = '';
      for (let i = 0; i < words.length; i++) {
        current += (i === 0 ? '' : ' ') + words[i];
        setStreamText(current);
        setStreamingProgress(Math.round(((i + 1) / words.length) * 100));
        await new Promise((r) => setTimeout(r, 70));
      }
    }, 150);

    // Blocking Simulation (Waits 2.2 seconds before emitting anything)
    setTimeout(() => {
      setBlockingProgress(100);
      setBlockingText(fullMessage);
      setIsSimulating(false);
    }, 2200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Perceived Latency: Streaming SSE vs Traditional JSON Blocking
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Observe why Time-To-First-Token (TTFT) transforms user experience from sluggish to instant.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={runComparison} disabled={isSimulating} icon={<Play size={14} />}>
          {isSimulating ? 'Simulating Latency...' : 'Run Side-by-Side Test'}
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Streaming Column */}
        <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.92rem' }}>
              ⚡ Modern SSE Token Stream
            </span>
            <Badge variant="cyan">TTFT: 140ms</Badge>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${streamingProgress}%`, background: 'var(--accent-cyan)', transition: 'width 80ms linear' }} />
          </div>
          <div style={{ minHeight: '90px', background: '#05080e', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#e2e8f0', lineHeight: 1.5 }}>
            {streamText || <span style={{ color: 'var(--text-muted)' }}>Waiting for test execution...</span>}
          </div>
        </div>

        {/* Blocking Column */}
        <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              ⏳ Traditional HTTP JSON (Blocking)
            </span>
            <Badge variant="neutral">Wait: 2200ms</Badge>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${blockingProgress}%`, background: 'var(--accent-amber)', transition: 'width 2200ms linear' }} />
          </div>
          <div style={{ minHeight: '90px', background: '#05080e', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#e2e8f0', lineHeight: 1.5 }}>
            {blockingText || (
              <span style={{ color: 'var(--text-muted)' }}>
                {isSimulating ? '⏳ Waiting for complete server synthesis (2200ms)...' : 'Waiting for test execution...'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 2. RAG Vector Distance & Context Ingestion Playground --- */
function RAGPlayground() {
  const [similarityThreshold, setSimilarityThreshold] = useState(0.8);

  const chunks = [
    { id: '1', title: 'Agent Graph State Machine', similarity: 0.94, text: 'LangGraph uses a state-centric cyclic graph where each node represents an LLM reasoning step or tool execution.' },
    { id: '2', title: 'SSE Stream Ring-Buffer', similarity: 0.88, text: 'Decoupling SSE chunk arrival from React render loop using RequestAnimationFrame ensures 120 FPS.' },
    { id: '3', title: 'Vector Quantization HNSW', similarity: 0.82, text: 'Hierarchical Navigable Small World graphs enable sub-linear nearest neighbor retrieval across millions of vectors.' },
    { id: '4', title: 'Legacy SQL ORM Schema', similarity: 0.65, text: 'Relational table indexing using B-Trees and composite primary keys for traditional transactional queries.' },
  ];

  const injectedChunks = chunks.filter((c) => c.similarity >= similarityThreshold);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Vector Cosine Similarity & Dynamic Prompt Context Injection
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Adjust the cosine similarity threshold to observe which candidate chunks are accepted into the LLM context window.
        </p>
      </div>

      {/* Slider */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            Cosine Similarity Acceptance Threshold (min \(\cos \theta\))
          </span>
          <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
            {similarityThreshold.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0.60"
          max="0.95"
          step="0.02"
          value={similarityThreshold}
          onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          <span>0.60 (Permissive / High Noise)</span>
          <span>0.80 (Optimal Balance)</span>
          <span>0.95 (Strict / High Precision)</span>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <span>Evaluated Chunks ({injectedChunks.length} Injected into Prompt Context)</span>
        </div>
        {chunks.map((chunk) => {
          const isIncluded = chunk.similarity >= similarityThreshold;
          return (
            <div
              key={chunk.id}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isIncluded ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-tertiary)',
                border: `1px solid ${isIncluded ? 'rgba(16, 185, 129, 0.35)' : 'var(--border-subtle)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: isIncluded ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {chunk.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: isIncluded ? 'var(--text-secondary)' : 'var(--text-muted)', marginTop: '0.2rem' }}>
                  "{chunk.text}"
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <Badge variant={isIncluded ? 'emerald' : 'neutral'}>
                  \(\cos \theta\): {chunk.similarity}
                </Badge>
                <div style={{ fontSize: '0.72rem', marginTop: '0.2rem', color: isIncluded ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: 600 }}>
                  {isIncluded ? 'INJECTED' : 'FILTERED'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- 3. Token Economics Playground --- */
function CostPlayground() {
  const [monthlyQueries, setMonthlyQueries] = useState(500000);
  const [avgPromptTokens, setAvgPromptTokens] = useState(800);
  const [avgOutputTokens, setAvgOutputTokens] = useState(300);

  // Approximate pricing per 1M tokens:
  // Llama 3.3 70B (Groq): $0.59 / 1M prompt, $0.79 / 1M output
  // GPT-4o: $2.50 / 1M prompt, $10.00 / 1M output
  const promptTokensM = (monthlyQueries * avgPromptTokens) / 1000000;
  const outputTokensM = (monthlyQueries * avgOutputTokens) / 1000000;

  const groqCost = Math.round(promptTokensM * 0.59 + outputTokensM * 0.79);
  const gpt4oCost = Math.round(promptTokensM * 2.5 + outputTokensM * 10.0);
  const savings = Math.round(gpt4oCost - groqCost);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          LLM Token Throughput & Cost Economics Model
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Calculate monthly inference expense and see the impact of choosing high-velocity inference engines like Groq LPU vs standard frontier models.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Monthly Queries</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {monthlyQueries.toLocaleString()}
          </div>
          <input
            type="range"
            min="50000"
            max="2000000"
            step="50000"
            value={monthlyQueries}
            onChange={(e) => setMonthlyQueries(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Avg Input Tokens / Query</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {avgPromptTokens} tokens
          </div>
          <input
            type="range"
            min="200"
            max="3000"
            step="100"
            value={avgPromptTokens}
            onChange={(e) => setAvgPromptTokens(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Avg Output Tokens / Query</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {avgOutputTokens} tokens
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={avgOutputTokens}
            onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
        </div>
      </div>

      {/* Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div style={{ padding: '1.25rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Groq LPU (Llama 3.3 70B)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.3rem' }}>
            ${groqCost.toLocaleString()} / mo
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Sub-150ms TTFT • High throughput token bursts
          </div>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Standard Frontier Model (GPT-4o)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
            ${gpt4oCost.toLocaleString()} / mo
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', marginTop: '0.2rem', fontWeight: 600 }}>
            Estimated Monthly Savings with Groq: ${savings.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
