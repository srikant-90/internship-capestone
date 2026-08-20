# 🚀 Srikant | AI Frontend Engineer & Autonomous Personal Agent
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

2. **Featured Flagship AI Projects**:
   - **AuraBrand & Personal AI Agent**: Live capstone personal brand platform with dual-mode autonomous streaming agent and active network resilience failure-injection sandbox.
   - **AgentForge Studio**: Multi-agent cyclic DAG visualizer with human-in-the-loop approval gates.
   - **CognitiveSearch RAG Flow**: Hybrid semantic + keyword search with Reciprocal Rank Fusion (RRF) and dynamic citation highlighter.
   - **StreamPulse AI Terminal**: 120 FPS zero-jank token streaming client with backpressure control.
   - **PromptLab Studio**: Automated prompt evaluation and adversarial injection fuzzing workbench.

3. **Shipped Autonomous Personal Brand Agent ("DevAgent")**:
   - **Autonomous Tool Invocation**: Live handlers for `search_projects`, `get_ai_stack_info`, `check_availability`, `generate_code`, and `evaluate_fit`.
   - **Dual-Mode Engine**:
     - *Default Smart Autonomous Engine*: High-fidelity simulated reasoning with rich tool execution and candidate resume database (zero API keys required).
     - *Live LLM Streaming*: Switchable live connection to **Groq, OpenRouter, or OpenAI** streaming SSE directly to the browser.
   - **Token Streaming UI**: Markdown syntax highlighter, interactive code blocks with one-click copy, and abortable generation.

4. **Enterprise Network Resilience & Offline Error Handling**:
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
│   │   ├── portfolioData.ts     # Srikant bio, pillars, timeline & stats
│   │   ├── aiStackData.ts       # 5-layer AI stack curriculum & code snippets
│   │   ├── projectsData.ts      # Flagship applications & architectures
│   │   └── agentKnowledge.ts   # Srikant knowledge base & tool schemas
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

### Installation
```bash
# Clone the repository
git clone https://github.com/srikant-90/internship-capestone.git

# Navigate to project directory
cd internship-capestone

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

## 📄 License

MIT License. Designed and engineered by **Srikant** for the **FlyRank AI Frontend Engineer Internship** application.
