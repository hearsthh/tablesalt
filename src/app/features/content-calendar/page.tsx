"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Target, CheckCircle, Zap } from "lucide-react"

export default function ContentCalendarPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header with Navigation */}
      <header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "1rem 0" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/" style={{ textDecoration: "none", color: "#666" }}>
                <ArrowLeft size={20} />
              </Link>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#000", margin: 0 }}>Content Calendar</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href="/features/social-content"
                style={{ textDecoration: "none", color: "#666", fontSize: "0.875rem" }}
              >
                ← Social Content
              </Link>
              <Link
                href="/features/customer-insights"
                style={{ textDecoration: "none", color: "#666", fontSize: "0.875rem" }}
              >
                Customer Insights →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{ padding: "5rem 0", background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", color: "#fff" }}
      >
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "4rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <Zap size={20} style={{ color: "#fbbf24" }} />
                <span style={{ fontSize: "0.875rem", color: "#fbbf24", fontWeight: "500", letterSpacing: "0.05em" }}>
                  AI-SCHEDULED
                </span>
              </div>
              <h1 style={{ fontSize: "3rem", fontWeight: "300", marginBottom: "1.5rem", lineHeight: "1.1" }}>
                Never Miss
                <span style={{ fontWeight: "600", display: "block" }}>Peak Hours Again</span>
              </h1>
              <p style={{ fontSize: "1.25rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: 0.9 }}>
                AI analyzes your audience behavior and schedules posts at optimal times automatically. Perfect timing
                for maximum engagement, every single time.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem" }}>Optimal timing analysis</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem" }}>Cross-platform scheduling</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#10b981" }} />
                  <span style={{ fontSize: "0.875rem" }}>Auto-posting</span>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                padding: "3rem",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Calendar size={64} style={{ color: "#fbbf24", marginBottom: "1.5rem" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "1rem" }}>Smart Calendar</h3>
              <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                AI-powered scheduling that learns your audience patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "6rem 0", background: "#f8f9fa" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "300", marginBottom: "1rem", color: "#000" }}>
              How AI Makes Scheduling <span style={{ fontWeight: "600" }}>Effortless</span>
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              Advanced algorithms analyze engagement patterns to find the perfect posting times
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2.5rem" }}>
            {[
              {
                icon: <Clock size={32} />,
                title: "Peak Time Detection",
                description:
                  "AI identifies when your audience is most active across all platforms and schedules accordingly.",
                color: "#8b5cf6",
              },
              {
                icon: <Target size={32} />,
                title: "Platform Optimization",
                description:
                  "Different optimal times for Instagram, Facebook, and other platforms - all handled automatically.",
                color: "#8b5cf6",
              },
              {
                icon: <Calendar size={32} />,
                title: "30-Day Planning",
                description: "Complete month of content scheduled in advance with smart spacing and variety.",
                color: "#8b5cf6",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "1rem",
                  padding: "2.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.1)",
                  border: "1px solid #f0f0f0",
                }}
              >
                <div
                  style={{ color: feature.color, marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#000" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: "1.6" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", background: "#fff", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "300", marginBottom: "1rem", color: "#000" }}>
            Ready to automate your <span style={{ fontWeight: "600" }}>content schedule?</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#666", marginBottom: "2rem" }}>
            Let AI handle the timing while you focus on creating amazing food
          </p>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#8b5cf6",
                color: "#fff",
                border: "none",
                padding: "0.875rem 2rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Start Scheduling
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
