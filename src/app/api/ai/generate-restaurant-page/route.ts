import { type NextRequest, NextResponse } from "next/server"
import { generateObject, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const restaurantPageSchema = z.object({
  tagline: z.string(),
  description: z.string(),
  history: z.string(),
  specialties: z.array(z.string()),
  funFacts: z.array(z.string()),
  awards: z.array(z.string()),
  seoKeywords: z.array(z.string()),
  socialMediaCaptions: z.object({
    instagram: z.string(),
    facebook: z.string(),
    twitter: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantData, contentType = "full", customPrompt = "" } = body

    if (!restaurantData?.name) {
      return NextResponse.json({ success: false, error: "Restaurant name is required" }, { status: 400 })
    }

    const basePrompt = `
    Generate professional marketing content for ${restaurantData.name}, a ${restaurantData.cuisine || "restaurant"} located in ${restaurantData.location || "India"}.

    Current Restaurant Info:
    - Name: ${restaurantData.name}
    - Cuisine: ${restaurantData.cuisine || "Multi-cuisine"}
    - Location: ${restaurantData.location || "Not specified"}
    - Price Range: ${restaurantData.priceRange || "₹₹"}
    - Current Specialties: ${restaurantData.specialties?.join(", ") || "Not specified"}
    - Current Description: ${restaurantData.description || "Not specified"}

    ${customPrompt ? `Additional Requirements: ${customPrompt}` : ""}

    Create compelling, authentic content that:
    - Reflects the restaurant's personality and cuisine
    - Appeals to the local market
    - Is SEO-optimized
    - Sounds natural and engaging
    - Includes specific details that make the restaurant unique
    `

    if (contentType === "quick") {
      // Generate just a tagline and description
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `${basePrompt}
        
        Generate ONLY:
        1. A catchy tagline (max 60 characters)
        2. A compelling description (2-3 sentences)
        
        Format as:
        TAGLINE: [tagline here]
        DESCRIPTION: [description here]`,
      })

      const lines = text.split("\n").filter((line) => line.trim())
      const tagline =
        lines
          .find((line) => line.startsWith("TAGLINE:"))
          ?.replace("TAGLINE:", "")
          .trim() || restaurantData.tagline
      const description =
        lines
          .find((line) => line.startsWith("DESCRIPTION:"))
          ?.replace("DESCRIPTION:", "")
          .trim() || restaurantData.description

      return NextResponse.json({
        success: true,
        content: { tagline, description },
        type: "quick",
      })
    }

    // Generate full content
    const { object: content } = await generateObject({
      model: openai("gpt-4o"),
      schema: restaurantPageSchema,
      prompt: `${basePrompt}
      
      Generate comprehensive marketing content including:
      - Catchy tagline (max 60 characters)
      - Compelling description (2-3 sentences)
      - Restaurant history/story (3-4 sentences)
      - 4-6 signature specialties
      - 3-5 interesting fun facts
      - 2-3 potential awards or recognitions
      - 8-10 SEO keywords
      - Social media captions for Instagram, Facebook, and Twitter
      
      Make it authentic and specific to ${restaurantData.cuisine} cuisine and Indian market.`,
    })

    return NextResponse.json({
      success: true,
      content,
      type: "full",
    })
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to generate content. Please try again." },
      { status: 500 },
    )
  }
}
