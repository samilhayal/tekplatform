import { Metadata } from 'next'
import { JobChangeCalculator } from '@/components/tools/job-change-calculator'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedTools } from '@/components/related-tools'
import { SEOContent } from '@/components/seo-content'

export const metadata: Metadata = {
  title: 'İş Değişikliği Maaş ve Tazminat Hesaplama | KolayHesapla',
  description: 'İş değişikliği sonrası net maaşınızın nasıl değişeceğini, kümülatif vergi matrahının etkisini, kıdem–ihbar tazminatı ve yıllık izin ücretini otomatik hesaplayın. İş değiştirmeden önce elinize geçecek net tutarı görün.',
  keywords: [
    'iş değişikliği hesaplama',
    'kıdem tazminatı hesaplama',
    'ihbar tazminatı hesaplama',
    'kümülatif vergi matrahı',
    'net maaş hesaplama',
    'maaş karşılaştırma',
    'yıllık izin ücreti',
    'iş değiştirme',
    'tazminat hesaplama',
    'brüt net maaş',
    'vergi dilimi hesaplama',
    'SGK kesintisi'
  ],
  openGraph: {
    title: 'İş Değişikliği Maaş ve Tazminat Hesaplama',
    description: 'İş değişikliği sonrası net maaşınızın nasıl değişeceğini, kümülatif vergi matrahının etkisini ve tazminatlarınızı hesaplayın.',
    type: 'website',
    locale: 'tr_TR',
  },
}

const seoSections = [
  {
    title: 'İş Değişikliği Hesaplama Nedir?',
    content: 'İş değişikliği hesaplama aracı, mevcut işinizden ayrılırken alacağınız tüm hakları (kıdem tazminatı, ihbar tazminatı, kullanılmayan yıllık izin ücreti) ve yeni işinizde yıl sonuna kadar alacağınız net maaşları detaylı şekilde hesaplar. Kümülatif vergi matrahının yeni maaşınıza etkisini de gösterir.'
  },
  {
    title: 'Kümülatif Vergi Matrahı Neden Önemli?',
    content: 'Türkiye\'de gelir vergisi artan oranlıdır. Yıl içinde iş değiştirdiğinizde, eski işinizdeki kümülatif vergi matrahı yeni işe aktarılır. Bu nedenle yeni işinizde ilk aylarda beklenenden düşük net maaş alabilirsiniz. Yılın başında iş değiştirmek vergi avantajı sağlayabilir.'
  },
  {
    title: 'Kıdem Tazminatı Hakkı',
    content: 'Kıdem tazminatı, işveren tarafından fesih, emeklilik, askerlik, evlilik (kadınlar için) ve haklı nedenle fesih durumlarında ödenir. Her tam yıl için bir brüt maaş tutarında hesaplanır. 2025 yılı için kıdem tavanı 35.058,58 TL\'dir.'
  },
  {
    title: 'İhbar Tazminatı Süresi',
    content: 'İhbar süresi çalışma süresine göre değişir: 6 aydan az çalışanlara 2 hafta, 6 ay - 1.5 yıl arası 4 hafta, 1.5 - 3 yıl arası 6 hafta, 3 yıldan fazla çalışanlara 8 hafta ihbar süresi uygulanır.'
  }
]

const seoKeywords = [
  'iş değişikliği',
  'kıdem tazminatı',
  'ihbar tazminatı',
  'kümülatif matrah',
  'net maaş',
  'vergi dilimi',
  'yıllık izin ücreti'
]

export default function JobChangeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb 
        items={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Araçlar', href: '/#tools' },
          { label: 'İş Değişikliği Hesaplama', href: '/tools/is-degisikligi-hesaplayici' }
        ]} 
      />
      
      <JobChangeCalculator />
      
      <div className="mt-12">
        <SEOContent 
          toolName="İş Değişikliği Maaş ve Tazminat Hesaplama" 
          sections={seoSections}
          keywords={seoKeywords}
        />
      </div>
      
      <div className="mt-12">
        <RelatedTools currentToolId="is-degisikligi-hesaplayici" category="Finans & Matematik" />
      </div>
    </div>
  )
}
