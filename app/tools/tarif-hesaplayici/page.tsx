import { Metadata } from 'next'
import { RecipeCalculator } from '@/components/tools/recipe-calculator'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedTools } from '@/components/related-tools'
import { SEOContent } from '@/components/seo-content'

export const metadata: Metadata = {
  title: 'Tarif Hesaplayıcı - Kişi Sayısına Göre Malzeme Miktarı | KolayHesapla',
  description: 'Tariflerdeki malzeme miktarlarını kişi sayısına göre otomatik hesaplayın. Ölçü birimlerini (gram, bardak, kaşık) kolayca dönüştürün. Yemek tariflerinde 4 kişilik malzemeleri istediğiniz kişi sayısına uyarlayın.',
  keywords: [
    'tarif hesaplayıcı',
    'malzeme miktarı hesaplama',
    'kişi sayısına göre tarif',
    'ölçü birimi dönüştürücü',
    'bardak gram çevirici',
    'kaşık gram hesaplama',
    'yemek tarifi hesaplama',
    'tarif uyarlama',
    'mutfak ölçüleri',
    'malzeme hesaplama'
  ],
  openGraph: {
    title: 'Tarif Hesaplayıcı - Kişi Sayısına Göre Malzeme Miktarı',
    description: 'Tariflerdeki malzeme miktarlarını kişi sayısına göre otomatik hesaplayın ve ölçü birimlerini dönüştürün.',
    type: 'website',
    locale: 'tr_TR',
  },
}

const seoSections = [
  {
    title: 'Kişi Sayısına Göre Hesaplama',
    content: '4 kişilik bir tarifi 2 veya 10 kişilik olarak uyarlayın. Tüm malzeme miktarları otomatik olarak orantılı şekilde güncellenir. Örneğin 4 kişilik tarifteki 200g un, 2 kişilik tarif için 100g, 8 kişilik tarif için 400g olarak hesaplanır.'
  },
  {
    title: 'Ölçü Birimi Dönüştürme',
    content: 'Gram, bardak, kaşık, fincan gibi farklı ölçü birimleri arasında kolayca dönüşüm yapın. 1 su bardağı un = 125 gram, 1 su bardağı şeker = 200 gram, 1 yemek kaşığı = 10-15 gram (malzemeye göre değişir).'
  },
  {
    title: 'Yaygın Mutfak Ölçüleri',
    content: '1 su bardağı un = 125g, 1 su bardağı şeker = 200g, 1 çay bardağı = 100ml, 1 yemek kaşığı (katı) = 10g, 1 yemek kaşığı (sıvı) = 15ml, 1 çay kaşığı = 5g. Bu standart ölçüler tüm hesaplamalarda kullanılır.'
  },
  {
    title: 'Sıkça Sorulan Sorular',
    content: '1 su bardağı un kaç gram? Yaklaşık 125 gram. 1 yemek kaşığı kaç gram? Katı malzemeler için ~10g, sıvılar için ~15ml. 1 çay bardağı kaç ml? Yaklaşık 100ml. Tarifi yarıya indirmek için hedef kişi sayısını yarı olarak girin.'
  }
]

const seoKeywords = [
  'tarif hesaplayıcı',
  'malzeme miktarı',
  'kişi sayısı',
  'ölçü birimi dönüştürme',
  'bardak gram',
  'kaşık gram',
  'mutfak ölçüleri'
]

export default function RecipeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumb 
        items={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Araçlar', href: '/#tools' },
          { label: 'Tarif Hesaplayıcı', href: '/tools/tarif-hesaplayici' }
        ]} 
      />
      
      <RecipeCalculator />
      
      <div className="mt-12">
        <SEOContent 
          toolName="Tarif Hesaplayıcı" 
          sections={seoSections}
          keywords={seoKeywords}
        />
      </div>
      
      <div className="mt-12">
        <RelatedTools currentToolId="tarif-hesaplayici" category="Dönüştürücüler" />
      </div>
    </div>
  )
}
