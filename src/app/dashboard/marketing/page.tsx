"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const MarketingPage = () => {
  const [companyName, setCompanyName] = useState("")
  const [missionStatement, setMissionStatement] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [uniqueSellingProposition, setUniqueSellingProposition] = useState("")
  const [brandVoice, setBrandVoice] = useState("")
  const [keywords, setKeywords] = useState("")
  const [competitors, setCompetitors] = useState("")
  const [marketingGoals, setMarketingGoals] = useState("")
  const [funFacts, setFunFacts] = useState("")
  const [achievements, setAchievements] = useState("")
  const [awards, setAwards] = useState("")
  const [pressReleases, setPressReleases] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [brandAssets, setBrandAssets] = useState<File | null>(null)

  const { toast } = useToast()

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0])
    }
  }

  const handleBrandAssetsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBrandAssets(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!companyName || !missionStatement) {
      toast({
        title: "Error",
        description: "Company Name and Mission Statement are required.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    try {
      // Construct form data
      const formData = new FormData()
      formData.append("companyName", companyName)
      formData.append("missionStatement", missionStatement)
      formData.append("targetAudience", targetAudience)
      formData.append("uniqueSellingProposition", uniqueSellingProposition)
      formData.append("brandVoice", brandVoice)
      formData.append("keywords", keywords)
      formData.append("competitors", competitors)
      formData.append("marketingGoals", marketingGoals)
      formData.append("funFacts", funFacts)
      formData.append("achievements", achievements)
      formData.append("awards", awards)
      formData.append("pressReleases", pressReleases)

      if (logo) {
        formData.append("logo", logo)
      }
      if (brandAssets) {
        formData.append("brandAssets", brandAssets)
      }

      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Marketing strategy generated successfully!",
      })
    } catch (error) {
      console.error("Error generating marketing strategy:", error)
      toast({
        title: "Error",
        description: "Failed to generate marketing strategy.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] content-width">
        <CardHeader>
          <CardTitle>Smart Marketing Form</CardTitle>
          <CardDescription>Fill out the form below to generate a smart marketing strategy.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="missionStatement">Mission Statement</Label>
              <Textarea
                id="missionStatement"
                value={missionStatement}
                onChange={(e) => setMissionStatement(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="uniqueSellingProposition">Unique Selling Proposition (USP)</Label>
              <Textarea
                id="uniqueSellingProposition"
                value={uniqueSellingProposition}
                onChange={(e) => setUniqueSellingProposition(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="brandVoice">Brand Voice</Label>
              <Input id="brandVoice" type="text" value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="competitors">Competitors</Label>
              <Input
                id="competitors"
                type="text"
                value={competitors}
                onChange={(e) => setCompetitors(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="marketingGoals">Marketing Goals</Label>
              <Textarea
                id="marketingGoals"
                value={marketingGoals}
                onChange={(e) => setMarketingGoals(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="funFacts">Fun Facts</Label>
              <Textarea id="funFacts" value={funFacts} onChange={(e) => setFunFacts(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea id="achievements" value={achievements} onChange={(e) => setAchievements(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="awards">Awards</Label>
              <Textarea id="awards" value={awards} onChange={(e) => setAwards(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="pressReleases">Press Releases</Label>
              <Textarea id="pressReleases" value={pressReleases} onChange={(e) => setPressReleases(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" type="file" className="hidden" onChange={handleLogoUpload} />
              <Button variant="outline" asChild>
                <label htmlFor="logo" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {logo ? logo.name : "Upload Logo"}
                </label>
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brandAssets">Brand Assets</Label>
              <Input id="brandAssets" type="file" className="hidden" onChange={handleBrandAssetsUpload} />
              <Button variant="outline" asChild>
                <label htmlFor="brandAssets" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {brandAssets ? brandAssets.name : "Upload Brand Assets"}
                </label>
              </Button>
            </div>

            <Button type="submit">Generate Marketing Strategy</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default MarketingPage
