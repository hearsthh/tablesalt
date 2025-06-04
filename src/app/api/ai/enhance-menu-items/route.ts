import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const enhancedMenuItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  suggestedPrice: z.number(),
  dietary: z.array(z.string()),
  tags: z.array(z.string()),
  category: z.string(),
  allergens: z.array(z.string()),
  preparationTime: z.string(),
  spiceLevel: z.string().optional(),
  isSignature: z.boolean(),
  pairingsSuggestions: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const { itemName, currentDescription, currentPrice, category, restaurantData } = await request.json()

    const { object: enhancedItem } = await generateObject({
      model: openai("gpt-4o"),
      schema: enhancedMenuItemSchema,
      prompt: `Enhance this menu item for ${restaurantData.name}, an ${restaurantData.cuisine} restaurant.

Current Item:
- Name: ${itemName}
- Description: ${currentDescription}
- Price: ₹${currentPrice}
- Category: ${category}

Please enhance this item by:
1. Creating a more appetizing and detailed description
2. Suggesting appropriate dietary tags (vegetarian, vegan, gluten-free, etc.)
3. Recommending relevant tags (signature, spicy, popular, etc.)
4. Suggesting optimal pricing based on ingredients and market
5. Identifying allergens and preparation details
6. Suggesting food pairings and beverages

Make the description mouth-watering and highlight unique preparation methods, ingredients, or cultural significance. Focus on Indian F&B market preferences.`,
    })

    return NextResponse.json({
      success: true,
      enhancedItem,
      message: "Menu item enhanced successfully",
    })
  } catch (error) {
    console.error("Menu item enhancement error:", error)
    return NextResponse.json({ success: false, error: "Failed to enhance menu item" }, { status: 500 })
  }
}
