import { NextResponse } from 'next/server'
import { getActiveTools, getPopularTools, getActiveCategories } from '@/lib/db'

export const revalidate = 60 // 60 saniyede bir revalidate

export async function GET() {
  try {
    const [tools, popularTools, categories] = await Promise.all([
      getActiveTools(),
      getPopularTools(),
      getActiveCategories()
    ])

    return NextResponse.json({
      success: true,
      tools,
      popularTools,
      categories,
      count: tools.length
    })
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json(
      { success: false, error: 'Veriler yüklenemedi' },
      { status: 500 }
    )
  }
}
