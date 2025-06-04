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
    const formData = await request.formData()
    const file = formData.get("file") as File
    const restaurantName = formData.get("restaurantName") as string
    const cuisine = formData.get("cuisine") as string

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // Extract text from file based on type
    let extractedText = ""

    if (file.type === "application/pdf") {
      // For PDF files - in real implementation, use pdf-parse or similar
      extractedText = "Sample PDF menu content extracted here"
    } else if (file.type.startsWith("image/")) {
      // For image files - in real implementation, use OCR like Tesseract
      extractedText = "Sample OCR text from menu image"
    } else if (file.type.includes("document")) {
      // For Word documents - in real implementation, use mammoth or similar
      extractedText = "Sample document text extracted here"
    } else {
      // For text files
      extractedText = await file.text()
    }

    // Process with AI
    const { object: processedMenu } = await generateObject({
      model: openai("gpt-4o"),
      schema: processedMenuSchema,
      prompt: `Process this menu file content and organize it into proper categories with enhanced descriptions.

File name: ${file.name}
Restaurant: ${restaurantName}
Cuisine: ${cuisine}
Extracted content: ${extractedText}

Instructions:
1. Extract all menu items from the content
2. Organize items into logical categories (appetizers, mains, desserts, beverages, etc.)
3. Create attractive, appetizing descriptions for each item
4. Suggest appropriate pricing if missing (Indian market rates)
5. Identify popular items based on descriptions or context
6. Categorize dietary preferences (vegetarian, vegan, gluten-free, etc.)
7. Assign appropriate tags (top-pick, best-seller, must-have, etc.)
8. Suggest brand colors and styling based on cuisine type
9. Ensure all descriptions are engaging and sales-focused
10. Generate unique IDs for categories and items

Focus on Indian F&B market preferences and pricing. Make descriptions appetizing and professional.`,
    })

    return NextResponse.json({
      success: true,
      processedMenu,
      message: `Successfully processed ${file.name} and organized menu items`,
    })
  } catch (error) {
    console.error("File processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process menu file" }, { status: 500 })
  }
}
