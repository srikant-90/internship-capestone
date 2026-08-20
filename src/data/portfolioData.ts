import type { TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Srikant',
  role: 'AI Frontend & Autonomous Systems Engineer',
  targetRole: 'FlyRank AI Frontend Engineer Intern',
  tagline: 'Bridging LLM intelligence and high-performance, resilient user experiences.',
  bio: 'Specialized in architecting streaming AI user interfaces, agentic workflow visualizers, vector retrieval experiences, and low-latency interaction models. Focused on making complex AI systems intuitive, reactive, and resilient to network anomalies.',
  status: 'Ready to ship with FlyRank AI team',
  location: 'Bangalore, India / Remote',
  email: 'srikant.ai.eng@gmail.com',
  github: 'https://github.com/srikant-dev/personal-ai-agent',
  linkedin: 'https://linkedin.com/in/srikant-ai',
  twitter: 'https://twitter.com/srikant_ai',
  availability: 'Immediate availability for Frontend Engineer Internship',
  stats: [
    { label: 'AI Stack Mastery', value: 'Full-Spectrum' },
    { label: 'Avg UI TTFT Latency', value: '< 150ms' },
    { label: 'Shipped AI Projects', value: '5+ Flagships' },
    { label: 'Autonomous Agent Tools', value: '15+ Handlers' },
  ],
  corePillars: [
    {
      title: 'Streaming & Token UX',
      description: 'Zero-jank SSE/WebSocket stream parsers, optimistic updates, and adaptive chunk buffering for instant perceived speed.',
      icon: 'Zap',
    },
    {
      title: 'Agentic Workflows',
      description: 'Interactive execution graphs, real-time reasoning visualizers, multi-agent state machines, and human-in-the-loop controls.',
      icon: 'Bot',
    },
    {
      title: 'Resilience & Offline First',
      description: 'Graceful degradation, exponential backoff retries, offline caching, and transparent network telemetry.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Modern Frontend Architecture',
      description: 'TypeScript, React 19, reactive state management, CSS custom properties design systems, and Web Workers.',
      icon: 'Layout',
    },
  ],
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: '1',
    role: 'AI Frontend Engineer (Capstone Initiative)',
    company: 'FlyRank AI Capstone & Open Source',
    period: '2025 - Present',
    location: 'Remote',
    description: 'Architected an autonomous personal brand platform, multi-agent workflow visualizer, and streaming token client handling network resilience and offline fallbacks.',
    highlights: [
      'Engineered bidirectional agent tool invocation with live streaming UI reflection.',
      'Implemented offline resilience protocol with exponential retry backoff (2^n * 400ms).',
      'Constructed interactive AI Stack Visualizer exploring 5 tiers from model inference to client telemetry.',
    ],
    skills: ['React 19', 'TypeScript', 'Streaming UX', 'LLM Tool Calling', 'WebSockets', 'Network Telemetry'],
    type: 'work',
  },
  {
    id: '2',
    role: 'Full Stack & AI Interface Developer',
    company: 'Cognitive Labs',
    period: '2024 - 2025',
    location: 'Remote / Hybrid',
    description: 'Built high-throughput RAG search explorers and prompt evaluation dashboards for developer tools.',
    highlights: [
      'Reduced initial token render time from 850ms to 140ms via chunk chunking pipelines.',
      'Designed visual vector embedding cluster viewer with canvas-based 2D projection.',
    ],
    skills: ['React', 'Next.js', 'Vector DBs', 'LangChain', 'Performance Optimization'],
    type: 'work',
  },
  {
    id: '3',
    role: 'B.Tech in Computer Science & Engineering',
    company: 'Premier Institute of Technology',
    period: '2021 - 2025',
    location: 'India',
    description: 'Specialized in Distributed Systems, Human-Computer Interaction for Intelligent Systems, and Modern Web Engineering.',
    highlights: [
      'Academic Excellence & Top Tier Performance in Algorithms & Web Engineering',
      'Lead Developer & Contributor to Open-Source AI Interface Guild',
    ],
    skills: ['Algorithms', 'Distributed Systems', 'HCI', 'Machine Learning', 'TypeScript', 'React'],
    type: 'education',
  },
];
