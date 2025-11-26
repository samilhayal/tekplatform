import { useTranslations } from 'next-intl'
import { GayrimenkulGelirVergisi } from "@/components/tools/gayrimenkul-gelir-vergisi"

export default function GayrimenkulGelirVergisiPage() {
  const t = useTranslations('tools.gayrimenkul-gelir-vergisi')
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-slate-600">{t('description')}</p>
      </div>
      <GayrimenkulGelirVergisi />
    </div>
  )
}
