import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const comboItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  originalPrice: z.number(),
  items: z.array(z.string()),
  savings: z.number(),
  savingsPercentage: z.number(),
  dietary: z.array(z.string()),
  isRecommended: z.boolean(),
  tags: z.array(z.string()),
  category: z.string().default("combo"),
  comboType: z.string(),
  portionSize: z.string(),
  aiGenerated: z.boolean().default(true),
})

const comboGenerationSchema = z.object({
  combos: z.array(comboItemSchema),
  insights: z.object({
    totalCombos: z.number(),
    averageSavings: z.number(),
    popularPairings: z.array(z.string()),
    priceRangeAnalysis: z.object({
      budget: z.number(),
      midRange: z.number(),
      premium: z.number(),
    }),
  }),
  generationNotes: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const { menuItems, restaurantData, comboPreferences = {} } = await request.json()

    if (!menuItems || menuItems.length === 0) {
      return NextResponse.json({ success: false, error: "No menu items provided" }, { status: 400 })
    }

    // Extract combo preferences
    const {
      priceRange = "mid-range",
      comboTypes = ["value", "family", "premium"],
      maxPrice = 1000,
      minPrice = 200,
      targetSavings = 15,
      customPrompt = "",
      includeTypes = {
        lunch: true,
        dinner: true,
        family: true,
        couple: true,
        individual: true,
      },
    } = comboPreferences

    console.log("Generating combos with preferences:", comboPreferences)

    const { object: comboData } = await generateObject({
      model: openai("gpt-4o"),
      schema: comboGenerationSchema,
      prompt: `Create intelligent combo meals for ${restaurantData.name} with high accuracy and appeal.

MENU ITEMS ANALYSIS:
${JSON.stringify(menuItems, null, 2)}

RESTAURANT INFO:
- Name: ${restaurantData.name}
- Cuisine: ${restaurantData.cuisine}
- Price Range: ${priceRange}

COMBO GENERATION PREFERENCES:
- Price Range: ₹${minPrice} - ₹${maxPrice}
- Target Savings: ${targetSavings}%
- Combo Types: ${comboTypes.join(", ")}
- Custom Requirements: ${customPrompt}

COMBO TYPES TO CREATE:
${includeTypes.lunch ? "- Lunch Combos: Quick, satisfying midday meals" : ""}
${includeTypes.dinner ? "- Dinner Combos: Complete evening meal experiences" : ""}
${includeTypes.family ? "- Family Combos: Sharing portions for 3-4 people" : ""}
${includeTypes.couple ? "- Couple Combos: Romantic dining for 2" : ""}
${includeTypes.individual ? "- Individual Combos: Single person complete meals" : ""}

INTELLIGENT COMBO CREATION RULES:

1. PRICING STRATEGY:
   - Calculate realistic original prices by summing individual items
   - Apply ${targetSavings}% savings (range: 10-25%)
   - Ensure combos fall within ₹${minPrice}-₹${maxPrice}
   - Create tiered pricing: Budget, Mid-range, Premium

2. PAIRING INTELLIGENCE:
   - Appetizer + Main + Dessert combinations
   - Main + Bread + Beverage pairings
   - Complementary flavors and textures
   - Balanced nutrition (protein + carbs + vegetables)
   - Consider spice levels and dietary restrictions

3. COMBO TYPES:
   - Value Combos: Maximum savings, popular items
   - Family Combos: Sharing portions, variety
   - Premium Combos: High-end items, unique experiences
   - Quick Combos: Fast service items
   - Regional Combos: Local flavor combinations

4. NAMING STRATEGY:
   - Appealing, descriptive names
   - Include key ingredients or themes
   - Avoid generic names like "Combo 1"
   - Use emotional triggers: "Family Feast", "Romantic Dinner"

5. DESCRIPTION QUALITY:
   - Highlight key items and value proposition
   - Mention savings amount and percentage
   - Include serving suggestions
   - Appeal to target audience

6. DIETARY CONSIDERATIONS:
   - Maintain dietary consistency within combos
   - Offer vegetarian and non-vegetarian options
   - Consider allergies and preferences
   - Label clearly for customer guidance

7. PORTION SIZING:
   - Individual: 1 person
   - Couple: 2 people
   - Family: 3-4 people
   - Group: 5+ people

MARKET ANALYSIS:
- Indian F&B combo trends
- Regional preferences for ${restaurantData.cuisine}
- Competitive pricing analysis
- Customer behavior patterns

QUALITY ASSURANCE:
- Verify all combo items exist in menu
- Check price calculations for accuracy
- Ensure realistic savings percentages
- Validate dietary classifications
- Confirm portion sizes make sense

Create 8-12 diverse combos that will drive sales and customer satisfaction.`,
    })

    // Add AI generation metadata to each combo
    const enhancedCombos = comboData.combos.map((combo, index) => ({
      ...combo,
      id: `ai-combo-${Date.now()}-${index}`,
      aiGenerated: true,
      tags: [...combo.tags, "ai-generated"],
      generatedAt: new Date().toISOString(),
    }))

    console.log(`Generated ${enhancedCombos.length} combos with AI insights`)

    return NextResponse.json({
      success: true,
      combos: enhancedCombos,
      insights: comboData.insights,
      generationNotes: comboData.generationNotes,
      preferences: comboPreferences,
      message: `Generated ${enhancedCombos.length} AI combo meals with ${comboData.insights.averageSavings}% average savings`,
    })
  } catch (error) {
    console.error("Combo generation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate combos",
      },
      { status: 500 },
    )
  }
}
