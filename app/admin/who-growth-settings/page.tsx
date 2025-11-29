"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Baby,
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertCircle,
  CheckCircle2,
  Info,
  Ruler,
  Scale,
  Brain,
  Edit,
  Trash2
} from "lucide-react"
import { 
  boyErkekLMS, 
  boyKizLMS, 
  kiloErkekLMS, 
  kiloKizLMS, 
  basCevresiErkekLMS, 
  basCevresiKizLMS 
} from "@/lib/who-growth-data"

interface LMSValue {
  L: number;
  M: number;
  S: number;
}

interface LMSTable {
  [ay: string]: LMSValue;
}

export default function WHOGrowthSettingsPage() {
  const [aktifTab, setAktifTab] = useState<'boy' | 'kilo' | 'basCevresi'>('boy')
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kiz'>('erkek')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [kaydediliyor, setKaydediliyor] = useState(false)
  const [mesaj, setMesaj] = useState<{ tip: 'basarili' | 'hata'; text: string } | null>(null)
  
  // Düzenleme state'i
  const [duzenlemeModu, setDuzenlemeModu] = useState<number | null>(null)
  const [duzenlenenDeger, setDuzenlenenDeger] = useState<LMSValue | null>(null)
  
  // Firestore'dan yüklenen veriler
  const [firestoreVerileri, setFirestoreVerileri] = useState<{
    boy: { erkek: LMSTable; kiz: LMSTable };
    kilo: { erkek: LMSTable; kiz: LMSTable };
    basCevresi: { erkek: LMSTable; kiz: LMSTable };
  } | null>(null)

  // Varsayılan verileri al
  const varsayilanVeri = (): LMSTable => {
    if (aktifTab === 'boy') {
      return cinsiyet === 'erkek' ? boyErkekLMS : boyKizLMS
    } else if (aktifTab === 'kilo') {
      return cinsiyet === 'erkek' ? kiloErkekLMS : kiloKizLMS
    } else {
      return cinsiyet === 'erkek' ? basCevresiErkekLMS : basCevresiKizLMS
    }
  }

  // Mevcut veriyi al (Firestore veya varsayılan)
  const mevcutVeri = (): LMSTable => {
    if (firestoreVerileri) {
      return firestoreVerileri[aktifTab][cinsiyet]
    }
    return varsayilanVeri()
  }

  // Verileri Firestore'dan yükle
  const verileriYukle = async () => {
    setYukleniyor(true)
    try {
      const res = await fetch('/api/admin/who-growth-data')
      if (res.ok) {
        const data = await res.json()
        if (data.data) {
          setFirestoreVerileri(data.data)
          setMesaj({ tip: 'basarili', text: 'Veriler başarıyla yüklendi' })
        } else {
          // Firestore'da veri yoksa varsayılanları kullan
          setFirestoreVerileri(null)
          setMesaj({ tip: 'basarili', text: 'Varsayılan WHO verileri kullanılıyor' })
        }
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
      setMesaj({ tip: 'hata', text: 'Veriler yüklenemedi' })
    } finally {
      setYukleniyor(false)
    }
  }

  // Verileri Firestore'a kaydet
  const verileriKaydet = async () => {
    setKaydediliyor(true)
    try {
      const kaydedilecekVeri = {
        boy: {
          erkek: firestoreVerileri?.boy?.erkek || boyErkekLMS,
          kiz: firestoreVerileri?.boy?.kiz || boyKizLMS
        },
        kilo: {
          erkek: firestoreVerileri?.kilo?.erkek || kiloErkekLMS,
          kiz: firestoreVerileri?.kilo?.kiz || kiloKizLMS
        },
        basCevresi: {
          erkek: firestoreVerileri?.basCevresi?.erkek || basCevresiErkekLMS,
          kiz: firestoreVerileri?.basCevresi?.kiz || basCevresiKizLMS
        }
      }

      const res = await fetch('/api/admin/who-growth-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kaydedilecekVeri)
      })

      if (res.ok) {
        setMesaj({ tip: 'basarili', text: 'Veriler başarıyla kaydedildi' })
        setFirestoreVerileri(kaydedilecekVeri)
      } else {
        throw new Error('Kaydetme hatası')
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      setMesaj({ tip: 'hata', text: 'Veriler kaydedilemedi' })
    } finally {
      setKaydediliyor(false)
    }
  }

  // Varsayılana sıfırla
  const varsayilanaGeriDon = () => {
    if (confirm('Bu işlem tüm özel değişiklikleri silecektir. Devam etmek istiyor musunuz?')) {
      setFirestoreVerileri(null)
      setMesaj({ tip: 'basarili', text: 'Varsayılan WHO verilerine geri dönüldü' })
    }
  }

  // Tek bir değeri güncelle
  const degerGuncelle = (ay: number, yeniDeger: LMSValue) => {
    const guncelVeri = firestoreVerileri ? { ...firestoreVerileri } : {
      boy: { erkek: { ...boyErkekLMS }, kiz: { ...boyKizLMS } },
      kilo: { erkek: { ...kiloErkekLMS }, kiz: { ...kiloKizLMS } },
      basCevresi: { erkek: { ...basCevresiErkekLMS }, kiz: { ...basCevresiKizLMS } }
    }
    
    guncelVeri[aktifTab][cinsiyet] = {
      ...guncelVeri[aktifTab][cinsiyet],
      [ay]: yeniDeger
    }
    
    setFirestoreVerileri(guncelVeri)
    setDuzenlemeModu(null)
    setDuzenlenenDeger(null)
  }

  // JSON olarak dışa aktar
  const jsonOlarakDisaAktar = () => {
    const veri = mevcutVeri()
    const blob = new Blob([JSON.stringify(veri, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `who-${aktifTab}-${cinsiyet}-lms.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Sayfa yüklendiğinde verileri al
  useEffect(() => {
    verileriYukle()
  }, [])

  // Mesajı 3 saniye sonra temizle
  useEffect(() => {
    if (mesaj) {
      const timer = setTimeout(() => setMesaj(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [mesaj])

  const veri = mevcutVeri()
  const aylar = Object.keys(veri).map(Number).sort((a, b) => a - b)

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Baby className="h-6 w-6 text-pink-500" />
            WHO Büyüme Verileri Ayarları
          </h1>
          <p className="text-slate-600 mt-1">
            Bebek gelişim hesaplayıcı için WHO LMS persentil tablolarını yönetin
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={verileriYukle}
            disabled={yukleniyor}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${yukleniyor ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          <Button
            onClick={verileriKaydet}
            disabled={kaydediliyor}
            className="bg-pink-500 hover:bg-pink-600"
          >
            <Save className={`h-4 w-4 mr-2 ${kaydediliyor ? 'animate-spin' : ''}`} />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Mesaj */}
      {mesaj && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          mesaj.tip === 'basarili' ? 'bg-green-50 text-green-700 border border-green-200' : 
          'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {mesaj.tip === 'basarili' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          {mesaj.text}
        </div>
      )}

      {/* Bilgi Kartı */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">WHO LMS Parametreleri Hakkında</p>
              <p>
                <strong>L (Lambda):</strong> Çarpıklık parametresi - veri dağılımının simetrikliğini belirler.<br />
                <strong>M (Mu):</strong> Medyan değer - o yaştaki ortalama (50. persentil) değeri.<br />
                <strong>S (Sigma):</strong> Varyasyon katsayısı - değerlerin ne kadar yayıldığını gösterir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seçim ve İşlemler */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Ölçüm Tipi */}
            <div className="flex-1 min-w-[200px]">
              <Label className="mb-2 block">Ölçüm Tipi</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={aktifTab === 'boy' ? 'default' : 'outline'}
                  onClick={() => setAktifTab('boy')}
                  className={aktifTab === 'boy' ? 'bg-blue-500' : ''}
                >
                  <Ruler className="h-4 w-4 mr-1" /> Boy
                </Button>
                <Button
                  size="sm"
                  variant={aktifTab === 'kilo' ? 'default' : 'outline'}
                  onClick={() => setAktifTab('kilo')}
                  className={aktifTab === 'kilo' ? 'bg-green-500' : ''}
                >
                  <Scale className="h-4 w-4 mr-1" /> Kilo
                </Button>
                <Button
                  size="sm"
                  variant={aktifTab === 'basCevresi' ? 'default' : 'outline'}
                  onClick={() => setAktifTab('basCevresi')}
                  className={aktifTab === 'basCevresi' ? 'bg-purple-500' : ''}
                >
                  <Brain className="h-4 w-4 mr-1" /> Baş Çevresi
                </Button>
              </div>
            </div>

            {/* Cinsiyet */}
            <div className="flex-1 min-w-[200px]">
              <Label className="mb-2 block">Cinsiyet</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={cinsiyet === 'erkek' ? 'default' : 'outline'}
                  onClick={() => setCinsiyet('erkek')}
                  className={cinsiyet === 'erkek' ? 'bg-blue-500' : ''}
                >
                  👦 Erkek
                </Button>
                <Button
                  size="sm"
                  variant={cinsiyet === 'kiz' ? 'default' : 'outline'}
                  onClick={() => setCinsiyet('kiz')}
                  className={cinsiyet === 'kiz' ? 'bg-pink-500' : ''}
                >
                  👧 Kız
                </Button>
              </div>
            </div>

            {/* İşlemler */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={jsonOlarakDisaAktar}>
                <Download className="h-4 w-4 mr-1" /> JSON İndir
              </Button>
              <Button variant="outline" size="sm" onClick={varsayilanaGeriDon}>
                <RefreshCw className="h-4 w-4 mr-1" /> Varsayılana Dön
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Veri Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {aktifTab === 'boy' ? <Ruler className="h-5 w-5 text-blue-500" /> :
             aktifTab === 'kilo' ? <Scale className="h-5 w-5 text-green-500" /> :
             <Brain className="h-5 w-5 text-purple-500" />}
            {aktifTab === 'boy' ? 'Boy' : aktifTab === 'kilo' ? 'Kilo' : 'Baş Çevresi'} LMS Değerleri
            <Badge variant="outline" className={cinsiyet === 'erkek' ? 'bg-blue-100' : 'bg-pink-100'}>
              {cinsiyet === 'erkek' ? '👦 Erkek' : '👧 Kız'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-3 text-left font-semibold">Ay</th>
                  <th className="p-3 text-center font-semibold">L (Lambda)</th>
                  <th className="p-3 text-center font-semibold">M (Medyan)</th>
                  <th className="p-3 text-center font-semibold">S (Sigma)</th>
                  <th className="p-3 text-center font-semibold w-24">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {aylar.map((ay) => {
                  const deger = veri[ay]
                  const isDuzenleme = duzenlemeModu === ay

                  return (
                    <tr key={ay} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">
                        {ay} ay
                        {ay >= 12 && (
                          <span className="text-slate-400 text-xs ml-1">
                            ({Math.floor(ay / 12)} yıl {ay % 12 > 0 ? `${ay % 12} ay` : ''})
                          </span>
                        )}
                      </td>
                      {isDuzenleme ? (
                        <>
                          <td className="p-2">
                            <Input
                              type="number"
                              step="0.0001"
                              value={duzenlenenDeger?.L ?? deger.L}
                              onChange={(e) => setDuzenlenenDeger(prev => ({
                                ...prev!,
                                L: parseFloat(e.target.value) || 0
                              }))}
                              className="text-center h-8"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={duzenlenenDeger?.M ?? deger.M}
                              onChange={(e) => setDuzenlenenDeger(prev => ({
                                ...prev!,
                                M: parseFloat(e.target.value) || 0
                              }))}
                              className="text-center h-8"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              step="0.00001"
                              value={duzenlenenDeger?.S ?? deger.S}
                              onChange={(e) => setDuzenlenenDeger(prev => ({
                                ...prev!,
                                S: parseFloat(e.target.value) || 0
                              }))}
                              className="text-center h-8"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex gap-1 justify-center">
                              <Button 
                                size="sm" 
                                variant="default"
                                className="h-7 bg-green-500 hover:bg-green-600"
                                onClick={() => duzenlenenDeger && degerGuncelle(ay, duzenlenenDeger)}
                              >
                                <CheckCircle2 className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="h-7"
                                onClick={() => {
                                  setDuzenlemeModu(null)
                                  setDuzenlenenDeger(null)
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 text-center font-mono">{deger.L}</td>
                          <td className="p-3 text-center font-mono text-blue-600 font-semibold">{deger.M}</td>
                          <td className="p-3 text-center font-mono">{deger.S}</td>
                          <td className="p-3 text-center">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-7"
                              onClick={() => {
                                setDuzenlemeModu(ay)
                                setDuzenlenenDeger(deger)
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Açıklama */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Dikkat</p>
              <p>
                Bu veriler Dünya Sağlık Örgütü (WHO) tarafından belirlenen standart değerlerdir. 
                Değişiklik yapılması önerilmez. Sadece resmi WHO güncellemeleri için düzenleme yapılmalıdır.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
