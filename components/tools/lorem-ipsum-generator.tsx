"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Copy, Check } from "lucide-react"

export function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3)
  const [words, setWords] = useState(50)
  const [generated, setGenerated] = useState("")
  const [copied, setCopied] = useState(false)

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
  ]

  const generateParagraphs = () => {
    let result = ""
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = ""
      const wordsInPara = Math.floor(Math.random() * 30) + words
      for (let j = 0; j < wordsInPara; j++) {
        const word = loremWords[Math.floor(Math.random() * loremWords.length)]
        paragraph += (j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " "
      }
      result += paragraph.trim() + ".\n\n"
    }
    setGenerated(result)
  }

  const generateWords = () => {
    let result = ""
    for (let i = 0; i < words; i++) {
      const word = loremWords[Math.floor(Math.random() * loremWords.length)]
      result += (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " "
    }
    setGenerated(result.trim() + ".")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-amber-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Lorem Ipsum Generator
            </h2>
            <p className="text-slate-600">Placeholder metin oluşturucu</p>
          </div>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Paragraf Sayısı</label>
                <Input type="number" min="1" max="20" value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} className="h-14" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Kelime Sayısı (Ortalama)</label>
                <Input type="number" min="10" max="200" value={words} onChange={(e) => setWords(Number(e.target.value))} className="h-14" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Button onClick={generateParagraphs} className="h-14 bg-gradient-to-r from-amber-500 to-orange-600">
                <FileText className="mr-2" /> Paragraf Oluştur
              </Button>
              <Button onClick={generateWords} variant="outline" className="h-14">
                Kelime Oluştur
              </Button>
            </div>

            {generated && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700">Oluşturulan Metin</label>
                  <Button onClick={copyToClipboard} variant="ghost" size="sm">
                    {copied ? <Check className="h-4 w-4 text-green-600 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Kopyalandı" : "Kopyala"}
                  </Button>
                </div>
                <Textarea value={generated} readOnly className="min-h-96 bg-amber-50" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
