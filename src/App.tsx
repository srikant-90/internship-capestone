import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/layout/Navbar';
import { NetworkBanner, NetworkDiagnosticsModal } from './components/layout/NetworkBanner';
import { HeroSection } from './components/hero/HeroSection';
import { AIStackExplorer } from './components/stack/AIStackExplorer';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { AISandbox } from './components/playground/AISandbox';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { Footer } from './components/layout/Footer';
import { AgentChatModal } from './components/agent/AgentChatModal';
import { AgentChatWidget } from './components/agent/AgentChatWidget';

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => storageService.getTheme());
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storageService.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Offline Alert Banner */}
      <NetworkBanner onOpenDiagnostics={() => setIsNetworkModalOpen(true)} />

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAgent={() => setIsAgentOpen(true)}
        onOpenNetworkModal={() => setIsNetworkModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <HeroSection onOpenAgent={() => setIsAgentOpen(true)} />
        <AIStackExplorer />
        <ProjectsSection />
        <AISandbox />
        <ExperienceTimeline />
      </main>

      {/* Footer */}
      <Footer onOpenAgent={() => setIsAgentOpen(true)} />

      {/* Floating Agent Trigger Widget */}
      <AgentChatWidget onOpen={() => setIsAgentOpen(true)} />

      {/* Interactive AI Agent Conversational Modal */}
      <AgentChatModal
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
      />

      {/* Network Resilience Diagnostics & Error Simulation Modal */}
      <NetworkDiagnosticsModal
        isOpen={isNetworkModalOpen}
        onClose={() => setIsNetworkModalOpen(false)}
      />
    </div>
  );
}

export default App;
