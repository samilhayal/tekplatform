import { BurcOnerileri } from '@/components/tools/burc-onerileri'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'tools' })
  
  return {
    title: t('burc-onerileri.title'),
    description: t('burc-onerileri.description'),
  }
}

export default function BurcOnerileriPage() {
  return <BurcOnerileri />
}
