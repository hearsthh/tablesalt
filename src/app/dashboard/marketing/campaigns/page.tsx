"use client"

import { useState, useEffect } from "react"

export default function CampaignsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const activeCampaigns = [
    {
      title: "Weekday Lunch Special",
      strategy: "Q4 Growth Strategy",
      goal: "Increase lunch orders Mon-Fri",
      channels: ["Instagram Ads", "Google Ads"],
      budget: "₹15,000",
      spent: "₹8,200",
      performance: "+22% lunch orders",
      status: "Active",
      dates: "Ongoing",
      pillar: "Menu Innovation",
    },
    {
      title: "Birthday Club Campaign",
      strategy: "Q4 Growth Strategy",
      goal: "Grow email list and reward loyal guests",
      channels: ["Email", "SMS"],
      budget: "₹5,000",
      spent: "₹2,100",
      performance: "+156 signups",
      status: "Active",
      dates: "Always-on",
      pillar: "Loyalty & Retention",
    },
  ]

  const scheduledCampaigns = [
    {
      title: "Local Love Week",
      strategy: "Q4 Growth Strategy",
      goal: "Boost brand with local partnerships",
      channels: ["Instagram", "Blog", "Partnerships"],
      budget: "₹12,000",
      status: "Scheduled",
      dates: "Dec 1-7",
      pillar: "Local Partnerships",
    },
  ]

  const standaloneCampaigns = [
    {
      title: "Weekend Brunch Promo",
      strategy: "Standalone",
      goal: "Fill weekend brunch slots",
      channels: ["Facebook Ads", "Instagram Stories"],
      budget: "₹8,000",
      spent: "₹3,500",
      performance: "+18% weekend bookings",
      status: "Active",
      dates: "Nov 15 - Dec 15",
    },
  ]

  const tabs = [
    { id: "active", label: "Active", count: activeCampaigns.length + standaloneCampaigns.length },
    { id: "scheduled", label: "Scheduled", count: scheduledCampaigns.length },
    { id: "templates", label: "Templates", count: 6 },
  ]

  const campaignTemplates = [
    { title: "Happy Hour Promotion", type: "Time-based Offer", estimatedROI: "3.5x" },
    { title: "New Menu Launch", type: "Product Launch", estimatedROI: "4.2x" },
    { title: "Customer Birthday Special", type: "Loyalty Campaign", estimatedROI: "4.8x" },
    { title: "Group Dining Discount", type: "Volume Discount", estimatedROI: "3.8x" },
    { title: "Seasonal Festival Menu", type: "Seasonal Campaign", estimatedROI: "4.1x" },
    { title: "First-time Customer Offer", type: "Acquisition Campaign", estimatedROI: "5.2x" },
  ]

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/dashboard" className="breadcrumb-item">
          Dashboard
        </a>
        <span className="breadcrumb-separator">/</span>
        <a href="/dashboard/marketing" className="breadcrumb-item">
          Marketing
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Campaigns</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}
        >
          <div>
            <h1>Campaigns</h1>
            <p>Create and manage promotional campaigns.</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-secondary btn-sm">🤖 AI Generate</button>
            <button className="btn btn-primary btn-sm">+ New Campaign</button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{activeCampaigns.length + standaloneCampaigns.length}</div>
            <div className="stat-label">Active Campaigns</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹40K</div>
            <div className="stat-label">Total Budget</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹13.8K</div>
            <div className="stat-label">Total Spent</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3.8x</div>
            <div className="stat-label">Avg ROI</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className={isMobile ? "mobile-nav" : "flex gap-1"}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${isMobile ? "mobile-nav-item" : "nav-item"} ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
              <span
                style={{
                  background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "var(--muted)",
                  color: activeTab === tab.id ? "white" : "var(--muted-foreground)",
                  padding: "0.125rem 0.375rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.75rem",
                  marginLeft: "0.5rem",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "active" && (
        <div>
          {/* Strategy-Connected Campaigns */}
          <div className="mb-6">
            <h3 className="mb-4">Strategy-Connected Campaigns</h3>
            <div className="grid grid-cols-1 gap-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className="card" style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>{campaign.title}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                          Strategy: {campaign.strategy}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>•</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                          Pillar: {campaign.pillar}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.875rem", margin: 0 }}>{campaign.goal}</p>
                    </div>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        background: "#10b981",
                        color: "white",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4" style={{ fontSize: "0.875rem" }}>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Channels:</span>
                      <div>{campaign.channels.join(", ")}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Budget:</span>
                      <div>{campaign.budget}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Spent:</span>
                      <div>{campaign.spent}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Timeline:</span>
                      <div>{campaign.dates}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Performance:</span>
                      <div style={{ color: "#10b981", fontWeight: "500" }}>{campaign.performance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standalone Campaigns */}
          <div>
            <h3 className="mb-4">Standalone Campaigns</h3>
            <div className="grid grid-cols-1 gap-4">
              {standaloneCampaigns.map((campaign, index) => (
                <div key={index} className="card" style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>{campaign.title}</h4>
                      <div style={{ marginBottom: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.125rem 0.375rem",
                            background: "var(--muted)",
                            borderRadius: "0.25rem",
                          }}
                        >
                          Standalone Campaign
                        </span>
                      </div>
                      <p style={{ fontSize: "0.875rem", margin: 0 }}>{campaign.goal}</p>
                    </div>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        background: "#10b981",
                        color: "white",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4" style={{ fontSize: "0.875rem" }}>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Channels:</span>
                      <div>{campaign.channels.join(", ")}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Budget:</span>
                      <div>{campaign.budget}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Spent:</span>
                      <div>{campaign.spent}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Timeline:</span>
                      <div>{campaign.dates}</div>
                    </div>
                    <div>
                      <span style={{ color: "var(--muted-foreground)" }}>Performance:</span>
                      <div style={{ color: "#10b981", fontWeight: "500" }}>{campaign.performance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "scheduled" && (
        <div className="grid grid-cols-1 gap-4">
          {scheduledCampaigns.map((campaign, index) => (
            <div key={index} className="card" style={{ padding: "1rem", border: "2px dashed var(--border)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>{campaign.title}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                      Strategy: {campaign.strategy}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>•</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                      Pillar: {campaign.pillar}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", margin: 0 }}>{campaign.goal}</p>
                </div>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "var(--muted)",
                    color: "var(--foreground)",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ fontSize: "0.875rem" }}>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Channels:</span>
                  <div>{campaign.channels.join(", ")}</div>
                </div>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Budget:</span>
                  <div>{campaign.budget}</div>
                </div>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Timeline:</span>
                  <div>{campaign.dates}</div>
                </div>
                <div>
                  <button className="btn btn-primary btn-sm">Launch Campaign</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "templates" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaignTemplates.map((template, index) => (
            <div key={index} className="card" style={{ padding: "1rem" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>{template.title}</h4>
              <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>{template.type}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                  Est. ROI: <span style={{ color: "#10b981", fontWeight: "500" }}>{template.estimatedROI}</span>
                </span>
                <button className="btn btn-secondary btn-sm">Use Template</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
