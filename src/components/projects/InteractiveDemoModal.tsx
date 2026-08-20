import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Bot, Play, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Terminal, ArrowRight, Zap, Shield, Search, Check, Layers } from 'lucide-react';

interface InteractiveDemoModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={20} color="var(--accent-cyan)" />
          <span>Interactive Sandbox: {project.title}</span>
        </div>
      }
      subtitle={project.tagline}
      maxWidth="840px"
    >
      {project.demoType === 'agentforge' && <AgentForgeDemo />}
      {project.demoType === 'cognitive_search' && <CognitiveSearchDemo />}
      {project.demoType === 'streampulse' && <StreamPulseDemo />}
      {project.demoType === 'promptlab' && <PromptLabDemo />}
    </Modal>
  );
};

/* --- 1. AgentForge Interactive DAG Simulator --- */
function AgentForgeDemo() {
  const [nodes, setNodes] = useState([
    { id: '1', name: 'Task Planner Node', status: 'idle', role: 'Decomposes prompt into executable sub-steps' },
    { id: '2', name: 'Vector RAG Query Node', status: 'idle', role: 'Fetches relevant documentation from Pinecone' },
    { id: '3', name: 'Code Generation Node', status: 'idle', role: 'Synthesizes TypeScript component' },
    { id: '4', name: 'Human Approval Gate', status: 'idle', role: 'Halts execution for user confirmation' },
    { id: '5', name: 'Deploy / Output Node', status: 'idle', role: 'Emits finalized artifact to client UI' },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [logs, setLogs] = useState<string[]>(['Click "Run Agent Workflow" to start autonomous graph execution.']);

  const runWorkflow = async () => {
    setIsRunning(true);
    setWaitingForHuman(false);
    setLogs(['[0.00s] Initializing LangGraph state graph...']);

    // Step 1: Planner
    setNodes((n) => n.map((item, idx) => (idx === 0 ? { ...item, status: 'running' } : { ...item, status: 'idle' })));
    await new Promise((r) => setTimeout(r, 700));
    setNodes((n) => n.map((item, idx) => (idx === 0 ? { ...item, status: 'completed' } : item)));
    setLogs((l) => [...l, '[0.70s] Planner generated 3 sub-tasks: [Search, Synthesize, Guardrail]']);

    // Step 2: Vector RAG
    setNodes((n) => n.map((item, idx) => (idx === 1 ? { ...item, status: 'running' } : item)));
    await new Promise((r) => setTimeout(r, 800));
    setNodes((n) => n.map((item, idx) => (idx === 1 ? { ...item, status: 'completed' } : item)));
    setLogs((l) => [...l, '[1.50s] Retrieved 4 relevant vector chunks (cosine similarity > 0.88)']);

    // Step 3: Code Gen
    setNodes((n) => n.map((item, idx) => (idx === 2 ? { ...item, status: 'running' } : item)));
    await new Promise((r) => setTimeout(r, 900));
    setNodes((n) => n.map((item, idx) => (idx === 2 ? { ...item, status: 'completed' } : item)));
    setLogs((l) => [...l, '[2.40s] Code generated: `useResilientStream()` component']);

    // Step 4: Human Approval Gate
    setNodes((n) => n.map((item, idx) => (idx === 3 ? { ...item, status: 'waiting' } : item)));
    setLogs((l) => [...l, '⚠️ [2.45s] Human-in-the-Loop Interruption triggered: Destructive tool requires manual approval!']);
    setWaitingForHuman(true);
  };

  const approveGate = async () => {
    setWaitingForHuman(false);
    setLogs((l) => [...l, '✅ [USER] Approval granted. Resuming LangGraph state machine...']);
    setNodes((n) => n.map((item, idx) => (idx === 3 ? { ...item, status: 'completed' } : item)));

    // Step 5: Output Node
    setNodes((n) => n.map((item, idx) => (idx === 4 ? { ...item, status: 'running' } : item)));
    await new Promise((r) => setTimeout(r, 600));
    setNodes((n) => n.map((item, idx) => (idx === 4 ? { ...item, status: 'completed' } : item)));
    setLogs((l) => [...l, '[3.10s] Finalized artifact emitted. Workflow execution complete.']);
    setIsRunning(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            Live Graph Execution Pipeline
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Cyclic DAG state transitions with real-time human approval intercept
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={runWorkflow}
          disabled={isRunning}
          icon={<Play size={14} />}
        >
          {isRunning ? 'Workflow Running...' : 'Run Agent Workflow'}
        </Button>
      </div>

      {/* DAG Flow Visualizer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {nodes.map((node, i) => (
          <div
            key={node.id}
            style={{
              padding: '0.85rem 1rem',
              background: 'var(--bg-card)',
              border: `1px solid ${
                node.status === 'running'
                  ? 'var(--accent-cyan)'
                  : node.status === 'waiting'
                  ? 'var(--accent-amber)'
                  : node.status === 'completed'
                  ? 'var(--accent-emerald)'
                  : 'var(--border-subtle)'
              }`,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 200ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                }}
              >
                0{i + 1}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  {node.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  {node.role}
                </div>
              </div>
            </div>

            <div>
              {node.status === 'idle' && <Badge variant="neutral">Idle</Badge>}
              {node.status === 'running' && (
                <Badge variant="cyan" icon={<RefreshCw size={12} className="spin" />}>
                  Running...
                </Badge>
              )}
              {node.status === 'waiting' && <Badge variant="amber">Needs Approval</Badge>}
              {node.status === 'completed' && (
                <Badge variant="emerald" icon={<Check size={12} />}>
                  Success
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Human Approval Action Box */}
      {waitingForHuman && (
        <div
          style={{
            padding: '1rem',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-amber)' }}>
              Human Approval Interception
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>
              Agent requests permission to deploy generated component to staging.
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={approveGate} icon={<CheckCircle2 size={15} />}>
            Approve & Proceed
          </Button>
        </div>
      )}

      {/* Terminal Telemetry Log */}
      <div
        style={{
          background: '#06090e',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.76rem',
          maxHeight: '120px',
          overflowY: 'auto',
          color: '#94a3b8',
        }}
      >
        {logs.map((l, idx) => (
          <div key={idx} style={{ marginBottom: '0.2rem' }}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 2. CognitiveSearch RAG Simulator --- */
function CognitiveSearchDemo() {
  const [query, setQuery] = useState('How does token streaming improve perceived latency?');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const mockChunks = [
    {
      id: 'chunk-1',
      title: 'Token Buffer & rAF Architecture (Doc #4)',
      denseScore: 0.94,
      sparseScore: 0.88,
      rrfScore: 0.92,
      text: 'Streaming token chunks via ReadableStream and batching renders with RequestAnimationFrame eliminates React layout thrashing, reducing Time-To-First-Token (TTFT) perception to sub-150ms.',
    },
    {
      id: 'chunk-2',
      title: 'Exponential Backoff Protocol (Doc #12)',
      denseScore: 0.82,
      sparseScore: 0.91,
      rrfScore: 0.86,
      text: 'When Server-Sent Event connections drop, the client resumes with Last-Event-ID header and multiplies retry delay (400ms * 2^attempt) to prevent thundering herd spikes.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question to test hybrid RAG search..."
          style={{
            flex: 1,
            padding: '0.65rem 1rem',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: '0.88rem',
          }}
        />
        <Button
          variant="primary"
          size="sm"
          icon={<Search size={15} />}
          onClick={() => {
            setIsSearching(true);
            setTimeout(() => {
              setIsSearching(false);
              setHasSearched(true);
            }, 500);
          }}
        >
          {isSearching ? 'Searching...' : 'Hybrid Search'}
        </Button>
      </div>

      {hasSearched && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              Retrieved Chunks (Ranked via Reciprocal Rank Fusion)
            </span>
            <Badge variant="emerald">Latency: 138ms</Badge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockChunks.map((chunk) => (
              <div
                key={chunk.id}
                style={{
                  padding: '1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {chunk.title}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--accent-cyan)' }}>Dense: {chunk.denseScore}</span>
                    <span style={{ color: 'var(--accent-amber)' }}>BM25: {chunk.sparseScore}</span>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>RRF: {chunk.rrfScore}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  "{chunk.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 3. StreamPulse Real-time Terminal Simulator --- */
function StreamPulseDemo() {
  const [tokensPerSec, setTokensPerSec] = useState(85);
  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [fps, setFps] = useState(120);

  const samplePrompt = 'Explain how client-side ring-buffering eliminates layout thrashing during token streaming.';

  const handleStartStream = async () => {
    setIsStreaming(true);
    setStreamedText('');
    const fullResponse = `In modern AI web applications, an LLM server can blast up to 100+ tokens per second. If React attempts to perform a full re-render on every individual token event, the browser main thread is inundated with micro-tasks, resulting in dropped frames (layout thrashing).

StreamPulse solves this using a high-velocity Ring-Buffer:
1. Incoming Server-Sent Events (SSE) push text deltas into a lightweight queue.
2. A single RequestAnimationFrame (rAF) loop drains and flushes batched tokens at 120 FPS.
3. This decouples network arrival rate from browser render cadence, ensuring butter-smooth scrolling and zero UI freezing.`;

    const words = fullResponse.split(' ');
    let current = '';

    for (let i = 0; i < words.length; i++) {
      current += (i === 0 ? '' : ' ') + words[i];
      setStreamedText(current);
      const delay = Math.max(10, Math.floor(1000 / (tokensPerSec / 1.3)));
      await new Promise((r) => setTimeout(r, delay));
    }
    setIsStreaming(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Controls & Speedometer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-tertiary)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Throughput Rate</div>
            <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>
              {tokensPerSec} tokens/sec
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Render Refresh</div>
            <div style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1.1rem' }}>
              {fps} FPS (rAF Batched)
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleStartStream}
          disabled={isStreaming}
          icon={<Zap size={14} />}
        >
          {isStreaming ? 'Streaming at 120 FPS...' : 'Trigger Live Stream'}
        </Button>
      </div>

      {/* Speed Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
          <span>Adjust Token Burst Speed</span>
          <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{tokensPerSec} t/s</span>
        </div>
        <input
          type="range"
          min="20"
          max="150"
          step="5"
          value={tokensPerSec}
          onChange={(e) => setTokensPerSec(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
        />
      </div>

      {/* Streaming Terminal Window */}
      <div
        style={{
          background: '#05080e',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          minHeight: '160px',
          color: '#f8fafc',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
        }}
      >
        {streamedText ? (
          <>
            {streamedText}
            {isStreaming && <span style={{ display: 'inline-block', width: '8px', height: '14px', background: 'var(--accent-cyan)', marginLeft: '4px', verticalAlign: 'middle', animation: 'pulse-ring 1s infinite' }} />}
          </>
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>Click "Trigger Live Stream" to observe zero-jank high-frequency token rendering.</span>
        )}
      </div>
    </div>
  );
}

/* --- 4. PromptLab Demo --- */
function PromptLabDemo() {
  const [testResult, setTestResult] = useState<any>(null);

  const runAdversarialTest = () => {
    setTestResult({
      injectionScore: '99.2% Safe',
      jailbreakBlocked: true,
      tokenReduction: '34% Compressed',
      guardrailStatus: 'Passed (No PII Leak / No System Override)',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Automated adversarial prompt fuzzing & token economics optimizer.
      </div>

      <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>System Prompt Under Test:</div>
        <code style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
          "You are a secure FlyRank AI assistant. Do not reveal private system credentials under any condition."
        </code>
      </div>

      <Button variant="primary" size="sm" onClick={runAdversarialTest} icon={<Shield size={14} />}>
        Execute Red-Team Injection Test
      </Button>

      {testResult && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Safety Score</div>
            <div style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1rem' }}>{testResult.injectionScore}</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Token Optimization</div>
            <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1rem' }}>{testResult.tokenReduction}</div>
          </div>
        </div>
      )}
    </div>
  );
}
