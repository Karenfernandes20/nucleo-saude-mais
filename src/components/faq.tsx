'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { faqItems, clinic } from '@/data/clinic';
import BrandCross from './brand-cross';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Tenho uma dúvida sobre os atendimentos da Clínica Núcleo de Saúde Mais.'
  )}`;

  return (
    <section className="section faq-section" aria-label="Dúvidas frequentes">
      <div className="site-container">
        <div className="faq-grid">
          {/* Left Column: Heading & Support CTA */}
          <div className="faq-intro-col">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>DÚVIDAS FREQUENTES</span>
            </div>

            <h2 className="section-title">
              Tudo o que você precisa saber <span className="text-navy-highlight">antes da consulta</span>
            </h2>

            <p className="faq-intro-text">
              Reunimos as respostas para as principais dúvidas sobre nossos atendimentos, convênios,
              prazos de exames e agendamento.
            </p>

            <div className="faq-help-card">
              <div className="faq-help-icon">
                <HelpCircle size={24} className="text-teal" />
              </div>
              <div className="faq-help-content">
                <strong>Ainda tem dúvidas?</strong>
                <p>Nossa equipe está à disposição no WhatsApp para ajudar você.</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-navy btn-sm faq-contact-btn"
                >
                  <MessageCircle size={16} />
                  <span>Falar com atendente</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="faq-accordion-col">
            <div className="faq-accordion-list">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`faq-accordion-item ${isOpen ? 'faq-item-open' : ''}`}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <div className="faq-arrow-circle">
                        <ChevronDown size={18} className="faq-chevron" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p className="faq-answer-text">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
