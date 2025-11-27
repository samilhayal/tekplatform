"use client"

import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl';
import { CommandPalette } from "./command-palette"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const locale = useLocale();
  const t = useTranslations('header.navigation');
  const tCommon = useTranslations('common');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <Link href={`/${locale}`} className="flex items-center flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="KolayHesapla Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
          </Link>
          
          <div className="flex-1 max-w-lg">
            <CommandPalette />
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link 
            href={`/${locale}`} 
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {t('home')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}
