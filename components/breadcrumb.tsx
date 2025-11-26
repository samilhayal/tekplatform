import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Ana Sayfa</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              {isLast ? (
                <span className="text-slate-900 font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
