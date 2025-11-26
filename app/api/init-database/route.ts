import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { tools } from '@/lib/tools-data'

export async function POST() {
  try {
    const batch = adminDb.batch()

    // 1. Initialize all tools with active status
    tools.forEach((tool) => {
      const toolRef = adminDb.collection('tools').doc(tool.id)
      batch.set(toolRef, {
        id: tool.id,
        title: tool.title,
        description: tool.description,
        category: tool.category,
        icon: tool.icon,
        href: tool.href,
        keywords: tool.keywords,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    // 2. Initialize default prices
    const pricesRef = adminDb.collection('settings').doc('prices')
    batch.set(pricesRef, {
      gold: {
        gram: 3200,
        ceyrek: 5440,
        yarim: 11200,
        tam: 23040,
        lastUpdate: new Date()
      },
      currency: {
        usdTry: 34.50,
        eurTry: 37.20,
        gbpTry: 43.50,
        usdEur: 0.92,
        lastUpdate: new Date()
      },
      tufe: {
        monthly: 2.89,
        yearly: 64.77,
        lastUpdate: new Date()
      },
      zakat: {
        goldPrice: 3200,
        silverPrice: 38,
        goldNisab: 272000,
        silverNisab: 26600,
        usdTry: 34.50,
        eurTry: 37.20,
        lastUpdate: new Date()
      },
      updatedAt: new Date()
    })

    // 3. Initialize admin settings
    const adminSettingsRef = adminDb.collection('settings').doc('admin')
    batch.set(adminSettingsRef, {
      appName: 'Tek Platform',
      totalTools: tools.length,
      activeTools: tools.length,
      lastUpdated: new Date()
    })

    // Commit the batch
    await batch.commit()

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      stats: {
        toolsCreated: tools.length,
        pricesSet: true,
        adminSettingsSet: true
      }
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to initialize database',
    endpoint: '/api/init-database'
  })
}
