import { Metadata } from "next"
import { PomodoroTimer } from "@/components/tools/pomodoro-timer"

export const metadata: Metadata = {
  title: "Pomodoro Zamanlayıcı | Online Araçlar",
  description: "25 dakika odaklanma ve 5 dakika mola ile verimliliğinizi artırın. Pomodoro tekniği ile çalışın.",
  keywords: ["pomodoro", "zamanlayıcı", "timer", "odaklanma", "verimlilik"],
}

export default function PomodoroTimerPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            Pomodoro Zamanlayıcı
          </span>
        </h1>
        <p className="text-xl text-slate-600">Odaklanarak daha fazlasını başarın</p>
      </div>
      <PomodoroTimer />
    </div>
  )
}
