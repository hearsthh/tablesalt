import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get("restaurantId")

    if (!restaurantId) {
      return NextResponse.json(
        {
          success: false,
          error: "Restaurant ID is required",
        },
        { status: 400 },
      )
    }

    // Load menu settings
    const { data: settings, error: settingsError } = await supabase
      .from("menu_settings")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .single()

    if (settingsError && settingsError.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Error loading menu settings:", settingsError)
    }

    // Load categories with items
    const { data: categories, error: categoriesError } = await supabase
      .from("menu_categories")
      .select(`
        *,
        menu_items (*)
      `)
      .eq("restaurant_id", restaurantId)
      .order("sort_order")

    if (categoriesError) {
      console.error("Error loading menu categories:", categoriesError)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to load menu",
        },
        { status: 500 },
      )
    }

    // Transform the data to match our frontend format
    const transformedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description || "",
      color: category.color,
      items: category.menu_items
        .sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          price: Number.parseFloat(item.price || "0"),
          category: category.id,
          dietary: item.dietary || [],
          isPopular: item.is_popular || false,
          isAvailable: item.is_available !== false,
          tags: item.tags || [],
          aiGenerated: item.ai_generated || false,
          image: item.image_url,
        })),
    }))

    const brandSettings = settings
      ? {
          primaryColor: settings.primary_color,
          secondaryColor: settings.secondary_color,
          fontStyle: settings.font_style,
          isPublished: settings.is_published,
        }
      : {
          primaryColor: "#d97706",
          secondaryColor: "#f59e0b",
          fontStyle: "modern",
          isPublished: false,
        }

    return NextResponse.json({
      success: true,
      categories: transformedCategories,
      brandSettings,
    })
  } catch (error) {
    console.error("Menu load error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load menu",
      },
      { status: 500 },
    )
  }
}
