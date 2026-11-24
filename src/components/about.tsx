'use client';

import React from 'react';
import Image from 'next/image';
import { HeartHandshake, Award, Sparkles, ArrowRight, Building2, MapPin } from 'lucide-react';
import { pillars } from '@/data/clinic';

interface AboutProps {
  onExploreFacility: () => void;
}

export default function About({ onExploreFacility }: AboutProps) {
  return (
    <section id="sobre" className="section about-section">
      <div className="site-container">
        <div className="about-grid">
          {/* Left Column: Visual Composition with Clinic Image & Accreditation Badge */}
          <div className="about-visual-col">
            <div className="about-image-card">
              <Image
                src="/images/clinica/facade/fachada.webp"
                alt="Fachada do Núcleo de Saúde Mais em Montes Claros"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className="about-primary-img"
                priority
              />
              <div className="about-image-gradient" />

              {/* Floating Badge: Address (Top-Right) */}
              <div className="about-badge-location">
                <MapPin size={15} className="text-teal" />
                <span>Rua Januária, 684 — Centro</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="about-content-col">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>SOBRE O NÚCLEO DE SAÚDE MAIS</span>
            </div>

            <h2 className="section-title">
              Um novo olhar para <span className="text-navy-highlight">cuidar de você.</span>
            </h2>

            <p className="about-lead-text">
              O Núcleo de Saúde Mais reúne consultas médicas, exames laboratoriais e de imagem, genética, fisioterapia, psicologia e nutrição. Um espaço de cuidado integrado para você e sua família, da prevenção ao acompanhamento.
            </p>

            {/* 3 Pillars */}
            <div className="about-pillars-grid">
              {pillars.map((pillar) => {
                let PillarIcon = HeartHandshake;
                if (pillar.title === 'Excelência') PillarIcon = Award;
                if (pillar.title === 'Inovação') PillarIcon = Sparkles;

                return (
                  <div key={pillar.title} className="pillar-item">
                    <div className="pillar-icon-box">
                      <PillarIcon size={18} className="text-teal" />
                    </div>
                    <div className="pillar-text">
                      <h4 className="pillar-title">{pillar.title}</h4>
                      <p className="pillar-desc">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button to Structure */}
            <div className="about-actions">
              <button
                onClick={onExploreFacility}
                className="btn btn-outline-navy btn-md"
                aria-label="Conheça a estrutura da nossa clínica"
              >
                <Building2 size={18} />
                <span>Conheça nossa clínica</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
