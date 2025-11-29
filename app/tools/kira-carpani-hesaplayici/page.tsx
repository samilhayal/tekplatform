import { Metadata } from 'next'
import { KiraCarpaniHesaplayici } from '@/components/tools/kira-carpani-hesaplayici'
import { Breadcrumb } from '@/components/breadcrumb'
import { SEOContent } from '@/components/seo-content'
import { RelatedTools } from '@/components/related-tools'

export const metadata: Metadata = {
  title: 'Konut ve Arsa Yatırım Getirisi Hesaplama | Geri Dönüş Süresi Hesaplayıcı',
  description: 'Konut ve arsa yatırımlarınız için kira çarpanı hesaplayın. Yatırım getirisi, geri dönüş süresi, nakit akışı ve kredi analizi ile doğru yatırım kararları alın.',
  keywords: [
    'kira çarpanı hesaplama',
    'kira çarpanı nedir',
    'konut yatırım getirisi',
    'arsa yatırım hesaplama',
    'emlak yatırım analizi',
    'geri dönüş süresi hesaplama',
    'yıllık kira getirisi',
    'gayrimenkul yatırım',
    'cash on cash return',
    'öz sermaye getirisi',
    'emlak değer artışı',
    'konut kredi analizi',
    'yatırım geri kazanım süresi',
    'net kira geliri hesaplama',
    'CAGR hesaplama',
    'reel getiri hesaplama'
  ],
  openGraph: {
    title: 'Konut ve Arsa Yatırım Getirisi | Geri Dönüş Süresi Hesaplama',
    description: 'Satın alacağınız veya sahip olduğunuz konut ya da arsanın yatırım getirisi, kira çarpanı ve geri dönüş süresini hesaplayın.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://kolayhesapla.org/tools/kira-carpani-hesaplayici'
  }
}

export default function KiraCarpaniHesaplayiciPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumb 
        items={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Araçlar', href: '/tools' },
          { label: 'Konut ve Arsa Yatırım Getirisi Hesaplama', href: '/tools/kira-carpani-hesaplayici' }
        ]} 
      />
      
      <div className="mt-6">
        <KiraCarpaniHesaplayici />
      </div>

      <SEOContent
        toolName="Konut ve Arsa Yatırım Getirisi Hesaplama"
        sections={[
          {
            title: 'Konut ve Arsa Yatırım Getirisi Hesaplama Nedir?',
            content: 'Konut ve arsa yatırım getirisi hesaplama, bir gayrimenkulün yatırım değerini analiz etmek için kullanılan önemli bir finansal araçtır. Konut, arsa, iş yeri veya depo yatırımlarınız için kapsamlı getiri analizi yapın. Kira çarpanı, geri dönüş süresi, yıllık net kira getirisi, değer artışı projeksiyonu ve kredi kullanıyorsanız öz sermaye getirisi (cash-on-cash) hesaplayın.'
          },
          {
            title: 'Özellikler',
            content: 'Kira çarpanı hesaplama (ay ve yıl bazında), yıllık net kira getirisi yüzdesi, geri dönüş süresi analizi, değer artışı dahil toplam getiri hesaplama, CAGR (Bileşik Yıllık Getiri Oranı) hesaplama, enflasyon sonrası reel getiri analizi, kredi kullanımı ile cash-on-cash getiri, aylık ve yıllık nakit akışı hesaplama, konut, arsa, iş yeri ve depo desteği, detaylı değerlendirme ve öneriler.'
          },
          {
            title: 'Kira Çarpanı Nedir?',
            content: 'Kira çarpanı, bir gayrimenkulün satış fiyatının aylık kira gelirine bölünmesiyle hesaplanan bir yatırım göstergesidir. Örneğin 3.000.000 TL değerindeki bir ev 15.000 TL\'ye kiralanıyorsa kira çarpanı 200 ay (yaklaşık 16,7 yıl) olur. Bu süre ne kadar kısa olursa yatırım o kadar cazip kabul edilir.'
          },
          {
            title: 'İdeal Kira Çarpanı Kaç Olmalı?',
            content: 'Türkiye\'de konut için kira çarpanı genellikle 180-250 ay arasında değişir. 150 ay altı çok iyi, 150-200 ay iyi, 200-250 ay orta, 250 ay üzeri yüksek kabul edilir. Ancak bu değerler lokasyona, gayrimenkul tipine ve piyasa koşullarına göre değişebilir.'
          },
          {
            title: 'Cash-on-Cash Getiri Nedir?',
            content: 'Cash-on-cash (nakit üzerinden nakit) getirisi, kredi kullanarak yapılan yatırımlarda öz sermayeniz üzerinden elde ettiğiniz yıllık getiri oranıdır. Örneğin 1.000.000 TL peşinat yatırıp yılda 100.000 TL net kira geliri elde ediyorsanız, cash-on-cash getiriniz %10\'dur.'
          },
          {
            title: 'Reel Getiri Neden Önemlidir?',
            content: 'Reel getiri, nominal getiriden enflasyonun çıkarılmasıyla bulunan gerçek satın alma gücü artışıdır. Yıllık %30 nominal getiri elde ediyor ama enflasyon %40 ise, reel getiri negatiftir ve paranızın değeri aslında azalmaktadır. Yatırım kararlarında reel getiri daha önemlidir.'
          }
        ]}
        keywords={['kira çarpanı', 'konut yatırım', 'arsa yatırım', 'gayrimenkul', 'geri dönüş süresi', 'yatırım getirisi', 'cash on cash', 'emlak', 'CAGR', 'reel getiri']}
      />
      
      <RelatedTools 
        currentToolId="kira-carpani-hesaplayici"
        category="Finans & Matematik"
      />
    </div>
  )
}
