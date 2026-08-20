import { AIStackLayer } from '../types';

export const AI_STACK_LAYERS: AIStackLayer[] = [
  {
    id: 'layer-1',
    number: '01',
    title: 'Foundation Models & Inference Engines',
    subtitle: 'High-throughput LLMs, Small Specialized SLMs & Model Serving',
    iconName: 'Cpu',
    technologies: [
      { name: 'OpenAI / Claude 3.5 / Gemini 1.5 Pro', level: 'Expert', description: 'Frontier reasoning, function calling, multimodal token inputs, long-context window management.' },
      { name: 'Groq / Cerebras / Together AI', level: 'Expert', description: 'Ultra-fast LPU inference, sub-50ms TTFT (Time-To-First-Token) for real-time interactive voice/agent interfaces.' },
      { name: 'vLLM / Ollama / Local GGUF', level: 'Advanced', description: 'Quantized on-device model serving, PagedAttention, KV-cache optimization, local privacy workflows.' },
    ],
    keyConcepts: [
      'KV Caching & Token Throughput',
      'Structured Outputs & JSON Schema Validation',
      'Function / Tool Calling Protocols',
      'Speculative Decoding & Latency Optimization',
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Structured Output & Function Calling Schema',
      code: `// Define deterministic tool schema for frontend-driven LLM execution
export const WeatherToolDefinition = {
  name: 'get_system_metrics',
  description: 'Retrieve real-time latency, throughput, and error rates of AI services',
  parameters: {
    type: 'object',
    properties: {
      serviceId: { type: 'string', enum: ['rag-vector-db', 'agent-orchestrator', 'inference-gateway'] },
      metricsWindow: { type: 'string', enum: ['1m', '5m', '1h'] }
    },
    required: ['serviceId']
  }
} as const;`,
    },
    frontendRelevance: 'Frontend engineers must format deterministic tool schemas, parse streaming JSON deltas, and handle model degradation gracefully without breaking component render trees.',
  },
  {
    id: 'layer-2',
    number: '02',
    title: 'Agent Frameworks & Orchestration',
    subtitle: 'State Machines, Autonomous Loops & Multi-Agent Teams',
    iconName: 'Bot',
    technologies: [
      { name: 'LangGraph / State Machines', level: 'Expert', description: 'Cyclic graph computation, checkpointing, multi-turn state persistence, human-in-the-loop interruption.' },
      { name: 'LlamaIndex / LangChain Core', level: 'Expert', description: 'Document indexing, structured data extraction, tool binding, dynamic chain composability.' },
      { name: 'CrewAI / AutoGen Multi-Agent', level: 'Advanced', description: 'Hierarchical agent role-playing, inter-agent message passing, task delegation pipelines.' },
    ],
    keyConcepts: [
      'ReAct (Reason + Act) Loop Cycle',
      'State Checkpointing & Resume Capabilities',
      'Human-in-the-loop Approval Gates',
      'Tool Execution Sandbox & Idempotency',
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Human-In-The-Loop Agent State Transition',
      code: `// Resumable agent loop with frontend confirmation approval
interface AgentGraphState {
  messages: BaseMessage[];
  pendingActions: ToolCall[];
  requiresHumanApproval: boolean;
  approvalStatus?: 'approved' | 'rejected' | 'modified';
}

export async function processAgentStep(state: AgentGraphState) {
  if (state.pendingActions.some(a => a.name === 'execute_mutation')) {
    return { ...state, requiresHumanApproval: true }; // Pause & yield to UI
  }
  return executeAutonomousGraph(state);
}`,
    },
    frontendRelevance: 'Enables interactive agent visualizers where users can inspect thought steps, review pending actions before approval, and retry isolated failed graph nodes.',
  },
  {
    id: 'layer-3',
    number: '03',
    title: 'Knowledge Retrieval & Vector Stores (RAG)',
    subtitle: 'Semantic Embeddings, Hybrid Search & Context Expansion',
    iconName: 'Database',
    technologies: [
      { name: 'Pinecone / Qdrant / ChromaDB', level: 'Expert', description: 'HNSW indexing, metadata filtering, scalable vector similarity search, cosine / dot product distance.' },
      { name: 'Hybrid BM25 + Dense Search', level: 'Expert', description: 'Combining reciprocal rank fusion (RRF) with dense vector embeddings for precision and recall.' },
      { name: 'Cohere Rerank / Cross-Encoders', level: 'Advanced', description: 'Post-retrieval re-ranking to optimize context window relevance and eliminate noise.' },
    ],
    keyConcepts: [
      'Semantic Chunking Strategies (Parent-Child, Recursive)',
      'Vector Distance Metrics & Cosine Similarity',
      'Reciprocal Rank Fusion (RRF)',
      'Citation Mapping & Source Attribution',
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Hybrid Search Fusion & Citation Mapper',
      code: `// Compute Reciprocal Rank Fusion (RRF) for Hybrid Retrieval
export function computeRRF(
  denseResults: ScoredChunk[], 
  sparseResults: ScoredChunk[], 
  k = 60
): ScoredChunk[] {
  const scoreMap = new Map<string, { chunk: ScoredChunk; score: number }>();
  
  const addRank = (results: ScoredChunk[]) => {
    results.forEach((item, rank) => {
      const prev = scoreMap.get(item.id)?.score || 0;
      const score = prev + (1 / (k + rank + 1));
      scoreMap.set(item.id, { chunk: item, score });
    });
  };

  addRank(denseResults);
  addRank(sparseResults);
  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .map(x => ({ ...x.chunk, relevanceScore: x.score }));
}`,
    },
    frontendRelevance: 'Powering real-time citation cards, side-by-side source document highlighting, relevance score badges, and interactive confidence gauges.',
  },
  {
    id: 'layer-4',
    number: '04',
    title: 'AI Frontend & Streaming UX',
    subtitle: 'Server-Sent Events, Token Parsers & Resilient Client State',
    iconName: 'Layout',
    technologies: [
      { name: 'SSE & WebSockets Streaming', level: 'Expert', description: 'Fetch ReadableStream, EventSource readers, chunk buffering, auto-reconnect with packet sequence recovery.' },
      { name: 'Vercel AI SDK / Custom Adapters', level: 'Expert', description: 'useChat, useCompletion, streaming UI elements, generative UI components, micro-syntax parser.' },
      { name: 'Dynamic Generative UI & Artifacts', level: 'Expert', description: 'Rendering interactive widgets, code execution sandboxes, and charts on-the-fly from agent responses.' },
    ],
    keyConcepts: [
      'Time-To-First-Token (TTFT) Perception Smoothing',
      'Backpressure Handling & Chunk Delimiters',
      'Optimistic Local UI State Mutation',
      'Offline Resilience & Exponential Retry Backoff',
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Resilient SSE Stream Decoder with Exponential Backoff',
      code: `// Resilient stream consumer with sequence recovery
export async function* consumeAIStream(
  url: string, 
  payload: object,
  signal: AbortSignal,
  retryCount = 3
): AsyncGenerator<string, void, unknown> {
  let attempt = 0;
  while (attempt < retryCount) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal
      });
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('ReadableStream unsupported');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield decoder.decode(value, { stream: true });
      }
      return;
    } catch (err: any) {
      attempt++;
      if (attempt >= retryCount || signal.aborted) throw err;
      await new Promise(res => setTimeout(res, Math.pow(2, attempt) * 400));
    }
  }
}`,
    },
    frontendRelevance: 'The pinnacle of AI Frontend engineering: delivering jitter-free live responses, handling connection drops seamlessly, and crafting generative components that surprise and delight.',
  },
  {
    id: 'layer-5',
    number: '05',
    title: 'Observability, Evals & Guardrails',
    subtitle: 'Latency Profiling, Tracing, Hallucination Checks & Safety',
    iconName: 'Activity',
    technologies: [
      { name: 'LangSmith / OpenTelemetry Tracing', level: 'Advanced', description: 'End-to-end trace collection, token usage breakdowns, parent-child span timelines, cost tracking.' },
      { name: 'Ragas / LLM-as-a-Judge Evals', level: 'Advanced', description: 'Automated groundness, faithfulness, answer relevancy, and context recall scoring.' },
      { name: 'Guardrails AI / NeMo / Regex Filters', level: 'Expert', description: 'Prompt injection protection, PII masking, deterministic JSON verification, safety sanitization.' },
    ],
    keyConcepts: [
      'End-to-End Latency Waterfalls',
      'Token Cost & Cache Hit Ratios',
      'Adversarial Prompt Red-Teaming',
      'Client-side Telemetry & Crash Reporting',
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'Client-Side Telemetry & Trace Recorder',
      code: `// Collect real-time client interaction telemetry for AI observability
export class AIStreamTelemetry {
  private startTime = performance.now();
  private firstTokenTime?: number;
  private tokenCount = 0;

  recordToken() {
    if (!this.firstTokenTime) {
      this.firstTokenTime = performance.now() - this.startTime;
    }
    this.tokenCount++;
  }

  getMetrics() {
    const totalDuration = performance.now() - this.startTime;
    return {
      ttftMs: Math.round(this.firstTokenTime || 0),
      totalDurationMs: Math.round(totalDuration),
      tokensPerSecond: Math.round((this.tokenCount / (totalDuration / 1000)) * 10) / 10,
      totalTokens: this.tokenCount,
    };
  }
}`,
    },
    frontendRelevance: 'Surfacing transparent latency waterfalls, token cost meters, and real-time confidence scores directly in the developer experience.',
  },
];
