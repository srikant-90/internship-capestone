import React, { useState } from 'react';
import type { Project } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { GithubIcon } from '../common/SocialIcons';
import { Play, Sparkles, Layers, CheckCircle } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDemo: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDemo }) => {
  const [showArchModal, setShowArchModal] = useState(false);

  return (
    <>
      <div
        className="glass-card"
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
            <Badge variant={project.category === 'agents' ? 'emerald' : project.category === 'rag' ? 'amber' : 'cyan'}>
              {project.category.toUpperCase()}
            </Badge>

            {project.featured && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Sparkles size={12} /> FLAGSHIP
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            {project.title}
          </h3>

          <div style={{ fontSize: '0.86rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.85rem' }}>
            {project.tagline}
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {project.description}
          </p>

          {/* Metrics Pill Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
            }}
          >
            {project.metrics.map((m, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Tag Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {project.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.74rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenDemo(project)}
            icon={<Play size={14} />}
            style={{ flex: 1 }}
          >
            Live Sandbox
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowArchModal(true)}
            icon={<Layers size={14} />}
          >
            Architecture
          </Button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem 0.65rem' }}
            title="View GitHub Repository"
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>

      {/* Architecture Deep-Dive Modal */}
      <Modal
        isOpen={showArchModal}
        onClose={() => setShowArchModal(false)}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Layers size={20} color="var(--accent-cyan)" />
            <span>Architecture Breakdown: {project.title}</span>
          </div>
        }
        subtitle={project.architectureOverview}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Execution Flow & Data Pipeline
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.architectureSteps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Key Technical Features
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {project.features.map((feat, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <CheckCircle size={14} color="var(--accent-emerald)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};
