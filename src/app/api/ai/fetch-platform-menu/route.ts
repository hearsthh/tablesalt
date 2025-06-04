import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  dietary: z.array(z.string()),
  isPopular: z.boolean(),
  isAvailable: z.boolean(),
  tags: z.array(z.string()),
  aiGenerated: z.boolean().optional(),
})

const menuCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  items: z.array(menuItemSchema),
  color: z.string().optional(),
})

const processedMenuSchema = z.object({
  categories: z.array(menuCategorySchema),
  brandSuggestions: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontStyle: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const { platform, restaurantName, restaurantUrl, businessId } = await request.json()

    // Simulate platform-specific data fetching
    let platformData = ""

    switch (platform) {
      case "zomato":
        // In real implementation, use Zomato API or web scraping
        platformData = `Sample Zomato menu data for ${restaurantName}:
        Appetizers: Samosa (₹120), Chicken Tikka (₹280)
        Main Course: Butter Chicken (₹450), Dal Makhani (₹320)
        Desserts: Gulab Jamun (₹150), Kulfi (₹180)`
        break

      case "swiggy":
        // In real implementation, use Swiggy API or web scraping
        platformData = `Sample Swiggy menu data for ${restaurantName}:
        Starters: Paneer Tikka (₹250), Fish Fry (₹320)
        Mains: Biryani (₹380), Curry (₹290)
        Beverages: Lassi (₹120), Chai (₹80)`
        break

      case "google":
        // In real implementation, use Google My Business API
        platformData = `Sample Google My Business menu data for ${restaurantName}:
        Popular items from customer reviews and photos`
        break

      default:
        throw new Error("Unsupported platform")
    }

    // Process with AI
    const { object: processedMenu } = await generateObject({
      model: openai("gpt-4"),
      schema: processedMenuSchema,
      prompt: `Process this menu data from ${platform} and organize it into proper categories with enhanced descriptions.

Restaurant: ${restaurantName}
Platform: ${platform}
Data: ${platformData}

Instructions:
1. Extract all menu items from the platform data
2. Organize items into logical categories
3. Create attractive, appetizing descriptions for each item
4. Maintain original pricing but suggest optimizations
5. Identify popular items based on platform data
6. Categorize dietary preferences
7. Assign appropriate tags based on platform popularity
8. Suggest brand colors and styling
9. Ensure all descriptions are engaging and sales-focused
10. Generate unique IDs for categories and items

Focus on Indian F&B market preferences. Make descriptions appetizing and professional.`,
    })

    return NextResponse.json({
      success: true,
      processedMenu,
      message: `Successfully imported menu from ${platform}`,
    })
  } catch (error) {
    console.error("Platform fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch menu from platform" }, { status: 500 })
  }
}
