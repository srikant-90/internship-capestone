import React, { useState } from 'react';
import { AgentToolCall } from '../../types';
import { Wrench, CheckCircle2, ChevronDown, ChevronUp, RefreshCw, AlertCircle, Code, Calendar, Search, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface AgentToolCallViewProps {
  toolCall: AgentToolCall;
}

export const AgentToolCallView: React.FC<AgentToolCallViewProps> = ({ toolCall }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getToolIcon = () => {
    switch (toolCall.toolName) {
      case 'search_projects':
        return <Search size={14} color="var(--accent-cyan)" />;
      case 'check_availability':
        return <Calendar size={14} color="var(--accent-emerald)" />;
      case 'generate_code':
        return <Code size={14} color="var(--accent-amber)" />;
      case 'evaluate_fit':
        return <Sparkles size={14} color="var(--accent-cyan)" />;
      default:
        return <Wrench size={14} color="var(--accent-cyan)" />;
    }
  };

  const getReadableToolName = () => {
    switch (toolCall.toolName) {
      case 'search_projects':
        return 'Querying Candidate Projects DB';
      case 'check_availability':
        return 'Checking Interview & Role Availability';
      case 'generate_code':
        return 'Synthesizing Resilient Code Template';
      case 'evaluate_fit':
        return 'Running Candidate Fit Evaluation';
      case 'get_ai_stack_info':
        return 'Loading AI Stack Matrix';
      default:
        return toolCall.toolName;
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        padding: '0.65rem 0.85rem',
        margin: '0.6rem 0',
        fontSize: '0.82rem',
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {getToolIcon()}
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {getReadableToolName()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {toolCall.status === 'running' && (
            <Badge variant="cyan" icon={<RefreshCw size={11} className="spin" />}>
              Executing...
            </Badge>
          )}
          {toolCall.status === 'completed' && (
            <Badge variant="emerald" icon={<CheckCircle2 size={11} />}>
              Done
            </Badge>
          )}
          {toolCall.status === 'failed' && (
            <Badge variant="rose" icon={<AlertCircle size={11} />}>
              Failed
            </Badge>
          )}

          {isExpanded ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
          <div style={{ marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
            Input Args:
          </div>
          <pre style={{ background: '#05080e', padding: '0.5rem', borderRadius: '4px', overflowX: 'auto', color: '#93c5fd' }}>
            {JSON.stringify(toolCall.input, null, 2)}
          </pre>

          {toolCall.output && (
            <>
              <div style={{ margin: '0.4rem 0 0.2rem 0', color: 'var(--text-muted)' }}>
                Result Payload:
              </div>
              <pre style={{ background: '#05080e', padding: '0.5rem', borderRadius: '4px', overflowX: 'auto', color: '#86efac' }}>
                {JSON.stringify(toolCall.output, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};
