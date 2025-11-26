import { Metadata } from "next"
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AyBurcuHesaplayici } from "@/components/tools/ay-burcu-hesaplayici"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools.ay-burcu-hesaplayici' })
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: locale === 'tr' 
      ? ["ay burcu", "moon sign", "astroloji", "duygusal karakter", "ay fazı"]
      : ["moon sign", "astrology", "emotional character", "moon phase", "zodiac"],
  }
}

export default async function AyBurcuHesaplayiciPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'tools.ay-burcu-hesaplayici' })
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-slate-600">{t('description')}</p>
      </div>
      <AyBurcuHesaplayici />
    </div>
  )
}
