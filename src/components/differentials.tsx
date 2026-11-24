'use client';

import React from 'react';
import { HeartPulse, ShieldCheck, Stethoscope, Activity, LucideIcon } from 'lucide-react';
import { differentials } from '@/data/clinic';
import BrandCross from './brand-cross';

const iconMap: Record<string, LucideIcon> = {
  'heart-pulse': HeartPulse,
  'shield-check': ShieldCheck,
  'stethoscope': Stethoscope,
  activity: Activity,
};

export default function Differentials() {
  return (
    <section className="differentials-section" aria-label="Diferenciais da clínica">
      <div className="site-container">
        <div className="differentials-grid">
          {differentials.map((item, index) => {
            const IconComponent = iconMap[item.icon] || HeartPulse;
            return (
              <div key={item.id} className="differential-card">
                <div className="differential-top">
                  <div className="differential-icon-box">
                    <IconComponent size={26} className="text-teal" />
                  </div>
                  <span className="differential-index">0{index + 1}</span>
                </div>

                <div className="differential-line" />

                <h3 className="differential-title">{item.title}</h3>
                <p className="differential-desc">{item.description}</p>

                <div className="differential-corner-accent">
                  <BrandCross size={18} color="#43B8BA" opacity={0.3} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
