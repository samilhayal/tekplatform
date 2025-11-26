import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL('https://onlinetools.com'),
    title: {
      default: t('defaultTitle'),
      template: "%s | Tek Platform"
    },
    description: t('defaultDescription'),
    keywords: t('keywords').split(', '),
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
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: 'https://onlinetools.com',
      siteName: 'Tek Platform',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Online Tools - Free Online Tools',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
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
      languages: {
        'tr': 'https://onlinetools.com/tr',
        'en': 'https://onlinetools.com/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tek Platform',
    description: locale === 'tr' 
      ? 'Türkiye\'nin en kapsamlı ücretsiz online araçlar platformu'
      : 'Turkey\'s most comprehensive free online tools platform',
    url: 'https://onlinetools.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://onlinetools.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Tek Platform',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onlinetools.com/logo.png'
      }
    }
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </NextIntlClientProvider>
  );
}
