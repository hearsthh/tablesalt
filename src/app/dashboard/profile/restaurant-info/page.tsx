"use client"

import { useState, useEffect } from "react"
import { Store, MapPin, Star, Save, ArrowRight } from "lucide-react"

export default function RestaurantInfoPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    priceRange: "",
    specialties: [] as string[],
    awards: [] as string[],
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const cuisineTypes = [
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Japanese",
    "Thai",
    "French",
    "Mediterranean",
    "American",
    "Korean",
    "Vietnamese",
    "Greek",
    "Spanish",
    "Lebanese",
    "Turkish",
    "Multi-Cuisine",
    "Other",
  ]

  const priceRanges = [
    { value: "$", label: "$ - Budget Friendly (Under ₹500)" },
    { value: "$$", label: "$$ - Moderate (₹500-₹1000)" },
    { value: "$$$", label: "$$$ - Upscale (₹1000-₹2000)" },
    { value: "$$$$", label: "$$$$ - Fine Dining (₹2000+)" },
  ]

  const handleSave = () => {
    // Save to localStorage or API
    localStorage.setItem("restaurantInfo", JSON.stringify(formData))
    alert("Restaurant information saved successfully!")
  }

  const handleContinue = () => {
    handleSave()
    window.location.href = "/dashboard/profile/brand-assets"
  }

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-6">
        <a href="/dashboard" className="breadcrumb-item">
          Dashboard
        </a>
        <span className="breadcrumb-separator">/</span>
        <a href="/dashboard/profile" className="breadcrumb-item">
          Profile
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Restaurant Information</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Restaurant Information</h1>
        <p className="text-gray-600">
          Tell us about your restaurant to personalize your AI-generated marketing content
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="card p-4 mb-6" style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-blue-900 font-medium">Step 1 of 3: Restaurant Information</span>
          </div>
          <div className="text-blue-700 text-sm">Essential for AI content generation</div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Store className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Restaurant Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Spice Garden Restaurant"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">Cuisine Type *</label>
              <select
                value={formData.cuisine}
                onChange={(e) => setFormData((prev) => ({ ...prev, cuisine: e.target.value }))}
                className="form-select"
                required
              >
                <option value="">Select cuisine type</option>
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="form-label">Restaurant Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your restaurant's atmosphere, style, and what makes it special..."
              rows={3}
              className="form-textarea"
              required
            />
            <p className="text-xs text-gray-500 mt-1">This helps AI understand your restaurant's personality</p>
          </div>

          <div className="mt-4">
            <label className="form-label">Price Range</label>
            <select
              value={formData.priceRange}
              onChange={(e) => setFormData((prev) => ({ ...prev, priceRange: e.target.value }))}
              className="form-select"
            >
              <option value="">Select price range</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Full Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Complete address including street, area, city, state, pincode"
                rows={2}
                className="form-textarea"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="restaurant@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourrestaurant.com"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Operating Hours</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hours: e.target.value }))}
                  placeholder="Mon-Sun: 11:00 AM - 11:00 PM"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Specialties & Signature Dishes</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">What are you famous for? (Helps AI create targeted content)</p>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="e.g., Butter Chicken, Wood-fired Pizza, Biryani"
              className="form-input"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value.trim()
                  if (value && !formData.specialties.includes(value)) {
                    setFormData((prev) => ({ ...prev, specialties: [...prev.specialties, value] }))
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }
              }}
            />

            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {specialty}
                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          specialties: prev.specialties.filter((_, i) => i !== index),
                        }))
                      }
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8">
        <a href="/dashboard/profile" className="btn btn-secondary">
          ← Back to Profile
        </a>

        <div className="flex gap-3">
          <button onClick={handleSave} className="btn btn-secondary">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>
          <button onClick={handleContinue} className="btn btn-primary">
            Save & Continue to Brand Assets
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}
