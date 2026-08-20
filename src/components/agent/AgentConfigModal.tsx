import React, { useState } from 'react';
import { AgentConfig } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Sliders, Key, Zap, Bot, Shield, Check, Info } from 'lucide-react';
import { Badge } from '../common/Badge';

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AgentConfig;
  onSaveConfig: (newConfig: Partial<AgentConfig>) => void;
}

export const AgentConfigModal: React.FC<AgentConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [mode, setMode] = useState<AgentConfig['mode']>(config.mode);
  const [provider, setProvider] = useState<AgentConfig['provider']>(config.provider);
  const [apiKey, setApiKey] = useState<string>(config.apiKey || '');
  const [model, setModel] = useState<string>(config.model);
  const [temperature, setTemperature] = useState<number>(config.temperature);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSaveConfig({
      mode,
      provider,
      apiKey: apiKey.trim(),
      model,
      temperature,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const getProviderModels = () => {
    switch (provider) {
      case 'groq':
        return [
          { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile (Ultra Fast)' },
          { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant (Sub-50ms)' },
          { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B 32k' },
        ];
      case 'openrouter':
        return [
          { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
          { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B' },
          { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash (Free)' },
        ];
      case 'openai':
        return [
          { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
          { id: 'gpt-4o', name: 'GPT-4o' },
        ];
      default:
        return [{ id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' }];
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sliders size={20} color="var(--accent-cyan)" />
          <span>Agent Runtime & LLM Provider Configuration</span>
        </div>
      }
      subtitle="Choose between the Smart Simulated Engine or live streaming inference with your own API key."
      maxWidth="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Mode Selector */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>
            Execution Engine Mode
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <div
              onClick={() => setMode('smart-simulated')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: mode === 'smart-simulated' ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-tertiary)',
                border: `1px solid ${mode === 'smart-simulated' ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <Bot size={18} color="var(--accent-cyan)" />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  Smart Autonomous Engine
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Default: High-fidelity simulated reasoning with tool calls & candidate database. Zero API key needed.
              </p>
            </div>

            <div
              onClick={() => setMode('live-api')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: mode === 'live-api' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-tertiary)',
                border: `1px solid ${mode === 'live-api' ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <Zap size={18} color="var(--accent-emerald)" />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  Live LLM Streaming API
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Connect real-time SSE streaming using your Groq, OpenRouter, or OpenAI API key.
              </p>
            </div>
          </div>
        </div>

        {/* Live API Settings if Mode is live-api */}
        {mode === 'live-api' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'block' }}>
                Provider
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['groq', 'openrouter', 'openai'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProvider(p);
                      if (p === 'groq') setModel('llama-3.3-70b-versatile');
                      if (p === 'openrouter') setModel('meta-llama/llama-3.3-70b-instruct');
                      if (p === 'openai') setModel('gpt-4o-mini');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: provider === p ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                      color: provider === p ? '#050c18' : 'var(--text-secondary)',
                      border: '1px solid var(--border-medium)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Key size={14} color="var(--accent-cyan)" />
                <span>{provider.toUpperCase()} API Key</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${provider} API key (e.g. gsk_... or sk-...)`}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Shield size={12} />
                <span>Your key is stored locally in your browser and never transmitted to our servers.</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'block' }}>
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                }}
              >
                {getProviderModels().map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Temperature */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Temperature (Creativity vs Determinism)</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{temperature}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSave} icon={isSaved ? <Check size={16} /> : undefined}>
            {isSaved ? 'Settings Saved!' : 'Save Configuration'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
