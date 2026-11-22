'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Accessibility,
  Activity,
  Apple,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Baby,
  Bone,
  Brain,
  BrainCircuit,
  BriefcaseMedical,
  Building2,
  CalendarCheck2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Ear,
  Facebook,
  FlaskConical,
  Gem,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  MessagesSquare,
  Navigation,
  Phone,
  Scan,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Users,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { clinic, exams, faqItems, insurancePartners, insurancePlans, reasons, specialties, specialtyDetails, steps, valueCards } from '@/data/clinic';

type IconName = string;

const iconMap: Record<string, LucideIcon> = {
  accessibility: Accessibility,
  activity: Activity,
  apple: Apple,
  baby: Baby,
  bone: Bone,
  brain: Brain,
  'brain-circuit': BrainCircuit,
  'briefcase-medical': BriefcaseMedical,
  'building-2': Building2,
  'calendar-check-2': CalendarCheck2,
  ear: Ear,
  'flask-conical': FlaskConical,
  gem: Gem,
  'hand-heart': HandHeart,
  'heart-handshake': HeartHandshake,
  'heart-pulse': HeartPulse,
  'message-circle': MessageCircle,
  'messages-square': MessagesSquare,
  scan: Scan,
  'scan-line': ScanLine,
  star: Star,
  stethoscope: Stethoscope,
  syringe: Syringe,
  users: Users,
  'users-round': UsersRound,
  venus: HeartPulse,
};

function Icon({ name, ...props }: { name: IconName; size?: number; strokeWidth?: number; className?: string }) {
  const Component = iconMap[name] ?? Sparkles;
  return <Component {...props} />;
}

function whatsappUrl(message = 'Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de agendar uma consulta.') {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const navItems = [
  ['Sobre Nós', 'sobre'],
  ['Planos Atendidos', 'convenios'],
  ['Especialistas', 'especialidades'],
  ['Exames', 'exames'],
];

const footerNavItems = [
  ...navItems,
  ['Localização', 'localizacao'],
  ['Contato', 'contato'],
];

export default function ClinicSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [openFaq, setOpenFaq] = useState(0);
  const [insuranceSearch, setInsuranceSearch] = useState('');
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [selectedSpecialtyName, setSelectedSpecialtyName] = useState(specialties[0].name);
  const [showTop, setShowTop] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-28% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, lightboxOpen]);

  const filteredInsurance = useMemo(() => insurancePlans.filter((plan) => plan.toLowerCase().includes(insuranceSearch.toLowerCase())), [insuranceSearch]);
  const filteredSpecialties = useMemo(() => specialties.filter((specialty) => normalizeSearch(specialty.name).includes(normalizeSearch(specialtySearch))), [specialtySearch]);
  const selectedSpecialty = specialties.find((specialty) => specialty.name === selectedSpecialtyName) ?? specialties[0];
  const selectedSpecialtyDetails = specialtyDetails[selectedSpecialty.name];

  const closeMenu = () => setMobileOpen(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
  };

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <button className="brand-button" onClick={() => scrollTo('inicio')} aria-label="Ir para o início">
            <Image src="/images/brand/logo-header.png" alt="Clínica Núcleo de Saúde Mais" width={230} height={85} priority className="header-logo" />
          </button>

          <nav className={`desktop-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
            {navItems.map(([label, id]) => (
              <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>

          <a className="header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={20} /> <span>Agendar pelo WhatsApp</span>
          </a>
          <button className="menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && <div className="mobile-nav">{navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}<a href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={closeMenu}><MessageCircle size={18} /> Agendar pelo WhatsApp</a></div>}
      </header>

      <section id="inicio" className="hero section-anchor">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span /> Clínica médica multiespecializada</div>
            <h1>Cuidado médico de qualidade, com várias especialidades em um só lugar.</h1>
            <p>Agende sua consulta com rapidez e conte com atendimento humanizado, especialistas qualificados e exames em um ambiente moderno e acessível.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer"><CalendarCheck2 size={19} /> Agendar consulta <ArrowRight size={17} /></a>
              <button className="button button-outline" onClick={() => scrollTo('especialidades')}><Stethoscope size={19} /> Ver especialidades</button>
            </div>
            <div className="hero-benefits">
              {[['users-round', 'Atendimento humanizado'], ['stethoscope', 'Diversas especialidades'], ['activity', 'Agendamento rápido']].map(([icon, label]) => <div key={label}><span className="icon-bubble"><Icon name={icon} size={21} /></span><strong>{label}</strong></div>)}
            </div>
          </div>
          <div className="hero-visual reveal delay-1" aria-label="Médica da Clínica Núcleo de Saúde Mais">
            <div className="visual-arch photo-arch">
              <Image src="/images/clinica/team/doutora.png" alt="Médica sorridente usando jaleco e estetoscópio" fill priority className="hero-doctor-image" />
              <div className="photo-overlay" />
            </div>
            <div className="visual-caption"><span><span className="caption-dot" /> Montes Claros - MG</span><span>Consultas + exames</span></div>
          </div>
        </div>
      </section>

      <section className="slogan-section" aria-label="Bordão da Clínica Núcleo de Saúde Mais">
        <div className="container">
          <div className="slogan-banner">
            <span>MAIS PARA VOCÊ, MAIS POR VOCÊ.</span>
          </div>
        </div>
      </section>

      <section className="section positioning-section" aria-label="Posicionamento da clínica">
        <div className="container"><div className="section-heading"><span className="section-kicker">NÚCLEO DE SAÚDE MAIS</span><h2>Saúde com mais cuidado, mais praticidade e mais atenção.</h2><p>Uma clínica preparada para acompanhar você e sua família em diferentes momentos.</p></div><div className="value-grid">{valueCards.map((item) => <article className="soft-card value-card" key={item.title}><div className="card-icon"><Icon name={item.icon} size={26} /></div><h3>{item.title}</h3><p>{item.text}</p><span className="card-line" /></article>)}</div></div>
      </section>

      <section className="section accessible-prices-section" aria-label="Preços acessíveis"><div className="container"><div className="accessible-prices"><div className="accessible-prices-copy"><div className="brand-plus-pattern">+ <span>+</span> <b>+</b></div><div className="section-kicker light">CONSULTAS E EXAMES</div><h2>Preços acessíveis para cuidar de você.</h2><p>Atendimento de qualidade, com valores claros e opções para diferentes necessidades. Fale com nossa equipe e consulte o serviço ideal para você.</p><a className="button button-light" href={whatsappUrl('Olá! Gostaria de consultar os valores de consultas e exames da Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Consultar valores <ArrowRight size={16} /></a><div className="accessible-points"><span>+ mais humanizada</span><span>+ mais completa</span><span>+ mais moderna</span></div></div><div className="accessible-prices-photo"><Image src="/images/clinica/team/profissional-clinica.png" alt="Profissional de saúde da Clínica Núcleo de Saúde Mais" fill className="accessible-doctor-image" /></div></div></div></section>

      <section id="sobre" className="section section-anchor about-section"><div className="container about-grid"><div className="about-visual"><div className="about-photo-frame"><Image src="/images/clinica/facade/fachada.png" alt="Fachada da Clínica Núcleo de Saúde Mais à noite" fill sizes="(max-width: 900px) 100vw, 50vw" className="about-facade-image" /></div><div className="about-sticker"><HeartHandshake size={19} /> Atendimento humanizado</div></div><div className="about-copy"><div className="section-kicker">SOBRE A CLÍNICA</div><h2>Uma experiência de atendimento mais humana, moderna e acessível.</h2><p>O Núcleo de Saúde Mais é uma clínica médica e de exames em Montes Claros, criada para oferecer uma experiência de atendimento mais humana, moderna e acessível.</p><p>Nossa proposta é reunir diferentes especialidades, profissionais qualificados e serviços de saúde em um ambiente acolhedor, valorizando o respeito e a atenção a cada paciente.</p><button className="text-link" onClick={() => scrollTo('especialidades')}>Conheça nossas especialidades <ArrowRight size={17} /></button></div></div></section>

      <section className="section reasons-section" aria-label="Diferenciais da Clínica Núcleo de Saúde Mais">
        <div className="container reasons-bento">
          <div className="reasons-bento-heading reveal">
            <div className="section-kicker">POR QUE ESCOLHER A NÚCLEO DE SAÚDE MAIS?</div>
            <h2>Mais cuidado em cada <span>detalhe.</span></h2>
            <p>Atendimento pensado para proporcionar confiança, acolhimento e praticidade.</p>
          </div>
          <div className="reasons-bento-grid">
            <article className="reason-feature-card reveal">
              <div className="reason-feature-media"><Image src="/images/clinica/team/profissional-clinica.png" alt="Profissional de saúde em atendimento em uma clínica moderna" fill className="reason-feature-image" /></div>
              <div className="reason-feature-gradient" />
              <div className="reason-feature-content"><div className="reason-feature-icon"><Icon name="heart-handshake" size={34} /></div><div><h3>Atendimento humanizado</h3><p>Um cuidado que começa na escuta e respeita as necessidades de cada paciente.</p></div></div>
            </article>
            <div className="reason-bento-cards">
              {reasons.map((reason, index) => <article className="reason-bento-card reveal" style={{ animationDelay: `${index * 100}ms` }} key={reason.title}><div className="reason-bento-icon"><Icon name={reason.icon} size={30} /></div><h3>{reason.title}</h3><p>{reason.text}</p><span className="reason-bento-line" /></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section appointment-section" aria-label="Agendamento simplificado">
        <div className="container appointment-shell">
          <div className="appointment-visual" aria-label="Calendário ilustrativo com consulta confirmada">
            <div className="appointment-orbit appointment-orbit-one" />
            <div className="appointment-orbit appointment-orbit-two" />
            <div className="appointment-calendar" aria-hidden="true">
              <div className="calendar-binding"><i /><i /></div>
              <div className="calendar-header"><span>AGENDA</span><b>+</b></div>
              <div className="calendar-week">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
              <div className="calendar-days">{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((day) => <span className={day === 15 ? 'selected' : ''} key={day}>{day === 15 ? <Check size={22} strokeWidth={3} /> : day}</span>)}</div>
            </div>
            <div className="calendar-notification"><MessageCircle size={29} /><strong>Consulta agendada!</strong><Check size={20} strokeWidth={3} /></div>
          </div>
          <div className="appointment-content">
            <div className="appointment-heading">
              <div className="section-kicker">AGENDAMENTO SIMPLIFICADO</div>
              <h2>Agende sua consulta de forma <span>rápida e prática.</span></h2>
              <p>Cuide da sua saúde em poucos passos, com a comodidade do WhatsApp.</p>
            </div>
            <div className="appointment-timeline">
              {steps.map((step, index) => <div className="appointment-timeline-step reveal" style={{ animationDelay: `${index * 100}ms` }} key={step.number}><div className="appointment-timeline-marker"><Icon name={step.icon} size={31} /></div><div className="appointment-timeline-copy"><h3>{step.title}</h3><p>{step.text}</p></div></div>)}
            </div>
            <a className="appointment-cta" href={whatsappUrl('Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de agendar uma consulta.')} target="_blank" rel="noreferrer"><MessageCircle size={24} /> Agendar pelo WhatsApp <ArrowRight size={21} /></a>
          </div>
        </div>
      </section>

      <section id="especialidades" className="section section-anchor specialties-section" aria-label="Nossas especialidades">
        <div className="container specialty-explorer">
          <div className="specialty-explorer-heading reveal"><div className="section-kicker">NOSSAS ESPECIALIDADES</div><h2>Nossas <span>Especialidades</span></h2><p>Um atendimento completo, com profissionais qualificados em diversas áreas da saúde.</p></div>
          <div className="specialty-explorer-layout">
            <aside className="specialty-menu">
              <div className="specialty-menu-heading"><div className="specialty-menu-symbol"><Scan size={22} /></div><h3>Explore nossas especialidades</h3></div>
              <div className="specialty-menu-list">{filteredSpecialties.map((specialty) => <button type="button" className={`specialty-menu-item ${selectedSpecialty.name === specialty.name ? 'selected' : ''}`} onClick={() => setSelectedSpecialtyName(specialty.name)} key={specialty.name}><span className="specialty-menu-icon"><Icon name={specialty.icon} size={21} /></span><span>{specialty.name}</span><ChevronRight size={18} /></button>)}{!filteredSpecialties.length && <p className="specialty-empty-menu">Nenhuma especialidade encontrada.</p>}</div>
            </aside>
            <div className="specialty-detail-panel">
              <div className="specialty-search search-field"><Search size={20} /><input value={specialtySearch} onChange={(event) => setSpecialtySearch(event.target.value)} placeholder="Buscar especialidade..." aria-label="Buscar especialidade" />{specialtySearch && <button type="button" className="specialty-search-clear" onClick={() => setSpecialtySearch('')} aria-label="Limpar busca"><X size={17} /></button>}</div>
              <div className="specialty-detail" key={selectedSpecialty.name}>
                <div className="specialty-detail-top"><div className="specialty-detail-icon" style={{ color: selectedSpecialtyDetails.accent, background: `${selectedSpecialtyDetails.accent}18` }}><Icon name={selectedSpecialty.icon} size={48} /></div><div><h3>{selectedSpecialty.name}</h3><p>{selectedSpecialtyDetails.description}</p></div></div>
                <div className="specialty-detail-body"><div className="specialty-benefits">{selectedSpecialtyDetails.benefits.map((benefit) => <div className="specialty-benefit" key={benefit}><span><Check size={18} /></span><strong>{benefit}</strong></div>)}</div><div className="specialty-illustration" style={{ '--specialty-accent': selectedSpecialtyDetails.accent } as React.CSSProperties}><div className="specialty-illustration-orbit" /><div className="specialty-illustration-icon"><Icon name={selectedSpecialty.icon} size={92} /></div><span>{selectedSpecialty.name}</span></div></div>
                <a className="specialty-whatsapp" href={whatsappUrl(`Olá! Vim pelo site da Clínica Núcleo de Saúde Mais e gostaria de saber os horários disponíveis para uma consulta de ${selectedSpecialty.name}.`)} target="_blank" rel="noreferrer"><MessageCircle size={24} /> Agendar consulta pelo WhatsApp <ArrowRight size={20} /></a>
                <div className="specialty-encouragement"><CalendarCheck2 size={20} /> <span>Cuide da sua saúde. Consulte os horários disponíveis com nossa equipe.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="exames" className="section section-anchor exams-section"><div className="container"><div className="section-heading heading-with-action"><div><div className="section-kicker">EXAMES E DIAGNÓSTICOS</div><h2>Precisão para cuidar melhor.</h2><p>Tudo o que você precisa para cuidar da sua saúde com mais praticidade.</p></div><div className="result-badge"><FlaskConical size={27} /><span>Resultados laboratoriais<br /><b>em até 20 min*</b></span></div></div><div className="exam-grid">{exams.map((exam) => <a key={exam.name} className="exam-card" href={whatsappUrl(`Olá! Gostaria de saber mais sobre ${exam.name.toLowerCase()} na Clínica Núcleo de Saúde Mais.`)} target="_blank" rel="noreferrer"><div className="exam-icon"><Icon name={exam.icon} size={32} /></div><strong>{exam.name}</strong><span>Consultar <ArrowRight size={14} /></span></a>)}</div><p className="fine-print">*Tempo estimado para exames laboratoriais, sujeito ao tipo de exame e às condições do serviço. Confirme a disponibilidade com a clínica.</p></div></section>

      <section id="convenios" className="section section-anchor insurance-section"><div className="container"><div className="section-heading"><div className="section-kicker">CONVÊNIOS E PLANOS ATENDIDOS</div><h2>Mais possibilidades para cuidar da sua saúde.</h2><p>A cobertura pode variar conforme a especialidade e o procedimento. Consulte nossa equipe antes do agendamento.</p></div><div className="partner-marquee" aria-label="Convênios e parceiros atendidos"><div className="partner-track">{[...insurancePartners, ...insurancePartners].map((partner, index) => <span className={`partner-logo ${partner.name === 'CAMED' ? 'partner-logo-camed' : ''}`} key={`${partner.name}-${index}`} aria-hidden={index >= insurancePartners.length}>{partner.image ? <Image src={partner.image} alt={index >= insurancePartners.length ? '' : `Logo do convênio ${partner.name}`} width={220} height={120} className="partner-logo-image" /> : <span className="partner-name-fallback">{partner.name}</span>}</span>)}</div></div><div className="insurance-panel"><div className="search-field"><Search size={19} /><input value={insuranceSearch} onChange={(event) => setInsuranceSearch(event.target.value)} placeholder="Pesquisar convênio" aria-label="Pesquisar convênio" /></div><div className="insurance-list">{filteredInsurance.length ? filteredInsurance.map((plan) => <span className="insurance-name" key={plan}><Check size={16} /> {plan}</span>) : <p className="empty-search">Nenhum convênio encontrado. Fale com nossa equipe para confirmar.</p>}</div><div className="insurance-footer"><span><ShieldCheck size={19} /> A relação de convênios deve ser confirmada antes do atendimento.</span><a className="button button-outline" href={whatsappUrl('Olá! Gostaria de confirmar se meu convênio é atendido pela Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer">Consultar meu convênio <ArrowRight size={16} /></a></div></div></div></section>

      <section className="section gallery-section"><div className="container"><div className="section-heading heading-with-action"><div><div className="section-kicker">CONHEÇA NOSSA ESTRUTURA</div><h2>Um ambiente preparado para receber você.</h2><p>Conheça alguns dos consultórios e espaços de atendimento da Clínica Núcleo de Saúde Mais.</p></div><span className="section-pill"><Sparkles size={18} /> Estrutura real da clínica</span></div><div className="facility-gallery" aria-label="Fotos da estrutura da clínica">{['estrutura_01_consultorio_angulo.png','estrutura_02_recepcao_espera.png','estrutura_03_consultorio_branco.png','estrutura_04_consultorio_vertical.png','estrutura_05_consultorio_logo.png','estrutura_06_recepcao_balcao.png','estrutura_07_consultorio_amplo.png'].map((image, index) => <button className={`facility-tile ${index === 0 ? 'facility-tile-main' : ''}`} key={image} onClick={() => setLightboxOpen(true)} aria-label={`Ampliar foto ${index + 1} da estrutura da clínica`}><Image src={`/images/clinica/facility/${image}`} alt={`Estrutura da Clínica Núcleo de Saúde Mais: foto ${index + 1}`} fill className="facility-photo" /></button>)}</div></div></section>

      <section className="section testimonial-section"><div className="container testimonial-shell"><div className="testimonial-copy"><div className="section-kicker">DEPOIMENTOS</div><h2>Quem cuida da saúde com a gente, recomenda.</h2><p>Esta área está pronta para receber avaliações reais e autorizadas dos nossos pacientes.</p></div><div className="testimonial-placeholder"><CircleHelp size={28} /><strong>Depoimentos em breve</strong><span>Não publicamos nomes, fotos ou avaliações sem autorização.</span></div></div></section>

      <section id="localizacao" className="section section-anchor location-section" aria-label="Localização da clínica">
        <div className="container location-grid">
          <div className="location-copy"><div className="section-kicker">LOCALIZAÇÃO</div><h2>Atendimento em <span>Montes Claros - MG.</span></h2><p>Localizada na região central de Montes Claros, a Clínica Núcleo de Saúde Mais oferece facilidade de acesso para quem busca consultas e exames.</p><div className="address-card"><MapPin size={25} /><div><strong>Rua Januária, 684</strong><span>Centro, Montes Claros - MG, Brasil</span></div></div><a className="button button-primary location-button" href={clinic.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} /> Como chegar <ArrowRight size={16} /></a></div>
          <div className="location-feature"><Image src="/images/clinica/location/estamos-pertinho.png" alt="Arte informativa sobre a localização da Clínica Núcleo de Saúde Mais em Montes Claros" fill className="location-feature-image" /></div>
          <div className="map-card"><iframe title="Mapa da Clínica Núcleo de Saúde Mais" src={clinic.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-open-link" href={clinic.mapsUrl} target="_blank" rel="noreferrer">Abrir no Maps <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section id="contato" className="section section-anchor contact-section"><div className="container"><div className="section-heading"><div className="section-kicker">FALE CONOSCO</div><h2>Entre em contato com a nossa equipe.</h2><p>Tire suas dúvidas e encontre o melhor caminho para o seu cuidado.</p></div><div className="contact-grid"><a className="contact-card" href={whatsappUrl()} target="_blank" rel="noreferrer"><div className="contact-icon whatsapp-icon"><MessageCircle size={27} /></div><div><span>WhatsApp</span><strong>{clinic.phone}</strong></div><ChevronRight /></a><a className="contact-card" href={clinic.instagramUrl} target="_blank" rel="noreferrer"><div className="contact-icon"><Instagram size={27} /></div><div><span>Instagram</span><strong>{clinic.instagram}</strong></div><ChevronRight /></a><a className="contact-card" href={`https://${clinic.website}`} target="_blank" rel="noreferrer"><div className="contact-icon"><Navigation size={27} /></div><div><span>Nosso site</span><strong>{clinic.website}</strong></div><ChevronRight /></a></div></div></section>

      <section className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><div className="section-kicker">PERGUNTAS FREQUENTES</div><h2>As respostas que você procura.</h2><p>Confira as principais dúvidas sobre a clínica, nossos atendimentos e formas de agendamento.</p><a className="text-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar com a equipe <ArrowRight size={17} /></a></div><div className="faq-list">{faqItems.map((item, index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={item.question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{item.question}</span>{openFaq === index ? <ArrowUp size={19} /> : <ChevronDown size={19} />}</button>{openFaq === index && <div className="faq-answer"><p>{item.answer}</p></div>}</div>)}</div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><div className="section-kicker light">PRONTO PARA CUIDAR DE VOCÊ</div><h2>Sua saúde merece mais cuidado, mais praticidade e mais atenção.</h2><p>Agende sua consulta pelo WhatsApp e conte com uma equipe pronta para orientar você.</p></div><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={21} /> Agendar agora <ArrowRight size={17} /></a></div></section>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><Image src="/images/brand/logo-footer.png" alt="Clínica Núcleo de Saúde Mais" width={210} height={130} className="footer-logo" /><p>Cuidado médico, consultas e exames em Montes Claros.</p><div className="social-row"><a href={clinic.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a></div></div><div className="footer-links"><h3>Links rápidos</h3><div className="footer-link-columns">{footerNavItems.slice(0, 4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}{footerNavItems.slice(4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div></div><div className="footer-contact"><h3>Endereço</h3><p><MapPin size={19} /> {clinic.address}</p><p><Phone size={19} /> {clinic.phone}</p><p><ShieldCheck size={19} /> {clinic.technicalLead}<br /><span className="footer-indent">{clinic.crm}</span></p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Clínica Núcleo de Saúde Mais. Todos os direitos reservados.</span><span>Política de Privacidade · Política de Cookies</span></div></footer>

      <div className="floating-actions"><a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Agende sua consulta pelo WhatsApp"><MessageCircle size={27} /><span className="tooltip">Agende sua consulta</span></a>{showTop && <button className="back-top" onClick={() => scrollTo('inicio')} aria-label="Voltar ao topo"><ArrowUp size={21} /></button>}</div>
      {lightboxOpen && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Prévia da estrutura da clínica" onClick={() => setLightboxOpen(false)}><button onClick={() => setLightboxOpen(false)} aria-label="Fechar prévia"><X /></button><div className="lightbox-content" onClick={(event) => event.stopPropagation()}><Building2 size={72} /><h3>Galeria da estrutura</h3><p>As fotografias reais da clínica serão adicionadas aqui assim que estiverem disponíveis para publicação.</p></div></div>}
    </main>
  );
}
