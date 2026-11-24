'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, CalendarCheck, MessageCircle, Phone, Clock, MapPin } from 'lucide-react';
import { clinic } from '@/data/clinic';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const navLinks = [
  { label: 'Início', href: 'inicio' },
  { label: 'Sobre nós', href: 'sobre' },
  { label: 'Especialidades', href: 'especialidades' },
  { label: 'Exames', href: 'exames' },
  { label: 'Convênios', href: 'convenios' },
  { label: 'Contato', href: 'contato' },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
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
            onClick={() => handleLinkClick('inicio')}
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
                onClick={() => handleLinkClick(link.href)}
                className={`nav-link ${activeSection === link.href ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="header-actions">
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
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="mobile-menu-drawer"
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
                    onClick={() => handleLinkClick(link.href)}
                    className={`mobile-nav-item ${activeSection === link.href ? 'mobile-nav-item-active' : ''}`}
                  >
                    {link.label}
                  </button>
                ))}
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
          </div>
        )}
      </header>
    </>
  );
}
