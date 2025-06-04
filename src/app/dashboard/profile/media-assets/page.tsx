"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Camera, Video, Upload, Trash2, Save, ArrowLeft, ArrowRight, CheckCircle, Plus } from "lucide-react"

interface MediaAsset {
  id: string
  type: "photo" | "video"
  category: string
  file: File
  preview: string
  name: string
  size: number
  uploadDate: string
}

interface MediaCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  minRequired: number
}

export default function MediaAssetsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [selectedCategory, setSelectedCategory] = useState("restaurant")

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const categories: MediaCategory[] = [
    {
      id: "restaurant",
      name: "Restaurant Interior",
      description: "Dining area, ambiance, decor",
      icon: Camera,
      color: "#3b82f6",
      minRequired: 3,
    },
    {
      id: "food",
      name: "Food & Dishes",
      description: "Menu items, plating, ingredients",
      icon: Camera,
      color: "#f59e0b",
      minRequired: 5,
    },
    {
      id: "kitchen",
      name: "Kitchen & Staff",
      description: "Behind the scenes, chef in action",
      icon: Camera,
      color: "#10b981",
      minRequired: 2,
    },
    {
      id: "exterior",
      name: "Exterior & Location",
      description: "Building, signage, outdoor seating",
      icon: Camera,
      color: "#8b5cf6",
      minRequired: 2,
    },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      const asset: MediaAsset = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: file.type.startsWith("video/") ? "video" : "photo",
        category: selectedCategory,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
      }
      setAssets((prev) => [...prev, asset])
    })
  }

  const removeAsset = (id: string) => {
    setAssets((prev) => {
      const asset = prev.find((a) => a.id === id)
      if (asset) {
        URL.revokeObjectURL(asset.preview)
      }
      return prev.filter((a) => a.id !== id)
    })
  }

  const getAssetsByCategory = (category: string) => {
    return assets.filter((asset) => asset.category === category)
  }

  const getCategoryProgress = (category: MediaCategory) => {
    const categoryAssets = getAssetsByCategory(category.id)
    return Math.min(100, (categoryAssets.length / category.minRequired) * 100)
  }

  const isComplete = categories.every((category) => getAssetsByCategory(category.id).length >= category.minRequired)
  const totalAssets = assets.length
  const totalRequired = categories.reduce((sum, cat) => sum + cat.minRequired, 0)

  const handleSave = () => {
    localStorage.setItem(
      "mediaAssets",
      JSON.stringify(
        assets.map((asset) => ({
          ...asset,
          file: null, // Don't store file object in localStorage
        })),
      ),
    )
    alert("Media assets saved successfully!")
  }

  const handleContinue = () => {
    handleSave()
    window.location.href = "/dashboard/profile/menu-builder"
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
        <span className="breadcrumb-current">Media Assets</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Media Assets</h1>
        <p className="text-gray-600">
          Upload high-quality photos and videos to showcase your restaurant for AI-generated marketing content
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="card p-4 mb-6" style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <span className="text-blue-900 font-medium">Step 3 of 3: Media Assets</span>
          </div>
          <div className="flex items-center gap-2">
            {isComplete && <CheckCircle className="h-5 w-5 text-green-600" />}
            <span className="text-blue-700 text-sm">
              {totalAssets}/{totalRequired} required assets
            </span>
          </div>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (totalAssets / totalRequired) * 100)}%` }}
          />
        </div>
      </div>

      {/* Upload Section */}
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upload Media</h2>
          <div className="text-sm text-gray-600">
            Category: <span className="font-medium">{categories.find((c) => c.id === selectedCategory)?.name}</span>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="form-label">Upload Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} - {category.description}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <Camera className="h-12 w-12 text-gray-400" />
              <Video className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <label htmlFor="media-upload" className="btn btn-primary cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos & Videos
              </label>
              <input
                id="media-upload"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500">Upload multiple files. Supports JPG, PNG, MP4, MOV up to 50MB each</p>
          </div>
        </div>
      </div>

      {/* Media Gallery by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const Icon = category.icon
          const categoryAssets = getAssetsByCategory(category.id)
          const progress = getCategoryProgress(category)
          const isCompleteCategory = categoryAssets.length >= category.minRequired

          return (
            <div key={category.id} className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                      <Icon className="h-5 w-5" style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {isCompleteCategory && <CheckCircle className="h-5 w-5 text-green-600" />}
                    <span className="text-sm font-medium" style={{ color: category.color }}>
                      {categoryAssets.length}/{category.minRequired} required
                    </span>
                    <button onClick={() => setSelectedCategory(category.id)} className="btn btn-secondary btn-sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Progress bar for category */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>

              <div className="p-6">
                {categoryAssets.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryAssets.map((asset) => (
                      <div key={asset.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          {asset.type === "photo" ? (
                            <img
                              src={asset.preview || "/placeholder.svg"}
                              alt="Media asset"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video src={asset.preview} className="w-full h-full object-cover" controls={false} muted />
                          )}
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <button
                            onClick={() => removeAsset(asset.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Type indicator */}
                        <div className="absolute top-2 right-2">
                          {asset.type === "video" && (
                            <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">Video</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      No {category.name.toLowerCase()} uploaded yet
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload at least {category.minRequired} {category.minRequired === 1 ? "photo" : "photos"} to
                      complete this section
                    </p>
                    <button onClick={() => setSelectedCategory(category.id)} className="btn btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add {category.name}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8">
        <a href="/dashboard/profile/brand-assets" className="btn btn-secondary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous: Brand Assets
        </a>

        <div className="flex gap-3">
          <button onClick={handleSave} className="btn btn-secondary">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>
          <button onClick={handleContinue} className="btn btn-primary" disabled={!isComplete}>
            Complete Setup & Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>

      {!isComplete && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Please upload the minimum required media assets for each category to complete your profile setup.
          </p>
        </div>
      )}
    </div>
  )
}
