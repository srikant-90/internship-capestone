import { useState, useEffect, useRef, useCallback } from 'react';
import type { AgentConfig, AgentToolCall, ChatMessage } from '../types';
import { agentService } from '../services/agentService';
import { storageService } from '../services/storageService';

const INITIAL_WELCOME: ChatMessage = {
  id: 'msg_welcome',
  sender: 'agent',
  content: `👋 **Welcome to Srikant's AI Brand & Autonomous Agent!**

I am equipped with autonomous reasoning, project database querying, AI stack deep-dives, and interview scheduling handlers.

**Try asking me:**
- *"What is your full-spectrum AI stack mastery?"*
- *"Why are you the ideal frontend engineer intern for FlyRank AI?"*
- *"Search and explain your top AI projects"*
- *"Generate resilient React streaming code with exponential backoff"*
- *"Check Srikant's interview availability"*`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export function useAgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = storageService.getChatHistory();
    // If saved history was from previous candidate name, reset to new welcome
    if (saved.length > 0 && !saved[0].content.includes('Alex Vance')) {
      return saved;
    }
    return [INITIAL_WELCOME];
  });
  const [config, setConfig] = useState<AgentConfig>(() => storageService.getAgentConfig());
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentToolCall, setCurrentToolCall] = useState<AgentToolCall | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync messages with local storage
  useEffect(() => {
    storageService.saveChatHistory(messages);
  }, [messages]);

  // Sync config with local storage
  const updateConfig = useCallback((newConfig: Partial<AgentConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      storageService.saveAgentConfig(updated);
      return updated;
    });
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setCurrentToolCall(null);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      setError(null);
      const userMessageId = 'user_' + Date.now();
      const userMessage: ChatMessage = {
        id: userMessageId,
        sender: 'user',
        content: content.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const agentMessageId = 'agent_' + (Date.now() + 1);
      const agentPlaceholder: ChatMessage = {
        id: agentMessageId,
        sender: 'agent',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true,
      };

      const updatedMessages = [...messages, userMessage, agentPlaceholder];
      setMessages(updatedMessages);
      setIsStreaming(true);
      setCurrentToolCall(null);

      abortControllerRef.current = new AbortController();
      let accumulatedText = '';
      const toolCallsMap: AgentToolCall[] = [];

      try {
        const stream = agentService.streamAgentResponse(
          [...messages, userMessage],
          config,
          abortControllerRef.current.signal
        );

        for await (const event of stream) {
          if (event.type === 'tool_start' && event.toolCall) {
            setCurrentToolCall(event.toolCall);
            toolCallsMap.push(event.toolCall);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === agentMessageId ? { ...m, toolCalls: [...toolCallsMap] } : m
              )
            );
          } else if (event.type === 'tool_end' && event.toolCall) {
            setCurrentToolCall(event.toolCall);
            const idx = toolCallsMap.findIndex((t) => t.id === event.toolCall?.id);
            if (idx !== -1) {
              toolCallsMap[idx] = event.toolCall;
            } else {
              toolCallsMap.push(event.toolCall);
            }
            setMessages((prev) =>
              prev.map((m) =>
                m.id === agentMessageId ? { ...m, toolCalls: [...toolCallsMap] } : m
              )
            );
          } else if (event.type === 'token' && event.token) {
            accumulatedText += event.token;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === agentMessageId
                  ? { ...m, content: accumulatedText, isStreaming: true }
                  : m
              )
            );
          } else if (event.type === 'error' && event.error) {
            throw new Error(event.error);
          } else if (event.type === 'done') {
            break;
          }
        }

        // Finalize agent message
        setMessages((prev) =>
          prev.map((m) =>
            m.id === agentMessageId
              ? {
                  ...m,
                  content: accumulatedText || 'Response received successfully.',
                  isStreaming: false,
                  toolCalls: toolCallsMap.length > 0 ? toolCallsMap : undefined,
                }
              : m
          )
        );
      } catch (err: any) {
        if (abortControllerRef.current?.signal.aborted) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === agentMessageId
                ? { ...m, content: (accumulatedText || '') + '\n\n*(Generation stopped by user)*', isStreaming: false }
                : m
            )
          );
        } else {
          const errorMsg = err.message || 'An unexpected network error occurred while reaching the AI agent.';
          setError(errorMsg);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === agentMessageId
                ? {
                    ...m,
                    content: `⚠️ **Connection / Agent Error**: ${errorMsg}`,
                    error: true,
                    isStreaming: false,
                  }
                : m
            )
          );
        }
      } finally {
        setIsStreaming(false);
        setCurrentToolCall(null);
        abortControllerRef.current = null;
      }
    },
    [messages, isStreaming, config]
  );

  const retryLastMessage = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      // Remove last failed agent message if any
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.sender === 'agent' && last.error) {
          return prev.slice(0, -1);
        }
        return prev;
      });
      sendMessage(lastUserMsg.content);
    }
  }, [messages, sendMessage]);

  const clearMessages = useCallback(() => {
    storageService.clearChatHistory();
    setMessages([INITIAL_WELCOME]);
    setError(null);
  }, []);

  return {
    messages,
    isStreaming,
    currentToolCall,
    error,
    config,
    updateConfig,
    sendMessage,
    retryLastMessage,
    stopStreaming,
    clearMessages,
  };
}
