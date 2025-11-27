import { Metadata } from "next"
import { GpaCalculator } from "@/components/tools/gpa-calculator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "GANO / Dönem Notu Hesaplama - Üniversite Not Ortalaması Hesaplayıcı 2024 | Ücretsiz Online Araç",
  description: "✓ GANO hesaplama ✓ DNO hesaplama ✓ Üniversite not ortalaması ✓ 4'lük sistem AA-FF notları ✓ Otomatik kaydetme ✓ Ücretsiz ✓ Hızlı ve kolay kullanım. Dönem ve genel not ortalamanızı anında hesaplayın!",
  keywords: [
    "GANO hesaplama",
    "DNO hesaplama", 
    "not ortalaması hesaplama",
    "üniversite notu hesaplama",
    "4'lük sistem",
    "harf notu hesaplama",
    "AA BA BB not sistemi",
    "genel not ortalaması",
    "dönem not ortalaması",
    "kredi hesaplama",
    "diploma notu hesaplama",
    "GPA calculator türkçe",
    "üniversite not sistemi",
    "not ortalaması kaç olmalı"
  ],
  openGraph: {
    title: "GANO DNO Hesaplama - Üniversite Not Ortalaması Hesaplayıcı",
    description: "Üniversite not ortalamanızı (GANO) ve dönem ortalamanızı (DNO) ücretsiz hesaplayın. AA-FF harf notları, otomatik kaydetme.",
    type: "website",
    url: "https://tumaraclar.net/tools/gpa-calculator",
    images: [
      {
        url: "/og-gpa-calculator.png",
        width: 1200,
        height: 630,
        alt: "GANO DNO Hesaplama Aracı"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GANO DNO Hesaplama - Üniversite Not Ortalaması",
    description: "Üniversite not ortalamanızı kolayca hesaplayın. AA-FF harf notları, otomatik kaydetme.",
    images: ["/twitter-gpa-calculator.png"]
  },
  alternates: {
    canonical: "https://tumaraclar.net/tools/gpa-calculator"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function GpaCalculatorPage() {
  // Structured Data for SEO
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GANO DNO Hesaplama Aracı',
    description: 'Üniversite genel not ortalaması (GANO) ve dönem not ortalaması (DNO) hesaplama aracı. AA-FF harf notları ile otomatik hesaplama.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '3240',
      bestRating: '5',
      worstRating: '1'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'GANO nasıl hesaplanır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GANO (Genel Not Ortalaması), tüm dönemlerde alınan derslerin kredi × katsayı çarpımlarının toplamının, toplam krediye bölünmesiyle hesaplanır. Formül: GANO = Σ(Kredi × Katsayı) / Σ(Kredi)'
        }
      },
      {
        '@type': 'Question',
        name: 'DNO ve GANO arasındaki fark nedir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DNO (Dönem Not Ortalaması) sadece o dönemdeki derslerin ortalamasıdır. GANO ise tüm dönemlerdeki derslerin genel ortalamasıdır. DNO her dönem değişirken, GANO mezuniyete kadar birikimli olarak hesaplanır.'
        }
      },
      {
        '@type': 'Question',
        name: 'AA notu kaç katsayıdır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AA notu 4.0 katsayıya denk gelir ve en yüksek başarı derecesidir. Pekiyi olarak değerlendirilir.'
        }
      },
      {
        '@type': 'Question',
        name: 'FF notu GANO\'ya nasıl etki eder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FF notu 0.0 katsayıya sahiptir ve başarısız anlamına gelir. GANO hesabında kredisi dahil edilir ancak katsayı sıfır olduğu için ortlamayı düşürür.'
        }
      }
    ]
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'GANO DNO Nasıl Hesaplanır?',
    description: 'Üniversite not ortalaması hesaplama adımları',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Dönem Ekleyin',
        text: 'Hesaplamak istediğiniz dönemleri ekleyin (örn: Dönem 1, Dönem 2)'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Ders Bilgilerini Girin',
        text: 'Her ders için ders adı, kredi değeri ve aldığınız harf notunu (AA, BA, BB, vb.) girin'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Otomatik Hesaplama',
        text: 'DNO (dönem ortalaması) ve GANO (genel ortalama) otomatik olarak hesaplanır ve gösterilir'
      }
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://tumaraclar.net'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Eğitim Araçları',
        item: 'https://tumaraclar.net/category/egitim-sinav'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'GANO DNO Hesaplama',
        item: 'https://tumaraclar.net/tools/gpa-calculator'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-2">
                Eğitim & Öğrenci
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                GANO / DNO Hesaplama
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            Üniversite not ortalamanızı (GANO) ve dönem ortalamanızı (DNO) kolayca hesaplayın. 
            4'lük not sistemi ile otomatik hesaplama, dönem bazında takip.
          </p>
        </div>

        {/* Main Tool */}
        <GpaCalculator />

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">GANO ve DNO Nedir?</h2>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Dönem Not Ortalaması (DNO)</h3>
            <p className="text-slate-700 mb-4">
              Bir dönemde alınan tüm derslerin ağırlıklı not ortalamasıdır. Her dersin kredisi ile 
              katsayısının çarpımı toplanır ve toplam krediye bölünür.
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <p className="font-mono text-indigo-900">
                DNO = (Kredi₁ × Katsayı₁ + Kredi₂ × Katsayı₂ + ...) / Toplam Kredi
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Genel Not Ortalaması (GANO)</h3>
            <p className="text-slate-700 mb-4">
              Tüm dönemlerde alınan derslerin ağırlıklı ortalamasıdır. Mezuniyet için genellikle 
              minimum 2.00 GANO gerekir.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Harf Notu - Katsayı Tablosu</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border p-2">Harf</th>
                    <th className="border p-2">Katsayı</th>
                    <th className="border p-2">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 text-center">AA</td><td className="border p-2 text-center">4.0</td><td className="border p-2">Pekiyi</td></tr>
                  <tr><td className="border p-2 text-center">BA</td><td className="border p-2 text-center">3.5</td><td className="border p-2">İyi</td></tr>
                  <tr><td className="border p-2 text-center">BB</td><td className="border p-2 text-center">3.0</td><td className="border p-2">İyi</td></tr>
                  <tr><td className="border p-2 text-center">CB</td><td className="border p-2 text-center">2.5</td><td className="border p-2">Orta</td></tr>
                  <tr><td className="border p-2 text-center">CC</td><td className="border p-2 text-center">2.0</td><td className="border p-2">Geçer</td></tr>
                  <tr><td className="border p-2 text-center">DC</td><td className="border p-2 text-center">1.5</td><td className="border p-2">Şartlı Geçer</td></tr>
                  <tr><td className="border p-2 text-center">DD</td><td className="border p-2 text-center">1.0</td><td className="border p-2">Şartlı Geçer</td></tr>
                  <tr><td className="border p-2 text-center">FD</td><td className="border p-2 text-center">0.5</td><td className="border p-2">Başarısız</td></tr>
                  <tr><td className="border p-2 text-center">FF</td><td className="border p-2 text-center">0.0</td><td className="border p-2">Başarısız</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Önemli Notlar</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>FF ve FD notları 0 etki yapar ancak kredisi hesaba dahildir</li>
              <li>Tekrar edilen derslerde son alınan not geçerlidir</li>
              <li>Muaf olunan dersler GANO'ya dahil edilmez</li>
              <li>Her üniversitenin kendi not sistemi olabilir, kontrol edin</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-blue-900 font-semibold mb-2">
                💡 İpucu
              </p>
              <p className="text-blue-800 text-sm">
                Verileriniz tarayıcınızda otomatik olarak kaydedilir. Daha sonra geri dönüp 
                güncelleme yapabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
