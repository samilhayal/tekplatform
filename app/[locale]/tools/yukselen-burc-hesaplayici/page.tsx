import { useTranslations } from 'next-intl'
import { YukselenBurcHesaplayici } from "@/components/tools/yukselen-burc-hesaplayici"

export default function YukselenBurcHesaplayiciPage() {
  const t = useTranslations('tools.yukselen-burc-hesaplayici')
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-slate-600">{t('description')}</p>
      </div>
      <YukselenBurcHesaplayici />
    </div>
  )
}
