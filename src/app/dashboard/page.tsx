"use client"

import { useState, useEffect } from "react"
import {
  Store,
  BarChart3,
  Users,
  Bot,
  Calendar,
  Menu,
  Star,
  MessageSquare,
  Facebook,
  Database,
  PieChart,
  Activity,
  FileText,
  ChevronRight,
  ExternalLink,
  Plus,
  Globe,
  Wifi,
  Settings,
} from "lucide-react"

export default function DashboardPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mock data for dashboard
  const restaurantData = {
    name: "Spice Garden",
    pageViews: 1234,
    menuViews: 567,
    reviewCount: 342,
    rating: 4.6,
  }

  const marketingData = {
    activeCampaigns: 3,
    scheduledPosts: 8,
    activeOffers: 2,
    recentEngagement: "+28%",
  }

  const customerData = {
    totalCustomers: 1625,
    newCustomers: 42,
    churnRisk: 18,
    loyalCustomers: 420,
  }

  const aiData = {
    generatedLastMonth: 24,
    savedTemplates: 7,
    automationRules: 5,
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-6">
        <h1>Restaurant Marketing Dashboard</h1>
        <p>Welcome back! Here's an overview of your restaurant marketing.</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid mb-6">
        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                padding: "0.75rem",
                marginRight: "1rem",
              }}
            >
              <Store className="h-6 w-6" style={{ color: "#495057" }} />
            </div>
            <div>
              <div className="stat-label">Smart Page Views</div>
              <div className="stat-number">{restaurantData.pageViews}</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                padding: "0.75rem",
                marginRight: "1rem",
              }}
            >
              <BarChart3 className="h-6 w-6" style={{ color: "#495057" }} />
            </div>
            <div>
              <div className="stat-label">Active Campaigns</div>
              <div className="stat-number">{marketingData.activeCampaigns}</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                padding: "0.75rem",
                marginRight: "1rem",
              }}
            >
              <Users className="h-6 w-6" style={{ color: "#495057" }} />
            </div>
            <div>
              <div className="stat-label">Total Customers</div>
              <div className="stat-number">{customerData.totalCustomers}</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                padding: "0.75rem",
                marginRight: "1rem",
              }}
            >
              <Bot className="h-6 w-6" style={{ color: "#495057" }} />
            </div>
            <div>
              <div className="stat-label">AI Generated Content</div>
              <div className="stat-number">{aiData.generatedLastMonth} this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* MODULE 1: Profile Management */}
        <div className="card">
          <div
            style={{
              backgroundColor: "#fefefe",
              borderBottom: "1px solid #e9ecef",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Store className="h-5 w-5" style={{ color: "#212529", marginRight: "0.5rem" }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", margin: 0, color: "#212529" }}>
                Profile Management
              </h2>
            </div>
            <a
              href="/dashboard/profile"
              style={{
                color: "#6c757d",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              Manage <ChevronRight className="h-4 w-4" style={{ marginLeft: "0.25rem" }} />
            </a>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Restaurant Page (AI-Generated) */}
              <a href="/dashboard/profile/restaurant-page" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Globe className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Restaurant Page
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        AI-generated landing page • {restaurantData.pageViews} views
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f5e8",
                      color: "#2d5a2d",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Live
                  </span>
                </div>
              </a>

              {/* WhatsApp Business Card */}
              <a href="/dashboard/profile/whatsapp-card" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <MessageSquare className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        WhatsApp Business Card
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        AI-generated micro-profile • QR code ready
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#fff3cd",
                      color: "#856404",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Setup
                  </span>
                </div>
              </a>

              {/* Digitized Menu */}
              <a href="/dashboard/profile/menu" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Menu className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Digitized Menu
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        24 items • {restaurantData.menuViews} views • AI categorized
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f5e8",
                      color: "#2d5a2d",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Active
                  </span>
                </div>
              </a>

              {/* Ratings & Reviews */}
              <a href="/dashboard/profile/reviews" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Star className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Ratings & Reviews
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        {restaurantData.reviewCount} reviews • {restaurantData.rating} avg rating
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#fff3cd",
                      color: "#856404",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    3 new
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* MODULE 2: Marketing Hub */}
        <div className="card">
          <div
            style={{
              backgroundColor: "#fefefe",
              borderBottom: "1px solid #e9ecef",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <BarChart3 className="h-5 w-5" style={{ color: "#212529", marginRight: "0.5rem" }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", margin: 0, color: "#212529" }}>Marketing Hub</h2>
            </div>
            <a
              href="/dashboard/marketing"
              style={{
                color: "#6c757d",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              View All <ChevronRight className="h-4 w-4" style={{ marginLeft: "0.25rem" }} />
            </a>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* AI Strategy Generator */}
              <a href="/dashboard/marketing/strategy" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Bot className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        AI Strategy Generator
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        Goal-based marketing strategies • AI suggestions
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f4fd",
                      color: "#0c5460",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Generate
                  </span>
                </div>
              </a>

              {/* Campaign Builder */}
              <a href="/dashboard/marketing/campaigns" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <BarChart3 className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Campaign Builder
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        {marketingData.activeCampaigns} active • {marketingData.recentEngagement} engagement
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f5e8",
                      color: "#2d5a2d",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Active
                  </span>
                </div>
              </a>

              {/* AI Content Creation */}
              <a href="/dashboard/marketing/content" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <FileText className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        AI Content Creation
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        Posts, captions, images • {aiData.savedTemplates} templates
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f4fd",
                      color: "#0c5460",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Create
                  </span>
                </div>
              </a>

              {/* Marketing Calendar */}
              <a href="/dashboard/marketing/calendar" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Calendar className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Marketing Calendar
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        {marketingData.scheduledPosts} scheduled • AI event suggestions
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f4fd",
                      color: "#0c5460",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Plan
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* MODULE 3: Customer Intelligence */}
        <div className="card">
          <div
            style={{
              backgroundColor: "#fefefe",
              borderBottom: "1px solid #e9ecef",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Users className="h-5 w-5" style={{ color: "#212529", marginRight: "0.5rem" }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", margin: 0, color: "#212529" }}>
                Customer Intelligence
              </h2>
            </div>
            <a
              href="/dashboard/customers"
              style={{
                color: "#6c757d",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              View All <ChevronRight className="h-4 w-4" style={{ marginLeft: "0.25rem" }} />
            </a>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Customer Database */}
              <a href="/dashboard/customers/database" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Database className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Customer Database
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        {customerData.totalCustomers} customers • {customerData.newCustomers} new this week
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f4fd",
                      color: "#0c5460",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Import
                  </span>
                </div>
              </a>

              {/* AI Segmentation */}
              <a href="/dashboard/customers/segments" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <PieChart className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        AI Segmentation
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        4 segments • Auto-grouped by behavior
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f5e8",
                      color: "#2d5a2d",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Updated
                  </span>
                </div>
              </a>

              {/* Churn Prediction */}
              <a href="/dashboard/customers/churn" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <Activity className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Churn Prediction
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        {customerData.churnRisk} at risk • AI re-engagement
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    Alert
                  </span>
                </div>
              </a>

              {/* Engagement Metrics */}
              <a href="/dashboard/customers/metrics" style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                    backgroundColor: "#fdfdfd",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa"
                    e.currentTarget.style.borderColor = "#dee2e6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfdfd"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        backgroundColor: "#f1f3f4",
                        padding: "0.5rem",
                        marginRight: "0.75rem",
                      }}
                    >
                      <BarChart3 className="h-4 w-4" style={{ color: "#495057" }} />
                    </div>
                    <div>
                      <h3
                        style={{ fontWeight: "500", margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#212529" }}
                      >
                        Engagement Metrics
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "#6c757d", margin: 0 }}>
                        CTR, conversion, retention tracking
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      backgroundColor: "#e8f5e8",
                      color: "#2d5a2d",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    View
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center" }}>
              <Wifi className="h-5 w-5" style={{ color: "#495057", marginRight: "0.5rem" }} />
              Integrations
            </h3>
            <a
              href="/dashboard/integrations"
              style={{ color: "#6c757d", fontSize: "0.875rem", textDecoration: "none" }}
            >
              Manage
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.75rem" }}>
            <div style={{ textAlign: "center", padding: "0.75rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#e8f5e8",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                }}
              >
                <Facebook className="h-5 w-5" style={{ color: "#2d5a2d" }} />
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: "500" }}>Meta</div>
              <div style={{ fontSize: "0.625rem", color: "#6c757d" }}>Connected</div>
            </div>
            <div style={{ textAlign: "center", padding: "0.75rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#e8f5e8",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                }}
              >
                <MessageSquare className="h-5 w-5" style={{ color: "#2d5a2d" }} />
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: "500" }}>WhatsApp</div>
              <div style={{ fontSize: "0.625rem", color: "#6c757d" }}>Connected</div>
            </div>
            <div style={{ textAlign: "center", padding: "0.75rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#f8d7da",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                }}
              >
                <Globe className="h-5 w-5" style={{ color: "#721c24" }} />
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: "500" }}>Google</div>
              <div style={{ fontSize: "0.625rem", color: "#6c757d" }}>Setup</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center" }}>
              <Settings className="h-5 w-5" style={{ color: "#495057", marginRight: "0.5rem" }} />
              Quick Actions
            </h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.75rem" }}>
            <a href="/dashboard/marketing/campaigns/new" style={{ textDecoration: "none" }}>
              <button
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  height: "auto",
                  padding: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  color: "#495057",
                }}
              >
                <Plus className="h-5 w-5" />
                <span style={{ fontSize: "0.75rem" }}>New Campaign</span>
              </button>
            </a>
            <a href="/dashboard/marketing/content/new" style={{ textDecoration: "none" }}>
              <button
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  height: "auto",
                  padding: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  color: "#495057",
                }}
              >
                <Bot className="h-5 w-5" />
                <span style={{ fontSize: "0.75rem" }}>Generate Content</span>
              </button>
            </a>
            <a href="/dashboard/profile/restaurant-page" style={{ textDecoration: "none" }}>
              <button
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  height: "auto",
                  padding: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  color: "#495057",
                }}
              >
                <ExternalLink className="h-5 w-5" />
                <span style={{ fontSize: "0.75rem" }}>View Smart Page</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
