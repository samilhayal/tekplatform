'use client'

import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl';
import { BentoGrid } from "@/components/bento-grid";
import { tools } from "@/lib/tools-data";

export default function Home() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [activeToolsCount, setActiveToolsCount] = useState(tools.length)

  useEffect(() => {
    // Load active tools count from localStorage
    const stored = localStorage.getItem('toolsStatus')
    if (stored) {
      try {
        const status = JSON.parse(stored)
        const activeCount = Object.values(status).filter(Boolean).length
        setActiveToolsCount(activeCount)
      } catch (error) {
        setActiveToolsCount(tools.length)
      }
    }
  }, [])

  return (
    <div className="w-full relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
        <div className="mb-8 sm:mb-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-700">{activeToolsCount}+ {tCommon('slogan')}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900">
            {tCommon('appName')}
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-6">
            {t('description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-200">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">
                {t.rich('features.free', {
                  default: () => 'Tamamen Ücretsiz'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-200">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">
                {t.rich('features.noRegistration', {
                  default: () => 'Kayıt Gerekmez'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-200">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">
                {t.rich('features.fast', {
                  default: () => 'Hızlı & Güvenli'
                })}
              </span>
            </div>
          </div>
        </div>

        <BentoGrid />
      </div>
    </div>
  );
}
