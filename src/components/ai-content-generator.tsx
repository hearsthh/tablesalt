"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2, Instagram, Facebook, MessageCircle, Calendar, Send, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { createAIGenerator } from "@/lib/ai-content-generator"

interface AIContentGeneratorProps {
  restaurantData: {
    name: string
    cuisine: string
    specialties: string[]
    description: string
  }
}

export function AIContentGenerator({ restaurantData }: AIContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [selectedPlatform, setSelectedPlatform] = useState("instagram")
  const [contentType, setContentType] = useState("food-photo")
  const [customPrompt, setCustomPrompt] = useState("")

  const generateContent = async () => {
    setIsGenerating(true)
    try {
      // Use the existing AI service
      const aiGenerator = await createAIGenerator("demo-restaurant-id")
      const result = await aiGenerator.generateSinglePost(selectedPlatform, contentType, customPrompt)

      if (result.success) {
        // Parse the AI response to extract structured content
        const lines = result.post.split("\n")
        const caption =
          lines
            .find((line: string) => line.includes("Caption:"))
            ?.replace("Caption:", "")
            .trim() || result.post
        const hashtags = lines
          .find((line: string) => line.includes("Hashtags:"))
          ?.replace("Hashtags:", "")
          .trim()
          .split(" ")
          .map((tag: string) => tag.replace("#", "")) || ["RestaurantLife", "FoodLove", "LocalEats"]

        setGeneratedContent({
          caption: caption,
          hashtags: hashtags,
          bestTimeToPost: "7:00 PM - 9:00 PM",
          engagementPrediction: "High (85% expected engagement)",
        })
      }
    } catch (error) {
      console.error("Failed to generate content:", error)
      // Fallback to demo content
      setGeneratedContent({
        caption: `🍽️ Experience authentic ${restaurantData.cuisine} cuisine at ${restaurantData.name}! Our ${restaurantData.specialties?.[0] || "signature dishes"} are made with love and the finest ingredients. ${customPrompt ? `\n\n${customPrompt}` : ""}`,
        hashtags: ["AuthenticCuisine", "FreshIngredients", "LocalFavorite", restaurantData.cuisine.replace(/\s+/g, "")],
        bestTimeToPost: "7:00 PM - 9:00 PM",
        engagementPrediction: "High (85% expected engagement)",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateWeeklyPlan = async () => {
    setIsGenerating(true)
    try {
      // Use the existing AI service
      const aiGenerator = await createAIGenerator("demo-restaurant-id")
      const strategy = await aiGenerator.generateSocialMediaStrategy(1, customPrompt) // 1 month

      if (strategy.success) {
        const currentDate = new Date()
        const posts = []

        // Generate sample posts for the week
        for (let i = 0; i < 7; i++) {
          const postDate = new Date(currentDate)
          postDate.setDate(currentDate.getDate() + i)

          posts.push({
            title: `${postDate.toLocaleDateString("en-US", { weekday: "long" })} Special`,
            content: `Discover our amazing ${restaurantData.specialties?.[i % restaurantData.specialties.length] || "signature dish"} today! 🍽️`,
            platform: i % 2 === 0 ? "Instagram" : "Facebook",
            scheduledTime: `${postDate.toLocaleDateString()} 6:00 PM`,
            contentType: i % 3 === 0 ? "Food Photo" : i % 3 === 1 ? "Behind the Scenes" : "Customer Story",
            hashtags: strategy.strategy.hashtag_strategy?.slice(0, 3) || ["FoodLove", "LocalEats", "Delicious"],
          })
        }

        setGeneratedContent({ posts })
      }
    } catch (error) {
      console.error("Failed to generate plan:", error)
      // Fallback to demo content
      setGeneratedContent({
        posts: [
          {
            title: "Monday Special",
            content: `Start your week with our signature ${restaurantData.specialties?.[0] || "dish"}! 🍕`,
            platform: "Instagram",
            scheduledTime: "Monday 6:00 PM",
            contentType: "Food Photo",
            hashtags: ["MondaySpecial", "Signature", "Fresh"],
          },
          {
            title: "Behind the Scenes",
            content: "Watch our chef prepare fresh ingredients with passion! 👨‍🍳",
            platform: "Facebook",
            scheduledTime: "Tuesday 2:00 PM",
            contentType: "Video",
            hashtags: ["BehindTheScenes", "Fresh", "Handmade"],
          },
          {
            title: "Customer Story",
            content: "Thank you for choosing us for your special moments! ❤️",
            platform: "Instagram",
            scheduledTime: "Wednesday 7:30 PM",
            contentType: "Customer Photo",
            hashtags: ["CustomerLove", "SpecialMoments", "Grateful"],
          },
        ],
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const schedulePost = async () => {
    // In a real implementation, this would integrate with social media APIs
    alert("Post scheduled successfully! (Demo mode)")
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return Instagram
      case "facebook":
        return Facebook
      case "whatsapp":
        return MessageCircle
      default:
        return Instagram
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="flex items-center text-xl font-medium">
            <Wand2 className="mr-2 h-5 w-5 text-orange-500 opacity-80" />
            AI Content Generator
          </CardTitle>
          <CardDescription>Generate engaging social media content automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Platform</Label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food-photo">Food Photo</SelectItem>
                  <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                  <SelectItem value="customer-story">Customer Story</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="event">Event Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <Label className="text-sm font-medium mb-2 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
              AI Customization
            </Label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Add specific instructions for the AI, e.g., 'Highlight our new dessert menu', 'Use a casual tone', 'Include a special offer'"
              rows={3}
              className="resize-none mt-2"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={generateContent}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Post
                </>
              )}
            </Button>
            <Button
              onClick={generateWeeklyPlan}
              disabled={isGenerating}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Weekly Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedContent && generatedContent.caption && (
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center text-xl font-medium">
              {(() => {
                const Icon = getPlatformIcon(selectedPlatform)
                return <Icon className="mr-2 h-5 w-5 text-gray-700 opacity-80" />
              })()}
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
            <div>
              <Label className="text-sm font-medium mb-2 block">Caption</Label>
              <Textarea
                value={generatedContent.caption}
                onChange={(e) =>
                  setGeneratedContent({
                    ...generatedContent,
                    caption: e.target.value,
                  })
                }
                rows={4}
                className="resize-none"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Hashtags</Label>
              <div className="flex flex-wrap gap-1">
                {generatedContent.hashtags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 font-normal">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium block mb-1">Best time to post:</span>
                <p className="text-gray-600">{generatedContent.bestTimeToPost}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium block mb-1">Engagement prediction:</span>
                <p className="text-gray-600">{generatedContent.engagementPrediction}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={schedulePost}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
              <Button variant="outline" onClick={generateContent} className="flex-1 sm:flex-none">
                <Wand2 className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedContent && generatedContent.posts && (
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-xl font-medium">Generated Weekly Plan</CardTitle>
            <CardDescription>AI-created content calendar for the week</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-4">
              {generatedContent.posts.map((post: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 hover:border-orange-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{post.title}</h4>
                    <Badge variant="outline" className="bg-gray-50">
                      {post.platform}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.scheduledTime}</span>
                    <span>{post.contentType}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.hashtags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700 font-normal"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule All Posts
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
