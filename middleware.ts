import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Sadece Türkçe destekleniyor
  locales,

  // Varsayılan dil Türkçe
  defaultLocale,

  // Don't redirect if locale is in pathname
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  // Exclude /tools, /admin, /api, /about, /contact, /privacy, /terms
  matcher: ['/', '/(tr)/:path*']
};
