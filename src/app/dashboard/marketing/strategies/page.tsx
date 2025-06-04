"use client"

import { useState, useEffect } from "react"

export default function StrategiesPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const currentStrategy = {
    name: "Q4 Growth Strategy",
    timeline: "3 months",
    status: "Active",
    progress: 65,
    businessGoals: [
      "Increase monthly foot traffic by 25%",
      "Boost weekday lunch orders by 40%",
      "Improve customer retention by 30%",
    ],
    targetAudience: [
      { segment: "Primary", description: "25-40 year old professionals nearby", percentage: 60 },
      { segment: "Secondary", description: "Young families and health-conscious diners", percentage: 40 },
    ],
    brandPositioning:
      "A modern neighborhood spot offering delicious, seasonal food with warm service and sustainable values.",
    pillars: [
      { name: "Menu Innovation", description: "Seasonal dishes, chef's specials, limited-time menus" },
      { name: "Digital-First Marketing", description: "Strong Instagram presence, Google My Business, email list" },
      { name: "Loyalty & Retention", description: "Rewards program, referral bonuses, birthday offers" },
      { name: "Local Partnerships", description: "Source ingredients locally, collaborate with nearby vendors" },
    ],
    campaigns: [
      {
        title: "Weekday Lunch Special",
        goal: "Increase lunch orders Mon-Fri",
        channels: ["Instagram Ads", "Google Ads"],
        dates: "Ongoing",
        pillar: "Menu Innovation",
        status: "Active",
        performance: "+22% lunch orders",
        strategy: "Q4 Growth Strategy",
        budget: "₹15,000",
        spent: "₹8,500",
      },
      {
        title: "Local Love Week",
        goal: "Boost brand with local angle",
        channels: ["Instagram", "Blog", "Partnerships"],
        dates: "Dec 1-7",
        pillar: "Local Partnerships",
        status: "Scheduled",
        performance: "Not started",
        strategy: "Q4 Growth Strategy",
        budget: "₹12,000",
        spent: "₹0",
      },
      {
        title: "Birthday Club Campaign",
        goal: "Grow list and reward loyal guests",
        channels: ["Email", "SMS"],
        dates: "Always-on",
        pillar: "Loyalty & Retention",
        status: "Active",
        performance: "+156 signups",
        strategy: "Q4 Growth Strategy",
        budget: "₹8,000",
        spent: "₹3,200",
      },
    ],
    metrics: [
      { channel: "Social Media", kpi: "Follower growth, engagement rate", current: "+12% this month" },
      { channel: "Email Campaigns", kpi: "Open rate, click-throughs", current: "24% open rate" },
      { channel: "Loyalty Program", kpi: "Active users, repeat visits", current: "340 active members" },
      { channel: "Google & Reviews", kpi: "Star ratings, review count", current: "4.6 stars (89 reviews)" },
    ],
  }

  const generateStrategy = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      alert("New AI strategy generated!")
    }, 3000)
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "campaigns", label: "Campaigns" },
    { id: "metrics", label: "Metrics" },
    { id: "generator", label: "AI Generator" },
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
        <span className="breadcrumb-current">Strategies</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}
        >
          <div>
            <h1>Marketing Strategies</h1>
            <p>Long-term strategic planning with connected campaigns.</p>
          </div>
          <button className="btn btn-primary btn-sm">+ New Strategy</button>
        </div>

        {/* Current Strategy Status */}
        <div className="card" style={{ padding: "1rem" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}
          >
            <h3 style={{ margin: 0 }}>{currentStrategy.name}</h3>
            <span
              style={{
                padding: "0.25rem 0.5rem",
                background: "#10b981",
                color: "white",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              {currentStrategy.status}
            </span>
          </div>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem", fontSize: "0.875rem" }}>
            <span>Timeline: {currentStrategy.timeline}</span>
            <span>Progress: {currentStrategy.progress}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${currentStrategy.progress}%` }} />
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
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Goals */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 className="mb-4">Business Goals</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {currentStrategy.businessGoals.map((goal, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span className="status-dot status-active"></span>
                  <span style={{ fontSize: "0.875rem" }}>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 className="mb-4">Target Audience</h3>
            {currentStrategy.targetAudience.map((audience, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: "500", fontSize: "0.875rem" }}>{audience.segment}</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{audience.percentage}%</span>
                </div>
                <p style={{ fontSize: "0.875rem", margin: 0 }}>{audience.description}</p>
              </div>
            ))}
          </div>

          {/* Brand Positioning */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 className="mb-4">Brand Positioning</h3>
            <p style={{ fontSize: "0.875rem", fontStyle: "italic", margin: 0 }}>"{currentStrategy.brandPositioning}"</p>
          </div>

          {/* Strategy Pillars */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 className="mb-4">Strategy Pillars</h3>
            {currentStrategy.pillars.map((pillar, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>{pillar.name}</h4>
                <p style={{ fontSize: "0.875rem", margin: 0 }}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "campaigns" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2>Connected Campaigns</h2>
            <button className="btn btn-secondary btn-sm">+ Add Campaign</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {currentStrategy.campaigns.map((campaign, index) => (
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
      )}

      {activeTab === "metrics" && (
        <div>
          <h2 className="mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentStrategy.metrics.map((metric, index) => (
              <div key={index} className="card" style={{ padding: "1rem" }}>
                <h4 style={{ marginBottom: "0.5rem" }}>{metric.channel}</h4>
                <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>{metric.kpi}</p>
                <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#10b981" }}>{metric.current}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "generator" && (
        <div className="card" style={{ padding: "2rem" }}>
          <h2 className="mb-4">AI Strategy Generator</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="form-group">
              <label className="form-label">Strategy Timeline</label>
              <select className="form-select">
                <option>1 month</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>12 months</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Primary Goal</label>
              <select className="form-select">
                <option>Increase foot traffic</option>
                <option>Boost revenue</option>
                <option>Improve retention</option>
                <option>Expand market reach</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select className="form-select">
                <option>Young professionals</option>
                <option>Families</option>
                <option>Health-conscious diners</option>
                <option>Tourists</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Budget Range</label>
              <select className="form-select">
                <option>₹10,000 - ₹25,000</option>
                <option>₹25,000 - ₹50,000</option>
                <option>₹50,000 - ₹1,00,000</option>
                <option>₹1,00,000+</option>
              </select>
            </div>
          </div>
          <div className="form-group mb-6">
            <label className="form-label">Additional Context</label>
            <textarea
              className="form-textarea"
              placeholder="Describe your restaurant's unique selling points, current challenges, or specific requirements..."
              rows={4}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={generateStrategy}
            disabled={isGenerating}
            style={{ width: isMobile ? "100%" : "auto" }}
          >
            {isGenerating ? "🤖 Generating Strategy..." : "🤖 Generate AI Strategy"}
          </button>
        </div>
      )}
    </div>
  )
}
