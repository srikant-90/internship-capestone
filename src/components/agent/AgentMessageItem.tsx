import React, { useState } from 'react';
import type { ChatMessage } from '../../types';
import { AgentToolCallView } from './AgentToolCallView';
import { Bot, User, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';

interface AgentMessageItemProps {
  message: ChatMessage;
  onRetry?: () => void;
}

export const AgentMessageItem: React.FC<AgentMessageItemProps> = ({ message, onRetry }) => {
  const isAgent = message.sender === 'agent';

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.85rem',
        alignItems: 'flex-start',
        marginBottom: '1.25rem',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: isAgent ? 'var(--radius-md)' : '50%',
          background: isAgent
            ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(16, 185, 129, 0.2))'
            : 'var(--bg-tertiary)',
          border: `1px solid ${isAgent ? 'rgba(56, 189, 248, 0.4)' : 'var(--border-medium)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isAgent ? 'var(--accent-cyan)' : 'var(--text-primary)',
          flexShrink: 0,
        }}
      >
        {isAgent ? <Bot size={18} /> : <User size={18} />}
      </div>

      {/* Message Bubble Container */}
      <div style={{ flex: 1, maxWidth: '100%', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.86rem', color: isAgent ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
            {isAgent ? 'DevAgent (Srikant AI)' : 'You'}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {message.timestamp}
          </span>
        </div>

        {/* Render Tool Calls if present */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div style={{ marginBottom: '0.6rem' }}>
            {message.toolCalls.map((toolCall) => (
              <AgentToolCallView key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}

        {/* Content Box */}
        <div
          className={isAgent ? 'prose' : ''}
          style={{
            background: isAgent ? 'transparent' : 'var(--bg-tertiary)',
            padding: isAgent ? '0' : '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: isAgent ? 'none' : '1px solid var(--border-subtle)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            wordBreak: 'break-word',
          }}
        >
          {isAgent ? (
            <FormattedMarkdown content={message.content} />
          ) : (
            <span>{message.content}</span>
          )}

          {/* Streaming Cursor */}
          {message.isStreaming && (
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '14px',
                background: 'var(--accent-cyan)',
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'pulse-ring 1s infinite',
              }}
            />
          )}
        </div>

        {/* Error Retry Option */}
        {message.error && onRetry && (
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              icon={<RefreshCw size={13} />}
              style={{ borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)' }}
            >
              Retry Response
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Lightweight Markdown Parser for Headings, Bold, Bullet points, Code Blocks, Links
 */
const FormattedMarkdown: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  // Split code blocks from regular text
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const lang = lines[0]?.trim() || '';
          const code = (lang ? lines.slice(1) : lines).join('\n');
          return <CodeBlock key={index} code={code} language={lang} />;
        }

        // Regular markdown lines
        const lines = part.split('\n');
        return (
          <div key={index}>
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lIdx} style={{ height: '0.4rem' }} />;

              // H3
              if (trimmed.startsWith('### ')) {
                return (
                  <h4 key={lIdx} style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.75rem 0 0.35rem 0' }}>
                    <FormatInlineText text={trimmed.replace('### ', '')} />
                  </h4>
                );
              }

              // H2
              if (trimmed.startsWith('## ')) {
                return (
                  <h3 key={lIdx} style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-cyan)', margin: '0.85rem 0 0.4rem 0' }}>
                    <FormatInlineText text={trimmed.replace('## ', '')} />
                  </h3>
                );
              }

              // Unordered list bullet
              if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                return (
                  <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', margin: '0.25rem 0', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-cyan)', marginTop: '2px' }}>•</span>
                    <div><FormatInlineText text={trimmed.substring(2)} /></div>
                  </div>
                );
              }

              // Numbered list
              const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', margin: '0.25rem 0', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{numMatch[1]}.</span>
                    <div><FormatInlineText text={numMatch[2]} /></div>
                  </div>
                );
              }

              return (
                <p key={lIdx} style={{ margin: '0.35rem 0' }}>
                  <FormatInlineText text={trimmed} />
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const FormatInlineText: React.FC<{ text: string }> = ({ text }) => {
  // Bold **text**
  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          return (
            <strong key={bIdx} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
              <FormatInlineTokens text={bPart.slice(2, -2)} />
            </strong>
          );
        }
        return <FormatInlineTokens key={bIdx} text={bPart} />;
      })}
    </>
  );
};

const FormatInlineTokens: React.FC<{ text: string }> = ({ text }) => {
  // Code `code` and Markdown links [text](url)
  const tokens = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {tokens.map((token, idx) => {
        if (token.startsWith('`') && token.endsWith('`')) {
          return (
            <code
              key={idx}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                color: 'var(--accent-cyan)',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                fontSize: '0.85em',
                fontFamily: 'var(--font-mono)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
              }}
            >
              {token.slice(1, -1)}
            </code>
          );
        }

        const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          return (
            <a
              key={idx}
              href={linkMatch[2]}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}
            >
              {linkMatch[1]}
            </a>
          );
        }

        return <span key={idx}>{token}</span>;
      })}
    </>
  );
};

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ margin: '0.85rem 0', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
      <div
        style={{
          background: '#070a10',
          padding: '0.4rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? 'var(--accent-emerald)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.72rem',
            fontWeight: 600,
          }}
        >
          {copied ? 'Copied' : 'Copy Code'}
        </button>
      </div>
      <pre
        style={{
          background: '#04070c',
          padding: '0.85rem 1rem',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.82rem',
          color: '#f1f5f9',
          lineHeight: 1.5,
          fontFamily: 'var(--font-mono)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};
