import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingActions from '@/components/floating-actions';
import GeneticaExperience from '@/components/genetica-experience';

export const metadata: Metadata = {
  title: 'Exames Genéticos em Montes Claros | Núcleo de Saúde Mais',
  description:
    'Painéis genéticos avançados, avaliação de câncer hereditário, cardiogenética, sequenciamento de exoma (WES), neurogenética, farmacogenética e teste pré-natal (NIPT) em Montes Claros – MG.',
};

export default function ExamesGeneticosPage() {
  return (
    <div className="clinic-app-wrapper">
      <Header activeSection="geneticos" />

      <main id="main-content">
        <GeneticaExperience />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
