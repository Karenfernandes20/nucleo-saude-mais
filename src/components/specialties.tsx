'use client';

import React, { useState, useMemo } from 'react';
import {
  HeartPulse,
  Baby,
  Bone,
  Brain,
  BrainCircuit,
  BriefcaseMedical,
  Ear,
  Activity,
  Apple,
  Syringe,
  MessagesSquare,
  HandHeart,
  Stethoscope,
  Search,
  ArrowRight,
  Info,
  LucideIcon,
} from 'lucide-react';
import { specialties, Specialty } from '@/data/clinic';
import SpecialtyModal from './specialty-modal';
import BrandCross from './brand-cross';

const iconMap: Record<string, LucideIcon> = {
  'heart-pulse': HeartPulse,
  baby: Baby,
  venus: Stethoscope,
  bone: Bone,
  'brain-circuit': BrainCircuit,
  ear: Ear,
  activity: Activity,
  'hand-heart': HandHeart,
  'messages-square': MessagesSquare,
  brain: Brain,
  apple: Apple,
  accessibility: Activity,
  syringe: Syringe,
  'briefcase-medical': BriefcaseMedical,
  stethoscope: Stethoscope,
};

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function Specialties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return specialties;
    const term = normalize(searchTerm);
    return specialties.filter(
      (s) =>
        normalize(s.name).includes(term) ||
        normalize(s.category || '').includes(term) ||
        normalize(s.description).includes(term)
    );
  }, [searchTerm]);

  // When not searching and showAll is false, we can display first 8 or all 14.
  // The user prompt says:
  // "Considerar as especialidades descritas no portfólio, incluindo: Anestesiologia, Cardiologia, Endocrinologia... Adicionar botão: 'Ver todas as especialidades'"
  // If showAll is false, show first 8 items; clicking "Ver todas as especialidades" shows all 14. If searching, show all matched.
  const displayedSpecialties = useMemo(() => {
    if (searchTerm.trim() || showAll) {
      return filtered;
    }
    return filtered.slice(0, 8);
  }, [filtered, searchTerm, showAll]);

  return (
    <section id="especialidades" className="section specialties-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header-row">
          <div className="section-header-left">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>CORPO CLÍNICO MULTIDISCIPLINAR</span>
            </div>
            <h2 className="section-title">
              Especialidades Médicas <span className="text-navy-highlight">para toda a família</span>
            </h2>
            <p className="section-subtitle">
              Atendimento médico humanizado, com profissionais experientes e dedicados ao seu bem-estar
              integral.
            </p>
          </div>

          {/* Search Box */}
          <div className="specialty-search-wrapper">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar especialidade..."
                aria-label="Buscar especialidade médica"
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="search-clear-btn"
                  aria-label="Limpar busca"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="specialties-grid">
          {displayedSpecialties.map((item) => {
            const IconComponent = iconMap[item.icon] || Stethoscope;

            return (
              <div key={item.name} className="specialty-card">
                <div className="specialty-card-header">
                  <div className="specialty-icon-box">
                    <IconComponent size={24} className="text-teal" />
                  </div>
                  <span className="specialty-category-tag">{item.category || 'Medicina'}</span>
                </div>

                <div className="specialty-card-body">
                  <h3 className="specialty-name">{item.name}</h3>
                  <p className="specialty-short-desc">
                    {item.description.length > 95
                      ? `${item.description.slice(0, 95)}...`
                      : item.description}
                  </p>
                </div>

                <div className="specialty-card-footer">
                  <button
                    onClick={() => setSelectedSpecialty(item)}
                    className="specialty-details-btn"
                    aria-label={`Ver detalhes de ${item.name}`}
                  >
                    <Info size={15} />
                    <span>Saber mais</span>
                  </button>

                  
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Feedback */}
        {displayedSpecialties.length === 0 && (
          <div className="empty-search-state">
            <BrandCross size={36} color="#9C9B9B" opacity={0.4} />
            <p>Nenhuma especialidade encontrada para &quot;{searchTerm}&quot;.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-outline-navy btn-sm"
            >
              Ver todas as especialidades
            </button>
          </div>
        )}

        {/* "Ver todas as especialidades" Button when collapsed */}
        {!searchTerm && !showAll && specialties.length > 8 && (
          <div className="specialties-bottom-action">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-outline-navy btn-lg"
              aria-label="Ver todas as 14 especialidades médicas"
            >
              <span>Ver todas as especialidades (+{specialties.length - 8})</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Button to collapse back if expanded */}
        {!searchTerm && showAll && (
          <div className="specialties-bottom-action">
            <button
              onClick={() => setShowAll(false)}
              className="btn btn-outline-navy btn-sm"
            >
              <span>Mostrar menos</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal with Specialty Details */}
      <SpecialtyModal
        specialty={selectedSpecialty}
        onClose={() => setSelectedSpecialty(null)}
      />
    </section>
  );
}
