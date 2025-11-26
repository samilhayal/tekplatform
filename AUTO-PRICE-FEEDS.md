# Otomatik Fiyat Güncellemeleri - Ücretsiz API'ler

## 📊 Genel Bakış

Bu dokümantasyon, döviz kurları, altın fiyatları, TUFE oranları ve diğer finansal verileri otomatik olarak çekmek için kullanılabilecek ücretsiz API'leri listeler.

## 💱 Döviz Kurları (Currency Rates)

### 1. TCMB API (Türkiye Cumhuriyet Merkez Bankası) ⭐ **ÖNERİLEN**
- **URL:** `https://www.tcmb.gov.tr/kurlar/today.xml`
- **Özellikler:**
  - ✅ Tamamen ücretsiz
  - ✅ API key gerektirmez
  - ✅ Resmi kaynak (en güncel ve doğru)
  - ✅ TRY bazlı tüm kurlar
  - ✅ Sınırsız istek
- **Format:** XML
- **Güncelleme:** Günlük (hafta içi)
- **Örnek Kullanım:**
```typescript
async function getTCMBRates() {
  const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml')
  const xmlText = await response.text()
  // XML parsing gerekli
  return parsedData
}
```

### 2. ExchangeRate-API
- **URL:** `https://api.exchangerate-api.com/v4/latest/TRY`
- **Ücretsiz Limit:** 1,500 istek/ay
- **API Key:** Gerekli (ücretsiz kayıt)
- **Format:** JSON
- **Özellikler:**
  - ✅ JSON formatı (kolay parse)
  - ⚠️ Aylık limit var

### 3. Fixer.io
- **URL:** `https://api.fixer.io/latest`
- **Ücretsiz Limit:** 100 istek/ay
- **Dezavantaj:** Sınırlı para birimi (TRY yok)

---

## 🥇 Altın Fiyatları (Gold Prices)

### 1. GoldAPI.io
- **URL:** `https://www.goldapi.io/api/`
- **Ücretsiz Limit:** 50 istek/ay
- **API Key:** Gerekli
- **Özellikler:**
  - Gram altın (XAU)
  - Çeyrek, yarım, tam altın hesaplaması gerekli
  - TRY bazlı fiyatlar

### 2. Metals-API.com
- **URL:** `https://metals-api.com/api/latest`
- **Ücretsiz Limit:** 100 istek/ay
- **API Key:** Gerekli
- **Kapsam:** Altın, gümüş, platin

### 3. Web Scraping (Alternatif) ⚠️
- **Kaynak:** Türkiye Altın Borsası (https://www.altin.in)
- **Yöntem:** Puppeteer/Cheerio ile web scraping
- **Avantajlar:**
  - Ücretsiz
  - API limiti yok
  - Türkiye'ye özel veriler
- **Dezavantajlar:**
  - Site yapısı değişirse bozulur
  - Rate limiting riski
  - Yasal sorun olabilir

---

## 📈 TUFE (Tüketici Fiyat Endeksi)

### 1. TÜİK API (Türkiye İstatistik Kurumu)
- **URL:** `https://data.tuik.gov.tr/`
- **Özellikler:**
  - ✅ Resmi kaynak
  - ✅ Ücretsiz
  - ⚠️ Kayıt gerektirir
  - ⚠️ API dokümantasyonu sınırlı
- **Not:** TÜİK'in EVDS (Elektronik Veri Dağıtım Sistemi) kullanılabilir

### 2. TCMB EVDS API
- **URL:** `https://evds2.tcmb.gov.tr/`
- **API Key:** Gerekli (ücretsiz)
- **Özellikler:**
  - Enflasyon verileri
  - TUFE/ÜFE oranları
  - Excel/JSON formatı

---

## 🔧 Önerilen Uygulama Mimarisi

### 1. Serverless Function (Next.js API Route)

```typescript
// app/api/update-prices/route.ts
export async function GET() {
  try {
    // 1. TCMB'den döviz kurlarını çek
    const currencyRates = await fetchTCMBRates()
    
    // 2. GoldAPI'den altın fiyatlarını çek
    const goldPrices = await fetchGoldPrices()
    
    // 3. Database veya localStorage'a kaydet
    await savePrices({ currencyRates, goldPrices })
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
```

### 2. Cron Job ile Otomatik Güncelleme

**Vercel Cron Jobs (Ücretsiz):**
```json
// vercel.json
{
  "crons": [{
    "path": "/api/update-prices",
    "schedule": "0 9 * * *"
  }]
}
```

**Günlük saat 09:00'da otomatik çalışır**

### 3. Fallback Mekanizması

```typescript
async function getPrices() {
  // 1. Cache'den dene (localStorage/database)
  const cached = await getCachedPrices()
  if (cached && !isExpired(cached)) return cached
  
  // 2. API'den çek
  try {
    const fresh = await fetchFromAPI()
    await cache(fresh)
    return fresh
  } catch (error) {
    // 3. Hata varsa cache'deki eski veriyi kullan
    return cached || getDefaultPrices()
  }
}
```

---

## 📝 Örnek Implementasyon

### TCMB XML Parser

```typescript
async function getTCMBCurrencyRates() {
  const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml')
  const xml = await response.text()
  
  // Simple XML parsing
  const usdMatch = xml.match(/<Currency Code="USD">.*?<ForexSelling>([\d.]+)<\/ForexSelling>/s)
  const eurMatch = xml.match(/<Currency Code="EUR">.*?<ForexSelling>([\d.]+)<\/ForexSelling>/s)
  const gbpMatch = xml.match(/<Currency Code="GBP">.*?<ForexSelling>([\d.]+)<\/ForexSelling>/s)
  
  return {
    USD_TRY: parseFloat(usdMatch?.[1] || '0'),
    EUR_TRY: parseFloat(eurMatch?.[1] || '0'),
    GBP_TRY: parseFloat(gbpMatch?.[1] || '0'),
    updatedAt: new Date().toISOString()
  }
}
```

### Gold Prices Calculator

```typescript
async function getGoldPrices() {
  // GoldAPI'den gram altın fiyatı
  const response = await fetch('https://www.goldapi.io/api/XAU/TRY', {
    headers: { 'x-access-token': process.env.GOLD_API_KEY! }
  })
  const data = await response.json()
  
  const gramPrice = data.price_gram_24k
  
  return {
    gram: gramPrice,
    ceyrek: gramPrice * 1.7, // Çeyrek altın ~1.7 gram
    yarim: gramPrice * 3.5,   // Yarım altın ~3.5 gram
    tam: gramPrice * 7.2      // Tam altın ~7.2 gram
  }
}
```

---

## 🎯 Önerilen Strateji

### Aşama 1: Başlangıç (Şu an)
1. ✅ Manuel güncellemeler (mevcut admin panel)
2. ✅ localStorage'da saklama
3. ✅ Kullanıcı tarafı hesaplamalar

### Aşama 2: Otomasyona Geçiş
1. 🔄 TCMB API entegrasyonu (döviz için)
2. 🔄 GoldAPI entegrasyonu (altın için)
3. 🔄 Next.js API route oluştur
4. 🔄 Database ekle (PostgreSQL/Supabase)

### Aşama 3: Gelişmiş Özellikler
1. 📊 Tarihsel veri tracking
2. 📈 Fiyat grafikleri
3. 🔔 Fiyat uyarıları
4. 📧 Email bildirimleri

---

## 💾 Database Şeması Önerisi

```sql
-- PostgreSQL
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'currency', 'gold', 'tufe'
  symbol VARCHAR(20) NOT NULL, -- 'USD_TRY', 'gram', 'monthly'
  value DECIMAL(10,4) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_type_symbol ON price_history(type, symbol);
CREATE INDEX idx_created_at ON price_history(created_at DESC);
```

---

## 🚀 Hızlı Başlangıç

### 1. Environment Variables (.env.local)
```bash
GOLD_API_KEY=your_goldapi_key
TCMB_URL=https://www.tcmb.gov.tr/kurlar/today.xml
```

### 2. Package.json Dependencies
```json
{
  "dependencies": {
    "xml2js": "^0.6.2",
    "node-cache": "^5.1.2"
  }
}
```

### 3. API Route Oluştur
```bash
mkdir -p app/api/prices
touch app/api/prices/route.ts
```

---

## 📚 Kaynaklar

- TCMB Kurlar: https://www.tcmb.gov.tr/kurlar/
- GoldAPI Docs: https://www.goldapi.io/documentation
- TÜİK EVDS: https://evds2.tcmb.gov.tr/
- Vercel Cron: https://vercel.com/docs/cron-jobs

---

## ⚠️ Önemli Notlar

1. **API Limitleri:** Ücretsiz planlar genelde aylık 100-1500 istek arası
2. **Caching:** Mutlaka cache mekanizması kullanın (günlük güncelleme yeterli)
3. **Error Handling:** API down olduğunda fallback data kullanın
4. **Rate Limiting:** Çok sık istek atmayın, günde 1-2 kez yeterli
5. **CORS:** Next.js API routes kullanarak client-side CORS sorunlarından kaçının

---

## 🎁 Bonus: Alternatif Çözümler

### RSS Feed Kullanımı
Bazı siteler RSS feed sağlar:
```typescript
// TCMB RSS
const rss = await fetch('https://www.tcmb.gov.tr/wps/wcm/connect/rss/tr/kurlar')
```

### GitHub Actions ile Scheduled Updates
```yaml
# .github/workflows/update-prices.yml
name: Update Prices
on:
  schedule:
    - cron: '0 9 * * *'
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run update-prices
```

---

**Son Güncelleme:** 15 Aralık 2024
**Hazırlayan:** Tek Platform Development Team
