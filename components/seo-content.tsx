'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, ExternalLink, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContentSection {
  title: string
  content: string
}

interface OutboundLink {
  title: string
  url: string
  description: string
}

interface SEOContentProps {
  toolName: string
  sections: ContentSection[]
  outboundLinks?: OutboundLink[]
  keywords?: string[]
}

export function SEOContent({ toolName, sections, outboundLinks = [], keywords = [] }: SEOContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="max-w-5xl mx-auto mt-12">
      {/* Expandable Content Toggle Button */}
      <div className="flex justify-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 gap-2 text-sm font-normal"
        >
          <Info className="h-4 w-4" />
          {isExpanded ? 'Detaylı Bilgileri Gizle' : 'Detaylı Bilgileri Görüntüle'}
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-8">
          {/* Main Content Sections */}
          <article className="prose prose-slate max-w-none">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">
                  {toolName} Hakkında Detaylı Bilgi
                </h2>
              </div>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <section key={index} className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed pl-8">
                      {section.content}
                    </p>
                  </section>
                ))}
              </div>

              {/* Keywords for SEO */}
              {keywords.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    İlgili Konular
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Outbound Links / References Section */}
          {outboundLinks.length > 0 && (
            <aside className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <ExternalLink className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-amber-900">
                  Faydalı Kaynaklar ve Referanslar
                </h2>
              </div>
              
              <p className="text-sm text-amber-700 mb-4">
                Bu araçla ilgili daha fazla bilgi edinmek için aşağıdaki güvenilir kaynaklara göz atabilirsiniz:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {outboundLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-lg bg-white/60 hover:bg-white border border-amber-200 hover:border-amber-300 transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0 group-hover:text-amber-700" />
                    <div>
                      <h3 className="text-sm font-medium text-amber-900 group-hover:text-amber-700">
                        {link.title}
                      </h3>
                      <p className="text-xs text-amber-600 mt-0.5">
                        {link.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-xs text-amber-600 mt-4 pt-3 border-t border-amber-200">
                <strong>Not:</strong> Yukarıdaki bağlantılar bilgilendirme amaçlıdır. 
                Profesyonel tavsiye için ilgili uzmanlara danışmanızı öneririz.
              </p>
            </aside>
          )}
        </div>
      )}
    </div>
  )
}

// Pre-defined content for common tools
export const seoContentData: Record<string, {
  sections: ContentSection[]
  outboundLinks: OutboundLink[]
  keywords: string[]
}> = {
  'bmi-calculator': {
    sections: [
      {
        title: 'Vücut Kitle İndeksi (BMI) Nedir?',
        content: 'Vücut Kitle İndeksi (Body Mass Index - BMI), bir kişinin boy ve kilosuna göre vücut yağ oranını tahmin etmek için kullanılan yaygın bir ölçüm yöntemidir. BMI, kilogramla ifade edilen vücut ağırlığının metre cinsinden boyun karesine bölünmesiyle hesaplanır. Bu hesaplama, bireylerin genel sağlık durumlarını değerlendirmelerine yardımcı olur ve olası sağlık risklerini belirlemede önemli bir gösterge olarak kabul edilir.'
      },
      {
        title: 'BMI Hesaplaması Nasıl Yapılır?',
        content: 'BMI hesaplaması oldukça basit bir formüle dayanır: BMI = Kilo (kg) / [Boy (m)]². Örneğin, 70 kilogram ağırlığında ve 1.75 metre boyunda bir kişinin BMI değeri 70 / (1.75 x 1.75) = 22.86 olarak hesaplanır. Imperial sistemde ise formül şöyle uygulanır: BMI = [Kilo (lbs) / Boy (inç)²] x 703. Bu hesaplama yöntemi, Dünya Sağlık Örgütü (WHO) tarafından kabul görmüş standart bir yaklaşımdır.'
      },
      {
        title: 'BMI Değerlerinin Anlamı',
        content: 'Dünya Sağlık Örgütü\'ne göre BMI değerleri şu şekilde kategorize edilir: 18.5\'un altı zayıf, 18.5-24.9 arası normal kilolu, 25-29.9 arası fazla kilolu ve 30 üzeri obez olarak değerlendirilir. Bu kategoriler, bireylerin sağlık durumlarını genel olarak değerlendirmek için kullanılır. Ancak BMI tek başına bir tanı aracı değildir ve kas kütlesi, kemik yoğunluğu gibi faktörleri dikkate almaz.'
      },
      {
        title: 'BMI\'nin Sınırlamaları ve Dikkat Edilmesi Gerekenler',
        content: 'BMI, genel bir sağlık göstergesi olmakla birlikte bazı sınırlamalara sahiptir. Sporcularda yüksek kas kütlesi nedeniyle BMI yüksek çıkabilirken, yaşlılarda kas kaybı nedeniyle düşük çıkabilir. Ayrıca BMI, vücut yağ dağılımını (karın bölgesi yağlanması gibi) ölçmez. Bu nedenle, BMI sonuçlarınızı bir sağlık uzmanıyla değerlendirmeniz ve gerekirse bel çevresi ölçümü gibi ek testler yaptırmanız önerilir.'
      },
      {
        title: 'Sağlıklı Bir BMI İçin Öneriler',
        content: 'Sağlıklı bir BMI değerini korumak veya ulaşmak için dengeli beslenme ve düzenli fiziksel aktivite esastır. Günlük kalori ihtiyacınıza uygun, protein, karbonhidrat ve sağlıklı yağlar içeren bir beslenme planı oluşturun. Haftada en az 150 dakika orta yoğunlukta egzersiz yapın. Yeterli uyku alın ve stres yönetimi tekniklerini uygulayın. Herhangi bir diyet veya egzersiz programına başlamadan önce mutlaka bir sağlık uzmanına danışın.'
      }
    ],
    outboundLinks: [
      {
        title: 'Dünya Sağlık Örgütü - BMI',
        url: 'https://www.who.int/europe/news-room/fact-sheets/item/body-mass-index---bmi',
        description: 'WHO\'nun resmi BMI bilgi sayfası'
      },
      {
        title: 'Türkiye Obezite Araştırma Derneği',
        url: 'https://www.obesite.org.tr',
        description: 'Obezite hakkında bilimsel bilgiler'
      },
      {
        title: 'Sağlık Bakanlığı - Beslenme',
        url: 'https://hsgm.saglik.gov.tr/tr/beslenme',
        description: 'Sağlıklı beslenme rehberi'
      },
      {
        title: 'Harvard Health - BMI Calculator',
        url: 'https://www.health.harvard.edu/diet-and-weight-loss/bmi-calculator',
        description: 'Harvard\'ın BMI hesaplama kaynağı'
      }
    ],
    keywords: ['vücut kitle indeksi', 'BMI hesaplama', 'ideal kilo', 'sağlıklı yaşam', 'obezite', 'kilo kontrolü', 'beslenme', 'fitness']
  },
  'loan-calculator': {
    sections: [
      {
        title: 'Kredi Hesaplama Nedir ve Neden Önemlidir?',
        content: 'Kredi hesaplama, bir kredi alırken ödeyeceğiniz aylık taksitleri, toplam faiz tutarını ve kredinin toplam maliyetini önceden görmenizi sağlayan önemli bir finansal planlama aracıdır. Doğru bir kredi hesaplaması yaparak bütçenizi daha iyi yönetebilir, farklı kredi seçeneklerini karşılaştırabilir ve mali durumunuza en uygun krediyi seçebilirsiniz. Bu araç, konut kredisi, taşıt kredisi, ihtiyaç kredisi ve işletme kredisi gibi farklı kredi türleri için kullanılabilir.'
      },
      {
        title: 'Kredi Faiz Oranları Nasıl Hesaplanır?',
        content: 'Kredi faiz oranları genellikle iki şekilde ifade edilir: nominal faiz oranı ve efektif (gerçek) faiz oranı. Nominal faiz, bankanın ilan ettiği faiz oranıdır. Efektif faiz ise BSMV, KKDF gibi ek maliyetleri de içeren gerçek maliyet oranıdır. Aylık taksit hesaplamasında genellikle anüite formülü kullanılır: Taksit = Anapara × [r(1+r)^n] / [(1+r)^n-1], burada r aylık faiz oranını, n ise vade sayısını temsil eder. Bu formül, her taksitte hem ana para hem de faiz ödemesi yapmanızı sağlar.'
      },
      {
        title: 'Kredi Türleri ve Özellikleri',
        content: 'Konut kredisi, uzun vadeli ve düşük faizli olup gayrimenkul alımı için kullanılır; ipotek karşılığı verilir. Taşıt kredisi, araç alımı için kullanılır ve araç teminat olarak gösterilir. İhtiyaç kredisi, herhangi bir amaç için kullanılabilir ancak faiz oranları genellikle daha yüksektir. İşletme kredisi, ticari faaliyetler için verilir ve özel koşullara tabidir. Her kredi türünün kendine özgü vade, faiz ve ödeme koşulları bulunmaktadır.'
      },
      {
        title: 'Kredi Başvurusu Yaparken Dikkat Edilmesi Gerekenler',
        content: 'Kredi başvurusu yapmadan önce kredi notunuzu kontrol edin, çünkü bu not faiz oranınızı doğrudan etkiler. Farklı bankalardan teklif alarak karşılaştırma yapın. Toplam maliyet hesabını (KKDF, BSMV, dosya masrafı, sigorta vb.) mutlaka inceleyin. Ödeme gücünüzü aşan kredilerden kaçının; gelirinizin en fazla %30-40\'ını kredi taksitine ayırmanız önerilir. Erken ödeme koşullarını ve ceza uygulamalarını öğrenin.'
      },
      {
        title: 'Kredi Geri Ödeme Stratejileri',
        content: 'Kredi geri ödemesinde farklı stratejiler uygulanabilir. Eşit taksitli (anüite) sistemde her ay aynı tutarı ödersiniz. Azalan taksitli sistemde başlangıçta yüksek taksitler ödenir, zamanla düşer. Balon ödemeli kredilerde vade sonunda büyük bir ödeme yapılır. Bütçenize uygun olan sistemi seçin. Mümkünse ekstra ödemeler yaparak toplam faiz yükünüzü azaltabilirsiniz. Ödemeleri zamanında yaparak kredi notunuzu koruyun.'
      }
    ],
    outboundLinks: [
      {
        title: 'BDDK - Bankacılık Düzenleme',
        url: 'https://www.bddk.org.tr',
        description: 'Bankacılık düzenleme ve denetleme kurumu'
      },
      {
        title: 'Türkiye Bankalar Birliği',
        url: 'https://www.tbb.org.tr',
        description: 'Bankacılık sektörü bilgileri'
      },
      {
        title: 'TCMB - Faiz Oranları',
        url: 'https://www.tcmb.gov.tr',
        description: 'Merkez Bankası faiz politikaları'
      },
      {
        title: 'Findeks - Kredi Notu',
        url: 'https://www.findeks.com',
        description: 'Kredi notu sorgulama platformu'
      }
    ],
    keywords: ['kredi hesaplama', 'aylık taksit', 'konut kredisi', 'taşıt kredisi', 'ihtiyaç kredisi', 'faiz oranı', 'kredi karşılaştırma', 'banka kredisi']
  },
  'currency-converter': {
    sections: [
      {
        title: 'Döviz Kuru Nedir ve Nasıl Belirlenir?',
        content: 'Döviz kuru, bir ülkenin para biriminin başka bir ülkenin para birimi cinsinden değerini ifade eder. Örneğin, 1 ABD Doları\'nın kaç Türk Lirası\'na eşit olduğunu gösterir. Döviz kurları, serbest piyasa ekonomilerinde arz ve talep dengesine göre belirlenir. Merkez bankaları, faiz oranları ve döviz rezervleri aracılığıyla kurları dolaylı olarak etkileyebilir. Kurlar anlık olarak değişebilir ve birçok ekonomik, politik ve psikolojik faktörden etkilenir.'
      },
      {
        title: 'Döviz Piyasası (Forex) Nasıl Çalışır?',
        content: 'Forex (Foreign Exchange) piyasası, günlük 6 trilyon doların üzerinde işlem hacmiyle dünyanın en büyük finansal piyasasıdır. Piyasa, haftanın 5 günü 24 saat açıktır ve farklı zaman dilimlerindeki finans merkezlerinde (Londra, New York, Tokyo, Sidney) işlem görür. Ana para birimleri (majör) olarak USD, EUR, GBP, JPY, CHF sayılır. Döviz çiftleri halinde işlem yapılır; örneğin EUR/USD, Euro\'nun Dolar karşısındaki değerini gösterir.'
      },
      {
        title: 'Döviz Kurlarını Etkileyen Faktörler',
        content: 'Döviz kurlarını birçok faktör etkiler: Faiz oranları - yüksek faiz genellikle para birimini güçlendirir. Enflasyon - düşük enflasyon para biriminin değerini korur. Ekonomik göstergeler - GDP, işsizlik, üretim verileri kurları etkiler. Politik istikrar - güvenli ülkelerin para birimleri değer kazanır. Cari işlemler dengesi - ihracat fazlası para birimini destekler. Spekülatif hareketler ve piyasa psikolojisi de kısa vadeli dalgalanmalara neden olabilir.'
      },
      {
        title: 'Döviz İşlemlerinde Dikkat Edilmesi Gerekenler',
        content: 'Döviz alım satımı yaparken alış ve satış kuru arasındaki farkı (spread) kontrol edin. Bankalar ve döviz büroları arasında kur farklılıkları olabilir, karşılaştırma yapın. Büyük tutarlarda işlem yaparken müzakere edebilirsiniz. Online bankacılık işlemlerinde genellikle daha uygun kurlar sunulur. Döviz transferlerinde SWIFT, EFT gibi yöntemlerin ücretlerini öğrenin. Yatırım amaçlı döviz işlemlerinde kur riski bulunduğunu unutmayın.'
      },
      {
        title: 'Türkiye\'de Döviz Piyasası',
        content: 'Türkiye\'de döviz kurları serbest piyasa koşullarında belirlenir. TCMB (Türkiye Cumhuriyet Merkez Bankası) gerekli gördüğünde piyasaya müdahale edebilir. Türk Lirası, gelişmekte olan piyasa para birimi olarak volatiliteye açıktır. Döviz mevduatları ve dövize endeksli mevduatlar yaygın yatırım araçlarıdır. Kur Korumalı Mevduat (KKM) gibi özel ürünler de mevcuttur. Döviz işlemlerinde BSMV gibi vergiler uygulanabilir.'
      }
    ],
    outboundLinks: [
      {
        title: 'TCMB - Döviz Kurları',
        url: 'https://www.tcmb.gov.tr/kurlar/today.html',
        description: 'Merkez Bankası günlük döviz kurları'
      },
      {
        title: 'Bloomberg - Piyasalar',
        url: 'https://www.bloomberg.com/markets/currencies',
        description: 'Küresel döviz piyasası verileri'
      },
      {
        title: 'Investing.com Türkiye',
        url: 'https://tr.investing.com/currencies',
        description: 'Canlı döviz kurları ve analizler'
      },
      {
        title: 'XE Currency Converter',
        url: 'https://www.xe.com',
        description: 'Uluslararası döviz çevirici'
      }
    ],
    keywords: ['döviz kuru', 'dolar kuru', 'euro kuru', 'sterlin', 'forex', 'döviz çevirici', 'kur hesaplama', 'para birimi']
  },
  'gold-calculator': {
    sections: [
      {
        title: 'Altın Yatırımı Nedir ve Neden Önemlidir?',
        content: 'Altın, binlerce yıldır değer saklama aracı olarak kullanılan ve güvenli liman olarak kabul edilen bir yatırım enstrümanıdır. Ekonomik belirsizlik dönemlerinde, enflasyona karşı koruma sağlaması ve fiziksel olarak saklanabilmesi nedeniyle tercih edilir. Türkiye\'de altın, hem kültürel önemi hem de yatırım aracı olarak yaygın şekilde alınıp satılmaktadır. Altın fiyatları uluslararası piyasalarda USD bazında belirlenir ve ons (31.1 gram) cinsinden işlem görür.'
      },
      {
        title: 'Altın Türleri ve Ayar Sistemleri',
        content: 'Altının saflığı ayar (karat) ile ölçülür. 24 ayar altın saf altındır (%99.9+). 22 ayar altın %91.6, 18 ayar altın %75, 14 ayar altın ise %58.5 oranında saf altın içerir. Türkiye\'de yaygın altın türleri: Gram altın (1 gram, genellikle 24 ayar), Çeyrek altın (1.75 gram), Yarım altın (3.5 gram), Tam altın (7.02 gram), Cumhuriyet altını (7.22 gram), Reşat altını (7.2 gram), Ata altını (7.02 gram). Her birinin kendine özgü işçilik ve değeri vardır.'
      },
      {
        title: 'Altın Fiyatlarını Etkileyen Faktörler',
        content: 'Altın fiyatları birçok faktörden etkilenir: ABD Doları\'nın değeri - dolar zayıfladığında altın genellikle yükselir. Faiz oranları - düşük faizler altını cazip kılar. Enflasyon beklentileri - yüksek enflasyon altına talebi artırır. Jeopolitik riskler - kriz dönemlerinde güvenli liman talebi artar. Merkez bankası alımları - özellikle gelişmekte olan ülke merkez bankaları altın biriktirmektedir. Mücevher talebi - Hindistan ve Çin\'in talepleri önemlidir.'
      },
      {
        title: 'Altın Nasıl Alınır ve Saklanır?',
        content: 'Fiziksel altın bankalardan, kuyumculardan veya yetkili kurumlardan alınabilir. Alırken faturayı muhafaza edin ve ayar belgesini kontrol edin. Fiziksel saklama için banka kasası veya ev kasası tercih edilebilir. Gram altın hesapları, fiziksel saklama derdi olmadan altın yatırımı yapmanızı sağlar. Altın fonları (ETF) ve vadeli altın kontratları da alternatif yatırım seçenekleridir. Her yöntemin kendine özgü avantajları ve maliyetleri vardır.'
      },
      {
        title: 'Altın Yatırımında Dikkat Edilmesi Gerekenler',
        content: 'Altın alırken alış-satış farkına (spread) dikkat edin, özellikle ziynet altınlarda bu fark yüksek olabilir. Yatırım amaçlı gram altın veya çeyrek altın tercih edilebilir. Sahte altın riskine karşı güvenilir satıcılardan alışveriş yapın. Uzun vadeli düşünün, çünkü altın kısa vadede volatil olabilir. Portföy çeşitlendirmesi için altının %5-15 oranında tutulması önerilir. Altın herhangi bir faiz veya temettü getirisi sağlamaz, bu nedenle fırsat maliyetini değerlendirin.'
      }
    ],
    outboundLinks: [
      {
        title: 'Borsa İstanbul - Altın Piyasası',
        url: 'https://www.borsaistanbul.com/tr/sayfa/153/kiymetli-madenler-ve-kiymetli-taslar-piyasasi',
        description: 'Resmi altın piyasası verileri'
      },
      {
        title: 'World Gold Council',
        url: 'https://www.gold.org',
        description: 'Küresel altın piyasası bilgileri'
      },
      {
        title: 'Kapalıçarşı Altın Fiyatları',
        url: 'https://www.kapalicarsi.com.tr',
        description: 'Güncel altın fiyatları'
      },
      {
        title: 'Kitco - Gold Charts',
        url: 'https://www.kitco.com/charts/livegold.html',
        description: 'Uluslararası altın grafikleri'
      }
    ],
    keywords: ['altın fiyatları', 'gram altın', 'çeyrek altın', 'cumhuriyet altını', '24 ayar altın', 'altın yatırımı', 'altın hesaplama', 'ons altın']
  }
}
