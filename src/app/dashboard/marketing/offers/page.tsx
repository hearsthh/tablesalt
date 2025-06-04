"use client"

import { useState, useEffect } from "react"

export default function OffersPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const activeOffers = [
    {
      title: "20% Off Weekend Brunch",
      type: "Discount Offer",
      target: "Weekend diners",
      channels: ["Instagram", "Email"],
      redemptions: 45,
      budget: "₹3,000",
      performance: "+28% weekend bookings",
      status: "Active",
      expires: "Dec 31, 2024",
    },
    {
      title: "Buy 2 Get 1 Free Desserts",
      type: "Volume Offer",
      target: "Families",
      channels: ["WhatsApp", "In-store"],
      redemptions: 23,
      budget: "₹2,000",
      performance: "+15% dessert sales",
      status: "Active",
      expires: "Dec 15, 2024",
    },
  ]

  const offerTemplates = [
    { title: "Happy Hour Special", type: "Time-based", description: "Discounted drinks during specific hours" },
    { title: "Birthday Special", type: "Personalized", description: "Free dessert on customer's birthday" },
    { title: "First Visit Discount", type: "Acquisition", description: "Welcome offer for new customers" },
    { title: "Loyalty Reward", type: "Retention", description: "Points-based rewards for repeat visits" },
    { title: "Group Dining Deal", type: "Volume", description: "Discounts for large groups" },
    { title: "Seasonal Special", type: "Limited Time", description: "Festival or season-specific offers" },
  ]

  const generateOffer = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      alert("New AI offer generated!")
    }, 3000)
  }

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
        <span className="breadcrumb-current">Offers</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}
        >
          <div>
            <h1>Targeted Offers</h1>
            <p>Create specific offers without campaigns or strategies.</p>
          </div>
          <button className="btn btn-primary btn-sm">+ New Offer</button>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{activeOffers.length}</div>
            <div className="stat-label">Active Offers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">68</div>
            <div className="stat-label">Total Redemptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹5K</div>
            <div className="stat-label">Total Budget</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.2x</div>
            <div className="stat-label">Avg ROI</div>
          </div>
        </div>
      </div>

      {/* AI Offer Generator */}
      <div className="card mb-6" style={{ padding: "1.5rem" }}>
        <h3 className="mb-4">🤖 AI Offer Generator</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="form-label">Offer Goal</label>
            <select className="form-select">
              <option>Increase foot traffic</option>
              <option>Boost slow hours</option>
              <option>Clear inventory</option>
              <option>Attract new customers</option>
              <option>Reward loyal customers</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <select className="form-select">
              <option>All customers</option>
              <option>New customers</option>
              <option>Loyal customers</option>
              <option>Inactive customers</option>
              <option>Weekend diners</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Offer Type</label>
            <select className="form-select">
              <option>Percentage discount</option>
              <option>Fixed amount off</option>
              <option>Buy X Get Y</option>
              <option>Free item</option>
              <option>Combo deal</option>
              <option>Combo deal</option>
            </select>
          </div>
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Additional Context</label>
          <textarea
            className="form-textarea"
            placeholder="e.g., We want to promote our new dessert menu, target families on weekends..."
            rows={3}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={generateOffer}
          disabled={isGenerating}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          {isGenerating ? "🤖 Generating Offer..." : "🤖 Generate AI Offer"}
        </button>
      </div>

      {/* Active Offers */}
      <div className="mb-6">
        <h2 className="mb-4">Active Offers</h2>
        <div className="grid grid-cols-1 gap-4">
          {activeOffers.map((offer, index) => (
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
                  <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>{offer.title}</h4>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.125rem 0.375rem",
                        background: "var(--muted)",
                        borderRadius: "0.25rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      {offer.type}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                      Target: {offer.target}
                    </span>
                  </div>
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
                  {offer.status}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4" style={{ fontSize: "0.875rem" }}>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Channels:</span>
                  <div>{offer.channels.join(", ")}</div>
                </div>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Redemptions:</span>
                  <div style={{ fontWeight: "500" }}>{offer.redemptions}</div>
                </div>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Budget:</span>
                  <div>{offer.budget}</div>
                </div>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Performance:</span>
                  <div style={{ color: "#10b981", fontWeight: "500" }}>{offer.performance}</div>
                </div>
                <div>
                  <span style={{ color: "var(--muted-foreground)" }}>Expires:</span>
                  <div>{offer.expires}</div>
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Templates */}
      <div>
        <h2 className="mb-4">Offer Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offerTemplates.map((template, index) => (
            <div key={index} className="card" style={{ padding: "1rem" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>{template.title}</h4>
              <div style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.125rem 0.375rem",
                    background: "var(--muted)",
                    borderRadius: "0.25rem",
                  }}
                >
                  {template.type}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>{template.description}</p>
              <button className="btn btn-secondary btn-sm" style={{ width: "100%" }}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
