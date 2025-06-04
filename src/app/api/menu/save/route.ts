import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  dietary: string[]
  isPopular: boolean
  isAvailable: boolean
  tags: string[]
  aiGenerated?: boolean
}

interface MenuCategory {
  id: string
  name: string
  description: string
  items: MenuItem[]
  color?: string
}

export async function POST(request: NextRequest) {
  try {
    const {
      restaurantId,
      categories,
      brandSettings,
    }: {
      restaurantId: string
      categories: MenuCategory[]
      brandSettings: {
        primaryColor: string
        secondaryColor: string
        fontStyle: string
      }
    } = await request.json()

    if (!restaurantId || !categories) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Start a transaction-like operation
    console.log(`Saving menu for restaurant: ${restaurantId}`)

    // First, delete existing menu data for this restaurant
    const { error: deleteItemsError } = await supabase.from("menu_items").delete().eq("restaurant_id", restaurantId)

    if (deleteItemsError) {
      console.error("Error deleting existing menu items:", deleteItemsError)
    }

    const { error: deleteCategoriesError } = await supabase
      .from("menu_categories")
      .delete()
      .eq("restaurant_id", restaurantId)

    if (deleteCategoriesError) {
      console.error("Error deleting existing categories:", deleteCategoriesError)
    }

    // Save menu settings
    const { error: settingsError } = await supabase.from("menu_settings").upsert({
      restaurant_id: restaurantId,
      primary_color: brandSettings.primaryColor,
      secondary_color: brandSettings.secondaryColor,
      font_style: brandSettings.fontStyle,
      updated_at: new Date().toISOString(),
    })

    if (settingsError) {
      console.error("Error saving menu settings:", settingsError)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save menu settings",
        },
        { status: 500 },
      )
    }

    // Save categories and items
    for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
      const category = categories[categoryIndex]

      // Insert category
      const { data: categoryData, error: categoryError } = await supabase
        .from("menu_categories")
        .insert({
          restaurant_id: restaurantId,
          name: category.name,
          description: category.description,
          color: category.color,
          sort_order: categoryIndex,
        })
        .select()
        .single()

      if (categoryError) {
        console.error("Error inserting category:", categoryError)
        return NextResponse.json(
          {
            success: false,
            error: `Failed to save category: ${category.name}`,
          },
          { status: 500 },
        )
      }

      // Insert items for this category
      if (category.items.length > 0) {
        const itemsToInsert = category.items.map((item, itemIndex) => ({
          category_id: categoryData.id,
          restaurant_id: restaurantId,
          name: item.name,
          description: item.description,
          price: item.price,
          dietary: item.dietary,
          tags: item.tags,
          is_popular: item.isPopular,
          is_available: item.isAvailable,
          ai_generated: item.aiGenerated || false,
          sort_order: itemIndex,
        }))

        const { error: itemsError } = await supabase.from("menu_items").insert(itemsToInsert)

        if (itemsError) {
          console.error("Error inserting menu items:", itemsError)
          return NextResponse.json(
            {
              success: false,
              error: `Failed to save items for category: ${category.name}`,
            },
            { status: 500 },
          )
        }
      }
    }

    console.log("Menu saved successfully")

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${categories.length} categories with ${categories.reduce((total, cat) => total + cat.items.length, 0)} items`,
    })
  } catch (error) {
    console.error("Menu save error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save menu",
      },
      { status: 500 },
    )
  }
}
