"use client"

import { useState } from "react"
import Link from "next/link"

interface SetupStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
  href: string
}

export default function RestaurantSetupPage() {
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: "restaurant-info",
      title: "Restaurant Information",
      description: "Basic details about your restaurant",
      completed: true,
      required: true,
      href: "/dashboard/onboarding",
    },
    {
      id: "brand-assets",
      title: "Brand Assets",
      description: "Logo, colors, and brand identity",
      completed: false,
      required: true,
      href: "/dashboard/onboarding",
    },
    {
      id: "menu-upload",
      title: "Menu Upload",
      description: "Upload your menu and pricing",
      completed: false,
      required: true,
      href: "/dashboard/onboarding",
    },
    {
      id: "social-channels",
      title: "Social Media Channels",
      description: "Connect Instagram, Facebook, WhatsApp",
      completed: false,
      required: false,
      href: "/dashboard/onboarding",
    },
    {
      id: "customer-data",
      title: "Customer Data",
      description: "Import existing customer information",
      completed: false,
      required: false,
      href: "/dashboard/analytics",
    },
    {
      id: "analytics-setup",
      title: "Analytics Setup",
      description: "Configure tracking and reporting",
      completed: false,
      required: false,
      href: "/dashboard/analytics",
    },
  ])

  const completedSteps = setupSteps.filter((step) => step.completed).length
  const totalSteps = setupSteps.length
  const requiredSteps = setupSteps.filter((step) => step.required)
  const completedRequiredSteps = requiredSteps.filter((step) => step.completed).length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const toggleStepCompletion = (stepId: string) => {
    setSetupSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)))
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.5rem" }}>
            Restaurant Setup
          </h1>
          <p style={{ color: "#6b7280" }}>Complete your restaurant profile to get the most out of TableSalt AI</p>
        </div>
        <Link href="/dashboard/onboarding">
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Complete Setup
            <span>→</span>
          </button>
        </Link>
      </div>

      {/* Progress Overview */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
          Setup Progress
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          {completedSteps} of {totalSteps} steps completed
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.5rem" }}
          >
            <span>Overall Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: "#3b82f6",
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            paddingTop: "1rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>{completedSteps}</div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Completed</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b" }}>{totalSteps - completedSteps}</div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Remaining</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>
              {completedRequiredSteps}/{requiredSteps.length}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Required</div>
          </div>
        </div>
      </div>

      {/* Required Steps Alert */}
      {completedRequiredSteps < requiredSteps.length && (
        <div
          className="card"
          style={{
            marginBottom: "2rem",
            border: "1px solid #fed7aa",
            backgroundColor: "#fff7ed",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <div style={{ color: "#f59e0b", fontSize: "1.25rem" }}>⚠️</div>
            <div>
              <h4 style={{ fontWeight: "500", color: "#9a3412", marginBottom: "0.25rem" }}>Complete Required Steps</h4>
              <p style={{ fontSize: "0.875rem", color: "#c2410c", margin: 0 }}>
                You need to complete {requiredSteps.length - completedRequiredSteps} more required steps to fully
                activate your AI marketing features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Setup Steps */}
      <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
        {setupSteps.map((step, index) => (
          <div
            key={step.id}
            className="card"
            style={{
              border: step.completed ? "1px solid #bbf7d0" : "1px solid #e5e7eb",
              backgroundColor: step.completed ? "#f0fdf4" : "white",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ flexShrink: 0 }}>
                  {step.completed ? (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#10b981",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.25rem",
                      }}
                    >
                      ✓
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6b7280",
                        fontSize: "1.25rem",
                      }}
                    >
                      ⚙️
                    </div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <h3 style={{ fontWeight: "500", color: "#1f2937", margin: 0 }}>{step.title}</h3>
                    {step.required && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.125rem 0.375rem",
                          borderRadius: "0.25rem",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "white",
                          color: "#6b7280",
                        }}
                      >
                        Required
                      </span>
                    )}
                    {step.completed && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.125rem 0.375rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "#dcfce7",
                          color: "#166534",
                        }}
                      >
                        Completed
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>{step.description}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {step.completed && (
                  <button
                    onClick={() => toggleStepCompletion(step.id)}
                    className="btn-secondary"
                    style={{ fontSize: "0.875rem", padding: "0.375rem 0.75rem" }}
                  >
                    Edit
                  </button>
                )}
                <Link href={step.href}>
                  <button
                    className={step.completed ? "btn-secondary" : "btn-primary"}
                    style={{
                      fontSize: "0.875rem",
                      padding: "0.375rem 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {step.completed ? "Review" : "Setup"}
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
          Quick Actions
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Common setup tasks and shortcuts</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <Link href="/dashboard/onboarding">
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: "white",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <div style={{ fontSize: "1.5rem", color: "#3b82f6", marginBottom: "0.5rem" }}>⚙️</div>
              <div>
                <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>Complete Onboarding</div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Finish setting up your restaurant</div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/content-calendar">
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: "white",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <div style={{ fontSize: "1.5rem", color: "#10b981", marginBottom: "0.5rem" }}>📤</div>
              <div>
                <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>Generate Content</div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Create your first AI content</div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/analytics">
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: "white",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <div style={{ fontSize: "1.5rem", color: "#8b5cf6", marginBottom: "0.5rem" }}>📊</div>
              <div>
                <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>View Analytics</div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Track your performance</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
