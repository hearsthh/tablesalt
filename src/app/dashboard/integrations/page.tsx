"use client"

import { useState, useEffect } from "react"

export default function IntegrationsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("social")

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const socialChannels = [
    {
      name: "Instagram",
      icon: "📷",
      connected: true,
      followers: "2.4K",
      engagement: "8.2%",
      posts: "24",
      status: "active",
    },
    {
      name: "Facebook",
      icon: "📘",
      connected: true,
      followers: "1.8K",
      engagement: "6.5%",
      posts: "18",
      status: "active",
    },
    { name: "WhatsApp", icon: "💬", connected: false, followers: "-", engagement: "-", posts: "-", status: "inactive" },
    { name: "Twitter", icon: "🐦", connected: false, followers: "-", engagement: "-", posts: "-", status: "inactive" },
  ]

  const listingChannels = [
    {
      name: "Google My Business",
      icon: "🌐",
      connected: true,
      reviews: "4.5★",
      orders: "156",
      revenue: "₹45K",
      status: "active",
    },
    { name: "Zomato", icon: "🍽️", connected: true, reviews: "4.2★", orders: "89", revenue: "₹28K", status: "active" },
    { name: "Swiggy", icon: "🛵", connected: false, reviews: "-", orders: "-", revenue: "-", status: "inactive" },
    { name: "Uber Eats", icon: "🚗", connected: false, reviews: "-", orders: "-", revenue: "-", status: "inactive" },
  ]

  const adPlatforms = [
    {
      name: "Google Ads",
      icon: "🎯",
      connected: true,
      budget: "₹15K",
      clicks: "1.2K",
      conversions: "45",
      status: "active",
    },
    {
      name: "Facebook Ads",
      icon: "📊",
      connected: true,
      budget: "₹12K",
      clicks: "980",
      conversions: "38",
      status: "active",
    },
    {
      name: "Instagram Ads",
      icon: "📸",
      connected: false,
      budget: "-",
      clicks: "-",
      conversions: "-",
      status: "inactive",
    },
  ]

  const tabs = [
    { id: "social", label: "Social Media", count: socialChannels.filter((c) => c.connected).length },
    { id: "listings", label: "Listings", count: listingChannels.filter((c) => c.connected).length },
    { id: "ads", label: "Advertising", count: adPlatforms.filter((c) => c.connected).length },
  ]

  const renderChannelCard = (channel: any, type: string) => (
    <div key={channel.name} className="card" style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1rem" }}>{channel.icon}</span>
          <div>
            <h4 style={{ fontSize: "0.875rem", margin: 0 }}>{channel.name}</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}>
              <span className={`status-dot status-${channel.status}`}></span>
              <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                {channel.connected ? "Connected" : "Not Connected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {channel.connected && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.75rem",
          }}
        >
          {type === "social" && (
            <>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Followers:</span>
                <br />
                <strong>{channel.followers}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Engagement:</span>
                <br />
                <strong>{channel.engagement}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Posts:</span>
                <br />
                <strong>{channel.posts}</strong>
              </div>
            </>
          )}
          {type === "listings" && (
            <>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Rating:</span>
                <br />
                <strong>{channel.reviews}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Orders:</span>
                <br />
                <strong>{channel.orders}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Revenue:</span>
                <br />
                <strong>{channel.revenue}</strong>
              </div>
            </>
          )}
          {type === "ads" && (
            <>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Budget:</span>
                <br />
                <strong>{channel.budget}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Clicks:</span>
                <br />
                <strong>{channel.clicks}</strong>
              </div>
              <div>
                <span style={{ color: "var(--muted-foreground)" }}>Conversions:</span>
                <br />
                <strong>{channel.conversions}</strong>
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {channel.connected ? (
          <>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              View Details
            </button>
            <button className="btn btn-ghost btn-sm">Disconnect</button>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" style={{ width: "100%" }}>
            Connect
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/dashboard" className="breadcrumb-item">
          Dashboard
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Integrations</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1>Channel Integrations</h1>
        <p>Connect and manage your social media, listing platforms, and advertising channels.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">
            {socialChannels.filter((c) => c.connected).length +
              listingChannels.filter((c) => c.connected).length +
              adPlatforms.filter((c) => c.connected).length}
          </div>
          <div className="stat-label">Total Connected</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹73K</div>
          <div className="stat-label">Monthly Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4.1K</div>
          <div className="stat-label">Total Followers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">7.3%</div>
          <div className="stat-label">Avg Engagement</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className={isMobile ? "mobile-nav" : "flex gap-1"}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={isMobile ? "mobile-nav-item" : "nav-item"}
              style={{
                backgroundColor: activeTab === tab.id ? "var(--foreground)" : "var(--background)",
                color: activeTab === tab.id ? "var(--primary-foreground)" : "var(--foreground)",
                borderColor: activeTab === tab.id ? "var(--foreground)" : "var(--border)",
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {activeTab === "social" && socialChannels.map((channel) => renderChannelCard(channel, "social"))}
        {activeTab === "listings" && listingChannels.map((channel) => renderChannelCard(channel, "listings"))}
        {activeTab === "ads" && adPlatforms.map((channel) => renderChannelCard(channel, "ads"))}
      </div>
    </div>
  )
}
