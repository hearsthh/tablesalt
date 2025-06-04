"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Facebook, Instagram, CheckCircle, AlertCircle, TrendingUp, Target, Users } from "lucide-react"

// Remove the import line and add these types after the other imports
interface AdPlatform {
  platform: string
  connected: boolean
  account_id?: string
  monthly_budget?: number
  campaign_objectives: string[]
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

export function AdPlatformStep({ onComplete, initialData }: OnboardingStepProps) {
  const [adPlatforms, setAdPlatforms] = useState<AdPlatform[]>(
    initialData?.adPlatforms || [
      { platform: "google_ads", connected: false, campaign_objectives: [] },
      { platform: "facebook_ads", connected: false, campaign_objectives: [] },
      { platform: "instagram_ads", connected: false, campaign_objectives: [] },
    ],
  )

  const platforms = [
    {
      id: "google_ads",
      name: "Google Ads",
      icon: Search,
      description: "Reach customers searching for restaurants",
      benefits: ["Local search ads", "Restaurant listings", "Call extensions", "Location targeting"],
      color: "bg-blue-600",
      objectives: ["Drive website traffic", "Increase phone calls", "Get directions", "Online orders"],
    },
    {
      id: "facebook_ads",
      name: "Facebook Ads",
      icon: Facebook,
      description: "Target specific demographics and interests",
      benefits: ["Detailed targeting", "Event promotion", "Video ads", "Retargeting"],
      color: "bg-blue-700",
      objectives: ["Brand awareness", "Event promotion", "Lead generation", "Website traffic"],
    },
    {
      id: "instagram_ads",
      name: "Instagram Ads",
      icon: Instagram,
      description: "Visual advertising for food and ambiance",
      benefits: ["Visual storytelling", "Stories ads", "Shopping tags", "Influencer reach"],
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      objectives: ["Brand awareness", "Engagement", "Website traffic", "App installs"],
    },
  ]

  const budgetRanges = [
    { value: "2000", label: "₹2,000/month - Starter" },
    { value: "5000", label: "₹5,000/month - Growth" },
    { value: "10000", label: "₹10,000/month - Scale" },
    { value: "20000", label: "₹20,000/month - Premium" },
    { value: "custom", label: "Custom Budget" },
  ]

  const handleTogglePlatform = (platformId: string) => {
    setAdPlatforms((prev: AdPlatform[]) =>
      prev.map((platform) =>
        platform.platform === platformId ? { ...platform, connected: !platform.connected } : platform,
      ),
    )
  }

  const handleBudgetUpdate = (platformId: string, budget: number) => {
    setAdPlatforms((prev: AdPlatform[]) =>
      prev.map((platform) => (platform.platform === platformId ? { ...platform, monthly_budget: budget } : platform)),
    )
  }

  const handleObjectiveToggle = (platformId: string, objective: string) => {
    setAdPlatforms((prev: AdPlatform[]) =>
      prev.map((platform) => {
        if (platform.platform === platformId) {
          const objectives = platform.campaign_objectives.includes(objective)
            ? platform.campaign_objectives.filter((obj: string) => obj !== objective)
            : [...platform.campaign_objectives, objective]
          return { ...platform, campaign_objectives: objectives }
        }
        return platform
      }),
    )
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/ad-platforms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adPlatforms }),
      })

      if (response.ok) {
        onComplete({ adPlatforms })
      }
    } catch (error) {
      console.error("Failed to save ad platforms:", error)
    }
  }

  const connectedCount = adPlatforms.filter((platform) => platform.connected).length
  const totalBudget: number = adPlatforms
    .filter((platform: AdPlatform) => platform.connected)
    .reduce((sum, platform: AdPlatform) => sum + (platform.monthly_budget || 0), 0)

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Connect Ad Platforms</CardTitle>
          <CardDescription>
            Set up advertising platforms to reach more customers and grow your restaurant business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Connected Platforms</p>
              <p className="text-2xl font-bold text-blue-600">{connectedCount}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Monthly Budget</p>
              <p className="text-2xl font-bold text-green-600">₹{totalBudget.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Estimated Reach</p>
              <p className="text-2xl font-bold text-purple-600">{(totalBudget * 10).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Setup */}
      <div className="space-y-6">
        {platforms.map((platform) => {
          const adPlatform = adPlatforms.find((ap) => ap.platform === platform.id)
          const isConnected = adPlatform?.connected || false

          return (
            <Card key={platform.id} className={`border-2 ${isConnected ? "border-green-200" : "border-gray-200"}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg text-white ${platform.color}`}>
                      <platform.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <CardDescription>{platform.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isConnected ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <Switch checked={isConnected} onCheckedChange={() => handleTogglePlatform(platform.id)} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Benefits */}
                <div>
                  <p className="text-sm font-medium mb-2">Platform Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {platform.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Configuration */}
                {isConnected && (
                  <div className="space-y-4 pt-4 border-t">
                    {/* Budget Selection */}
                    <div>
                      <Label htmlFor={`${platform.id}-budget`}>Monthly Budget</Label>
                      <Select
                        onValueChange={(value) => {
                          if (value !== "custom") {
                            handleBudgetUpdate(platform.id, Number.parseInt(value))
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select monthly budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {adPlatform?.monthly_budget && (
                        <p className="text-sm text-gray-600 mt-1">
                          Estimated daily reach: {((adPlatform.monthly_budget / 30) * 10).toFixed(0)} people
                        </p>
                      )}
                    </div>

                    {/* Campaign Objectives */}
                    <div>
                      <Label>Campaign Objectives</Label>
                      <p className="text-sm text-gray-600 mb-3">Select what you want to achieve with your ads</p>
                      <div className="grid grid-cols-2 gap-2">
                        {platform.objectives.map((objective) => (
                          <Button
                            key={objective}
                            variant={adPlatform?.campaign_objectives.includes(objective) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleObjectiveToggle(platform.id, objective)}
                            className="justify-start"
                          >
                            {objective}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Account Connection */}
                    <div>
                      <Label htmlFor={`${platform.id}-account`}>Account ID</Label>
                      <div className="flex space-x-2">
                        <Input
                          id={`${platform.id}-account`}
                          value={adPlatform?.account_id || ""}
                          placeholder={`Enter your ${platform.name} account ID`}
                          className="flex-1"
                        />
                        <Button variant="outline">Connect</Button>
                      </div>
                    </div>
                  </div>
                )}

                {!isConnected && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      Enable this platform to start running targeted ads for your restaurant
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ROI Information */}
      <Card>
        <CardHeader>
          <CardTitle>Expected ROI & Performance</CardTitle>
          <CardDescription>What you can expect from restaurant advertising</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Average ROI</h4>
              <p className="text-2xl font-bold text-green-600">3-5x</p>
              <p className="text-sm text-gray-600">Return on ad spend for restaurants</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">New Customers</h4>
              <p className="text-2xl font-bold text-blue-600">20-50</p>
              <p className="text-sm text-gray-600">Per month with ₹5,000 budget</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Conversion Rate</h4>
              <p className="text-2xl font-bold text-purple-600">2-5%</p>
              <p className="text-sm text-gray-600">Ad clicks to restaurant visits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
          Save Ad Platform Settings ({connectedCount} platforms, ₹{totalBudget.toLocaleString()}/month)
        </Button>
      </div>
    </div>
  )
}
