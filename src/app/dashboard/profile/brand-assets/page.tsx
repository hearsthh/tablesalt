"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Palette, Type, Target, Save, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

export default function BrandAssetsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedColors, setSelectedColors] = useState({
    primary: "#dc2626",
    secondary: "#ffffff",
    accent: "#f59e0b",
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [tagline, setTagline] = useState("")
  const [brandVoice, setBrandVoice] = useState("")
  const [positioning, setPositioning] = useState("")

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const brandPersonalities = [
    "Modern",
    "Traditional",
    "Casual",
    "Upscale",
    "Family-friendly",
    "Trendy",
    "Cozy",
    "Elegant",
    "Rustic",
    "Contemporary",
    "Authentic",
    "Innovative",
  ]

  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([])

  const togglePersonality = (personality: string) => {
    setSelectedPersonalities((prev) =>
      prev.includes(personality) ? prev.filter((p) => p !== personality) : [...prev, personality],
    )
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const brandData = {
      logo: logoFile,
      logoPreview,
      colors: selectedColors,
      tagline,
      brandVoice,
      positioning,
      personalities: selectedPersonalities,
    }
    localStorage.setItem("brandAssets", JSON.stringify(brandData))
    alert("Brand assets saved successfully!")
  }

  const handleContinue = () => {
    handleSave()
    window.location.href = "/dashboard/profile/media-assets"
  }

  const isComplete = logoPreview && tagline && brandVoice && selectedPersonalities.length >= 2

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
        <span className="breadcrumb-current">Brand Assets</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Brand Assets</h1>
        <p className="text-gray-600">
          Define your restaurant's visual identity and brand voice for consistent AI-generated content
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="card p-4 mb-6" style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-blue-900 font-medium">Step 2 of 3: Brand Assets</span>
          </div>
          <div className="flex items-center gap-2">
            {isComplete && <CheckCircle className="h-5 w-5 text-green-600" />}
            <span className="text-blue-700 text-sm">Essential for consistent AI branding</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Restaurant Logo *</h3>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 hover:border-blue-400 transition-colors">
            {logoPreview ? (
              <div className="space-y-4">
                <img
                  src={logoPreview || "/placeholder.svg"}
                  alt="Logo preview"
                  className="max-h-32 mx-auto object-contain"
                />
                <p className="text-sm text-gray-600">{logoFile?.name}</p>
                <button
                  onClick={() => {
                    setLogoFile(null)
                    setLogoPreview("")
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Change Logo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 mb-2">Upload your restaurant logo</p>
                  <label htmlFor="logo-upload" className="btn btn-primary cursor-pointer">
                    Choose File
                  </label>
                  <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            PNG or SVG format, minimum 200x200px, transparent background preferred
          </p>
        </div>

        {/* Brand Colors */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Brand Colors</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Primary Color</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={selectedColors.primary}
                  onChange={(e) => setSelectedColors((prev) => ({ ...prev, primary: e.target.value }))}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedColors.primary}
                  onChange={(e) => setSelectedColors((prev) => ({ ...prev, primary: e.target.value }))}
                  className="form-input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Secondary Color</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={selectedColors.secondary}
                  onChange={(e) => setSelectedColors((prev) => ({ ...prev, secondary: e.target.value }))}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedColors.secondary}
                  onChange={(e) => setSelectedColors((prev) => ({ ...prev, secondary: e.target.value }))}
                  className="form-input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Accent Color</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={selectedColors.accent}
                  onChange={(e) => setSelectedColors((prev) => ({ ...prev, accent: e.target.value }))}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedColors.accent}
                  onChange={(e) => setSelectedColors((prev) => ({ ...prev, accent: e.target.value }))}
                  className="form-input flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Voice & Messaging */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Type className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Brand Voice & Messaging *</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Tagline *</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="form-input"
                placeholder="e.g., Authentic flavors, modern experience"
                required
              />
            </div>

            <div>
              <label className="form-label">Brand Voice *</label>
              <select
                value={brandVoice}
                onChange={(e) => setBrandVoice(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select brand voice</option>
                <option value="professional">Professional & Polished</option>
                <option value="friendly">Friendly & Welcoming</option>
                <option value="casual">Casual & Relaxed</option>
                <option value="sophisticated">Sophisticated & Elegant</option>
                <option value="playful">Playful & Fun</option>
                <option value="warm">Warm & Homely</option>
                <option value="modern">Modern & Trendy</option>
                <option value="traditional">Traditional & Authentic</option>
              </select>
            </div>

            <div>
              <label className="form-label">Brand Positioning</label>
              <textarea
                value={positioning}
                onChange={(e) => setPositioning(e.target.value)}
                className="form-textarea"
                rows={3}
                placeholder="e.g., We position ourselves as a premium casual dining restaurant that brings authentic Indian flavors to modern food lovers..."
              />
            </div>
          </div>
        </div>

        {/* Brand Personality */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Brand Personality *</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Select at least 2 traits that describe your restaurant (helps AI generate appropriate content):
          </p>
          <div className="flex flex-wrap gap-2">
            {brandPersonalities.map((personality) => (
              <button
                key={personality}
                onClick={() => togglePersonality(personality)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedPersonalities.includes(personality)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {personality}
              </button>
            ))}
          </div>
          {selectedPersonalities.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">Selected: {selectedPersonalities.join(", ")}</div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8">
        <a href="/dashboard/profile/restaurant-info" className="btn btn-secondary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous: Restaurant Info
        </a>

        <div className="flex gap-3">
          <button onClick={handleSave} className="btn btn-secondary">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>
          <button onClick={handleContinue} className="btn btn-primary" disabled={!isComplete}>
            Save & Continue to Media Assets
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>

      {!isComplete && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Please complete all required fields (marked with *) to continue to the next step.
          </p>
        </div>
      )}
    </div>
  )
}
