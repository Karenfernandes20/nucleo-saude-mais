'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import {
  Search,
  ShieldCheck,
  Check,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { insurancePartners, clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function Insurance() {
  const [searchTerm, setSearchTerm] = useState('');
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredPartners = useMemo(() => {
    if (!searchTerm.trim()) return insurancePartners;
    const term = normalize(searchTerm);
    return insurancePartners.filter((p) => normalize(p.name).includes(term));
  }, [searchTerm]);

  const carouselPartners = insurancePartners;

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de consultar se meu convênio é atendido para a especialidade que preciso no Núcleo de Saúde Mais.'
  )}`;

  const handleManualScroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;
    const start = cards[0].offsetLeft;
    const positions = cards.map(card => card.offsetLeft - start);
    const max = track.scrollWidth - track.clientWidth;
    const stops = Array.from(new Set(positions.map(position => Math.min(position, max))));
    const current = track.scrollLeft;
    const target = direction === 'right'
      ? stops.find(position => position > current + 2) ?? 0
      : [...stops].reverse().find(position => position < current - 2) ?? max;
    track.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section id="convenios" className="section insurance-section">
      <div className="site-container">
        {/* Header */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>COBERTURA E PARCERIAS</span>
            </div>
            <h2 className="section-title">
              Convênios e Planos <span className="text-navy-highlight">Atendidos</span>
            </h2>
            <p className="section-subtitle">
              Trabalhamos com os principais planos de saúde e cartões de benefício para facilitar seu
              acesso à saúde de qualidade.
            </p>
          </div>

          {/* Search Box & Carousel Controls */}
          <div className="insurance-header-actions">
            <div className="insurance-search-box">
              <div className="search-input-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar seu plano..."
                  aria-label="Buscar convênio atendido"
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="search-clear-btn"
                    aria-label="Limpar busca"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Prev / Next Manual Carousel Arrows */}
            {!searchTerm && (
              <div className="carousel-nav-arrows">
                <button
                  onClick={() => handleManualScroll('left')}
                  className="carousel-arrow-btn"
                  aria-label="Ver convênios anteriores"
                  title="Anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => handleManualScroll('right')}
                  className="carousel-arrow-btn"
                  aria-label="Ver próximos convênios"
                  title="Próximo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 1. Mode: Continuous Infinite Carousel (when not searching) */}
        {!searchTerm ? (
          <div
            className="insurance-carousel-wrapper"
            aria-label="Carrossel de convênios atendidos"
          >
            {/* Edge Blur/Fade Shadows */}
            <div className="carousel-fade-left" aria-hidden="true" />
            <div className="carousel-fade-right" aria-hidden="true" />

            <div
              ref={trackRef}
              className="insurance-carousel-track insurance-carousel-manual"
            >
              {carouselPartners.map((partner, index) => {
                const partnerWhatsAppHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                  `Olá! Gostaria de confirmar se o convênio ${partner.name} é atendido para consultas e exames no Núcleo de Saúde Mais.`
                )}`;

                return (
                  <a
                    key={`${partner.name}-${index}`}
                    href={partnerWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="insurance-card insurance-carousel-card"
                    title={`Consultar cobertura do convênio ${partner.name}`}
                  >
                    <div className="insurance-image-container">
                      <Image
                        src={partner.image}
                        alt={`Logo do convênio ${partner.name}`}
                        width={180}
                        height={80}
                        className="insurance-logo-img"
                      />
                    </div>
                    <div className="insurance-card-caption">
                      <span className="insurance-name-text">{partner.name}</span>
                      <span className="insurance-status-pill">
                        <Check size={12} className="text-teal" />
                        <span>Confirmar</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          /* 2. Mode: Filtered Search Results Grid */
          <div className="insurance-logos-grid" aria-label="Resultados da busca de convênios">
            {filteredPartners.map((partner) => {
              const partnerWhatsAppHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                `Olá! Gostaria de confirmar se o convênio ${partner.name} é atendido para consultas e exames no Núcleo de Saúde Mais.`
              )}`;

              return (
                <a
                  key={partner.name}
                  href={partnerWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insurance-card"
                  title={`Consultar cobertura do convênio ${partner.name}`}
                >
                  <div className="insurance-image-container">
                    <Image
                      src={partner.image}
                      alt={`Logo do convênio ${partner.name}`}
                      width={180}
                      height={80}
                      className="insurance-logo-img"
                    />
                  </div>
                  <div className="insurance-card-caption">
                    <span className="insurance-name-text">{partner.name}</span>
                    <span className="insurance-status-pill">
                      <Check size={12} className="text-teal" />
                      <span>Confirmar</span>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Empty Search Feedback */}
        {searchTerm && filteredPartners.length === 0 && (
          <div className="empty-search-state">
            <BrandCross size={32} color="#9C9B9B" opacity={0.4} />
            <p>Nenhum convênio encontrado com &quot;{searchTerm}&quot;.</p>
            <p className="empty-search-hint">
              Não encontrou seu plano na lista? Fale conosco para verificar a aceitação por reembolso
              ou condições especiais particulares.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-navy btn-sm"
            >
              Consultar via WhatsApp
            </a>
          </div>
        )}

        {/* Informative Disclaimer Banner */}
        <div className="insurance-footer-banner">
          <div className="insurance-disclaimer-info">
            <ShieldCheck size={22} className="text-teal flex-shrink-0" />
            <p>
              <strong>Atenção:</strong> A cobertura e abrangência dos planos pode variar de acordo com a
              especialidade médica, exame ou procedimento solicitado. Recomendamos confirmar a cobertura
              previamente com nossa equipe.
            </p>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal btn-md insurance-check-btn"
          >
            <MessageCircle size={18} />
            <span>Consultar meu convênio</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
