import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Sadece Türkçe destekleniyor
export const locales = ['tr'] as const;
export const defaultLocale = 'tr' as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
