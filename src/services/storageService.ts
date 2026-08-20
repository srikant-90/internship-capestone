import { AgentConfig, ChatMessage, ThemeMode } from '../types';

const STORAGE_KEYS = {
  THEME: 'flyrank_ai_portfolio_theme',
  AGENT_CONFIG: 'flyrank_ai_agent_config',
  CHAT_HISTORY: 'flyrank_ai_chat_history',
};

const DEFAULT_CONFIG: AgentConfig = {
  mode: 'smart-simulated',
  provider: 'groq',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,
  systemPromptPreset: 'detailed',
};

export const storageService = {
  getTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark'; // Default to sleek dark theme
    } catch {
      return 'dark';
    }
  },

  setTheme(theme: ThemeMode) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage', e);
    }
  },

  getAgentConfig(): AgentConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGENT_CONFIG);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Unable to load agent config', e);
    }
    return DEFAULT_CONFIG;
  },

  saveAgentConfig(config: AgentConfig) {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENT_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('Unable to save agent config', e);
    }
  },

  getChatHistory(): ChatMessage[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to load chat history', e);
    }
    return [];
  },

  saveChatHistory(history: ChatMessage[]) {
    try {
      // Limit saved messages to last 40 to avoid storage limits
      const trimmed = history.slice(-40);
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('Unable to save chat history', e);
    }
  },

  clearChatHistory() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    } catch (e) {
      console.warn('Unable to clear chat history', e);
    }
  },
};
