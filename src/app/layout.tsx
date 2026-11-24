import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0C4463',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nucleodesaudemais.com'),
  title: 'Núcleo de Saúde Mais | Consultas Médicas e Exames em Montes Claros – MG',
  description: 'Clínica médica e de exames no Centro de Montes Claros – MG. Consultas em mais de 14 especialidades, exames laboratoriais rápidos, convênios e atendimento humanizado. Agende pelo WhatsApp: (38) 99977-1212.',
  keywords: [
    'Núcleo de Saúde Mais',
    'clínica médica Montes Claros',
    'consultas Montes Claros',
    'exames laboratoriais Montes Claros',
    'médicos Montes Claros',
    'cardiologista Montes Claros',
    'pediatra Montes Claros',
    'ginecologista Montes Claros',
    'convênios médicos Montes Claros',
  ],
  authors: [{ name: 'Clínica Núcleo de Saúde Mais' }],
  creator: 'Núcleo de Saúde Mais',
  publisher: 'Núcleo de Saúde Mais',
  alternates: {
    canonical: 'https://www.nucleodesaudemais.com',
  },
  openGraph: {
    title: 'Núcleo de Saúde Mais | Mais saúde para você. Mais cuidado por você.',
    description: 'Consultas médicas e exames em um só lugar com atendimento humanizado e excelência no Centro de Montes Claros – MG.',
    url: 'https://www.nucleodesaudemais.com',
    siteName: 'Núcleo de Saúde Mais',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/brand/logo-header.png',
        width: 1200,
        height: 630,
        alt: 'Logomarca Núcleo de Saúde Mais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Núcleo de Saúde Mais | Montes Claros – MG',
    description: 'Consultas médicas e exames com excelência e atendimento humanizado.',
    images: ['/images/brand/logo-header.png'],
  },
  icons: {
    icon: '/images/brand/logo-header.png',
    shortcut: '/images/brand/logo-header.png',
    apple: '/images/brand/logo-header.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
