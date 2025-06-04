"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const onboardingSteps = [
  {
    id: "restaurant-setup",
    title: "Restaurant Information",
    description: "Tell us about your restaurant",
  },
  {
    id: "brand-assets",
    title: "Brand Assets",
    description: "Upload your logo and define your brand",
  },
  {
    id: "menu-upload",
    title: "Menu Upload",
    description: "Upload your menu and pricing",
  },
  {
    id: "media-assets",
    title: "Media Assets",
    description: "Upload photos of your restaurant and food",
  },
  {
    id: "channel-connections",
    title: "Social Media Channels",
    description: "Connect your social media accounts",
  },
  {
    id: "customer-data",
    title: "Customer Data",
    description: "Import your existing customer data",
  },
  {
    id: "ai-strategy",
    title: "AI Strategy Generation",
    description: "Generate your personalized marketing strategy",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const progressPercentage = ((currentStep + 1) / onboardingSteps.length) * 100
  const currentStepData = onboardingSteps[currentStep]

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (completed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div className="card" style={{ width: "100%", maxWidth: "32rem", textAlign: "center" }}>
          <div
            style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              fontSize: "2rem",
              color: "white",
            }}
          >
            ✓
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
            Welcome to TableSalt AI! 🎉
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6b7280", marginBottom: "2rem" }}>
            Your restaurant is now set up and ready to start generating amazing marketing content with AI.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ backgroundColor: "#dbeafe", padding: "1rem", borderRadius: "0.5rem" }}>
              <h3 style={{ fontWeight: "600", color: "#1e40af", marginBottom: "0.5rem" }}>What's Next?</h3>
              <ul style={{ fontSize: "0.875rem", color: "#1e40af", listStyle: "none", padding: 0, margin: 0 }}>
                <li>• Generate your first AI content</li>
                <li>• Schedule social media posts</li>
                <li>• Track your performance</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#dcfce7", padding: "1rem", borderRadius: "0.5rem" }}>
              <h3 style={{ fontWeight: "600", color: "#166534", marginBottom: "0.5rem" }}>You're All Set!</h3>
              <ul style={{ fontSize: "0.875rem", color: "#166534", listStyle: "none", padding: 0, margin: 0 }}>
                <li>• Restaurant profile complete</li>
                <li>• Social channels connected</li>
                <li>• AI strategy generated</li>
              </ul>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/dashboard/content-calendar">
              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  fontSize: "1.125rem",
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                ✨ Generate Content
              </button>
            </Link>
            <Link href="/dashboard">
              <button
                className="btn-secondary"
                style={{
                  width: "100%",
                  fontSize: "1.125rem",
                  padding: "0.75rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                Go to Dashboard →
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f9fafb 0%, white 100%)" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.5rem" }}>
            Restaurant Onboarding
          </h1>
          <p style={{ color: "#6b7280" }}>Let's set up your restaurant for AI-powered marketing success</p>
        </div>

        {/* Progress Bar */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <h3 style={{ fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                Step {currentStep + 1} of {onboardingSteps.length}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>{currentStepData.title}</p>
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
                border: "1px solid #dbeafe",
                backgroundColor: "#eff6ff",
                color: "#1e40af",
              }}
            >
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "1rem",
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

          {/* Step indicators */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {onboardingSteps.map((step, index) => (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: index <= currentStep ? "#3b82f6" : "#9ca3af",
                }}
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    backgroundColor: index < currentStep ? "#10b981" : index === currentStep ? "#3b82f6" : "#e5e7eb",
                    color: index <= currentStep ? "white" : "#6b7280",
                  }}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                    textAlign: "center",
                    maxWidth: "4rem",
                    display: isMobile ? "none" : "block",
                  }}
                >
                  {step.title.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="card">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>
            {currentStepData.title}
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>{currentStepData.description}</p>

          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div
              style={{
                width: "4rem",
                height: "4rem",
                backgroundColor: "#f3f4f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "2rem",
              }}
            >
              ✨
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "500", color: "#1f2937", marginBottom: "0.5rem" }}>
              Coming Soon
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>This step is currently being developed.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              {currentStep > 0 && (
                <button onClick={handlePrevious} className="btn-secondary">
                  ← Previous
                </button>
              )}
              <button onClick={handleNext} className="btn-primary">
                Skip for Now →
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-secondary"
            style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
          >
            ← Previous
          </button>
          <button onClick={handleNext} className="btn-secondary">
            Skip Step →
          </button>
        </div>
      </div>
    </div>
  )
}
