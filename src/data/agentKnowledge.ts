import { AgentToolCall } from '../types';

export const AGENT_KNOWLEDGE_BASE = {
  candidateName: 'Alex Vance',
  targetRole: 'FlyRank AI Frontend Engineer Intern',
  whyFlyRank: `I am deeply inspired by FlyRank AI's vision of autonomous, high-velocity AI systems and search visibility. Frontend engineering in the modern AI era is not just about building static forms—it is about managing complex streaming states, real-time agent observability, human-in-the-loop controls, and delivering ultra-low-latency, resilient experiences. I bring hands-on mastery of the full AI stack (from token streaming and LangGraph orchestration to hybrid RAG search) and a relentless passion for crafting state-of-the-art UI architectures.`,
  strengths: [
    'Deep expertise in React 19, TypeScript, and modern responsive styling architectures.',
    'Mastery of streaming token protocols (SSE, WebSockets, ReadableStream) and render optimization (120fps batching).',
    'Experience building interactive multi-agent visualizers and state machines with LangGraph.',
    'Comprehensive understanding of RAG pipelines: dense vector search, BM25 sparse matching, and RRF rank fusion.',
    'Obsession with network resilience: offline fallbacks, exponential backoff, jitter reduction, and connection state recovery.',
  ],
  faq: [
    {
      q: 'What is your primary strength as an AI Frontend Engineer?',
      a: 'My core strength is bridging complex asynchronous AI backends (LLM inference, streaming tokens, multi-agent graphs) with ultra-smooth, responsive, and resilient frontend interfaces that feel instantaneous to the user.',
    },
    {
      q: 'How do you handle network errors and streaming drops?',
      a: 'I implement a layered resilience strategy: 1) Client-side ring-buffers for chunk assembly, 2) Automatic exponential backoff retries with jitter, 3) Transparent UI indicators that allow one-click resume without losing context, and 4) Offline IndexedDB queueing.',
    },
    {
      q: 'Can you walk me through the AI Stack you have mastered?',
      a: 'The stack spans 5 distinct layers: 1) Foundation Models & Inference (Groq/OpenAI/Gemini/vLLM), 2) Agent Frameworks & Orchestration (LangGraph, ReAct loops, tool execution), 3) Knowledge Retrieval & Vector DBs (Pinecone, Qdrant, Hybrid RAG, Cohere Rerank), 4) Streaming Frontend UX (Vercel AI SDK, ReadableStream, Generative UI), and 5) Observability & Evals (LangSmith, latency profiling, Ragas metrics).',
    },
  ],
};

export const PROMPT_SUGGESTIONS = [
  {
    label: '✨ What is your AI stack mastery?',
    prompt: 'Can you summarize your mastery across all layers of the AI stack and how you apply it to frontend engineering?',
  },
  {
    label: '🚀 Why are you the best fit for FlyRank AI?',
    prompt: 'Why do you want to join FlyRank AI as a Frontend Engineer Intern, and what unique value do you bring?',
  },
  {
    label: '🛠️ Search candidate projects',
    prompt: 'Search and summarize your top AI projects, including architecture details and key metrics.',
  },
  {
    label: '⚡ Explain streaming token resilience',
    prompt: 'How do you handle network drops, latency jitter, and token streaming in high-performance AI interfaces?',
  },
  {
    label: '📅 Check interview availability',
    prompt: 'Check Alex’s availability for an engineering interview or technical discussion with the FlyRank AI team.',
  },
  {
    label: '💻 Generate live React streaming code',
    prompt: 'Generate a production-ready TypeScript React hook for consuming resilient Server-Sent Events from an LLM.',
  },
];

export async function executeSimulatedTool(
  toolName: AgentToolCall['toolName'],
  args: Record<string, any>
): Promise<{ output: any; summary: string }> {
  switch (toolName) {
    case 'search_projects': {
      const query = (args.query || '').toLowerCase();
      const results = [
        {
          id: 'agentforge',
          name: 'AgentForge Studio',
          tagline: 'Multi-Agent DAG Execution & Visual Trace Inspector',
          metrics: '3.2x faster agent loop, <20ms human-in-loop latency',
          tags: ['React 19', 'LangGraph', 'SSE Streaming', 'DAG Canvas'],
        },
        {
          id: 'cognitivesearch',
          name: 'CognitiveSearch RAG Flow',
          tagline: 'Hybrid Semantic & Keyword Search with Citation Highlighter',
          metrics: '94.8% Recall @ 5, 142ms latency',
          tags: ['Pinecone', 'Cohere Rerank', 'Hybrid Search', 'Canvas 2D'],
        },
        {
          id: 'streampulse',
          name: 'StreamPulse AI Terminal',
          tagline: 'Zero-Jank Ultra-Low Latency Streaming Client',
          metrics: '120 FPS render, 99.9% drop recovery',
          tags: ['ReadableStream', 'WebSockets', 'Offline Resilience'],
        },
      ].filter((p) => !query || p.name.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query)));

      return {
        output: results,
        summary: `Found ${results.length} relevant projects in Alex Vance's AI engineering portfolio matching "${query || 'all'}".`,
      };
    }

    case 'get_ai_stack_info': {
      const layer = args.layer || 'all';
      return {
        output: {
          layersCovered: ['Foundation Models & Inference', 'Agent Orchestration (LangGraph)', 'Knowledge Retrieval / RAG', 'Streaming Frontend & UX', 'Observability & Evals'],
          selectedLayer: layer,
          candidateExpertise: 'Full-spectrum engineering with deep specialization in React 19, TypeScript, low-latency streaming UX, and resilient client-side state architectures.',
        },
        summary: `Retrieved AI Stack capability profile for layer: ${layer}. Candidate has production-grade proficiency across all 5 tiers.`,
      };
    }

    case 'check_availability': {
      return {
        output: {
          status: 'Available immediately',
          preferredRole: 'FlyRank AI Frontend Engineer Intern',
          timezones: ['PST / US West Coast', 'EST / US East Coast', 'UTC / Remote Flexible'],
          interviewSlots: ['Monday - Friday: 9:00 AM - 6:00 PM PST', 'Weekend slots available upon request'],
          contactEmail: 'alex.vance.ai@gmail.com',
        },
        summary: 'Alex Vance is available immediately for full-time or intern engineering roles at FlyRank AI.',
      };
    }

    case 'generate_code': {
      const topic = args.topic || 'streaming-hook';
      const code = `// Production-Grade Resilient AI Streaming Hook
import { useState, useCallback, useRef } from 'react';

export function useResilientAIStream(endpoint: string) {
  const [streamText, setStreamText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortCtrlRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (prompt: string, maxRetries = 3) => {
    setIsStreaming(true);
    setError(null);
    setStreamText('');
    
    abortCtrlRef.current = new AbortController();
    let attempt = 0;
    let accumulated = '';

    while (attempt < maxRetries) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, offset: accumulated.length }),
          signal: abortCtrlRef.current.signal,
        });

        if (!response.ok) throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error('ReadableStream unsupported');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setStreamText(accumulated);
        }
        setIsStreaming(false);
        return; // Success!
      } catch (err: any) {
        if (abortCtrlRef.current?.signal.aborted) {
          setIsStreaming(false);
          return;
        }
        attempt++;
        if (attempt >= maxRetries) {
          setError(err.message || 'Stream connection failed');
          setIsStreaming(false);
          return;
        }
        // Exponential backoff
        await new Promise(r => setTimeout(r, 400 * Math.pow(2, attempt)));
      }
    }
  }, [endpoint]);

  const stopStream = useCallback(() => {
    abortCtrlRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return { streamText, isStreaming, error, startStream, stopStream };
}`;
      return {
        output: { code, language: 'typescript', topic },
        summary: `Generated resilient React streaming hook for topic: ${topic}.`,
      };
    }

    case 'evaluate_fit': {
      return {
        output: {
          roleTarget: 'FlyRank AI Frontend Engineer Intern',
          fitScore: '98 / 100',
          keyMatches: [
            'Mastery of modern AI frontend paradigms (Streaming tokens, SSE, WebSockets)',
            'Autonomous Agent workflow design & LangGraph state machine visualization',
            'Strong TypeScript & React performance fundamentals (120fps batching, rAF)',
            'Exceptional network resilience, offline fallbacks & error handling architecture',
            'High-velocity shipping mindset with clean, self-documenting code',
          ],
        },
        summary: 'Evaluation completed: Exceptional match for FlyRank AI Frontend Engineer Internship.',
      };
    }

    default:
      return {
        output: { status: 'executed' },
        summary: `Executed tool ${toolName} successfully.`,
      };
  }
}
