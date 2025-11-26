import { Metadata } from 'next'
import { KpssCalculator } from '@/components/tools/kpss-calculator'

export const metadata: Metadata = {
  title: 'KPSS Net Hesaplama - Genel Yetenek ve Genel Kültür',
  description:
    'KPSS sınavı için net hesaplama aracı. Genel Yetenek (Türkçe, Matematik) ve Genel Kültür (Tarih, Coğrafya, Vatandaşlık, Güncel) net hesaplayıcı.',
  keywords: [
    'KPSS',
    'net hesaplama',
    'KPSS net',
    'genel yetenek',
    'genel kültür',
    'kamu personeli',
    'ÖSYM',
    'KPSS hesaplayıcı',
    'sınav neti'
  ]
}

export default function KpssPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">KPSS Net Hesaplama</h1>
        <p className="text-lg text-slate-600">
          KPSS sınavınız için Genel Yetenek ve Genel Kültür net hesaplayıcı
        </p>
      </div>

      <KpssCalculator />

      <div className="mt-12 space-y-6">
        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">KPSS Sınav Yapısı</h2>

          <div className="bg-slate-50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Genel Yetenek (60 Soru)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Türkçe:</strong> 30 soru</li>
                <li><strong>Matematik:</strong> 30 soru</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Genel Kültür (70 Soru)
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Tarih:</strong> 27 soru</li>
                <li><strong>Coğrafya:</strong> 18 soru</li>
                <li><strong>Vatandaşlık:</strong> 15 soru</li>
                <li><strong>Güncel Bilgiler:</strong> 10 soru</li>
              </ul>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="font-semibold text-purple-900 mb-2">Toplam Soru Sayısı</p>
              <p className="text-lg">
                Genel Yetenek (60) + Genel Kültür (70) = <strong>130 Soru</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Net Hesaplama Formülü</h2>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-lg font-semibold mb-3 text-center">
              Net = Doğru - (Yanlış / 4)
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Örnek:</strong> Türkçe'de 25 doğru, 4 yanlış yaptıysanız:
              </p>
              <p className="pl-4">Net = 25 - (4 / 4) = 25 - 1 = 24.00</p>
              <p className="text-xs text-slate-600 mt-3">
                Her 4 yanlış cevap, 1 doğru cevabı götürür. Boş bırakılan sorular net hesaplamasını etkilemez.
              </p>
            </div>
          </div>
        </section>

        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">KPSS Hakkında</h2>

          <div className="bg-slate-50 p-6 rounded-lg space-y-3 text-sm">
            <p>
              <strong>KPSS (Kamu Personeli Seçme Sınavı),</strong> ÖSYM tarafından yılda bir kez 
              düzenlenen ve kamu kurumlarına personel alımı için kullanılan merkezi bir sınavdır.
            </p>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Sınav Türleri</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>KPSS Lisans (GY-GK):</strong> Üniversite mezunları için</li>
                <li><strong>KPSS Önlisans (GY-GK):</strong> Önlisans mezunları için</li>
                <li><strong>KPSS Ortaöğretim (GY-GK):</strong> Lise mezunları için</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Puan Türleri</h3>
              <p>
                Genel Yetenek ve Genel Kültür puanlarının ağırlıklı ortalamasıyla farklı 
                puan türleri oluşturulur (P1, P2, P3, vb.). Her kadroya göre farklı puan 
                türleri geçerlidir.
              </p>
            </div>

            <p className="text-xs text-slate-500 border-l-4 border-orange-400 pl-3 py-2">
              <strong>Yasal Uyarı:</strong> Bu hesaplama aracı tahmini sonuç vermektedir. 
              Resmi puanlar ÖSYM tarafından açıklanır. Sınav puanı sadece net sayısına değil, 
              doğru cevap dağılımı ve standart sapma gibi istatistiksel hesaplamalara da bağlıdır.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
