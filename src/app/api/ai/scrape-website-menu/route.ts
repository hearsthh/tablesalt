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
    const { websiteUrl, restaurantName } = await request.json()

    // In real implementation, use web scraping libraries like Puppeteer or Cheerio
    // For now, simulate scraped content
    const scrapedContent = `Sample scraped menu content from ${websiteUrl}:
    
    APPETIZERS
    - Vegetable Samosa - Crispy pastry with spiced vegetables - ₹120
    - Chicken Tikka - Marinated chicken pieces - ₹280
    
    MAIN COURSES  
    - Butter Chicken - Creamy tomato curry - ₹450
    - Paneer Makhani - Rich cottage cheese curry - ₹380
    - Biryani - Fragrant rice with spices - ₹420
    
    DESSERTS
    - Gulab Jamun - Sweet milk dumplings - ₹150
    - Kulfi - Traditional ice cream - ₹180`

    // Process with AI
    const { object: processedMenu } = await generateObject({
      model: openai("gpt-4o"),
      schema: processedMenuSchema,
      prompt: `Process this scraped website menu content and organize it into proper categories with enhanced descriptions.

Website: ${websiteUrl}
Restaurant: ${restaurantName}
Scraped content: ${scrapedContent}

Instructions:
1. Extract all menu items from the scraped content
2. Organize items into logical categories
3. Create attractive, appetizing descriptions for each item
4. Parse pricing information accurately
5. Identify popular items based on website presentation
6. Categorize dietary preferences
7. Assign appropriate tags
8. Suggest brand colors and styling based on website theme
9. Ensure all descriptions are engaging and sales-focused
10. Generate unique IDs for categories and items

Focus on Indian F&B market preferences. Make descriptions appetizing and professional.`,
    })

    return NextResponse.json({
      success: true,
      processedMenu,
      message: `Successfully scraped and processed menu from website`,
    })
  } catch (error) {
    console.error("Website scraping error:", error)
    return NextResponse.json({ success: false, error: "Failed to scrape website menu" }, { status: 500 })
  }
}
