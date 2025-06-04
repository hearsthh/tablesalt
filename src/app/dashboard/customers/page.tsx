"use client"

import { useState, useEffect } from "react"

export default function CustomersPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const customerSegments = [
    { name: "VIP Customers", count: 45, percentage: 15, color: "#f59e0b", growth: "+12%" },
    { name: "Frequent Diners", count: 128, percentage: 35, color: "#10b981", growth: "+8%" },
    { name: "Occasional Visitors", count: 89, percentage: 31, color: "#3b82f6", growth: "+5%" },
    { name: "New Customers", count: 67, percentage: 19, color: "#8b5cf6", growth: "+25%" },
  ]

  const customerFeatures = [
    {
      title: "Customer Analytics",
      description: "Deep insights into customer behavior and preferences",
      icon: "📊",
      href: "/dashboard/customers/analytics",
    },
    {
      title: "Segmentation",
      description: "AI-powered customer segmentation and targeting",
      icon: "🎯",
      href: "/dashboard/customers/segmentation",
    },
    {
      title: "Churn Prediction",
      description: "Identify customers at risk of leaving",
      icon: "⚠️",
      href: "/dashboard/customers/churn",
    },
    {
      title: "Loyalty Programs",
      description: "Create and manage customer loyalty programs",
      icon: "🏆",
      href: "/dashboard/customers/loyalty",
    },
    {
      title: "Feedback Analysis",
      description: "AI analysis of customer reviews and feedback",
      icon: "💬",
      href: "/dashboard/customers/feedback",
    },
    {
      title: "Lifetime Value",
      description: "Calculate and optimize customer lifetime value",
      icon: "💰",
      href: "/dashboard/customers/ltv",
    },
  ]

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1>Customer Intelligence</h1>
        <p style={{ fontSize: isMobile ? "1rem" : "1.125rem" }}>
          AI-powered insights to understand and engage your customers
        </p>
      </div>

      {/* Customer Segments */}
      <div className="elegant-card mb-8" style={{ padding: "2rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Customer Segments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {customerSegments.map((segment, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "#f9fafb",
                borderRadius: "0.75rem",
                border: "1px solid #f3f4f6",
              }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: segment.color,
                  borderRadius: "50%",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {segment.percentage}%
              </div>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{segment.name}</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", margin: "0.5rem 0" }}>
                {segment.count}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#10b981", margin: 0 }}>{segment.growth}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {customerFeatures.map((feature, index) => (
          <a
            key={index}
            href={feature.href}
            className="elegant-card"
            style={{ padding: "2rem", textDecoration: "none", display: "block" }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.5rem",
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ color: "#1f2937", marginBottom: "0.5rem" }}>{feature.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{feature.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Customer Insights */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">329</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">$45</div>
          <div className="stat-label">Avg Order Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2.3</div>
          <div className="stat-label">Visit Frequency</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">92%</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  )
}
