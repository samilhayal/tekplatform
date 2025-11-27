import { Metadata } from "next"
import { AspectRatioCalculator } from "@/components/tools/aspect-ratio"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Aspect Ratio Hesaplama | Online Tools Hub",
  description: "Video ve görsel tasarımları için aspect ratio hesaplama ve görsel önizleme aracı. 16:9, 4:3, 1:1 ve daha fazlası.",
}

export default function AspectRatioPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Aspect Ratio Hesaplayıcı & Görselleştirici
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            Video editörleri ve tasarımcılar için aspect ratio hesaplama ve görsel önizleme aracı. 
            Yaygın oranları kullanın veya özel boyutlarınızı hesaplayın.
          </p>
        </div>

        <AspectRatioCalculator />

        <div className="mt-8 sm:mt-12 prose prose-slate max-w-none prose-sm sm:prose-base">
          <h2 className="text-xl sm:text-2xl font-bold">Aspect Ratio Nedir?</h2>
          <p className="text-sm sm:text-base">
            Aspect ratio (en-boy oranı), bir görselin veya videonun genişliğinin yüksekliğe oranıdır. 
            Farklı platformlar ve cihazlar farklı aspect ratio'lar kullanır.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Yaygın Aspect Ratio'lar</h2>
          
          <h3 className="text-lg sm:text-xl font-semibold">16:9 - Geniş Ekran</h3>
          <p className="text-sm sm:text-base">
            Modern TV'ler, bilgisayar monitörleri ve YouTube videoları için standart format. 
            Full HD (1920x1080) ve 4K (3840x2160) bu oranı kullanır.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">4:3 - Klasik Format</h3>
          <p className="text-sm sm:text-base">
            Eski televizyonlar ve bilgisayar monitörlerinde kullanılan klasik format.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">1:1 - Kare Format</h3>
          <p className="text-sm sm:text-base">
            Instagram gönderileri ve profil fotoğrafları için ideal oran.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">21:9 - Ultra Geniş</h3>
          <p className="text-sm sm:text-base">
            Sinematik videolar ve ultra geniş monitörler için kullanılan format.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">9:16 - Dikey Format</h3>
          <p className="text-sm sm:text-base">
            Instagram Stories, TikTok ve Reels için kullanılan dikey mobil format.
          </p>
        </div>
      </div>
    </div>
  )
}
