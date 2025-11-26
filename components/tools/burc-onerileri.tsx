"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Utensils, Briefcase, DollarSign, Plane, Sparkles, Gift, Home, Info, Lightbulb, BookOpen, HelpCircle, Star } from "lucide-react"
import Link from "next/link"

const zodiacData = {
  'Koç': {
    emoji: '♈',
    health: {
      strengths: 'Güçlü bağışıklık sistemi, hızlı iyileşme, bol enerji',
      weaknesses: 'Baş ağrıları, migren, stres kaynaklı sorunlar, kaza riski',
      tips: ['Düzenli egzersiz yapın, enerinizi boşaltın', 'Baş bölgesini koruyun', 'Sabırlı olmayı öğrenin', 'Yeterli uyku alın']
    },
    nutrition: {
      foods: ['Yağsız protein (tavuk, balık)', 'Acı biberler', 'Yeşil yapraklı sebzeler', 'Zencefil', 'Nar'],
      avoid: ['Aşırı kafein', 'Çok baharatlı yemekler', 'Fast food'],
      tips: 'Hızlı metabolizmanız nedeniyle sık ve küçük öğünler tercih edin. Protein ağırlıklı beslenin.'
    },
    career: {
      suits: ['Girişimcilik', 'Satış', 'Spor', 'Acil servis', 'İtfaiyecilik', 'Polis'],
      strengths: 'Liderlik, cesaretlik, hızlı karar verme, rekabetçi ruh',
      tips: 'Bağımsız çalışabileceğiniz, hızlı tempolu işler sizin için ideal. Rutin işlerden kaçının.'
    },
    finance: {
      style: 'Dürtüsel harcamalar yapma eğilimindesiniz. Risk almayı seversiniz.',
      tips: ['Acil durum fonu oluşturun', 'Yatırım yapmadan önce araştırma yapın', 'Bütçe planı yapın', 'Düzenli tasarruf alışkanlığı edinin'],
      lucky: 'Salı günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['İzlanda', 'Yeni Zelanda', 'Patagony', 'İsviçre Alpleri', 'Nepal'],
      style: 'Macera dolu, adrenalin yüklü aktiviteler',
      tips: 'Trekking, dağcılık, ekstrem sporlar içeren seyahatler tercih edin. Spontane geziler size uyar.'
    },
    development: {
      focus: ['Sabır geliştirme', 'Empati kurma', 'Dinleme becerileri', 'Öfke yönetimi'],
      books: ['Başarılı İnsanların 7 Alışkanlığı', 'Duygusal Zeka', 'Beden Dili'],
      activities: 'Yoga, meditasyon, takım sporları'
    },
    gifts: {
      ideas: ['Spor ekipmanları', 'Aksiyon kamerası', 'Macera kitapları', 'Fitness tracker', 'Kırmızı aksesuarlar'],
      colors: 'Kırmızı, bordo, turuncu'
    }
  },
  'Boğa': {
    emoji: '♉',
    health: {
      strengths: 'Güçlü fizik, dayanıklılık, yavaş ama düzenli metabolizma',
      weaknesses: 'Boğaz sorunları, tiroid, boyun ağrıları, kilo problemi',
      tips: ['Düzenli yürüyüş yapın', 'Boyun germe egzersizleri', 'Doğada vakit geçirin', 'Aşırı yemeyin']
    },
    nutrition: {
      foods: ['Organik sebze-meyve', 'Süt ürünleri', 'Bal', 'Fındık, badem', 'Tam tahıllar'],
      avoid: ['Aşırı şeker', 'İşlenmiş gıdalar', 'Çok yağlı yemekler'],
      tips: 'Lezzete düşkünlüğünüz nedeniyle porsiyon kontrolü önemli. Yavaş yiyin ve tadını çıkarın.'
    },
    career: {
      suits: ['Finans', 'Bankacılık', 'Sanat', 'Müzik', 'Aşçılık', 'Peyzaj mimarisi'],
      strengths: 'Sabır, kararlılık, pratiklik, güvenilirlik',
      tips: 'İstikrarlı, güvenli işler tercih edin. Sanat ve estetikle ilgili alanlarda başarılısınız.'
    },
    finance: {
      style: 'Tutumsuz ve planlı harcama yaparsınız. Güvenli yatırımları tercih edersiniz.',
      tips: ['Gayrimenkul yatırımı yapabilirsiniz', 'Uzun vadeli tasarruf planları', 'Altın/değerli metal yatırımı', 'Acele kararlar almayın'],
      lucky: 'Cuma günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Toskana', 'Provence', 'Bali', 'Santorini', 'Napa Valley'],
      style: 'Rahat, konforlu, lüks oteller, gastronomi turları',
      tips: 'Güzel manzaralar, iyi yemekler ve konfor aramaları. Doğa içinde butik oteller ideal.'
    },
    development: {
      focus: ['Esneklik kazanma', 'Değişime açık olma', 'İletişim becerileri', 'Paylaşmayı öğrenme'],
      books: ['Zengin Baba Yoksul Baba', 'Farkındalık Sanatı', 'Minimalizm'],
      activities: 'Bahçecilik, resim, müzik, yoga'
    },
    gifts: {
      ideas: ['Lüks şarap', 'Ev dekorasyon ürünleri', 'Yumuşak battaniye', 'Aromaterapi seti', 'Doğal kozmetik'],
      colors: 'Yeşil, pembe, toprak tonları'
    }
  },
  'İkizler': {
    emoji: '♊',
    health: {
      strengths: 'Hızlı metabolizma, enerjik, genç görünüm',
      weaknesses: 'Sinir sistemi, akciğerler, eller, kollar, anksiyete',
      tips: ['Nefes egzersizleri yapın', 'Mental dinlenme zamanları ayırın', 'El egzersizleri', 'Sosyalleşin ama aşırı yorulmayın']
    },
    nutrition: {
      foods: ['Ceviz, badem', 'Omega-3 (balık)', 'Yeşil çay', 'Nane', 'Portakal'],
      avoid: ['Aşırı kafein', 'Enerji içecekleri', 'Çok işlenmiş atıştırmalıklar'],
      tips: 'Hızlı yeme eğiliminiz var. Çeşitli yiyecekler yiyin ama porsiyonlara dikkat edin.'
    },
    career: {
      suits: ['Gazetecilik', 'Yazarlık', 'Satış', 'Öğretmenlik', 'Pazarlama', 'Sosyal medya yöneticiliği'],
      strengths: 'Çok yönlülük, iletişim, hızlı öğrenme, adapte olma',
      tips: 'Çeşitlilik ve mental uyarım gerektiren işler ideal. Çoklu görev yürütebilirsiniz.'
    },
    finance: {
      style: 'Değişken harcama alışkanlıkları. Para kazanmakta iyisiniz ama harcamakta da hızlısınız.',
      tips: ['Otomatik tasarruf planları yapın', 'İmpulsif alışverişten kaçının', 'Çeşitli gelir kaynakları oluşturun', 'Bütçe uygulamaları kullanın'],
      lucky: 'Çarşamba günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Tokyo', 'New York', 'Paris', 'Berlin', 'Bangkok'],
      style: 'Şehir turları, kültürel etkinlikler, kısa seyahatler',
      tips: 'Birden fazla şehir gezin, yerel halkla iletişim kurun, spontane planlar yapın.'
    },
    development: {
      focus: ['Odaklanma', 'Derinleşme', 'Sabırlı olma', 'Bitirmeyi öğrenme'],
      books: ['Derin Çalışma', 'Atomik Alışkanlıklar', 'İkna Psikolojisi'],
      activities: 'Sudoku, bulmaca, dil öğrenme, podcast dinleme'
    },
    gifts: {
      ideas: ['Kitaplar', 'Teknolojik gadget\'lar', 'Dergiler', 'Kurslar', 'Oyunlar, bulmacalar'],
      colors: 'Sarı, açık mavi, turuncu'
    }
  },
  'Yengeç': {
    emoji: '♋',
    health: {
      strengths: 'Güçlü sezgiler, iyileşme yeteneği, empatik',
      weaknesses: 'Mide sorunları, sindirim, göğüs bölgesi, duygusal yeme',
      tips: ['Stresi azaltın', 'Duygularınızı ifade edin', 'Sağlıklı yemek pişirin', 'Su kenarında zaman geçirin']
    },
    nutrition: {
      foods: ['Deniz ürünleri', 'Kabak, bezelye', 'Süt ürünleri', 'Buğday', 'Hindiba'],
      avoid: ['Aşırı tuzlu yemekler', 'Gazlı içecekler', 'Duygusal yeme'],
      tips: 'Duygusal durumunuz beslenmenizi etkiler. Ev yemekleri pişirmek size iyi gelir.'
    },
    career: {
      suits: ['Hemşirelik', 'Psikoloji', 'Aşçılık', 'Çocuk bakımı', 'İç mimarlık', 'Emlak'],
      strengths: 'Şefkat, koruma, sezgi, aile değerleri',
      tips: 'İnsanlara yardım ettiğiniz, bakım verdiğiniz işler tatmin edicidir. Ev ofis de uygun olabilir.'
    },
    finance: {
      style: 'Güvenlik odaklı, tasarruf yapmayı seversiniz. Aile için para biriktirirsiniz.',
      tips: ['Ev alımı öncelik verin', 'Aile bütçesi planlayın', 'Sigorta yaptırın', 'Çocuklar için eğitim fonu oluşturun'],
      lucky: 'Pazartesi günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Venedik', 'Amsterdam', 'Maldivler', 'Ege adaları', 'Göl evleri'],
      style: 'Su kenarı tatiller, aile gezileri, nostaljik yerler',
      tips: 'Sevdiklerinizle seyahat edin. Su sporları, plaj, deniz kenarı oteller tercih edin.'
    },
    development: {
      focus: ['Sınır koyma', 'Bağımsızlık', 'Geçmişi bırakma', 'Kendine öncelik verme'],
      books: ['Sınırlar', 'Bağlanma', 'İç Çocuğunuzla Barışın'],
      activities: 'Yüzme, günlük yazma, aile fotoğrafları düzenleme'
    },
    gifts: {
      ideas: ['Aile albümü', 'Ev yapımı yiyecekler', 'Yumuşak ev tekstili', 'Eski objeler', 'Fotoğraf çerçevesi'],
      colors: 'Gümüş, beyaz, deniz mavisi'
    }
  },
  'Aslan': {
    emoji: '♌',
    health: {
      strengths: 'Güçlü yapı, bol enerji, hızlı iyileşme, güçlü kalp',
      weaknesses: 'Kalp, sırt, omurga, aşırı kendine güven',
      tips: ['Düzenli kardiyovasküler egzersiz', 'Sırt egzersizleri', 'Düzenli check-up', 'Ego yönetimi']
    },
    nutrition: {
      foods: ['Sarımsak (kalp sağlığı)', 'Balık', 'Portakal', 'Hurma', 'Bal'],
      avoid: ['Aşırı yağlı yemekler', 'Çok fazla kırmızı et', 'Alkol'],
      tips: 'Kalp sağlığına dikkat edin. Renkli, gösterişli sunumlar yemek iştahınızı artırır.'
    },
    career: {
      suits: ['Yöneticilik', 'Oyunculuk', 'Eğitmenlik', 'Politik liderlik', 'Sanat yönetimi', 'CEO'],
      strengths: 'Liderlik, karizm, yaratıcılık, cömertlik',
      tips: 'Lider pozisyonlar ve sahnede olmak size uyar. Takdir edilmeyi ve tanınmayı seversiniz.'
    },
    finance: {
      style: 'Cömert harcamalar, lüks tercihleri, gösterişli tüketim.',
      tips: ['Gösterişli harcamalardan kaçının', 'Yatırım portföyü oluşturun', 'Mali danışman edinin', 'Bağışlarda ölçülü olun'],
      lucky: 'Pazar günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Dubai', 'Monaco', 'Las Vegas', 'Roma', 'Hawaii'],
      style: '5 yıldızlı oteller, lüks resortlar, VIP deneyimler',
      tips: 'Görkemli yerler, lüks konaklama ve özel hizmetler tercih edin. Kraliyet sarayları gezin.'
    },
    development: {
      focus: ['Alçakgönüllülük', 'Başkalarını dinleme', 'Takım çalışması', 'Mütevazılık'],
      books: ['Ego Düşmanınız', 'Liderin Güç Denklemi', 'Hizmetkar Liderlik'],
      activities: 'Tiyatro, dans, public speaking, sanat'
    },
    gifts: {
      ideas: ['Altın aksesuar', 'Lüks saat', 'VIP deneyimler', 'Kişiye özel ürünler', 'Tiyatro biletleri'],
      colors: 'Altın, turuncu, kraliyet mavisi'
    }
  },
  'Başak': {
    emoji: '♍',
    health: {
      strengths: 'Sağlıkçı yaklaşım, hijyen bilinci, detaycı',
      weaknesses: 'Sindirim sistemi, bağırsak, aşırı endişe, obsesif davranışlar',
      tips: ['Probiyotik tüketin', 'Aşırı mükemmeliyetçilikten kaçının', 'Meditasyon yapın', 'Rutinler oluşturun']
    },
    nutrition: {
      foods: ['Yulaf, buğday', 'Yeşil yapraklı sebzeler', 'Yoğurt, kefir', 'Elma', 'Brokoli'],
      avoid: ['Ağır yemekler', 'Aşırı baharatlı yiyecekler', 'İşlenmiş gıdalar'],
      tips: 'Organik ve sağlıklı beslenmeyi zaten bilirsiniz. Aşırı kısıtlamadan kaçının.'
    },
    career: {
      suits: ['Muhasebe', 'Analist', 'Editör', 'Sağlık sektörü', 'Araştırmacılık', 'Organizatörlük'],
      strengths: 'Analitik düşünce, detaycılık, organizasyon, mükemmeliyetçilik',
      tips: 'Detay gerektiren, sistematik işler size uyar. Hizmet odaklı kariyer tatmin edicidir.'
    },
    finance: {
      style: 'Dikkatli, planlı ve tutumlu. Her kuruşun hesabını yaparsınız.',
      tips: ['Excel bütçe tablosu tutun', 'Kısa-orta-uzun vadeli hedefler belirleyin', 'Otomatik tasarruf', 'Vergi optimizasyonu yapın'],
      lucky: 'Çarşamba günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Kyoto', 'İsviçre', 'Viyana', 'Singapur', 'Amsterdam'],
      style: 'Planlı geziler, temiz ve düzenli yerler, kültür turları',
      tips: 'Detaylı itineraries hazırlayın. Hijyenik, düzenli oteller tercih edin. Rehberli turlar uygun.'
    },
    development: {
      focus: ['Mükemmeliyetçiliği bırakma', 'Spontane olma', 'Eleştiricilikten kaçınma', 'Akışta olma'],
      books: ['Mükemmeliyetçiliğin Bedeli', 'Yapılması Gereken Her Şeyi Yapmaya Çalışmak', 'Minimalizm'],
      activities: 'Organizasyon, bahçecilik, el işi, temizlik'
    },
    gifts: {
      ideas: ['Organizer', 'Planner', 'Kaliteli kalemler', 'Sağlık ürünleri', 'Organik kozmetik'],
      colors: 'Beyaz, bej, lacivert'
    }
  },
  'Terazi': {
    emoji: '♎',
    health: {
      strengths: 'Dengeli, estetik bilinci, holistik yaklaşım',
      weaknesses: 'Böbrekler, bel, deri, karar vermede zorluk',
      tips: ['Bol su için', 'Cilt bakımı yapın', 'Estetik çevre oluşturun', 'Denge egzersizleri']
    },
    nutrition: {
      foods: ['Kuşkonmaz', 'Karpuz', 'Mavi yemişler', 'Badem', 'Brokoli'],
      avoid: ['Aşırı tuz', 'Alkol', 'Gazlı içecekler'],
      tips: 'Güzel sunumlar size iyi gelir. Dengeli beslenmeye özen gösterin.'
    },
    career: {
      suits: ['Hukuk', 'Diplomasi', 'Tasarım', 'İnsan kaynakları', 'Danışmanlık', 'Arabuluculuk'],
      strengths: 'Adalet duygusu, diplomasi, estetik göz, sosyallik',
      tips: 'İnsanlarla ilgili, adalet ve estetik gerektiren işler ideal. Ortaklıklarda başarılısınız.'
    },
    finance: {
      style: 'Dengeli harcama ama lüks tercihleri. Kararsızlık yaşayabilirsiniz.',
      tips: ['Ortak hesap açmadan önce iyi düşünün', 'Estetik harcamalara limit koyun', 'Partnerle bütçe planı yapın', 'Alışveriş listesi hazırlayın'],
      lucky: 'Cuma günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Paris', 'Floransa', 'Santorini', 'Büyükada', 'Charleston'],
      style: 'Romantik geziler, sanat galerileri, şık oteller, çiftler tatili',
      tips: 'Estetik güzelliği olan yerler tercih edin. Partner ile seyahat edin. Sanat ve mimariye ilgi gösterin.'
    },
    development: {
      focus: ['Karar verme', 'Bağımsızlık', 'Çatışmadan kaçınmama', 'Kendi ihtiyaçlarını önceleme'],
      books: ['Karar Verme Sanatı', 'Sınırlar', 'İnsanlar Arası İletişim'],
      activities: 'Yoga, dans, sanat, sosyal etkinlikler'
    },
    gifts: {
      ideas: ['Sanat eseri', 'Mücevher', 'Şık aksesuar', 'Spa deneyimi', 'Güzellik ürünleri'],
      colors: 'Pembe, açık mavi, pastel tonlar'
    }
  },
  'Akrep': {
    emoji: '♏',
    health: {
      strengths: 'Güçlü bağışıklık, iyileşme gücü, dayanıklılık',
      weaknesses: 'Üreme organları, bağırsak, burnedout, obsesyonlar',
      tips: ['Detoks yapın', 'Psikoterapi', 'Gizlilik ihtiyacınızı karşılayın', 'Bırakma pratikleri']
    },
    nutrition: {
      foods: ['Nar', 'Pancar', 'Sarımsak', 'Zencefil', 'Yeşil çay'],
      avoid: ['Aşırı alkol', 'Tok yeme', 'İşlenmiş etler'],
      tips: 'Detoksifikasyon destekleyen yiyecekler tercih edin. Oruç veya periyodik açlık size uyabilir.'
    },
    career: {
      suits: ['Psikoloji', 'Araştırma', 'Cerrahlık', 'Dedektiflik', 'Finans analizi', 'Gizli servis'],
      strengths: 'Derinlik, araştırma, dönüştürme, gizlilik',
      tips: 'Derin araştırma ve gizlilik gerektiren işler idealdir. Güç ve kontrol sahibi olmak istersiniz.'
    },
    finance: {
      style: 'Gizli, stratejik, kontrollü. Risk alırsınız ama hesaplı.',
      tips: ['Yatırımlarınızı gizli tutun', 'Borsa yatırımı yapabilirsiniz', 'Pasif gelir kaynakları oluşturun', 'Mali güç elde edin'],
      lucky: 'Salı günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Mısır', 'Peru', 'İskoçya', 'Transilvanya', 'Kapadokya'],
      style: 'Gizem, tarih, dönüşüm, yeraltı şehirleri',
      tips: 'Gizemli, tarihi yerler tercih edin. Dönüştürücü deneyimler yaşayın. Yalnız seyahat edebilirsiniz.'
    },
    development: {
      focus: ['Affetme', 'Güven', 'Kontrolü bırakma', 'Paylaşma'],
      books: ['Güç', 'Dönüşüm Psikolojisi', 'Gölge Çalışması'],
      activities: 'Meditasyon, psikoloji, gizemcilik, dönüşüm pratikleri'
    },
    gifts: {
      ideas: ['Gizem kitapları', 'Siyah aksesuar', 'Gizemli obje', 'Psikoloji kitapları', 'Mum, tütsü'],
      colors: 'Siyah, bordo, koyu mor'
    }
  },
  'Yay': {
    emoji: '♐',
    health: {
      strengths: 'İyimser yaklaşım, bol enerji, hızlı iyileşme',
      weaknesses: 'Kalçalar, uyluklar, karaciğer, aşırılıklar',
      tips: ['Ölçülü olun', 'Karaciğer sağlığına dikkat', 'Açık hava sporları', 'Streç yapın']
    },
    nutrition: {
      foods: ['Kırmızı etler (ölçülü)', 'Kuşkonmaz', 'Üzüm', 'Incir', 'Kayısı'],
      avoid: ['Aşırı alkol', 'Çok yağlı yemekler', 'Aşırı baharatlar'],
      tips: 'Aşırılıktan kaçının. Farklı mutfakları denemeyi seversiniz. Egzotik tatlar tercih edin.'
    },
    career: {
      suits: ['Öğretmenlik', 'Felsefe', 'Turizm', 'Yayıncılık', 'Pilotluk', 'Dış ticaret'],
      strengths: 'İyimserlik, vizyon, özgürlük, entelektüellik',
      tips: 'Seyahat, öğretme ve büyüme içeren işler ideal. Özgürlük ve esneklik önemlidir.'
    },
    finance: {
      style: 'İyimser, risk almayı seven, büyük düşünen. Aşırı harcama riski.',
      tips: ['Aşırı iyimser olmayın', 'Yurt dışı yatırımları değerlendirin', 'Eğitim fonları oluşturun', 'Kumar oynamayın'],
      lucky: 'Perşembe günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Hindistan', 'Avustralya', 'Brezilya', 'Afrika safari', 'Camino de Santiago'],
      style: 'Macera, kültür, felsefe, backpacking, uzun seyahatler',
      tips: 'Dünyanın farklı yerlerini keşfedin. Manevi seyahatler, felsefi deneyimler yaşayın.'
    },
    development: {
      focus: ['Detaylara dikkat', 'Taahhüt', 'Gerçekçilik', 'Odaklanma'],
      books: ['Alchemist', 'Dağ Ötesi Dağ', 'Zenginlik Felsefesi'],
      activities: 'Okuma, felsefe, farklı kültürler öğrenme, açık hava sporları'
    },
    gifts: {
      ideas: ['Seyahat rehberleri', 'Dünya haritası', 'Felsefe kitapları', 'Kamp ekipmanı', 'Etnik aksesuarlar'],
      colors: 'Mor, lacivert, turkuaz'
    }
  },
  'Oğlak': {
    emoji: '♑',
    health: {
      strengths: 'Dayanıklılık, uzun ömür, kuvvetli kemikler',
      weaknesses: 'Kemikler, dişler, dizler, depresyon riski',
      tips: ['Kalsiyum alın', 'Diz egzersizleri', 'Güneş ışığı alın', 'İş-yaşam dengesi']
    },
    nutrition: {
      foods: ['Süt ürünleri', 'Yeşil yapraklı sebzeler', 'Bol protein', 'Zeytin', 'İncir'],
      avoid: ['Aşırı kafein', 'Çok tuz', 'Fast food'],
      tips: 'Düzenli öğün saatleri sizin için önemli. Geleneksel, basit yemekleri seversiniz.'
    },
    career: {
      suits: ['Yöneticilik', 'Mühendislik', 'Muhasebe', 'Mimarlık', 'Politik liderlik', 'İnşaat'],
      strengths: 'Hırs, disiplin, sorumluluk, strateji',
      tips: 'Uzun vadeli kariyer hedefleri koyun. Zirveye ulaşma amacınız var. Otoritesiniz!'
    },
    finance: {
      style: 'Tutumsuz, planlı, uzun vadeli düşünen. Zenginlik hedefi var.',
      tips: ['Emeklilik planı yapın', 'Gayrimenkul yatırımı', 'Kariyer için yatırım', 'Status sembollerine dikkat'],
      lucky: 'Cumartesi günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['İsviçre', 'Almanya', 'Japonya', 'Machu Picchu', 'İskoçya'],
      style: 'Dağlar, tarihi yerler, iş gezileri, prestijli destinasyonlar',
      tips: 'Dağ tatilleri, tarihi kaleler, prestijli oteller tercih edin. İş-tatil kombinasyonları uygun.'
    },
    development: {
      focus: ['Esneklik', 'Eğlence', 'Duygusal ifade', 'İş-yaşam dengesi'],
      books: ['Yedi Gün', 'İş Bitirme Sanatı', 'Zaman Yönetimi'],
      activities: 'Dağcılık, satranç, planlama, hedef belirleme'
    },
    gifts: {
      ideas: ['Prestijli kalem', 'Lüks deri çanta', 'Klasik saat', 'İş kitapları', 'Ofis aksesuarları'],
      colors: 'Siyah, koyu gri, kahverengi'
    }
  },
  'Kova': {
    emoji: '♒',
    health: {
      strengths: 'İnovatif sağlık yaklaşımı, alternatif tedavilere açık',
      weaknesses: 'Ayak bilekleri, bacaklar, dolaşım, sinir sistemi',
      tips: ['Teknolojiden ara verin', 'Sosyalleşin', 'Ayak egzersizleri', 'Alternatif tedaviler deneyin']
    },
    nutrition: {
      foods: ['Antioksidan açısından zengin gıdalar', 'Blueberry', 'Fındık', 'Greyfurt', 'Kinoa'],
      avoid: ['Aşırı işlenmiş gıdalar', 'GMO ürünler', 'Pestisitli yiyecekler'],
      tips: 'Yenilikçi, farklı mutfakları deneyin. Vegan/vejetaryen beslenmeye ilgi duyabilirsiniz.'
    },
    career: {
      suits: ['Teknoloji', 'Bilim', 'İnovasyon', 'Sosyal girişimcilik', 'Ar-Ge', 'Toplumsal değişim'],
      strengths: 'Orijinallik, vizyon, insancıllık, bağımsızlık',
      tips: 'Gelecek odaklı, yenilikçi işler ideal. Topluma fayda sağlayan kariyerler tatmin edici.'
    },
    finance: {
      style: 'Geleneksel olmayan yatırımlar, teknoloji odaklı, bağışlar yaparsınız.',
      tips: ['Kripto para araştırın', 'Teknoloji hisselerine yatırım', 'Sosyal sorumluluk projeleri', 'Bağımsızlık için tasarruf'],
      lucky: 'Cumartesi günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Silikon Vadisi', 'Berlin', 'Tel Aviv', 'Amsterdam', 'Austin'],
      style: 'Teknoloji turları, festival, ekoturizm, farklı kültürler',
      tips: 'Yenilikçi şehirler, teknoloji merkezleri, özgür ruhlu topluluklar tercih edin.'
    },
    development: {
      focus: ['Duygusal bağ kurma', 'Geleneklere saygı', 'İstikrar', 'Yakınlık'],
      books: ['Sapiens', 'Gelecek Şimdi', 'Dijital Minimalizm'],
      activities: 'Teknoloji, sosyal aktiviteler, gönüllülük, inovasyon'
    },
    gifts: {
      ideas: ['Teknolojik gadget', 'Bilim kitapları', 'Yenilikçi ürünler', 'Sosyal proje bağışı', 'Futuristik aksesuar'],
      colors: 'Elektrik mavisi, gümüş, neon renkler'
    }
  },
  'Balık': {
    emoji: '♓',
    health: {
      strengths: 'Sezgisel iyileşme, empatik, holistik yaklaşım',
      weaknesses: 'Ayaklar, bağışıklık sistemi, kaçış eğilimi, bağımlılık riski',
      tips: ['Ayak bakımı', 'Sınır koyun', 'Yalnız kalma zamanları', 'Kaçıştan kaçının']
    },
    nutrition: {
      foods: ['Balık', 'Deniz ürünleri', 'Üzüm', 'Salatalık', 'Su bazlı yiyecekler'],
      avoid: ['Alkol', 'Aşırı şeker', 'Bağımlılık yapıcı maddeler'],
      tips: 'Hafif, sulu yiyecekler tercih edin. Bol su için. Duygusal yemeden kaçının.'
    },
    career: {
      suits: ['Sanat', 'Müzik', 'Fotoğrafçılık', 'Terapi', 'Manevi danışmanlık', 'Sinema'],
      strengths: 'Yaratıcılık, empati, sezgi, ruhaniyet',
      tips: 'Yaratıcı ve manevi işler ideal. İnsanlara şifa veren kariyerler tatmin edici.'
    },
    finance: {
      style: 'Maliyete önem vermez, cömert, bazen pratik değil. Dolandırılma riski.',
      tips: ['Mali danışman edinin', 'Güven problemi olanlardan kaçının', 'Sanatsal yatırımlar', 'Bütçe disiplini'],
      lucky: 'Perşembe günleri mali işlemler için uygundur'
    },
    travel: {
      destinations: ['Bali', 'Hindistan (ashram)', 'Yunanistan adaları', 'Venedik', 'Maldivler'],
      style: 'Manevi, su kenarı, yoga retreat, sanatsal',
      tips: 'Su kenarı, manevi merkezler, sanatsal şehirler tercih edin. Yoga ve meditasyon tatilleri ideal.'
    },
    development: {
      focus: ['Sınır koyma', 'Gerçekçilik', 'Pratiklik', 'Kendini koruma'],
      books: ['Şifa Sanatı', 'Duygusal Sınırlar', 'Ruhun Yolculuğu'],
      activities: 'Yüzme, müzik, sanat, meditasyon, rüya analizi'
    },
    gifts: {
      ideas: ['Sanat malzemeleri', 'Aromaterapi', 'Müzik enstrümanı', 'Manevi kitaplar', 'Deniz kabuğu objeler'],
      colors: 'Deniz yeşili, lavanta, gümüş'
    }
  }
}

// Burç renkleri
const zodiacColors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  'Koç': { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', gradient: 'from-red-500 to-orange-500' },
  'Boğa': { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', gradient: 'from-green-500 to-emerald-500' },
  'İkizler': { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', gradient: 'from-yellow-500 to-amber-500' },
  'Yengeç': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', gradient: 'from-blue-400 to-cyan-400' },
  'Aslan': { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', gradient: 'from-orange-500 to-yellow-500' },
  'Başak': { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', gradient: 'from-amber-500 to-yellow-600' },
  'Terazi': { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700', gradient: 'from-pink-500 to-rose-400' },
  'Akrep': { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', gradient: 'from-purple-600 to-indigo-600' },
  'Yay': { bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-700', gradient: 'from-indigo-500 to-purple-500' },
  'Oğlak': { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', gradient: 'from-gray-600 to-slate-600' },
  'Kova': { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-700', gradient: 'from-cyan-500 to-blue-500' },
  'Balık': { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-700', gradient: 'from-teal-500 to-cyan-400' },
}

export function BurcOnerileri() {
  const [selectedSign, setSelectedSign] = useState('')

  const zodiacSigns = Object.keys(zodiacData)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Home Button */}
      <div className="flex justify-start">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Star className="h-24 w-24 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-red-300" />
            <Sparkles className="h-12 w-12 animate-pulse" />
            <Gift className="h-10 w-10 text-yellow-300" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Burçlara Göre Öneriler</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Sağlık, beslenme, kariyer, finans, seyahat ve kişisel gelişim için burca özel tavsiyeler
          </p>
        </div>
      </div>

      {/* Zodiac Selection Grid */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Burcunuzu Seçin
          </CardTitle>
          <CardDescription>Size özel sağlık, beslenme, kariyer ve yaşam önerileri alın</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {zodiacSigns.map((sign) => {
              const data = zodiacData[sign as keyof typeof zodiacData]
              const colors = zodiacColors[sign]
              const isSelected = selectedSign === sign

              return (
                <button
                  key={sign}
                  onClick={() => setSelectedSign(sign)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? `bg-gradient-to-br ${colors.gradient} text-white border-transparent shadow-lg scale-105` 
                      : `${colors.bg} ${colors.border} ${colors.text} hover:scale-105 hover:shadow-md`
                  }`}
                >
                  <div className="text-center">
                    <span className={`text-3xl block mb-1 ${isSelected ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }}>
                      {data.emoji}
                    </span>
                    <span className="text-sm font-semibold">{sign}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedSign && (
        <Tabs defaultValue="health" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6 h-auto">
            <TabsTrigger value="health" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Sağlık</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Beslenme</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Kariyer</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Finans</span>
            </TabsTrigger>
            <TabsTrigger value="travel" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <Plane className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Seyahat</span>
            </TabsTrigger>
            <TabsTrigger value="development" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Gelişim</span>
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex flex-col sm:flex-row items-center gap-1 py-3">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Hediye</span>
            </TabsTrigger>
          </TabsList>

          {/* Sağlık */}
          <TabsContent value="health">
            <Card className="border-2 border-red-200">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Heart className="h-6 w-6" />
                  Sağlık Önerileri - {selectedSign} {zodiacData[selectedSign as keyof typeof zodiacData].emoji}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">✓ Güçlü Yönler</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].health.strengths}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-700 mb-2">⚠ Hassas Bölgeler</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].health.weaknesses}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">💡 Öneriler</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {zodiacData[selectedSign as keyof typeof zodiacData].health.tips.map((tip, idx) => (
                      <li key={idx} className="text-slate-700">{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Beslenme */}
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-6 w-6 text-orange-500" />
                  Beslenme Önerileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">✓ Önerilen Besinler</h3>
                  <div className="flex flex-wrap gap-2">
                    {zodiacData[selectedSign as keyof typeof zodiacData].nutrition.foods.map((food, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">✗ Kaçınılması Gerekenler</h3>
                  <div className="flex flex-wrap gap-2">
                    {zodiacData[selectedSign as keyof typeof zodiacData].nutrition.avoid.map((food, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">💡 İpuçları</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].nutrition.tips}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kariyer */}
          <TabsContent value="career">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                  Kariyer Önerileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-purple-700 mb-2">🎯 Uygun Meslekler</h3>
                  <div className="flex flex-wrap gap-2">
                    {zodiacData[selectedSign as keyof typeof zodiacData].career.suits.map((career, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">⭐ Güçlü Yönler</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].career.strengths}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">💡 Kariyer İpuçları</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].career.tips}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finans */}
          <TabsContent value="finance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-500" />
                  Finans Önerileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">💰 Finansal Tarzınız</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].finance.style}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">💡 Para Yönetimi İpuçları</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {zodiacData[selectedSign as keyof typeof zodiacData].finance.tips.map((tip, idx) => (
                      <li key={idx} className="text-slate-700">{tip}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-amber-800">🍀 {zodiacData[selectedSign as keyof typeof zodiacData].finance.lucky}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seyahat */}
          <TabsContent value="travel">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-6 w-6 text-sky-500" />
                  Seyahat Önerileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">🌍 Önerilen Destinasyonlar</h3>
                  <div className="flex flex-wrap gap-2">
                    {zodiacData[selectedSign as keyof typeof zodiacData].travel.destinations.map((dest, idx) => (
                      <span key={idx} className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-700 mb-2">✈️ Seyahat Tarzınız</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].travel.style}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">💡 Seyahat İpuçları</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].travel.tips}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kişisel Gelişim */}
          <TabsContent value="development">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  Kişisel Gelişim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-orange-700 mb-2">🎯 Gelişim Alanları</h3>
                  <div className="flex flex-wrap gap-2">
                    {zodiacData[selectedSign as keyof typeof zodiacData].development.focus.map((area, idx) => (
                      <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">📚 Önerilen Kitaplar</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {zodiacData[selectedSign as keyof typeof zodiacData].development.books.map((book, idx) => (
                      <li key={idx} className="text-slate-700">{book}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">🧘 Önerilen Aktiviteler</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].development.activities}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hediye */}
          <TabsContent value="gifts">
            <Card className="border-2 border-pink-200">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  <Gift className="h-6 w-6" />
                  Hediye Önerileri - {selectedSign} {zodiacData[selectedSign as keyof typeof zodiacData].emoji}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <h3 className="font-semibold text-pink-700 mb-2">🎁 Hediye Fikirleri</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {zodiacData[selectedSign as keyof typeof zodiacData].gifts.ideas.map((gift, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg text-center border border-pink-200 hover:shadow-md transition-shadow">
                        <p className="text-pink-800">{gift}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-700 mb-2">🎨 Şanslı Renkler</h3>
                  <p className="text-slate-700">{zodiacData[selectedSign as keyof typeof zodiacData].gifts.colors}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Educational Sections */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Yukarıdaki gridten burcunuzu seçin</p>
            <p>• 7 farklı kategori arasında geçiş yapın (Sağlık, Beslenme, Kariyer vb.)</p>
            <p>• Her kategoride size özel öneriler, güçlü-zayıf yönler ve ipuçları bulun</p>
            <p>• Hediye önerileri bölümünde başkalarına ne alabileceğinizi öğrenin</p>
            <p>• Şanslı renkler ve önerilen aktivitelerle yaşamınızı zenginleştirin</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• <strong>Kariyer değişikliği:</strong> Burcunuza uygun meslekleri keşfedin</p>
            <p>• <strong>Sağlık kontrolü:</strong> Hassas bölgelerinizi öğrenip önlem alın</p>
            <p>• <strong>Diyet planı:</strong> Burca özel besin önerilerini uygulayın</p>
            <p>• <strong>Tatil planı:</strong> Size uygun destinasyonları keşfedin</p>
            <p>• <strong>Hediye alışverişi:</strong> Yakınlarınızın burcuna göre hediye seçin</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Bu öneriler genel astrolojik yorumlara dayanmaktadır</p>
            <p>• Sağlık konularında mutlaka doktora danışın</p>
            <p>• Finansal kararlar için profesyonel danışmanlık alın</p>
            <p>• Güneş burcunuzun yanı sıra ay ve yükselen burcunuz da önemlidir</p>
            <p>• Astroloji rehber niteliğindedir, son karar sizindir</p>
            <p>• Bireysel farklılıklar astrolojik genellemelerden önemlidir</p>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Ateş burçları (Koç, Aslan, Yay) genellikle enerjik ve girişkendir</p>
            <p>• Toprak burçları (Boğa, Başak, Oğlak) pratik ve güvenilirdir</p>
            <p>• Hava burçları (İkizler, Terazi, Kova) sosyal ve iletişim odaklıdır</p>
            <p>• Su burçları (Yengeç, Akrep, Balık) duygusal ve sezgiseldir</p>
            <p>• Karşıt burçlar (örn. Koç-Terazi) birbirini tamamlayabilir</p>
            <p>• Burç elementleri besin tercihlerini bile etkileyebilir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
