"use client"

import { useState, useEffect } from "react"
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react"

export default function ProfilePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const setupSteps = [
    {
      id: "restaurant-info",
      title: "Restaurant Information",
      description: "Basic details about your restaurant",
      href: "/dashboard/profile/restaurant-info",
      completed: false,
      required: true,
    },
    {
      id: "brand-assets",
      title: "Brand Assets",
      description: "Logo, colors, and brand voice",
      href: "/dashboard/profile/brand-assets",
      completed: false,
      required: true,
    },
    {
      id: "media-assets",
      title: "Media Assets",
      description: "Photos and videos of your restaurant",
      href: "/dashboard/profile/media-assets",
      completed: false,
      required: true,
    },
  ]

  const profileModules = [
    {
      title: "Restaurant Page",
      description: "AI-generated landing page",
      href: "/dashboard/profile/restaurant-page",
      status: "Live",
      statusColor: "#22c55e",
      metrics: "2,847 views",
    },
    {
      title: "Menu Builder",
      description: "Digital menu management",
      href: "/dashboard/profile/menu-builder",
      status: "Active",
      statusColor: "#22c55e",
      metrics: "24 items",
    },
    {
      title: "WhatsApp Card",
      description: "Business card for WhatsApp",
      href: "/dashboard/profile/whatsapp-card",
      status: "Setup",
      statusColor: "#f59e0b",
      metrics: "QR ready",
    },
    {
      title: "Reviews Aggregator",
      description: "Manage reviews from all platforms",
      href: "/dashboard/profile/reviews-aggregator",
      status: "Active",
      statusColor: "#22c55e",
      metrics: "342 reviews",
    },
  ]

  const completedSteps = setupSteps.filter((step) => step.completed).length
  const totalSteps = setupSteps.length
  const isSetupComplete = completedSteps === totalSteps

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1>Restaurant Profile</h1>
        <p>Manage your restaurant's digital presence and brand assets</p>
      </div>

      {/* Quick Setup Guide */}
      {!isSetupComplete && (
        <div className="card card-elevated mb-8" style={{ padding: "24px" }}>
          <div className="mb-6">
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}
            >
              <h2>Complete Your Profile Setup</h2>
              <span style={{ fontSize: "14px", color: "#666666" }}>
                {completedSteps}/{totalSteps} completed
              </span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${(completedSteps / totalSteps) * 100}%` }} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {setupSteps.map((step, index) => (
              <a
                key={step.id}
                href={step.href}
                style={{
                  textDecoration: "none",
                  display: "block",
                  padding: "20px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "12px",
                  transition: "all 0.15s ease",
                  background: step.completed ? "#f8fffe" : "#ffffff",
                  borderColor: step.completed ? "#e0f2f1" : "#f0f0f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e0e0e0"
                  e.currentTarget.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = step.completed ? "#e0f2f1" : "#f0f0f0"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: step.completed ? "#22c55e" : "#f0f0f0",
                      color: step.completed ? "#ffffff" : "#666666",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                      flexShrink: 0,
                    }}
                  >
                    {step.completed ? <CheckCircle style={{ width: "16px", height: "16px" }} /> : index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: "4px", color: "#000000" }}>{step.title}</h4>
                    <p style={{ fontSize: "14px", color: "#666666", marginBottom: "12px" }}>{step.description}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontSize: "13px", color: step.completed ? "#22c55e" : "#666666" }}>
                        {step.completed ? "Completed" : "Required"}
                      </span>
                      <ChevronRight style={{ width: "14px", height: "14px", color: "#666666" }} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {completedSteps > 0 && completedSteps < totalSteps && (
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <a href={setupSteps.find((step) => !step.completed)?.href} className="btn btn-primary">
                Continue Setup
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Profile Modules */}
      <div className="mb-8">
        <h2 className="mb-6">Profile Modules</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {profileModules.map((module) => (
            <a
              key={module.title}
              href={module.href}
              style={{
                textDecoration: "none",
                display: "block",
                padding: "16px",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                transition: "all 0.15s ease",
                background: "#ffffff",
              }}
              className="card-elevated hover-lift"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <h4 style={{ marginBottom: "4px", color: "#000000" }}>{module.title}</h4>
                  <p style={{ fontSize: "14px", color: "#666666", marginBottom: "0" }}>{module.description}</p>
                </div>
                <span
                  className="badge"
                  style={{
                    background: `${module.statusColor}15`,
                    color: module.statusColor,
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {module.status}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#666666" }}>{module.metrics}</span>
                <ChevronRight style={{ width: "16px", height: "16px", color: "#666666" }} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-4">Quick Actions</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a href="/dashboard/profile/restaurant-page" className="btn btn-secondary btn-sm">
            View Restaurant Page
          </a>
          <a href="/dashboard/profile/menu-builder" className="btn btn-secondary btn-sm">
            Edit Menu
          </a>
          <a href="/dashboard/profile/reviews-aggregator" className="btn btn-secondary btn-sm">
            Check Reviews
          </a>
        </div>
      </div>
    </div>
  )
}
