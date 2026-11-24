'use client';
import React from 'react';
import { Dna, Activity, FlaskConical, ArrowRight, MessageCircle } from 'lucide-react';
import { clinic } from '@/data/clinic';

const services = [
  { id: 'geneticos', title: 'Exames Genéticos', icon: Dna, description: 'Conheça os exames que auxiliam na investigação de condições hereditárias e na avaliação de riscos.', action: 'Conheça os exames' },
  { id: 'fisioterapia', title: 'Fisioterapia e Reabilitação', icon: Activity, description: 'Cuidado voltado à recuperação funcional, mobilidade e qualidade de vida.', action: 'Conheça os tratamentos' },
  { id: 'exames', title: 'Exames Diagnósticos', icon: FlaskConical, description: 'Exames laboratoriais, clínicos e de imagem em um só lugar.', action: 'Ver exames disponíveis' },
];
const geneticTopics = [
  ['Câncer hereditário', 'Painéis que investigam variantes associadas à predisposição hereditária a determinados tipos de câncer.'],
  ['Painéis genéticos', 'Análises de conjuntos de genes selecionados conforme a indicação clínica.'],
  ['Genética cardiovascular', 'Investigação de variantes relacionadas a determinadas condições cardíacas hereditárias.'],
  ['Sequenciamento do exoma', 'Análise das regiões codificadoras dos genes que pode auxiliar na investigação de doenças genéticas.'],
];
const rehabTopics = [
  ['Avaliação fisioterapêutica', 'Avaliação individual das necessidades, limitações e objetivos funcionais.'],
  ['Reabilitação funcional', 'Acompanhamento voltado à recuperação dos movimentos e das atividades cotidianas.'],
  ['Mobilidade e fortalecimento', 'Exercícios orientados conforme a avaliação profissional.'],
  ['Dores e recuperação', 'Orientação profissional para o manejo de sintomas e recuperação funcional.'],
];
function whatsapp(message: string) {
  return 'https://wa.me/' + clinic.whatsappNumber + '?text=' + encodeURIComponent(message);
}
export function PriorityCards({ onNavigate }: { onNavigate: (id: string) => void }) {
  return <div className="priority-services site-container">{services.map(({id,title,icon:Icon,description,action}) => <article key={id} className="priority-card"><Icon size={36} aria-hidden="true"/><h2>{title}</h2><p>{description}</p><button type="button" onClick={() => onNavigate(id)} className="priority-link">{action}<ArrowRight size={17}/></button></article>)}</div>;
}
export function PrioritySection({ kind }: { kind: 'geneticos' | 'fisioterapia' }) {
  const genetic = kind === 'geneticos';
  const Icon = genetic ? Dna : Activity;
  const title = genetic ? 'Conheça sua genética. Cuide do seu futuro.' : 'Recupere movimentos. Cuide da sua qualidade de vida.';
  const topics = genetic ? geneticTopics : rehabTopics;
  return <section id={kind} className={'section priority-section priority-' + kind}>
    <div className="site-container">
      <div className="priority-intro"><div><div className="section-kicker">{genetic ? 'GENÉTICA E SAÚDE' : 'FISIOTERAPIA E REABILITAÇÃO'}</div><h2 className="section-title">{title}</h2><p className="section-subtitle">{genetic ? 'Os exames genéticos podem auxiliar na investigação de condições hereditárias e orientar decisões clínicas. A indicação e a interpretação devem ser individualizadas.' : 'A fisioterapia busca melhorar a função, a mobilidade e a autonomia por meio de avaliação e acompanhamento profissional.'}</p></div><div className="priority-emblem" aria-hidden="true"><Icon size={100}/></div></div>
      <div className="priority-topic-grid">{topics.map(([name,description]) => <article key={name} className="priority-topic"><Icon size={26} aria-hidden="true"/><h3>{name}</h3><p>{description}</p><a href={whatsapp('Olá! Gostaria de informações sobre ' + name + ' no Núcleo de Saúde Mais.')} target="_blank" rel="noopener noreferrer" className="priority-link">Consultar equipe <ArrowRight size={16}/></a></article>)}</div>
      <div className="priority-note"><p>{genetic ? 'Consulte nossa equipe para confirmar a disponibilidade, indicação e preparo de cada exame. Resultados genéticos não determinam, isoladamente, um diagnóstico.' : 'Consulte nossa equipe sobre horários, modalidades disponíveis e agendamento de avaliação fisioterapêutica.'}</p><a className="btn btn-teal btn-md" href={whatsapp(genetic ? 'Olá! Gostaria de informações sobre exames genéticos.' : 'Olá! Gostaria de agendar uma avaliação de fisioterapia.')} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{genetic ? 'Consultar disponibilidade' : 'Agendar avaliação'}</a></div>
    </div>
  </section>;
}
