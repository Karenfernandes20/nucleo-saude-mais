'use client';

import React, { useEffect } from 'react';
import { X, Check, CalendarCheck, ArrowRight, Stethoscope } from 'lucide-react';
import { Specialty, clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

interface SpecialtyModalProps {
  specialty: Specialty | null;
  onClose: () => void;
}

export default function SpecialtyModal({ specialty, onClose }: SpecialtyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (specialty) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [specialty, onClose]);

  if (!specialty) return null;

  const whatsappSpecialtyHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de agendar uma consulta de ${specialty.name} no Núcleo de Saúde Mais.`
  )}`;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container specialty-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="modal-category">{specialty.category || 'Especialidade Médica'}</span>
            <h3 className="modal-title">{specialty.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Fechar detalhes da especialidade"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p className="specialty-modal-desc">{specialty.description}</p>

          <div className="specialty-benefits-box">
            <h4 className="benefits-title">
              <BrandCross size={16} color="#43B8BA" />
              <span>O que está incluso no atendimento:</span>
            </h4>
            <ul className="benefits-list">
              {specialty.benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <Check size={16} className="text-teal benefit-icon" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="specialty-modal-alert">
            <Stethoscope size={18} className="text-teal" />
            <span>Consultas com hora marcada no Centro de Montes Claros. Aceitamos convênios e particular.</span>
          </div>
        </div>

        {/* Modal Footer with Direct WhatsApp CTA */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-outline-navy btn-sm">
            Voltar
          </button>
          <a
            href={whatsappSpecialtyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal btn-md"
          >
            <CalendarCheck size={18} />
            <span>Agendar {specialty.name}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
