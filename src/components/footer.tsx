'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  onNavigate?: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de tirar uma dúvida.'
  )}`;

  const quickLinks = [
    { label: 'Início', href: '/', id: 'inicio' },
    { label: 'Resultado de Exames', href: '/resultado-exames', id: 'resultado-exames' },
    { label: 'Exames Genéticos', href: '/exames-geneticos', id: 'geneticos' },
    { label: 'Fisioterapia e Reabilitação', href: '/fisioterapia', id: 'fisioterapia' },
    { label: 'Exames Diagnósticos', href: '/exames', id: 'exames' },
    { label: 'Sobre nós', href: '/#sobre', id: 'sobre' },
    { label: 'Especialidades', href: '/#especialidades', id: 'especialidades' },
    { label: 'Convênios', href: '/#convenios', id: 'convenios' },
    { label: 'Nossa Estrutura', href: '/#estrutura', id: 'estrutura' },
    { label: 'Contato', href: '/#contato', id: 'contato' },
  ];

  const handleLinkClick = (href: string, id: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
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
        router.push(href);
      }
    } else if (href === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
    } else {
      router.push(href);
    }
  };

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
              onClick={() => handleLinkClick('/', 'inicio')}
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
                href="https://www.nucleodesaudemais.com"
                className="footer-social-btn"
                aria-label="Site Oficial do Núcleo de Saúde Mais"
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
                    onClick={() => handleLinkClick(link.href, link.id)}
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
                    onClick={() => handleLinkClick('/#especialidades', 'especialidades')}
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