import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get("id") || "default"

    // Fetch restaurant data from Supabase
    const { data: restaurant, error } = await supabase.from("restaurants").select("*").eq("id", restaurantId).single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    // Return default data if no restaurant found
    const defaultData = {
      id: "default",
      name: "Demo Restaurant",
      tagline: "Delicious Food, Great Experience",
      description: "Experience authentic flavors in a warm, welcoming atmosphere.",
      cuisine: "Multi-Cuisine",
      location: "123 Main Street, City",
      phone: "+1 234 567 8900",
      email: "hello@demorestaurant.com",
      website: "www.demorestaurant.com",
      hours: "Mon-Sun: 10:00 AM - 10:00 PM",
      rating: 4.5,
      reviewCount: 150,
      priceRange: "₹₹",
      specialties: ["Signature Burger", "Pasta Special", "Chef's Salad"],
      images: [
        "/placeholder.svg?height=400&width=600&text=Restaurant+Interior",
        "/placeholder.svg?height=400&width=600&text=Signature+Dish",
        "/placeholder.svg?height=400&width=600&text=Chef+Special",
      ],
      history: "Founded with a passion for bringing people together through great food.",
      awards: ["Best New Restaurant 2023", "Customer Choice Award 2024"],
      funFacts: [
        "We serve over 500 customers daily",
        "Our secret sauce has 12 ingredients",
        "We've been featured in 5 food magazines",
      ],
      theme: {
        primaryColor: "#d97706",
        secondaryColor: "#f59e0b",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      restaurant: restaurant || defaultData,
    })
  } catch (error) {
    console.error("Error fetching restaurant data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch restaurant data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantData } = body

    // Save restaurant data to Supabase
    const { data, error } = await supabase
      .from("restaurants")
      .upsert({
        ...restaurantData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Restaurant data saved successfully",
      restaurant: data,
    })
  } catch (error) {
    console.error("Error saving restaurant data:", error)
    return NextResponse.json({ success: false, error: "Failed to save restaurant data" }, { status: 500 })
  }
}
