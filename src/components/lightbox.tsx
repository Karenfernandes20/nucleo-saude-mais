'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { FacilityPhoto } from '@/data/clinic';

interface LightboxProps {
  photos: FacilityPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % photos.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, photos.length, onClose, onNavigate]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % photos.length);
  };

  return createPortal(
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador ampliado de fotos da clínica"
    >
      {/* Top Bar with Counter and Close Button */}
      <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-counter">
          <span className="lightbox-badge-category">{currentPhoto.category}</span>
          <span className="lightbox-count">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="lightbox-close-btn"
          aria-label="Fechar visualizador ampliado"
        >
          <X size={26} />
        </button>
      </div>

      {/* Main Container */}
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="lightbox-nav-btn lightbox-prev"
          aria-label="Foto anterior"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Image Display */}
        <div className="lightbox-image-stage">
          <Image
            src={currentPhoto.image}
            alt={currentPhoto.title}
            width={1200}
            height={800}
            className="lightbox-image"
            priority
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="lightbox-nav-btn lightbox-next"
          aria-label="Próxima foto"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Caption at Bottom */}
      <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
        <h4 className="lightbox-caption-title">{currentPhoto.title}</h4>
        <p className="lightbox-caption-desc">{currentPhoto.description}</p>
      </div>
    </div>,
    document.body
  );
}
