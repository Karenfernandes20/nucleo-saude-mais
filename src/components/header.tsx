'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Menu, X, CalendarCheck, MessageCircle, Phone, Clock, MapPin, FileText } from 'lucide-react';
import { clinic } from '@/data/clinic';
import ExamResultsModal from '@/components/exam-results-modal';

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

const navLinks = [
  { label: 'Início', href: '/', id: 'inicio' },
  { label: 'Consultas e Especialidades', href: '/#especialidades', id: 'especialidades' },
  { label: 'Exames', href: '/exames', id: 'exames' },
  { label: 'Exames Genéticos', href: '/exames-geneticos', id: 'geneticos' },
  { label: 'Fisioterapia e Reabilitação', href: '/fisioterapia', id: 'fisioterapia' },
  { label: 'Convênios', href: '/#convenios', id: 'convenios' },
  { label: 'Contato', href: '/#contato', id: 'contato' },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);

    if (link.href.startsWith('/#')) {
      const targetId = link.href.replace('/#', '');
      if (pathname === '/') {
        if (onNavigate) {
          onNavigate(targetId);
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            const offset = (document.querySelector('header.header')?.getBoundingClientRect().height ?? 80) + 12;
            const pos = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
          }
        }
      } else {
        router.push(link.href);
      }
    } else if (link.href === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
    } else {
      router.push(link.href);
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (pathname === link.href) return true;
    if (pathname === '/' && link.href === '/' && (activeSection === 'inicio' || !activeSection)) return true;
    if (pathname === '/' && activeSection === link.id) return true;
    return false;
  };

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(clinic.whatsappMessage)}`;

  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="site-container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <MapPin size={13} className="text-teal" />
              <span>{clinic.address}, Montes Claros – MG</span>
            </span>
            <span className="top-bar-separator">|</span>
            <span className="top-bar-item">
              <Clock size={13} className="text-teal" />
              <span>Seg a Sex: 07h às 18h</span>
            </span>
          </div>
          <div className="top-bar-right">
            <button
              type="button"
              onClick={() => setExamModalOpen(true)}
              className="top-bar-result-btn"
              aria-label="Consultar resultado de exames"
            >
              <FileText size={13} className="text-teal" />
              <span>Resultado de Exames</span>
            </button>
            <span className="top-bar-separator">|</span>
            <a
              href={`tel:${clinic.whatsappNumber}`}
              className="top-bar-link"
              aria-label="Ligue para a clínica"
            >
              <Phone size={13} className="text-teal" />
              <span>{clinic.phoneDisplay}</span>
            </a>
            <span className="top-bar-separator">|</span>
            <a
              href={clinic.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-link"
              aria-label="Instagram do Núcleo de Saúde Mais"
            >
              <span>{clinic.instagram}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="site-container header-inner">
          {/* Logo Original */}
          <button
            onClick={handleLogoClick}
            className="brand-logo-link"
            aria-label="Ir para o início do Núcleo de Saúde Mais"
          >
            <Image
              src="/images/brand/logo-header.png"
              alt="Clínica Núcleo de Saúde Mais - Montes Claros"
              width={220}
              height={70}
              priority
              className="header-logo-img"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link)}
                className={`nav-link ${isLinkActive(link) ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="header-actions">
            <button
              type="button"
              onClick={() => setExamModalOpen(true)}
              className="btn btn-outline-navy btn-sm header-results-btn"
              aria-label="Consultar resultado de exames"
            >
              <FileText size={15} />
              <span>Resultado de Exames</span>
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm header-cta-btn"
              aria-label="Agendar consulta pelo WhatsApp"
            >
              <MessageCircle size={17} />
              <span>Agendar consulta</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && createPortal(
          <div className="mobile-menu-overlay" style={{ zIndex: 10000, backdropFilter: "none" }} onClick={() => setMobileMenuOpen(false)}>
            <div
              className="mobile-menu-drawer"
              style={{ backgroundColor: "#fff", overflowY: "auto", overscrollBehavior: "contain", isolation: "isolate" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Menu móvel"
            >
              <div className="mobile-menu-header">
                <Image
                  src="/images/brand/logo-header.png"
                  alt="Núcleo de Saúde Mais"
                  width={180}
                  height={58}
                  className="mobile-menu-logo"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-close-btn"
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mobile-menu-links">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link)}
                    className={`mobile-nav-item ${isLinkActive(link) ? 'mobile-nav-item-active' : ''}`}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setExamModalOpen(true);
                  }}
                  className="mobile-nav-item mobile-nav-result-item"
                >
                  <FileText size={16} className="text-teal inline-icon" />
                  <span>Resultado de Exames</span>
                </button>
              </div>

              <div className="mobile-menu-footer">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block mobile-cta-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle size={18} />
                  <span>Agendar pelo WhatsApp</span>
                </a>

                <div className="mobile-contact-info">
                  <p>
                    <MapPin size={14} className="text-teal inline-icon" />
                    {clinic.address}
                  </p>
                  <p>
                    <Phone size={14} className="text-teal inline-icon" />
                    {clinic.phoneDisplay}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </header>

      {/* Modal de Consulta de Resultado de Exames WorkLab */}
      <ExamResultsModal
        isOpen={examModalOpen}
        onClose={() => setExamModalOpen(false)}
      />
    </>
  );
}
