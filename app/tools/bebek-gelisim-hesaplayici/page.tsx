import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Home, Baby } from 'lucide-react'
import { BebekGelisimHesaplayici } from '@/components/tools/bebek-gelisim-hesaplayici'
import { RelatedTools } from '@/components/related-tools'
import { SEOContent } from '@/components/seo-content'

export const metadata: Metadata = {
  title: 'Bebek Gelişim Takip | Boy – Kilo – Baş Çevresi Persentil | KolayHesapla',
  description: 'Bebeğinizin boy, kilo ve baş çevresi persentil değerini WHO büyüme standartlarına göre hesaplayın. 0–5 yaş arası bebekler için gelişim yüzdelikleri, normal–düşük–yüksek değerlendirmesi ve grafikli sonuçlar.',
  keywords: [
    'bebek gelişim takip',
    'bebek persentil hesaplama',
    'bebek boy persentil',
    'bebek kilo persentil',
    'baş çevresi persentil',
    'WHO büyüme standartları',
    'bebek büyüme eğrisi',
    'z-score hesaplama',
    'bebek gelişim takibi',
    '0-5 yaş bebek ölçümleri',
    'persentil hesaplayıcı',
    'bebek boy kilo tablosu'
  ],
  openGraph: {
    title: 'Bebek Gelişim Takip | Boy – Kilo – Baş Çevresi',
    description: 'WHO büyüme standartlarına göre 0-5 yaş arası bebekler için boy, kilo ve baş çevresi persentil hesaplama',
    type: 'website',
    locale: 'tr_TR'
  }
}

export default function BebekGelisimHesaplayiciPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
            <Home className="h-4 w-4" />
            Ana Sayfa
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/tools" className="hover:text-pink-600 transition-colors">
            Araçlar
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-pink-600 font-medium flex items-center gap-1">
            <Baby className="h-4 w-4" />
            Bebek Gelişim Takip
          </span>
        </nav>

        {/* Tool Component */}
        <BebekGelisimHesaplayici />

        {/* SEO Content */}
        <SEOContent
          toolName="Bebek Gelişim ve Persentil Hesaplama Rehberi"
          sections={[
            {
              title: "Bebek Persentili Nedir?",
              content: "Persentil, bebeğinizin aynı yaş ve cinsiyetteki diğer bebeklerle karşılaştırıldığında nerede olduğunu gösteren istatistiksel bir ölçüdür. Örneğin, %50 persentil demek bebeğinizin tam ortada olduğunu, yaşıtlarının yarısından büyük, yarısından küçük olduğunu gösterir. %75 persentilde bir bebek, yaşıtlarının %75'inden büyük demektir."
            },
            {
              title: "WHO Büyüme Standartları",
              content: "Dünya Sağlık Örgütü (WHO), 2006 yılında 6 farklı ülkeden (Brezilya, Gana, Hindistan, Norveç, Umman, ABD) toplanan verilerle evrensel büyüme standartlarını yayınladı. Bu standartlar, sağlıklı bebeklerin nasıl büyümesi gerektiğini gösterir. LMS (Lambda-Mu-Sigma) yöntemi kullanılarak hesaplanan bu değerler, tüm dünyada referans olarak kabul edilmektedir."
            },
            {
              title: "Persentil Kategorileri",
              content: "Persentil değerleri kategorilere ayrılır: Çok Düşük (≤3), Düşük (3-15), Normal (15-85), Yüksek (85-97), Çok Yüksek (>97). Normal aralık oldukça geniştir çünkü her bebek farklı hızda büyür. Önemli olan tek bir ölçüm değil, zaman içindeki büyüme eğilimidir. Persentil çizgisinde ani düşüş veya yükseliş olursa doktora danışılmalıdır."
            },
            {
              title: "Boy, Kilo ve Baş Çevresi",
              content: "Boy: Genetik faktörlerden en çok etkilenen ölçümdür. Anne-babanın boyu çocuğun potansiyel boyunu belirler. Kilo: Beslenme durumunu en iyi yansıtan ölçüdür. Ani değişiklikler beslenme sorunlarına işaret edebilir. Baş Çevresi: Beyin gelişiminin en önemli göstergesidir. Özellikle ilk 2 yılda düzenli takip edilmeli, aşırı büyük (makrosefali) veya küçük (mikrosefali) olması değerlendirilmelidir."
            },
            {
              title: "Z-Score Nedir?",
              content: "Z-score, bir ölçümün ortalamanın kaç standart sapma uzağında olduğunu gösteren değerdir. Z-score = 0 ortalamayı, Z-score = -2 çok düşük (≤3. persentil), Z-score = +2 çok yüksek (≥97. persentil) anlamına gelir. Klinik değerlendirmelerde persentil yerine genellikle Z-score tercih edilir."
            }
          ]}
        />

        {/* Related Tools */}
        <RelatedTools
          currentToolId="bebek-gelisim-hesaplayici"
          category="Aile & Bebek"
        />
      </div>
    </div>
  )
}
