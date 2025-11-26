import { Metadata } from "next"
import { UnitConverter } from "@/components/tools/unit-converter"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Evrensel Birim Dönüştürücü | Online Tools Hub",
  description: "Uzunluk, ağırlık, hacim, sıcaklık, hız ve veri depolama birimleri arasında hızlı ve kolay dönüşüm yapın.",
}

export default function UnitConverterPage() {
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
            Evrensel Birim Dönüştürücü
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            Farklı ölçü birimleri arasında kolayca dönüşüm yapın. Uzunluk, ağırlık, hacim, 
            sıcaklık, hız ve veri depolama kategorilerinde anlık hesaplama.
          </p>
        </div>

        <UnitConverter />

        <div className="mt-8 sm:mt-12 prose prose-slate max-w-none prose-sm sm:prose-base">
          <h2 className="text-xl sm:text-2xl font-bold">Desteklenen Kategoriler</h2>
          
          <h3 className="text-lg sm:text-xl font-semibold">Uzunluk</h3>
          <p className="text-sm sm:text-base">
            Metre, kilometre, santimetre, milimetre, mil, yard, feet ve inch birimleri 
            arasında dönüşüm yapabilirsiniz.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">Ağırlık</h3>
          <p className="text-sm sm:text-base">
            Kilogram, gram, miligram, ton, pound ve ons birimleri arasında kolayca 
            çevrim yapın.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">Hacim</h3>
          <p className="text-sm sm:text-base">
            Litre, mililitre, metreküp, galon ve quart birimleri için hacim hesaplamaları.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">Sıcaklık</h3>
          <p className="text-sm sm:text-base">
            Celsius, Fahrenheit ve Kelvin arasında sıcaklık dönüşümleri yapın.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">Hız</h3>
          <p className="text-sm sm:text-base">
            Metre/saniye, kilometre/saat, mil/saat ve knot birimleri arasında hız 
            hesaplamaları.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold">Veri Depolama</h3>
          <p className="text-sm sm:text-base">
            Byte, Kilobyte, Megabyte, Gigabyte ve Terabyte arasında veri boyutu 
            dönüşümleri.
          </p>
        </div>
      </div>
    </div>
  )
}
