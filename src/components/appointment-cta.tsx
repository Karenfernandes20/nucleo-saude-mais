'use client';

import React from 'react';
import { MessageCircle, ArrowRight, Phone, CalendarCheck, ShieldCheck, Plus } from 'lucide-react';
import { clinic } from '@/data/clinic';
import Image from 'next/image';
import styles from './appointment-cta.module.css';

export default function AppointmentCTA() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma consulta no Núcleo de Saúde Mais.'
  )}`;

  return (
    <section className={styles.section} aria-label="Agendamento rápido">
      <div className={styles.content}>
        <div className={styles.kicker}><Plus size={22} aria-hidden="true"/> Agendamento descomplicado</div>
        <h2>Seu cuidado merece <span>atenção especial.</span></h2>
        <p>Estamos prontos para cuidar de você. Agende sua consulta de forma simples e rápida.</p>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.button} aria-label="Agendar consulta pelo WhatsApp agora">
          <MessageCircle size={26} aria-hidden="true"/><span>Agendar pelo WhatsApp</span><ArrowRight size={22} aria-hidden="true"/>
        </a>
        <div className={styles.meta}>
          <div><Phone size={24} aria-hidden="true"/><span>{clinic.phoneDisplay}</span></div>
          <div><CalendarCheck size={24} aria-hidden="true"/><span>Atendimento ágil em horário comercial</span></div>
          <div><ShieldCheck size={24} aria-hidden="true"/><span>Convênios e particular</span></div>
        </div>
      </div>
      <div className={styles.photo}>
        <Image src="/images/clinica/facility/estrutura_06_recepcao_balcao.webp" alt="Recepção da clínica Núcleo de Saúde Mais" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.image}/>
      </div>
    </section>
  );
}
