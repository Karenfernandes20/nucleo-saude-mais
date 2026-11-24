'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Globe,
  Clock,
  Navigation,
  ExternalLink,
  Camera,
  Map as MapIcon,
} from 'lucide-react';
import { clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

export default function LocationContact() {
  const [activeTab, setActiveTab] = useState<'photo' | 'map'>('photo');

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de informações sobre localização e agendamento no Núcleo de Saúde Mais.'
  )}`;

  return (
    <section id="contato" className="section contact-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header-compact">
          <div className="section-kicker">
            <span className="kicker-line" />
            <span>ONDE ESTAMOS E CONTATO</span>
          </div>
          <h2 className="section-title">
            Fácil de chegar, <span className="text-navy-highlight">pronto para cuidar.</span>
          </h2>
          <p className="section-subtitle">
            Estamos no coração de Montes Claros, com estrutura acolhedora e equipe dedicada para
            esclarecer suas dúvidas.
          </p>
        </div>

        {/* Unified 2-Column Grid: Compact Cards on Left + Facade Image / Map on Right */}
        <div className="contact-unified-grid">
          {/* Left Column: 4 Compact Contact Containers in 2x2 Grid */}
          <div className="contact-cards-grid">
            {/* Card 1: Endereço */}
            <div className="contact-card-compact">
              <div className="card-compact-header">
                <div className="card-compact-icon">
                  <MapPin size={18} className="text-teal" />
                </div>
                <h3 className="card-compact-title">Nosso Endereço</h3>
              </div>
              <p className="card-compact-text">
                {clinic.address}
                <br />
                {clinic.cityState} — CEP {clinic.cep}
              </p>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-compact-action"
              >
                <Navigation size={13} />
                <span>Traçar rota no mapa</span>
              </a>
            </div>

            {/* Card 2: WhatsApp & Telefone */}
            <div className="contact-card-compact">
              <div className="card-compact-header">
                <div className="card-compact-icon">
                  <MessageCircle size={18} className="text-teal" />
                </div>
                <h3 className="card-compact-title">WhatsApp &amp; Telefone</h3>
              </div>
              <p className="card-compact-text">
                Atendimento direto para agendamento de consultas e exames.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="card-compact-phone-btn"
              >
                <Phone size={14} />
                <strong>{clinic.phoneDisplay}</strong>
              </a>
            </div>

            {/* Card 3: Horário de Funcionamento */}
            <div className="contact-card-compact">
              <div className="card-compact-header">
                <div className="card-compact-icon">
                  <Clock size={18} className="text-teal" />
                </div>
                <h3 className="card-compact-title">Horário de Atendimento</h3>
              </div>
              <div className="card-compact-hours">
                {clinic.workingHours.map((wh) => (
                  <div key={wh.days} className="hours-row">
                    <span className="hours-days">{wh.days}:</span>
                    <span className="hours-time">{wh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Canais Digitais */}
            <div className="contact-card-compact">
              <div className="card-compact-header">
                <div className="card-compact-icon">
                  <Instagram size={18} className="text-teal" />
                </div>
                <h3 className="card-compact-title">Canais Digitais</h3>
              </div>
              <div className="card-compact-digital">
                <a
                  href={clinic.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="digital-pill-compact"
                >
                  <Instagram size={13} />
                  <span>{clinic.instagram}</span>
                </a>
                <a
                  href={clinic.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="digital-pill-compact"
                >
                  <Globe size={13} />
                  <span>{clinic.website}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage (Facade Poster / Interactive Map) */}
          <div className="contact-visual-stage">
            {/* View Switcher Tabs */}
            <div className="visual-stage-tabs">
              <button
                type="button"
                onClick={() => setActiveTab('photo')}
                className={`stage-tab-btn ${activeTab === 'photo' ? 'active' : ''}`}
                aria-label="Ver foto oficial da fachada da clínica"
              >
                <Camera size={13} />
                <span>Foto da Fachada</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className={`stage-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
                aria-label="Ver mapa interativo no Google Maps"
              >
                <MapIcon size={13} />
                <span>Mapa Interativo</span>
              </button>
            </div>

            {/* Visual Content Frame */}
            <div className="stage-content-frame">
              {activeTab === 'photo' ? (
                <div className="stage-photo-view">
                  <Image
                    src="/images/clinica/location/estamos-pertinho.webp"
                    alt="Estamos pertinho de você - Fachada oficial da Clínica Núcleo de Saúde Mais em Montes Claros"
                    fill
                    sizes="(max-width: 860px) 100vw, 550px"
                    className="stage-facade-image"
                    priority
                  />
                  <div className="stage-photo-caption">
                    <BrandCross size={15} color="#FFFFFF" />
                    <span>Rua Januária, 684 — Centro, Montes Claros</span>
                  </div>
                </div>
              ) : (
                <div className="stage-map-view">
                  <iframe
                    title="Localização da Clínica Núcleo de Saúde Mais no Google Maps"
                    src={clinic.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="stage-map-iframe"
                  />
                  <a
                    href={clinic.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stage-map-route-btn"
                  >
                    <Navigation size={14} />
                    <span>Como chegar</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
