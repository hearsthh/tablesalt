"use client"

import { useState } from "react"
import { useRestaurantData } from "@/hooks/useRestaurantData"
import { Loader2, Save, Zap, Globe, AlertCircle, CheckCircle } from "lucide-react"

export default function TestRestaurantPage() {
  const { data, loading, error, saving, setData, saveRestaurantData, generateAIContent, publishPage } =
    useRestaurantData("sample-restaurant-1")

  const [generating, setGenerating] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSave = async () => {
    if (!data) return

    const result = await saveRestaurantData(data)
    setMessage({
      type: result.success ? "success" : "error",
      text: result.success ? "Restaurant data saved successfully!" : result.error || "Failed to save",
    })

    setTimeout(() => setMessage(null), 3000)
  }

  const handleAIGenerate = async () => {
    setGenerating(true)
    const result = await generateAIContent("full", "Make it sound premium and authentic")

    if (result.success && data) {
      setData({
        ...data,
        tagline: result.content.tagline,
        description: result.content.description,
        history: result.content.history,
        specialties: result.content.specialties,
        funFacts: result.content.funFacts,
        awards: result.content.awards,
      })
      setMessage({
        type: "success",
        text: "AI content generated successfully!",
      })
    } else {
      setMessage({
        type: "error",
        text: result.error || "Failed to generate content",
      })
    }

    setGenerating(false)
    setTimeout(() => setMessage(null), 3000)
  }

  const handlePublish = async () => {
    setPublishing(true)
    const result = await publishPage()

    setMessage({
      type: result.success ? "success" : "error",
      text: result.success ? `Page published at: ${result.url}` : result.error || "Failed to publish",
    })

    setPublishing(false)
    setTimeout(() => setMessage(null), 5000)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading restaurant data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="ml-2 text-red-700">Error: {error}</span>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container py-8">
        <div className="text-center">No restaurant data found</div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Test Restaurant Data & AI Generation</h1>
          <p className="text-gray-600">Test real restaurant data saving, AI content generation, and page publishing</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center">
              {message.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="ml-2">{message.text}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <button onClick={handleAIGenerate} disabled={generating} className="btn btn-primary flex items-center gap-2">
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {generating ? "Generating..." : "Generate AI Content"}
          </button>

          <button onClick={handleSave} disabled={saving} className="btn btn-secondary flex items-center gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : "Save Data"}
          </button>

          <button onClick={handlePublish} disabled={publishing} className="btn btn-success flex items-center gap-2">
            {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
            {publishing ? "Publishing..." : "Publish Page"}
          </button>
        </div>

        {/* Restaurant Data Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Restaurant Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Tagline</label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => setData({ ...data, tagline: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Cuisine</label>
                  <input
                    type="text"
                    value={data.cuisine}
                    onChange={(e) => setData({ ...data, cuisine: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Price Range</label>
                  <select
                    value={data.priceRange}
                    onChange={(e) => setData({ ...data, priceRange: e.target.value })}
                    className="form-select"
                  >
                    <option value="₹">₹ - Budget</option>
                    <option value="₹₹">₹₹ - Moderate</option>
                    <option value="₹₹₹">₹₹₹ - Upscale</option>
                    <option value="₹₹₹₹">₹₹₹₹ - Fine Dining</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Operating Hours</label>
                <input
                  type="text"
                  value={data.hours}
                  onChange={(e) => setData({ ...data, hours: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={data.rating}
                    onChange={(e) => setData({ ...data, rating: Number.parseFloat(e.target.value) })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Review Count</label>
                  <input
                    type="number"
                    value={data.reviewCount}
                    onChange={(e) => setData({ ...data, reviewCount: Number.parseInt(e.target.value) })}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4">Specialties</h3>
            <div className="space-y-3">
              {data.specialties.map((specialty, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => {
                      const newSpecialties = [...data.specialties]
                      newSpecialties[index] = e.target.value
                      setData({ ...data, specialties: newSpecialties })
                    }}
                    className="form-input flex-1"
                  />
                  <button
                    onClick={() => {
                      const newSpecialties = data.specialties.filter((_, i) => i !== index)
                      setData({ ...data, specialties: newSpecialties })
                    }}
                    className="btn btn-secondary px-3"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setData({ ...data, specialties: [...data.specialties, ""] })}
                className="btn btn-secondary w-full"
              >
                Add Specialty
              </button>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4">Fun Facts</h3>
            <div className="space-y-3">
              {data.funFacts.map((fact, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={fact}
                    onChange={(e) => {
                      const newFacts = [...data.funFacts]
                      newFacts[index] = e.target.value
                      setData({ ...data, funFacts: newFacts })
                    }}
                    className="form-input flex-1"
                  />
                  <button
                    onClick={() => {
                      const newFacts = data.funFacts.filter((_, i) => i !== index)
                      setData({ ...data, funFacts: newFacts })
                    }}
                    className="btn btn-secondary px-3"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setData({ ...data, funFacts: [...data.funFacts, ""] })}
                className="btn btn-secondary w-full"
              >
                Add Fun Fact
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="card p-4 mt-6">
          <h3 className="text-lg font-semibold mb-4">Restaurant History</h3>
          <textarea
            value={data.history}
            onChange={(e) => setData({ ...data, history: e.target.value })}
            className="form-textarea w-full"
            rows={4}
            placeholder="Tell the story of your restaurant..."
          />
        </div>
      </div>
    </div>
  )
}
