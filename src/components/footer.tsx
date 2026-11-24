'use client';

import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Globe,
  Heart,
  ArrowUp,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { clinic, specialties } from '@/data/clinic';
import BrandCross from './brand-cross';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de tirar uma dúvida.'
  )}`;

  const quickLinks = [
    { label: 'Início', id: 'inicio' },
    { label: 'Exames Genéticos', id: 'geneticos' },
    { label: 'Fisioterapia e Reabilitação', id: 'fisioterapia' },
    { label: 'Sobre nós', id: 'sobre' },
    { label: 'Especialidades', id: 'especialidades' },
    { label: 'Exames', id: 'exames' },
    { label: 'Convênios', id: 'convenios' },
    { label: 'Nossa Estrutura', id: 'estrutura' },
    { label: 'Contato', id: 'contato' },
  ];

  // Pick top 8 specialties for footer list
  const featuredSpecialties = specialties.slice(0, 8);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      {/* Top Border Accent */}
      <div className="footer-top-accent" />

      <div className="site-container footer-container">
        <div className="footer-main-grid">
          {/* Column 1: Brand & Presentation */}
          <div className="footer-col footer-col-brand">
            <button
              onClick={() => onNavigate('inicio')}
              className="footer-logo-btn"
              aria-label="Ir para o início"
            >
              <Image
                src="/images/brand/logo-footer.png"
                alt="Clínica Núcleo de Saúde Mais"
                width={210}
                height={85}
                className="footer-logo-img"
              />
            </button>

            <p className="footer-brand-desc">
              Clínica de consultas médicas e exames em Montes Claros – MG. Cuidado humanizado,
              tecnologia de ponta e facilidade para a sua saúde.
            </p>

            <div className="footer-tech-director">
              <ShieldCheck size={16} className="text-teal" />
              <span>
                <strong>{clinic.technicalLead}</strong> • {clinic.crm}
              </span>
            </div>

            <div className="footer-social-links">
              <a
                href={clinic.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram do Núcleo de Saúde Mais"
              >
                <Instagram size={18} />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="WhatsApp do Núcleo de Saúde Mais"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={clinic.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Website oficial"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <BrandCross size={12} color="#43B8BA" />
              <span>Navegação Rápida</span>
            </h4>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="footer-link-btn"
                  >
                    <ChevronRight size={13} className="text-teal" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <BrandCross size={12} color="#43B8BA" />
              <span>Especialidades</span>
            </h4>
            <ul className="footer-links-list">
              {featuredSpecialties.map((spec) => (
                <li key={spec.name}>
                  <button
                    onClick={() => onNavigate('especialidades')}
                    className="footer-link-btn"
                  >
                    <ChevronRight size={13} className="text-teal" />
                    <span>{spec.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">
              <BrandCross size={12} color="#43B8BA" />
              <span>Atendimento</span>
            </h4>

            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <MapPin size={17} className="text-teal flex-shrink-0" />
                <span>
                  {clinic.address}
                  <br />
                  Montes Claros – MG
                </span>
              </div>

              <div className="footer-contact-row">
                <MessageCircle size={17} className="text-teal flex-shrink-0" />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {clinic.phoneDisplay} (WhatsApp)
                </a>
              </div>

              <div className="footer-hours-box">
                <strong>Horário de Funcionamento:</strong>
                <p>Segunda a Sexta: 07:00 às 18:00</p>
                <p>Sábado e Domingo: Fechado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">
            © {currentYear} Clínica Núcleo de Saúde Mais. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
