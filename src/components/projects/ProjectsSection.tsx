import React, { useState } from 'react';
import { Layers, Sparkles, Filter } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { InteractiveDemoModal } from './InteractiveDemoModal';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDemoProject, setSelectedDemoProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All AI Projects' },
    { id: 'agents', label: 'Autonomous Agents' },
    { id: 'rag', label: 'RAG & Retrieval' },
    { id: 'frontend', label: 'Streaming Frontend' },
    { id: 'eval', label: 'Evals & Tools' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Featured AI Applications</span>
          </div>
          <h2 className="section-title">
            Production-Grade <span style={{ color: 'var(--accent-cyan)' }}>AI Systems</span>
          </h2>
          <p className="section-subtitle">
            Engineered with deep focus on latency, deterministic agentic execution, hybrid search recall, and resilient frontend UX.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: isActive ? 'var(--accent-cyan)' : 'var(--bg-tertiary)',
                  color: isActive ? '#050c18' : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? 'var(--accent-cyan)' : 'var(--border-medium)'}`,
                  padding: '0.55rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDemo={(p) => setSelectedDemoProject(p)}
            />
          ))}
        </div>

        {/* Interactive Demo Sandbox Modal */}
        <InteractiveDemoModal
          project={selectedDemoProject}
          isOpen={!!selectedDemoProject}
          onClose={() => setSelectedDemoProject(null)}
        />
      </div>
    </section>
  );
};
