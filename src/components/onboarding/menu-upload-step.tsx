"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, X, FileText, Camera, Edit } from "lucide-react"

// Remove the import line and add these types after the other imports
interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
  dietary_info: string[]
  is_popular?: boolean
  is_available?: boolean
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

export function MenuUploadStep({ onComplete, initialData }: OnboardingStepProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialData?.menuItems || [])
  const [uploadMethod, setUploadMethod] = useState<"manual" | "file" | "photo">("manual")
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    dietary_info: [] as string[],
    is_popular: false,
    is_available: true,
  })
  const [newDietaryInfo, setNewDietaryInfo] = useState("")

  const categories = [
    "Starters/Appetizers",
    "Soups",
    "Salads",
    "Main Course",
    "Rice & Biryani",
    "Bread & Roti",
    "Desserts",
    "Beverages",
    "Chinese",
    "Continental",
    "South Indian",
    "North Indian",
    "Street Food",
    "Snacks",
  ]

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Spicy",
    "Mild",
    "Jain",
    "Halal",
    "Contains Eggs",
  ]

  const handleAddDietaryInfo = () => {
    if (newDietaryInfo && !newItem.dietary_info.includes(newDietaryInfo)) {
      setNewItem((prev) => ({
        ...prev,
        dietary_info: [...prev.dietary_info, newDietaryInfo],
      }))
      setNewDietaryInfo("")
    }
  }

  const handleRemoveDietaryInfo = (info: string) => {
    setNewItem((prev) => ({
      ...prev,
      dietary_info: prev.dietary_info.filter((d) => d !== info),
    }))
  }

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item: MenuItem = {
        id: Date.now().toString(),
        ...newItem,
      }
      setMenuItems((prev) => [...prev, item])
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "",
        dietary_info: [],
        is_popular: false,
        is_available: true,
      })
    }
  }

  const handleRemoveItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItems, uploadMethod }),
      })

      if (response.ok) {
        onComplete({ menuItems, uploadMethod })
      }
    } catch (error) {
      console.error("Failed to save menu:", error)
    }
  }

  const isComplete = menuItems.length >= 5 // Minimum 5 items required

  return (
    <div className="space-y-6">
      {/* Upload Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Upload Method</CardTitle>
          <CardDescription>Choose how you'd like to add your menu items</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "manual" | "file" | "photo")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manual" className="flex items-center">
                <Edit className="mr-2 h-4 w-4" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                Photo Scan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="mt-6">
              <div className="text-center py-4">
                <p className="text-gray-600">Add menu items one by one using the form below</p>
              </div>
            </TabsContent>

            <TabsContent value="file" className="mt-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Upload Menu File</p>
                <p className="text-gray-600 mb-4">PDF, Excel, or Word document</p>
                <Button variant="outline">Choose File</Button>
              </div>
            </TabsContent>

            <TabsContent value="photo" className="mt-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Scan Menu Photos</p>
                <p className="text-gray-600 mb-4">AI will extract menu items from photos</p>
                <Button variant="outline">Upload Photos</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Manual Entry Form */}
      {uploadMethod === "manual" && (
        <Card>
          <CardHeader>
            <CardTitle>Add Menu Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="item-name">Item Name *</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Butter Chicken"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={newItem.price || ""}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                  placeholder="299"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the dish, ingredients, cooking style..."
                rows={2}
              />
            </div>

            <div>
              <Label>Dietary Information</Label>
              <div className="flex space-x-2 mt-2">
                <Select onValueChange={setNewDietaryInfo}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select dietary info" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietaryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddDietaryInfo} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {newItem.dietary_info.map((info) => (
                  <Badge
                    key={info}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveDietaryInfo(info)}
                  >
                    {info} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newItem.is_popular}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, is_popular: e.target.checked }))}
                />
                <span>Popular Item</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newItem.is_available}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, is_available: e.target.checked }))}
                />
                <span>Currently Available</span>
              </label>
            </div>

            <Button
              onClick={handleAddItem}
              disabled={!newItem.name || !newItem.price || !newItem.category}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Menu Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items ({menuItems.length})</CardTitle>
          <CardDescription>Your restaurant menu organized by category</CardDescription>
        </CardHeader>
        <CardContent>
          {menuItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="mx-auto h-12 w-12 mb-4" />
              <p>No menu items added yet</p>
              <p className="text-sm">Add at least 5 items to continue</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category, categoryIndex) => {
                const categoryItems = menuItems.filter((item) => item.category === category)
                if (categoryItems.length === 0) return null

                return (
                  <div key={category}>
                    <h4 className="font-medium text-lg mb-3">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryItems.map((item, itemIndex) => (
                        <div key={item.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h5 className="font-medium">{item.name}</h5>
                                {item.is_popular && <Badge variant="default">Popular</Badge>}
                                {!item.is_available && <Badge variant="secondary">Unavailable</Badge>}
                              </div>
                              <p className="text-lg font-semibold text-green-600">₹{item.price}</p>
                              {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.dietary_info.map((ingredient: string) => (
                              <Badge key={ingredient} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!isComplete} className="bg-orange-600 hover:bg-orange-700">
          Save Menu ({menuItems.length} items)
        </Button>
      </div>
    </div>
  )
}
