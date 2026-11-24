'use client';

import React from 'react';
import Image from 'next/image';
import { HeartHandshake, Award, Sparkles, CheckCircle2, ArrowRight, Building2, MapPin } from 'lucide-react';
import { pillars, clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

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
              <div className="about-image-wrapper">
                <Image
                  src="/images/clinica/facade/fachada.webp"
                  alt="Fachada do Núcleo de Saúde Mais em Montes Claros"
                  width={580}
                  height={440}
                  className="about-primary-img"
                  priority
                />
                <div className="about-image-gradient" />
              </div>

              {/* Floating Badge 1: Technical Leadership */}
              <div className="about-badge-tech">
                <div className="badge-tech-icon">
                  <BrandCross size={20} color="#FFFFFF" />
                </div>
                <div>
                  <strong>{clinic.technicalLead}</strong>
                  <span>Resp. Técnica — {clinic.crm}</span>
                </div>
              </div>

              {/* Floating Badge 2: Address */}
              <div className="about-badge-location">
                <MapPin size={16} className="text-teal" />
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
              O Núcleo de Saúde Mais é uma clínica médica e de exames cuja missão é inovar no
              segmento, trazendo um novo olhar sobre o relacionamento entre médico e paciente.
              Investimos em tecnologia, competências e excelência para tornar a experiência de nossos
              pacientes mais humana, moderna e acessível.
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
                      <PillarIcon size={20} className="text-teal" />
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
