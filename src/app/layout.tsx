import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nucleodesaudemais.com.br'),
  title: 'Clínica Núcleo de Saúde Mais | Consultas e Exames em Montes Claros',
  description: 'Consultas médicas, diversas especialidades e exames em Montes Claros. Conheça a Clínica Núcleo de Saúde Mais e agende seu atendimento pelo WhatsApp.',
  keywords: ['clínica em Montes Claros', 'consultas médicas', 'exames Montes Claros', 'Núcleo de Saúde Mais'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Clínica Núcleo de Saúde Mais',
    description: 'Cuidado médico de qualidade, com várias especialidades em um só lugar.',
    url: 'https://www.nucleodesaudemais.com.br',
    siteName: 'Clínica Núcleo de Saúde Mais',
    locale: 'pt_BR',
    type: 'website',
  },
  icons: { icon: '/images/brand/logo-header.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
