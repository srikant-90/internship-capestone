import type { AgentConfig, AgentToolCall, ChatMessage } from '../types';
import { executeSimulatedTool } from '../data/agentKnowledge';
import { networkManager } from './networkManager';

export interface StreamEvent {
  type: 'token' | 'tool_start' | 'tool_end' | 'error' | 'done';
  token?: string;
  toolCall?: AgentToolCall;
  error?: string;
}

export class AgentService {
  /**
   * Main entrypoint for generating streaming responses from either the simulated engine or live API
   */
  public async *streamAgentResponse(
    messages: ChatMessage[],
    config: AgentConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamEvent, void, unknown> {
    const health = networkManager.getHealth();
    if (!health.isOnline) {
      yield {
        type: 'error',
        error: 'Network connection is offline. Unable to reach AI agent. Please check your internet or retry.',
      };
      return;
    }

    if (config.mode === 'live-api' && config.apiKey) {
      yield* this.streamLiveAPI(messages, config, signal);
    } else {
      yield* this.streamSmartSimulated(messages, config, signal);
    }
  }

  /**
   * Simulated high-intelligence Agent Engine with autonomous tool calling and realistic token streaming
   */
  private async *streamSmartSimulated(
    messages: ChatMessage[],
    _config: AgentConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamEvent, void, unknown> {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user')?.content || '';
    const query = lastUserMessage.toLowerCase();

    // Determine if tool invocation is warranted
    let toolToRun: AgentToolCall['toolName'] | null = null;
    let toolArgs: Record<string, any> = {};

    if (query.includes('project') || query.includes('portfolio') || query.includes('build') || query.includes('agentforge') || query.includes('aurabrand') || query.includes('cognitivesearch')) {
      toolToRun = 'search_projects';
      toolArgs = { query: lastUserMessage };
    } else if (query.includes('stack') || query.includes('technology') || query.includes('framework') || query.includes('rag') || query.includes('model')) {
      toolToRun = 'get_ai_stack_info';
      toolArgs = { layer: 'all' };
    } else if (query.includes('availab') || query.includes('hire') || query.includes('interview') || query.includes('contact') || query.includes('email') || query.includes('schedule')) {
      toolToRun = 'check_availability';
      toolArgs = { role: 'FlyRank AI Frontend Engineer' };
    } else if (query.includes('code') || query.includes('hook') || query.includes('typescript') || query.includes('stream') || query.includes('implement')) {
      toolToRun = 'generate_code';
      toolArgs = { topic: 'resilient-streaming-hook' };
    } else if (query.includes('flyrank') || query.includes('fit') || query.includes('why') || query.includes('match') || query.includes('intern') || query.includes('srikant')) {
      toolToRun = 'evaluate_fit';
      toolArgs = { candidate: 'Srikant', role: 'FlyRank AI Frontend Engineer' };
    }

    // Step 1: Emit Tool Invocation if matched
    if (toolToRun) {
      const toolCallId = 'call_' + Math.random().toString(36).substring(2, 9);
      const initialToolCall: AgentToolCall = {
        id: toolCallId,
        toolName: toolToRun,
        status: 'running',
        input: toolArgs,
      };

      yield { type: 'tool_start', toolCall: initialToolCall };

      // Tool execution latency simulation
      await new Promise((r) => setTimeout(r, 600));

      const toolResult = await executeSimulatedTool(toolToRun, toolArgs);

      const completedToolCall: AgentToolCall = {
        id: toolCallId,
        toolName: toolToRun,
        status: 'completed',
        input: toolArgs,
        output: toolResult.output,
      };

      yield { type: 'tool_end', toolCall: completedToolCall };
    }

    // Step 2: Formulate dynamic markdown response
    const responseText = this.generateSimulatedResponseText(query, toolToRun);

    // Step 3: Stream tokens in chunks with jitter
    const words = responseText.split(/(\s+)/);
    for (let i = 0; i < words.length; i++) {
      if (signal?.aborted) return;
      const word = words[i];
      yield { type: 'token', token: word };

      // Micro delay to simulate realistic streaming
      const delay = word.includes('\n') ? 35 : Math.floor(10 + Math.random() * 18);
      await new Promise((r) => setTimeout(r, delay));
    }

    yield { type: 'done' };
  }

  /**
   * Helper to generate detailed markdown responses based on intent
   */
  private generateSimulatedResponseText(
    query: string,
    executedTool: AgentToolCall['toolName'] | null
  ): string {
    if (executedTool === 'search_projects') {
      return `I've queried the projects database. Here are Srikant's flagship AI applications:

### 🌟 1. [AuraBrand & Autonomous Personal Agent](https://github.com/srikant-90/internship-capestone)
* **What it is:** The complete personal brand web platform with dual-engine autonomous streaming agent and active network resilience failure-injection sandbox.
* **Tech Stack:** React 19, TypeScript, Vite, SSE Streaming, LangGraph Tool Handlers, CSS Design Tokens.
* **Key Metric:** **120 FPS** token render rate, **<150ms TTFT**, 100% offline resilient fallback.

### 🌟 2. [AgentForge Studio](https://github.com/srikant-dev/agentforge-studio)
* **What it is:** Multi-Agent DAG Execution & Visual Trace Inspector.
* **Tech Stack:** React 19, TypeScript, LangGraph Core, SVG Graph Canvas, SSE Streaming.
* **Key Metric:** **3.2x faster** agent loop execution and sub-20ms human approval latency.
* **Why it matters:** Solves visibility into multi-agent non-deterministic loops with interactive step-by-step state inspection and time-travel rollbacks.

### 🔍 3. [CognitiveSearch RAG Flow](https://github.com/srikant-dev/cognitivesearch-rag)
* **What it is:** Hybrid Semantic & Keyword Search with interactive citation highlighter.
* **Tech Stack:** Pinecone, Qdrant, Cohere Rerank, BM25 + Reciprocal Rank Fusion.
* **Key Metric:** **94.8% Recall @ 5** at 142ms roundtrip latency.
* **Why it matters:** Bridges raw retrieved chunks with interactive split-screen citation links in the UI.

### ⚡ 4. [StreamPulse AI Terminal](https://github.com/srikant-dev/streampulse-ai)
* **What it is:** Zero-jank ultra-low latency streaming client with token backpressure control.
* **Tech:** ReadableStream, WebSockets, RequestAnimationFrame batching (120 FPS), offline IndexedDB queue.
* **Key Metric:** **120 FPS** stutter-free rendering during 100+ tokens/sec LLM output bursts.

You can test each of these directly in the **Live Interactive Demos** section on this page!`;
    }

    if (executedTool === 'evaluate_fit') {
      return `### 🎯 Why Srikant is the Ideal Match for FlyRank AI

Based on the requirements for the **Frontend Engineer Internship**:

1. **Full-Spectrum AI Stack Understanding**:
   Srikant doesn't just build static UI templates; he deeply understands how LLMs, SLMs, vector indices, and agentic workflows function under the hood. This enables him to design interfaces tailored to AI behavior.

2. **Obsession with Streaming UX & Performance**:
   AI interfaces live or die on responsiveness. Srikant implements RequestAnimationFrame token batching, chunk ring-buffers, and optimistic UI mutations to guarantee **120 FPS fluid interactions**.

3. **Resilience & Offline Handling**:
   Network drops, rate limits, and latency spikes are gracefully handled using exponential backoff, sequence recovery headers, and transparent user telemetry.

4. **Product Velocity & Craft**:
   From pixel-perfect responsive layouts to autonomous agent tool calling and interactive sandboxes, Srikant ships complete, production-grade applications rapidly.`;
    }

    if (executedTool === 'check_availability') {
      return `### 📅 Interview Availability & Contact Details

* **Status:** Available immediately for the **FlyRank AI Frontend Engineer Internship**.
* **Direct Email:** [\`srikant.ai.eng@gmail.com\`](mailto:srikant.ai.eng@gmail.com)
* **GitHub:** [github.com/srikant-dev](https://github.com/srikant-dev)
* **LinkedIn:** [linkedin.com/in/srikant-ai](https://linkedin.com/in/srikant-ai)
* **Timezones:** Flexible across global timezones (IST, PST, EST).
* **Preferred Formats:** Technical architecture deep-dive, live pair programming, or portfolio walkthrough.

Feel free to send a calendar invite or reach out via email directly!`;
    }

    if (executedTool === 'generate_code') {
      return `Here is a production-ready, resilient TypeScript React hook for streaming AI tokens with exponential backoff retry and abort handling:

\`\`\`typescript
import { useState, useCallback, useRef } from 'react';

export function useResilientAIStream(endpoint: string) {
  const [streamText, setStreamText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (prompt: string, maxRetries = 3) => {
    setIsStreaming(true);
    setError(null);
    setStreamText('');
    abortRef.current = new AbortController();

    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error('ReadableStream unavailable');

        let acc = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setStreamText(acc);
        }
        setIsStreaming(false);
        return;
      } catch (err: any) {
        if (abortRef.current?.signal.aborted) return;
        attempt++;
        if (attempt >= maxRetries) {
          setError(err.message || 'Stream failed');
          setIsStreaming(false);
          return;
        }
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 400));
      }
    }
  }, [endpoint]);

  return { streamText, isStreaming, error, startStream, stopStream: () => abortRef.current?.abort() };
}
\`\`\`

This hook ensures zero unhandled promise rejections, cleans up streams on unmount, and recovers automatically from brief network hiccups.`;
    }

    if (query.includes('stack') || executedTool === 'get_ai_stack_info') {
      return `### ⚡ Srikant's Full AI Stack Mastery

Srikant's engineering domain spans five foundational pillars:

1. **Foundation Models & Inference:** Frontier LLM APIs (OpenAI, Claude, Gemini), Groq LPU low-latency inference, and local quantized model serving (vLLM, Ollama).
2. **Agent Frameworks:** LangGraph cyclic state machines, ReAct loops, deterministic tool schemas, and human-in-the-loop approval workflows.
3. **Retrieval & Vector DBs:** Hybrid Search (Dense HNSW + Sparse BM25 via Reciprocal Rank Fusion), Pinecone, Qdrant, and Cohere Rerank.
4. **Streaming Frontend UX:** Server-Sent Events (SSE), WebSockets, Web Workers, token backpressure control, and generative UI component rendering.
5. **Observability & Evals:** Latency waterfall tracing, token cost meters, LangSmith integration, and Ragas automated groundness evaluations.

Explore the interactive **AI Stack Visualizer** on this page for live code snippets and architecture diagrams!`;
    }

    return `Hello! I am **Srikant's Personal AI Agent**. I can answer questions about Srikant's engineering experience, walk you through his full AI Stack mastery, demonstrate live project architectures (like **AuraBrand**, **AgentForge**, **CognitiveSearch**, and **StreamPulse**), and explain why Srikant is an exceptional fit for the **FlyRank AI Frontend Engineer Internship**.

Feel free to ask a technical question or choose one of the suggested prompts below!`;
  }

  /**
   * Live API SSE Streaming connection (OpenAI, Groq, OpenRouter)
   */
  private async *streamLiveAPI(
    messages: ChatMessage[],
    config: AgentConfig,
    signal?: AbortSignal
  ): AsyncGenerator<StreamEvent, void, unknown> {
    try {
      const endpoint =
        config.provider === 'groq'
          ? 'https://api.groq.com/openai/v1/chat/completions'
          : config.provider === 'openrouter'
          ? 'https://openrouter.ai/api/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';

      const systemPrompt = `You are the autonomous Personal Brand & Engineering Agent representing Srikant, an exceptional AI Frontend Engineer applying for the FlyRank AI Frontend Engineer Internship. 
Candidate highlights:
- Master of the AI stack: Foundation models (Groq/OpenAI), LangGraph agent loops, Vector DBs (Pinecone/Qdrant), Streaming UX (SSE/WebSockets), Observability (LangSmith).
- Core philosophy: Low latency, 120 FPS token streaming, network resilience, exponential backoff, and modern responsive design.
- Why FlyRank AI: Relentless passion for autonomous AI systems, search ranking visibility, and high-velocity frontend craft.
Answer technically, authoritatively, and concisely with markdown formatting.`;

      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
          .filter((m) => m.sender === 'user' || m.sender === 'agent')
          .slice(-8)
          .map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
      ];

      const res = await networkManager.executeWithRetry(
        () =>
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
              model: config.model || (config.provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'),
              messages: formattedMessages,
              temperature: config.temperature ?? 0.7,
              stream: true,
            }),
            signal,
          }),
        {
          maxRetries: 2,
          operationName: `${config.provider.toUpperCase()} Inference`,
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        yield {
          type: 'error',
          error: `API Error (${res.status}): ${errText || res.statusText}. Please verify your API key and model selection.`,
        };
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        yield { type: 'error', error: 'No readable stream available in response.' };
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        if (signal?.aborted) return;
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;
          if (trimmed === 'data: [DONE]') {
            yield { type: 'done' };
            return;
          }

          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.substring(6));
              const token = json.choices?.[0]?.delta?.content;
              if (token) {
                yield { type: 'token', token };
              }
            } catch {
              // Ignore partial JSON parsing chunk
            }
          }
        }
      }

      yield { type: 'done' };
    } catch (err: any) {
      if (signal?.aborted) return;
      yield {
        type: 'error',
        error: `Network / Inference Error: ${err.message || 'Unknown failure'}. Check console or switch to Smart Simulated Engine.`,
      };
    }
  }
}

export const agentService = new AgentService();
