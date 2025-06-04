"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Target, Calendar, TrendingUp, Copy, CheckCircle } from "lucide-react"

// Remove the import line and add these types after the other imports
interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

export function AIStrategyGeneration({ onComplete, initialData, allData }: OnboardingStepProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [strategy, setStrategy] = useState<any>(initialData?.strategy || null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [copied, setCopied] = useState(false)

  const generateStrategy = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantData: allData?.[1],
          brandAssets: allData?.[2],
          mediaAssets: allData?.[3],
          menuItems: allData?.[4],
          channels: allData?.[5],
          adPlatforms: allData?.[6],
          customerData: allData?.[7],
          customPrompt,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setStrategy(result.strategy)
        onComplete({ strategy: result.strategy })
      }
    } catch (error) {
      console.error("Failed to generate strategy:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const dataCompleteness = () => {
    const steps = [
      allData?.[1], // restaurant
      allData?.[2], // brand
      allData?.[3], // media
      allData?.[4], // menu
      allData?.[5], // channels
      allData?.[6], // ads
      allData?.[7], // customers
    ]
    return steps.filter(Boolean).length
  }

  return (
    <div className="space-y-6">
      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-orange-500 opacity-80" />
            AI Strategy Generation
          </CardTitle>
          <CardDescription>
            Generate a comprehensive marketing strategy based on all your restaurant data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-500 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Data Completeness</p>
              <p className="text-2xl font-bold text-blue-600">{dataCompleteness()}/7</p>
              <p className="text-sm text-gray-600">Steps completed</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="h-6 w-6 text-green-500 mx-auto mb-2 opacity-80" />
              <p className="font-medium">Strategy Scope</p>
              <p className="text-2xl font-bold text-green-600">3-6</p>
              <p className="text-sm text-gray-600">Months coverage</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-500 mx-auto mb-2 opacity-80" />
              <p className="font-medium">AI Analysis</p>
              <p className="text-2xl font-bold text-purple-600">Advanced</p>
              <p className="text-sm text-gray-600">GPT-4 powered</p>
            </div>
          </div>

          {/* Enhanced Custom Prompt */}
          <div className="space-y-3 mb-6 border rounded-lg p-4 bg-gray-50">
            <Label htmlFor="custom-prompt" className="text-base font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
              AI Customization
            </Label>
            <p className="text-sm text-gray-600">
              Provide specific goals, challenges, or requirements to customize your marketing strategy
            </p>
            <Textarea
              id="custom-prompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Examples: 'Focus on attracting young professionals', 'Highlight our new seasonal menu', 'Increase weekend bookings', 'Promote our outdoor seating area'"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateStrategy}
            disabled={isGenerating || dataCompleteness() < 4}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating AI Strategy...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Marketing Strategy
              </>
            )}
          </Button>

          {dataCompleteness() < 4 && (
            <p className="text-sm text-gray-600 text-center mt-2">
              Complete at least 4 steps to generate a comprehensive strategy
            </p>
          )}
        </CardContent>
      </Card>

      {/* Generated Strategy */}
      {strategy && (
        <div className="space-y-6">
          {/* Marketing Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Marketing Objectives
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(strategy.objectives?.join("\n") || "")}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {strategy.objectives?.map((objective: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <p>{objective}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle>Target Audience Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategy.targetAudience?.map((audience: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{audience.segment}</h4>
                    <p className="text-sm text-gray-600 mb-3">{audience.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {audience.characteristics?.map((char: string, charIndex: number) => (
                        <Badge key={charIndex} variant="secondary" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Content Strategy & Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategy.contentPillars?.map((pillar: any, index: number) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-medium">{pillar.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{pillar.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600">📅 {pillar.frequency}</span>
                      <span className="text-green-600">📊 {pillar.platforms?.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Posting Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Optimal Posting Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategy.postingSchedule?.map((schedule: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <h4 className="font-medium">{schedule.platform}</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Frequency:</strong> {schedule.frequency}
                      </p>
                      <p>
                        <strong>Best Times:</strong> {schedule.optimalTimes?.join(", ")}
                      </p>
                      <p>
                        <strong>Content Types:</strong> {schedule.contentTypes?.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Success Metrics & KPIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategy.kpis?.map((kpi: any, index: number) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">{kpi.metric}</h4>
                    <p className="text-2xl font-bold text-orange-600">{kpi.target}</p>
                    <p className="text-sm text-gray-600">{kpi.timeframe}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
