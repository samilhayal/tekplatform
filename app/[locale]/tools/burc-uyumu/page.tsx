import { useTranslations } from 'next-intl'
import { BurcUyumu } from "@/components/tools/burc-uyumu"

export default function BurcUyumuPage() {
  const t = useTranslations('tools.burc-uyumu')
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-slate-600">{t('description')}</p>
      </div>
      <BurcUyumu />
    </div>
  )
}
