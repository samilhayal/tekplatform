import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { SEOContent } from '@/components/seo-content'
import { RelatedTools } from '@/components/related-tools'
import { KrediYenidenYapilandirma } from '@/components/tools/kredi-yeniden-yapilandirma'

export const metadata: Metadata = {
  title: 'Kredi Yeniden Yapılandırma & Erken Kapama Hesaplama | KolayHesapla',
  description: 'Mevcut kredi borcunuzu yeniden yapılandırın, erken kapama maliyetini hesaplayın. Kısmi ödeme, vade kısaltma, taksit düşürme ve refinansman seçeneklerini karşılaştırın.',
  keywords: [
    'kredi yeniden yapılandırma',
    'erken kapama hesaplama',
    'kredi erken ödeme',
    'refinansman hesaplama',
    'kredi kısmi ödeme',
    'vade kısaltma',
    'taksit düşürme',
    'kredi faiz hesaplama',
    'konut kredisi erken kapama',
    'ihtiyaç kredisi yeniden yapılandırma',
    'kredi karşılaştırma',
    'erken kapama cezası',
    'kalan anapara hesaplama',
    'amortizasyon tablosu'
  ],
  openGraph: {
    title: 'Kredi Yeniden Yapılandırma & Erken Kapama Hesaplama',
    description: 'Kredinizi analiz edin, erken kapama veya yeniden yapılandırma ile tasarruf edin',
    type: 'website',
  }
}

export default function KrediYenidenYapilandirmaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Araçlar', href: '/tools' },
            { label: 'Kredi Yeniden Yapılandırma', href: '/tools/kredi-yeniden-yapilandirma' }
          ]} 
        />
        
        <KrediYenidenYapilandirma />

        <div className="mt-12 max-w-5xl mx-auto">
          <SEOContent
            toolName="Kredi Yeniden Yapılandırma ve Erken Kapama Hesaplama"
            sections={[
              {
                title: "Kredi Yeniden Yapılandırma Nedir?",
                content: "Kredi yeniden yapılandırma (refinansman), mevcut kredinizi daha uygun koşullarla yeni bir krediye çevirme işlemidir. Faiz oranları düştüğünde veya daha iyi koşullar bulduğunuzda, mevcut kredinizi kapatıp yeni faiz oranıyla devam edebilirsiniz. Bu işlem özellikle uzun vadeli kredilerde (konut kredisi gibi) ciddi tasarruflar sağlayabilir."
              },
              {
                title: "Erken Kapama Nasıl Yapılır?",
                content: "Kredi erken kapama, kalan borcunuzu vadesinden önce tamamen ödeyerek krediyi sonlandırma işlemidir. Konut kredilerinde yasal olarak erken kapama cezası alınamaz. İhtiyaç ve taşıt kredilerinde maksimum %1, ticari kredilerde %2 ceza uygulanabilir. Erken kapama ile kalan tüm faiz ödemelerinden kurtulursunuz."
              },
              {
                title: "Kısmi Erken Ödeme Seçenekleri",
                content: "Kısmi erken ödeme yaparak kredinizin bir kısmını önceden ödeyebilirsiniz. İki seçeneğiniz var: Vade kısaltma (aynı taksitle daha kısa sürede bitirme) veya taksit düşürme (aynı vadede daha düşük aylık ödeme). Vade kısaltma genellikle daha fazla faiz tasarrufu sağlar."
              },
              {
                title: "Hangi Durumda Refinansman Avantajlıdır?",
                content: "Refinansman, yeni faiz oranı mevcut oranınızdan en az %0.5-1 puan düşükse değerlendirilebilir. Ancak işlem masrafları, ekspertiz ve sigorta gibi ek maliyetleri de hesaba katmalısınız. Genellikle kredinin başlangıcına yakın dönemlerde refinansman daha avantajlıdır çünkü faiz yükü ilk yıllarda daha ağırdır."
              }
            ]}
          />

          <RelatedTools
            currentToolId="kredi-yeniden-yapilandirma"
            category="Finans & Matematik"
          />
        </div>
      </div>
    </main>
  )
}
