"use client"

import { useState, useEffect } from "react"

export default function NewStrategyPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    timeline: "",
    primaryGoal: "",
    targetAudience: "",
    budget: "",
    businessGoals: [] as string[],
    brandPositioning: "",
    pillars: [] as string[],
    context: "",
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const steps = [
    { id: 1, title: "Basic Info", description: "Strategy name and timeline" },
    { id: 2, title: "Goals & Audience", description: "Define objectives and target market" },
    { id: 3, title: "Brand & Pillars", description: "Positioning and strategic pillars" },
    { id: 4, title: "AI Generation", description: "Generate your strategy" },
  ]

  const businessGoalOptions = [
    "Increase monthly foot traffic by 25%",
    "Boost weekday lunch orders by 40%",
    "Improve customer retention by 30%",
    "Expand delivery radius",
    "Launch new menu items",
    "Increase average order value",
    "Build brand awareness",
    "Grow social media following",
  ]

  const pillarOptions = [
    "Menu Innovation",
    "Digital-First Marketing",
    "Loyalty & Retention",
    "Local Partnerships",
    "Sustainable Practices",
    "Premium Experience",
    "Community Engagement",
    "Health & Wellness",
  ]

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      businessGoals: prev.businessGoals.includes(goal)
        ? prev.businessGoals.filter((g) => g !== goal)
        : [...prev.businessGoals, goal],
    }))
  }

  const handlePillarToggle = (pillar: string) => {
    setFormData((prev) => ({
      ...prev,
      pillars: prev.pillars.includes(pillar) ? prev.pillars.filter((p) => p !== pillar) : [...prev.pillars, pillar],
    }))
  }

  const handleSubmit = async () => {
    // Here you would typically send the data to your AI generation endpoint
    console.log("Strategy data:", formData)
    alert("Strategy generated successfully!")
    window.location.href = "/dashboard/marketing/strategies"
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
        <a href="/dashboard/marketing/strategies" className="breadcrumb-item">
          Strategies
        </a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">New Strategy</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1>Create New Strategy</h1>
        <p>Build a comprehensive marketing strategy with AI assistance.</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {steps.map((step, index) => (
            <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    backgroundColor: currentStep >= step.id ? "#10b981" : "#e5e7eb",
                    color: currentStep >= step.id ? "white" : "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>{step.title}</div>
                {!isMobile && <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{step.description}</div>}
              </div>
              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: currentStep > step.id ? "#10b981" : "#e5e7eb",
                    margin: "0 1rem",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="card" style={{ padding: "2rem" }}>
        {currentStep === 1 && (
          <div>
            <h2 className="mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Strategy Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Q1 2024 Growth Strategy"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Timeline *</label>
                <select
                  className="form-select"
                  value={formData.timeline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                >
                  <option value="">Select Timeline</option>
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="12-months">12 Months</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="mb-4">Goals & Target Audience</h2>
            <div className="form-group mb-4">
              <label className="form-label">Primary Goal *</label>
              <select
                className="form-select"
                value={formData.primaryGoal}
                onChange={(e) => setFormData((prev) => ({ ...prev, primaryGoal: e.target.value }))}
              >
                <option value="">Select Primary Goal</option>
                <option value="increase-traffic">Increase foot traffic</option>
                <option value="boost-revenue">Boost revenue</option>
                <option value="improve-retention">Improve customer retention</option>
                <option value="expand-reach">Expand market reach</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Business Goals (Select multiple)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {businessGoalOptions.map((goal) => (
                  <label
                    key={goal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      border: "1px solid #e1e5e9",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      backgroundColor: formData.businessGoals.includes(goal) ? "#f0f9ff" : "white",
                      borderColor: formData.businessGoals.includes(goal) ? "#0ea5e9" : "#e1e5e9",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.businessGoals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ fontSize: "0.875rem" }}>{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Target Audience *</label>
                <select
                  className="form-select"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                >
                  <option value="">Select Target Audience</option>
                  <option value="young-professionals">Young professionals (25-40)</option>
                  <option value="families">Families with children</option>
                  <option value="health-conscious">Health-conscious diners</option>
                  <option value="tourists">Tourists and visitors</option>
                  <option value="seniors">Senior citizens</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Budget Range *</label>
                <select
                  className="form-select"
                  value={formData.budget}
                  onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                >
                  <option value="">Select Budget Range</option>
                  <option value="10k-25k">₹10,000 - ₹25,000</option>
                  <option value="25k-50k">₹25,000 - ₹50,000</option>
                  <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                  <option value="100k+">₹1,00,000+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="mb-4">Brand Positioning & Strategic Pillars</h2>
            <div className="form-group mb-4">
              <label className="form-label">Brand Positioning Statement</label>
              <textarea
                className="form-textarea"
                value={formData.brandPositioning}
                onChange={(e) => setFormData((prev) => ({ ...prev, brandPositioning: e.target.value }))}
                placeholder="Describe how you want your restaurant to be positioned in the market..."
                rows={3}
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Strategic Pillars (Select 3-4)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pillarOptions.map((pillar) => (
                  <label
                    key={pillar}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      border: "1px solid #e1e5e9",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      backgroundColor: formData.pillars.includes(pillar) ? "#f0f9ff" : "white",
                      borderColor: formData.pillars.includes(pillar) ? "#0ea5e9" : "#e1e5e9",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.pillars.includes(pillar)}
                      onChange={() => handlePillarToggle(pillar)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ fontSize: "0.875rem" }}>{pillar}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Additional Context</label>
              <textarea
                className="form-textarea"
                value={formData.context}
                onChange={(e) => setFormData((prev) => ({ ...prev, context: e.target.value }))}
                placeholder="Provide any additional context about your restaurant, current challenges, or specific requirements..."
                rows={4}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ textAlign: "center" }}>
            <h2 className="mb-4">Generate Your Strategy</h2>
            <p style={{ marginBottom: "2rem", color: "#6b7280" }}>
              Review your inputs and generate a comprehensive marketing strategy with AI.
            </p>

            <div
              style={{ backgroundColor: "#f9fafb", padding: "1.5rem", borderRadius: "0.5rem", marginBottom: "2rem" }}
            >
              <h3 style={{ marginBottom: "1rem" }}>Strategy Summary</h3>
              <div style={{ textAlign: "left", fontSize: "0.875rem", color: "#6b7280" }}>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Name:</strong> {formData.name}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Timeline:</strong> {formData.timeline}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Primary Goal:</strong> {formData.primaryGoal}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Target Audience:</strong> {formData.targetAudience}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong>Budget:</strong> {formData.budget}
                </div>
                <div>
                  <strong>Strategic Pillars:</strong> {formData.pillars.join(", ")}
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
              🤖 Generate Strategy with AI
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="btn btn-secondary"
          disabled={currentStep === 1}
        >
          Previous
        </button>

        {currentStep < 4 ? (
          <button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))} className="btn btn-primary">
            Next
          </button>
        ) : (
          <a href="/dashboard/marketing/strategies" className="btn btn-secondary">
            Cancel
          </a>
        )}
      </div>
    </div>
  )
}
