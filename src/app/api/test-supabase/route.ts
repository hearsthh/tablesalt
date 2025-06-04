import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from("restaurants").select("count").limit(1)

    if (error) {
      console.error("Supabase connection error:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          suggestion: "Check your SUPABASE_URL and SUPABASE_ANON_KEY environment variables",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful!",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Connection test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to Supabase",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
