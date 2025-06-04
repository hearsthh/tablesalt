"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function NewCampaignPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    goal: "",
    strategy: "",
    pillar: "",
    channels: [] as string[],
    budget: "",
    timeline: "",
    targetAudience: "",
    description: "",
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const strategies = ["Q4 Growth Strategy", "Holiday Season Campaign", "New Year Strategy", "Standalone Campaign"]

  const pillars = ["Menu Innovation", "Digital-First Marketing", "Loyalty & Retention", "Local Partnerships"]

  const channels = ["Instagram", "Facebook", "Google Ads", "Email", "SMS", "WhatsApp", "Blog", "Partnerships"]

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Campaign data:", formData)
    alert("Campaign created successfully!")
    window.location.href = "/dashboard/marketing/campaigns"
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
        <a href="/dashboard/marketing/campaigns" className="breadcrumb-item">
          Campaigns
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">New Campaign</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1>Create New Campaign</h1>
        <p>Set up a new marketing campaign to promote your restaurant.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 className="mb-4">Campaign Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">Campaign Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Weekend Brunch Special"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Goal *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.goal}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))}
                    placeholder="e.g., Increase weekend bookings"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">Connect to Strategy</label>
                  <select
                    className="form-select"
                    value={formData.strategy}
                    onChange={(e) => setFormData((prev) => ({ ...prev, strategy: e.target.value }))}
                  >
                    <option value="">Select Strategy (Optional)</option>
                    {strategies.map((strategy) => (
                      <option key={strategy} value={strategy}>
                        {strategy}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Strategy Pillar</label>
                  <select
                    className="form-select"
                    value={formData.pillar}
                    onChange={(e) => setFormData((prev) => ({ ...prev, pillar: e.target.value }))}
                    disabled={!formData.strategy}
                  >
                    <option value="">Select Pillar</option>
                    {pillars.map((pillar) => (
                      <option key={pillar} value={pillar}>
                        {pillar}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Marketing Channels *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {channels.map((channel) => (
                    <label
                      key={channel}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        border: "1px solid #e1e5e9",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        backgroundColor: formData.channels.includes(channel) ? "#f0f9ff" : "white",
                        borderColor: formData.channels.includes(channel) ? "#0ea5e9" : "#e1e5e9",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.channels.includes(channel)}
                        onChange={() => handleChannelToggle(channel)}
                        style={{ margin: 0 }}
                      />
                      <span style={{ fontSize: "0.875rem" }}>{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">Budget (₹) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    placeholder="10000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Timeline *</label>
                  <select
                    className="form-select"
                    value={formData.timeline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                    required
                  >
                    <option value="">Select Timeline</option>
                    <option value="1-week">1 Week</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="1-month">1 Month</option>
                    <option value="3-months">3 Months</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Target Audience</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="e.g., Young professionals, Families with kids"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Campaign Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your campaign objectives, key messages, and any special requirements..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <h3 className="mb-4">Campaign Preview</h3>
              <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                  <strong>Title:</strong> {formData.title || "Campaign Title"}
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <strong>Goal:</strong> {formData.goal || "Campaign Goal"}
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <strong>Budget:</strong> ₹{formData.budget || "0"}
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <strong>Timeline:</strong> {formData.timeline || "Not set"}
                </div>
                <div>
                  <strong>Channels:</strong>{" "}
                  {formData.channels.length > 0 ? formData.channels.join(", ") : "None selected"}
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 className="mb-4">Quick Tips</h3>
              <ul style={{ fontSize: "0.875rem", color: "#6b7280", paddingLeft: "1rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>Choose 2-3 channels for better focus</li>
                <li style={{ marginBottom: "0.5rem" }}>Set realistic budget based on your goals</li>
                <li style={{ marginBottom: "0.5rem" }}>Connect to a strategy for better tracking</li>
                <li>Use clear, measurable objectives</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "2rem" }}>
          <a href="/dashboard/marketing/campaigns" className="btn btn-secondary">
            Cancel
          </a>
          <button type="submit" className="btn btn-primary">
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  )
}
