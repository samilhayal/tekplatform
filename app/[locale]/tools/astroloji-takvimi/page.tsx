import { AstrolojiTakvimi } from '@/components/tools/astroloji-takvimi'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'tools' })
  
  return {
    title: t('astroloji-takvimi.title'),
    description: t('astroloji-takvimi.description'),
  }
}

export default function AstrolojiTakvimiPage() {
  return <AstrolojiTakvimi />
}
