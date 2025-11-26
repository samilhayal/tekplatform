"use client"

import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl';
import { CommandPalette } from "./command-palette"
import { LanguageSwitcher } from "./language-switcher"
import { Wrench } from "lucide-react"

export function Header() {
  const locale = useLocale();
  const t = useTranslations('header.navigation');
  const tCommon = useTranslations('common');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg sm:text-xl text-slate-900 flex-shrink-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-600">
            <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="hidden sm:inline">{tCommon('appName')}</span>
        </Link>
        
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <CommandPalette />
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
