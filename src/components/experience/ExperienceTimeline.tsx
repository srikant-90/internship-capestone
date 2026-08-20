import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Terminal } from 'lucide-react';
import { TIMELINE_ITEMS } from '../../data/portfolioData';
import { Badge } from '../common/Badge';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Terminal size={14} />
            <span>Engineering Track Record</span>
          </div>
          <h2 className="section-title">
            Experience & <span style={{ color: 'var(--accent-cyan)' }}>Milestones</span>
          </h2>
          <p className="section-subtitle">
            Hands-on journey building high-throughput AI interfaces, distributed streaming tools, and state machine visualizers.
          </p>
        </div>

        {/* Timeline List */}
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {TIMELINE_ITEMS.map((item, index) => {
            const isWork = item.type === 'work';
            return (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  position: 'relative',
                  borderLeft: `4px solid ${isWork ? 'var(--accent-cyan)' : 'var(--accent-emerald)'}`,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      {isWork ? (
                        <Briefcase size={18} color="var(--accent-cyan)" />
                      ) : (
                        <GraduationCap size={18} color="var(--accent-emerald)" />
                      )}
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {item.role}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {item.company}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Calendar size={13} />
                      <span>{item.period}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <MapPin size={12} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {item.description}
                </p>

                {/* Highlights */}
                <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {item.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.84rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {item.skills.map((skill, sIdx) => (
                    <Badge key={sIdx} variant="neutral">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
