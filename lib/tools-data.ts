export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  href: string;
  keywords: string[];
}

export const tools: Tool[] = [
  // Finans & Matematik
  {
    id: 'percentage-calculator',
    title: 'Yüzde Hesaplayıcı',
    description: 'X sayısının %Y\'si, yüzde oranı ve artış/azalış hesaplamaları',
    category: 'Finans & Matematik',
    icon: 'Calculator',
    href: '/tools/percentage-calculator',
    keywords: ['yüzde', 'percentage', 'hesaplama', 'oran']
  },
  {
    id: 'change-rate-calculator',
    title: 'Değişim Oranı Hesaplayıcı',
    description: 'Eski ve yeni değer arasındaki artış/azalış oranını hesaplayın',
    category: 'Finans & Matematik',
    icon: 'TrendingUp',
    href: '/tools/change-rate-calculator',
    keywords: ['değişim', 'change', 'rate', 'artış', 'azalış', 'oran']
  },
  {
    id: 'simple-interest',
    title: 'Basit Faiz Hesaplayıcı',
    description: 'Anapara, faiz oranı ve süreye göre basit faiz hesaplama',
    category: 'Finans & Matematik',
    icon: 'Percent',
    href: '/tools/simple-interest',
    keywords: ['basit faiz', 'simple interest', 'faiz', 'interest', 'anapara']
  },
  {
    id: 'compound-interest',
    title: 'Bileşik Faiz Hesaplayıcı',
    description: 'Bileşik faiz hesaplama ve yatırım getiri analizi',
    category: 'Finans & Matematik',
    icon: 'PiggyBank',
    href: '/tools/compound-interest',
    keywords: ['bileşik faiz', 'compound interest', 'yatırım', 'investment']
  },
  {
    id: 'gold-calculator',
    title: 'Altın/Gümüş Hesaplama',
    description: 'Güncel altın ve gümüş fiyatları, alış-satış hesaplama',
    category: 'Finans & Matematik',
    icon: 'Coins',
    href: '/tools/gold-calculator',
    keywords: ['altın', 'gümüş', 'gold', 'silver', 'gram', 'çeyrek', 'yarım', 'tam', 'cumhuriyet', 'ata', 'reşat', 'ons', 'fiyat', 'alış', 'satış']
  },
  {
    id: 'currency-converter',
    title: 'Güncel Döviz Kurları',
    description: 'Güncel döviz kurları ve dönüşüm hesaplamaları',
    category: 'Finans & Matematik',
    icon: 'Banknote',
    href: '/tools/currency-converter',
    keywords: ['döviz', 'currency', 'exchange', 'kur', 'para']
  },
  {
    id: 'savings-calculator',
    title: 'Birikim Hesaplama',
    description: 'Aylık, yıllık veya tek seferlik birikim projeksiyonları',
    category: 'Finans & Matematik',
    icon: 'TrendingUp',
    href: '/tools/savings-calculator',
    keywords: ['birikim', 'savings', 'yatırım', 'tasarruf']
  },
  {
    id: 'loan-calculator',
    title: 'Kredi Hesaplama',
    description: 'Konut, taşıt ve ihtiyaç kredisi hesaplamaları',
    category: 'Finans & Matematik',
    icon: 'Landmark',
    href: '/tools/loan-calculator',
    keywords: ['kredi', 'loan', 'mortgage', 'ödeme', 'faiz']
  },
  {
    id: 'brut-net-maas-hesaplayici',
    title: 'Brüt – Net Maaş Hesaplama',
    description: '2025 Türkiye vergi dilimlerine göre brüt-net maaş hesaplama, SGK, AGI ve kesinti detayları',
    category: 'Finans & Matematik',
    icon: 'Wallet',
    href: '/tools/brut-net-maas-hesaplayici',
    keywords: ['brüt maaş', 'net maaş', 'maaş hesaplama', 'vergi', 'sgk', 'agi', 'gelir vergisi', 'damga vergisi', 'salary calculator']
  },
  {
    id: 'investment-calculator',
    title: 'Yatırım Getiri Hesaplama',
    description: 'Hisse, tahvil ve fon getiri projeksiyonları',
    category: 'Finans & Matematik',
    icon: 'TrendingUp',
    href: '/tools/investment-calculator',
    keywords: ['yatırım', 'investment', 'getiri', 'return', 'hisse']
  },
  {
    id: 'commission-calculator',
    title: 'Komisyon Hesaplama',
    description: 'Hizmet komisyon oranları ve tutarları',
    category: 'Finans & Matematik',
    icon: 'Percent',
    href: '/tools/commission-calculator',
    keywords: ['komisyon', 'commission', 'ücret', 'fee']
  },
  {
    id: 'expense-splitter',
    title: 'Harcama Paylaşım',
    description: 'Grup harcamalarını adil paylaştırın, kim kime ne kadar borçlu hesaplayın',
    category: 'Finans & Matematik',
    icon: 'Users',
    href: '/tools/expense-splitter',
    keywords: ['harcama paylaşımı', 'expense splitter', 'grup harcama', 'borç hesaplama', 'masraf bölme', 'splitwise', 'kim kime borçlu', 'ortak hesap', 'tatil harcaması']
  },
  {
    id: 'zakat-calculator',
    title: 'Zekat Hesaplama',
    description: 'İslami yükümlülük olan zekât miktarını hesaplayın',
    category: 'Finans & Matematik',
    icon: 'DollarSign',
    href: '/tools/zakat-calculator',
    keywords: ['zekat', 'zakat', 'nisap', 'zekat oranı', 'İslami finans', 'zekat hesaplama', 'altın nisap', 'gümüş nisap', 'fitre', 'sadaka']
  },
  {
    id: 'rent-increase-calculator',
    title: 'Kira Zammı Hesaplama',
    description: 'Kira sözleşmesi yenileme döneminde yasal artış hesaplama',
    category: 'Finans & Matematik',
    icon: 'TrendingUp',
    href: '/tools/rent-increase-calculator',
    keywords: ['kira zammı', 'kira artışı', 'TÜFE', 'kira hesaplama', 'kira zam oranı', 'yasal tavan', 'kiracı hakları', 'kira sözleşmesi', 'emlak']
  },
  {
    id: 'is-degisikligi-hesaplayici',
    title: 'İş Değişikliği Maaş ve Tazminat Hesaplama',
    description: 'İş değişikliği sonrası net maaş, kümülatif vergi, kıdem-ihbar tazminatı ve yıllık izin ücreti hesaplama',
    category: 'Finans & Matematik',
    icon: 'Briefcase',
    href: '/tools/is-degisikligi-hesaplayici',
    keywords: ['iş değişikliği', 'kıdem tazminatı', 'ihbar tazminatı', 'kümülatif vergi', 'net maaş hesaplama', 'maaş karşılaştırma', 'yıllık izin ücreti', 'tazminat hesaplama', 'vergi dilimi', 'SGK kesintisi']
  },
  {
    id: 'kredi-yeniden-yapilandirma',
    title: 'Kredi Yeniden Yapılandırma & Erken Kapama',
    description: 'Mevcut kredi borcunuzu yeniden yapılandırın, erken kapama maliyetini hesaplayın, en avantajlı ödeme planını bulun',
    category: 'Finans & Matematik',
    icon: 'RefreshCw',
    href: '/tools/kredi-yeniden-yapilandirma',
    keywords: ['kredi yeniden yapılandırma', 'erken kapama', 'refinansman', 'kısmi ödeme', 'vade kısaltma', 'taksit düşürme', 'kredi faiz', 'konut kredisi', 'ihtiyaç kredisi', 'amortizasyon']
  },
  {
    id: 'pdf-merge',
    title: 'PDF Birleştirme',
    description: 'Birden fazla PDF dosyasını tek bir PDF\'de birleştirin',
    category: 'PDF Araçları',
    icon: 'FileText',
    href: '/tools/pdf-merge',
    keywords: ['pdf birleştirme', 'pdf merge', 'pdf combine', 'pdf birleştir', 'pdf dosya birleştir', 'ücretsiz pdf birleştirme', 'online pdf merge', 'pdf dosyaları birleştir']
  },
  {
    id: 'pdf-split',
    title: 'PDF Bölme',
    description: 'PDF dosyalarını sayfa aralığı veya belirli sayfalara göre bölün',
    category: 'PDF Araçları',
    icon: 'Scissors',
    href: '/tools/pdf-split',
    keywords: ['pdf bölme', 'pdf split', 'pdf ayır', 'pdf sayfa çıkar', 'pdf böl', 'ücretsiz pdf bölme', 'online pdf split']
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'PDF sayfalarını PNG veya JPEG formatında görüntülere dönüştürün',
    category: 'PDF Araçları',
    icon: 'Image',
    href: '/tools/pdf-to-image',
    keywords: ['pdf to image', 'pdf png', 'pdf jpeg', 'pdf görsel', 'pdf dönüştür', 'pdf to jpg', 'ücretsiz pdf dönüştürücü']
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Görüntüleri PDF formatına dönüştürün ve birleştirin',
    category: 'PDF Araçları',
    icon: 'FileImage',
    href: '/tools/image-to-pdf',
    keywords: ['image to pdf', 'resim pdf', 'jpg to pdf', 'png to pdf', 'görsel pdf', 'fotoğraf pdf', 'ücretsiz image to pdf']
  },
  {
    id: 'pdf-compress',
    title: 'PDF Sıkıştırma',
    description: 'PDF dosyalarınızı boyutlarını küçülterek optimize edin',
    category: 'PDF Araçları',
    icon: 'Minimize2',
    href: '/tools/pdf-compress',
    keywords: ['pdf sıkıştırma', 'pdf compress', 'pdf boyut küçültme', 'pdf optimize', 'ücretsiz pdf sıkıştırma', 'online pdf compress', 'pdf reducer']
  },
  {
    id: 'pdf-edit',
    title: 'PDF Düzenleme',
    description: 'PDF dosyalarınıza metin, şekil ve açıklama ekleyin',
    category: 'PDF Araçları',
    icon: 'Edit',
    href: '/tools/pdf-edit',
    keywords: ['pdf düzenleme', 'pdf edit', 'pdf metin ekleme', 'pdf annotation', 'ücretsiz pdf düzenleyici', 'online pdf editor']
  },
  {
    id: 'profit-calculator',
    title: 'Kâr Hesaplama',
    description: 'Satış fiyatı, maliyet ve kâr marjı hesaplamaları',
    category: 'Finans & Matematik',
    icon: 'TrendingUp',
    href: '/tools/profit-calculator',
    keywords: ['kâr', 'profit', 'kar', 'margin', 'gelir']
  },
  {
    id: 'loss-calculator',
    title: 'Zarar Hesaplama',
    description: 'Zarar analizi ve maliyet hesaplamaları',
    category: 'Finans & Matematik',
    icon: 'BadgeMinus',
    href: '/tools/loss-calculator',
    keywords: ['zarar', 'loss', 'ziyan', 'kayıp']
  },
  {
    id: 'raise-calculator',
    title: 'Zam Hesaplama',
    description: 'Yüzdelik zam hesaplamaları ve maaş artışı',
    category: 'Finans & Matematik',
    icon: 'ArrowUp',
    href: '/tools/raise-calculator',
    keywords: ['zam', 'raise', 'artış', 'maaş', 'salary']
  },
  {
    id: 'inflation-calculator',
    title: 'Enflasyon Hesaplama',
    description: 'Dönemsel enflasyon oranları ve analizi',
    category: 'Finans & Matematik',
    icon: 'TrendingUp',
    href: '/tools/inflation-calculator',
    keywords: ['enflasyon', 'inflation', 'fiyat', 'artış']
  },
  {
    id: 'price-index-calculator',
    title: 'Fiyat Endeksi Hesaplama',
    description: 'Ürün ve hizmet fiyat endeksi analizi',
    category: 'Finans & Matematik',
    icon: 'BarChart',
    href: '/tools/price-index-calculator',
    keywords: ['fiyat', 'price', 'index', 'endeks']
  },
  {
    id: 'average-cost-calculator',
    title: 'Ortalama Maliyet Hesaplama',
    description: 'Ürün ve hizmet ortalama maliyet analizi',
    category: 'Finans & Matematik',
    icon: 'Calculator',
    href: '/tools/average-cost-calculator',
    keywords: ['ortalama', 'average', 'maliyet', 'cost']
  },
  {
    id: 'ratio-calculator',
    title: 'Oran Hesaplama',
    description: 'İki veya daha fazla değer arasında oran hesaplama',
    category: 'Finans & Matematik',
    icon: 'Percent',
    href: '/tools/ratio-calculator',
    keywords: ['oran', 'ratio', 'proportion', 'orantı']
  },
  {
    id: 'random-number-generator',
    title: 'Rastgele Sayı Üreteci',
    description: 'Belirli aralıkta rastgele sayı oluşturma',
    category: 'Finans & Matematik',
    icon: 'Hash',
    href: '/tools/random-number-generator',
    keywords: ['rastgele', 'random', 'sayı', 'number', 'generator']
  },
  {
    id: 'standard-deviation-calculator',
    title: 'Standart Sapma Hesaplama',
    description: 'Veri seti standart sapma ve varyans analizi',
    category: 'Finans & Matematik',
    icon: 'BarChart',
    href: '/tools/standard-deviation-calculator',
    keywords: ['standart sapma', 'standard deviation', 'istatistik', 'statistics']
  },
  {
    id: 'base-converter',
    title: 'Taban Dönüşümü',
    description: 'İkili, ondalık, onaltılık sayı sistemleri arası dönüşüm',
    category: 'Finans & Matematik',
    icon: 'Binary',
    href: '/tools/base-converter',
    keywords: ['taban', 'base', 'binary', 'hex', 'decimal']
  },
  
  // Dönüştürücüler
  {
    id: 'length-converter',
    title: 'Uzunluk Dönüştürücü',
    description: 'Metre, kilometre, mil, feet ve daha fazlası',
    category: 'Dönüştürücüler',
    icon: 'Ruler',
    href: '/tools/length-converter',
    keywords: ['uzunluk', 'length', 'metre', 'kilometer', 'mil', 'feet']
  },
  {
    id: 'weight-converter',
    title: 'Ağırlık Dönüştürücü',
    description: 'Kilogram, gram, pound ve ons dönüşümleri',
    category: 'Dönüştürücüler',
    icon: 'Weight',
    href: '/tools/weight-converter',
    keywords: ['ağırlık', 'weight', 'kilogram', 'gram', 'pound']
  },
  {
    id: 'temperature-converter',
    title: 'Sıcaklık Dönüştürücü',
    description: 'Celsius, Fahrenheit ve Kelvin dönüşümleri',
    category: 'Dönüştürücüler',
    icon: 'Thermometer',
    href: '/tools/temperature-converter',
    keywords: ['sıcaklık', 'temperature', 'celsius', 'fahrenheit', 'kelvin']
  },
  {
    id: 'timezone-converter',
    title: 'Saat Dilimi Dönüştürücü',
    description: 'Dünyanın farklı şehirlerindeki saatleri karşılaştırın',
    category: 'Dönüştürücüler',
    icon: 'Clock',
    href: '/tools/timezone-converter',
    keywords: ['saat', 'timezone', 'zaman', 'time', 'dilim']
  },
  {
    id: 'tarif-hesaplayici',
    title: 'Tarif Hesaplayıcı',
    description: 'Tariflerdeki malzeme miktarlarını kişi sayısına göre ayarlayın ve ölçü birimlerini dönüştürün',
    category: 'Dönüştürücüler',
    icon: 'ChefHat',
    href: '/tools/tarif-hesaplayici',
    keywords: ['tarif', 'recipe', 'malzeme', 'kişi sayısı', 'ölçü', 'bardak', 'kaşık', 'gram', 'mutfak', 'yemek']
  },

  // Sağlık & Yaşam
  {
    id: 'bmi-calculator',
    title: 'Vücut Kitle İndeksi (BMI) Hesaplama',
    description: 'Vücut kitle indeksi ve sağlık önerileri',
    category: 'Sağlık & Yaşam',
    icon: 'Heart',
    href: '/tools/bmi-calculator',
    keywords: ['bmi', 'vücut', 'kitle', 'indeks', 'kilo']
  },
  {
    id: 'ideal-weight-calculator',
    title: 'İdeal Kilo Hesaplama',
    description: 'Yaş, cinsiyet ve boya göre ideal kilo aralığı',
    category: 'Sağlık & Yaşam',
    icon: 'Activity',
    href: '/tools/ideal-weight-calculator',
    keywords: ['ideal kilo', 'weight', 'sağlık', 'health']
  },
  {
    id: 'target-weight-calculator',
    title: 'Hedef Kilo Hesaplama',
    description: 'Kilo verme/alma planları ve kalori ihtiyacı',
    category: 'Sağlık & Yaşam',
    icon: 'Target',
    href: '/tools/target-weight-calculator',
    keywords: ['hedef kilo', 'target weight', 'diyet', 'diet']
  },
  {
    id: 'calorie-calculator',
    title: 'Günlük Kalori İhtiyacı Hesaplama',
    description: 'Aktivite seviyesine göre kalori hesaplama',
    category: 'Sağlık & Yaşam',
    icon: 'Flame',
    href: '/tools/calorie-calculator',
    keywords: ['kalori', 'calorie', 'günlük', 'daily', 'beslenme']
  },
  {
    id: 'body-fat-calculator',
    title: 'Vücut Yağ Oranı',
    description: 'Vücut yağ yüzdesi ve sağlık analizi',
    category: 'Sağlık & Yaşam',
    icon: 'Activity',
    href: '/tools/body-fat-calculator',
    keywords: ['vücut yağ', 'body fat', 'percentage', 'oran']
  },
  {
    id: 'pregnancy-calculator',
    title: 'Gebelik Haftası Hesaplama',
    description: 'Tahmini doğum tarihi ve gebelik haftası',
    category: 'Sağlık & Yaşam',
    icon: 'Baby',
    href: '/tools/pregnancy-calculator',
    keywords: ['gebelik', 'pregnancy', 'doğum', 'birth', 'hamilelik']
  },
  {
    id: 'baby-weight-calculator',
    title: 'Bebek Kilosu Hesaplama',
    description: 'Yaş ve cinsiyete göre ideal bebek kilosu',
    category: 'Sağlık & Yaşam',
    icon: 'Baby',
    href: '/tools/baby-weight-calculator',
    keywords: ['bebek', 'baby', 'kilo', 'weight', 'gelişim']
  },
  {
    id: 'baby-height-calculator',
    title: 'Bebek Boyu Hesaplama',
    description: 'Yaş ve cinsiyete göre ideal bebek boyu',
    category: 'Sağlık & Yaşam',
    icon: 'Baby',
    href: '/tools/baby-height-calculator',
    keywords: ['bebek', 'baby', 'boy', 'height', 'uzunluk']
  },
  {
    id: 'period-calculator',
    title: 'Adet Günü Hesaplama',
    description: 'Adet döngüsü takibi ve tahmin',
    category: 'Sağlık & Yaşam',
    icon: 'Calendar',
    href: '/tools/period-calculator',
    keywords: ['adet', 'period', 'menstruation', 'döngü', 'cycle']
  },
  {
    id: 'smoking-cost-calculator',
    title: 'Sigara Maliyeti Hesaplama',
    description: 'Yıllık sigara harcaması ve sağlık analizi',
    category: 'Sağlık & Yaşam',
    icon: 'Cigarette',
    href: '/tools/smoking-cost-calculator',
    keywords: ['sigara', 'smoking', 'maliyet', 'cost', 'sağlık']
  },
  
  // Görsel & Tasarım
  {
    id: 'aspect-ratio',
    title: 'Aspect Ratio Hesaplama',
    description: 'Video ve görsel için aspect ratio hesaplama ve görselleştirme',
    category: 'Görsel & Tasarım',
    icon: 'Expand',
    href: '/tools/aspect-ratio',
    keywords: ['aspect ratio', 'oran', 'görsel', 'video', 'tasarım', 'resolution']
  },
  
  // Metin & String
  {
    id: 'case-converter',
    title: 'Metin Dönüştürücü (Case Converter)',
    description: 'Büyük harf, küçük harf, title case ve daha fazlası',
    category: 'Metin & String',
    icon: 'CaseSensitive',
    href: '/tools/case-converter',
    keywords: ['case', 'metin', 'text', 'büyük harf', 'küçük harf', 'uppercase', 'lowercase']
  },
  {
    id: 'morse-translator',
    title: 'Morse Kod Çevirici',
    description: 'Metin ve Morse kodu arasında çeviri yapın',
    category: 'Metin & String',
    icon: 'Radio',
    href: '/tools/morse-translator',
    keywords: ['morse', 'morse code', 'çeviri', 'translator']
  },
  {
    id: 'anagram-generator',
    title: 'Anagram Oluşturucu',
    description: 'Kelimelerin farklı kombinasyonlarını oluşturun',
    category: 'Metin & String',
    icon: 'Shuffle',
    href: '/tools/anagram-generator',
    keywords: ['anagram', 'kelime', 'word', 'kombinasyon']
  },
  {
    id: 'username-generator',
    title: 'Username Generator',
    description: 'Yaratıcı ve benzersiz kullanıcı adları oluşturun',
    category: 'Metin & String',
    icon: 'AtSign',
    href: '/tools/username-generator',
    keywords: ['username', 'kullanıcı adı', 'generator', 'oluşturucu']
  },
  
  // Zaman & Verimlilik
  {
    id: 'focus-timer',
    title: 'Odak Zamanlayıcı',
    description: 'Pomodoro timer ile verimliliğinizi artırın',
    category: 'Zaman & Verimlilik',
    icon: 'Timer',
    href: '/tools/focus-timer',
    keywords: ['odak', 'focus', 'pomodoro', 'timer', 'zaman', 'verimlilik']
  },
  {
    id: 'age-calculator',
    title: 'Yaş Hesaplama',
    description: 'Doğum tarihinden yaş, burç ve gün sayısı',
    category: 'Zaman & Verimlilik',
    icon: 'Cake',
    href: '/tools/age-calculator',
    keywords: ['yaş', 'age', 'doğum', 'birthday', 'burç']
  },
  {
    id: 'date-calculator',
    title: 'Tarih Hesaplama',
    description: 'Tarih aralığı, gün, hafta, ay hesaplama',
    category: 'Zaman & Verimlilik',
    icon: 'Calendar',
    href: '/tools/date-calculator',
    keywords: ['tarih', 'date', 'gün', 'day', 'hesaplama']
  },
  {
    id: 'business-days-calculator',
    title: 'İş Günü Hesaplama',
    description: 'Tatiller hariç iş günü sayısı',
    category: 'Zaman & Verimlilik',
    icon: 'Briefcase',
    href: '/tools/business-days-calculator',
    keywords: ['iş günü', 'business days', 'working days', 'tatil']
  },
  {
    id: 'hijri-calendar',
    title: 'Hicri Takvim',
    description: 'Miladi-Hicri tarih dönüşümü',
    category: 'Zaman & Verimlilik',
    icon: 'CalendarDays',
    href: '/tools/hijri-calendar',
    keywords: ['hicri', 'hijri', 'takvim', 'calendar', 'miladi']
  },
  {
    id: 'time-difference-calculator',
    title: 'Saat Farkı Hesaplama',
    description: 'Şehirler arası saat dilimi farkı',
    category: 'Zaman & Verimlilik',
    icon: 'Clock',
    href: '/tools/time-difference-calculator',
    keywords: ['saat farkı', 'time difference', 'timezone', 'zaman dilimi']
  },
  {
    id: 'processing-time-calculator',
    title: 'İşlem Süresi Hesaplama',
    description: 'Farklı hızlarda işlem süresi karşılaştırması',
    category: 'Zaman & Verimlilik',
    icon: 'Clock',
    href: '/tools/processing-time-calculator',
    keywords: ['işlem', 'processing', 'süre', 'time', 'hız']
  },

  // Çalışma & İş
  {
    id: 'maternity-leave-calculator',
    title: 'Doğum İzni Hesaplama',
    description: 'Çalışma süresine göre doğum izni',
    category: 'Çalışma & İş',
    icon: 'Baby',
    href: '/tools/maternity-leave-calculator',
    keywords: ['doğum izni', 'maternity leave', 'izin', 'çalışma']
  },
  {
    id: 'severance-pay-calculator',
    title: 'Kıdem Tazminatı Hesaplama',
    description: 'Çalışma süresi ve maaşa göre kıdem tazminatı',
    category: 'Çalışma & İş',
    icon: 'DollarSign',
    href: '/tools/severance-pay-calculator',
    keywords: ['kıdem', 'severance', 'tazminat', 'maaş']
  },
  {
    id: 'annual-leave-pay-calculator',
    title: 'Yıllık İzin Ücreti',
    description: 'Kullanılmayan yıllık izin ücreti hesaplama',
    category: 'Çalışma & İş',
    icon: 'Banknote',
    href: '/tools/annual-leave-pay-calculator',
    keywords: ['yıllık izin', 'annual leave', 'ücret', 'pay']
  },
  {
    id: 'marriage-leave-calculator',
    title: 'Evlenme İzni Hesaplama',
    description: 'Evlenme izni süresi hesaplama',
    category: 'Çalışma & İş',
    icon: 'Heart',
    href: '/tools/marriage-leave-calculator',
    keywords: ['evlenme', 'marriage', 'izin', 'leave']
  },
  {
    id: 'annual-leave-calculator',
    title: 'Yıllık İzin Hesaplama',
    description: 'Çalışma süresine göre yıllık izin hakları',
    category: 'Çalışma & İş',
    icon: 'Calendar',
    href: '/tools/annual-leave-calculator',
    keywords: ['yıllık izin', 'annual leave', 'vacation', 'tatil']
  },
  
  // Şans & Oyun
  {
    id: 'dice-roller',
    title: 'Zar Atma',
    description: '3D animasyonlu sanal zar atma aracı',
    category: 'Şans & Oyun',
    icon: 'Dice5',
    href: '/tools/randomizer?tool=dice',
    keywords: ['zar', 'dice', 'roll', 'rastgele', 'random']
  },
  {
    id: 'coin-flip',
    title: 'Yazı Tura',
    description: '3D animasyonlu madeni para atma',
    category: 'Şans & Oyun',
    icon: 'Coins',
    href: '/tools/coin-flip',
    keywords: ['yazı tura', 'coin flip', 'heads', 'tails', 'madeni para']
  },
  {
    id: 'card-picker',
    title: 'Kart Çekme',
    description: '3D animasyonlu iskambil kartı çekme',
    category: 'Şans & Oyun',
    icon: 'Spade',
    href: '/tools/card-picker',
    keywords: ['kart', 'card', 'iskambil', 'çekme', 'pick']
  },
  {
    id: 'wheel-spinner',
    title: 'Çarkı Çevirme',
    description: 'Özelleştirilebilir şans çarkı',
    category: 'Şans & Oyun',
    icon: 'Disc',
    href: '/tools/wheel-spinner',
    keywords: ['çarkıfelek', 'wheel', 'spin', 'şans', 'luck']
  },

  // Eğitim & Sınav
  {
    id: 'retirement-calculator',
    title: 'Emekliliğe Kalan Süre Hesaplama',
    description: '4A, 4B, 4C sigortalılar için emeklilik süre hesaplama',
    category: 'Eğitim & Sınav',
    icon: 'Calendar',
    href: '/tools/retirement-calculator',
    keywords: ['emeklilik', 'retirement', 'SGK', '4A', '4B', '4C', 'prim günü', 'yaş', 'sigorta', 'emekli olma']
  },
  {
    id: 'gpa-calculator',
    title: 'GANO / Dönem Notu Hesaplama',
    description: 'Üniversite genel not ortalaması ve dönem not ortalaması hesaplama',
    category: 'Eğitim & Sınav',
    icon: 'GraduationCap',
    href: '/tools/gpa-calculator',
    keywords: ['GANO', 'DNO', 'not ortalaması', 'GPA', 'üniversite', '4\'lük sistem', 'AA', 'BA', 'BB', 'ortalama', 'diploma notu']
  },
  {
    id: 'yks-calculator',
    title: 'YKS Net Hesaplama',
    description: 'TYT ve AYT net hesaplayıcı - Sayısal, Eşit Ağırlık, Sözel',
    category: 'Eğitim & Sınav',
    icon: 'Target',
    href: '/tools/yks-calculator',
    keywords: ['YKS', 'TYT', 'AYT', 'net hesaplama', 'ÖSYM', 'üniversite sınavı', 'sayısal', 'eşit ağırlık', 'sözel', 'sınav neti']
  },
  {
    id: 'kpss-calculator',
    title: 'KPSS Net Hesaplama',
    description: 'Genel Yetenek ve Genel Kültür net hesaplayıcı',
    category: 'Eğitim & Sınav',
    icon: 'Award',
    href: '/tools/kpss-calculator',
    keywords: ['KPSS', 'net hesaplama', 'genel yetenek', 'genel kültür', 'kamu personeli', 'ÖSYM', 'sınav neti', 'GY', 'GK']
  },

  // Kod Araçları
  {
    id: 'json-beautifier',
    title: 'JSON Beautifier',
    description: 'JSON verilerinizi güzelleştirin, doğrulayın ve düzenleyin',
    category: 'Kod Araçları',
    icon: 'FileJson',
    href: '/tools/json-beautifier',
    keywords: ['json', 'beautifier', 'formatter', 'validator', 'prettify', 'minify', 'json düzenleme', 'güzelleştirici']
  },
  {
    id: 'xml-beautifier',
    title: 'XML Beautifier',
    description: 'XML verilerinizi güzelleştirin, doğrulayın ve düzenleyin',
    category: 'Kod Araçları',
    icon: 'FileCode',
    href: '/tools/xml-beautifier',
    keywords: ['xml', 'beautifier', 'formatter', 'validator', 'prettify', 'minify', 'xml düzenleme', 'güzelleştirici']
  },
  {
    id: 'csv-beautifier',
    title: 'CSV Beautifier',
    description: 'CSV verilerinizi görüntüleyin, düzenleyin ve dışa aktarın',
    category: 'Kod Araçları',
    icon: 'FileSpreadsheet',
    href: '/tools/csv-beautifier',
    keywords: ['csv', 'beautifier', 'viewer', 'formatter', 'tablo', 'excel', 'csv düzenleme', 'veri']
  },
  {
    id: 'html-beautifier',
    title: 'HTML Beautifier',
    description: 'HTML verilerinizi güzelleştirin, doğrulayın ve önizleyin',
    category: 'Kod Araçları',
    icon: 'FileCode2',
    href: '/tools/html-beautifier',
    keywords: ['html', 'beautifier', 'formatter', 'validator', 'prettify', 'minify', 'html düzenleme', 'web']
  },
  {
    id: 'css-beautifier',
    title: 'CSS Beautifier',
    description: 'CSS verilerinizi güzelleştirin, doğrulayın ve düzenleyin',
    category: 'Kod Araçları',
    icon: 'Palette',
    href: '/tools/css-beautifier',
    keywords: ['css', 'beautifier', 'formatter', 'validator', 'prettify', 'minify', 'css düzenleme', 'stil']
  },

  // Emlak
  {
    id: 'tapu-harci-hesaplama',
    title: 'Tapu Harcı Hesaplama',
    description: '2024 güncel oranlarıyla tapu harcı, döner sermaye ve tescil ücretleri hesaplama',
    category: 'Emlak',
    icon: 'Home',
    href: '/tools/tapu-harci-hesaplama',
    keywords: ['tapu harcı', 'tapu masrafı', 'döner sermaye', 'tescil ücreti', 'emlak', 'konut', 'gayrimenkul', 'alım satım']
  },
  {
    id: 'rayic-bedel-hesaplama',
    title: 'Rayiç Bedel Hesaplama',
    description: 'Gayrimenkul rayiç bedeli ve m² birim fiyatı sorgulama',
    category: 'Emlak',
    icon: 'MapPin',
    href: '/tools/rayic-bedel-hesaplama',
    keywords: ['rayiç bedel', 'emlak değeri', 'arsa değeri', 'metrekare fiyatı', 'belediye rayici', 'gayrimenkul değerleme']
  },
  {
    id: 'gayrimenkul-gelir-vergisi',
    title: 'Gayrimenkul Gelir Vergisi',
    description: 'Gayrimenkul satışından doğan gelir vergisi ve 5 yıl istisnası hesaplama',
    category: 'Emlak',
    icon: 'Receipt',
    href: '/tools/gayrimenkul-gelir-vergisi',
    keywords: ['gayrimenkul vergisi', 'emlak satış vergisi', 'değer artış kazancı', '5 yıl istisnası', 'konut satış vergisi', 'ÜFE']
  },

  // Moda & Stil
  {
    id: 'akilli-beden-secici',
    title: 'Akıllı Beden Ölçü Seçici',
    description: 'Vücut ölçülerinize göre farklı markalarda doğru bedeninizi bulun',
    category: 'Moda & Stil',
    icon: 'Shirt',
    href: '/tools/akilli-beden-secici',
    keywords: ['beden hesaplama', 'beden seçici', 'giysi bedeni', 'marka beden tablosu', 'Zara beden', 'H&M beden', 'vücut ölçüsü']
  },

  // Astroloji
  {
    id: 'burc-uyumu',
    title: 'Burç Uyumu Hesaplama',
    description: 'İki burç arasındaki aşk, dostluk ve iş uyumunu hesaplayın',
    category: 'Astroloji',
    icon: 'Heart',
    href: '/tools/burc-uyumu',
    keywords: ['burç uyumu', 'astroloji', 'zodyak uyumu', 'aşk uyumu', 'burç eşleşmesi']
  },
  {
    id: 'gunluk-burc-yorumlari',
    title: 'Günlük Burç Yorumları',
    description: '12 burç için günlük astroloji yorumları ve tahminler',
    category: 'Astroloji',
    icon: 'Sun',
    href: '/tools/gunluk-burc-yorumlari',
    keywords: ['günlük burç', 'burç yorumu', 'astroloji', 'günlük fal', 'burç falı']
  },
  {
    id: 'burc-ozellikleri',
    title: 'Burç Özellikleri',
    description: '12 burcun karakter özellikleri, uyumlu burçlar ve şans bilgileri',
    category: 'Astroloji',
    icon: 'Stars',
    href: '/tools/burc-ozellikleri',
    keywords: ['burç özellikleri', 'burç karakteri', 'zodyak', 'burç analizi']
  },
  {
    id: 'yukselen-burc-hesaplayici',
    title: 'Yükselen Burç Hesaplayıcı',
    description: 'Doğum tarihi, saati ve yerine göre yükselen burcunuzu hesaplayın',
    category: 'Astroloji',
    icon: 'Sunrise',
    href: '/tools/yukselen-burc-hesaplayici',
    keywords: ['yükselen burç', 'ascendant', 'astroloji', 'doğum haritası']
  },
  {
    id: 'yildiz-haritasi',
    title: 'Yıldız Haritası Oluşturma',
    description: 'Doğum tarihi, saati ve yerine göre kişisel natal chart ve astrolojik analizler',
    category: 'Astroloji',
    icon: 'Sparkles',
    href: '/tools/yildiz-haritasi',
    keywords: ['yıldız haritası', 'natal chart', 'doğum haritası', 'astroloji', 'gezegen konumları', 'burç analizi']
  },
  {
    id: 'ay-burcu-hesaplayici',
    title: 'Ay Burcu Hesaplama',
    description: 'Doğum tarihi, saati ve yerine göre ay burcunuzu ve duygusal özelliklerinizi keşfedin',
    category: 'Astroloji',
    icon: 'Moon',
    href: '/tools/ay-burcu-hesaplayici',
    keywords: ['ay burcu', 'moon sign', 'astroloji', 'duygusal karakter', 'ay fazı', 'natal chart']
  },
  {
    id: 'astroloji-takvimi',
    title: 'Astroloji Takvimi',
    description: '2024 yılı için gezegen retroları, tutulmalar, ay fazları ve önemli astrolojik olaylar',
    category: 'Astroloji',
    icon: 'Calendar',
    href: '/tools/astroloji-takvimi',
    keywords: ['astroloji takvimi', 'retro', 'tutulma', 'ay fazları', 'gezegen hareketleri', 'astrolojik olaylar']
  },
  {
    id: 'burc-onerileri',
    title: 'Burçlara Göre Öneriler',
    description: 'Her burç için sağlık, beslenme, kariyer, finans, seyahat ve yaşam önerileri',
    category: 'Astroloji',
    icon: 'Sparkles',
    href: '/tools/burc-onerileri',
    keywords: ['burç önerileri', 'sağlık', 'beslenme', 'kariyer', 'finans', 'seyahat', 'kişisel gelişim', 'hediye önerileri']
  },

  // Aile & Bebek
  {
    id: 'bebek-gelisim-hesaplayici',
    title: 'Bebek Gelişim Hesaplayıcı',
    description: 'WHO büyüme standartlarına göre boy, kilo ve baş çevresi persentil hesaplama (0-5 yaş)',
    category: 'Aile & Bebek',
    icon: 'Baby',
    href: '/tools/bebek-gelisim-hesaplayici',
    keywords: ['bebek', 'gelişim', 'persentil', 'boy', 'kilo', 'baş çevresi', 'WHO', 'büyüme', 'z-score', 'bebek takip']
  }
];

export const categories = Array.from(new Set(tools.map(tool => tool.category)));
