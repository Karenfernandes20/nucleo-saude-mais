'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { clinic } from '@/data/clinic';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de agendar uma consulta.'
  )}`;

  return (
    <div className="floating-actions-container" aria-label="Ações rápidas flutuantes">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="floating-btn floating-btn-top"
          aria-label="Voltar ao início da página"
          title="Voltar ao topo"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Floating WhatsApp with notification pill */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn-whatsapp"
        aria-label="Falar conosco no WhatsApp para agendamento"
        title="Agende sua consulta pelo WhatsApp"
      >
        <span className="floating-whatsapp-pulse" aria-hidden="true" />
        <MessageCircle size={26} />
        <span className="floating-whatsapp-tooltip">Agendar pelo WhatsApp</span>
      </a>
    </div>
  );
}
