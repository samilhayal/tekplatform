import { BrutNetMaasHesaplayici } from '@/components/tools/brut-net-maas-hesaplayici'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'tools' })
  
  return {
    title: t('brut-net-maas-hesaplayici.title'),
    description: t('brut-net-maas-hesaplayici.description'),
  }
}

export default function BrutNetMaasHesaplayiciPage() {
  return <BrutNetMaasHesaplayici />
}
