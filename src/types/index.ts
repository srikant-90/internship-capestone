export type ThemeMode = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'agents' | 'rag' | 'frontend' | 'eval';
  tags: string[];
  metrics: { label: string; value: string }[];
  architectureOverview: string;
  architectureSteps: string[];
  features: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  demoType: 'agentforge' | 'cognitive_search' | 'streampulse' | 'promptlab';
  featured: boolean;
}

export interface AIStackLayer {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  iconName: string;
  technologies: {
    name: string;
    level: 'Core' | 'Advanced' | 'Expert';
    description: string;
  }[];
  keyConcepts: string[];
  codeSnippet: {
    language: string;
    title: string;
    code: string;
  };
  frontendRelevance: string;
}

export interface AgentToolCall {
  id: string;
  toolName: 'search_projects' | 'get_ai_stack_info' | 'check_availability' | 'generate_code' | 'evaluate_fit';
  status: 'running' | 'completed' | 'failed';
  input: Record<string, any>;
  output?: Record<string, any> | string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  toolCalls?: AgentToolCall[];
  error?: boolean;
}

export interface AgentConfig {
  mode: 'smart-simulated' | 'live-api';
  apiKey?: string;
  provider: 'groq' | 'openrouter' | 'openai' | 'gemini';
  model: string;
  temperature: number;
  systemPromptPreset: 'concise' | 'detailed' | 'recruiter' | 'technical-deep';
}

export interface NetworkHealth {
  isOnline: boolean;
  latencyMs: number;
  status: 'optimal' | 'degraded' | 'offline';
  lastChecked: Date;
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  type: 'work' | 'education' | 'milestone';
}
