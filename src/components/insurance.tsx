'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
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

// 4 repeated sets to guarantee endless seamless loop in both directions
const CAROUSEL_COPIES = 4;

export default function Insurance() {
  const [searchTerm, setSearchTerm] = useState('');
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll & interaction refs
  const isManualPausedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartScrollRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Search results use single unique list (never duplicated)
  const filteredPartners = useMemo(() => {
    if (!searchTerm.trim()) return insurancePartners;
    const term = normalize(searchTerm);
    return insurancePartners.filter((p) => normalize(p.name).includes(term));
  }, [searchTerm]);

  // Repeated partners for the seamless infinite carousel
  const carouselPartners = useMemo(() => {
    return Array.from({ length: CAROUSEL_COPIES }, () => insurancePartners).flat();
  }, []);

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de consultar se meu convênio é atendido para a especialidade que preciso no Núcleo de Saúde Mais.'
  )}`;

  // Measure card step (width + gap) and single set width dynamically
  const getMetrics = useCallback(() => {
    const track = trackRef.current;
    if (!track) return { step: 235, singleSetWidth: 235 * insurancePartners.length };
    const cards = track.querySelectorAll<HTMLElement>('.insurance-carousel-card');
    if (cards.length < 2) return { step: 235, singleSetWidth: 235 * insurancePartners.length };

    const firstCard = cards[0];
    const secondCard = cards[1];
    const step = Math.max(1, secondCard.offsetLeft - firstCard.offsetLeft);

    const nextSetIndex = insurancePartners.length;
    const nextSetCard = cards[nextSetIndex];
    const singleSetWidth = nextSetCard
      ? Math.max(step * nextSetIndex, nextSetCard.offsetLeft - firstCard.offsetLeft)
      : step * nextSetIndex;

    return { step, singleSetWidth };
  }, []);

  // Initialize track scroll position on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const { singleSetWidth } = getMetrics();
    // Start at second set so user can scroll left or right immediately
    if (track.scrollLeft === 0) {
      track.scrollLeft = singleSetWidth;
      scrollPosRef.current = singleSetWidth;
    }
  }, [getMetrics]);

  // Continuous auto-movement loop via requestAnimationFrame
  useEffect(() => {
    // When searching, pause carousel
    if (searchTerm.trim()) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        isManualPausedRef.current = true;
        return;
      }
    }

    const track = trackRef.current;
    if (!track) return;

    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      // If manual interaction happened (arrow clicked or touch drag), stop permanently
      if (isManualPausedRef.current) {
        return;
      }

      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      const currentTrack = trackRef.current;
      if (currentTrack && !isHoveredRef.current && !isDraggingRef.current) {
        const { singleSetWidth } = getMetrics();

        // Smooth, calm drift: ~36px per second
        const SPEED_PX_PER_SEC = 36;
        scrollPosRef.current += SPEED_PX_PER_SEC * dt;

        // Wrap around seamlessly without gap or jump
        if (scrollPosRef.current >= singleSetWidth * 2) {
          scrollPosRef.current -= singleSetWidth;
          currentTrack.scrollLeft -= singleSetWidth;
        }

        currentTrack.scrollLeft = scrollPosRef.current;
      } else if (currentTrack) {
        // Keep position synchronized during hover
        scrollPosRef.current = currentTrack.scrollLeft;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [searchTerm, getMetrics]);

  // Manual navigation via left and right arrows
  const handleManualScroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    // Permanently stop automatic motion
    isManualPausedRef.current = true;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const { step, singleSetWidth } = getMetrics();
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.insurance-carousel-card'));
    let currentScroll = track.scrollLeft;

    // Boundary wrap-around for infinite manual arrow clicks
    if (currentScroll >= singleSetWidth * 2.5) {
      currentScroll -= singleSetWidth;
      track.scrollLeft = currentScroll;
    } else if (currentScroll <= singleSetWidth * 0.5) {
      currentScroll += singleSetWidth;
      track.scrollLeft = currentScroll;
    }

    let target = currentScroll;
    if (direction === 'right') {
      // Advance exactly one card, cleanly aligned
      const nextCard = cards.find((c) => c.offsetLeft > currentScroll + 4);
      target = nextCard ? nextCard.offsetLeft : currentScroll + step;
    } else {
      // Return exactly one card, cleanly aligned
      const prevCard = [...cards].reverse().find((c) => c.offsetLeft < currentScroll - 4);
      target = prevCard ? prevCard.offsetLeft : currentScroll - step;
    }

    scrollPosRef.current = target;
    track.scrollTo({
      left: target,
      behavior: 'smooth',
    });
  };

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    dragDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
    const deltaY = Math.abs(e.touches[0].clientY - (touchStartYRef.current ?? 0));
    dragDistanceRef.current = Math.max(dragDistanceRef.current, deltaX);

    // If user dragged horizontally, stop auto-movement permanently
    if (deltaX > 8 && deltaX > deltaY) {
      isManualPausedRef.current = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    // Keep small delay so link doesn't trigger if drag just finished
    setTimeout(() => {
      dragDistanceRef.current = 0;
    }, 120);
  };

  // Desktop pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only primary click
    pointerStartXRef.current = e.clientX;
    const track = trackRef.current;
    pointerStartScrollRef.current = track ? track.scrollLeft : 0;
    dragDistanceRef.current = 0;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerStartXRef.current === null) return;
    const deltaX = e.clientX - pointerStartXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);

    if (Math.abs(deltaX) > 6) {
      isDraggingRef.current = true;
      // Permanently stop auto-movement on manual drag
      isManualPausedRef.current = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const track = trackRef.current;
      if (track) {
        track.scrollLeft = pointerStartScrollRef.current - deltaX;
        scrollPosRef.current = track.scrollLeft;
      }
    }
  };

  const handlePointerUp = () => {
    pointerStartXRef.current = null;
    setTimeout(() => {
      isDraggingRef.current = false;
      dragDistanceRef.current = 0;
    }, 120);
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
                  aria-label="Ver convênio anterior"
                  title="Anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => handleManualScroll('right')}
                  className="carousel-arrow-btn"
                  aria-label="Ver próximo convênio"
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
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              lastTimeRef.current = performance.now();
            }}
          >
            {/* Edge Blur/Fade Shadows */}
            <div className="carousel-fade-left" aria-hidden="true" />
            <div className="carousel-fade-right" aria-hidden="true" />

            <div
              ref={trackRef}
              className="insurance-carousel-track"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
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
                    onClick={(e) => {
                      if (dragDistanceRef.current > 8) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
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
