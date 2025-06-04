"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Database, FileText, Users, TrendingUp, Heart, Clock } from "lucide-react"

// Remove the import line and add these types after the other imports
interface CustomerData {
  source: "crm" | "upload" | "manual"
  total_customers?: number
  segments: CustomerSegment[]
  preferences: string[]
  avg_order_value?: number
}

interface CustomerSegment {
  name: string
  count: number
  characteristics: string[]
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

export function CustomerDataStep({ onComplete, initialData }: OnboardingStepProps) {
  const [customerData, setCustomerData] = useState<CustomerData>(
    initialData?.customerData || {
      source: "manual",
      segments: [],
      preferences: [],
    },
  )
  const [dataSource, setDataSource] = useState<"crm" | "upload" | "manual">("manual")

  const crmPlatforms = [
    { id: "zomato", name: "Zomato for Business", description: "Restaurant management platform" },
    { id: "swiggy", name: "Swiggy Partner", description: "Food delivery platform" },
    { id: "petpooja", name: "PetPooja", description: "Restaurant POS system" },
    { id: "eazydiner", name: "EazyDiner", description: "Table reservation platform" },
    { id: "dineout", name: "Dineout", description: "Restaurant discovery platform" },
    { id: "custom", name: "Custom CRM", description: "Your own customer database" },
  ]

  const defaultSegments: CustomerSegment[] = [
    {
      name: "Regular Customers",
      count: 150,
      characteristics: ["Visits 2+ times/month", "High loyalty", "Word-of-mouth promoters"],
    },
    {
      name: "Occasional Diners",
      count: 300,
      characteristics: ["Visits monthly", "Price-conscious", "Special occasion diners"],
    },
    {
      name: "New Customers",
      count: 100,
      characteristics: ["First-time visitors", "Discovery phase", "Social media influenced"],
    },
    { name: "Corporate Clients", count: 50, characteristics: ["Bulk orders", "Lunch meetings", "Regular bookings"] },
  ]

  const commonPreferences = [
    "Vegetarian options",
    "Spicy food",
    "Quick service",
    "Family dining",
    "Romantic ambiance",
    "Live music",
    "Outdoor seating",
    "Home delivery",
    "Takeaway",
    "Corporate catering",
  ]

  const handleSourceChange = (value: "crm" | "upload" | "manual") => {
    setDataSource(value)
    setCustomerData((prev: CustomerData) => ({ ...prev, source: value }))
  }

  const handleManualSetup = () => {
    setCustomerData((prev: CustomerData) => ({
      ...prev,
      segments: defaultSegments,
      total_customers: defaultSegments.reduce((sum, segment) => sum + segment.count, 0),
      avg_order_value: 450,
    }))
  }

  const handlePreferenceToggle = (preference: string) => {
    setCustomerData((prev: CustomerData) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p: string) => p !== preference)
        : [...prev.preferences, preference],
    }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/customer-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      })

      if (response.ok) {
        onComplete({ customerData })
      }
    } catch (error) {
      console.error("Failed to save customer data:", error)
    }
  }

  const isComplete = customerData.segments.length > 0 && customerData.preferences.length > 0

  return (
    <div className="space-y-6">
      {/* Data Source Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Data Integration</CardTitle>
          <CardDescription>Connect your existing customer data or set up basic customer insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={dataSource} onValueChange={(value) => handleSourceChange(value as "crm" | "upload" | "manual")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="crm" className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                CRM Integration
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Manual Setup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crm" className="mt-6">
              <div className="space-y-4">
                <p className="text-gray-600">Connect your existing CRM or restaurant management platform</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {crmPlatforms.map((platform) => (
                    <Card key={platform.id} className="cursor-pointer hover:border-orange-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{platform.name}</h4>
                            <p className="text-sm text-gray-600">{platform.description}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-6">
              <div className="space-y-4">
                <p className="text-gray-600">Upload your existing customer data file</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Customer Data</p>
                  <p className="text-gray-600 mb-4">CSV, Excel files with customer information</p>
                  <Button variant="outline">Choose File</Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Required columns:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Customer Name</li>
                    <li>Phone/Email</li>
                    <li>Visit Frequency (optional)</li>
                    <li>Average Order Value (optional)</li>
                    <li>Preferences (optional)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="mt-6">
              <div className="space-y-4">
                <p className="text-gray-600">Set up basic customer insights manually</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="total-customers">Total Customers (approx.)</Label>
                    <Input
                      id="total-customers"
                      type="number"
                      value={customerData.total_customers || ""}
                      onChange={(e) =>
                        setCustomerData((prev: CustomerData) => ({
                          ...prev,
                          total_customers: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="avg-order">Average Order Value (₹)</Label>
                    <Input
                      id="avg-order"
                      type="number"
                      value={customerData.avg_order_value || ""}
                      onChange={(e) =>
                        setCustomerData((prev: CustomerData) => ({
                          ...prev,
                          avg_order_value: Number.parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="450"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleManualSetup} className="w-full">
                      Setup Default Segments
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      {customerData.segments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Customer Segments
            </CardTitle>
            <CardDescription>Your customer base broken down by behavior and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customerData.segments.map((segment: CustomerSegment, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{segment.name}</h4>
                      <Badge variant="secondary">{segment.count} customers</Badge>
                    </div>
                    <div className="space-y-2">
                      {segment.characteristics.map((char: string, i: number) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                          {char}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Customer Preferences
          </CardTitle>
          <CardDescription>What your customers typically prefer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {commonPreferences.map((preference) => (
              <Button
                key={preference}
                variant={customerData.preferences.includes(preference) ? "default" : "outline"}
                size="sm"
                onClick={() => handlePreferenceToggle(preference)}
                className="justify-start"
              >
                {preference}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Selected: {customerData.preferences.length} preferences</p>
          </div>
        </CardContent>
      </Card>

      {/* Insights Preview */}
      {customerData.total_customers && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium">Total Customers</p>
                <p className="text-2xl font-bold text-blue-600">{customerData.total_customers}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium">Avg Order Value</p>
                <p className="text-2xl font-bold text-green-600">₹{customerData.avg_order_value}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium">Preferences</p>
                <p className="text-2xl font-bold text-purple-600">{customerData.preferences.length}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="font-medium">Segments</p>
                <p className="text-2xl font-bold text-orange-600">{customerData.segments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!isComplete} className="bg-orange-600 hover:bg-orange-700">
          Save Customer Data
        </Button>
      </div>
    </div>
  )
}
