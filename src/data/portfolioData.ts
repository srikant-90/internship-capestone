import { TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Alex Vance',
  role: 'AI Frontend & Autonomous Systems Engineer',
  targetRole: 'FlyRank AI Frontend Engineer Intern',
  tagline: 'Bridging LLM intelligence and high-performance, resilient user experiences.',
  bio: 'Specialized in architecting streaming AI user interfaces, agentic workflow visualizers, vector retrieval experiences, and low-latency interaction models. Focused on making complex AI systems intuitive, reactive, and resilient to network anomalies.',
  status: 'Ready to ship with FlyRank AI team',
  location: 'San Francisco, CA / Remote',
  email: 'alex.vance.ai@gmail.com',
  github: 'https://github.com/flyrank-candidate/personal-ai-agent',
  linkedin: 'https://linkedin.com/in/alex-vance-ai',
  twitter: 'https://twitter.com/alexvance_ai',
  availability: 'Immediate availability for Frontend Engineer Internship',
  stats: [
    { label: 'AI Stack Mastery', value: 'Full-Spectrum' },
    { label: 'Avg UI TTFT Latency', value: '< 180ms' },
    { label: 'Shipped AI Projects', value: '8+ Apps' },
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
    role: 'AI Frontend Engineer (Capstone & Open Source)',
    company: 'FlyRank AI Capstone Initiative',
    period: '2025 - Present',
    location: 'Remote',
    description: 'Engineered an autonomous personal agent portfolio and multi-agent workflow visualizer handling low-latency streaming and offline fallback.',
    highlights: [
      'Architected bidirectional agent tool invocation with streaming UI state reflection.',
      'Implemented offline resilience protocol recovering dropped SSE streams without losing context.',
      'Constructed interactive AI Stack Visualizer exploring multi-tier model and RAG architectures.',
    ],
    skills: ['React', 'TypeScript', 'Streaming UX', 'LLM Tool Calling', 'WebSockets', 'Network Telemetry'],
    type: 'work',
  },
  {
    id: '2',
    role: 'Full Stack & AI Interface Developer',
    company: 'Cognitive Labs',
    period: '2024 - 2025',
    location: 'San Francisco, CA',
    description: 'Built high-throughput RAG search explorers and prompt evaluation dashboards for developer tools.',
    highlights: [
      'Reduced initial token render time from 850ms to 170ms via chunk chunking pipelines.',
      'Designed visual vector embedding cluster viewer with canvas-based 2D projection.',
    ],
    skills: ['React', 'Next.js', 'Vector DBs', 'LangChain', 'Performance Optimization'],
    type: 'work',
  },
  {
    id: '3',
    role: 'B.S. in Computer Science & AI Systems',
    company: 'University of California, Berkeley',
    period: '2021 - 2025',
    location: 'Berkeley, CA',
    description: 'Focused on Distributed Systems, Human-Computer Interaction for Intelligent Systems, and Machine Learning.',
    highlights: [
      'Dean’s Honor List',
      'President of Modern AI & Web Engineering Guild',
    ],
    skills: ['Algorithms', 'Distributed Systems', 'HCI', 'Machine Learning', 'TypeScript'],
    type: 'education',
  },
];
