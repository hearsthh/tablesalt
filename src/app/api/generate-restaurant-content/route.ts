import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantData } = body

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables." },
        { status: 500 },
      )
    }

    const prompt = `Create marketing content for this restaurant:

Restaurant: ${restaurantData.name}
Cuisine: ${restaurantData.cuisine}
Description: ${restaurantData.description}
Price Range: ${restaurantData.priceRange}
Specialties: ${restaurantData.specialties?.join(", ")}
Location: ${restaurantData.address}
Phone: ${restaurantData.countryCode} ${restaurantData.phone}

Generate:
1. A compelling Instagram post caption (with emojis and hashtags)
2. A Facebook post for today's special
3. A Google My Business description (50 words)
4. 3 WhatsApp message templates for different occasions

Make it engaging, culturally relevant, and perfect for attracting customers. Include local context and food-focused language.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"), // Using the more cost-effective model
      prompt,
      system:
        "You are a marketing expert specializing in restaurant marketing. Create engaging, culturally relevant content that drives customer visits and engagement.",
    })

    return NextResponse.json({
      success: true,
      content: text,
      message: "🎉 Real AI content generated successfully!",
      creditsUsed: "~$0.01-0.02",
    })
  } catch (error) {
    console.error("AI Generation Error:", error)

    // Type-safe error handling
    const errorMessage = error instanceof Error ? error.message : String(error)

    // Provide helpful error messages
    if (errorMessage.includes("insufficient_quota")) {
      return NextResponse.json(
        { error: "OpenAI credits exhausted. Please add more credits to your OpenAI account." },
        { status: 500 },
      )
    }

    if (errorMessage.includes("invalid_api_key")) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your API key configuration." },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { error: "Failed to generate content. Please try again or check your OpenAI API key." },
      { status: 500 },
    )
  }
}
