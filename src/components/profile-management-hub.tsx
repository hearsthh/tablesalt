"use client"

import { useState, useEffect } from "react"
import {
  Globe,
  Menu,
  MessageSquare,
  Star,
  Settings,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Edit,
  Eye,
  Share2,
  Download,
  Plus,
  ArrowRight,
} from "lucide-react"

interface ProfileStats {
  smartPageViews: number
  menuViews: number
  whatsappClicks: number
  averageRating: number
  totalReviews: number
  connectedPlatforms: number
}

export default function ProfileManagementHub() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const [stats] = useState<ProfileStats>({
    smartPageViews: 1247,
    menuViews: 892,
    whatsappClicks: 156,
    averageRating: 4.6,
    totalReviews: 234,
    connectedPlatforms: 6,
  })

  const profileModules = [
    {
      id: "smart-page",
      title: "Smart Restaurant Page",
      description: "AI-powered landing page that converts visitors into customers",
      icon: Globe,
      color: "#3b82f6",
      status: "active",
      stats: {
        primary: `${stats.smartPageViews} views`,
        secondary: "92% conversion rate",
      },
      features: ["AI-generated content", "Mobile optimized", "SEO friendly", "Real-time updates"],
      actions: [
        { label: "Edit Page", href: "/dashboard/profile/smart-page", primary: true },
        { label: "Preview", href: "#", icon: Eye },
        { label: "Share", href: "#", icon: Share2 },
      ],
    },
    {
      id: "menu-builder",
      title: "Digital Menu Builder",
      description: "Create stunning digital menus with AI-powered descriptions",
      icon: Menu,
      color: "#10b981",
      status: "active",
      stats: {
        primary: `${stats.menuViews} views`,
        secondary: "45 items listed",
      },
      features: ["AI descriptions", "Photo optimization", "Price management", "Category organization"],
      actions: [
        { label: "Edit Menu", href: "/dashboard/profile/menu-builder", primary: true },
        { label: "Preview", href: "#", icon: Eye },
        { label: "Download PDF", href: "#", icon: Download },
      ],
    },
    {
      id: "whatsapp-card",
      title: "WhatsApp Business Card",
      description: "Professional WhatsApp presence for customer communication",
      icon: MessageSquare,
      color: "#25d366",
      status: "pending",
      stats: {
        primary: `${stats.whatsappClicks} clicks`,
        secondary: "Setup required",
      },
      features: ["Business catalog", "Quick replies", "Order management", "Customer support"],
      actions: [
        { label: "Setup Card", href: "/dashboard/profile/whatsapp-card", primary: true },
        { label: "Learn More", href: "#", icon: ExternalLink },
      ],
    },
    {
      id: "reviews-aggregator",
      title: "Reviews & Ratings",
      description: "Monitor and manage reviews from all platforms in one place",
      icon: Star,
      color: "#f59e0b",
      status: "active",
      stats: {
        primary: `${stats.averageRating}★ rating`,
        secondary: `${stats.totalReviews} reviews`,
      },
      features: ["Multi-platform sync", "Sentiment analysis", "Response management", "Performance insights"],
      actions: [
        { label: "View Reviews", href: "/dashboard/profile/reviews-aggregator", primary: true },
        { label: "Respond", href: "#", icon: MessageSquare },
        { label: "Analytics", href: "#", icon: BarChart3 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10b981"
      case "pending":
        return "#f59e0b"
      case "inactive":
        return "#6b7280"
      default:
        return "#6b7280"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "inactive":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-6">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "1rem" : "0",
          }}
        >
          <div>
            <h1 style={{ fontSize: isMobile ? "1.5rem" : "2rem", marginBottom: "0.5rem" }}>Profile Management</h1>
            <p style={{ fontSize: "1rem", color: "#6c757d" }}>
              Manage your restaurant's digital presence across all platforms
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            <button className="btn btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <TrendingUp className="h-4 w-4" style={{ color: "#3b82f6" }} />
            <span style={{ fontSize: "0.875rem", color: "#6c757d" }}>Total Reach</span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#212529" }}>
            {(stats.smartPageViews + stats.menuViews).toLocaleString()}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>+12% from last month</div>
        </div>

        <div className="card p-4">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Users className="h-4 w-4" style={{ color: "#10b981" }} />
            <span style={{ fontSize: "0.875rem", color: "#6c757d" }}>Engagement</span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#212529" }}>{stats.whatsappClicks}</div>
          <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>WhatsApp interactions</div>
        </div>

        <div className="card p-4">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Star className="h-4 w-4" style={{ color: "#f59e0b" }} />
            <span style={{ fontSize: "0.875rem", color: "#6c757d" }}>Rating</span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#212529" }}>{stats.averageRating}★</div>
          <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>From {stats.totalReviews} reviews</div>
        </div>

        <div className="card p-4">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Zap className="h-4 w-4" style={{ color: "#8b5cf6" }} />
            <span style={{ fontSize: "0.875rem", color: "#6c757d" }}>Integrations</span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#212529" }}>{stats.connectedPlatforms}</div>
          <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>Platforms connected</div>
        </div>
      </div>

      {/* Profile Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {profileModules.map((module) => {
          const Icon = module.icon
          return (
            <div key={module.id} className="card">
              <div style={{ padding: "1.5rem" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "0.75rem",
                        backgroundColor: `${module.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: module.color }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: "600", margin: "0 0 0.25rem 0" }}>
                        {module.title}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontSize: "0.75rem",
                            padding: "0.125rem 0.5rem",
                            borderRadius: "0.375rem",
                            backgroundColor: getStatusColor(module.status),
                            color: "#ffffff",
                          }}
                        >
                          {getStatusIcon(module.status)}
                          {module.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.875rem", color: "#6c757d", margin: "0 0 1rem 0", lineHeight: "1.5" }}>
                  {module.description}
                </p>

                {/* Stats */}
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#212529" }}>
                        {module.stats.primary}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>Primary metric</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "1.125rem", fontWeight: "600", color: "#212529" }}>
                        {module.stats.secondary}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>Secondary metric</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Key Features:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {module.features.map((feature, index) => (
                      <span
                        key={index}
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.375rem",
                          backgroundColor: "#e5e7eb",
                          color: "#374151",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {module.actions.map((action, index) => {
                    const ActionIcon = action.icon
                    return (
                      <a
                        key={index}
                        href={action.href}
                        className={action.primary ? "btn btn-primary" : "btn btn-secondary"}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                        }}
                      >
                        {ActionIcon ? <ActionIcon className="h-4 w-4" /> : null}
                        {action.label}
                        {action.primary && <ArrowRight className="h-4 w-4" />}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card mt-8">
        <div style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>
              <Edit className="h-4 w-4 mr-2" />
              Update Info
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Posts
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>
              <Settings className="h-4 w-4 mr-2" />
              Manage Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
