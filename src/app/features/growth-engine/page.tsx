"use client"

import Link from "next/link"
import { ArrowLeft, Rocket, Zap, TrendingUp, CheckCircle, BarChart3 } from "lucide-react"

export default function GrowthEnginePage() {
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
              <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#000", margin: 0 }}>Growth Engine</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href="/features/customer-insights"
                style={{ textDecoration: "none", color: "#666", fontSize: "0.875rem" }}
              >
                ← Customer Insights
              </Link>
              <Link
                href="/features/smart-pages"
                style={{ textDecoration: "none", color: "#666", fontSize: "0.875rem" }}
              >
                Smart Pages →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{ padding: "5rem 0", background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", color: "#fff" }}
      >
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "4rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <Zap size={20} style={{ color: "#fbbf24" }} />
                <span style={{ fontSize: "0.875rem", color: "#fbbf24", fontWeight: "500", letterSpacing: "0.05em" }}>
                  AI-AUTOMATED
                </span>
              </div>
              <h1 style={{ fontSize: "3rem", fontWeight: "300", marginBottom: "1.5rem", lineHeight: "1.1" }}>
                Scale Success
                <span style={{ fontWeight: "600", display: "block" }}>Without Scaling Work</span>
              </h1>
              <p style={{ fontSize: "1.25rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: 0.9 }}>
                AI automates your entire marketing system. Grow your restaurant empire while you focus on what you do
                best - creating amazing food.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#fbbf24" }} />
                  <span style={{ fontSize: "0.875rem" }}>Full automation</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#fbbf24" }} />
                  <span style={{ fontSize: "0.875rem" }}>Scalable systems</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={18} style={{ color: "#fbbf24" }} />
                  <span style={{ fontSize: "0.875rem" }}>Growth optimization</span>
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
              <Rocket size={64} style={{ color: "#fbbf24", marginBottom: "1.5rem" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "1rem" }}>Growth Automation</h3>
              <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>AI that grows your business while you sleep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "6rem 0", background: "#f8f9fa" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "300", marginBottom: "1rem", color: "#000" }}>
              AI Automates <span style={{ fontWeight: "600" }}>Everything</span>
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              Complete marketing automation that learns and improves your results continuously
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2.5rem" }}>
            {[
              {
                icon: <Zap size={32} />,
                title: "Complete Automation",
                description:
                  "From content creation to customer engagement - AI handles your entire marketing workflow automatically.",
                color: "#ef4444",
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Continuous Optimization",
                description:
                  "AI constantly improves your marketing performance based on real results and customer feedback.",
                color: "#ef4444",
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Scalable Growth",
                description: "Systems that grow with your business - from single location to restaurant empire.",
                color: "#ef4444",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "1rem",
                  padding: "2.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.1)",
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
            Ready to automate your <span style={{ fontWeight: "600" }}>growth?</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#666", marginBottom: "2rem" }}>
            Let AI scale your success while you focus on creating amazing experiences
          </p>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#ef4444",
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
              Start Growing
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
