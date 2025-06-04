"use client"

import { useState, useEffect } from "react"

interface RestaurantData {
  id?: string
  name: string
  tagline: string
  description: string
  cuisine: string
  location: string
  phone: string
  email: string
  website?: string
  hours: string
  rating: number
  reviewCount: number
  priceRange: string
  specialties: string[]
  images: string[]
  history: string
  awards: string[]
  funFacts: string[]
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
  }
}

export function useRestaurantData(restaurantId = "default") {
  const [data, setData] = useState<RestaurantData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Load restaurant data
  useEffect(() => {
    loadRestaurantData()
  }, [restaurantId])

  const loadRestaurantData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/restaurant-data?id=${restaurantId}`)
      const result = await response.json()

      if (result.success) {
        setData(result.restaurant)
        setError(null)
      } else {
        setError(result.error || "Failed to load restaurant data")
      }
    } catch (err) {
      setError("Failed to load restaurant data")
      console.error("Error loading restaurant data:", err)
    } finally {
      setLoading(false)
    }
  }

  const saveRestaurantData = async (restaurantData: RestaurantData) => {
    try {
      setSaving(true)
      const response = await fetch("/api/restaurant-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantData }),
      })

      const result = await response.json()

      if (result.success) {
        setData(result.restaurant)
        setError(null)
        return { success: true, message: "Data saved successfully" }
      } else {
        setError(result.error || "Failed to save restaurant data")
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMsg = "Failed to save restaurant data"
      setError(errorMsg)
      console.error("Error saving restaurant data:", err)
      return { success: false, error: errorMsg }
    } finally {
      setSaving(false)
    }
  }

  const generateAIContent = async (contentType: "quick" | "full" = "full", customPrompt?: string) => {
    try {
      const response = await fetch("/api/ai/generate-restaurant-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantData: data,
          contentType,
          customPrompt,
        }),
      })

      const result = await response.json()

      if (result.success) {
        return { success: true, content: result.content, type: result.type }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error("Error generating AI content:", err)
      return { success: false, error: "Failed to generate content" }
    }
  }

  const publishPage = async () => {
    try {
      const response = await fetch("/api/restaurant-page/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: data?.id || "default",
          pageData: data,
        }),
      })

      const result = await response.json()

      if (result.success) {
        return { success: true, url: result.url, message: result.message }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      console.error("Error publishing page:", err)
      return { success: false, error: "Failed to publish page" }
    }
  }

  return {
    data,
    loading,
    error,
    saving,
    setData,
    saveRestaurantData,
    generateAIContent,
    publishPage,
    reload: loadRestaurantData,
  }
}
