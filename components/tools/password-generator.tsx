"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Copy, RefreshCw, Check } from "lucide-react"

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let chars = ""
    let pwd = ""
    
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    if (chars === "") chars = "abcdefghijklmnopqrstuvwxyz"
    
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    setPassword(pwd)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    if (length < 8) return { text: "Zayıf", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
    if (length < 12) return { text: "Orta", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" }
    if (length < 16) return { text: "İyi", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" }
    return { text: "Çok Güçlü", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
  }

  const strength = getStrength()

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-emerald-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Şifre Oluşturucu
            </h2>
            <p className="text-slate-600">Güvenli ve güçlü şifreler oluşturun</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">Uzunluk: {length}</label>
                <span className={`text-sm font-semibold ${strength.color}`}>{strength.text}</span>
              </div>
              <input type="range" min="6" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 mr-3" />
                <span className="text-sm font-medium">Büyük Harf (A-Z)</span>
              </label>
              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 mr-3" />
                <span className="text-sm font-medium">Küçük Harf (a-z)</span>
              </label>
              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 mr-3" />
                <span className="text-sm font-medium">Sayılar (0-9)</span>
              </label>
              <label className="flex items-center p-4 rounded-xl border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 mr-3" />
                <span className="text-sm font-medium">Semboller (!@#$)</span>
              </label>
            </div>

            <Button onClick={generatePassword} className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-600">
              <RefreshCw className="mr-2" /> Yeni Şifre Oluştur
            </Button>

            {password && (
              <div className={`p-6 rounded-2xl border-2 ${strength.bg} ${strength.border} animate-in fade-in`}>
                <div className="flex items-center justify-between gap-4">
                  <code className={`text-2xl font-mono font-bold ${strength.color} break-all`}>{password}</code>
                  <Button onClick={copyToClipboard} variant="outline" size="icon" className="h-12 w-12 flex-shrink-0">
                    {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
