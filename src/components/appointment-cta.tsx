'use client';

import React from 'react';
import { MessageCircle, ArrowRight, Phone, Clock, CalendarCheck, ShieldCheck } from 'lucide-react';
import { clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

export default function AppointmentCTA() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma consulta no Núcleo de Saúde Mais.'
  )}`;

  return (
    <section className="appointment-cta-section" aria-label="Agendamento rápido">
      {/* Decorative Brand Elements in Background */}
      <div className="cta-bg-decorations" aria-hidden="true">
        <BrandCross size={220} color="#22577B" opacity={0.2} className="cta-cross-bg cta-cross-1" />
        <BrandCross size={140} color="#43B8BA" opacity={0.15} className="cta-cross-bg cta-cross-2" />
        <div className="cta-radial-glow" />
      </div>

      <div className="site-container cta-container">
        <div className="cta-card">
          <div className="cta-kicker">
            <BrandCross size={16} color="#43B8BA" />
            <span>AGENDAMENTO DESCOMPLICADO</span>
          </div>

          <h2 className="cta-title">
            Seu cuidado merece <span className="cta-title-highlight">atenção especial.</span>
          </h2>

          <p className="cta-text">
            Estamos prontos para cuidar de você. Agende sua consulta de forma simples e rápida.
          </p>

          {/* Big Action Button */}
          <div className="cta-button-wrapper">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal btn-xl cta-main-btn"
              aria-label="Agendar consulta pelo WhatsApp agora"
            >
              <MessageCircle size={26} className="cta-btn-icon" />
              <span>Agendar pelo WhatsApp</span>
              <ArrowRight size={22} className="cta-btn-arrow" />
            </a>
          </div>

          {/* Quick Info Points */}
          <div className="cta-meta-bar">
            <div className="cta-meta-item">
              <Phone size={16} className="text-teal" />
              <span>{clinic.phoneDisplay}</span>
            </div>
            <span className="cta-meta-dot">•</span>
            <div className="cta-meta-item">
              <Clock size={16} className="text-teal" />
              <span>Atendimento ágil em horário comercial</span>
            </div>
            <span className="cta-meta-dot">•</span>
            <div className="cta-meta-item">
              <ShieldCheck size={16} className="text-teal" />
              <span>Convênios &amp; Particular</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
