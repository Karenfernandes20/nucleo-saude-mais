'use client';

import NextImage, { type ImageProps } from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowRight, ArrowUp, Baby, Bone, Brain, BrainCircuit, BriefcaseMedical,
  Building2, CalendarCheck2, Check, ChevronDown, Ear, FlaskConical, HeartHandshake,
  HeartPulse, Instagram, MapPin, Menu, MessageCircle, Navigation, Phone, Search,
  ShieldCheck, Sparkles, Stethoscope, Syringe, Users, X, type LucideIcon,
} from 'lucide-react';
import { clinic, exams, faqItems, insurancePartners, insurancePlans, specialties } from '@/data/clinic';

const iconMap: Record<string, LucideIcon> = {
  accessibility: Activity, activity: Activity, apple: Sparkles, baby: Baby, bone: Bone,
  brain: Brain, 'brain-circuit': BrainCircuit, 'briefcase-medical': BriefcaseMedical,
  ear: Ear, 'flask-conical': FlaskConical, 'heart-handshake': HeartHandshake,
  'heart-pulse': HeartPulse, stethoscope: Stethoscope, syringe: Syringe, users: Users,
};

function Icon({ name, ...props }: { name: string; size?: number; strokeWidth?: number; className?: string }) {
  const Component = iconMap[name] ?? Sparkles;
  return <Component {...props} />;
}

function Image(props: ImageProps) {
  return <NextImage {...props} loading={props.priority ? undefined : props.loading ?? 'eager'} />;
}

function whatsappUrl(message = 'Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de agendar uma consulta.') {
  return 'https://wa.me/' + clinic.whatsappNumber + '?text=' + encodeURIComponent(message);
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const navItems = [
  ['Início', 'inicio'], ['Especialidades', 'especialidades'], ['Exames', 'exames'],
  ['Convênios', 'convenios'], ['Nossa clínica', 'clinica'], ['Sobre nós', 'sobre'], ['FAQ', 'faq'],
] as const;

const facilityImages = [
  'estrutura_01_consultorio_angulo.png', 'estrutura_02_recepcao_espera.png',
  'estrutura_03_consultorio_branco.png', 'estrutura_04_consultorio_vertical.png',
  'estrutura_05_consultorio_logo.png', 'estrutura_06_recepcao_balcao.png',
  'estrutura_07_consultorio_amplo.png',
];

export default function ClinicSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [examSearch, setExamSearch] = useState('');
  const [insuranceSearch, setInsuranceSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTop, setShowTop] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const observed = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-30% 0px -58% 0px', threshold: [0.1, 0.35, 0.65] });
    observed.forEach((section) => observer.observe(section));
    const onScroll = () => setShowTop(window.scrollY > 560);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || Boolean(lightboxImage) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, lightboxImage]);

  const filteredSpecialties = useMemo(() => specialties.filter((item) => normalize(item.name).includes(normalize(specialtySearch))), [specialtySearch]);
  const filteredExams = useMemo(() => exams.filter((item) => normalize(item.name).includes(normalize(examSearch))), [examSearch]);
  const filteredInsurance = useMemo(() => insurancePlans.filter((item) => normalize(item).includes(normalize(insuranceSearch))), [insuranceSearch]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <main className="redesign-site">
      <header className="redesign-header">
        <div className="redesign-container redesign-header-inner">
          <button className="redesign-brand" onClick={() => scrollTo('inicio')} aria-label="Ir para o início">
            <Image src="/images/brand/logo-header.png" alt="Clínica Núcleo de Saúde Mais" width={210} height={78} priority />
          </button>
          <nav className={'redesign-nav' + (mobileOpen ? ' is-open' : '')} aria-label="Navegação principal">
            {navItems.map(([label, id]) => <button className={activeSection === id ? 'is-active' : ''} key={id} onClick={() => scrollTo(id)}>{label}</button>)}
          </nav>
          <a className="redesign-header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Agendar pelo WhatsApp</a>
          <button className="redesign-menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <div className="redesign-mobile-nav">{navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}<a href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}><MessageCircle size={18} /> Agendar pelo WhatsApp</a></div>}
      </header>

      <section id="inicio" className="redesign-hero redesign-anchor">
        <div className="redesign-container redesign-hero-grid">
          <div className="redesign-hero-copy">
            <p className="redesign-eyebrow"><MapPin size={15} /> Montes Claros — MG</p>
            <h1>Sua saúde merece cuidado. E você merece facilidade para cuidar dela.</h1>
            <p className="redesign-lead">Consultas, exames e diversas especialidades em um só lugar. Atendimento humanizado, preços acessíveis e agendamento fácil.</p>
            <div className="redesign-actions">
              <a className="redesign-button redesign-button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer"><CalendarCheck2 size={18} /> Agendar minha consulta <ArrowRight size={16} /></a>
              <button className="redesign-button redesign-button-outline" onClick={() => scrollTo('especialidades')}>Conhecer especialidades <ArrowRight size={16} /></button>
            </div>
            <div className="redesign-trust-row"><span><HeartPulse size={19} /> Atendimento humanizado</span><span><Stethoscope size={19} /> Consultas e exames</span><span><ShieldCheck size={19} /> Cuidado com segurança</span></div>
          </div>
          <div className="redesign-hero-image"><Image src="/images/clinica/team/doutora.png" alt="Profissional de saúde sorrindo em clínica moderna" fill priority sizes="(max-width: 700px) 100vw, 52vw" /><div className="redesign-hero-image-wash" /></div>
        </div>
      </section>

      <section className="redesign-specialty-intro"><div className="redesign-container"><p className="redesign-eyebrow redesign-eyebrow-centered">ATENDIMENTO COMPLETO</p><h2>Encontre o atendimento que você precisa</h2><p>Diversas especialidades para cuidar de você e sua família.</p></div></section>

      <section id="especialidades" className="redesign-section redesign-anchor">
        <div className="redesign-container">
          <div className="redesign-section-heading"><div><p className="redesign-kicker">ESPECIALIDADES MÉDICAS</p><h2>Cuidado especializado, mais perto de você.</h2></div><div className="redesign-search"><Search size={18} /><input value={specialtySearch} onChange={(event) => setSpecialtySearch(event.target.value)} placeholder="Buscar especialidade" aria-label="Buscar especialidade" /></div></div>
          <div className="redesign-specialty-grid">{filteredSpecialties.map((specialty) => <a className="redesign-specialty-card" key={specialty.name} href={whatsappUrl('Olá! Gostaria de agendar uma consulta de ' + specialty.name + ' na Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer"><span className="redesign-icon-box"><Icon name={specialty.icon} size={29} /></span><strong>{specialty.name}</strong><span>Consultar <ArrowRight size={14} /></span></a>)}</div>
          {!filteredSpecialties.length && <p className="redesign-empty">Nenhuma especialidade encontrada.</p>}
        </div>
      </section>

      <section id="exames" className="redesign-section redesign-section-soft redesign-anchor">
        <div className="redesign-container redesign-split-section"><div className="redesign-feature-image"><Image src="/images/clinica/facility/estrutura_05_consultorio_logo.png" alt="Consultório da Clínica Núcleo de Saúde Mais" fill sizes="(max-width: 700px) 100vw, 45vw" /></div><div className="redesign-feature-copy"><p className="redesign-kicker">EXAMES E DIAGNÓSTICOS</p><h2>Exames com precisão e agilidade</h2><p>Realize seus exames com praticidade e confirme com nossa equipe a disponibilidade do serviço ideal para você.</p><div className="redesign-result-note"><FlaskConical size={23} /> Resultados laboratoriais <strong>{clinic.laboratoryTurnaround}</strong></div><a className="redesign-button redesign-button-primary" href={whatsappUrl('Olá! Gostaria de consultar os exames disponíveis na Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer">Ver exames disponíveis <ArrowRight size={16} /></a></div></div>
        <div className="redesign-container redesign-inline-list"><div className="redesign-section-heading redesign-compact-heading"><div><p className="redesign-kicker">SERVIÇOS DISPONÍVEIS</p><h3>Exames para diferentes necessidades</h3></div><div className="redesign-search"><Search size={18} /><input value={examSearch} onChange={(event) => setExamSearch(event.target.value)} placeholder="Buscar exame" aria-label="Buscar exame" /></div></div><div className="redesign-chip-grid">{filteredExams.map((exam) => <a className="redesign-chip" key={exam.name} href={whatsappUrl('Olá! Gostaria de saber mais sobre ' + exam.name + ' na Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer"><Icon name={exam.icon} size={21} /> {exam.name} <ArrowRight size={14} /></a>)}</div></div>
      </section>

      <section id="convenios" className="redesign-section redesign-anchor"><div className="redesign-container"><div className="redesign-section-heading"><div><p className="redesign-kicker">CONVÊNIOS E PLANOS</p><h2>Seu plano de saúde é atendido aqui?</h2><p>A cobertura pode variar conforme a especialidade e o procedimento. Consulte nossa equipe antes do agendamento.</p></div><a className="redesign-button redesign-button-outline" href={whatsappUrl('Olá! Gostaria de confirmar se meu convênio é atendido pela Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer">Consultar meu convênio <ArrowRight size={16} /></a></div><div className="redesign-partner-strip" aria-label="Logos dos convênios atendidos">{insurancePartners.map((partner) => <div className="redesign-partner" key={partner.name}>{partner.image ? <Image src={partner.image} alt={'Logo do convênio ' + partner.name} width={210} height={100} /> : <strong>{partner.name}</strong>}</div>)}</div><div className="redesign-insurance-box"><div className="redesign-search"><Search size={18} /><input value={insuranceSearch} onChange={(event) => setInsuranceSearch(event.target.value)} placeholder="Pesquisar convênio" aria-label="Pesquisar convênio" /></div><div className="redesign-insurance-list">{filteredInsurance.map((plan) => <span key={plan}><Check size={15} /> {plan}</span>)}</div><p className="redesign-disclaimer"><ShieldCheck size={17} /> A relação de convênios deve ser confirmada antes do atendimento.</p></div></div></section>

      <section className="redesign-section redesign-team-section"><div className="redesign-container redesign-team-grid"><div className="redesign-team-image"><Image src="/images/clinica/team/profissional-clinica.png" alt="Profissional de saúde em uma clínica moderna" fill sizes="(max-width: 700px) 100vw, 45vw" /></div><div className="redesign-team-copy"><p className="redesign-kicker">PROFISSIONAIS DE SAÚDE</p><h2>Uma equipe preparada para cuidar de você.</h2><p>O Núcleo de Saúde Mais reúne atendimento em diferentes especialidades. Para conhecer os profissionais disponíveis e confirmar horários, fale diretamente com nossa equipe.</p><a className="redesign-button redesign-button-primary" href={whatsappUrl('Olá! Gostaria de conhecer os profissionais e os horários disponíveis na Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer">Conhecer profissionais <ArrowRight size={16} /></a></div></div></section>

      <section id="clinica" className="redesign-section redesign-section-soft redesign-anchor"><div className="redesign-container"><div className="redesign-section-heading"><div><p className="redesign-kicker">NOSSA ESTRUTURA</p><h2>Um ambiente preparado para receber você.</h2><p>Conheça os consultórios, a recepção e os espaços reais da Clínica Núcleo de Saúde Mais.</p></div><span className="redesign-tag"><Building2 size={16} /> Estrutura real da clínica</span></div><div className="redesign-gallery">{facilityImages.map((image, index) => <button className={index === 0 ? 'redesign-gallery-main' : ''} key={image} onClick={() => setLightboxImage('/images/clinica/facility/' + image)} aria-label={'Ampliar foto ' + (index + 1) + ' da estrutura'}><Image src={'/images/clinica/facility/' + image} alt={'Estrutura da Clínica Núcleo de Saúde Mais, foto ' + (index + 1)} fill sizes="(max-width: 700px) 50vw, 30vw" /></button>)}</div></div></section>

      <section id="sobre" className="redesign-section redesign-anchor"><div className="redesign-container redesign-about-grid"><div className="redesign-about-image"><Image src="/images/clinica/facade/fachada.png" alt="Fachada da Clínica Núcleo de Saúde Mais" fill sizes="(max-width: 700px) 100vw, 48vw" /></div><div className="redesign-about-copy"><p className="redesign-kicker">SOBRE NÓS</p><h2>Mais do que consultas, queremos que você se sinta cuidado.</h2><p>O Núcleo de Saúde Mais é uma clínica médica e de exames em Montes Claros, criada para reunir cuidado, praticidade e diferentes possibilidades de atendimento em um só lugar.</p><p>Nosso compromisso é oferecer uma experiência acolhedora, moderna e acessível, com orientação clara em cada etapa.</p><div className="redesign-about-points"><span><Check size={16} /> Atendimento humanizado</span><span><Check size={16} /> Profissionais qualificados</span><span><Check size={16} /> Consultas e exames no mesmo lugar</span></div></div></div></section>

      <section id="faq" className="redesign-section redesign-section-soft redesign-anchor"><div className="redesign-container redesign-faq-grid"><div className="redesign-section-heading"><div><p className="redesign-kicker">PERGUNTAS FREQUENTES</p><h2>As respostas que você procura.</h2><p>Confira informações importantes sobre a clínica e o agendamento.</p></div><a className="redesign-button redesign-button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar com a equipe <ArrowRight size={16} /></a></div><div className="redesign-faq-list">{faqItems.map((item, index) => <div className={'redesign-faq-item' + (openFaq === index ? ' is-open' : '')} key={item.question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{item.question}</span>{openFaq === index ? <ArrowUp size={18} /> : <ChevronDown size={18} />}</button>{openFaq === index && <p>{item.answer}</p>}</div>)}</div></div></section>

      <section id="localizacao" className="redesign-section redesign-location redesign-anchor"><div className="redesign-container redesign-location-grid"><div><p className="redesign-kicker redesign-kicker-light">ONDE ESTAMOS</p><h2>Atendimento em Montes Claros — MG.</h2><p>{clinic.address}, Brasil.</p><a className="redesign-button redesign-button-light" href={clinic.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={17} /> Como chegar <ArrowRight size={16} /></a></div><div className="redesign-map"><iframe title="Mapa da Clínica Núcleo de Saúde Mais" src={clinic.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={clinic.mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowRight size={14} /></a></div></div></section>

      <section className="redesign-final-cta"><div className="redesign-container redesign-final-inner"><div><p className="redesign-kicker redesign-kicker-light">CLÍNICA NÚCLEO DE SAÚDE MAIS</p><h2>Vamos cuidar de você?</h2><p>Agende sua consulta pelo WhatsApp e fale com nossa equipe.</p></div><a className="redesign-button redesign-button-light" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Agendar pelo WhatsApp <ArrowRight size={16} /></a></div></section>

      <footer className="redesign-footer"><div className="redesign-container redesign-footer-grid"><div><Image src="/images/brand/logo-footer.png" alt="Clínica Núcleo de Saúde Mais" width={190} height={90} /><p>Consultas, exames e cuidado em Montes Claros.</p></div><div><h3>Links rápidos</h3>{navItems.slice(0, 5).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div><h3>Contato</h3><a href={whatsappUrl()} target="_blank" rel="noreferrer"><Phone size={16} /> {clinic.phone}</a><a href={clinic.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> {clinic.instagram}</a><p><MapPin size={16} /> {clinic.address}</p></div></div><div className="redesign-footer-bottom">© {new Date().getFullYear()} Clínica Núcleo de Saúde Mais. Todos os direitos reservados.</div></footer>

      <div className="redesign-floating-actions"><a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp"><MessageCircle size={25} /></a>{showTop && <button onClick={() => scrollTo('inicio')} aria-label="Voltar ao topo"><ArrowUp size={20} /></button>}</div>
      {lightboxImage && <div className="redesign-lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada" onClick={() => setLightboxImage(null)}><button onClick={() => setLightboxImage(null)} aria-label="Fechar imagem"><X /></button><div onClick={(event) => event.stopPropagation()}><Image src={lightboxImage} alt="Imagem ampliada da estrutura da clínica" fill sizes="90vw" /></div></div>}
    </main>
  );
}
