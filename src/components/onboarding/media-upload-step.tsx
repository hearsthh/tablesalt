"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, Video, Camera, X, Plus } from "lucide-react"

// Remove the import line and add these types after the other imports
interface MediaAsset {
  id: string
  url: string
  type: "image" | "video"
  category: "restaurant" | "kitchen" | "food" | "ambiance" | "staff"
  description?: string
  tags: string[]
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

export function MediaUploadStep({ onComplete, initialData }: OnboardingStepProps) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(initialData?.mediaAssets || [])
  const [newAsset, setNewAsset] = useState({
    url: "",
    type: "image" as "image" | "video",
    category: "" as string,
    description: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  const categories = [
    { value: "restaurant", label: "Restaurant Exterior/Interior", icon: Camera },
    { value: "kitchen", label: "Kitchen & Preparation", icon: Camera },
    { value: "food", label: "Food Items & Dishes", icon: ImageIcon },
    { value: "ambiance", label: "Ambiance & Atmosphere", icon: ImageIcon },
    { value: "staff", label: "Staff & Service", icon: Camera },
  ]

  const handleAddTag = () => {
    if (newTag && !newAsset.tags.includes(newTag)) {
      setNewAsset((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewAsset((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleAddAsset = () => {
    if (newAsset.url && newAsset.category) {
      const asset: MediaAsset = {
        id: Date.now().toString(),
        url: newAsset.url,
        type: newAsset.type,
        category: newAsset.category as "restaurant" | "kitchen" | "food" | "ambiance" | "staff",
        description: newAsset.description,
        tags: newAsset.tags,
      }
      setMediaAssets((prev: MediaAsset[]) => [...prev, asset])
      setNewAsset({
        url: "",
        type: "image",
        category: "",
        description: "",
        tags: [],
      })
    }
  }

  const handleRemoveAsset = (id: string) => {
    setMediaAssets((prev: MediaAsset[]) => prev.filter((asset) => asset.id !== id))
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/media-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaAssets }),
      })

      if (response.ok) {
        onComplete({ mediaAssets })
      }
    } catch (error) {
      console.error("Failed to save media assets:", error)
    }
  }

  const isComplete = mediaAssets.length >= 3 // Minimum 3 assets required

  return (
    <div className="space-y-6">
      {/* Upload Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Media Upload Guidelines
          </CardTitle>
          <CardDescription>
            Upload high-quality photos and videos that showcase your restaurant's best features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">📸 Photo Requirements:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• High resolution (min 1080x1080)</li>
                <li>• Good lighting and composition</li>
                <li>• JPG, PNG formats</li>
                <li>• Max 5MB per file</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎥 Video Requirements:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• HD quality (min 720p)</li>
                <li>• 15-60 seconds duration</li>
                <li>• MP4, MOV formats</li>
                <li>• Max 50MB per file</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Asset */}
      <Card>
        <CardHeader>
          <CardTitle>Add Media Asset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asset-type">Media Type</Label>
              <Select onValueChange={(value: "image" | "video") => setNewAsset((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">
                    <div className="flex items-center">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Image
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value: string) => setNewAsset((prev) => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center">
                        <cat.icon className="mr-2 h-4 w-4" />
                        {cat.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="asset-url">File URL or Upload</Label>
            <div className="flex space-x-2">
              <Input
                id="asset-url"
                value={newAsset.url}
                onChange={(e) => setNewAsset((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="Enter file URL or upload file"
                className="flex-1"
              />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newAsset.description}
              onChange={(e) => setNewAsset((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what's shown in this media"
              rows={2}
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tags (e.g., spicy, vegetarian, signature)"
                className="flex-1"
              />
              <Button onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {newAsset.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                  {tag} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleAddAsset} disabled={!newAsset.url || !newAsset.category} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Media Asset
          </Button>
        </CardContent>
      </Card>

      {/* Media Library */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library ({mediaAssets.length} assets)</CardTitle>
          <CardDescription>Your uploaded media assets organized by category</CardDescription>
        </CardHeader>
        <CardContent>
          {mediaAssets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Camera className="mx-auto h-12 w-12 mb-4" />
              <p>No media assets uploaded yet</p>
              <p className="text-sm">Add at least 3 assets to continue</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaAssets.map((asset: MediaAsset) => (
                <div key={asset.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{asset.category}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAsset(asset.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    {asset.type === "image" ? (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    ) : (
                      <Video className="h-8 w-8 text-gray-400" />
                    )}
                  </div>

                  {asset.description && <p className="text-sm text-gray-600">{asset.description}</p>}

                  <div className="flex flex-wrap gap-1">
                    {asset.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!isComplete} className="bg-orange-600 hover:bg-orange-700">
          Save Media Assets ({mediaAssets.length} assets)
        </Button>
      </div>
    </div>
  )
}
