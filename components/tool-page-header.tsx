'use client'

import { SocialShare } from '@/components/social-share'

interface ToolPageHeaderProps {
  badge: string
  title: string
  description: string
  badgeColors?: {
    bg: string
    border: string
    dot: string
    text: string
  }
  titleGradient?: string
}

export function ToolPageHeader({
  badge,
  title,
  description,
  badgeColors = {
    bg: 'from-purple-100 to-indigo-100',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
    text: 'from-purple-700 to-indigo-700'
  },
  titleGradient = 'from-purple-600 via-indigo-600 to-blue-600'
}: ToolPageHeaderProps) {
  return (
    <div className="max-w-5xl mx-auto mb-12 text-center relative">
      {/* Social Share Button - Top Right */}
      <div className="absolute top-0 right-0">
        <SocialShare 
          title={title} 
          description={description}
        />
      </div>
      
      {/* Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badgeColors.bg} ${badgeColors.border} border mb-6 animate-in fade-in slide-in-from-top duration-700`}>
        <div className={`h-2 w-2 rounded-full ${badgeColors.dot} animate-pulse`}></div>
        <span className={`text-sm font-semibold bg-gradient-to-r ${badgeColors.text} bg-clip-text text-transparent`}>
          {badge}
        </span>
      </div>
      
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
        <span className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}>
          {title}
        </span>
      </h1>
      
      {/* Description */}
      <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
        {description}
      </p>
    </div>
  )
}
