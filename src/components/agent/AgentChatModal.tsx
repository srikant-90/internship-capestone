import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Square, Trash2, Sliders, Sparkles, AlertCircle, RefreshCw, X, Download } from 'lucide-react';
import { useAgentChat } from '../../hooks/useAgentChat';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { PROMPT_SUGGESTIONS } from '../../data/agentKnowledge';
import { AgentMessageItem } from './AgentMessageItem';
import { AgentConfigModal } from './AgentConfigModal';
import { Button } from '../common/Button';

interface AgentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentChatModal: React.FC<AgentChatModalProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useAgentChat();

  const { isOnline } = useNetworkStatus();
  const [inputValue, setInputValue] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new tokens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleChipClick = (promptText: string) => {
    if (isStreaming) return;
    sendMessage(promptText);
  };

  const handleExport = () => {
    const jsonStr = JSON.stringify(messages, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alex_vance_agent_transcript_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: '840px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Window Header */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(16, 185, 129, 0.2))',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              <Bot size={20} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Alex Vance AI Agent
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    background: config.mode === 'live-api' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                    color: config.mode === 'live-api' ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                    fontWeight: 700,
                  }}
                >
                  {config.mode === 'live-api' ? `Live: ${config.provider.toUpperCase()}` : 'Smart Autonomous Engine'}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Equipped with project retrieval, AI stack inspector, and interview scheduling
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => setShowConfigModal(true)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
              title="Agent & Model Configuration"
            >
              <Sliders size={16} />
            </button>

            <button
              onClick={handleExport}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
              title="Export Conversation"
            >
              <Download size={16} />
            </button>

            <button
              onClick={clearMessages}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
              title="Clear Chat History"
            >
              <Trash2 size={16} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                padding: '0.4rem',
                cursor: 'pointer',
              }}
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Offline Alert if disconnected */}
        {!isOnline && (
          <div
            style={{
              padding: '0.6rem 1rem',
              background: '#7f1d1d',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={15} />
              <span>Offline: The agent will use local knowledge fallback until connection recovers.</span>
            </div>
          </div>
        )}

        {/* Messages List Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((msg) => (
            <AgentMessageItem
              key={msg.id}
              message={msg}
              onRetry={msg.error ? retryLastMessage : undefined}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div
          style={{
            padding: '0.6rem 1.5rem',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {PROMPT_SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(s.prompt)}
              disabled={isStreaming}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.8rem',
                fontSize: '0.78rem',
                color: 'var(--text-primary)',
                cursor: isStreaming ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-fast)',
                opacity: isStreaming ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isStreaming) e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              }}
              onMouseLeave={(e) => {
                if (!isStreaming) e.currentTarget.style.borderColor = 'var(--border-medium)';
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '1rem 1.5rem',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-medium)',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about Alex's AI stack, projects, code architecture, or FlyRank fit..."
            disabled={isStreaming}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />

          {isStreaming ? (
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={stopStreaming}
              icon={<Square size={14} />}
            >
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputValue.trim()}
              icon={<Send size={15} />}
            >
              Send
            </Button>
          )}
        </form>
      </div>

      {/* Config Modal */}
      <AgentConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        config={config}
        onSaveConfig={updateConfig}
      />
    </div>
  );
};
