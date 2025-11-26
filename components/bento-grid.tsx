"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from 'next-intl'
import Link from "next/link"
import { tools as localTools } from "@/lib/tools-data"
import { 
  Calculator, ArrowLeftRight, Clock, Expand, Type, Timer, Dice5,
  TrendingUp, Percent, PiggyBank, Ruler, Weight, Thermometer,
  CaseSensitive, Radio, Shuffle, AtSign, Coins, Spade, Disc,
  Banknote, Landmark, BadgeMinus, ArrowUp, BarChart, Hash, Binary,
  Heart, Activity, Target, Flame, Baby, Calendar, Cigarette, Cake,
  Briefcase, CalendarDays, DollarSign, Users, FileText, Scissors, Image, FileImage, Minimize2, Edit,
  GraduationCap, Award, FileJson, FileCode, FileSpreadsheet, FileCode2, Palette,
  Sun, Stars, Sunrise, Sparkles, Moon, Home, MapPin, Receipt, Shirt, Wallet, Star
} from "lucide-react"
import { cn, getCategoryKey } from "@/lib/utils"

interface Tool {
  id: string
  title: string
  description: string
  category: string
  icon: string
  href: string
  keywords: string[]
  isActive: boolean
}

const iconMap: Record<string, any> = {
  Calculator, ArrowLeftRight, Clock, Expand, Type, Timer, Dice5,
  TrendingUp, Percent, PiggyBank, Ruler, Weight, Thermometer,
  CaseSensitive, Radio, Shuffle, AtSign, Coins, Spade, Disc,
  Banknote, Landmark, BadgeMinus, ArrowUp, BarChart, Hash, Binary,
  Heart, Activity, Target, Flame, Baby, Calendar, Cigarette, Cake,
  Briefcase, CalendarDays, DollarSign, Users, FileText, Scissors, Image, FileImage, Minimize2, Edit,
  GraduationCap, Award, FileJson, FileCode, FileSpreadsheet, FileCode2, Palette,
  Sun, Stars, Sunrise, Sparkles, Moon, Home, MapPin, Receipt, Shirt, Wallet, Star
}

export function BentoGrid() {
  const locale = useLocale()
  const t = useTranslations('home')
  const tTools = useTranslations('tools')
  const tCategories = useTranslations('home.categories')
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [popularTools, setPopularTools] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/homepage')
        const data = await response.json()
        
        if (data.success) {
          if (data.tools && data.tools.length > 0) {
            setTools(data.tools)
          } else {
            setTools(localTools.map(t => ({ ...t, isActive: true })))
          }
          
          // Eğer API'den aktif kategoriler geldiyse onları kullan
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories)
          } else if (data.tools && data.tools.length > 0) {
            // Aktif araçların kategorilerinden unique liste oluştur
            const uniqueCategories = [...new Set(data.tools.map((t: Tool) => t.category))] as string[]
            setCategories(uniqueCategories)
          }
          
          if (data.popularTools) {
            setPopularTools(data.popularTools)
          }
        } else {
          setTools(localTools.map(t => ({ ...t, isActive: true })))
        }
      } catch (error) {
        console.error('Error loading homepage data:', error)
        setTools(localTools.map(t => ({ ...t, isActive: true })))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Sadece aktif kategorilere ait araçları filtrele
  const filteredTools = tools.filter(tool => {
    const isInActiveCategory = categories.includes(tool.category)
    if (selectedCategory === "all") {
      return isInActiveCategory
    }
    return tool.category === selectedCategory
  })

  const sortedTools = [...filteredTools].sort((a, b) => {
    const aPopular = popularTools.includes(a.id)
    const bPopular = popularTools.includes(b.id)
    if (aPopular && !bPopular) return -1
    if (!aPopular && bPopular) return 1
    return 0
  })

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {!loading && (
        <>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
              )}
            >
              {t('allTools')}
            </button>
            {categories.map((category) => {
              const categoryKey = getCategoryKey(category)
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
                    selectedCategory === category
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                  )}
                >
                  {tCategories(categoryKey)}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {sortedTools.map((tool, index) => {
              const Icon = iconMap[tool.icon]
              const isLarge = index % 7 === 0 || index % 7 === 3
              const isPopular = popularTools.includes(tool.id)
              
              return (
                <Link
                  key={tool.id}
                  href={`/${locale}${tool.href}`}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-1 block w-full min-h-[200px] border-slate-200",
                    isLarge && "sm:col-span-2"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-br from-pink-200/30 to-indigo-200/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex flex-col h-full min-h-[180px]">
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/50 group-hover:shadow-indigo-500/60">
                        {Icon && <Icon className="h-7 w-7 text-white" />}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full whitespace-nowrap border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                        {tCategories(getCategoryKey(tool.category))}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                      {tTools.has(`${tool.id}.title`) ? tTools(`${tool.id}.title`) : tool.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-slate-600 flex-1 mb-4 leading-relaxed">
                      {tTools.has(`${tool.id}.description`) ? tTools(`${tool.id}.description`) : tool.description}
                    </p>

                    <div className="flex items-center text-sm sm:text-base font-semibold text-indigo-600 mt-auto group-hover:text-indigo-700 transition-colors">
                      <span className="mr-2">{t('useTool')}</span>
                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
