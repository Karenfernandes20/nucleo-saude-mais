'use client';

import React from 'react';
import Image from 'next/image';
import { CalendarCheck, ArrowRight, ShieldCheck, Dna, Activity, MapPin } from 'lucide-react';
import { clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

interface HeroProps {
  onExploreSpecialties: () => void;
}

export default function Hero({ onExploreSpecialties }: HeroProps) {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma consulta no Núcleo de Saúde Mais.'
  )}`;

  return (
    <section id="inicio" className="hero-section">
      {/* Background Graphic Elements */}
      <div className="hero-bg-shapes" aria-hidden="true">
        <BrandCross size={180} color="#22577B" opacity={0.15} className="hero-cross-bg hero-cross-1" />
        <BrandCross size={110} color="#43B8BA" opacity={0.12} className="hero-cross-bg hero-cross-2" />
        <BrandCross size={60} color="#FFFFFF" opacity={0.08} className="hero-cross-bg hero-cross-3" />
        <div className="hero-glow hero-glow-teal" />
        <div className="hero-glow hero-glow-blue" />
      </div>

      <div className="site-container hero-container">
        {/* Main Side-by-Side Area: Text on Left, Doctor Photo on Right (Both Desktop & Mobile) */}
        <div className="hero-split-row">
          {/* Left Column: Typography & Headings */}
          <div className="hero-content">
            {/* Eyebrow / Tag */}
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <MapPin size={15} className="hero-badge-pin" />
              <span className="hero-badge-text">Clínica Médica e Exames em Montes Claros – MG</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Exames Genéticos,
              <span className="hero-title-highlight">Fisioterapia e Exames Diagnósticos</span>
            </h1>

            {/* Complementary Text */}
            <p className="hero-subtitle">
              Tecnologia, reabilitação e diagnóstico em um só lugar, com atendimento humanizado.
            </p>

            {/* Primary Action Buttons (Desktop only) */}
            <div className="hero-actions hero-actions-desktop">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-lg hero-cta-primary"
                aria-label="Agende sua consulta pelo WhatsApp"
              >
                <CalendarCheck size={20} />
                <span>Agende sua consulta</span>
                <ArrowRight size={18} className="btn-arrow" />
              </a>

              <button
                onClick={onExploreSpecialties}
                className="btn btn-outline-white btn-lg hero-cta-secondary"
                aria-label="Conheça nossos exames genéticos"
              >
                <span>Conheça os exames genéticos</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with Editorial Diagonal & Curved Framing */}
          <div className="hero-visual-col">
            <div className="hero-image-frame">
              {/* Background geometric accents */}
              <div className="hero-frame-backdrop" aria-hidden="true" />
              <div className="hero-diagonal-accent" aria-hidden="true" />

              {/* Doctor Image */}
              <div className="hero-image-wrapper">
                <Image
                  src="/images/clinica/team/doutora.webp"
                  alt="Médica do Núcleo de Saúde Mais em ambiente acolhedor"
                  width={620}
                  height={680}
                  priority
                  className="hero-doctor-img"
                />
              </div>

              {/* Floating Floating Card 1: Montes Claros Location */}
              <div className="hero-floating-card hero-floating-location">
                <div className="floating-card-icon">
                  <MapPin size={18} className="text-teal" />
                </div>
                <div className="floating-card-body">
                  <strong>Centro de Montes Claros</strong>
                  <span>Rua Januária, 684</span>
                </div>
              </div>

              {/* Floating Card 2: Humanized Care Rating */}
              <div className="hero-floating-card hero-floating-stat">
                <div className="floating-card-symbol">
                  <BrandCross size={16} color="#43B8BA" variant="duo" />
                </div>
                <div className="floating-card-body">
                  <strong>Excelência Médica</strong>
                  <span>Estrutura moderna</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons (Mobile: full width below the side-by-side block) */}
        <div className="hero-actions hero-actions-mobile">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal btn-lg hero-cta-primary"
            aria-label="Agende sua consulta pelo WhatsApp"
          >
            <CalendarCheck size={18} />
            <span>Agende sua consulta</span>
            <ArrowRight size={16} className="btn-arrow" />
          </a>

          <button
            onClick={onExploreSpecialties}
            className="btn btn-outline-white btn-lg hero-cta-secondary"
            aria-label="Conheça nossos exames genéticos"
          >
            <span>Conheça os exames genéticos</span>
          </button>
        </div>

        {/* Trust Indicators / Badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <div className="trust-icon-box">
              <Dna size={18} className="text-teal" />
            </div>
            <div className="trust-item-text">
              <strong>Genética e saúde</strong>
              <span>Investigação hereditária</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Activity size={18} className="text-teal" />
            </div>
            <div className="trust-item-text">
              <strong>Reabilitação</strong>
              <span>Mobilidade e recuperação</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={18} className="text-teal" />
            </div>
            <div className="trust-item-text">
              <strong>Atendimento Humanizado</strong>
              <span>Cuidado e acolhimento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Curved Transition Wave at bottom */}
      <div className="hero-bottom-transition" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="hero-wave-svg"
        >
          <path
            d="M0 0C240 50 480 75 720 75C960 75 1200 50 1440 0V80H0V0Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
