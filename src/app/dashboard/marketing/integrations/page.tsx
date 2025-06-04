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
      logoUrl: "/instagram.svg",
      brandColor: "#E4405F",
      connected: true,
      followers: "2.4K",
      engagement: "3.2%",
      posts: "12",
      description: "Share photos and videos with your audience.",
      fallback: "Instagram Logo",
    },
    {
      name: "Facebook",
      logoUrl: "/facebook.svg",
      brandColor: "#1877F2",
      connected: true,
      followers: "1.8K",
      engagement: "2.8%",
      posts: "8",
      description: "Connect with friends, family and other people you know.",
      fallback: "Facebook Logo",
    },
    {
      name: "WhatsApp Business",
      logoUrl: "/whatsapp.svg",
      brandColor: "#25D366",
      connected: false,
      followers: "-",
      engagement: "-",
      posts: "-",
      description: "Communicate with customers and provide support.",
      fallback: "WhatsApp Logo",
    },
    {
      name: "Twitter",
      logoUrl: "/twitter.svg",
      brandColor: "#1DA1F2",
      connected: false,
      followers: "-",
      engagement: "-",
      posts: "-",
      description: "Get the latest news and share your thoughts with the world.",
      fallback: "Twitter Logo",
    },
    {
      name: "TikTok",
      logoUrl: "/tiktok.svg",
      brandColor: "#000000",
      connected: false,
      followers: "-",
      engagement: "-",
      posts: "-",
      description: "Create and share short-form videos.",
      fallback: "TikTok Logo",
    },
  ]

  const listingChannels = [
    {
      name: "Google My Business",
      logoUrl: "/google-my-business.svg",
      brandColor: "#4285F4",
      connected: true,
      reviews: "4.5★ (124)",
      orders: "-",
      revenue: "-",
      description: "Manage your business presence on Google.",
      fallback: "Google My Business Logo",
    },
    {
      name: "Zomato",
      logoUrl: "/zomato.svg",
      brandColor: "#E23744",
      connected: true,
      reviews: "4.2★ (89)",
      orders: "-",
      revenue: "-",
      description: "Discover great places to eat around you.",
      fallback: "Zomato Logo",
    },
    {
      name: "Swiggy",
      logoUrl: "/swiggy.svg",
      brandColor: "#FC8019",
      connected: false,
      reviews: "-",
      orders: "-",
      revenue: "-",
      description: "Order food online from your favorite restaurants.",
      fallback: "Swiggy Logo",
    },
    {
      name: "Uber Eats",
      logoUrl: "/uber-eats.svg",
      brandColor: "#06C1E4",
      connected: false,
      reviews: "-",
      orders: "-",
      revenue: "-",
      description: "Get food delivery from the best restaurants in town.",
      fallback: "Uber Eats Logo",
    },
    {
      name: "Yelp",
      logoUrl: "/yelp.svg",
      brandColor: "#D32323",
      connected: false,
      reviews: "-",
      orders: "-",
      revenue: "-",
      description: "Read reviews, browse photos, and find great local businesses.",
      fallback: "Yelp Logo",
    },
  ]

  const adPlatforms = [
    {
      name: "Google Ads",
      logoUrl: "/google-ads.svg",
      brandColor: "#4285F4",
      connected: true,
      budget: "₹15,000/month",
      clicks: "1.2K",
      conversions: "85",
      description: "Reach customers and grow your business with Google Ads.",
      fallback: "Google Ads Logo",
    },
    {
      name: "Facebook Ads",
      logoUrl: "/facebook.svg",
      brandColor: "#1877F2",
      connected: true,
      budget: "₹12,000/month",
      clicks: "950",
      conversions: "62",
      description: "Create ads that reach people on Facebook, Instagram, and Audience Network.",
      fallback: "Facebook Logo",
    },
    {
      name: "Instagram Ads",
      logoUrl: "/instagram.svg",
      brandColor: "#E4405F",
      connected: true,
      budget: "₹8,000/month",
      clicks: "680",
      conversions: "48",
      description: "Promote your brand and drive sales with Instagram Ads.",
      fallback: "Instagram Logo",
    },
    {
      name: "YouTube Ads",
      logoUrl: "/youtube.svg",
      brandColor: "#FF0000",
      connected: false,
      budget: "-",
      clicks: "-",
      conversions: "-",
      description: "Showcase your products and services with engaging video ads.",
      fallback: "YouTube Logo",
    },
  ]

  const tabs = [
    { id: "social", label: "Social Media", count: socialChannels.filter((c) => c.connected).length },
    { id: "listings", label: "Listings", count: listingChannels.filter((c) => c.connected).length },
    { id: "ads", label: "Ad Platforms", count: adPlatforms.filter((c) => c.connected).length },
  ]

  const renderChannelCard = (channel: any, type: string) => (
    <div key={channel.name} className="elegant-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.5rem" }}>{channel.icon}</span>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", margin: 0 }}>{channel.name}</h4>
            <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>
              {type === "social" ? channel.followers : type === "listings" ? channel.reviews : channel.budget}
            </p>
          </div>
        </div>
        <div
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "1rem",
            fontSize: "0.75rem",
            fontWeight: "500",
            background: channel.connected ? "#dcfce7" : "#fef3c7",
            color: channel.connected ? "#166534" : "#92400e",
          }}
        >
          {channel.status}
        </div>
      </div>

      {channel.connected ? (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn btn-secondary" style={{ flex: 1, fontSize: "0.75rem", padding: "0.5rem" }}>
            Manage
          </button>
          <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.75rem", padding: "0.5rem" }}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" style={{ width: "100%", fontSize: "0.875rem" }}>
          Connect {channel.name}
        </button>
      )}
    </div>
  )

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontSize: isMobile ? "1.5rem" : "2rem", marginBottom: "0.5rem" }}>Channel Integrations</h1>
        <p style={{ fontSize: isMobile ? "0.875rem" : "1rem", color: "#6b7280" }}>
          Connect your social media, listing platforms, and advertising channels
        </p>
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
                backgroundColor: activeTab === tab.id ? "#1f2937" : "white",
                color: activeTab === tab.id ? "white" : "#6b7280",
                border: activeTab === tab.id ? "none" : "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {tab.label}
              <span
                style={{
                  background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                  color: activeTab === tab.id ? "white" : "#6b7280",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                {tab.count}
              </span>
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

      {/* AI Recommendations */}
      <div
        className="elegant-card mt-8"
        style={{
          padding: "2rem",
          background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
          color: "white",
        }}
      >
        <h3 style={{ color: "white", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          🤖 AI Recommendations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 style={{ color: "white", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Suggested Connections</h4>
            <ul style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.9)" }}>
              <li>• Connect WhatsApp Business for customer support</li>
              <li>• List on Swiggy to increase delivery orders</li>
              <li>• Add YouTube Ads for video marketing</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "white", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Optimization Tips</h4>
            <ul style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.9)" }}>
              <li>• Increase Google Ads budget by 20% for better reach</li>
              <li>• Post more frequently on Instagram (3x/week)</li>
              <li>• Respond to Zomato reviews within 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
