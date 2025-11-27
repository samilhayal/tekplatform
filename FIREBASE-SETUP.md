# Firebase Firestore Entegrasyonu

## 🔥 Firebase Kurulumu Tamamlandı!

### ✅ Yapılanlar

1. **Firebase Packages Kuruldu**
   - `firebase` (Client SDK)
   - `firebase-admin` (Admin SDK)

2. **Yapılandırma Dosyaları**
   - `lib/firebase-config.ts` - Client-side config
   - `lib/firebase-admin.ts` - Server-side config
   - `.env.local` - Environment variables

3. **API Routes Oluşturuldu**
   - `/api/init-database` - Database başlatma
   - `/api/tools` - Araç yönetimi (GET, POST, PUT)
   - `/api/prices` - Fiyat yönetimi (GET, POST)

4. **Admin Sayfaları Güncellendi**
   - `/admin/tools` - Firestore entegrasyonu
   - `/admin/init-database` - DB başlatma sayfası (YENİ)

5. **Firestore Rules**
   - `firestore.rules` - Güvenlik kuralları

---

## 🚀 Hızlı Başlangıç

### Adım 1: Firebase Console'dan API Keys Alın

1. [Firebase Console](https://console.firebase.google.com/) → Projenize gidin
2. Project Settings (⚙️) → General
3. "Your apps" bölümünde web app ekleyin veya mevcut olanı seçin
4. Config objesindeki değerleri kopyalayın:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "tekplatform-12ade.firebaseapp.com",
  projectId: "tekplatform-12ade",
  storageBucket: "tekplatform-12ade.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Adım 2: .env.local Dosyasını Güncelleyin

`.env.local` dosyasını açın ve şu değerleri doldurun:

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza_buraya_api_key_yazın
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tekplatform-12ade.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tekplatform-12ade
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tekplatform-12ade.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=buraya_sender_id_yazın
NEXT_PUBLIC_FIREBASE_APP_ID=buraya_app_id_yazın

# Firebase Admin (Private - Already configured)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

⚠️ **Önemli:** Sadece `NEXT_PUBLIC_` ile başlayanları değiştirin, `FIREBASE_PRIVATE_KEY` zaten ayarlı.

### Adım 3: Firestore Rules Güncelleyin

Firebase Console → Firestore Database → Rules sekmesine gidin ve `firestore.rules` dosyasındaki kuralları yapıştırın:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /tools/{toolId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /settings/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    match /feedback/{feedbackId} {
      allow read: if false;
      allow create: if true;
      allow update, delete: if false;
    }
    
    match /statistics/{statId} {
      allow read: if false;
      allow write: if false;
    }
  }
}
```

### Adım 4: Database'i Başlatın

1. Development sunucusunu başlatın:
```bash
npm run dev
```

2. Admin panele giriş yapın:
   - URL: `http://localhost:3000/admin/login`
   - Kullanıcı: `dash2board`
   - Şifre: `manas123`

3. "Database Başlat" menüsüne tıklayın
4. "Database'i Başlat" butonuna tıklayın
5. İşlem tamamlanınca şunları göreceksiniz:
   - ✓ 98 araç oluşturuldu
   - ✓ Fiyat ayarları hazır
   - ✓ Admin ayarları hazır

---

## 📊 Database Yapısı

### Collections:

#### 1. `tools` (Araçlar)
```typescript
{
  id: "percentage-calculator",
  title: "Yüzde Hesaplayıcı",
  description: "...",
  category: "Finans & Matematik",
  icon: "Calculator",
  href: "/tools/percentage-calculator",
  keywords: ["yüzde", "percentage", ...],
  isActive: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### 2. `settings/prices` (Fiyatlar)
```typescript
{
  gold: {
    gram: 3200,
    ceyrek: 5440,
    yarim: 11200,
    tam: 23040,
    lastUpdate: Timestamp
  },
  currency: {
    usdTry: 34.50,
    eurTry: 37.20,
    gbpTry: 43.50,
    usdEur: 0.92,
    lastUpdate: Timestamp
  },
  tufe: {
    monthly: 2.89,
    yearly: 64.77,
    lastUpdate: Timestamp
  },
  zakat: {
    goldPrice: 3200,
    silverPrice: 38,
    goldNisab: 272000,
    silverNisab: 26600,
    usdTry: 34.50,
    eurTry: 37.20,
    lastUpdate: Timestamp
  },
  updatedAt: Timestamp
}
```

#### 3. `settings/admin` (Admin Ayarları)
```typescript
{
  appName: "Kolay Hesapla",
  totalTools: 98,
  activeTools: 98,
  lastUpdated: Timestamp
}
```

---

## 🔌 API Endpoints

### Initialize Database
```bash
POST /api/init-database
# Tüm database'i ilk verilerle doldurur
```

### Tools Management
```bash
GET /api/tools
# Tüm araçları getirir

POST /api/tools
Body: { "toolId": "...", "isActive": true/false }
# Tek bir aracın durumunu günceller

PUT /api/tools
Body: { "isActive": true/false }
# Tüm araçları toplu günceller
```

### Prices Management
```bash
GET /api/prices
# Tüm fiyatları getirir

POST /api/prices
Body: { 
  "type": "gold" | "currency" | "tufe" | "zakat" | "all",
  "data": { ... }
}
# Fiyatları günceller
```

---

## 🔄 Veri Akışı

### Admin → Firestore → User

```
Admin Tools Page
    ↓
Toggle Tool (isActive: false)
    ↓
POST /api/tools { toolId, isActive }
    ↓
Firebase Admin SDK
    ↓
Firestore Database Updated
    ↓
localStorage sync (backward compatibility)
    ↓
User sees change on homepage
```

---

## 🎯 Sonraki Adımlar

1. ✅ Firebase API keys'leri ekleyin (`.env.local`)
2. ✅ Firestore rules'ları güncelleyin (Firebase Console)
3. ✅ Database'i başlatın (`/admin/init-database`)
4. ✅ Admin Prices sayfasını Firestore'a bağlayın (TODO)
5. ✅ Bento Grid'i Firestore'dan okuyacak şekilde güncelleyin (TODO)
6. ✅ Tool pages'leri Firestore'dan okuyacak şekilde güncelleyin (TODO)

---

## 🐛 Troubleshooting

### Hata: "Failed to initialize database"
- `.env.local` dosyasındaki `FIREBASE_PRIVATE_KEY` doğru formatta mı?
- Private key'deki `\n` karakterleri korunmalı

### Hata: "Permission denied"
- Firestore rules doğru mu ayarlandı?
- Admin SDK credentials doğru mu?

### Hata: "API key not found"
- `.env.local` dosyasındaki tüm `NEXT_PUBLIC_` değerlerini doldurdunuz mu?
- Development sunucusunu yeniden başlattınız mı? (`npm run dev`)

---

## 📚 Kaynaklar

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Hazırlayan:** Kolay Hesapla Development Team  
**Tarih:** 15 Aralık 2024
