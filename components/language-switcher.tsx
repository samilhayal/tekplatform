'use client'

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Navigate to new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline uppercase">{locale}</span>
      </button>
      
      <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <button
          onClick={() => switchLanguage('tr')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 rounded-t-lg transition-colors ${
            locale === 'tr' ? 'text-indigo-600 font-semibold' : 'text-slate-700'
          }`}
        >
          🇹🇷 Türkçe
        </button>
        <button
          onClick={() => switchLanguage('en')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 rounded-b-lg transition-colors ${
            locale === 'en' ? 'text-indigo-600 font-semibold' : 'text-slate-700'
          }`}
        >
          🇬🇧 English
        </button>
      </div>
    </div>
  );
}
