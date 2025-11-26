import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Tüm araçları getir
export async function GET() {
  try {
    const toolsSnapshot = await adminDb.collection('tools').get()
    const tools = toolsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({
      success: true,
      tools,
      count: tools.length
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    )
  }
}

// POST - Araç durumunu güncelle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toolId, isActive } = body

    if (!toolId) {
      return NextResponse.json(
        { success: false, error: 'Tool ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('tools').doc(toolId).update({
      isActive: isActive,
      updatedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      message: `Tool ${isActive ? 'activated' : 'deactivated'} successfully`,
      toolId,
      isActive
    })
  } catch (error) {
    console.error('Error updating tool:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update tool' },
      { status: 500 }
    )
  }
}

// PUT - Toplu güncelleme (tümünü aç/kapat)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { isActive } = body

    const batch = adminDb.batch()
    const toolsSnapshot = await adminDb.collection('tools').get()

    toolsSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        isActive: isActive,
        updatedAt: new Date()
      })
    })

    await batch.commit()

    return NextResponse.json({
      success: true,
      message: `All tools ${isActive ? 'activated' : 'deactivated'}`,
      count: toolsSnapshot.size
    })
  } catch (error) {
    console.error('Error bulk updating tools:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to bulk update tools' },
      { status: 500 }
    )
  }
}
