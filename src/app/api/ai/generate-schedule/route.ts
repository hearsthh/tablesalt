import { type NextRequest, NextResponse } from "next/server"
import { createAIGenerator } from "@/lib/ai-content-generator"

export async function POST(request: NextRequest) {
  try {
    const { restaurantId, strategyId, month, year, customPrompt } = await request.json()

    if (!restaurantId || !month || !year) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get strategy data
    const strategyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/strategies/${strategyId}`)
    const strategyData = await strategyResponse.json()

    // Create AI generator
    const aiGenerator = await createAIGenerator(restaurantId)

    // Generate content schedule
    const scheduleResult = await aiGenerator.generateContentSchedule(strategyData.strategy, month, year, customPrompt)

    if (!scheduleResult.success) {
      return NextResponse.json({ error: scheduleResult.error }, { status: 500 })
    }

    // Save schedule to database
    const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/content-schedules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurant_id: restaurantId,
        strategy_id: strategyId,
        month,
        year,
        posts: scheduleResult.schedule.posts,
      }),
    })

    return NextResponse.json({
      success: true,
      schedule: scheduleResult.schedule,
      message: "📅 Content schedule generated successfully!",
      creditsUsed: "~$0.08-0.15",
    })
  } catch (error) {
    console.error("Schedule generation error:", error)
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 })
  }
}
