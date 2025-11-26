import { useTranslations } from 'next-intl'
import { AkillBedenSecici } from "@/components/tools/akilli-beden-secici"

export default function AkillBedenSeciciPage() {
  const t = useTranslations('tools.akilli-beden-secici')
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-slate-600">{t('description')}</p>
      </div>
      <AkillBedenSecici />
    </div>
  )
}
