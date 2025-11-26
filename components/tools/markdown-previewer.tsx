"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Eye } from "lucide-react"
import ReactMarkdown from "react-markdown"

export function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Markdown Başlık

## Alt Başlık

**Kalın metin** ve *italik metin*

### Liste
- Öğe 1
- Öğe 2
- Öğe 3

### Numaralı Liste
1. Birinci
2. İkinci
3. Üçüncü

### Kod Bloğu
\`\`\`javascript
function merhaba() {
  console.log("Merhaba Dünya!");
}
\`\`\`

### Bağlantı
[Google](https://google.com)

### Alıntı
> Bu bir alıntıdır.`)

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border-2 border-slate-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent mb-2">
              Markdown Önizleyici
            </h2>
            <p className="text-slate-600">Canlı markdown düzenleyici ve önizleme</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="h-4 w-4" />
                <span>Markdown</span>
              </div>
              <Textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[600px] font-mono text-sm" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Eye className="h-4 w-4" />
                <span>Önizleme</span>
              </div>
              <div className="min-h-[600px] p-6 rounded-xl border-2 border-slate-200 bg-white overflow-auto prose prose-slate max-w-none">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
