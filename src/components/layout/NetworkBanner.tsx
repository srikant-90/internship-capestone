import React from 'react';
import { AlertTriangle, Activity, Sliders, RefreshCw } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface NetworkDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkDiagnosticsModal: React.FC<NetworkDiagnosticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    isOnline,
    latencyMs,
    status,
    isSimulatedOffline,
    simulatedLatency,
    toggleSimulatedOffline,
    updateSimulatedLatency,
    pingNow,
  } = useNetworkStatus();

  const [isPinging, setIsPinging] = React.useState(false);

  const handlePing = async () => {
    setIsPinging(true);
    await pingNow();
    setTimeout(() => setIsPinging(false), 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Activity size={22} color="var(--accent-cyan)" />
          <span>Network Health & Error Simulation Sandbox</span>
        </div>
      }
      subtitle="Verify client-side resilience, offline detection, and exponential retry strategies."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Status Card */}
        <div
          className="glass-card"
          style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderLeft: `4px solid ${isOnline ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
          }}
        >
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Connection State</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {isOnline ? '🟢 Connected & Optimal' : '🔴 Offline (Simulated or Lost)'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {isOnline ? `Round-trip Latency: ${latencyMs}ms (${status})` : 'All outbound AI streams & API calls will trigger fallback and retry UI'}
            </div>
          </div>
          <Button variant="secondary" size="sm" icon={<RefreshCw size={14} className={isPinging ? 'spin' : ''} />} onClick={handlePing}>
            Ping Server
          </Button>
        </div>

        {/* Resilience Playground Controls */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="var(--accent-cyan)" />
            <span>Interactive Failure Mode Injection</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Test how the Personal AI Agent and portfolio components handle sudden disconnections and high packet jitter.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Toggle Offline */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Simulate Network Disconnection
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Cuts client network pipe to test offline error UI & auto-recovery.
                </div>
              </div>
              <Button
                variant={isSimulatedOffline ? 'danger' : 'outline'}
                size="sm"
                onClick={toggleSimulatedOffline}
              >
                {isSimulatedOffline ? 'Restore Connection' : 'Disconnect Now'}
              </Button>
            </div>

            {/* Artificial Latency Slider */}
            <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Simulated Network Jitter / Delay
                </span>
                <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.88rem' }}>
                  +{simulatedLatency}ms
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={simulatedLatency}
                onChange={(e) => updateSimulatedLatency(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>0ms (Instant)</span>
                <span>500ms (3G Mobile)</span>
                <span>2000ms (High Latency)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Note */}
        <div style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--accent-cyan)' }}>Frontend Resilience Protocol:</strong> The client uses a Ring-Buffer SSE chunk assembler with <code style={{ color: 'var(--accent-cyan)' }}>Last-Event-ID</code> replay headers and exponential backoff retry multipliers (2^attempt * 400ms).
        </div>
      </div>
    </Modal>
  );
};

export const NetworkBanner: React.FC<{ onOpenDiagnostics: () => void }> = ({ onOpenDiagnostics }) => {
  const { isOnline, isSimulatedOffline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #991b1b, #dc2626)',
        color: '#ffffff',
        padding: '0.65rem 1rem',
        fontSize: '0.88rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        position: 'sticky',
        top: 0,
        zIndex: 110,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      <AlertTriangle size={18} />
      <span>
        Network Connection Offline {isSimulatedOffline ? '(Simulated Mode Active)' : ''}. AI Agent requests will trigger offline fallback.
      </span>
      <button
        onClick={onOpenDiagnostics}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 'var(--radius-sm)',
          color: '#ffffff',
          padding: '0.2rem 0.6rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Manage Connection
      </button>
    </div>
  );
};
