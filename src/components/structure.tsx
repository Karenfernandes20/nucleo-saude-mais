'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { facilityGallery } from '@/data/clinic';
import Lightbox from './lightbox';
import BrandCross from './brand-cross';

export default function Structure() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const mainPhoto = facilityGallery[0];
  const secondaryPhotos = facilityGallery.slice(1);

  return (
    <section id="estrutura" className="section structure-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="structure-header-center">
          <div className="section-kicker">
            <span className="kicker-line" />
            <span>INFRAESTRUTURA COMPLETA</span>
            <span className="kicker-line" />
          </div>

          <h2 className="section-title">
            Um espaço pensado para <span className="text-navy-highlight">cuidar de você.</span>
          </h2>

          <p className="section-subtitle centered-subtitle">
            Conheça as instalações reais da Clínica Núcleo de Saúde Mais: consultórios amplos,
            ambientes climatizados e recepção aconchegante no Centro de Montes Claros.
          </p>

          <div className="structure-tags-row">
            <span className="structure-tag-item">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Ambientes 100% Climatizados</span>
            </span>
            <span className="structure-tag-item">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Acessibilidade Completa</span>
            </span>
            <span className="structure-tag-item">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Consultórios Privativos</span>
            </span>
            <span className="structure-tag-item">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Localização Central de Fácil Acesso</span>
            </span>
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="structure-gallery-bento">
          {/* Main Large Photo (Column 1) */}
          <div
            className="gallery-item gallery-item-primary"
            onClick={() => setLightboxIndex(0)}
            role="button"
            tabIndex={0}
            aria-label={`Ampliar foto: ${mainPhoto.title}`}
          >
            <div className="gallery-image-wrapper">
              <Image
                src={mainPhoto.image}
                alt={mainPhoto.title}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className="gallery-photo"
              />
              <div className="gallery-overlay" />
              <div className="gallery-badge-featured">
                <BrandCross size={14} color="#FFFFFF" />
                <span>Foto Real da Clínica</span>
              </div>
              <div className="gallery-info">
                <span className="gallery-category-pill">{mainPhoto.category}</span>
                <h3 className="gallery-item-title">{mainPhoto.title}</h3>
                <p className="gallery-item-desc">{mainPhoto.description}</p>
                <span className="gallery-zoom-hint">
                  <Maximize2 size={16} />
                  <span>Clique para ampliar</span>
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Photos Grid (Column 2) */}
          <div className="gallery-secondary-grid">
            {secondaryPhotos.map((photo, index) => {
              const photoRealIndex = index + 1;
              return (
                <div
                  key={photo.title}
                  className="gallery-item gallery-item-secondary"
                  onClick={() => setLightboxIndex(photoRealIndex)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ampliar foto: ${photo.title}`}
                >
                  <div className="gallery-image-wrapper">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 900px) 50vw, 22vw"
                      className="gallery-photo"
                    />
                    <div className="gallery-overlay" />
                    <div className="gallery-info-compact">
                      <span className="gallery-category-pill-sm">{photo.category}</span>
                      <h4 className="gallery-item-title-sm">{photo.title}</h4>
                    </div>
                    <div className="gallery-hover-icon">
                      <Maximize2 size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={facilityGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
