# 🛠️ Online Tools Hub

Modern, kapsamlı ve kullanıcı dostu online araçlar koleksiyonu. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## ✨ Özellikler

### 🎯 Command Palette
- **Cmd/Ctrl + K** kısayolu ile hızlı erişim
- Gerçek zamanlı arama
- Klavye navigasyonu
- Tüm araçlara anında ulaşım

### 💰 Finans & Matematik Araçları
- **Yüzde Hesaplayıcı**: 4 farklı hesaplama türü
- **Değişim Oranı Hesaplayıcı**: Geçmiş kayıtlarıyla
- **Basit Faiz Hesaplayıcı**: Detaylı faiz hesaplamaları
- **Bileşik Faiz Hesaplayıcı**: Bileşik faiz hesaplamaları
- PDF ve Excel export desteği

### 🔄 Dönüştürücüler
- **Universal Unit Converter**: 6 kategori (Uzunluk, Ağırlık, Hacim, Sıcaklık, Hız, Veri)
- **Timezone Converter**: 10 farklı şehir, gerçek zamanlı saat bilgisi

### 📐 Görsel & Tasarım Araçları
- **Aspect Ratio Calculator**: Animasyonlu görsel önizleme
- Hazır oran presetleri (16:9, 4:3, 1:1, 21:9, 9:16)
- Yaygın çözünürlükler

### ✍️ Metin Araçları
- **Case Converter**: 6 farklı metin dönüştürme
- **Morse Code Translator**: Çift yönlü çeviri
- **Anagram Generator**: Akıllı anagram oluşturucu
- **Username Generator**: Yaratıcı kullanıcı adları

### ⏱️ Zaman & Verimlilik
- **Focus Timer & Pomodoro**: Circular progress bar
- İstatistikler (günlük, haftalık, aylık)
- Bildirim desteği
- LocalStorage ile veri saklama
- Seans geçmişi

### 🎲 Şans & Oyun
- **3D Animasyonlu Zar**: Gerçekçi zar atma
- **Yazı Tura**: 3 farklı para birimi
- **Kart Çekme**: 52 kartlık deste
- **Çarkıfelek**: Özelleştirilebilir seçenekler

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusu
npm start
```

## 📦 Kullanılan Teknolojiler

- **Next.js 14** - App Router ile
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern stilizasyon
- **Framer Motion** - Akıcı animasyonlar
- **cmdk** - Command palette
- **Radix UI** - Erişilebilir UI bileşenleri
- **jsPDF** - PDF export
- **xlsx** - Excel export
- **Lucide React** - Modern ikonlar

## 🎨 Tasarım Prensipleri

- ✅ Modern, temiz ve minimalist tasarım
- ✅ Slate-900 & Indigo-600 renk paleti
- ✅ Rounded-xl kartlar ve shadow efektleri
- ✅ Tam responsive (mobil uyumlu)
- ✅ Erişilebilir ve sezgisel UX
- ✅ Smooth animasyonlar

## 📁 Proje Yapısı

```
onlinetools/
├── app/
│   ├── tools/
│   │   ├── percentage-calculator/
│   │   ├── unit-converter/
│   │   ├── timezone-converter/
│   │   ├── aspect-ratio/
│   │   ├── text-tools/
│   │   ├── focus-timer/
│   │   └── randomizer/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── tools/
│   ├── ui/
│   ├── bento-grid.tsx
│   ├── command-palette.tsx
│   └── header.tsx
└── lib/
    ├── calculations.ts
    ├── unit-conversions.ts
    ├── tools-data.ts
    └── utils.ts
```

## 🔑 Özellik Detayları

### Command Palette
Uygulamanın herhangi bir yerinden **Cmd/Ctrl + K** tuşlarına basarak tüm araçlara hızlıca erişebilirsiniz.

### SEO Optimizasyonu
Her araç için ayrı sayfa ve dinamik meta tags ile tam SEO desteği.

### Performance
- Next.js 14 App Router
- Turbopack ile hızlı build
- Image optimization
- Code splitting

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📞 İletişim

Sorularınız için issue açabilirsiniz.

---

**Online Tools Hub** ile işlerinizi kolaylaştırın! 🚀
