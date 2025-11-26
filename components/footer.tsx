import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
                Tek Platform
              </h3>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              İhtiyacınız olan tüm online araçlar bir arada. Finans hesaplamalarından metin işlemeye, 
              birim dönüştürmeden tasarım araçlarına kadar tamamen ücretsiz!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg group"
              >
                <Github className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg group"
              >
                <Twitter className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg group"
              >
                <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href="mailto:info@tekplatform.com"
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg group"
              >
                <Mail className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Popüler Araçlar</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/percentage-calculator" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Yüzde Hesaplayıcı
                </Link>
              </li>
              <li>
                <Link href="/tools/unit-converter" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Birim Dönüştürücü
                </Link>
              </li>
              <li>
                <Link href="/tools/text-tools" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Metin Araçları
                </Link>
              </li>
              <li>
                <Link href="/tools/focus-timer" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Odak Zamanlayıcı
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Hukuki</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              © {currentYear} Tek Platform. Tüm hakları saklıdır. 
              <span className="hidden sm:inline-flex items-center gap-1">
                Türkiye'den <Heart className="w-4 h-4 text-red-500 fill-red-500" /> ile yapıldı
              </span>
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Tüm sistemler çalışıyor
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
