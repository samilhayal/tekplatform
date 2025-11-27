# Admin Panel Entegrasyonu

## 🎯 Genel Bakış

Admin panelinde yapılan değişiklikler artık ana uygulamaya otomatik olarak yansıyor. Tüm veriler `localStorage` üzerinden senkronize ediliyor.

## 📦 localStorage Yapısı

### 1. `toolsStatus` - Araç Durumları
```typescript
{
  "percentage-calculator": true,  // Aktif
  "bmi-calculator": false,        // Pasif
  "gold-calculator": true,
  // ... diğer araçlar
}
```

**Kullanım Yerleri:**
- ✅ Ana sayfa (Bento Grid) - Pasif araçları gizler
- ✅ Admin Tools Page - Araç aktif/pasif yönetimi
- ✅ Ana sayfa araç sayacı - Sadece aktif araçları sayar

### 2. `adminPrices` - Fiyat Verileri
```typescript
{
  "gold": {
    "gram": 3200,
    "ceyrek": 5440,
    "yarim": 11200,
    "tam": 23040,
    "lastUpdate": "2024-12-15T10:30:00"
  },
  "currency": {
    "usdTry": 34.50,
    "eurTry": 37.20,
    "gbpTry": 43.50,
    "usdEur": 0.92,
    "lastUpdate": "2024-12-15T10:30:00"
  },
  "tufe": {
    "monthly": 2.89,
    "yearly": 64.77,
    "lastUpdate": "2024-11-01"
  },
  "zakat": {
    "goldPrice": 3200,
    "silverPrice": 38,
    "goldNisab": 272000,
    "silverNisab": 26600,
    "usdTry": 34.50,
    "eurTry": 37.20,
    "lastUpdate": "2024-12-15T10:30:00"
  }
}
```

**Kullanım Yerleri:**
- ✅ Altın Hesaplayıcı - Admin'den gram altın fiyatını çeker
- ✅ Döviz Çevirici - TRY bazlı kurları admin'den alır
- ✅ Zekat Hesaplayıcı - Altın, gümüş, döviz kurlarını kullanır
- ✅ Admin Prices Page - Tüm fiyatları günceller

---

## 🔄 Veri Akışı

### Admin → Uygulama

1. **Admin panelde değişiklik yapılır**
   ```typescript
   // app/admin/tools/page.tsx
   const toggleToolStatus = (toolId: string) => {
     setToolsStatus(prev => ({
       ...prev,
       [toolId]: !prev[toolId]
     }))
   }
   ```

2. **useEffect ile localStorage'a kaydedilir**
   ```typescript
   useEffect(() => {
     localStorage.setItem('toolsStatus', JSON.stringify(toolsStatus))
   }, [toolsStatus])
   ```

3. **Ana uygulama localStorage'dan okur**
   ```typescript
   // components/bento-grid.tsx
   useEffect(() => {
     const stored = localStorage.getItem('toolsStatus')
     if (stored) {
       setToolsStatus(JSON.parse(stored))
     }
   }, [])
   ```

4. **Filtreleme uygulanır**
   ```typescript
   const filteredTools = tools.filter(tool => {
     const isActive = toolsStatus[tool.id] !== false
     return isActive && (selectedCategory === "all" || tool.category === selectedCategory)
   })
   ```

---

## 🛠️ Entegre Edilen Bileşenler

### 1. Ana Sayfa (`app/page.tsx`)
**Değişiklikler:**
- ✅ Client component'e dönüştürüldü
- ✅ `activeToolsCount` state eklendi
- ✅ localStorage'dan aktif araç sayısı okunuyor
- ✅ Dinamik araç sayısı gösterimi

**Kod:**
```typescript
const [activeToolsCount, setActiveToolsCount] = useState(tools.length)

useEffect(() => {
  const stored = localStorage.getItem('toolsStatus')
  if (stored) {
    const status = JSON.parse(stored)
    const activeCount = Object.values(status).filter(Boolean).length
    setActiveToolsCount(activeCount)
  }
}, [])
```

### 2. Bento Grid (`components/bento-grid.tsx`)
**Değişiklikler:**
- ✅ `toolsStatus` state eklendi
- ✅ localStorage'dan araç durumları okunuyor
- ✅ Pasif araçlar filtreleniyor

**Kod:**
```typescript
const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})

useEffect(() => {
  const stored = localStorage.getItem('toolsStatus')
  if (stored) {
    setToolsStatus(JSON.parse(stored))
  }
}, [])

const filteredTools = tools.filter(tool => {
  const isActive = toolsStatus[tool.id] !== false
  if (!isActive) return false
  return selectedCategory === "all" || tool.category === selectedCategory
})
```

### 3. Admin Tools Page (`app/admin/tools/page.tsx`)
**Değişiklikler:**
- ✅ Başlangıçta localStorage'dan yükleniyor
- ✅ Her değişiklik otomatik kaydediliyor
- ✅ Kaydetme mesajı gösteriliyor
- ✅ Save icon eklendi

**Kod:**
```typescript
const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('toolsStatus')
    if (stored) return JSON.parse(stored)
  }
  // Default: all active
  const status: Record<string, boolean> = {}
  tools.forEach(tool => { status[tool.id] = true })
  return status
})

useEffect(() => {
  localStorage.setItem('toolsStatus', JSON.stringify(toolsStatus))
  setSaveMessage('Değişiklikler otomatik kaydedildi ✓')
  const timer = setTimeout(() => setSaveMessage(''), 3000)
  return () => clearTimeout(timer)
}, [toolsStatus])
```

### 4. Altın Hesaplayıcı (`components/tools/gold-calculator.tsx`)
**Değişiklikler:**
- ✅ Admin fiyatlarını localStorage'dan okuyor
- ✅ Varsayılan fiyatlar yerine admin fiyatları kullanılıyor

**Kod:**
```typescript
const fetchGoldPrices = async () => {
  let mockPricePerGram = 2100 // Default
  
  const storedPrices = localStorage.getItem('adminPrices')
  if (storedPrices) {
    const prices = JSON.parse(storedPrices)
    if (prices.gold?.gram) {
      mockPricePerGram = prices.gold.gram
    }
  }
  
  setPrices({
    gram24k: mockPricePerGram,
    gram22k: mockPricePerGram * 0.916,
    // ...
  })
}
```

### 5. Döviz Çevirici (`components/tools/currency-converter.tsx`)
**Değişiklikler:**
- ✅ TRY çiftleri için admin kurları kullanılıyor
- ✅ Diğer çiftler için API kullanılıyor
- ✅ "(Admin)" etiketi gösteriliyor

**Kod:**
```typescript
const fetchRates = async () => {
  let customRates: ExchangeRates = {}
  
  const storedPrices = localStorage.getItem('adminPrices')
  if (storedPrices) {
    const prices = JSON.parse(storedPrices)
    if (prices.currency && (fromCurrency === 'TRY' || toCurrency === 'TRY')) {
      customRates = {
        'USD': prices.currency.usdTry,
        'EUR': prices.currency.eurTry,
        'GBP': prices.currency.gbpTry,
        'TRY': 1
      }
    }
  }
  
  if (Object.keys(customRates).length > 0) {
    setRates(customRates)
    setLastUpdate(new Date().toLocaleString('tr-TR') + ' (Admin)')
  } else {
    // Use API
  }
}
```

### 6. Zekat Hesaplayıcı (`components/tools/zakat-calculator.tsx`)
**Değişiklikler:**
- ✅ Altın/gümüş fiyatları admin'den okunuyor
- ✅ Döviz kurları admin'den okunuyor

**Kod:**
```typescript
useEffect(() => {
  const storedPrices = localStorage.getItem('adminPrices')
  if (storedPrices) {
    const prices = JSON.parse(storedPrices)
    
    if (prices.currency) {
      setExchangeRates({
        usdToTry: prices.currency.usdTry || 34.50,
        eurToTry: prices.currency.eurTry || 37.20
      })
    }
    
    if (prices.zakat) {
      setPreciousMetals(prev => ({
        ...prev,
        goldPricePerGram: prices.zakat.goldPrice,
        silverPricePerGram: prices.zakat.silverPrice
      }))
    }
  }
}, [])
```

---

## ✅ Test Senaryoları

### Test 1: Araç Pasif Yapma
1. Admin panele giriş yap: `/admin/login`
2. Araç Yönetimi sayfasına git: `/admin/tools`
3. Bir aracı (örn: "Yüzde Hesaplayıcı") pasif yap
4. "Değişiklikler otomatik kaydedildi ✓" mesajını gör
5. Ana sayfaya dön: `/`
6. ✅ Pasif araç görünmüyor olmalı
7. ✅ Araç sayısı 1 azalmış olmalı

### Test 2: Altın Fiyatı Güncelleme
1. Admin panele git: `/admin/prices`
2. Altın Gram fiyatını değiştir (örn: 3500 TL)
3. "Kaydet" butonuna tıkla
4. "Fiyatlar başarıyla kaydedildi!" mesajını gör
5. Altın hesaplayıcıya git: `/tools/gold-calculator`
6. "Fiyatları Güncelle" butonuna tıkla
7. ✅ Gram altın fiyatı 3500 TL olmalı

### Test 3: Döviz Kuru Güncelleme
1. Admin panelde USD/TRY kurunu değiştir (örn: 35.00)
2. Döviz çeviriciye git: `/tools/currency-converter`
3. USD → TRY seç
4. 100 USD gir
5. ✅ Sonuç 3500 TRY olmalı
6. ✅ "Son Güncelleme" kısmında "(Admin)" etiketi görünmeli

### Test 4: Toplu Araç Kapatma
1. Admin Tools sayfasında "Tümünü Kapat" butonuna tıkla
2. Ana sayfaya dön
3. ✅ Hiçbir araç görünmemeli
4. ✅ "0+ Ücretsiz Online Araç" yazmalı
5. Admin'e dönüp "Tümünü Aç" butonuna tıkla
6. ✅ Tüm araçlar tekrar görünmeli

---

## 🔐 Güvenlik Notları

### localStorage Kullanımı
- ⚠️ **Üretim için uygun değil!** localStorage client-side'da saklanır ve kolayca değiştirilebilir
- ✅ **Demo/Test için idealdir**
- 🔒 **Üretim için:** Backend database + API kullanılmalı

### Önerilen Üretim Mimarisi
```
Admin Panel → API Routes → PostgreSQL/MongoDB
     ↓
User Tools → API Routes → Database
```

---

## 🚀 Gelecek Geliştirmeler

### Kısa Vadeli
- [ ] Backend API entegrasyonu
- [ ] Gerçek zamanlı fiyat güncellemeleri (WebSocket)
- [ ] Admin log sistemi (kim, ne zaman, ne değiştirdi)
- [ ] Bulk import/export (CSV/JSON)

### Uzun Vadeli
- [ ] Multi-admin support (rol bazlı erişim)
- [ ] Scheduled price updates (cron jobs)
- [ ] Analytics dashboard (Google Analytics entegrasyonu)
- [ ] A/B testing framework
- [ ] CDN entegrasyonu

---

## 📝 Değişiklik Günlüğü

### v1.0.0 - 15 Aralık 2024
- ✅ localStorage entegrasyonu
- ✅ Araç aktif/pasif sistemi
- ✅ Altın fiyat senkronizasyonu
- ✅ Döviz kuru senkronizasyonu
- ✅ Zekat hesaplama entegrasyonu
- ✅ Otomatik kaydetme sistemi
- ✅ Dinamik araç sayacı
- ✅ UI feedback mesajları

---

## 🎓 Örnek Kullanım

### Admin'de Fiyat Güncelleme
```typescript
// 1. Admin Prices sayfasında
const handleSave = () => {
  const prices = {
    gold: { gram: 3500, ceyrek: 5950, ... },
    currency: { usdTry: 35.00, eurTry: 38.00, ... },
    tufe: { monthly: 2.5, yearly: 65.0 },
    zakat: { goldPrice: 3500, silverPrice: 40, ... }
  }
  
  localStorage.setItem('adminPrices', JSON.stringify(prices))
  // ✅ Otomatik kaydedildi
}

// 2. Araç bileşeninde
useEffect(() => {
  const stored = localStorage.getItem('adminPrices')
  if (stored) {
    const prices = JSON.parse(stored)
    setGoldPrice(prices.gold.gram) // ✅ Admin fiyatı kullanılıyor
  }
}, [])
```

### Araç Aktif/Pasif
```typescript
// 1. Admin Tools sayfasında
const toggleToolStatus = (toolId: string) => {
  setToolsStatus(prev => ({
    ...prev,
    [toolId]: !prev[toolId] // ✅ Toggle
  }))
  // useEffect otomatik kaydeder
}

// 2. Ana sayfada
const filteredTools = tools.filter(tool => {
  const isActive = toolsStatus[tool.id] !== false
  return isActive // ✅ Sadece aktif araçlar gösterilir
})
```

---

**Son Güncelleme:** 15 Aralık 2024  
**Hazırlayan:** Kolay Hesapla Development Team
