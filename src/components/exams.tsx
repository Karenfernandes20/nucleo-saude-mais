'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  HeartPulse,
  ScanLine,
  Scan,
  HardHat,
  BrainCircuit,
  Ear,
  Microscope,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  LucideIcon,
  Sparkles,
} from 'lucide-react';
import { examCategories, clinic } from '@/data/clinic';

const examIconMap: Record<string, LucideIcon> = {
  'flask-conical': FlaskConical,
  'heart-pulse': HeartPulse,
  'scan-line': ScanLine,
  scan: Scan,
  'hard-hat': HardHat,
  'brain-circuit': BrainCircuit,
  ear: Ear,
  microscope: Microscope,
};

function ExamDetails({ category }: { category: (typeof examCategories)[number] }) {
  const selectedCategory = category;
  const IconSelected = examIconMap[category.icon] || FlaskConical;
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de consultar a disponibilidade do exame de ${category.name} no Núcleo de Saúde Mais.`
  )}`;
  return (
    <div className="exam-showcase-panel">
            <div className="showcase-header">
              <div className="showcase-icon-large">
                <IconSelected size={32} className="text-teal" />
              </div>
              <div>
                <span className="showcase-tag">Categoria em Destaque</span>
                <h3 className="showcase-title">{selectedCategory.name}</h3>
              </div>
            </div>

            <p className="showcase-description">{selectedCategory.description}</p>

            <div className="showcase-highlights-box">
              <h4 className="showcase-box-title">Diferenciais do procedimento:</h4>
              <ul className="showcase-list">
                {selectedCategory.highlights.map((item, idx) => (
                  <li key={idx} className="showcase-list-item">
                    <CheckCircle2 size={18} className="text-teal flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Note & WhatsApp Query CTA */}
            <div className="showcase-action-card">
              <div className="showcase-action-info">
                <strong>Precisa de outro exame específico?</strong>
                <p>Consulte nossa equipe no WhatsApp para verificar preparo e agendamento.</p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-md"
              >
                <MessageCircle size={18} />
                <span>Consultar este exame</span>
              </a>
            </div>
          </div>
  );
}

export default function Exams() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  return (
    <section id="exames" className="section exams-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="exams-header-center">
          <div className="section-kicker">
            <span className="kicker-line" />
            <span>DIAGNÓSTICOS E PREVENÇÃO</span>
            <span className="kicker-line" />
          </div>

          <h2 className="section-title">
            Mais agilidade para <span className="text-teal-highlight">cuidar da sua saúde.</span>
          </h2>

          <p className="section-subtitle centered-subtitle">
            Estrutura integrada para a realização de exames com precisão, conforto e entrega ágil de
            resultados.
          </p>

          {/* Quick Turnaround Alert Pill */}
          <div className="exams-turnaround-pill">
            <Clock size={18} className="text-teal" />
            <span>
              Resultados laboratoriais rápidos: <strong>{clinic.laboratoryTurnaround}</strong>
            </span>
          </div>
        </div>

        {/* Interactive Categories Layout */}
        <div className="exams-interactive-layout">
          {/* Left: Category Selector Tabs */}
          <div className="exams-tabs-list" role="tablist" aria-label="Categorias de exames">
            {examCategories.map((category, index) => {
              const IconComp = examIconMap[category.icon] || FlaskConical;
              const isActive = activeCategory === index;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(index)}
                  className={`exam-tab-btn ${isActive ? 'exam-tab-btn-active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <div className="exam-tab-icon">
                    <IconComp size={20} />
                  </div>
                  <div className="exam-tab-text">
                    <strong>{category.name}</strong>
                  </div>
                  <ArrowRight size={16} className="exam-tab-arrow" />
                </button>
              );
            })}
          </div>

          {/* Right: Active Category Showcase Panel */}
          <ExamDetails category={examCategories[activeCategory]} />
        </div>

        <div className="exams-mobile-accordion">
          {examCategories.map((category, index) => {
            const IconComp = examIconMap[category.icon] || FlaskConical;
            const expanded = expandedMobile === index;
            return (
              <div className="exam-accordion-item" key={category.name}>
                <button
                  type="button"
                  id={`exam-mobile-button-${index}`}
                  aria-expanded={expanded}
                  aria-controls={`exam-mobile-panel-${index}`}
                  className={`exam-tab-btn ${expanded ? 'exam-tab-btn-active' : ''}`}
                  onClick={() => setExpandedMobile(previous => previous === index ? null : index)}
                >
                  <div className="exam-tab-icon"><IconComp size={20} /></div>
                  <div className="exam-tab-text"><strong>{category.name}</strong></div>
                  <ChevronDown size={18} className="exam-tab-arrow" />
                </button>
                <div id={`exam-mobile-panel-${index}`} role="region" aria-labelledby={`exam-mobile-button-${index}`} hidden={!expanded}>
                  {expanded && <ExamDetails category={category} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Grid Overview for Mobile & Scanning */}
        <div className="exams-compact-strip">
          <div className="compact-strip-title">
            <Sparkles size={16} className="text-teal" />
            <span>Todos os exames com suporte e acompanhamento profissional</span>
          </div>
          <div className="compact-chips-grid">
            {examCategories.map((exam) => (
              <a
                key={exam.name}
                href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                  `Olá! Gostaria de consultar se realizam o exame de ${exam.name} no Núcleo de Saúde Mais.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="compact-chip"
              >
                <span>{exam.name}</span>
                <ArrowRight size={13} className="chip-arrow" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
