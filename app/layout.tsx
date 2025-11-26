import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://onlinetools.com'), // Replace with your actual domain
  title: {
    default: "Tek Platform - 100+ Ücretsiz Online Hesaplama ve Dönüştürme Aracı",
    template: "%s | Tek Platform"
  },
  description: "Türkiye'nin en kapsamlı ücretsiz online araçlar platformu. Finans hesaplama, PDF işlemleri, sağlık hesaplama, dönüştürücüler, eğitim araçları ve 100+ ücretsiz araç. Hızlı, güvenli, reklamsız!",
  keywords: [
    'online araçlar',
    'ücretsiz hesaplama',
    'yüzde hesaplama',
    'bmi hesaplama',
    'kredi hesaplama',
    'döviz çevirici',
    'pdf birleştirme',
    'tarih hesaplama',
    'gano hesaplama',
    'yks net hesaplama',
    'kpss net hesaplama',
    'emeklilik hesaplama',
    'online calculator',
    'free tools',
    'hesaplayıcı',
    'dönüştürücü'
  ],
  authors: [{ name: 'Online Tools Team' }],
  creator: 'Online Tools',
  publisher: 'Online Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://onlinetools.com',
    siteName: 'Tek Platform',
    title: 'Tek Platform - 100+ Ücretsiz Online Hesaplama ve Dönüştürme Aracı',
    description: 'Türkiye\'nin en kapsamlı ücretsiz online araçlar platformu. Finans, PDF, sağlık, eğitim ve 100+ ücretsiz araç.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Online Tools - Ücretsiz Online Araçlar',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tek Platform - 100+ Ücretsiz Online Araç',
    description: 'Finans, PDF, sağlık, eğitim ve daha fazlası için ücretsiz online araçlar.',
    images: ['/twitter-image.png'],
    creator: '@tekplatform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://onlinetools.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tek Platform',
    description: 'Türkiye\'nin en kapsamlı ücretsiz online araçlar platformu',
    url: 'https://onlinetools.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://onlinetools.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: 'Tek Platform',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onlinetools.com/logo.png'
      }
    }
  }

  return (
    <html lang="tr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 h-full" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
