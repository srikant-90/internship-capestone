import React, { useState } from 'react';
import { Bot, Cpu, Layers, Sparkles, Terminal, Wifi, WifiOff, Moon, Sun, Menu, X } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import type { ThemeMode } from '../../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenAgent: () => void;
  onOpenNetworkModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenAgent,
  onOpenNetworkModal,
}) => {
  const { isOnline, latencyMs, status, isSimulatedOffline } = useNetworkStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'AI Stack Mastery', href: '#ai-stack', icon: <Cpu size={16} /> },
    { label: 'Featured Projects', href: '#projects', icon: <Layers size={16} /> },
    { label: 'AI Sandbox', href: '#sandbox', icon: <Sparkles size={16} /> },
    { label: 'Experience', href: '#experience', icon: <Terminal size={16} /> },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 200ms ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.25rem',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(16, 185, 129, 0.2))',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              fontWeight: 800,
              fontSize: '1.05rem',
            }}
          >
            SK
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Srikant
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.04em' }}>
              FLYRANK AI // CANDIDATE
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.88rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Network Status, Agent Trigger, Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Network Health Pill */}
          <button
            onClick={onOpenNetworkModal}
            title={isOnline ? `Network Optimal (${latencyMs}ms) - Click to test network resilience` : 'Network Offline - Click to inspect'}
            style={{
              background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.15)',
              border: `1px solid ${isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.4)'}`,
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: isOnline ? 'var(--accent-emerald)' : 'var(--accent-rose)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {isOnline ? (
              <>
                <span className={`pulse-beacon pulse-beacon-${status === 'optimal' ? 'emerald' : 'amber'}`} />
                <span className="network-pill-text">{status === 'optimal' ? `${latencyMs}ms` : 'Degraded'}</span>
              </>
            ) : (
              <>
                <WifiOff size={13} />
                <span>Offline {isSimulatedOffline ? '(Sim)' : ''}</span>
              </>
            )}
          </button>

          {/* AI Agent Button */}
          <button
            onClick={onOpenAgent}
            className="btn btn-primary btn-sm"
            style={{
              gap: '0.45rem',
              fontWeight: 700,
              padding: '0.45rem 0.95rem',
            }}
          >
            <Bot size={16} />
            <span>Chat with Agent</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)',
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.4rem',
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '0.5rem 0',
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
            >
              <Bot size={16} /> Open Personal Agent
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNetworkModal();
              }}
              className="btn btn-secondary btn-sm"
            >
              <Wifi size={16} /> Network
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
          .network-pill-text {
            display: none;
          }
        }
        @media (min-width: 861px) {
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
