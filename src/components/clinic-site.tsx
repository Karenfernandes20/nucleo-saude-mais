'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Accessibility,
  Activity,
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
import { clinic, exams, faqItems, insurancePartners, insurancePlans, reasons, specialties, steps, valueCards } from '@/data/clinic';

type IconName = string;

const iconMap: Record<string, LucideIcon> = {
  accessibility: Accessibility,
  activity: Activity,
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

      <section className="section positioning-section" aria-label="Posicionamento da clínica">
        <div className="container"><div className="section-heading"><span className="section-kicker">NÚCLEO DE SAÚDE MAIS</span><h2>Saúde com mais cuidado, mais praticidade e mais atenção.</h2><p>Uma clínica preparada para acompanhar você e sua família em diferentes momentos.</p></div><div className="value-grid">{valueCards.map((item) => <article className="soft-card value-card" key={item.title}><div className="card-icon"><Icon name={item.icon} size={26} /></div><h3>{item.title}</h3><p>{item.text}</p><span className="card-line" /></article>)}</div></div>
      </section>

      <section className="section accessible-prices-section" aria-label="Preços acessíveis"><div className="container"><div className="accessible-prices"><div className="accessible-prices-copy"><div className="brand-plus-pattern">+ <span>+</span> <b>+</b></div><div className="section-kicker light">CONSULTAS E EXAMES</div><h2>Preços acessíveis para cuidar de você.</h2><p>Atendimento de qualidade, com valores claros e opções para diferentes necessidades. Fale com nossa equipe e consulte o serviço ideal para você.</p><a className="button button-light" href={whatsappUrl('Olá! Gostaria de consultar os valores de consultas e exames da Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Consultar valores <ArrowRight size={16} /></a><div className="accessible-points"><span>+ mais humanizada</span><span>+ mais completa</span><span>+ mais moderna</span></div></div><div className="accessible-prices-photo"><Image src="/images/clinica/team/doutora.png" alt="Médica da Clínica Núcleo de Saúde Mais" fill className="accessible-doctor-image" /></div></div></div></section>

      <section id="sobre" className="section section-anchor about-section"><div className="container about-grid"><div className="about-visual"><div className="about-photo-frame"><Image src="/images/clinica/facade/fachada.png" alt="Fachada da Clínica Núcleo de Saúde Mais à noite" fill className="about-facade-image" /></div><div className="about-sticker"><HeartHandshake size={19} /> Atendimento humanizado</div></div><div className="about-copy"><div className="section-kicker">SOBRE A CLÍNICA</div><h2>Uma experiência de atendimento mais humana, moderna e acessível.</h2><p>O Núcleo de Saúde Mais é uma clínica médica e de exames em Montes Claros, criada para oferecer uma experiência de atendimento mais humana, moderna e acessível.</p><p>Nossa proposta é reunir diferentes especialidades, profissionais qualificados e serviços de saúde em um ambiente acolhedor, valorizando o respeito e a atenção a cada paciente.</p><button className="text-link" onClick={() => scrollTo('especialidades')}>Conheça nossas especialidades <ArrowRight size={17} /></button></div></div></section>

      <section className="section reasons-section"><div className="container"><div className="section-heading"><div className="section-kicker">POR QUE ESCOLHER A NÚCLEO DE SAÚDE MAIS?</div><h2>Seu cuidado em boas mãos.</h2><p>Conheça os diferenciais que tornam nossa clínica uma escolha segura para o seu cuidado em saúde.</p></div><div className="reason-grid">{reasons.map((reason) => <article className="soft-card reason-card" key={reason.title}><div className="card-icon"><Icon name={reason.icon} size={26} /></div><h3>{reason.title}</h3><p>{reason.text}</p><span className="card-line" /></article>)}</div></div></section>

      <section className="section steps-section"><div className="container steps-shell"><div className="section-heading"><div className="section-kicker">AGENDAMENTO SIMPLIFICADO</div><h2>Agende sua consulta em 3 passos.</h2><p>É rápido, fácil e seguro. Veja como é simples cuidar da sua saúde:</p></div><div className="steps-grid">{steps.map((step, index) => <div className="step-item" key={step.number}><div className="step-icon"><Icon name={step.icon} size={29} /><small>{step.number}</small></div><h3>{step.title}</h3><p>{step.text}</p>{index < steps.length - 1 && <ChevronRight className="step-arrow" size={28} />}</div>)}</div><a className="button button-primary steps-cta" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Chamar no WhatsApp</a></div></section>

      <section id="especialidades" className="section section-anchor specialties-section"><div className="container specialists-showcase"><div className="specialists-top"><div className="specialists-title-panel"><span>ESPECIALISTAS</span></div><div className="specialists-intro"><p><em>O Núcleo de Saúde Mais</em> reúne profissionais qualificados para proporcionar uma experiência de atendimento realmente acolhedora. Consultas com hora marcada que respeitam o seu tempo. Agendamento fácil e rápido, com profissionais comprometidos com as necessidades de cada paciente.</p></div></div><div className="specialists-body"><div className="specialists-photo"><Image src="/images/clinica/team/doutora.png" alt="Médica da Clínica Núcleo de Saúde Mais" fill className="specialists-doctor-image" /><div className="specialists-photo-caption"><strong>Clínica Núcleo de Saúde Mais</strong><span>Profissionais qualificados</span></div></div><div className="specialists-list" aria-label="Lista de especialidades"><div className="specialists-list-grid">{specialties.map((specialty) => <a key={specialty.name} className="specialist-link" href={whatsappUrl(`Olá! Gostaria de agendar uma consulta de ${specialty.name} na Clínica Núcleo de Saúde Mais.`)} target="_blank" rel="noreferrer"><span>{specialty.name}</span><MessageCircle size={15} /></a>)}</div><p className="specialists-hint"><MessageCircle size={16} /> Clique em uma especialidade para agendar pelo WhatsApp.</p></div></div></div></section>

      <section id="exames" className="section section-anchor exams-section"><div className="container"><div className="section-heading heading-with-action"><div><div className="section-kicker">EXAMES E DIAGNÓSTICOS</div><h2>Precisão para cuidar melhor.</h2><p>Tudo o que você precisa para cuidar da sua saúde com mais praticidade.</p></div><div className="result-badge"><FlaskConical size={27} /><span>Resultados laboratoriais<br /><b>em até 20 min*</b></span></div></div><div className="exam-grid">{exams.map((exam) => <a key={exam.name} className="exam-card" href={whatsappUrl(`Olá! Gostaria de saber mais sobre ${exam.name.toLowerCase()} na Clínica Núcleo de Saúde Mais.`)} target="_blank" rel="noreferrer"><div className="exam-icon"><Icon name={exam.icon} size={32} /></div><strong>{exam.name}</strong><span>Consultar <ArrowRight size={14} /></span></a>)}</div><p className="fine-print">*Tempo estimado para exames laboratoriais, sujeito ao tipo de exame e às condições do serviço. Confirme a disponibilidade com a clínica.</p></div></section>

      <section id="convenios" className="section section-anchor insurance-section"><div className="container"><div className="section-heading"><div className="section-kicker">CONVÊNIOS E PLANOS ATENDIDOS</div><h2>Mais possibilidades para cuidar da sua saúde.</h2><p>A cobertura pode variar conforme a especialidade e o procedimento. Consulte nossa equipe antes do agendamento.</p></div><div className="partner-marquee" aria-label="Convênios e parceiros atendidos"><div className="partner-track">{[...insurancePartners, ...insurancePartners].map((partner, index) => <span className="partner-logo" key={`${partner.name}-${index}`} aria-hidden={index >= insurancePartners.length}>{partner.image ? <Image src={partner.image} alt={index >= insurancePartners.length ? '' : `Logo do convênio ${partner.name}`} width={220} height={120} className="partner-logo-image" /> : <span className="partner-name-fallback">{partner.name}</span>}</span>)}</div></div><div className="insurance-panel"><div className="search-field"><Search size={19} /><input value={insuranceSearch} onChange={(event) => setInsuranceSearch(event.target.value)} placeholder="Pesquisar convênio" aria-label="Pesquisar convênio" /></div><div className="insurance-list">{filteredInsurance.length ? filteredInsurance.map((plan) => <span className="insurance-name" key={plan}><Check size={16} /> {plan}</span>) : <p className="empty-search">Nenhum convênio encontrado. Fale com nossa equipe para confirmar.</p>}</div><div className="insurance-footer"><span><ShieldCheck size={19} /> A relação de convênios deve ser confirmada antes do atendimento.</span><a className="button button-outline" href={whatsappUrl('Olá! Gostaria de confirmar se meu convênio é atendido pela Clínica Núcleo de Saúde Mais.')} target="_blank" rel="noreferrer">Consultar meu convênio <ArrowRight size={16} /></a></div></div></div></section>

      <section className="section gallery-section"><div className="container"><div className="section-heading heading-with-action"><div><div className="section-kicker">CONHEÇA NOSSA ESTRUTURA</div><h2>Um ambiente preparado para receber você.</h2><p>Confira um registro real da fachada da Clínica Núcleo de Saúde Mais.</p></div><span className="section-pill"><Sparkles size={18} /> Foto real da clínica</span></div><div className="gallery-grid"><button className="gallery-tile gallery-main" onClick={() => setLightboxOpen(true)}><Image src="/images/clinica/facade/fachada.png" alt="Fachada da Clínica Núcleo de Saúde Mais" fill className="gallery-photo" /><span className="gallery-label">Ampliar foto da fachada <ArrowRight size={16} /></span></button><button className="gallery-tile" onClick={() => setLightboxOpen(true)}><div className="gallery-art art-two"><HeartHandshake size={40} /><span>Atendimento próximo</span></div></button><button className="gallery-tile" onClick={() => setLightboxOpen(true)}><div className="gallery-art art-three"><Stethoscope size={40} /><span>Consultas e exames</span></div></button></div></div></section>

      <section className="section testimonial-section"><div className="container testimonial-shell"><div className="testimonial-copy"><div className="section-kicker">DEPOIMENTOS</div><h2>Quem cuida da saúde com a gente, recomenda.</h2><p>Esta área está pronta para receber avaliações reais e autorizadas dos nossos pacientes.</p></div><div className="testimonial-placeholder"><CircleHelp size={28} /><strong>Depoimentos em breve</strong><span>Não publicamos nomes, fotos ou avaliações sem autorização.</span></div></div></section>

      <section id="localizacao" className="section section-anchor location-section"><div className="container location-grid"><div className="map-card"><iframe title="Mapa da Clínica Núcleo de Saúde Mais" src={clinic.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-open-link" href={clinic.mapsUrl} target="_blank" rel="noreferrer">Abrir no Maps <ArrowRight size={16} /></a></div><div className="location-copy"><div className="section-kicker">LOCALIZAÇÃO</div><h2>Atendimento em Montes Claros - MG.</h2><p>Localizada na região central de Montes Claros, a Clínica Núcleo de Saúde Mais oferece facilidade de acesso para quem busca consultas e exames.</p><div className="address-card"><MapPin size={25} /><div><strong>Rua Januária, 684</strong><span>Centro, Montes Claros - MG, Brasil</span></div></div><a className="button button-primary" href={clinic.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} /> Como chegar <ArrowRight size={16} /></a></div></div></section>

      <section id="contato" className="section section-anchor contact-section"><div className="container"><div className="section-heading"><div className="section-kicker">FALE CONOSCO</div><h2>Entre em contato com a nossa equipe.</h2><p>Tire suas dúvidas e encontre o melhor caminho para o seu cuidado.</p></div><div className="contact-grid"><a className="contact-card" href={whatsappUrl()} target="_blank" rel="noreferrer"><div className="contact-icon whatsapp-icon"><MessageCircle size={27} /></div><div><span>WhatsApp</span><strong>{clinic.phone}</strong></div><ChevronRight /></a><a className="contact-card" href={clinic.instagramUrl} target="_blank" rel="noreferrer"><div className="contact-icon"><Instagram size={27} /></div><div><span>Instagram</span><strong>{clinic.instagram}</strong></div><ChevronRight /></a><a className="contact-card" href={`https://${clinic.website}`} target="_blank" rel="noreferrer"><div className="contact-icon"><Navigation size={27} /></div><div><span>Nosso site</span><strong>{clinic.website}</strong></div><ChevronRight /></a></div></div></section>

      <section className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><div className="section-kicker">PERGUNTAS FREQUENTES</div><h2>As respostas que você procura.</h2><p>Confira as principais dúvidas sobre a clínica, nossos atendimentos e formas de agendamento.</p><a className="text-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar com a equipe <ArrowRight size={17} /></a></div><div className="faq-list">{faqItems.map((item, index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={item.question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{item.question}</span>{openFaq === index ? <ArrowUp size={19} /> : <ChevronDown size={19} />}</button>{openFaq === index && <div className="faq-answer"><p>{item.answer}</p></div>}</div>)}</div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><div className="section-kicker light">PRONTO PARA CUIDAR DE VOCÊ</div><h2>Sua saúde merece mais cuidado, mais praticidade e mais atenção.</h2><p>Agende sua consulta pelo WhatsApp e conte com uma equipe pronta para orientar você.</p></div><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={21} /> Agendar agora <ArrowRight size={17} /></a></div></section>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><Image src="/images/brand/logo-footer.png" alt="Clínica Núcleo de Saúde Mais" width={210} height={130} className="footer-logo" /><p>Cuidado médico, consultas e exames em Montes Claros.</p><div className="social-row"><a href={clinic.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a></div></div><div className="footer-links"><h3>Links rápidos</h3><div className="footer-link-columns">{footerNavItems.slice(0, 4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}{footerNavItems.slice(4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div></div><div className="footer-contact"><h3>Endereço</h3><p><MapPin size={19} /> {clinic.address}</p><p><Phone size={19} /> {clinic.phone}</p><p><ShieldCheck size={19} /> {clinic.technicalLead}<br /><span className="footer-indent">{clinic.crm}</span></p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Clínica Núcleo de Saúde Mais. Todos os direitos reservados.</span><span>Política de Privacidade · Política de Cookies</span></div></footer>

      <div className="floating-actions"><a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Agende sua consulta pelo WhatsApp"><MessageCircle size={27} /><span className="tooltip">Agende sua consulta</span></a>{showTop && <button className="back-top" onClick={() => scrollTo('inicio')} aria-label="Voltar ao topo"><ArrowUp size={21} /></button>}</div>
      {lightboxOpen && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Prévia da estrutura da clínica" onClick={() => setLightboxOpen(false)}><button onClick={() => setLightboxOpen(false)} aria-label="Fechar prévia"><X /></button><div className="lightbox-content" onClick={(event) => event.stopPropagation()}><Building2 size={72} /><h3>Galeria da estrutura</h3><p>As fotografias reais da clínica serão adicionadas aqui assim que estiverem disponíveis para publicação.</p></div></div>}
    </main>
  );
}
