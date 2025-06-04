"use client"

import { useState, useEffect } from "react"
import {
  Zap,
  CheckCircle,
  AlertCircle,
  Settings,
  Plus,
  Trash2,
  RefreshCw,
  Shield,
  Clock,
  BarChart3,
  MessageSquare,
  CreditCard,
  Globe,
  Smartphone,
  Database,
  TrendingUp,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  category: string
  description: string
  status: "connected" | "disconnected" | "error" | "pending"
  logo: string
  features: string[]
  lastSync?: string
  setupComplexity: "easy" | "medium" | "advanced"
  pricing: "free" | "paid" | "freemium"
  connectedDate?: string
  dataPoints?: number
}

interface IntegrationCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
}

export default function IntegrationsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showConnectedOnly, setShowConnectedOnly] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const categories: IntegrationCategory[] = [
    {
      id: "social",
      name: "Social Media",
      description: "Connect your social media accounts",
      icon: MessageSquare,
      color: "#3b82f6",
    },
    {
      id: "reviews",
      name: "Review Platforms",
      description: "Aggregate reviews from multiple platforms",
      icon: BarChart3,
      color: "#10b981",
    },
    {
      id: "delivery",
      name: "Delivery Platforms",
      description: "Sync with food delivery services",
      icon: Smartphone,
      color: "#f59e0b",
    },
    {
      id: "pos",
      name: "POS Systems",
      description: "Connect your point of sale system",
      icon: CreditCard,
      color: "#8b5cf6",
    },
    {
      id: "marketing",
      name: "Marketing Tools",
      description: "Email, SMS, and advertising platforms",
      icon: TrendingUp,
      color: "#ef4444",
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Track performance and insights",
      icon: BarChart3,
      color: "#06b6d4",
    },
  ]

  const [integrations] = useState<Integration[]>([
    // Social Media
    {
      id: "instagram",
      name: "Instagram Business",
      category: "social",
      description: "Post content, manage comments, and track engagement",
      status: "connected",
      logo: "/placeholder.svg?height=40&width=40&text=IG",
      features: ["Auto-posting", "Comment management", "Story scheduling", "Analytics"],
      lastSync: "2 minutes ago",
      setupComplexity: "easy",
      pricing: "free",
      connectedDate: "2024-01-10",
      dataPoints: 1250,
    },
    {
      id: "facebook",
      name: "Facebook Pages",
      category: "social",
      description: "Manage your Facebook business page and ads",
      status: "connected",
      logo: "/placeholder.svg?height=40&width=40&text=FB",
      features: ["Page management", "Ad campaigns", "Messenger integration", "Events"],
      lastSync: "5 minutes ago",
      setupComplexity: "easy",
      pricing: "free",
      connectedDate: "2024-01-10",
      dataPoints: 890,
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      category: "social",
      description: "Customer communication and order management",
      status: "pending",
      logo: "/placeholder.svg?height=40&width=40&text=WA",
      features: ["Customer chat", "Order notifications", "Broadcast messages", "Catalog"],
      setupComplexity: "medium",
      pricing: "freemium",
    },
    {
      id: "twitter",
      name: "Twitter/X",
      category: "social",
      description: "Share updates and engage with customers",
      status: "disconnected",
      logo: "/placeholder.svg?height=40&width=40&text=X",
      features: ["Tweet scheduling", "Mention monitoring", "Hashtag tracking", "Analytics"],
      setupComplexity: "easy",
      pricing: "free",
    },

    // Review Platforms
    {
      id: "google",
      name: "Google My Business",
      category: "reviews",
      description: "Manage your Google listing and reviews",
      status: "connected",
      logo: "/placeholder.svg?height=40&width=40&text=G",
      features: ["Review management", "Business info", "Photos", "Insights"],
      lastSync: "1 minute ago",
      setupComplexity: "easy",
      pricing: "free",
      connectedDate: "2024-01-08",
      dataPoints: 156,
    },
    {
      id: "zomato",
      name: "Zomato",
      category: "reviews",
      description: "Sync menu, reviews, and restaurant info",
      status: "connected",
      logo: "/placeholder.svg?height=40&width=40&text=Z",
      features: ["Menu sync", "Review monitoring", "Order management", "Analytics"],
      lastSync: "10 minutes ago",
      setupComplexity: "medium",
      pricing: "freemium",
      connectedDate: "2024-01-12",
      dataPoints: 89,
    },
    {
      id: "tripadvisor",
      name: "TripAdvisor",
      category: "reviews",
      description: "Monitor reviews and manage listing",
      status: "error",
      logo: "/placeholder.svg?height=40&width=40&text=TA",
      features: ["Review monitoring", "Photo management", "Listing optimization", "Insights"],
      setupComplexity: "medium",
      pricing: "freemium",
    },

    // Delivery Platforms
    {
      id: "swiggy",
      name: "Swiggy",
      category: "delivery",
      description: "Manage orders and menu on Swiggy",
      status: "connected",
      logo: "/placeholder.svg?height=40&width=40&text=SW",
      features: ["Order sync", "Menu management", "Analytics", "Promotions"],
      lastSync: "30 minutes ago",
      setupComplexity: "medium",
      pricing: "paid",
      connectedDate: "2024-01-05",
      dataPoints: 2340,
    },
    {
      id: "ubereats",
      name: "Uber Eats",
      category: "delivery",
      description: "Sync orders and manage delivery",
      status: "disconnected",
      logo: "/placeholder.svg?height=40&width=40&text=UE",
      features: ["Order management", "Menu sync", "Delivery tracking", "Analytics"],
      setupComplexity: "medium",
      pricing: "paid",
    },

    // POS Systems
    {
      id: "square",
      name: "Square POS",
      category: "pos",
      description: "Sync sales data and customer information",
      status: "disconnected",
      logo: "/placeholder.svg?height=40&width=40&text=SQ",
      features: ["Sales sync", "Customer data", "Inventory", "Reports"],
      setupComplexity: "advanced",
      pricing: "paid",
    },

    // Marketing Tools
    {
      id: "mailchimp",
      name: "Mailchimp",
      category: "marketing",
      description: "Email marketing and customer segmentation",
      status: "disconnected",
      logo: "/placeholder.svg?height=40&width=40&text=MC",
      features: ["Email campaigns", "Customer segments", "Automation", "Analytics"],
      setupComplexity: "medium",
      pricing: "freemium",
    },

    // Analytics
    {
      id: "googleanalytics",
      name: "Google Analytics",
      category: "analytics",
      description: "Track website and customer behavior",
      status: "connected",
      logo: "/placeholder.svg?height=40&width=40&text=GA",
      features: ["Website analytics", "Customer insights", "Conversion tracking", "Reports"],
      lastSync: "1 hour ago",
      setupComplexity: "medium",
      pricing: "free",
      connectedDate: "2024-01-15",
      dataPoints: 5670,
    },
  ])

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !showConnectedOnly || integration.status === "connected"
    return matchesCategory && matchesSearch && matchesStatus
  })

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const totalDataPoints = integrations
    .filter((i) => i.status === "connected" && i.dataPoints)
    .reduce((sum, i) => sum + (i.dataPoints || 0), 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "#10b981"
      case "disconnected":
        return "#6b7280"
      case "error":
        return "#ef4444"
      case "pending":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4" />
      case "disconnected":
        return <AlertCircle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "easy":
        return "#10b981"
      case "medium":
        return "#f59e0b"
      case "advanced":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const handleConnect = (integrationId: string) => {
    alert(`Connecting to ${integrations.find((i) => i.id === integrationId)?.name}...`)
  }

  const handleDisconnect = (integrationId: string) => {
    if (confirm("Are you sure you want to disconnect this integration?")) {
      alert(`Disconnected from ${integrations.find((i) => i.id === integrationId)?.name}`)
    }
  }

  const handleSync = (integrationId: string) => {
    alert(`Syncing ${integrations.find((i) => i.id === integrationId)?.name}...`)
  }

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-6">
        <a href="/dashboard" className="breadcrumb-item">
          Dashboard
        </a>
        <span className="breadcrumb-separator">/</span>
        <a href="/dashboard/profile" className="breadcrumb-item">
          Profile
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Integrations</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
            <p className="text-gray-600">Connect your restaurant with external platforms and tools</p>
          </div>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Browse Integrations
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Connected</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{connectedCount}</div>
          <div className="text-sm text-gray-500">of {integrations.length} available</div>
        </div>

        <div className="card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Database className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Data Points</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalDataPoints.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Synced this month</div>
        </div>

        <div className="card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">Health Score</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
          <div className="text-sm text-gray-500">All systems operational</div>
        </div>

        <div className="card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <RefreshCw className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Last Sync</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2m</div>
          <div className="text-sm text-gray-500">ago</div>
        </div>
      </div>

      {/* Categories */}
      <div className="card mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Integration Categories</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`p-4 rounded-lg border text-center transition-all ${
                selectedCategory === "all"
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <Globe className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-sm font-semibold">All</div>
              <div className="text-xs text-gray-500">{integrations.length} total</div>
            </button>
            {categories.map((category) => {
              const Icon = category.icon
              const count = integrations.filter((i) => i.category === category.id).length
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    selectedCategory === category.id
                      ? `border-blue-500 bg-blue-50 text-blue-900`
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" style={{ color: category.color }} />
                  <div className="text-sm font-semibold">{category.name}</div>
                  <div className="text-xs text-gray-500">{count} available</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Search Integrations</label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Status Filter</label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="connected-only"
                  checked={showConnectedOnly}
                  onChange={(e) => setShowConnectedOnly(e.target.checked)}
                  className="form-checkbox"
                />
                <label htmlFor="connected-only" className="text-sm">
                  Show connected only
                </label>
              </div>
            </div>
            <div>
              <label className="form-label">Quick Actions</label>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-secondary btn-sm">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync All
                </button>
                <button className="btn btn-secondary btn-sm">
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="card p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="platform-logo">
                  {integration.logo || integration.name.substring(0, 2).toUpperCase()}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1"
                      style={{ backgroundColor: getStatusColor(integration.status) }}
                    >
                      {getStatusIcon(integration.status)}
                      {integration.status}
                    </span>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getComplexityColor(integration.setupComplexity) }}
                    >
                      {integration.setupComplexity}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  integration.pricing === "free"
                    ? "bg-green-100 text-green-800"
                    : integration.pricing === "paid"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {integration.pricing}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{integration.description}</p>

            {/* Features */}
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-900 mb-2">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {integration.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                    {feature}
                  </span>
                ))}
                {integration.features.length > 3 && (
                  <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-500">
                    +{integration.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats for connected integrations */}
            {integration.status === "connected" && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Connected</div>
                    <div className="font-semibold">
                      {integration.connectedDate && new Date(integration.connectedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Sync</div>
                    <div className="font-semibold">{integration.lastSync || "Never"}</div>
                  </div>
                  {integration.dataPoints && (
                    <>
                      <div className="col-span-2">
                        <div className="text-gray-500">Data Points</div>
                        <div className="font-semibold">{integration.dataPoints.toLocaleString()}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {integration.status === "connected" ? (
                <>
                  <button onClick={() => handleSync(integration.id)} className="btn btn-secondary btn-sm flex-1">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Sync
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    <Settings className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="btn btn-secondary btn-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </>
              ) : integration.status === "pending" ? (
                <button className="btn btn-secondary btn-sm flex-1" disabled>
                  <Clock className="h-3 w-3 mr-1" />
                  Setting up...
                </button>
              ) : integration.status === "error" ? (
                <button onClick={() => handleConnect(integration.id)} className="btn btn-primary btn-sm flex-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Reconnect
                </button>
              ) : (
                <button onClick={() => handleConnect(integration.id)} className="btn btn-primary btn-sm flex-1">
                  <Plus className="h-3 w-3 mr-1" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="card p-12 text-center">
          <Zap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No integrations found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or category filters to find integrations.</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setShowConnectedOnly(false)
            }}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
