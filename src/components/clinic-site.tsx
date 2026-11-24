'use client';

import React, { useState, useEffect } from 'react';
import Header from './header';
import Hero from './hero';
import { PriorityCards, PrioritySection } from './priority-services';
import Differentials from './differentials';
import About from './about';
import Specialties from './specialties';
import Exams from './exams';
import Insurance from './insurance';
import Structure from './structure';
import AppointmentCTA from './appointment-cta';
import LocationContact from './location-contact';
import FAQ from './faq';
import Footer from './footer';
import FloatingActions from './floating-actions';

const sectionIds = [
  'inicio',
  'geneticos',
  'fisioterapia',
  'sobre',
  'especialidades',
  'exames',
  'convenios',
  'estrutura',
  'contato',
];

export default function ClinicSite() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = (document.querySelector('header.header')?.getBoundingClientRect().height ?? 80) + 12;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="clinic-app-wrapper">
      {/* 1. Header & Navigation */}
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main id="main-content">
        {/* 2. Hero Section (Primeira Dobra) */}
        <Hero onExploreSpecialties={() => scrollToSection('geneticos')} />
        <PriorityCards onNavigate={scrollToSection} />
        <PrioritySection kind="geneticos" />
        <PrioritySection kind="fisioterapia" />
        <Exams />

        {/* 3. Diferenciais da Clínica (4 cards) */}
        <Differentials />

        {/* 4. Sobre Nós (Missão e 3 Pilares) */}
        <About onExploreFacility={() => scrollToSection('estrutura')} />

        {/* 5. Especialidades Médicas (14 Especialidades + Modal + Busca) */}
        <Specialties />



        {/* 7. Convênios Atendidos (13 Logos Oficiais + Busca) */}
        <Insurance />

        {/* 8. Nossa Estrutura (Galeria Real + Lightbox Interativo) */}
        <Structure />

        {/* 9. CTA Principal de Agendamento (WhatsApp Oficial) */}
        <AppointmentCTA />

        {/* 10. Localização e Contato (Endereço, Mapa e Horários) */}
        <LocationContact />

        {/* 11. FAQ (Dúvidas Frequentes) */}
        <FAQ />
      </main>

      {/* 12. Footer Corporativo */}
      <Footer onNavigate={scrollToSection} />

      {/* 13. Ações Flutuantes (WhatsApp & Voltar ao Topo) */}
      <FloatingActions />
    </div>
  );
}
