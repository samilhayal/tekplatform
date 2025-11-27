import { Metadata } from "next"
import { FocusTimer } from "@/components/tools/focus-timer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Odaklanma Zamanlayıcı & Pomodoro Timer | Online Tools Hub",
  description: "Pomodoro tekniği ile verimliliğinizi artırın. Circular progress bar, istatistikler ve bildirimlerle tam özellikli timer.",
}

export default function FocusTimerPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
          Ana Sayfaya Dön
        </Link>

        <FocusTimer />
      </div>
    </div>
  )
}
