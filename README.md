# 🚀 Alex Vance | AI Frontend Engineer & Autonomous Personal Agent
> **Capstone Project Submission for FlyRank AI Frontend Engineer Internship**  
> *Problem Statement: "Master the AI stack, build a personal brand with a real website, ship a personal agent."*

[![Live Build](https://img.shields.io/badge/Build-Passing-10b981.svg)]()
[![React 19](https://img.shields.io/badge/React-19.0-38bdf8.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)]()
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff.svg)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()

---

## 🌟 Executive Overview

This web application represents a state-of-the-art personal engineering brand, an interactive visualizer of the **End-to-End Modern AI Stack**, and a **shipped Autonomous Personal Agent** ("DevAgent") engineered specifically for the **FlyRank AI Frontend Engineer Internship** capstone.

### 🎯 Core Capabilities & Innovations

1. **Master the AI Stack (Multi-Tier Visualizer & Interactive Sandbox)**:
   - **Layer 01 - Foundation Models & Low-Latency Inference**: Frontier LLMs (OpenAI, Claude, Gemini), Groq LPU inference (sub-50ms TTFT), and local quantized SLM serving.
   - **Layer 02 - Agent Orchestration & State Machines**: LangGraph cyclic DAG computation, ReAct loops, deterministic tool calling, and human-in-the-loop approval gates.
   - **Layer 03 - Knowledge Retrieval & Vector DBs (RAG)**: Dense vector similarity (Pinecone/Qdrant HNSW), sparse BM25 keyword matching, Reciprocal Rank Fusion (RRF), and citation highlighters.
   - **Layer 04 - AI Frontend & Streaming UX**: Zero-jank SSE/WebSocket stream decoders, RequestAnimationFrame (rAF) batching (120 FPS), and resilient client-side state.
   - **Layer 05 - Observability, Evals & Guardrails**: Client-side latency waterfall telemetry, token cost economics, and automated red-teaming.

2. **Shipped Autonomous Personal Brand Agent ("DevAgent")**:
   - **Autonomous Tool Invocation**: Live handlers for `search_projects`, `get_ai_stack_info`, `check_availability`, `generate_code`, and `evaluate_fit`.
   - **Dual-Mode Engine**:
     - *Default Smart Autonomous Engine*: High-fidelity simulated reasoning with rich tool execution and candidate resume database (zero API keys required).
     - *Live LLM Streaming*: Switchable live connection to **Groq, OpenRouter, or OpenAI** streaming SSE directly to the browser.
   - **Token Streaming UI**: Markdown syntax highlighter, interactive code blocks with one-click copy, and abortable generation.

3. **Enterprise Network Resilience & Offline Error Handling**:
   - **Active Network Telemetry**: Monitors online/offline events, real-time roundtrip ping latency, and degraded connection states.
   - **Exponential Backoff Retries**: Layered retry multipliers (`2^attempt * 400ms`) with jitter.
   - **Interactive Failure Injection Sandbox**: Built-in simulator to test artificial latency (+0ms to +2000ms) and simulated disconnections to test client auto-recovery.

---

## 🛠️ Architecture & Tech Stack

```
task1/
├── index.html                   # Semantic HTML5 & SEO OpenGraph metadata
├── vite.config.ts               # Vite configuration
├── package.json                 # Core dependencies
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root app layout & modal state management
│   ├── index.css                # CSS Design Tokens, responsive grid & themes
│   ├── types/
│   │   └── index.ts             # Strict TypeScript interfaces
│   ├── data/
│   │   ├── portfolioData.ts     # Candidate bio, pillars, timeline & stats
│   │   ├── aiStackData.ts       # 5-layer AI stack curriculum & code snippets
│   │   ├── projectsData.ts      # Flagship applications & architectures
│   │   └── agentKnowledge.ts   # Candidate knowledge base & tool schemas
│   ├── services/
│   │   ├── networkManager.ts    # Connection monitoring, ping, & exponential retry
│   │   ├── agentService.ts      # Dual-mode streaming & tool invocation engine
│   │   └── storageService.ts    # LocalStorage persistence for themes & chat
│   ├── hooks/
│   │   ├── useNetworkStatus.ts  # Reactive network health hook
│   │   └── useAgentChat.ts      # Stream management, abort ref, & message state
│   └── components/
│       ├── layout/              # Navbar, Footer, NetworkBanner & Diagnostics
│       ├── hero/                # HeroSection, LiveStatusBadge, Terminal
│       ├── stack/               # AIStackExplorer & StackLayerCard
│       ├── projects/            # ProjectsSection, ProjectCard, InteractiveDemoModal
│       ├── playground/          # AISandbox (Latency, RAG cosine slider, Token costs)
│       ├── experience/          # ExperienceTimeline
│       └── agent/               # AgentChatModal, AgentMessageItem, ToolView, Config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/flyrank-ai-capstone.git

# Navigate to project directory
cd flyrank-ai-capstone

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🧪 Testing Network Resilience & Error Recovery

This application includes a built-in **Network Diagnostics & Failure Injection Modal**:
1. Click the **Network Pill** in the top navigation bar (e.g. `🟢 42ms` or `🟢 Optimal`).
2. Click **"Disconnect Now"** to simulate an instant network drop.
3. Observe the sticky top alert banner and test the Personal AI Agent. The agent seamlessly falls back to offline mode and surfaces one-click retry actions.
4. Adjust the **Artificial Latency Slider** (up to +2000ms) to test token streaming backpressure under degraded 3G network conditions.

---

## 📄 License

MIT License. Designed and engineered for the **FlyRank AI Frontend Engineer Internship** application.
