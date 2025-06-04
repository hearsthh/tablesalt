import { type NextRequest, NextResponse } from "next/server"
import { createAIGenerator } from "@/lib/ai-content-generator"

export async function POST(request: NextRequest) {
  try {
    const { restaurantId, duration, customPrompt } = await request.json()

    if (!restaurantId) {
      return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
    }

    // Create AI generator with all restaurant data
    const aiGenerator = await createAIGenerator(restaurantId)

    // Generate comprehensive strategy
    const strategyResult = await aiGenerator.generateSocialMediaStrategy(duration, customPrompt)

    if (!strategyResult.success) {
      return NextResponse.json({ error: strategyResult.error }, { status: 500 })
    }

    // Save strategy to database
    const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/strategies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurant_id: restaurantId,
        duration_months: duration,
        ...strategyResult.strategy,
      }),
    })

    if (!saveResponse.ok) {
      console.error("Failed to save strategy")
    }

    return NextResponse.json({
      success: true,
      strategy: strategyResult.strategy,
      message: "🎉 AI strategy generated successfully!",
      creditsUsed: "~$0.05-0.10",
    })
  } catch (error) {
    console.error("Strategy generation error:", error)
    return NextResponse.json({ error: "Failed to generate strategy" }, { status: 500 })
  }
}
