"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Star, Plus, X } from "lucide-react"

interface RestaurantData {
  id?: string
  name: string
  cuisine: string
  description: string
  address: string
  phone: string
  email?: string
  website?: string
  hours?: string
  price_range: string
  specialties: string[]
  awards: string[]
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

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
  "Other",
]

const priceRanges = [
  { value: "$", label: "$ - Budget Friendly" },
  { value: "$$", label: "$$ - Moderate" },
  { value: "$$$", label: "$$$ - Upscale" },
  { value: "$$$$", label: "$$$$ - Fine Dining" },
]

export function RestaurantSetupStep({ onComplete, initialData }: OnboardingStepProps) {
  const [formData, setFormData] = useState<RestaurantData>(
    initialData || {
      name: "",
      cuisine: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      hours: "",
      price_range: "",
      specialties: [],
      awards: [],
    },
  )

  const [newSpecialty, setNewSpecialty] = useState("")
  const [newAward, setNewAward] = useState("")

  const handleInputChange = (field: keyof RestaurantData, value: string) => {
    setFormData((prev: RestaurantData) => ({ ...prev, [field]: value }))
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData((prev: RestaurantData) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }))
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData((prev: RestaurantData) => ({
      ...prev,
      specialties: prev.specialties.filter((s: string) => s !== specialty),
    }))
  }

  const addAward = () => {
    if (newAward.trim() && !formData.awards.includes(newAward.trim())) {
      setFormData((prev: RestaurantData) => ({
        ...prev,
        awards: [...prev.awards, newAward.trim()],
      }))
      setNewAward("")
    }
  }

  const removeAward = (award: string) => {
    setFormData((prev: RestaurantData) => ({
      ...prev,
      awards: prev.awards.filter((a: string) => a !== award),
    }))
  }

  const handleSubmit = () => {
    onComplete(formData)
  }

  const isFormValid = formData.name && formData.cuisine && formData.description && formData.address && formData.phone

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Information</h2>
        <p className="text-gray-600">Tell us about your restaurant to personalize your marketing content</p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-orange-500" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential details about your restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Restaurant Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Bella Vista Italian"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cuisine">Cuisine Type *</Label>
                <Select value={formData.cuisine} onValueChange={(value) => handleInputChange("cuisine", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select cuisine type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineTypes.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your restaurant's atmosphere, style, and what makes it special..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price_range">Price Range</Label>
              <Select value={formData.price_range} onValueChange={(value) => handleInputChange("price_range", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-blue-500" />
              Contact Information
            </CardTitle>
            <CardDescription>How customers can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Full restaurant address"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="restaurant@example.com"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourrestaurant.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="hours">Operating Hours</Label>
                <Input
                  id="hours"
                  value={formData.hours}
                  onChange={(e) => handleInputChange("hours", e.target.value)}
                  placeholder="Mon-Sun: 11AM-10PM"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Specialties & Signature Dishes
            </CardTitle>
            <CardDescription>What are you famous for?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="e.g., Wood-fired Pizza, Homemade Pasta"
                onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
              />
              <Button onClick={addSpecialty} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {specialty}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeSpecialty(specialty)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Awards & Recognition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-purple-500" />
              Awards & Recognition
            </CardTitle>
            <CardDescription>Any awards, certifications, or notable mentions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newAward}
                onChange={(e) => setNewAward(e.target.value)}
                placeholder="e.g., Best Italian Restaurant 2023, Michelin Guide"
                onKeyPress={(e) => e.key === "Enter" && addAward()}
              />
              <Button onClick={addAward} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.awards.map((award: string, index: number) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {award}
                    <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeAward(award)} />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!isFormValid}>
          Continue
        </Button>
      </div>
    </div>
  )
}
