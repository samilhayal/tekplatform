import { Metadata } from "next"
import { RentIncreaseCalculator } from "@/components/tools/rent-increase-calculator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Kira Zammı Hesaplama Aracı | Online Araçlar",
  description: "Kira sözleşmesi yenileme döneminde uygulanacak yasal artış oranına göre yeni kira bedelini hesaplayın. TÜFE, yasal tavan ve ek artış seçenekleri.",
  keywords: ["kira zammı", "kira artışı hesaplama", "TÜFE kira", "kira zam oranı", "kira hesaplama", "kiracı hakları", "kira sözleşmesi"]
}

export default function RentIncreaseCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 group transition-all hover:gap-3"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/50">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
                Finans & Emlak
              </span>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kira Zammı Hesaplama
              </h1>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg max-w-3xl">
            Kira sözleşmesi yenileme döneminde uygulanacak yasal artış oranına göre yeni kira bedelini hesaplayın. 
            TÜFE, yasal tavan ve ek artış seçenekleri ile detaylı hesaplama yapın.
          </p>
        </div>

        {/* Main Tool */}
        <RentIncreaseCalculator />

        {/* SEO Content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Kira Artışı Nasıl Hesaplanır?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Türkiye'de kira artışları genellikle TÜİK (Türkiye İstatistik Kurumu) tarafından açıklanan 
              TÜFE (Tüketici Fiyat Endeksi) oranına göre yapılır. Ancak son yıllarda hükümet tarafından 
              yasal tavan oranları belirlenmiştir.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Kira Artış Yöntemleri:</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li><strong>TÜFE Oranı:</strong> Yıllık ortalama TÜFE artışı uygulanır</li>
              <li><strong>Yasal Tavan:</strong> Hükümet tarafından belirlenen üst sınır uygulanır</li>
              <li><strong>Ek Artış:</strong> Taraflar arasında anlaşma ile ek artış yapılabilir</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Önemli Noktalar:</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
              <li>Kira artışı yıllık olarak yapılır</li>
              <li>Sözleşme süresince belirlenen oran sabittir</li>
              <li>Yasal tavan zorunludur (uygulanırsa)</li>
              <li>Ek artış her iki tarafın onayı gerektirir</li>
              <li>TÜFE oranı TÜİK tarafından aylık açıklanır</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Yasal Haklar:</h3>
            <p className="text-slate-700 mb-4">
              6098 sayılı Türk Borçlar Kanunu'na göre kiracı ve ev sahibinin hakları belirlenmiştir. 
              Kira artışları konusunda anlaşmazlık durumunda taraflar mahkemeye başvurabilir.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-blue-900 font-semibold mb-2">
                💡 İpucu:
              </p>
              <p className="text-blue-800 text-sm">
                Kira sözleşmenizi yenilemeden önce güncel TÜFE oranını ve yasal tavan oranını 
                kontrol edin. Gerekirse avukattan hukuki destek alın.
              </p>
            </div>

            <p className="text-sm text-slate-600 bg-slate-100 p-4 rounded-lg mt-6">
              <strong>Yasal Uyarı:</strong> Bu araç genel bilgilendirme amaçlıdır. 
              Kesin hukuki bilgi ve danışmanlık için mutlaka bir avukata başvurunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
