"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook, MessageCircle, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

interface ChannelConnection {
  platform: string
  connected: boolean
  account_id?: string
  access_token?: string
  page_id?: string
}

interface OnboardingStepProps {
  onComplete: (data: any) => void
  initialData?: any
  allData?: Record<number, any>
}

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    description: "Share photos and stories",
    features: ["Photo posts", "Stories", "Reels", "IGTV"],
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Connect with your community",
    features: ["Posts", "Events", "Reviews", "Messenger"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: MessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "Direct customer communication",
    features: ["Broadcast lists", "Catalogs", "Quick replies", "Labels"],
  },
]

export function ChannelConnectionStep({ onComplete, initialData }: OnboardingStepProps) {
  const [connections, setConnections] = useState<ChannelConnection[]>(
    initialData?.connections || [
      { platform: "instagram", connected: false },
      { platform: "facebook", connected: false },
      { platform: "whatsapp", connected: false },
    ],
  )
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = async (platformId: string) => {
    setIsConnecting(platformId)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setConnections((prev: ChannelConnection[]) =>
      prev.map((conn) =>
        conn.platform === platformId
          ? {
              ...conn,
              connected: true,
              account_id: `demo_${platformId}_account`,
              access_token: `demo_token_${platformId}`,
            }
          : conn,
      ),
    )

    setIsConnecting(null)
  }

  const handleDisconnect = (platformId: string) => {
    setConnections((prev: ChannelConnection[]) =>
      prev.map((conn) =>
        conn.platform === platformId
          ? {
              ...conn,
              connected: false,
              account_id: undefined,
              access_token: undefined,
            }
          : conn,
      ),
    )
  }

  const handleContinue = () => {
    onComplete({ connections })
  }

  const connectedCount = connections.filter((conn) => conn.connected).length

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Social Channels</h2>
        <p className="text-gray-600">Connect your social media accounts to start publishing content automatically</p>
      </div>

      <div className="grid gap-6">
        {platforms.map((platform) => {
          const connection = connections.find((conn) => conn.platform === platform.id)
          const isConnected = connection?.connected || false
          const isLoading = isConnecting === platform.id

          return (
            <Card key={platform.id} className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                      <platform.icon className={`h-6 w-6 ${platform.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <CardDescription>{platform.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isConnected && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                    {!isConnected && (
                      <Badge variant="outline" className="bg-gray-50">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {platform.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                {isConnected && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Account Connected</p>
                        <p className="text-xs text-green-600">Account ID: {connection?.account_id}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(platform.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}

                {!isConnected && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600 mb-2">
                        Connect your {platform.name} account to enable automatic posting
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        You'll be redirected to {platform.name} to authorize access
                      </div>
                    </div>

                    <Button
                      onClick={() => handleConnect(platform.id)}
                      disabled={isLoading}
                      className="w-full"
                      variant="outline"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <platform.icon className="h-4 w-4 mr-2" />
                          Connect {platform.name}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Connection Status</h4>
            <p className="text-sm text-blue-700 mt-1">
              {connectedCount === 0 && "No platforms connected yet. Connect at least one to continue."}
              {connectedCount === 1 && "Great! You've connected 1 platform. You can add more later."}
              {connectedCount === 2 && "Excellent! You've connected 2 platforms for better reach."}
              {connectedCount === 3 && "Perfect! All platforms connected for maximum reach."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={connectedCount === 0}>
          Continue
          {connectedCount > 0 && <span className="ml-2">({connectedCount} connected)</span>}
        </Button>
      </div>
    </div>
  )
}
