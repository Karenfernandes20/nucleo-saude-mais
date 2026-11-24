'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle, ArrowRight, Phone, CalendarCheck, ShieldCheck, Plus } from 'lucide-react';
import { clinic } from '@/data/clinic';
import styles from './appointment-cta.module.css';

export default function AppointmentCTA() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma consulta no Núcleo de Saúde Mais.'
  )}`;

  return (
    <section className={styles.section} id="agendamento" aria-label="Agendamento rápido">
      {/* Right Column: Reception Photo */}
      <div className={styles.photoWrapper}>
        <Image
          src="/images/clinica/recepcao-agendamento.webp"
          alt="Recepção moderna e acolhedora da clínica Núcleo de Saúde Mais"
          fill
          sizes="(max-width: 900px) 100vw, 55vw"
          className={styles.photoImage}
          priority
        />
        <span className={styles.disclaimer}>* Imagem ilustrativa da recepção</span>
      </div>

      {/* Desktop S-Curve SVG Overlay with Glowing Turquoise Contour Line */}
      <div className={styles.desktopCurveContainer} aria-hidden="true">
        <svg
          className={styles.desktopCurveSvg}
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ctaTealBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#052F46" />
              <stop offset="50%" stopColor="#073B56" />
              <stop offset="100%" stopColor="#052A3E" />
            </linearGradient>

            <filter id="ctaGlowDesktop" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <radialGradient id="ctaAmbient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2AD0C4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2AD0C4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Secondary organic shadow wave at bottom */}
          <path
            d="M 0,500 L 610,500 C 550,440 450,400 370,415 C 260,430 150,480 0,500 Z"
            fill="rgba(6, 42, 63, 0.55)"
          />

          {/* Soft ambient glow near the curve apex */}
          <circle cx="580" cy="30" r="130" fill="url(#ctaAmbient)" />

          {/* Main solid teal fill covering left column up to the curve */}
          <path
            d="M 0,0 L 590,0 C 535,80 460,160 460,250 C 460,340 520,430 580,500 L 0,500 Z"
            fill="url(#ctaTealBg)"
          />

          {/* Glowing Turquoise Contour Stroke */}
          <path
            d="M 590,0 C 535,80 460,160 460,250 C 460,340 520,430 580,500"
            fill="none"
            stroke="#2AD0C4"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#ctaGlowDesktop)"
          />
        </svg>
      </div>

      {/* Left Column: Textual Content */}
      <div className={styles.contentContainer}>
        <div className={styles.contentBox}>
          {/* Badge */}
          <div className={styles.kicker}>
            <Plus size={14} className={styles.kickerIcon} strokeWidth={3} />
            <span>Agendamento Descomplicado</span>
          </div>

          {/* Title with highlighted turquoise text */}
          <h2 className={styles.title}>
            Seu cuidado merece <span className={styles.highlight}>atenção especial.</span>
          </h2>

          {/* Description */}
          <p className={styles.description}>
            Estamos prontos para cuidar de você. Agende sua consulta de forma simples e rápida.
          </p>

          {/* WhatsApp Button */}
          <div className={styles.actionWrapper}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              aria-label="Agendar consulta pelo WhatsApp"
            >
              <MessageCircle size={22} className={styles.btnIcon} />
              <span>Agendar pelo WhatsApp</span>
              <ArrowRight size={20} className={styles.btnArrow} />
            </a>
          </div>

          {/* 3 Horizontal Meta Points with Vertical Dividers */}
          <div className={styles.metaStrip}>
            <div className={styles.metaItem}>
              <Phone size={17} className={styles.metaIcon} />
              <span>{clinic.phoneDisplay}</span>
            </div>

            <span className={styles.divider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <CalendarCheck size={17} className={styles.metaIcon} />
              <span>Atendimento ágil em horário comercial</span>
            </div>

            <span className={styles.divider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <ShieldCheck size={17} className={styles.metaIcon} />
              <span>Convênios e particular</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Curve Transition (visible on screens <= 900px) */}
      <div className={styles.mobileCurveContainer} aria-hidden="true">
        <svg
          className={styles.mobileCurveSvg}
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="ctaGlowMobile" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M 0,0 L 1000,0 L 1000,20 Q 500,58 0,20 Z"
            fill="#052F46"
          />
          <path
            d="M 0,20 Q 500,58 1000,20"
            fill="none"
            stroke="#2AD0C4"
            strokeWidth="3.5"
            filter="url(#ctaGlowMobile)"
          />
        </svg>
      </div>
    </section>
  );
}
