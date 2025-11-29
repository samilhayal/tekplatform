'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  DollarSign,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Database,
  Wrench,
  FolderTree,
  Star,
  Coins,
  Calculator,
  Home,
  MapPin,
  Clock,
  Shirt,
  Sun,
  Briefcase,
  Baby
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Ana menü öğeleri
const mainNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'İstatistikler', href: '/admin/statistics', icon: BarChart3 },
]

// Yönetim menü grupları
const managementGroups = [
  {
    title: 'Araç Yönetimi',
    icon: Wrench,
    items: [
      { name: 'Araçlar', href: '/admin/tools', icon: Settings },
      { name: 'Kategoriler', href: '/admin/categories', icon: FolderTree },
    ]
  },
  {
    title: 'İçerik Yönetimi',
    icon: Star,
    items: [
      { name: 'Burç Yorumları', href: '/admin/horoscopes', icon: Sun },
      { name: 'Fiyatlar (Altın/Döviz)', href: '/admin/prices', icon: Coins },
    ]
  },
  {
    title: 'Hesaplama Ayarları',
    icon: Calculator,
    items: [
      { name: 'Maaş Ayarları', href: '/admin/salary-settings', icon: DollarSign },
      { name: 'İş Değişikliği', href: '/admin/job-change-settings', icon: Briefcase },
      { name: 'Tapu & Rayiç', href: '/admin/tapu-settings', icon: Home },
      { name: 'Emeklilik Ayarları', href: '/admin/retirement-settings', icon: Clock },
      { name: 'Marka Bedenleri', href: '/admin/brands', icon: Shirt },
      { name: 'WHO Büyüme Verileri', href: '/admin/who-growth-settings', icon: Baby },
    ]
  }
]

// Diğer menü öğeleri
const otherNavigation = [
  { name: 'Geri Bildirimler', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Database Başlat', href: '/admin/init-database', icon: Database, badge: 'Kurulum' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Araç Yönetimi', 'İçerik Yönetimi', 'Hesaplama Ayarları'])

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('admin_authenticated')
    
    if (pathname === '/admin/login') {
      setIsLoading(false)
      return
    }

    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [pathname, router])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    sessionStorage.removeItem('admin_username')
    router.push('/admin/login')
  }

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    )
  }

  // If on login page, render without layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const username = sessionStorage.getItem('admin_username') || 'Admin'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-slate-400 mt-1">Hoş geldiniz, {username}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {/* Ana Menü */}
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              )
            })}

            {/* Yönetim Grupları */}
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Yönetim</p>
              
              {managementGroups.map((group) => {
                const isExpanded = expandedGroups.includes(group.title)
                const hasActiveItem = group.items.some(item => pathname === item.href)
                const GroupIcon = group.icon

                return (
                  <div key={group.title} className="mb-1">
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                        hasActiveItem 
                          ? 'bg-slate-700/70 text-white' 
                          : 'text-slate-400 hover:bg-slate-700/30 hover:text-white'
                      }`}
                    >
                      <GroupIcon className="h-4 w-4" />
                      <span className="font-medium text-sm">{group.title}</span>
                      <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-4">
                        {group.items.map((item) => {
                          const isActive = pathname === item.href
                          const Icon = item.icon

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsSidebarOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                                isActive
                                  ? 'bg-purple-600/80 text-white'
                                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Diğer Menü */}
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Diğer</p>
              
              {otherNavigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-700">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-red-600 hover:border-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-72 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
