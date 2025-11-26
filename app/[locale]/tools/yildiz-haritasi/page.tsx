import { Metadata } from "next"
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { YildizHaritasi } from "@/components/tools/yildiz-haritasi"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools.yildiz-haritasi' })
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: locale === 'tr' 
      ? ["yıldız haritası", "natal chart", "astroloji", "doğum haritası", "gezegen konumları"]
      : ["natal chart", "astrology", "birth chart", "planet positions", "horoscope"],
  }
}

export default async function YildizHaritasiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'tools.yildiz-haritasi' })
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-slate-600">{t('description')}</p>
      </div>
      <YildizHaritasi />
    </div>
  )
}
