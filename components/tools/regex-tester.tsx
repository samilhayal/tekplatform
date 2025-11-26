"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Code2, Check, X } from "lucide-react"

export function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testString, setTestString] = useState("")
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState("")

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags)
      const found = testString.match(regex)
      setMatches(found || [])
      setError("")
    } catch (err: any) {
      setError(err.message)
      setMatches([])
    }
  }

  const examples = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", test: "test@example.com" },
    { name: "Telefon", pattern: "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}", test: "+90 555 123 4567" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", test: "https://example.com" },
    { name: "IP Adresi", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b", test: "192.168.1.1" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-2 border-violet-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg mb-4">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Regex Test Aracı
            </h2>
            <p className="text-slate-600">Regular expression test ve örnekler</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Regex Pattern</label>
              <div className="flex gap-3">
                <span className="text-2xl text-slate-400">/</span>
                <Input value={pattern} onChange={(e) => setPattern(e.target.value)} className="h-14 font-mono" placeholder="[a-z]+" />
                <span className="text-2xl text-slate-400">/</span>
                <Input value={flags} onChange={(e) => setFlags(e.target.value)} className="h-14 w-24 font-mono" placeholder="g" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Flags: g (global), i (case-insensitive), m (multiline)</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Test Metni</label>
              <Textarea value={testString} onChange={(e) => setTestString(e.target.value)}
                className="min-h-32" placeholder="Test edilecek metni girin..." />
            </div>

            <Button onClick={testRegex} className="w-full h-14 bg-gradient-to-r from-violet-500 to-purple-600">
              <Code2 className="mr-2" /> Test Et
            </Button>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 flex items-start gap-3">
                <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">Hata</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {matches.length > 0 && (
              <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">{matches.length} Eşleşme Bulundu</span>
                </div>
                <div className="space-y-2">
                  {matches.map((match, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg border border-green-200">
                      <code className="text-sm font-mono text-green-700">{match}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Örnek Patternler</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {examples.map(ex => (
                  <button key={ex.name} onClick={() => { setPattern(ex.pattern); setTestString(ex.test) }}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-left transition">
                    <p className="font-semibold text-slate-700 mb-1">{ex.name}</p>
                    <code className="text-xs font-mono text-slate-500 break-all">{ex.pattern}</code>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
