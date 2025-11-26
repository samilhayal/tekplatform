import Link from 'next/link'
import { tools } from '@/lib/tools-data'
import { ArrowRight } from 'lucide-react'

interface RelatedToolsProps {
  currentToolId: string
  category?: string
  maxItems?: number
}

export function RelatedTools({ currentToolId, category, maxItems = 6 }: RelatedToolsProps) {
  // Find related tools from the same category
  let relatedTools = tools.filter(tool => 
    tool.id !== currentToolId && 
    (category ? tool.category === category : true)
  )

  // If we don't have enough tools from the same category, add popular tools
  if (relatedTools.length < maxItems) {
    const popularTools = tools.filter(tool => 
      tool.id !== currentToolId && 
      !relatedTools.find(rt => rt.id === tool.id)
    )
    relatedTools = [...relatedTools, ...popularTools].slice(0, maxItems)
  } else {
    relatedTools = relatedTools.slice(0, maxItems)
  }

  if (relatedTools.length === 0) return null

  return (
    <div className="mt-12 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl p-8 border-2 border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          İlgili Araçlar
        </h2>
        <Link 
          href="/"
          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1 group"
        >
          Tümünü Gör
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:from-indigo-500 group-hover:to-purple-600 transition-all">
                <div className="h-5 w-5 text-indigo-600 group-hover:text-white transition-colors">
                  {/* Icon placeholder - in real app, use actual icon */}
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {tool.description}
                </p>
                <span className="inline-block mt-2 text-xs text-indigo-600 font-medium">
                  {tool.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
