"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { Command } from "cmdk"
import { Search, Calculator, ArrowLeftRight, Clock, Expand, Type, Timer, Dice5,
  TrendingUp, Percent, PiggyBank, Ruler, Weight, Thermometer,
  CaseSensitive, Radio, Shuffle, AtSign, Coins, Spade, Disc,
  Banknote, Landmark, BadgeMinus, ArrowUp, BarChart, Hash, Binary,
  Heart, Activity, Target, Flame, Baby, Calendar, Cigarette, Cake,
  Briefcase, CalendarDays, DollarSign, Sparkles, TrendingDown, Users, FileText, Scissors, Image, FileImage, Minimize2, Edit,
  GraduationCap, Award } from "lucide-react"
import { tools as localTools } from "@/lib/tools-data"
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
  Calculator,
  ArrowLeftRight,
  Clock,
  Expand,
  Type,
  Timer,
  Dice5,
  TrendingUp,
  Percent,
  PiggyBank,
  Ruler,
  Weight,
  Thermometer,
  CaseSensitive,
  Radio,
  Shuffle,
  AtSign,
  Coins,
  Spade,
  Disc,
  Banknote,
  Landmark,
  BadgeMinus,
  ArrowUp,
  BarChart,
  Hash,
  Binary,
  Heart,
  Activity,
  Target,
  Flame,
  Baby,
  Calendar,
  Cigarette,
  Cake,
  Briefcase,
  CalendarDays,
  DollarSign,
  Sparkles,
  TrendingDown,
  Users,
  FileText,
  Scissors,
  Image,
  FileImage,
  Minimize2,
  Edit,
  GraduationCap,
  Award,
}

export function CommandPalette() {
  const locale = useLocale()
  const t = useTranslations('common')
  const tTools = useTranslations('tools')
  const tCategories = useTranslations('home.categories')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [tools, setTools] = useState<Tool[]>([])
  const [popularToolIds, setPopularToolIds] = useState<string[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const router = useRouter()

  // Load tools and popular tools from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/homepage')
        const data = await response.json()
        
        if (data.success) {
          // Only active tools from Firestore
          if (data.tools && data.tools.length > 0) {
            setTools(data.tools)
          } else {
            // Fallback to local tools (all active)
            setTools(localTools.map(t => ({ ...t, isActive: true })))
          }
          
          // Popular tools from admin settings
          if (data.popularTools && data.popularTools.length > 0) {
            setPopularToolIds(data.popularTools)
          }
        } else {
          setTools(localTools.map(t => ({ ...t, isActive: true })))
        }
      } catch (error) {
        console.error('Error loading tools:', error)
        setTools(localTools.map(t => ({ ...t, isActive: true })))
      } finally {
        setDataLoaded(true)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    setSearch("")
    router.push(`/${locale}${href}`)
  }

  // Filter tools based on search - only active tools are in the list already
  const filteredTools = search.length > 0 
    ? tools.filter(tool => {
        const searchLower = search.toLowerCase()
        return (
          tool.title.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
        )
      })
    : tools.filter(tool => popularToolIds.includes(tool.id))

  // Group filtered tools by category
  const groupedTools: Record<string, typeof tools> = {}
  filteredTools.forEach(tool => {
    if (!groupedTools[tool.category]) {
      groupedTools[tool.category] = []
    }
    groupedTools[tool.category].push(tool)
  })

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 sm:gap-3 rounded-xl border-2 border-slate-300 bg-gradient-to-r from-white via-slate-50 to-white px-3 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm text-slate-600 transition-all hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02] w-full group"
      >
        <div className="p-1 sm:p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-110 transition-transform">
          <Search className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        <span className="font-semibold group-hover:text-indigo-700 transition-colors flex-1 text-left">{t('searchTools')}</span>
        <kbd className="hidden sm:inline-flex pointer-events-none h-7 select-none items-center gap-1 rounded-lg border-2 border-slate-300 bg-gradient-to-b from-white to-slate-100 px-2.5 font-mono text-xs font-bold text-slate-700 shadow-md group-hover:border-indigo-300 group-hover:shadow-lg transition-all">
          <span className="text-sm">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200" 
          onClick={() => setOpen(false)}
        >
          <div className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <Command
              className="rounded-3xl border-2 border-indigo-300/50 bg-white shadow-2xl shadow-indigo-900/30 overflow-hidden backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
              shouldFilter={false}
            >
              {/* Header with gradient */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
                <div className="relative flex items-center border-b-2 border-slate-100 px-4 sm:px-6 bg-white/80 backdrop-blur-sm">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mr-2 sm:mr-3 shadow-lg shadow-indigo-500/50">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder={t('searchTools')}
                    className="flex h-14 sm:h-16 w-full bg-transparent py-3 sm:py-4 text-sm sm:text-base font-medium outline-none placeholder:text-slate-400"
                    autoFocus
                  />
                  <kbd className="ml-2 sm:ml-3 pointer-events-none inline-flex h-6 sm:h-7 select-none items-center gap-1 rounded-lg border border-slate-300 bg-slate-100 px-1.5 sm:px-2 font-mono text-xs font-semibold text-slate-600">
                    ESC
                  </kbd>
                </div>
              </div>

              <Command.List className="max-h-[60vh] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-b from-white to-slate-50/50">
                <Command.Empty className="py-8 sm:py-12 text-center">
                  <div className="flex flex-col items-center gap-3 sm:gap-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-slate-700 mb-1">{t('noToolsFound')}</p>
                      <p className="text-xs sm:text-sm text-slate-500">{t('tryDifferentSearch')}</p>
                    </div>
                  </div>
                </Command.Empty>

                {search.length === 0 && (
                  <div className="px-3 sm:px-4 py-2 mb-3 text-xs font-semibold text-indigo-700 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>{t('popularTools')}</span>
                  </div>
                )}

                {Object.entries(groupedTools).map(([category, categoryTools]) => (
                  <Command.Group key={category} className="mb-3 sm:mb-4">
                    {search.length > 0 && (
                      <div className="px-3 sm:px-4 py-2 mb-2 sm:mb-3 text-xs font-bold text-indigo-700 uppercase tracking-wider bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-xl border border-indigo-100">
                        {tCategories(getCategoryKey(category))}
                      </div>
                    )}
                    <div className="space-y-1.5 sm:space-y-2">
                      {categoryTools.map((tool) => {
                        const Icon = iconMap[tool.icon]
                        return (
                          <Command.Item
                            key={tool.id}
                            value={tool.id}
                            onSelect={() => handleSelect(tool.href)}
                            className={cn(
                              "relative flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 cursor-pointer transition-all duration-200 group",
                              "hover:bg-gradient-to-r hover:from-indigo-50 hover:via-purple-50 hover:to-pink-50",
                              "hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02]",
                              "aria-selected:bg-gradient-to-r aria-selected:from-indigo-50 aria-selected:via-purple-50 aria-selected:to-pink-50",
                              "aria-selected:shadow-lg aria-selected:shadow-indigo-500/20 aria-selected:scale-[1.02]",
                              "border-2 border-transparent hover:border-indigo-200 aria-selected:border-indigo-200"
                            )}
                          >
                            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/40 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                              {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-slate-900 truncate text-sm sm:text-base mb-0.5 group-hover:text-indigo-700 transition-colors">
                                {tTools.has(`${tool.id}.title`) ? tTools(`${tool.id}.title`) : tool.title}
                              </div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate group-hover:text-slate-700">
                                {tTools.has(`${tool.id}.description`) ? tTools(`${tool.id}.description`) : tool.description}
                              </div>
                            </div>
                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 transition-opacity">
                              <div className="p-1.5 sm:p-2 rounded-lg bg-white/80 shadow-sm">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </Command.Item>
                        )
                      })}
                    </div>
                  </Command.Group>
                ))}
              </Command.List>

              {/* Footer tip */}
              <div className="border-t-2 border-slate-100 px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-slate-50 to-indigo-50/30">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="hidden sm:flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono font-semibold">↑</kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono font-semibold">↓</kbd>
                      <span className="text-slate-500">{t('navigate')}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-2 py-0.5 rounded bg-white border border-slate-300 font-mono font-semibold text-xs">Enter</kbd>
                      <span className="text-slate-500">{t('select')}</span>
                    </span>
                  </div>
                  <span className="text-slate-500">
                    <span className="font-semibold text-indigo-600">{filteredTools.length}</span> {t('tools')}
                  </span>
                </div>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}
