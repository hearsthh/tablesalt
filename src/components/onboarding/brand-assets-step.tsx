"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Palette, Type, MessageSquare, X, Plus } from "lucide-react"

// Remove the import line and add these types after the other imports
interface BrandAssets {
  logo_url?: string
  tagline: string
  brand_colors: string[]
  brand_fonts: string[]
  brand_voice: string
  brand_personality: string[]
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

export function BrandAssetsStep({ onComplete, initialData }: OnboardingStepProps) {
  const [formData, setFormData] = useState<BrandAssets>({
    logo_url: initialData?.logo_url || "",
    tagline: initialData?.tagline || "",
    brand_colors: initialData?.brand_colors || [],
    brand_fonts: initialData?.brand_fonts || [],
    brand_voice: initialData?.brand_voice || "",
    brand_personality: initialData?.brand_personality || [],
  })

  const [newColor, setNewColor] = useState("")
  const [newFont, setNewFont] = useState("")
  const [newPersonality, setNewPersonality] = useState("")

  const brandVoiceOptions = [
    { value: "casual", label: "Casual & Friendly" },
    { value: "professional", label: "Professional & Polished" },
    { value: "luxury", label: "Luxury & Sophisticated" },
    { value: "traditional", label: "Traditional & Authentic" },
    { value: "modern", label: "Modern & Trendy" },
  ]

  const personalityTraits = [
    "Warm",
    "Welcoming",
    "Authentic",
    "Innovative",
    "Traditional",
    "Modern",
    "Family-friendly",
    "Romantic",
    "Energetic",
    "Calm",
    "Sophisticated",
    "Playful",
  ]

  const handleAddColor = () => {
    if (newColor && !formData.brand_colors.includes(newColor)) {
      const updatedColors = [...formData.brand_colors, newColor]
      setFormData((prev: BrandAssets) => ({ ...prev, brand_colors: updatedColors }))
      setNewColor("")
    }
  }

  const handleRemoveColor = (color: string) => {
    setFormData((prev: BrandAssets) => ({
      ...prev,
      brand_colors: prev.brand_colors.filter((c: string) => c !== color),
    }))
  }

  const handleAddFont = () => {
    if (newFont && !formData.brand_fonts.includes(newFont)) {
      const updatedFonts = [...formData.brand_fonts, newFont]
      setFormData((prev: BrandAssets) => ({ ...prev, brand_fonts: updatedFonts }))
      setNewFont("")
    }
  }

  const handleRemoveFont = (font: string) => {
    setFormData((prev: BrandAssets) => ({
      ...prev,
      brand_fonts: prev.brand_fonts.filter((f: string) => f !== font),
    }))
  }

  const handleAddPersonality = (trait: string) => {
    if (!formData.brand_personality.includes(trait)) {
      setFormData((prev: BrandAssets) => ({
        ...prev,
        brand_personality: [...prev.brand_personality, trait],
      }))
    }
  }

  const handleRemovePersonality = (trait: string) => {
    setFormData((prev: BrandAssets) => ({
      ...prev,
      brand_personality: prev.brand_personality.filter((t: string) => t !== trait),
    }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/brand-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onComplete(formData)
      }
    } catch (error) {
      console.error("Failed to save brand assets:", error)
    }
  }

  const isComplete = formData.tagline && formData.brand_voice && formData.brand_colors.length > 0

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Logo Upload
          </CardTitle>
          <CardDescription>Upload your restaurant logo for consistent branding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {formData.logo_url ? (
              <div className="space-y-4">
                <img src={formData.logo_url || "/placeholder.svg"} alt="Logo" className="mx-auto h-24 object-contain" />
                <Button
                  variant="outline"
                  onClick={() => setFormData((prev: BrandAssets) => ({ ...prev, logo_url: "" }))}
                >
                  Change Logo
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Upload Your Logo</p>
                <p className="text-gray-600 mb-4">PNG, JPG, SVG up to 5MB</p>
                <Button variant="outline">Choose File</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Brand Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Identity</CardTitle>
          <CardDescription>Define your restaurant's brand personality and voice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tagline */}
          <div>
            <Label htmlFor="tagline">Brand Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData((prev: BrandAssets) => ({ ...prev, tagline: e.target.value }))}
              placeholder="e.g., Authentic Italian flavors in the heart of the city"
            />
          </div>

          {/* Brand Voice */}
          <div>
            <Label htmlFor="brand_voice">Brand Voice</Label>
            <Select onValueChange={(value) => setFormData((prev: BrandAssets) => ({ ...prev, brand_voice: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your brand voice" />
              </SelectTrigger>
              <SelectContent>
                {brandVoiceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand Colors */}
          <div>
            <Label className="flex items-center">
              <Palette className="mr-2 h-4 w-4" />
              Brand Colors
            </Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Enter color (hex, name, or RGB)"
                className="flex-1"
              />
              <Button onClick={handleAddColor} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.brand_colors.map((color: string) => (
                <Badge
                  key={color}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRemoveColor(color)}
                >
                  {color} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Brand Fonts */}
          <div>
            <Label className="flex items-center">
              <Type className="mr-2 h-4 w-4" />
              Brand Fonts
            </Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newFont}
                onChange={(e) => setNewFont(e.target.value)}
                placeholder="Enter font name"
                className="flex-1"
              />
              <Button onClick={handleAddFont} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.brand_fonts.map((font: string) => (
                <Badge key={font} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveFont(font)}>
                  {font} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Brand Personality */}
          <div>
            <Label className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Brand Personality
            </Label>
            <p className="text-sm text-gray-600 mb-3">Select traits that describe your restaurant</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {personalityTraits.map((trait: string) => (
                <Button
                  key={trait}
                  variant={formData.brand_personality.includes(trait) ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    formData.brand_personality.includes(trait)
                      ? handleRemovePersonality(trait)
                      : handleAddPersonality(trait)
                  }
                >
                  {trait}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.brand_personality.map((trait: string) => (
                <Badge key={trait} variant="default">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!isComplete} className="bg-orange-600 hover:bg-orange-700">
          Save Brand Assets
        </Button>
      </div>
    </div>
  )
}
