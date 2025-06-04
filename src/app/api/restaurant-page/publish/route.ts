import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantId, pageData } = body

    if (!restaurantId || !pageData) {
      return NextResponse.json({ success: false, error: "Restaurant ID and page data are required" }, { status: 400 })
    }

    // Generate URL slug
    const urlSlug = pageData.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    // Save published page data
    const { data, error } = await supabase
      .from("published_pages")
      .upsert({
        restaurant_id: restaurantId,
        url_slug: urlSlug,
        page_data: pageData,
        is_published: true,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    const publicUrl = `https://${urlSlug}.tablesalt.ai`

    return NextResponse.json({
      success: true,
      message: "Page published successfully",
      url: publicUrl,
      data,
    })
  } catch (error) {
    console.error("Error publishing page:", error)
    return NextResponse.json({ success: false, error: "Failed to publish page" }, { status: 500 })
  }
}
